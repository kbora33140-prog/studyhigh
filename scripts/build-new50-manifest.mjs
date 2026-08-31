import fs from 'node:fs';
import { profiles } from './new50-content.mjs';
import { examples } from './new50-examples.mjs';

const regions = JSON.parse(fs.readFileSync('data/regions/daejeon.json'));
const schools = JSON.parse(fs.readFileSync('data/schools/daejeon.json'));
const old = JSON.parse(fs.readFileSync('data/manifests/daejeon/test-30-v1.json'));
const names = { math: '수학', english: '영어', korean: '국어', science: '과학' };
const base = 'https://studyhigh.co.kr';
const records = profiles.map((p, index) => {
  const school = schools.schools.find(s => s.code === p.schoolCode);
  if (!school) throw new Error(`Unknown school ${p.schoolCode}`);
  const district = regions.districts.find(d => d.id === school.region.districtId);
  const town = district.towns.find(t => t.id === school.region.townId);
  if (!town || !town.schoolIds.includes(school.id)) throw new Error('School/region mismatch');
  const grade = school.schoolType === 'middle' ? '중등' : '고등';
  const subject = names[p.subject];
  const url = `/tutoring/daejeon/${district.slug}/${town.slug}/${p.subject}`;
  if (old.records.some(r => r.page.url === url)) throw new Error(`Existing URL ${url}`);
  const title = `${town.name} ${grade} ${subject}과외 | ${p.theme} | 스터디하이`;
  const description = `${town.name} ${grade} ${subject}과외에서 ${p.theme} 과정을 살펴봅니다. ${p.concern} ${school.name}의 실제 진도와 학생 기록을 바탕으로 1:1 학습 방향을 상담합니다.`;
  const imagePath = `/seo-images/20260901/daejeon-${district.slug}-${town.slug}-${school.schoolType}-${p.subject}.png`;
  return {
    id: `page:daejeon:20260901:${String(index + 1).padStart(3, '0')}`,
    status: 'validated', createdAt: '2026-09-01',
    region: { sido: '대전광역시', sigungu: district.name, eupmyeondong: town.name, provinceSlug: 'daejeon', districtSlug: district.slug, townSlug: town.slug, townId: town.id },
    school: { id: school.id, name: school.name, type: school.schoolType, typeName: school.schoolTypeName, address: school.address.road, addressDetail: school.address.detail, source: schools.meta.source, sourceDate: schools.meta.sourceDate },
    page: { url, canonical: base + url, title, description, grade, subject, subjectSlug: p.subject },
    content: {
      theme: p.theme, introduction: `${town.name} ${grade} ${subject}: ${p.concern} ${p.unit}`,
      regionContext: `${district.name} ${town.name} · ${school.name} 학생을 위한 학습 제안입니다. ${p.parent}`,
      schoolAnalysis: `${school.name} (${school.schoolTypeName}) · ${school.address.road}. 학교 기본정보 기준: ${schools.meta.sourceDate}.`,
      exam: p.exam, examCaveat: '학교별 출제 경향은 미확인입니다. 실제 범위표로 아래 학습 제안을 조정합니다.',
      concern: p.concern, difficultUnit: p.unit, studyMethod: p.method, parentConcern: p.parent, workedExample: examples[index],
      lesson: p.method,
      faq: [{ question: `${town.name} ${grade} ${subject} 학습 상담: ${p.question}`, answer: p.answer },
        { question: `${school.name} ${subject} 상담에서 ${p.theme} 과제는 어떻게 살펴보나요?`, answer: `${p.exam} ${p.parent}` }],
    },
    seo: { title, description, canonical: base + url, ogTitle: title, ogDescription: description, ogImage: base + imagePath, keywords: [`${town.name} ${grade} ${subject}과외`, `${school.name} ${subject}`, p.theme] },
    image: { masterImage: '/thumbnails/studyhigh-official-template.png', imagePath, imageUrl: base + imagePath, alt: `${town.name} ${grade} ${subject}과외 — ${p.theme}`, regionText: town.name, subjectText: `${subject}과외`, width: 1254, height: 1254 },
    provenance: { regionFile: 'data/regions/daejeon.json', schoolFile: 'data/schools/daejeon.json', schoolId: school.id, teachingAdvice: 'editorial-general-guidance', verifiedSchoolExamPattern: false },
  };
});
for (const field of ['url', 'title', 'canonical']) if (new Set(records.map(r => r.page[field])).size !== 50) throw new Error(`Duplicate ${field}`);
if (records.length !== 50) throw new Error('Expected exactly 50');
fs.writeFileSync('data/manifests/daejeon/additional-50-20260901.json', JSON.stringify({ version: 1, batch: '20260901-50', records }, null, 2) + '\n');
console.log(JSON.stringify({ count: records.length, urls: records.map(r => r.page.url) }));
