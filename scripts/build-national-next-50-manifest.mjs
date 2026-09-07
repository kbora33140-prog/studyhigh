import fs from "node:fs";
import { profiles as authoredProfiles } from "./new50-content.mjs";

const base = "https://studyhigh.co.kr";
const createdAt = "2026-09-07";
const subjectNames = { math: "수학", english: "영어", korean: "국어", science: "과학", social: "사회" };
const places = [
  ["daegu","대구광역시","buk-gu","북구","guam-dong","구암동","town:2723074500"],
  ["daegu","대구광역시","dalseo-gu","달서구","seongdang-dong","성당동","town:2729051500"],
  ["daegu","대구광역시","dalseo-gu","달서구","dowon-dong","도원동","town:2729062800"],
  ["daegu","대구광역시","dalseo-gu","달서구","jincheon-dong","진천동","town:2729061500"],
  ["daegu","대구광역시","dong-gu","동구","hyeoksin-dong","혁신동","town:2714075500"],
  ["incheon","인천광역시","namdong-gu","남동구","nonhyeongojan-dong","논현고잔동","town:2820071000"],
  ["incheon","인천광역시","geomdan-gu","검단구","dangha-dong","당하동","town:2829054000"],
  ["incheon","인천광역시","michuhol-gu","미추홀구","gwangyo-dong","관교동","town:2817770000"],
  ["incheon","인천광역시","seohae-gu","서해구","geomamgyeongseo-dong","검암경서동","town:2827551500"],
  ["incheon","인천광역시","geomdan-gu","검단구","wondang-dong","원당동","town:2829053000"],
];
const topics = {
  math: ["다항식 계산 기록","방정식 해 검산","함수 대응 관계","도형 조건 표시","확률 표본공간","수열 항의 연결","지수 법칙 적용","삼각비 기준각","극한 변화 관찰","미분 식과 그래프"],
  english: ["어휘 문맥 회상","주절 먼저 읽기","대명사 연결","접속어 논리","본문 변형 대응","서술형 어순","빈칸 근거 찾기","문단 요약","듣기 정보 선별","독해 시간 배분"],
  korean: ["문단 핵심 질문","문학 근거 표시","화자 태도 변화","고전 장면 정리","문법 판별 기준","선택지 범위 판단","매체 의도 비교","서술형 답안 구조","논증 전제 확인","독서 개념어 추론"],
  science: ["실험 변인 통제","그래프 축과 단위","원자 수 보존","알짜힘 방향","유전 조합 과정","회로 측정 위치","지질 사건 순서","밀도 비율 해석","산화수 변화","파동 반복 주기"],
  social: ["축척 단위 환산","인구 변화 비교","기회비용 선택","권력 기관 관계","역사 인과 지도","윤리 논거 비교","법 사례 요건","기후와 산업 연결","문화 판단 기준","조사 자료 한계"],
};
const issueStarts = [
  "풀이를 시작하지만 첫 조건을 기록하지 않아 뒤 단계에서 다시 막힙니다.",
  "용어는 기억해도 새로운 자료에 적용할 근거를 말하지 못합니다.",
  "정답을 확인한 뒤 틀린 과정 대신 결과만 고쳐 같은 실수가 남습니다.",
  "시험 범위를 한꺼번에 복습해 취약한 부분에 시간을 배분하지 못합니다.",
  "혼자 공부할 때 멈추는 기준과 질문할 지점을 정하지 못합니다.",
  "쉬운 문제에 시간을 많이 쓰고 확인이 필요한 문항을 뒤로 미루지 못합니다.",
  "학교 자료와 문제집을 따로 공부해 같은 개념의 연결을 놓칩니다.",
  "설명을 들을 때는 이해하지만 다음 날 스스로 재현하지 못합니다.",
  "여러 조건이 제시되면 중요한 정보와 보조 정보를 구분하지 못합니다.",
  "목표 점수는 있지만 주간 학습량과 복습 시점을 구체화하지 못합니다.",
];
const practices = [
  "조건을 세 칸 표로 옮기고 풀이 전 예상과 풀이 후 검산을 한 줄씩 남깁니다.",
  "개념을 자기 말로 설명한 뒤 서로 다른 두 사례에 같은 판단 기준을 적용합니다.",
  "오답이 시작된 문장을 표시하고 당일 재풀이와 사흘 뒤 변형 문제를 연결합니다.",
  "범위를 주차별로 나누고 개념 확인, 학교 자료, 오답 회수 순으로 완료 여부를 기록합니다.",
  "막힌 지점에 질문 꼬리표를 붙이고 수업 뒤 혼자 설명할 수 있는지 확인합니다.",
  "문항별 목표 시간을 정하고 근거가 불충분한 문제만 표시해 마지막에 돌아옵니다.",
  "교과서 개념 옆에 학교 프린트와 문제집의 대응 문항 번호를 함께 적습니다.",
  "수업 직후 빈 종이에 핵심 순서를 복원하고 다음 날 빠진 단계를 보완합니다.",
  "필수 조건에는 번호를 붙이고 사용한 조건을 풀이 줄마다 연결해 누락을 점검합니다.",
  "일주일 목표를 세 번의 짧은 과제로 나눠 수행률과 정확도를 함께 확인합니다.",
];
const diagnoses = [
  "첫 풀이를 말로 재현하게 해 이해가 끊기는 순간과 단순 기록 실수를 구별합니다.",
  "정답을 가린 상태에서 판단 기준을 다시 설명하게 하고 근거가 빠진 부분을 찾습니다.",
  "최근 오답 세 개를 나란히 놓아 반복되는 행동과 우연한 실수를 따로 분류합니다.",
  "시험 범위표에 학습 완료, 설명 가능, 재풀이 필요 상태를 서로 다른 기호로 표시합니다.",
  "혼자 풀 때 질문이 생긴 시점과 도움을 받은 뒤 바뀐 풀이 순서를 함께 기록합니다.",
  "제한 시간을 구간별로 나누어 읽기, 계획, 해결, 검토 중 어디에서 시간이 새는지 측정합니다.",
  "같은 개념이 교과서와 학교 자료에서 어떻게 다르게 표현되는지 대응표를 만듭니다.",
  "수업 다음 날 빈 종이 복원을 진행해 단기 이해와 장기 기억의 차이를 확인합니다.",
  "제시 조건을 필수와 보조로 나눈 뒤 하나를 뺐을 때 결론이 달라지는지 검사합니다.",
  "주간 기록에서 계획량, 실제 수행량, 정확도를 비교해 목표가 현실적인지 조정합니다.",
];

