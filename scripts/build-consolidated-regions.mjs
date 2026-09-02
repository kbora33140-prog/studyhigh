import fs from "node:fs";

const aliases = JSON.parse(fs.readFileSync("data/config/canonical-tutoring-aliases.json", "utf8"));
const sourceRecords = [
  ...JSON.parse(fs.readFileSync("data/manifests/daejeon/test-30-v1.json", "utf8")).records,
  ...JSON.parse(fs.readFileSync("data/manifests/daejeon/additional-50-20260901.json", "utf8")).records,
];

const byUrl = new Map(sourceRecords.map((record) => [record.page.url, record]));
const uniqueTargets = new Map();

for (const alias of aliases) {
  // Three-segment legacy targets already exist in tutoringArticles and must not
  // be regenerated or have their content changed.
  if (alias.target.split("/").filter(Boolean).length === 4) continue;
  if (!uniqueTargets.has(alias.target)) uniqueTargets.set(alias.target, alias);
}

function replaceDeep(value, alias) {
  if (typeof value === "string") {
    return value
      .replaceAll(alias.source, alias.target)
      .replaceAll(`https://studyhigh.co.kr${alias.source}`, `https://studyhigh.co.kr${alias.target}`)
      .replaceAll(alias.sourceName, alias.targetName);
  }
  if (Array.isArray(value)) return value.map((item) => replaceDeep(item, alias));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceDeep(item, alias)]));
  }
  return value;
}

function toCommonRecord(source) {
  if (typeof source.content.introduction === "string") return source;
  return {
    ...source,
    school: {
      id: source.school.schoolSlug,
      name: source.school.schoolName,
      type: source.school.schoolType,
      typeName: source.school.schoolType === "high" ? "고등학교" : source.school.schoolType === "middle" ? "중학교" : "초등학교",
      address: "",
      addressDetail: "",
      source: "프로젝트 검증 학교 데이터",
      sourceDate: source.createdAt,
    },
    content: {
      theme: source.image.thumbnailText.optionalSchoolOrTopic,
      introduction: source.content.regionIntro.text,
      regionContext: source.geo.localLearningContext.text,
      schoolAnalysis: source.content.schoolAnalysis.text,
      exam: source.content.examCharacteristics[0].text,
      examCaveat: "학교별 출제 경향은 단정하지 않고 실제 시험 범위와 학생 자료를 확인해 조정합니다.",
      concern: source.content.learningConcerns[0].text,
      difficultUnit: source.content.difficultUnits[0].text,
      studyMethod: source.content.studyMethod[0].text,
      parentConcern: source.content.consultationType.text,
      workedExample: `${source.content.examCharacteristics[0].text} ${source.content.studyMethod[0].text}`,
      lesson: source.content.studyMethod[0].text,
      faq: source.content.faq.map(({ question, answer }) => ({ question, answer })),
    },
    image: {
      masterImage: source.image.masterImage,
      imagePath: source.image.imagePath,
      imageUrl: source.image.imageUrl,
      alt: source.image.alt,
      regionText: source.image.thumbnailText.eupmyeondong,
      subjectText: source.image.thumbnailText.subject,
      width: 1254,
      height: 1254,
    },
  };
}

const records = [...uniqueTargets.values()].map((alias, index) => {
  const source = byUrl.get(alias.source);
  if (!source) throw new Error(`Missing source manifest record: ${alias.source}`);
  const record = replaceDeep(toCommonRecord(structuredClone(source)), alias);
  const parts = alias.target.split("/").filter(Boolean);
  const district = parts[2];
  const town = parts[3];
  const subject = parts[4];
  const imagePath = `/api/seo-thumbnail?dong=${encodeURIComponent(alias.targetName)}&subject=${subject}`;
  record.id = `page:daejeon:canonical:${String(index + 1).padStart(3, "0")}`;
  record.createdAt = "2026-09-02";
  record.region.eupmyeondong = alias.targetName;
  record.region.townSlug = town;
  record.region.townId = `canonical:${district}:${town}`;
  record.page.url = alias.target;
  record.page.canonical = `https://studyhigh.co.kr${alias.target}`;
  record.seo.canonical = record.page.canonical;
  record.image.imagePath = imagePath;
  record.image.imageUrl = `https://studyhigh.co.kr${imagePath}`;
  record.image.regionText = alias.targetName;
  record.image.alt = `${alias.targetName} ${record.page.grade} ${record.page.subject}과외 — ${record.content.theme}`;
  record.seo.ogImage = record.image.imageUrl;
  record.provenance = { ...(record.provenance ?? {}), canonicalizedFrom: alias.source };
  return record;
});

if (records.length !== 15) throw new Error(`Expected 15 canonical records, got ${records.length}`);
const urls = records.map((record) => record.page.url);
if (new Set(urls).size !== records.length) throw new Error("Duplicate canonical URL");

fs.writeFileSync(
  "data/manifests/daejeon/consolidated-15-20260902.json",
  `${JSON.stringify({ version: 1, batch: "canonical-regions-20260902", records }, null, 2)}\n`,
);
console.log(JSON.stringify({ records: records.length, urls }, null, 2));
