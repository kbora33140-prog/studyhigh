import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const REGION_DIR = path.join(ROOT, "data", "regions");
const SCHOOL_DIR = path.join(ROOT, "data", "schools");
const REGION_SOURCE =
  "https://portal.esrikr.com/arcgis/rest/services/Hosted/GEMD_view/FeatureServer/0/query";
const SCHOOL_SOURCE =
  "https://portal.esrikr.com/arcgis/rest/services/Hosted/KR_School_Info/FeatureServer";
const SCHEMA_VERSION = "1.0.0";

const provinceSlugOverrides = new Map([
  ["서울특별시", "seoul"],
  ["부산광역시", "busan"],
  ["대구광역시", "daegu"],
  ["인천광역시", "incheon"],
  ["광주광역시", "gwangju"],
  ["대전광역시", "daejeon"],
  ["울산광역시", "ulsan"],
  ["세종특별자치시", "sejong"],
  ["경기도", "gyeonggi"],
  ["강원특별자치도", "gangwon"],
  ["충청북도", "chungbuk"],
  ["충청남도", "chungnam"],
  ["전북특별자치도", "jeonbuk"],
  ["전라남도", "jeonnam"],
  ["경상북도", "gyeongbuk"],
  ["경상남도", "gyeongnam"],
  ["제주특별자치도", "jeju"],
  ["전남광주통합특별시", "gwangju-jeonnam"],
]);

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchJson(url, params) {
  const target = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    target.searchParams.set(key, String(value));
  }
  const response = await fetch(target, {
    headers: { "user-agent": "StudyHigh-SEO-Data/1.0" },
  });
  if (!response.ok) throw new Error(`${response.status} ${target}`);
  return response.json();
}

async function getRegions() {
  const countData = await fetchJson(REGION_SOURCE, {
    where: "1=1",
    returnCountOnly: true,
    f: "json",
  });
  const pageSize = 1000;
  const rows = [];
  for (let offset = 0; offset < countData.count; offset += pageSize) {
    const data = await fetchJson(REGION_SOURCE, {
      where: "1=1",
      outFields:
        "emd_cd,emd_eng_nm,emd_kor_nm,ctprvn_cd,ctp_eng_nm,ctp_kor_nm,sig_cd,sig_eng_nm,sig_kor_nm",
      returnGeometry: false,
      orderByFields: "emd_cd",
      resultOffset: offset,
      resultRecordCount: pageSize,
      f: "json",
    });
    rows.push(...data.features.map(({ attributes }) => attributes));
  }
  return rows;
}

async function getSchools() {
  const rows = [];
  for (const layer of [0, 1, 2]) {
    const source = `${SCHOOL_SOURCE}/${layer}/query`;
    const countData = await fetchJson(source, {
      where: "1=1",
      returnCountOnly: true,
      f: "json",
    });
    for (let offset = 0; offset < countData.count; offset += 1000) {
      const data = await fetchJson(source, {
        where: "1=1",
        outFields:
          "objectid,type,admin_code,name,eng_name,estb_name,postal,address,address_sub,ctp_name,update_date,x,y",
        returnGeometry: false,
        orderByFields: "admin_code",
        resultOffset: offset,
        resultRecordCount: 1000,
        f: "json",
      });
      rows.push(
        ...data.features.map(({ attributes }) => ({ ...attributes, _layer: layer })),
      );
    }
  }
  const unique = new Map();
  for (const row of rows) {
    const key = row.admin_code
      ? `code:${row.admin_code}`
      : `pending:${row._layer}:${row.objectid}`;
    if (!unique.has(key)) unique.set(key, row);
  }
  return [...unique.values()];
}

