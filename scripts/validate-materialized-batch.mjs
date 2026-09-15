import fs from "node:fs/promises";

const batchId = process.argv[2] || "batch-001";
const base = process.argv[3] || "http://127.0.0.1:3300";
const manifest = JSON.parse(await fs.readFile(`data/manifests/nationwide/batches/${batchId}.json`, "utf8"));
const rows = [];
for (const record of manifest.records) {
  const response = await fetch(base + record.url);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] || "";
  const description = html.match(/<meta name="description" content="([^"]+)/)?.[1] || "";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)/)?.[1] || "";
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)/)?.[1]?.replaceAll("&amp;", "&") || "";
  const imageResponse = ogImage ? await fetch(ogImage.replace("https://studyhigh.co.kr", base)) : null;
  const core = [...html.matchAll(/<p data-core-content="true">([\s\S]*?)<\/p>/g)].map((match) => match[1].replace(/<[^>]+>/g, " ")).join(" ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
  const words = core.split(/\s+/).filter(Boolean);
  const grams = new Set(Array.from({ length: Math.max(0, words.length - 4) }, (_, index) => words.slice(index, index + 5).join(" ")));
  rows.push({ url: record.url, status: response.status, title, description, canonical, ogImage, imageStatus: imageResponse?.status, imageMime: imageResponse?.headers.get("content-type"), faq: html.includes('"@type":"FAQPage"'), geo: html.includes('"areaServed"'), core, grams });
}
const duplicateCount = (key) => rows.length - new Set(rows.map((row) => row[key])).size;
let maximumSimilarity = 0;
for (let left = 0; left < rows.length; left++) for (let right = left + 1; right < rows.length; right++) {
  const intersection = [...rows[left].grams].filter((gram) => rows[right].grams.has(gram)).length;
  maximumSimilarity = Math.max(maximumSimilarity, intersection / (rows[left].grams.size + rows[right].grams.size - intersection || 1));
}
const errors = rows.filter((row) => row.status !== 200 || !row.title || !row.description || row.canonical !== `https://studyhigh.co.kr${row.url}` || !row.faq || !row.geo || row.imageStatus !== 200 || !row.imageMime?.startsWith("image/"));
const summary = { batchId, total: rows.length, http200: rows.filter((row) => row.status === 200).length, image200: rows.filter((row) => row.imageStatus === 200).length, urlDuplicates: duplicateCount("url"), titleDuplicates: duplicateCount("title"), descriptionDuplicates: duplicateCount("description"), canonicalDuplicates: duplicateCount("canonical"), maximumCoreSimilarityPercent: Number((maximumSimilarity * 100).toFixed(2)), errors: errors.map((row) => row.url), pass: errors.length === 0 && maximumSimilarity <= 0.35 && ["url", "title", "description", "canonical"].every((key) => duplicateCount(key) === 0) };
console.log(JSON.stringify(summary, null, 2));
if (!summary.pass) process.exit(1);
