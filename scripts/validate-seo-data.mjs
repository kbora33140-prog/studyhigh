import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const REGION_DIR = path.join(ROOT, "data", "regions");
const SCHOOL_DIR = path.join(ROOT, "data", "schools");

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

const regionIndex = await readJson(path.join(REGION_DIR, "index.json"));
const schoolIndex = await readJson(path.join(SCHOOL_DIR, "index.json"));
const townIds = new Set();
const schoolReferences = new Map();
const errors = [];

for (const province of regionIndex.provinces) {
  const document = await readJson(path.join(REGION_DIR, province.file));
  for (const district of document.districts) {
    for (const town of district.towns) {
      if (townIds.has(town.id)) errors.push(`duplicate town id: ${town.id}`);
      townIds.add(town.id);
      for (const schoolId of town.schoolIds) {
        if (schoolReferences.has(schoolId)) errors.push(`duplicate school link: ${schoolId}`);
        schoolReferences.set(schoolId, town.id);
      }
    }
  }
}

let schoolCount = 0;
for (const province of schoolIndex.provinces) {
  const document = await readJson(path.join(SCHOOL_DIR, province.file));
  for (const school of document.schools) {
    schoolCount += 1;
    if (!school.region || !townIds.has(school.region.townId)) {
      errors.push(`invalid region on ${school.id}`);
    }
    if (schoolReferences.get(school.id) !== school.region?.townId) {
      errors.push(`reverse link mismatch on ${school.id}`);
    }
  }
}

const unmatched = await readJson(path.join(SCHOOL_DIR, "_unmatched.json"));
if (unmatched.schools.length) {
  errors.push(`${unmatched.schools.length} schools are unmatched`);
}

const expectedRegionFiles = new Set([
  "index.json",
  ...regionIndex.provinces.map(({ file }) => file),
]);
const actualRegionFiles = new Set(await readdir(REGION_DIR));
for (const file of actualRegionFiles) {
  if (!expectedRegionFiles.has(file)) errors.push(`unexpected region file: ${file}`);
}

if (errors.length) {
  console.error(errors.slice(0, 100).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify({
      provinces: regionIndex.provinces.length,
      towns: townIds.size,
      schools: schoolCount,
      linkedSchools: schoolReferences.size,
    }),
  );
}
