import fs from "node:fs";
import path from "node:path";
import Module from "node:module";
import ts from "typescript";

const root = process.cwd();
const siteUrl = "https://studyhigh.co.kr";
const sourcePath = path.join(root, "src", "lib", "tutoringArticles.ts");
const pagePath = path.join(root, "src", "app", "tutoring", "[city]", "[dong]", "[subject]", "page.tsx");
const sitemapPath = path.join(root, "src", "app", "sitemap.ts");
const masterPath = path.join(root, "public", "thumbnails", "studyhigh-official-template.png");
const requiredRoutes = [
  "daejeon/dunsan-dong/math",
  "daejeon/dunsan-dong/english",
  "daejeon/gwanpyeong-dong/math",
  "daejeon/gwanpyeong-dong/english",
  "daejeon/wolpyeong-dong/math",
  "daejeon/wolpyeong-dong/english",
];

const failures = [];
const warnings = [];
const fail = (message) => failures.push(message);
const warn = (message) => warnings.push(message);

function loadTypeScript(file) {
  const source = fs.readFileSync(file, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const instance = new Module(file);
  instance.filename = file;
  instance.paths = Module._nodeModulePaths(path.dirname(file));
  instance._compile(output, file);
  return instance.exports;
}

function routeOf(article) {
  return `${article.city}/${article.dong}/${article.subject}`;
}

function titleOf(article) {
  return `${article.dongName} ${article.gradeName ?? "고등"} ${article.subjectName}과외 | 내신/학습관리 1:1 맞춤 수업 | 스터디하이`;
}

function thumbnailOf(article) {
  if (article.dong === "tanbang-dong" && article.subject === "math" && article.gradeSlug === "high") {
    return masterPath;
  }
  const filename = `${article.dong.replace(/-dong$/, "")}-${article.gradeSlug ?? "high"}-${article.subject}.webp`;
  const candidate = path.join(root, "public", "thumbnails", filename);
  return fs.existsSync(candidate) ? candidate : masterPath;
}

function assertUnique(items, label) {
  const seen = new Map();
  for (const [key, route] of items) {
    if (seen.has(key)) fail(`${label} 중복: ${route} / ${seen.get(key)}`);
    else seen.set(key, route);
  }
}

function tokens(value) {
  return new Set(
    value
      .replace(/[|·,.:!?()]/g, " ")
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 1),
  );
}

function jaccard(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union ? intersection / union : 0;
}

const { tutoringArticles } = loadTypeScript(sourcePath);
const pageSource = fs.readFileSync(pagePath, "utf8");
const sitemapSource = fs.readFileSync(sitemapPath, "utf8");
const schoolData = JSON.parse(fs.readFileSync(path.join(root, "data", "schools", "daejeon.json"), "utf8"));
const schoolNames = new Set(schoolData.schools.map((school) => school.name));
const articlesByRoute = new Map(tutoringArticles.map((article) => [routeOf(article), article]));

for (const route of requiredRoutes) {
  if (!articlesByRoute.has(route)) fail(`필수 테스트 페이지 누락: /tutoring/${route}`);
}

for (const article of tutoringArticles) {
  const route = routeOf(article);
  if (!/^[a-z0-9-]+\/[a-z0-9-]+\/(math|english|korean)$/.test(route)) fail(`잘못된 slug: ${route}`);
  if (!article.title || !article.description || !article.lead || !article.detailBody || !article.method) fail(`필수 콘텐츠 누락: ${route}`);
  const gradeSlug = article.gradeSlug ?? "high";
  const gradeName = article.gradeName ?? "고등";
  if (!["초등", "중등", "고등"].includes(gradeName) || !["elementary", "middle", "high"].includes(gradeSlug)) fail(`학년 데이터 오류: ${route}`);
  if (!Array.isArray(article.faq) || article.faq.length < 2) fail(`FAQ 부족: ${route}`);
  const questions = article.faq.map((item) => item.question);
  if (new Set(questions).size !== questions.length) fail(`페이지 내 FAQ 질문 중복: ${route}`);
  for (const school of article.nearbySchools ?? []) {
    if (!schoolNames.has(school)) warn(`학교 원본 데이터에서 이름 확인 필요: ${route} - ${school}`);
  }
  const imagePath = thumbnailOf(article);
  if (!fs.existsSync(imagePath) || fs.statSync(imagePath).size === 0) fail(`대표 이미지 누락/빈 파일: ${route}`);
  const signature = fs.readFileSync(imagePath).subarray(0, 12);
  const isPng = signature.subarray(1, 4).toString() === "PNG";
  const isWebp = signature.subarray(8, 12).toString() === "WEBP";
  if (!isPng && !isWebp) fail(`대표 이미지 MIME 서명 오류: ${route}`);
}

assertUnique(tutoringArticles.map((article) => [routeOf(article), routeOf(article)]), "URL");
assertUnique(tutoringArticles.map((article) => [titleOf(article), routeOf(article)]), "title");
assertUnique(tutoringArticles.map((article) => [article.description, routeOf(article)]), "description");

const requiredArticles = requiredRoutes.map((route) => articlesByRoute.get(route)).filter(Boolean);
let maxSimilarity = { score: 0, pair: [] };
for (let i = 0; i < requiredArticles.length; i += 1) {
  for (let j = i + 1; j < requiredArticles.length; j += 1) {
    const a = requiredArticles[i];
    const b = requiredArticles[j];
    const content = (article) => [article.title, article.description, article.concern, article.parentConcern, article.detailTopic, article.detailBody, article.method, ...article.faq.flatMap((item) => [item.question, item.answer])].join(" ");
    const score = jaccard(content(a), content(b));
    if (score > maxSimilarity.score) maxSimilarity = { score, pair: [routeOf(a), routeOf(b)] };
    if (score > 0.2) warn(`테스트 페이지 콘텐츠 유사도 ${(score * 100).toFixed(1)}%: ${routeOf(a)} / ${routeOf(b)}`);
  }
}

for (const fragment of ["article.description", "alternates: { canonical: canonicalUrl }", "type: \"website\"", "BreadcrumbList", "FAQPage", "Service", "image: thumbnail.url"]) {
  if (!pageSource.includes(fragment)) fail(`페이지 SEO/JSON-LD 코드 누락: ${fragment}`);
}
if (!sitemapSource.includes("tutoringArticles.map")) fail("sitemap의 tutoringArticles 자동 반영 코드 누락");
if (!fs.existsSync(masterPath) || fs.statSync(masterPath).size === 0) fail("MASTER 이미지 누락");

console.log(JSON.stringify({
  articles: tutoringArticles.length,
  requiredPages: requiredArticles.length,
  schools: schoolData.schools.length,
  maxRequiredSimilarityPercent: Number((maxSimilarity.score * 100).toFixed(1)),
  maxSimilarityPair: maxSimilarity.pair,
  warnings,
  failures,
}, null, 2));

if (failures.length) process.exit(1);
