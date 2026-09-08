import fs from "node:fs/promises";
import crypto from "node:crypto";

const base = process.argv[2] || "http://127.0.0.1:3300";
const manifestNames = (await fs.readdir("data/manifests/national"))
  .filter((name) => /^expansion-50-\d{8}\.json$/.test(name))
  .sort();
const currentName = process.argv[3] || manifestNames.at(-1);
const manifests = await Promise.all(manifestNames.map(async (name) => ({
  name,
  data: JSON.parse(await fs.readFile(`data/manifests/national/${name}`, "utf8")),
})));
const current = manifests.find((item) => item.name === currentName)?.data;
if (!current) throw new Error(`Manifest not found: ${currentName}`);
const previous = { records: manifests.filter((item) => item.name !== currentName).flatMap((item) => item.data.records) };
const errors = [];
const decode = (s = "") => s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
function parse(html) {
  const metas = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map((m) => { const a = attrs(m[0]); return [a.property || a.name, a.content]; }));
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0])).find((a) => a.rel === "canonical")?.href || "";
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } });
  return { title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""), description: metas.description || "", canonical, ogTitle: metas["og:title"] || "", ogDescription: metas["og:description"] || "", ogImage: metas["og:image"] || "", html, schemas };
}
async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  return { response, body: Buffer.from(await response.arrayBuffer()) };
}
async function pool(items, worker, size = 8) {
  let cursor = 0; const results = [];
  await Promise.all(Array.from({ length: size }, async () => { while (cursor < items.length) { const i = cursor++; results[i] = await worker(items[i], i); } }));
  return results;
}

const map = await get(`${base}/sitemap.xml`);
const sitemap = [...map.body.toString().matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
const tutoring = sitemap.filter((url) => url.includes("/tutoring/"));
if (map.response.status !== 200 || new Set(sitemap).size !== sitemap.length) errors.push("sitemap HTTP or duplicate");

const pages = await pool(current.records, async (record) => {
  const page = await get(`${base}${record.page.url}`);
  const parsed = parse(page.body.toString());
  if (page.response.status !== 200) errors.push(`${record.id}: HTTP ${page.response.status}`);
  for (const [field, expected] of Object.entries({ title: record.seo.title, description: record.seo.description, canonical: record.page.canonical, ogTitle: record.seo.ogTitle, ogDescription: record.seo.ogDescription, ogImage: record.seo.ogImage })) if (parsed[field] !== expected) errors.push(`${record.id}: ${field}`);
  if (!parsed.schemas.some((s) => s?.["@type"] === "FAQPage" && s.mainEntity?.length === 2)) errors.push(`${record.id}: FAQ/AEO`);
  if (!parsed.schemas.some((s) => s?.["@type"] === "Service" && s.areaServed)) errors.push(`${record.id}: Service/GEO`);
  for (const term of [record.region.sido, record.region.sigungu, record.region.eupmyeondong, record.school.name, record.page.grade, record.page.subject, record.content.concern, record.content.studyMethod]) if (!parsed.html.includes(term)) errors.push(`${record.id}: GEO ${term}`);
  if (!sitemap.includes(record.page.canonical)) errors.push(`${record.id}: sitemap`);
  const image = await get(record.image.imageUrl.replace("https://studyhigh.co.kr", base));
  const mime = image.response.headers.get("content-type") || "";
  if (image.response.status !== 200 || !mime.startsWith("image/")) errors.push(`${record.id}: image ${image.response.status} ${mime}`);
  return { pageStatus: page.response.status, imageStatus: image.response.status };
});

const existing = tutoring.filter((url) => !current.records.some((r) => r.page.canonical === url));
const regression = await pool(existing, async (url) => (await get(url.replace("https://studyhigh.co.kr", base))).response.status);
if (regression.some((status) => status !== 200)) errors.push("existing page regression");

const all = [...previous.records, ...current.records];
for (const field of ["url", "title", "description", "canonical"]) {
  const values = all.map((r) => field === "description" ? r.page.description : r.page[field]);
  if (new Set(values).size !== values.length) errors.push(`duplicate ${field}`);
}
function grams(record) {
  const text = (record.content.longForm || [record.content.theme, record.content.concern, record.content.difficultUnit, record.content.studyMethod]).join(" ");
  const words = text.replace(/[^가-힣a-z0-9\s]/gi, " ").split(/\s+/).filter((word) => word.length > 1);
  return new Set(Array.from({ length: Math.max(0, words.length - 4) }, (_, i) => words.slice(i, i + 5).join(" ")));
}
for (const record of current.records) if ((record.content.longForm || []).join(" ").length < 2000) errors.push(`${record.id}: core body below 2000 characters`);
const sets = all.map(grams);
let maxSimilarity = 0;
for (let i = 0; i < sets.length; i += 1) for (let j = 0; j < i; j += 1) {
  let common = 0;
  for (const gram of sets[i]) if (sets[j].has(gram)) common += 1;
  maxSimilarity = Math.max(maxSimilarity, common / (sets[i].size + sets[j].size - common || 1));
}
if (maxSimilarity > 0.35) errors.push(`similarity ${maxSimilarity}`);

const master = await fs.readFile("public/thumbnails/studyhigh-official-template.png");
const masterSha256 = crypto.createHash("sha256").update(master).digest("hex");
if (masterSha256 !== "fbd599fe2121cf5eef8138316b5bf1e44718cfe72a5f83366986c4adf639f4c6") errors.push("MASTER changed");
console.log(JSON.stringify({ newPages: pages.length, newHttp200: pages.filter((x) => x.pageStatus === 200).length, newImages200: pages.filter((x) => x.imageStatus === 200).length, existingRegression200: regression.filter((x) => x === 200).length, sitemap: sitemap.length, tutoring: tutoring.length, duplicates: 0, maxSimilarity, masterSha256, errors }, null, 2));
if (errors.length) process.exitCode = 1;
