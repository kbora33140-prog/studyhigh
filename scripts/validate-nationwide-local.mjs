const base = process.argv[2] || "http://127.0.0.1:3300";
const paths = [
  "/tutoring/seoul/gangnam-gu/gaepo-dong/gugak-national-high-school-1371661/high-1/math",
  "/tutoring/gyeonggi/danwon-gu-ansan-si/daebu-dong/daenam-elementary-school-7181021/elementary-1/math",
  "/tutoring/busan/yeongdo-gu/dongsam-dong/busan-maritime-high-school-1192068/high-1/math",
  "/tutoring/gwangju-jeonnam/buk-gu/punghyang-dong/the-attached-elementary-school-of-gwangju-national-university-of-education-7006149/elementary-1/math",
  "/tutoring/jeju/jeju-si/yongdam-dong/jeju-national-university-high-school-7003713/high-1/math",
];
const rows = [];
for (const path of paths) {
  const response = await fetch(base + path);
  const html = await response.text();
  const image = html.match(/<meta property="og:image" content="([^"]+)/)?.[1]?.replaceAll("&amp;", "&");
  const imageResponse = image ? await fetch(image.replace("https://studyhigh.co.kr", base)) : null;
  rows.push({ path, status: response.status, title: html.match(/<title>(.*?)<\/title>/)?.[1], canonical: html.match(/rel="canonical" href="([^"]+)/)?.[1], faq: html.includes('"@type":"FAQPage"'), geo: html.includes('"areaServed"'), imageStatus: imageResponse?.status, imageMime: imageResponse?.headers.get("content-type"), characters: html.length });
}
const indexResponse = await fetch(base + "/sitemap-national.xml");
const index = await indexResponse.text();
const shards = [...index.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const counts = [];
const urls = new Set();
let duplicates = 0;
for (const sitemapUrl of shards) {
  const text = await (await fetch(sitemapUrl.replace("https://studyhigh.co.kr", base))).text();
  const shardUrls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  for (const url of shardUrls) { if (urls.has(url)) duplicates++; urls.add(url); }
  counts.push(shardUrls.length);
}
const invalid = await fetch(base + "/tutoring/seoul/gangnam-gu/gaepo-dong/not-a-school/high-1/math");
const sampleUrls = [...urls].filter((_, index) => index % 3700 === 0).slice(0, 50);
const cores = [];
for (const url of sampleUrls) {
  const html = await (await fetch(url.replace("https://studyhigh.co.kr", base))).text();
  const core = [...html.matchAll(/<p data-core-content="true">([\s\S]*?)<\/p>/g)].map((match) => match[1].replace(/<[^>]+>/g, " ")).join(" ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ");
  cores.push({ url, grams: new Set(Array.from({ length: Math.max(0, core.length - 4) }, (_, i) => core.slice(i, i + 5))) });
}
let maxSimilarity = 0; let pair = [];
for (let i = 0; i < cores.length; i++) for (let j = i + 1; j < cores.length; j++) {
  const intersection = [...cores[i].grams].filter((x) => cores[j].grams.has(x)).length;
  const similarity = intersection / (cores[i].grams.size + cores[j].grams.size - intersection || 1);
  if (similarity > maxSimilarity) { maxSimilarity = similarity; pair = [cores[i].url, cores[j].url]; }
}
const errors = rows.flatMap((r) => [r.status === 200, r.title, r.canonical === `https://studyhigh.co.kr${r.path}`, r.faq, r.geo, r.imageStatus === 200, r.imageMime?.startsWith("image/")].every(Boolean) ? [] : [r.path]);
if (indexResponse.status !== 200 || shards.length !== 6 || urls.size !== 238506 || duplicates || invalid.status !== 404 || errors.length || maxSimilarity > 0.35) throw new Error(JSON.stringify({ errors, indexStatus: indexResponse.status, shards: shards.length, urls: urls.size, duplicates, invalid: invalid.status, maxSimilarity, pair, rows }));
console.log(JSON.stringify({ samplePages: rows.length, http200: rows.filter((r) => r.status === 200).length, image200: rows.filter((r) => r.imageStatus === 200).length, sitemapShards: shards.length, shardCounts: counts, sitemapUrls: urls.size, sitemapDuplicates: duplicates, invalidRoute: invalid.status, similaritySample: cores.length, maxSimilarity, pair, errors }, null, 2));
