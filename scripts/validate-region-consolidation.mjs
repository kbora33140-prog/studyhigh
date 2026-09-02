import fs from "node:fs/promises";
import crypto from "node:crypto";

const base = process.argv[2] || "http://127.0.0.1:3200";
const aliases = JSON.parse(await fs.readFile("data/config/canonical-tutoring-aliases.json", "utf8"));
const consolidated = JSON.parse(await fs.readFile("data/manifests/daejeon/consolidated-15-20260902.json", "utf8")).records;
const expectedMaster = "fbd599fe2121cf5eef8138316b5bf1e44718cfe72a5f83366986c4adf639f4c6";
const errors = [];

async function request(url, options = {}) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60000), ...options });
  return { response, body: Buffer.from(await response.arrayBuffer()) };
}
function meta(html, attribute, value) {
  const pattern = new RegExp(`<meta[^>]+${attribute}=["']${value}["'][^>]+content=["']([^"']*)`, "i");
  const reverse = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attribute}=["']${value}["']`, "i");
  return html.match(pattern)?.[1] || html.match(reverse)?.[1] || "";
}
function link(html, rel) {
  return html.match(new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']*)`, "i"))?.[1]
    || html.match(new RegExp(`<link[^>]+href=["']([^"']*)["'][^>]+rel=["']${rel}["']`, "i"))?.[1] || "";
}
async function pool(items, worker, size = 12) {
  let cursor = 0; const output = [];
  await Promise.all(Array.from({ length: size }, async () => {
    while (cursor < items.length) { const index = cursor++; output[index] = await worker(items[index]); }
  }));
  return output;
}

const sitemapResponse = await request(`${base}/sitemap.xml`);
const sitemap = [...sitemapResponse.body.toString().matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll("&amp;", "&"));
const tutoring = sitemap.filter((url) => url.includes("/tutoring/"));
if (sitemapResponse.response.status !== 200) errors.push("sitemap HTTP");
if (sitemap.length !== 8863) errors.push(`sitemap count ${sitemap.length}`);
if (new Set(sitemap).size !== sitemap.length) errors.push("sitemap duplicate");
if (tutoring.length !== 132) errors.push(`tutoring count ${tutoring.length}`);

const redirectResults = await pool(aliases, async (alias) => {
  const result = await request(`${base}${alias.source}`, { redirect: "manual" });
  const location = result.response.headers.get("location");
  if (result.response.status !== 301 || new URL(location, base).pathname !== alias.target) {
    errors.push(`redirect ${alias.source}: ${result.response.status} ${location}`);
  }
  if (sitemap.includes(`https://studyhigh.co.kr${alias.source}`)) errors.push(`alias in sitemap ${alias.source}`);
  return result.response.status;
});

const representativeResults = await pool(consolidated, async (record) => {
  const result = await request(`${base}${record.page.url}`);
  const html = result.body.toString();
  const canonical = link(html, "canonical");
  const ogImage = meta(html, "property", "og:image");
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] || "";
  const description = meta(html, "name", "description");
  if (result.response.status !== 200) errors.push(`representative HTTP ${record.page.url}`);
  if (canonical !== record.page.canonical) errors.push(`canonical ${record.page.url}`);
  if (title !== record.seo.title || description !== record.seo.description) errors.push(`metadata ${record.page.url}`);
  if (ogImage !== record.image.imageUrl.replaceAll("&", "&amp;") && ogImage !== record.image.imageUrl) errors.push(`OG ${record.page.url}`);
  if (!html.includes('"@type":"FAQPage"') || !html.includes(record.region.eupmyeondong) || !html.includes(record.school.name)) errors.push(`AEO/GEO ${record.page.url}`);
  if (!sitemap.includes(record.page.canonical)) errors.push(`representative sitemap ${record.page.url}`);
  const image = await request(record.image.imageUrl.replace("https://studyhigh.co.kr", base));
  if (image.response.status !== 200 || !image.response.headers.get("content-type")?.startsWith("image/")) errors.push(`image ${record.page.url}`);
  return { title, description, canonical };
});

const finalPageResults = await pool(tutoring, async (absoluteUrl) => {
  const result = await request(absoluteUrl.replace("https://studyhigh.co.kr", base));
  const html = result.body.toString();
  const page = {
    title: html.match(/<title>([^<]*)<\/title>/i)?.[1] || "",
    description: meta(html, "name", "description"),
    canonical: link(html, "canonical"),
    ogTitle: meta(html, "property", "og:title"),
    ogDescription: meta(html, "property", "og:description"),
    ogImage: meta(html, "property", "og:image"),
  };
  if (result.response.status !== 200) errors.push(`final HTTP ${absoluteUrl}`);
  if (!page.title || !page.description || page.canonical !== absoluteUrl || !page.ogTitle || !page.ogDescription || !page.ogImage) errors.push(`final SEO ${absoluteUrl}`);
  if (!html.includes('"@type":"FAQPage"')) errors.push(`final FAQ ${absoluteUrl}`);
  return page;
});

const finalImageUrls = [...new Set(finalPageResults.map((page) => page.ogImage).filter(Boolean))];
const finalImageResults = await pool(finalImageUrls, async (url) => {
  const localUrl = url.replaceAll("&amp;", "&").replace("https://studyhigh.co.kr", base);
  const image = await request(localUrl);
  const mime = image.response.headers.get("content-type") || "";
  if (image.response.status !== 200 || !mime.startsWith("image/")) errors.push(`final image ${url}`);
  return image.response.status;
});

const productionMap = await request("https://studyhigh.co.kr/sitemap.xml");
const productionTutoring = [...productionMap.body.toString().matchAll(/<loc>(https:\/\/studyhigh\.co\.kr\/tutoring\/[^<]+)<\/loc>/g)].map((match) => match[1]);
const aliasSources = new Set(aliases.map((alias) => `https://studyhigh.co.kr${alias.source}`));
const unaffected = productionTutoring.filter((url) => !aliasSources.has(url));
const regression = await pool(unaffected, async (url) => (await request(url.replace("https://studyhigh.co.kr", base))).response.status);
if (productionTutoring.length !== 151 || unaffected.length !== 117 || regression.some((status) => status !== 200)) errors.push("existing regression");

const fields = ["title", "description", "canonical"];
const duplicates = Object.fromEntries(fields.map((field) => {
  const values = finalPageResults.map((item) => item[field]);
  return [field, values.length - new Set(values).size];
}));
for (const [field, count] of Object.entries(duplicates)) if (count) errors.push(`${field} duplicates ${count}`);

const master = await fs.readFile("public/thumbnails/studyhigh-official-template.png");
const masterHash = crypto.createHash("sha256").update(master).digest("hex");
if (masterHash !== expectedMaster) errors.push("MASTER changed");

console.log(JSON.stringify({
  sitemap: sitemap.length,
  tutoring: tutoring.length,
  redirects301: redirectResults.filter((status) => status === 301).length,
  representatives200: representativeResults.length,
  finalPages200: finalPageResults.length,
  finalImages200: finalImageResults.filter((status) => status === 200).length,
  finalUniqueImages: finalImageUrls.length,
  existingUnaffected200: regression.filter((status) => status === 200).length,
  duplicates,
  masterSha256: masterHash,
  errors,
}, null, 2));
if (errors.length) process.exitCode = 1;
