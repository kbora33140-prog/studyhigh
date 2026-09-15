import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync("data/manifests/nationwide/official-school-sample-20.json", "utf8"));
const official = JSON.parse(fs.readFileSync("data/schools/national-schools.json", "utf8")).schools;
const sheetUrls = new Set(JSON.parse(fs.readFileSync("data/audits/google-sheet-urls-20260915.json", "utf8")).urls);
const sitemap = fs.readFileSync("data/audits/production-sitemap-20260915.xml", "utf8");
const productionUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname));
const records = manifest.records;
const duplicateCount = (values) => values.length - new Set(values).size;
const tokens = (text, size = 5) => {
  const normalized = text.replace(/[^가-힣a-zA-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  return new Set(Array.from({ length: Math.max(0, normalized.length - size + 1) }, (_, index) => normalized.slice(index, index + size).join(" ")));
};
const similarity = (left, right) => {
  const a = tokens(left), b = tokens(right);
  const intersection = [...a].filter((token) => b.has(token)).length;
  return a.size + b.size - intersection ? intersection / (a.size + b.size - intersection) : 0;
};
let maximumSimilarity = { value: 0, pair: [] };
let maximumFullBodySimilarity = { value: 0, pair: [] };
let maximumFaqSimilarity = { value: 0, pair: [] };
for (let i = 0; i < records.length; i++) for (let j = i + 1; j < records.length; j++) {
  const value = similarity(records[i].content.coreParagraphs.join(" "), records[j].content.coreParagraphs.join(" "));
  if (value > maximumSimilarity.value) maximumSimilarity = { value, pair: [records[i].page.url, records[j].page.url] };
  const fullBodyValue = similarity(records[i].content.paragraphs.join(" "), records[j].content.paragraphs.join(" "));
  if (fullBodyValue > maximumFullBodySimilarity.value) maximumFullBodySimilarity = { value: fullBodyValue, pair: [records[i].page.url, records[j].page.url] };
  const faqValue = similarity(records[i].content.faq.map((faq) => `${faq.question} ${faq.answer}`).join(" "), records[j].content.faq.map((faq) => `${faq.question} ${faq.answer}`).join(" "));
  if (faqValue > maximumFaqSimilarity.value) maximumFaqSimilarity = { value: faqValue, pair: [records[i].page.url, records[j].page.url] };
}
const errors = [];
const accuracy = { school: 0, region: 0, gradeSubject: 0 };
const issueCounts = { seo: 0, aeo: 0, geo: 0 };
if (records.length !== 20) errors.push(`샘플 수 ${records.length}`);
for (const [level, expected] of Object.entries({ elementary: 7, middle: 7, high: 6 })) if (records.filter((r) => r.school.level === level).length !== expected) errors.push(`${level} 개수 오류`);
if (duplicateCount(records.map((r) => r.page.url))) errors.push("URL 중복");
if (duplicateCount(records.map((r) => r.page.title))) errors.push("title 중복");
if (duplicateCount(records.map((r) => r.page.description))) errors.push("description 중복");
if (duplicateCount(records.flatMap((r) => r.content.faq.map((faq) => faq.question)))) errors.push("FAQ 중복");
if (maximumSimilarity.value > 0.35) errors.push(`핵심 본문 유사도 ${(maximumSimilarity.value * 100).toFixed(2)}%`);
for (const record of records) {
  const school = official.find((item) => item.schoolId === record.source.schoolId);
  if (!school || school.status !== "active" || !school.dong) errors.push(`${record.id}: 공식 학교 불일치`);
  if (school && [school.schoolName, school.schoolLevel, school.address, school.homepage].every((value, index) => value === [record.school.name, record.school.level, record.school.address, record.school.homepage][index])) accuracy.school++;
  else errors.push(`${record.id}: 공식 학교 필드 불일치`);
  if (school && [school.sido, school.sigungu, school.dong, school.canonicalDong].every((value, index) => value === [record.region.sido, record.region.sigungu, record.region.eupmyeondong, record.region.representativeRegion][index])) accuracy.region++;
  else errors.push(`${record.id}: 공식 지역 필드 불일치`);
  const gradeNumber = Number(record.page.gradeSlug.split("-").at(-1));
  const allowedSubjects = record.school.level === "elementary" && gradeNumber < 3 ? ["math", "korean"] : ["math", "english", "korean", "science", "social"];
  const gradeMaximum = record.school.level === "elementary" ? 6 : 3;
  if (record.page.gradeSlug.startsWith(`${record.school.level}-`) && gradeNumber >= 1 && gradeNumber <= gradeMaximum && allowedSubjects.includes(record.page.subjectSlug)) accuracy.gradeSubject++;
  else errors.push(`${record.id}: 학년/과목 조합 오류`);
  if (sheetUrls.has(record.page.url) || productionUrls.has(record.page.url)) errors.push(`${record.id}: 기존 URL 충돌`);
  if (/시험 (난이도|출제 경향|출제 비율)은/.test(record.content.paragraphs.join(" "))) errors.push(`${record.id}: 미확인 시험 사실`);
  if (!record.page.title || !record.page.description || record.page.canonical !== `https://studyhigh.co.kr${record.page.url}` || !record.image.path || !record.image.alt) issueCounts.seo++;
  if (!Array.isArray(record.content.faq) || record.content.faq.length < 2 || record.content.faq.some((faq) => !faq.question.endsWith("?") || !faq.answer)) issueCounts.aeo++;
  const geoText = `${record.content.paragraphs.join(" ")} ${record.page.title}`;
  if (![record.region.sido, record.region.sigungu, record.region.representativeRegion, record.school.name, record.page.grade, record.page.subject].every((value) => geoText.includes(value))) issueCounts.geo++;
}
console.log(JSON.stringify({ count: records.length, levelCounts: Object.fromEntries(["elementary", "middle", "high"].map((level) => [level, records.filter((r) => r.school.level === level).length])), accuracy, duplicates: { url: duplicateCount(records.map((r) => r.page.url)), title: duplicateCount(records.map((r) => r.page.title)), description: duplicateCount(records.map((r) => r.page.description)), faq: duplicateCount(records.flatMap((r) => r.content.faq.map((faq) => faq.question))) }, existingUrlCollisions: records.filter((r) => sheetUrls.has(r.page.url) || productionUrls.has(r.page.url)).length, maximumCoreSimilarityPercent: Number((maximumSimilarity.value * 100).toFixed(2)), maximumSimilarityPair: maximumSimilarity.pair, maximumFullBodySimilarityPercent: Number((maximumFullBodySimilarity.value * 100).toFixed(2)), maximumFullBodySimilarityPair: maximumFullBodySimilarity.pair, maximumFaqSimilarityPercent: Number((maximumFaqSimilarity.value * 100).toFixed(2)), maximumFaqSimilarityPair: maximumFaqSimilarity.pair, issueCounts, errors, pass: errors.length === 0 && Object.values(issueCounts).every((count) => count === 0) }, null, 2));
if (errors.length) process.exit(1);
