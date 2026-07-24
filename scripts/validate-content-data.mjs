import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "data", "content");
const errors = [];

async function load(name) {
  return JSON.parse(await readFile(path.join(contentDir, name), "utf8"));
}

function validateRecords(records, minimum, label, uniqueField = "id") {
  if (records.length < minimum) errors.push(`${label}: ${records.length} < ${minimum}`);
  const seen = new Set();
  for (const record of records) {
    if (!record[uniqueField]) errors.push(`${label}: missing ${uniqueField}`);
    if (seen.has(record[uniqueField])) {
      errors.push(`${label}: duplicate ${uniqueField}: ${record[uniqueField]}`);
    }
    seen.add(record[uniqueField]);
  }
}

const [students, parents, schoolFeatures, examPatterns, studyMethods, faq, keywords] =
  await Promise.all([
    load("students.json"),
    load("parents.json"),
    load("schoolFeatures.json"),
    load("examPatterns.json"),
    load("studyMethods.json"),
    load("faq.json"),
    load("keywords.json"),
  ]);

validateRecords(students.students, 3000, "students");
validateRecords(students.students, 3000, "student titles", "title");
validateRecords(parents.parents, 3000, "parents");
validateRecords(parents.parents, 3000, "parent titles", "title");
validateRecords(schoolFeatures.schoolFeatures, 1000, "schoolFeatures");
validateRecords(examPatterns.examPatterns, 1000, "examPatterns");
validateRecords(studyMethods.studyMethods, 1000, "studyMethods");
validateRecords(faq.faq, 5000, "faq");
validateRecords(faq.faq, 5000, "faq questions", "question");
validateRecords(keywords.keywords, 1000, "keywords");
validateRecords(keywords.keywords, 1000, "keyword text", "keyword");

const schoolIndex = JSON.parse(
  await readFile(path.join(root, "data", "schools", "index.json"), "utf8"),
);
const expectedSchools = schoolIndex.provinces.reduce(
  (total, province) => total + province.schoolCount,
  0,
);
if (schoolFeatures.schoolFeatures.length !== expectedSchools) {
  errors.push(
    `schoolFeatures: ${schoolFeatures.schoolFeatures.length} !== ${expectedSchools}`,
  );
}
if (schoolFeatures.schoolFeatures.some((record) => !record.factualFieldsOnly)) {
  errors.push("schoolFeatures: non-factual feature record found");
}

if (errors.length) {
  console.error(errors.slice(0, 100).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify({
      students: students.students.length,
      parents: parents.parents.length,
      schoolFeatures: schoolFeatures.schoolFeatures.length,
      examPatterns: examPatterns.examPatterns.length,
      studyMethods: studyMethods.studyMethods.length,
      faq: faq.faq.length,
      keywords: keywords.keywords.length,
    }),
  );
}