const records = [];
for (let placeIndex = 0; placeIndex < places.length; placeIndex += 1) {
  const [provinceSlug,sido,districtSlug,sigungu,townSlug,townName,townId] = places[placeIndex];
  const regions = JSON.parse(fs.readFileSync(`data/regions/${provinceSlug}.json`, "utf8"));
  const schools = JSON.parse(fs.readFileSync(`data/schools/${provinceSlug}.json`, "utf8"));
  const district = regions.districts.find((item) => item.slug === districtSlug);
  const town = district?.towns.find((item) => item.id === townId);
  if (!town || town.slug !== townSlug || /[0-9]/.test(town.name)) throw new Error(`Invalid town ${townName}`);
  const school = schools.schools.find((item) => item.region.townId === townId && ["middle","high"].includes(item.schoolType) && !item.id.includes("pending"));
  if (!school || !town.schoolIds.includes(school.id)) throw new Error(`No verified school ${townName}`);
  const grade = school.schoolType === "middle" ? "중등" : "고등";
  for (const [subjectSlug, subject] of Object.entries(subjectNames)) {
    const subjectIndex = Object.keys(subjectNames).indexOf(subjectSlug);
    const pageIndex = placeIndex * Object.keys(subjectNames).length + subjectIndex;
    const issueIndex = pageIndex % issueStarts.length;
    const diagnosisIndex = Math.floor(pageIndex / issueStarts.length);
    const effectiveDiagnosisIndex = subjectSlug === "social" ? placeIndex : diagnosisIndex;
    const practiceIndex = (issueIndex + diagnosisIndex) % practices.length;
    const authored = subjectSlug === "social" ? null : authoredProfiles.filter((item) => item.subject === subjectSlug)[placeIndex];
    if (subjectSlug !== "social" && !authored) throw new Error(`No authored profile ${subjectSlug}/${placeIndex}`);
    const theme = authored?.theme || topics[subjectSlug][placeIndex];
    const concern = authored?.concern || `${theme}: ${issueStarts[issueIndex]}`;
    const method = authored?.method || `${theme} 연습은 ${practices[practiceIndex]}`;
    const url = `/tutoring/${provinceSlug}/${districtSlug}/${townSlug}/${subjectSlug}`;
    const canonical = base + url;
    const title = `${townName} ${grade} ${subject}과외 | ${theme} 맞춤 관리 | 스터디하이`;
    const description = `${sido} ${sigungu} ${townName} ${grade} ${subject}과외에서 ${concern} ${method} ${school.name}의 실제 학습 자료를 확인해 개인별 순서를 설계합니다.`;
    const exam = `${school.name}의 공개되지 않은 시험 난이도나 출제 비율은 단정하지 않습니다. 학생이 보유한 최신 시험 범위표, 교과서, 학교 프린트와 오답에서 ${theme} 관련 항목을 확인합니다.`;
    const faq = [
      { question: `${townName} ${grade} ${subject}과외: ${authored?.question || `${theme} 진단은 어떻게 하나요?`}`, answer: authored?.answer || `${concern} 최근 풀이에서 멈춘 지점을 확인하고 ${method}` },
      { question: `${school.name} ${subject} 내신 준비에 어떤 자료가 필요한가요?`, answer: `${exam} 확인된 자료만 사용해 개념 보완과 시험 대비의 우선순위를 정합니다.` },
    ];
    const imagePath = `/api/seo-thumbnail?dong=${encodeURIComponent(townName)}&subject=${subjectSlug}`;
    records.push({
      id: `page:national:20260907:${String(records.length + 1).padStart(3,"0")}`, status: "validated", createdAt,
      region: { sido, sigungu, eupmyeondong: townName, provinceSlug, districtSlug, townSlug, townId, sourceTownId: townId },
      school: { id: school.id, name: school.name, type: school.schoolType, typeName: school.schoolTypeName, address: school.address.road, addressDetail: school.address.detail, source: schools.meta.source, sourceDate: schools.meta.sourceDate },
      page: { url, canonical, title, description, grade, subject, subjectSlug },
      content: {
        theme,
        introduction: `${townName} ${grade} ${subject} 학습은 문제 수보다 학생이 혼자 설명하고 다시 풀 수 있는지를 확인하는 데서 시작합니다. ${concern}`,
        regionContext: `${sido} ${sigungu} ${townName} 생활권에서 ${school.name} 통학 일정과 현재 진도, 가능한 수업 시간을 함께 확인해 ${theme} 학습 계획을 조정합니다.`,
        schoolAnalysis: `${school.name}은 프로젝트의 학교 기본정보에서 ${sido} ${sigungu} 소재 ${school.schoolTypeName}로 확인됩니다. 학교별 세부 시험 정보는 학생이 제공한 최신 자료가 있을 때만 반영합니다.`,
        exam, examCaveat: "확인되지 않은 학교별 난이도와 출제 경향은 만들지 않습니다.", concern,
        difficultUnit: authored?.unit || `${theme} 진단에서는 ${diagnoses[effectiveDiagnosisIndex]}`,
        studyMethod: method,
        parentConcern: authored?.parent || `${townName}에서 수업을 알아보는 학부모와 학생의 성향, 집중 시간, 숙제 수행, 목표와 현재 수준을 함께 확인합니다. 좋은 선생님도 모든 학생에게 같은 결과를 내는 것은 아니므로 설명 방식과 소통 방식의 적합성을 살핍니다.`,
        workedExample: `${theme} 대표 문항 한 개를 학생이 소리 내어 설명하고, 조건 표현이 달라진 문항에 다시 적용합니다. 맞힌 문제도 근거가 불분명하면 복습 대상으로 기록합니다.`,
        lesson: `현재 수준 진단에서 시작해 공부 방법 교정, 주간 계획, 숙제·오답 관리, 자기주도 복습으로 이어갑니다. 학부모에게 집중도와 취약 지점, 다음 계획을 구체적으로 공유합니다.`, faq,
      },
      seo: { title, description, canonical, ogTitle: title, ogDescription: description, ogImage: base + imagePath, keywords: [`${townName} ${grade} ${subject}과외`, `${school.name} ${subject} 내신`, `${sigungu} 1:1 과외`, theme] },
      aeo: { questions: faq.map((x)=>x.question), answers: faq.map((x)=>x.answer), faqPageSchema: { "@context":"https://schema.org", "@type":"FAQPage", mainEntity: faq.map((x)=>({"@type":"Question",name:x.question,acceptedAnswer:{"@type":"Answer",text:x.answer}})) } },
      geo: { region: `${sido} ${sigungu} ${townName}`, school: school.name, grade, subject, localLearningContext: `${townName} 생활권의 통학 일정과 ${school.name} 진도, 학생의 ${theme} 어려움을 연결해 방문 또는 화상 수업 가능 시간과 학습 순서를 정합니다.` },
      image: { masterImage:"/thumbnails/studyhigh-official-template.png", imagePath, imageUrl:base+imagePath, alt:`${townName} ${grade} ${subject}과외 대표 이미지`, regionText:townName, subjectText:`${subject}과외`, width:1200, height:1200 },
      provenance: { regionFile:`data/regions/${provinceSlug}.json`, schoolFile:`data/schools/${provinceSlug}.json`, schoolId:school.id, sourceTownId:townId, teachingAdvice:"editorial-general-guidance", verifiedSchoolExamPattern:false },
    });
  }
}
if (records.length !== 50) throw new Error(`Expected 50, got ${records.length}`);
for (const field of ["url","title","description","canonical"]) {
  const values = records.map((r)=>field === "description" ? r.page.description : r.page[field]);
  if (new Set(values).size !== 50) throw new Error(`Duplicate ${field}`);
}
fs.writeFileSync("data/manifests/national/expansion-50-20260907.json", JSON.stringify({version:1,batch:"national-expansion-50-20260907",expansionStage:["대구","인천"],records},null,2)+"\n");
console.log(JSON.stringify({count:records.length,daegu:records.filter((r)=>r.region.provinceSlug==="daegu").length,incheon:records.filter((r)=>r.region.provinceSlug==="incheon").length},null,2));
