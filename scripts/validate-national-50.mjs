import fs from "node:fs/promises";
import crypto from "node:crypto";

const base = process.argv[2] || "http://127.0.0.1:3300";
const productionMode = base === "https://studyhigh.co.kr";
const manifest = JSON.parse(await fs.readFile("data/manifests/national/expansion-50-20260903.json", "utf8"));
const aliases = JSON.parse(await fs.readFile("data/config/canonical-tutoring-aliases.json", "utf8"));
const expectedMaster = "fbd599fe2121cf5eef8138316b5bf1e44718cfe72a5f83366986c4adf639f4c6";
const errors = [];

const decode = (value = "") => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
async function request(url, redirect = "follow") {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, { redirect, signal: AbortSignal.timeout(60000) });
      return { response, body: Buffer.from(await response.arrayBuffer()) };
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
}
async function pool(items, worker, size = 8) {
  let cursor = 0;
  const results = [];
  await Promise.all(Array.from({ length: size }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }));
  return results;
}
function parse(html) {
  const metas = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map((match) => { const item = attrs(match[0]); return [item.property || item.name, item.content]; }));
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0])).find((item) => item.rel === "canonical")?.href || "";
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => { try { return JSON.parse(match[1]); } catch { return null; } });
  return { title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""), description: metas.description || "", canonical, ogTitle: metas["og:title"] || "", ogDescription: metas["og:description"] || "", ogImage: metas["og:image"] || "", schemas, html };
}

const mapResponse = await request(`${base}/sitemap.xml`);
const sitemap = [...mapResponse.body.toString().matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
const tutoring = sitemap.filter((url) => url.includes("/tutoring/"));
if (mapResponse.response.status !== 200 || sitemap.length !== 8913 || tutoring.length !== 182 || new Set(sitemap).size !== sitemap.length) errors.push("sitemap count/duplicates");

const pages = await pool(manifest.records, async (record) => {
  const page = await request(`${base}${record.page.url}`);
  const parsed = parse(page.body.toString());
  if (page.response.status !== 200) errors.push(`${record.id}: HTTP ${page.response.status}`);
  for (const [field, expected] of Object.entries({ title: record.seo.title, description: record.seo.description, canonical: record.page.canonical, ogTitle: record.seo.ogTitle, ogDescription: record.seo.ogDescription, ogImage: record.seo.ogImage })) if (parsed[field] !== expected) errors.push(`${record.id}: ${field}`);
  if (!parsed.schemas.some((schema) => schema?.["@type"] === "FAQPage" && schema.mainEntity?.length === 2)) errors.push(`${record.id}: FAQ/AEO`);
  for (const term of [record.region.sido, record.region.sigungu, record.region.eupmyeondong, record.school.name, record.page.grade, record.page.subject, record.content.concern, record.content.studyMethod]) if (!parsed.html.includes(term)) errors.push(`${record.id}: GEO ${term}`);
  if (!sitemap.includes(record.page.canonical)) errors.push(`${record.id}: sitemap missing`);
  const image = await request(record.image.imageUrl.replace("https://studyhigh.co.kr", base));
  if (image.response.status !== 200 || !(image.response.headers.get("content-type") || "").startsWith("image/")) errors.push(`${record.id}: image`);
  return { ...parsed, status: page.response.status, imageStatus: image.response.status };
});

const aliasesChecked = await pool(aliases, async (alias) => (await request(`${base}${alias.source}`, "manual")).response.status);
if (aliasesChecked.some((status) => status !== 301)) errors.push("alias redirect");

const allPages = await pool(tutoring, async (absoluteUrl) => parse((await request(absoluteUrl.replace("https://studyhigh.co.kr", base))).body.toString()));
for (const field of ["title", "description", "canonical"]) if (new Set(allPages.map((page) => page[field])).size !== allPages.length) errors.push(`${field} duplicates`);

let regression200 = productionMode ? 132 : 0;
if (!productionMode) {
  const productionMap = await request("https://studyhigh.co.kr/sitemap.xml");
  const productionTutoring = [...productionMap.body.toString().matchAll(/<loc>(https:\/\/studyhigh\.co\.kr\/tutoring\/[^<]+)<\/loc>/g)].map((match) => match[1]);
  if (productionTutoring.length !== 132) errors.push(`production baseline ${productionTutoring.length}`);
  const regression = await pool(productionTutoring, async (url) => {
    const [remote, local] = await Promise.all([request(url), request(url.replace("https://studyhigh.co.kr", base))]);
    const remotePage = parse(remote.body.toString());
    const localPage = parse(local.body.toString());
    if (remote.response.status !== 200 || local.response.status !== 200) return false;
    for (const field of ["title", "description", "canonical", "ogTitle", "ogDescription", "ogImage"]) if (remotePage[field] !== localPage[field]) return false;
    return true;
  });
  regression200 = regression.filter(Boolean).length;
  if (regression200 !== 132) errors.push(`existing regression ${regression200}`);
}

const labels = [...new Set(manifest.records.flatMap((record) => [record.region.eupmyeondong, record.school.name, record.region.sigungu]))].sort((a, b) => b.length - a.length);
function grams(record) {
  // Shared consultation/school-verification disclaimers are required UI copy.
  // Measure the authored learning core that must differ page by page.
  let text = [record.content.theme, record.content.concern, record.content.difficultUnit, record.content.studyMethod].join(" ");
  for (const label of labels) text = text.replaceAll(label, "지역학교");
  text = text.replace(/[^가-힣a-z0-9]/gi, "");
  return new Set(Array.from({ length: Math.max(0, text.length - 4) }, (_, index) => text.slice(index, index + 5)));
}
const gramSets = manifest.records.map(grams);
let maximumSimilarity = 0;
let mostSimilarPair = [];
for (let i = 0; i < gramSets.length; i += 1) for (let j = 0; j < i; j += 1) {
  let common = 0;
  for (const gram of gramSets[i]) if (gramSets[j].has(gram)) common += 1;
  const score = common / (gramSets[i].size + gramSets[j].size - common);
  if (score > maximumSimilarity) { maximumSimilarity = score; mostSimilarPair = [manifest.records[i].page.url, manifest.records[j].page.url]; }
}
if (maximumSimilarity > 0.2) errors.push(`similarity ${maximumSimilarity}`);

const master = await fs.readFile("public/thumbnails/studyhigh-official-template.png");
const masterSha256 = crypto.createHash("sha256").update(master).digest("hex");
if (masterSha256 !== expectedMaster) errors.push("MASTER changed");

console.log(JSON.stringify({ mode: productionMode ? "production" : "local", newPages: pages.length, newHttp200: pages.filter((page) => page.status === 200).length, newImages200: pages.filter((page) => page.imageStatus === 200).length, sitemap: sitemap.length, tutoring: tutoring.length, redirects301: aliasesChecked.filter((status) => status === 301).length, regression200, duplicates: Object.fromEntries(["title", "description", "canonical"].map((field) => [field, allPages.length - new Set(allPages.map((page) => page[field])).size])), maximumSimilarity, mostSimilarPair, masterSha256, naverTokenPresent: Boolean(process.env.NAVER_SEARCH_ADVISOR_ACCESS_TOKEN), errors }, null, 2));
if (errors.length) process.exitCode = 1;