function makeRegionModel(rows) {
  const provinces = new Map();
  for (const row of rows) {
    const provinceSlug =
      provinceSlugOverrides.get(row.ctp_kor_nm) || slugify(row.ctp_eng_nm);
    let province = provinces.get(row.ctprvn_cd);
    if (!province) {
      province = {
        id: `province:${row.ctprvn_cd}`,
        code: row.ctprvn_cd,
        name: row.ctp_kor_nm,
        englishName: row.ctp_eng_nm,
        slug: provinceSlug,
        districts: new Map(),
      };
      provinces.set(row.ctprvn_cd, province);
    }
    let district = province.districts.get(row.sig_cd);
    if (!district) {
      district = {
        id: `district:${row.sig_cd}`,
        code: row.sig_cd,
        name: row.sig_kor_nm,
        englishName: row.sig_eng_nm,
        slug: slugify(row.sig_eng_nm),
        towns: [],
      };
      province.districts.set(row.sig_cd, district);
    }
    district.towns.push({
      id: `town:${row.emd_cd}`,
      code: row.emd_cd,
      name: row.emd_kor_nm,
      englishName: row.emd_eng_nm,
      slug: slugify(row.emd_eng_nm),
      schoolIds: [],
      extensions: {},
    });
  }
  return [...provinces.values()];
}

const provinceAliases = new Map([
  ["강원도", "강원특별자치도"],
  ["전라북도", "전북특별자치도"],
  ["전북특별자치도", "전북특별자치도"],
  ["광주광역시", "전남광주통합특별시"],
  ["전라남도", "전남광주통합특별시"],
]);

function findTown(school, provinces) {
  const address = `${school.address || ""} ${school.address_sub || ""}`;
  const sourceProvinceName = provinceAliases.get(school.ctp_name) || school.ctp_name;
  const candidates = provinces.filter(
    (province) =>
      province.name === sourceProvinceName ||
      address.includes(province.name) ||
      (province.name === "전남광주통합특별시" &&
        ["광주광역시", "전라남도"].some((name) => address.includes(name))),
  );
  const scored = [];
  for (const province of candidates) {
    for (const district of province.districts.values()) {
      if (!address.includes(district.name)) continue;
      for (const town of district.towns) {
        const match = address.match(
          new RegExp(`(?:^|[\\s,(/])${town.name}(?:[\\s,/)]|$)`),
        );
        if (match) scored.push({ province, district, town, score: town.name.length });
      }
    }
  }
  scored.sort((a, b) => b.score - a.score || a.town.code.localeCompare(b.town.code));
  return scored[0] || null;
}

function regionLookup(provinces) {
  const lookup = new Map();
  for (const province of provinces) {
    for (const district of province.districts.values()) {
      for (const town of district.towns) {
        lookup.set(town.code, { province, district, town });
      }
    }
  }
  return lookup;
}

async function findTownSpatially(school, lookup) {
  if (!Number.isFinite(school.x) || !Number.isFinite(school.y)) return null;
  const data = await fetchJson(REGION_SOURCE, {
    where: "1=1",
    geometry: JSON.stringify({
      x: school.x,
      y: school.y,
      spatialReference: { wkid: 4326 },
    }),
    geometryType: "esriGeometryPoint",
    inSR: 4326,
    spatialRel: "esriSpatialRelIntersects",
    outFields: "emd_cd",
    returnGeometry: false,
    f: "json",
  });
  const code = data.features?.[0]?.attributes?.emd_cd;
  return code ? lookup.get(code) || null : null;
}

function makeSchool(row, link) {
  const schoolType = {
    초등학교: "elementary",
    중학교: "middle",
    고등학교: "high",
  }[row.type];
  const code = row.admin_code
    ? String(row.admin_code)
    : `pending-${row._layer}-${row.objectid}`;
  const readableSlug = slugify(row.eng_name || row.name);
  return {
    id: `school:${code}`,
    code,
    name: row.name,
    englishName: row.eng_name || null,
    schoolType,
    schoolTypeName: row.type,
    establishmentType: row.estb_name || null,
    address: {
      postalCode: row.postal ? String(row.postal).padStart(5, "0") : null,
      road: row.address || null,
      detail: row.address_sub || null,
    },
    slug: `${readableSlug || "school"}-${code}`,
    region: link
      ? {
          provinceId: link.province.id,
          districtId: link.district.id,
          townId: link.town.id,
        }
      : null,
    extensions: {},
  };
}

function metadata(source, sourceDate) {
  return {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    source,
    sourceDate,
  };
}

