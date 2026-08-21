import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Module from "node:module";
import ts from "typescript";

const root = process.cwd();
const baseline = JSON.parse(
  await readFile(path.join(root, "data", "regression", "production-baseline.json"), "utf8"),
);
const errors = [];

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extract(html, pattern) {
  return decodeHtml(html.match(pattern)?.[1] || "");
}

async function request(url) {
  const response = await fetch(url, { redirect: "follow" });
  const buffer = Buffer.from(await response.arrayBuffer());
  return { response, buffer };
}

function loadTypeScript(file) {
  const source = Module.createRequire(import.meta.url)("node:fs").readFileSync(file, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const instance = new Module(file);
  instance.filename = file;
  instance.paths = Module._nodeModulePaths(path.dirname(file));
  instance._compile(output, file);
  return instance.exports;
}

const sitemapUrl = `${baseline.siteUrl}/sitemap.xml`;
const sitemapResult = await request(sitemapUrl);
if (sitemapResult.response.status !== 200) errors.push(`sitemap status: ${sitemapResult.response.status}`);
const sitemap = sitemapResult.buffer.toString("utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1])));
if (sitemapUrls.size < baseline.minimumSitemapUrls) {
  errors.push(`sitemap URL count: ${sitemapUrls.size} < ${baseline.minimumSitemapUrls}`);
}

for (const page of baseline.criticalPages) {
  const absoluteUrl = `${baseline.siteUrl}${page.url}`;
  const { response, buffer } = await request(absoluteUrl);
  if (response.status !== 200) {
    errors.push(`${page.category} status ${response.status}: ${page.url}`);
    continue;
  }
  const html = buffer.toString("utf8");
  const title = extract(html, /<title>(.*?)<\/title>/s);
  const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/);
  const ogImage = extract(html, /<meta property="og:image" content="([^"]+)"/);
  if (title !== page.title) errors.push(`${page.category} title changed: ${page.url}`);
  if (canonical !== page.canonical) errors.push(`${page.category} canonical changed: ${page.url}`);
  for (const text of page.requiredText) {
    if (!html.includes(text)) errors.push(`${page.category} content missing "${text}": ${page.url}`);
  }
  if (!sitemapUrls.has(absoluteUrl)) errors.push(`${page.category} missing from sitemap: ${page.url}`);
  if (page.ogImage) {
    if (ogImage !== page.ogImage) errors.push(`${page.category} OG image changed: ${page.url}`);
    const image = await request(page.ogImage);
    const contentType = image.response.headers.get("content-type") || "";
    if (image.response.status !== 200 || !contentType.startsWith("image/")) {
      errors.push(`${page.category} OG image invalid: ${page.ogImage}`);
    }
    const imagePath = new URL(page.ogImage).pathname;
    const screenImage = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)]
      .map((match) => decodeHtml(match[1]))
      .find((src) => src.includes(imagePath));
    const screenImageUrl = screenImage?.startsWith("http")
      ? screenImage
      : screenImage
        ? `${baseline.siteUrl}${screenImage}`
        : "";
    if (screenImageUrl !== page.ogImage) errors.push(`${page.category} screen/OG image mismatch: ${page.url}`);
  }
}

const master = await request(`${baseline.siteUrl}${baseline.masterImage.url}`);
const masterHash = createHash("sha256").update(master.buffer).digest("hex").toUpperCase();
if (master.response.status !== 200) errors.push(`MASTER status: ${master.response.status}`);
if ((master.response.headers.get("content-type") || "").split(";")[0] !== baseline.masterImage.contentType) {
  errors.push("MASTER content type changed");
}
if (masterHash !== baseline.masterImage.sha256) errors.push(`MASTER hash changed: ${masterHash}`);

const { regions, subjects, slugifyKorean } = loadTypeScript(path.join(root, "src", "lib", "regions.ts"));
const { tutoringArticles } = loadTypeScript(path.join(root, "src", "lib", "tutoringArticles.ts"));
const publicPaths = [
  "/",
  "/coding",
  "/contact",
  "/ged",
  "/manifest.webmanifest",
  "/regions",
  "/robots.txt",
  "/sitemap.xml",
  ...regions.map((region) => `/regions/${region.slug}`),
  ...regions.flatMap((region) =>
    region.districts.flatMap((district) => [
      `/regions/${region.slug}/${district.slug}`,
      ...district.dongs.flatMap((dong) => [
        `/regions/${region.slug}/${district.slug}/${slugifyKorean(dong)}`,
        ...subjects.map(
          (subject) =>
            `/regions/${region.slug}/${district.slug}/${slugifyKorean(dong)}/${subject.slug}`,
        ),
      ]),
    ]),
  ),
  ...tutoringArticles.map(
    (article) => `/tutoring/${article.city}/${article.dong}/${article.subject}`,
  ),
];

let cursor = 0;
const non200 = [];
async function worker() {
  while (cursor < publicPaths.length) {
    const route = publicPaths[cursor++];
    try {
      const response = await fetch(`${baseline.siteUrl}${route}`, { redirect: "follow" });
      if (response.status !== 200) non200.push({ route, status: response.status });
      await response.arrayBuffer();
    } catch (error) {
      non200.push({ route, error: error instanceof Error ? error.message : String(error) });
    }
  }
}
await Promise.all(Array.from({ length: 12 }, () => worker()));
if (non200.length) errors.push(`existing public URL failures: ${JSON.stringify(non200.slice(0, 20))}`);

console.log(
  JSON.stringify(
    {
      criticalPages: baseline.criticalPages.length,
      existingPublicUrls: publicPaths.length,
      existingNon200: non200.length,
      sitemapUrls: sitemapUrls.size,
      masterSha256: masterHash,
      errors,
    },
    null,
    2,
  ),
);

if (errors.length) process.exitCode = 1;
