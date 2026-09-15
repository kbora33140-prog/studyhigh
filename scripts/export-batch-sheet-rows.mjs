import fs from "node:fs/promises";
import path from "node:path";

const batchId = process.argv[2] || "batch-001";
const read = async (file) => JSON.parse(await fs.readFile(file, "utf8"));
const manifest = await read(`data/manifests/nationwide/batches/${batchId}.json`);
const schoolIndex = await read("data/schools/index.json");
const regionIndex = await read("data/regions/index.json");
const schoolFiles = await Promise.all(schoolIndex.provinces.map((entry) => read(path.join("data/schools", entry.file))));
const regionFiles = await Promise.all(regionIndex.provinces.map((entry) => read(path.join("data/regions", entry.file))));
const schools = new Map(schoolFiles.flatMap((file) => file.schools).map((school) => [school.slug, school]));
const provinces = new Map(regionFiles.map((file) => [file.province.id, file.province.name]));
const districts = new Map(regionFiles.flatMap((file) => file.districts).map((district) => [district.id, district.name]));
const towns = new Map(regionFiles.flatMap((file) => file.districts.flatMap((district) => district.towns)).map((town) => [town.id, town.name.replace(/제?\d+(?:·\d+)*동$/, "동")]));
const subjects = { math: "수학", english: "영어", korean: "국어", science: "과학", social: "사회" };
const gradeLabel = (slug) => slug.replace("elementary-", "초등 ").replace("middle-", "중등 ").replace("high-", "고등 ") + "학년";
const rows = manifest.records.map((record, index) => {
  const school = schools.get(record.route.school);
  if (!school?.region) throw new Error(`Missing school: ${record.route.school}`);
  const province = provinces.get(school.region.provinceId);
  const district = districts.get(school.region.districtId);
  const town = towns.get(school.region.townId);
  const grade = gradeLabel(record.route.grade);
  const subject = subjects[record.route.subject];
  const title = `${town} ${school.name} ${grade} ${subject}과외 | 1:1 맞춤 학습관리 | 스터디하이`;
  const description = `${province} ${district} ${town} ${school.name} ${grade} ${subject}과외 안내입니다. 공식 학교 정보와 학생의 현재 학습 기록을 바탕으로 개념, 숙제, 오답, 자기주도학습 순서를 맞춤 설계합니다.`;
  return [
    `page:nationwide:${batchId}:${String(index + 1).padStart(3, "0")}`, "published", "school", record.url,
    `${province} ${district} ${town}`, school.name, grade, subject,
    `${town} ${grade} ${subject}과외`, `${town} ${subject}과외, ${school.name} ${subject}, ${district} 1:1 과외`,
    `nationwide-${batchId}`, title, description, `${town} ${school.name} ${grade} ${subject}과외`,
    `${school.name}의 공식 학교 정보와 학생의 현재 학습 기록을 바탕으로 ${grade} ${subject} 학습 방향을 점검합니다.`,
    "공식 학교 정보 기반 학습 진단", `${school.address.road} 생활권에서 확인 가능한 학교 자료와 학생의 과제·오답 기록을 기준으로 맞춤 학습 계획을 세웁니다.`,
  ];
});
console.log(JSON.stringify({ batchId, rows }));