async function main() {
  const [regionRows, schoolRows] = await Promise.all([getRegions(), getSchools()]);
  const provinces = makeRegionModel(regionRows);
  const townLookup = regionLookup(provinces);
  const schoolsByProvince = new Map(provinces.map((item) => [item.id, []]));
  const unmatched = [];

  for (let offset = 0; offset < schoolRows.length; offset += 25) {
    const batch = schoolRows.slice(offset, offset + 25);
    const links = await Promise.all(
      batch.map(async (row) => {
        const addressLink = findTown(row, provinces);
        return addressLink || findTownSpatially(row, townLookup);
      }),
    );
    for (let index = 0; index < batch.length; index += 1) {
      const row = batch[index];
      const link = links[index];
    const school = makeSchool(row, link);
    if (!link) {
      unmatched.push(school);
      continue;
    }
    link.town.schoolIds.push(school.id);
    schoolsByProvince.get(link.province.id).push(school);
    }
  }

  await Promise.all([
    rm(REGION_DIR, { recursive: true, force: true }),
    rm(SCHOOL_DIR, { recursive: true, force: true }),
  ]);
  await Promise.all([
    mkdir(REGION_DIR, { recursive: true }),
    mkdir(SCHOOL_DIR, { recursive: true }),
  ]);

  const regionIndex = [];
  const schoolIndex = [];
  for (const province of provinces.sort((a, b) => a.code.localeCompare(b.code))) {
    const districts = [...province.districts.values()]
      .sort((a, b) => a.code.localeCompare(b.code))
      .map((district) => ({
        ...district,
        towns: district.towns.sort((a, b) => a.code.localeCompare(b.code)),
      }));
    const regionDocument = {
      meta: metadata(
        "행정안전부 행정동 경계 (Esri Korea Living Atlas 재배포)",
        "2026-07",
      ),
      province: {
        id: province.id,
        code: province.code,
        name: province.name,
        englishName: province.englishName,
        slug: province.slug,
      },
      districts,
      extensions: {},
    };
    const schools = schoolsByProvince
      .get(province.id)
      .sort((a, b) => a.code.localeCompare(b.code));
    const schoolDocument = {
      meta: metadata(
        "교육부 나이스 학교기본정보 (Esri Korea Living Atlas 재배포)",
        "2026-02",
      ),
      provinceId: province.id,
      schools,
      extensions: {},
    };
    await Promise.all([
      writeFile(
        path.join(REGION_DIR, `${province.slug}.json`),
        `${JSON.stringify(regionDocument, null, 2)}\n`,
      ),
      writeFile(
        path.join(SCHOOL_DIR, `${province.slug}.json`),
        `${JSON.stringify(schoolDocument, null, 2)}\n`,
      ),
    ]);
    regionIndex.push({
      ...regionDocument.province,
      file: `${province.slug}.json`,
      districtCount: districts.length,
      townCount: districts.reduce((sum, item) => sum + item.towns.length, 0),
    });
    schoolIndex.push({
      provinceId: province.id,
      file: `${province.slug}.json`,
      schoolCount: schools.length,
    });
  }

  await Promise.all([
    writeFile(
      path.join(REGION_DIR, "index.json"),
      `${JSON.stringify({ meta: metadata("generated index", "2026-07"), provinces: regionIndex }, null, 2)}\n`,
    ),
    writeFile(
      path.join(SCHOOL_DIR, "index.json"),
      `${JSON.stringify({ meta: metadata("generated index", "current"), provinces: schoolIndex, unmatchedFile: "_unmatched.json", unmatchedCount: unmatched.length }, null, 2)}\n`,
    ),
    writeFile(
      path.join(SCHOOL_DIR, "_unmatched.json"),
      `${JSON.stringify({ meta: metadata("generated mapping exceptions", "current"), schools: unmatched }, null, 2)}\n`,
    ),
  ]);

  console.log(
    JSON.stringify({
      provinces: provinces.length,
      towns: regionRows.length,
      schools: schoolRows.length,
      matched: schoolRows.length - unmatched.length,
      unmatched: unmatched.length,
    }),
  );
}

await main();
