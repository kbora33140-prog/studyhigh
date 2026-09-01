import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const base = process.argv[2] || "http://localhost:3100";
const production = "https://studyhigh.co.kr";
const test30 = JSON.parse(await fs.readFile("data/manifests/daejeon/test-30-v1.json", "utf8")).records;
const new50 = JSON.parse(await fs.readFile("data/manifests/daejeon/additional-50-20260901.json", "utf8")).records;
const errors = [];
const hash = value => crypto.createHash("sha256").update(value).digest("hex");

async function request(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  return { status: response.status, mime: response.headers.get("content-type") || "", body: Buffer.from(await response.arrayBuffer()) };
}
async function pool(items, fn) {
  let cursor = 0; const output = [];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (cursor < items.length) { const index = cursor++; output[index] = await fn(items[index], index); }
  }));
  return output;
}
function decode(value = "") { return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'"); }
function attrs(tag) { return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], decode(match[2])])); }
function parse(html) {
  const metas = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map(match => { const a = attrs(match[0]); return [a.property || a.name, a.content]; }));
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => { try { return JSON.parse(match[1]); } catch { return null; } });
  return {
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""), description: metas.description,
    canonical: [...html.matchAll(/<link\b[^>]*>/g)].map(match => attrs(match[0])).find(value => value.rel === "canonical")?.href,
    ogTitle: metas["og:title"], ogDescription: metas["og:description"], ogImage: metas["og:image"], ogUrl: metas["og:url"],
    noindex: /noindex/.test(metas.robots || ""), mainHash: hash(main), main, schemas,
  };
}

const sitemap = await request(base + "/sitemap.xml");
const map = [...sitemap.body.toString().matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
if (sitemap.status !== 200 || map.length !== 8882 || new Set(map).size !== map.length) errors.push("sitemap total/duplicates");
const tutoring = map.filter(url => url.includes("/tutoring/"));
if (tutoring.length !== 151) errors.push(`tutoring sitemap ${tutoring.length}`);

const master = await request(base + "/thumbnails/studyhigh-official-template.png");
const expectedMaster = "fbd599fe2121cf5eef8138316b5bf1e44718cfe72a5f83366986c4adf639f4c6";
if (master.status !== 200 || hash(master.body) !== expectedMaster) errors.push("MASTER changed");

const existing = tutoring.filter(url => !new50.some(record => record.page.canonical === url));
if (existing.length !== 101) errors.push(`existing count ${existing.length}`);
const existingResult = await pool(existing, async url => {
  const local = await request(base + new URL(url).pathname);
  if (local.status !== 200) errors.push(`existing HTTP ${url}`);
  if (base !== production) {
    const live = await request(url); const a = parse(local.body.toString()); const b = parse(live.body.toString());
    for (const field of ["title", "description", "canonical", "ogTitle", "ogDescription", "ogImage", "ogUrl", "mainHash"])
      if (a[field] !== b[field]) errors.push(`existing regression ${field}: ${url}`);
  }
  return local.status;
});

const oldImages = await pool(test30, async record => {
  const url = base + record.image.imagePath;
  const first = await request(url); const second = await request(url + "?stable=1");
  const metadata = await sharp(first.body).metadata().catch(() => ({}));
  const disk = await fs.readFile(path.join("public/seo-images/stable-existing", path.basename(record.image.imagePath)));
  if (first.status !== 200 || first.mime.split(";")[0] !== "image/webp" || metadata.width !== 1254 || metadata.height !== 1254 || hash(first.body) !== hash(second.body) || hash(first.body) !== hash(disk))
    errors.push(`existing image ${record.image.imagePath}`);
  return first.status;
});
const legacyPath = "/api/seo-thumbnail?dong=" + encodeURIComponent("월평동") + "&subject=english";
const legacyA = await request(base + legacyPath); const legacyB = await request(base + legacyPath + "&stable=1");
const legacyDisk = await fs.readFile("public/seo-images/stable-existing/legacy-wolpyeong-english.webp");
if (legacyA.status !== 200 || legacyA.mime.split(";")[0] !== "image/webp" || hash(legacyA.body) !== hash(legacyB.body) || hash(legacyA.body) !== hash(legacyDisk)) errors.push("legacy image unstable");

const fresh = await pool(new50, async record => {
  const response = await request(base + record.page.url); const page = parse(response.body.toString());
  if (response.status !== 200) errors.push(`new HTTP ${record.id}`);
  for (const [field, expected] of Object.entries({ title: record.seo.title, description: record.seo.description, canonical: record.page.canonical, ogTitle: record.seo.ogTitle, ogDescription: record.seo.ogDescription, ogImage: record.image.imageUrl, ogUrl: record.page.canonical }))
    if (page[field] !== expected) errors.push(`new ${field}: ${record.id}`);
  if (page.noindex || !page.main.includes(record.region.eupmyeondong) || !page.main.includes(record.school.name) || !page.main.includes(record.page.grade) || !page.main.includes(record.page.subject) || !page.main.includes(record.content.studyMethod)) errors.push(`new GEO/noindex ${record.id}`);
  const faq = page.schemas.find(schema => schema?.["@type"] === "FAQPage");
  if (!faq || faq.mainEntity?.length !== record.content.faq.length) errors.push(`new AEO ${record.id}`);
  const image = await request(base + record.image.imagePath); const metadata = await sharp(image.body).metadata().catch(() => ({}));
  const disk = await fs.readFile(path.join("public", record.image.imagePath));
  if (image.status !== 200 || image.mime.split(";")[0] !== "image/png" || metadata.width !== 1254 || metadata.height !== 1254 || hash(image.body) !== hash(disk)) errors.push(`new image ${record.id}`);
  if (!map.includes(record.page.canonical)) errors.push(`new sitemap ${record.id}`);
  return { page: response.status, image: image.status };
});

const robots = await request(base + "/robots.txt");
if (robots.status !== 200 || /^Disallow:\s*\/\s*$/m.test(robots.body.toString())) errors.push("robots");
console.log(JSON.stringify({
  base, existingPages: existingResult.filter(status => status === 200).length,
  stableExistingImages: oldImages.filter(status => status === 200).length + (legacyA.status === 200 ? 1 : 0),
  newPages: fresh.filter(item => item.page === 200).length, newImages: fresh.filter(item => item.image === 200).length,
  sitemap: map.length, tutoring: tutoring.length, masterUnchanged: hash(master.body) === expectedMaster,
  robots: robots.status, errors,
}, null, 2));
if (errors.length) process.exitCode = 1;
