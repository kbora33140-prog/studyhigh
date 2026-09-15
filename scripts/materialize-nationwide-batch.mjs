import fs from "node:fs/promises";
import path from "node:path";

const batchSize = Number(process.argv[2] || 50);
const batchId = process.argv[3] || "batch-001";
const base = "https://studyhigh.co.kr";
const sitemap = await (await fetch(`${base}/sitemaps/nationwide-0.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const manifestDir = "data/manifests/nationwide/batches";
const existingFiles = await fs.readdir(manifestDir).catch(() => []);
const existing = new Set();
for (const file of existingFiles.filter((name) => name.endsWith(".json"))) {
  const data = JSON.parse(await fs.readFile(path.join(manifestDir, file), "utf8"));
  for (const record of data.records || []) existing.add(record.url);
}
const selected = [];
const selectedSchools = new Set();
for (const url of urls) {
  if (existing.has(url)) continue;
  const school = url.split("/").filter(Boolean)[4];
  if (selectedSchools.has(school)) continue;
  selectedSchools.add(school);
  selected.push(url);
  if (selected.length === batchSize) break;
}
if (selected.length !== batchSize) throw new Error(`Expected ${batchSize} URLs, found ${selected.length}`);
const records = [];
for (const url of selected) {
  const parts = url.split("/").filter(Boolean);
  const [, province, district, town, school, grade, subject] = parts;
  const route = { province, district, town, school, grade, subject };
  const directory = path.join("src", "app", ...parts);
  const pageFile = path.join(directory, "page.tsx");
  await fs.mkdir(directory, { recursive: true });
  const source = `import { NationwideStaticTutoringPage, metadataForNationwideStaticRoute } from "@/components/NationwideStaticTutoringPage";\n\nexport const revalidate = 86400;\nconst route = ${JSON.stringify(route)} as const;\nexport function generateMetadata() { return metadataForNationwideStaticRoute(route); }\nexport default function Page() { return <NationwideStaticTutoringPage route={route} />; }\n`;
  await fs.writeFile(pageFile, source);
  records.push({ url, route, pageFile: pageFile.replaceAll("\\\\", "/"), status: "validated" });
}
await fs.mkdir(manifestDir, { recursive: true });
const manifestPath = path.join(manifestDir, `${batchId}.json`);
await fs.writeFile(manifestPath, JSON.stringify({ batchId, generatedAt: new Date().toISOString(), records }, null, 2) + "\n");
console.log(JSON.stringify({ batchId, manifestPath, count: records.length, first: records[0].url, last: records.at(-1).url }, null, 2));
