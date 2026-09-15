import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const schools = JSON.parse(fs.readFileSync(path.join(root, "data/schools/national-schools.json"), "utf8")).schools;
const regionIndex = JSON.parse(fs.readFileSync(path.join(root, "data/regions/index.json"), "utf8"));
const aliases = JSON.parse(fs.readFileSync(path.join(root, "data/regions/canonical-dong-aliases.json"), "utf8"));
const canonical = new Map(aliases.aliases.flatMap((group) => group.aliases.map((name) => [name, group.canonical])));
const regionSources = regionIndex.provinces.map((entry) => JSON.parse(fs.readFileSync(path.join(root, "data/regions", entry.file), "utf8")));
const provinceByName = new Map(regionSources.map((region) => [region.province.name, region]));

const subjects = {
  math: { label: "수학", difficulty: "조건을 식이나 그림으로 바꾸고 풀이 순서를 설명하는 과정", method: "문제의 조건을 표시하고 대표 풀이를 말로 설명한 뒤 조건이 달라진 문항에 같은 원리를 적용" },
  english: { label: "영어", difficulty: "어휘 기억을 문장 구조와 문단 의미까지 연결하는 과정", method: "짧은 어휘 회상 뒤 주어·서술어와 수식 관계를 표시하고 문단의 핵심을 자기 말로 요약" },
  korean: { label: "국어", difficulty: "발문의 요구를 구분하고 지문에서 판단 근거를 찾는 과정", method: "질문 유형을 먼저 분류하고 선택지별 근거 문장과 반례를 표시한 뒤 답의 이유를 서술" },
  science: { label: "과학", difficulty: "개념, 실험 조건, 표와 그래프를 하나의 인과관계로 연결하는 과정", method: "핵심 개념도를 만들고 통제 변인과 결과 변화를 설명한 다음 새로운 자료에 적용" },
  social: { label: "사회", difficulty: "용어 암기를 지도·도표·사례 해석으로 전환하는 과정", method: "개념을 시간·공간·원인·결과로 재구성하고 서로 다른 자료에서 같은 개념을 찾아 비교" },
};

const gradePlans = {
  elementary: Array.from({ length: 6 }, (_, index) => ({ slug: `elementary-${index + 1}`, label: `초등 ${index + 1}학년`, goals: [
    "짧은 활동을 끝까지 마치고 배운 내용을 말로 표현하는 습관을 만드는 것",
    "학습 순서를 스스로 확인하고 틀린 이유를 한 문장으로 설명하는 것",
    "교과 개념을 읽기·쓰기·계산 활동에 연결하고 매일 복습 시간을 고정하는 것",
    "단원별 핵심 개념을 비교하고 숙제를 작은 분량으로 나누어 완결하는 것",
    "배운 원리를 새로운 문제에 적용하며 질문과 오답 기록을 스스로 남기는 것",
    "중학교 학습을 앞두고 긴 과제의 순서를 계획하고 누적 복습 체계를 만드는 것",
  ][index] })),
  middle: Array.from({ length: 3 }, (_, index) => ({ slug: `middle-${index + 1}`, label: `중등 ${index + 1}학년`, goals: [
    "과목별 공부 순서를 정착시키고 교과 진도와 복습 기록을 연결하는 것",
    "누적 단원과 현재 시험 준비를 함께 관리하며 서술형 답안의 근거를 분명히 하는 것",
    "고등 과정 전환을 고려해 취약 개념, 시간 배분, 자기 점검 기준을 독립적으로 운영하는 것",
  ][index] })),
  high: Array.from({ length: 3 }, (_, index) => ({ slug: `high-${index + 1}`, label: `고등 ${index + 1}학년`, goals: [
    "내신 학습과 모의고사 기초를 분리해 진단하고 과목별 주간 시간을 현실적으로 배분하는 것",
    "취약 단원의 원인을 분석하면서 선택 과목과 진로 목표에 맞는 학습 우선순위를 세우는 것",
    "학교 일정, 모의고사, 지원 목표를 한 계획표에서 조정하며 스스로 전략을 수정하는 것",
  ][index] })),
};

const samplePlan = [
  ["elementary", 0, "math"], ["elementary", 1, "korean"], ["elementary", 2, "english"],
  ["elementary", 3, "science"], ["elementary", 4, "social"], ["elementary", 5, "math"], ["elementary", 2, "korean"],
  ["middle", 0, "math"], ["middle", 1, "english"], ["middle", 2, "korean"],
  ["middle", 0, "science"], ["middle", 1, "social"], ["middle", 2, "math"], ["middle", 0, "english"],
  ["high", 0, "math"], ["high", 1, "english"], ["high", 2, "korean"],
  ["high", 0, "science"], ["high", 1, "social"], ["high", 2, "math"],
];

function matchPlace(school) {
  const province = provinceByName.get(school.sido);
  if (!province) return null;
  const district = province.districts.find((item) => item.name === school.sigungu);
  if (!district) return null;
  const target = school.canonicalDong || school.dong;
  const town = district.towns.find((item) => item.name === target || canonical.get(item.name) === target);
  if (!town) return null;
  return { province, district, town };
}

const candidates = schools
  .filter((school) => school.status === "active" && school.dong && school.schoolLevel in gradePlans)
  .map((school) => ({ school, place: matchPlace(school) }))
  .filter((entry) => entry.place)
  .sort((a, b) => `${a.school.sido}|${a.school.sigungu}|${a.school.schoolId}`.localeCompare(`${b.school.sido}|${b.school.sigungu}|${b.school.schoolId}`, "ko"));

const usedSchools = new Set();
const usedProvinces = new Map();
const samples = [];

function chooseSchool(level, index) {
  const options = candidates.filter((entry) => entry.school.schoolLevel === level && !usedSchools.has(entry.school.schoolId));
  options.sort((a, b) => (usedProvinces.get(a.school.sido) || 0) - (usedProvinces.get(b.school.sido) || 0)
    || Number(Boolean(b.school.homepage)) - Number(Boolean(a.school.homepage))
    || a.school.schoolId.localeCompare(b.school.schoolId));
  const selected = options[index % Math.min(options.length, 7)] || options[0];
  if (!selected) throw new Error(`${level} 샘플 학교를 찾지 못했습니다.`);
  usedSchools.add(selected.school.schoolId);
  usedProvinces.set(selected.school.sido, (usedProvinces.get(selected.school.sido) || 0) + 1);
  return selected;
}

const openings = [
  "수업을 시작하기 전에는 최근에 혼자 공부한 기록부터 살펴봅니다.",
  "과외 선택은 유명한 교사를 찾는 일보다 학생이 질문할 수 있는 관계를 만드는 일에서 출발합니다.",
  "점수만 보면 개념 부족과 학습 습관 문제를 구분하기 어렵습니다.",
  "교재의 진도보다 학생이 도움 없이 다시 설명할 수 있는 범위를 먼저 확인합니다.",
  "통학 이후 실제로 사용할 수 있는 시간과 집중이 유지되는 길이를 함께 측정합니다.",
  "맞힌 문제도 근거를 설명하지 못하면 다음 단원에서 같은 어려움이 반복될 수 있습니다.",
  "학부모가 관찰한 모습과 학생이 느끼는 어려움이 다를 수 있어 두 기록을 분리해 듣습니다.",
  "학교 일정은 확인 가능한 자료로만 반영하고 공개되지 않은 시험 경향은 단정하지 않습니다.",
  "숙제 미완료를 의지 문제로 결론 내리기 전에 분량과 시작 조건을 점검합니다.",
  "학생의 성향에 따라 같은 설명도 그림, 말, 식, 표 중 효과적인 방식이 달라집니다.",
];
const routines = [
  "첫 주에는 과제 시작 시각과 중단 지점을 기록해 분량을 조정하고, 다음 주부터 스스로 체크하는 항목을 한 가지씩 늘립니다.",
  "오답에는 정답을 옮기지 않고 처음 잘못 읽은 조건, 선택한 이유, 다음에 확인할 행동을 세 칸으로 나누어 적습니다.",
  "수업 직후의 이해와 다음 날의 재현을 별도로 확인해 단기 기억을 실제 학습으로 오해하지 않도록 합니다.",
  "새 진도와 누적 복습을 다른 색으로 계획하고, 수행 여부와 정확도를 분리해 계획 자체가 무리했는지도 평가합니다.",
  "교사가 주는 힌트를 단계적으로 줄인 뒤 마지막 문제는 학생이 풀이 순서와 근거를 모두 설명하게 합니다.",
  "짧은 회상, 적용 문제, 누적 점검을 한 묶음으로 운영해 공부한 날과 확인한 날이 멀어지지 않게 합니다.",
  "주말에는 새 문제를 늘리기보다 평일 기록에서 두 번 이상 반복된 실수 한 가지를 골라 수정합니다.",
  "학습 계획은 통학일과 비통학일을 나누어 작성하고, 예상 시간과 실제 시간을 비교해 다음 계획에 반영합니다.",
];
const feedbacks = [
  "학부모 피드백에는 진도보다 학생이 혼자 시작한 과제, 질문한 지점, 재풀이 결과를 구분해 전달합니다.",
  "주간 상담에서는 잘된 학습 행동 한 가지와 다음 주에 바꿀 행동 한 가지를 정해 부담 없이 지속하게 합니다.",
  "교사와 보호자는 숙제 결과뿐 아니라 미완료 이유와 일정 조정 내용을 같은 표현으로 공유합니다.",
  "시험 뒤에는 점수 평가에 머무르지 않고 준비 과정에서 재사용할 방법과 버릴 방법을 함께 정리합니다.",
  "학생이 수업에서 도움받은 부분과 혼자 해결한 부분을 나눠 보호자에게 알려 독립 학습의 변화를 확인합니다.",
  "교사 교체가 필요할 때는 경력의 많고 적음보다 설명 속도, 질문 대기 시간, 피드백 방식의 불일치를 먼저 봅니다.",
];

const individualAngles = [
  "초기 진단은 숫자 쓰기와 연산 속도를 따로 살피는 방식으로 진행합니다. 답을 빨리 말해도 수 모형이나 그림으로 이유를 표현하지 못하면 구체물 활동으로 돌아갑니다. 한 번에 긴 숙제를 주지 않고 시작 신호, 완료 표시, 짧은 칭찬을 연결해 책상에 머무는 시간을 조금씩 늘립니다. 보호자에게는 정답 개수보다 혼자 시작한 횟수와 설명을 끝낸 장면을 전달합니다.",
  "낭독할 때 끊어 읽는 위치와 문장을 쓴 뒤 다시 읽는 습관을 관찰합니다. 받아쓰기 결과만 보는 대신 소리와 글자의 대응, 문장 부호, 자신의 경험을 한 문장으로 만드는 과정을 분리합니다. 읽기 활동 뒤에는 가장 기억나는 장면을 고르고 그 이유를 말하게 해 국어 시간을 부담스러운 채점 시간이 아니라 생각을 표현하는 시간으로 만듭니다.",
  "영어를 처음 교과 학습으로 만나는 시기에는 소리, 철자, 의미를 동시에 많이 외우게 하지 않습니다. 그림을 보고 아는 표현을 말한 다음 짧은 문장을 듣고 순서를 맞추며, 마지막에 스스로 읽는 단계로 옮깁니다. 틀린 발음을 즉시 여러 번 지적하기보다 의사소통이 된 부분을 확인하고 한 가지 소리만 고쳐 참여 의욕을 유지합니다.",
  "과학 학습 기록은 관찰한 사실과 예상한 내용을 서로 다른 칸에 적게 합니다. 실험 결과를 먼저 외우지 않고 무엇을 같게 두었는지, 무엇을 바꾸었는지, 결과가 어떻게 달라졌는지를 그림과 화살표로 정리합니다. 가정에서 할 수 없는 실험은 교과서 자료를 읽고 안전 규칙과 관찰 기준을 설명하는 활동으로 대체하며 확인되지 않은 결과를 꾸며내지 않습니다.",
  "사회 개념은 낯선 용어 목록으로 시작하지 않고 학생이 오가는 장소와 지도 기호를 연결하는 활동부터 시작합니다. 같은 장소를 이동 경로, 역할, 규칙의 관점으로 다시 보게 하고 교과서 사례와 공통점을 찾습니다. 암기 확인은 빈칸 채우기만 사용하지 않고 사진이나 도표를 보고 적절한 개념을 선택한 근거를 말하게 합니다.",
  "초등 과정 마무리 단계의 수학은 한 문제를 오래 붙드는 힘과 포기해야 할 때 도움을 요청하는 판단을 함께 기릅니다. 풀이 공간을 계획하고 계산 과정에 단위를 표시하며 검산 방법을 스스로 고르게 합니다. 중학교 진입 전에 공식 선행을 늘리기보다 분수, 비, 도형처럼 이후 단원과 이어지는 핵심 개념을 말과 식으로 오갈 수 있는지 확인합니다.",
  "국어 독해는 문단마다 중요한 문장을 모두 밑줄 긋는 습관부터 바로잡습니다. 제목과 발문을 읽고 필요한 정보의 종류를 예상한 다음, 사실과 의견을 다른 표시로 구분합니다. 요약은 원문 문장을 길게 옮기지 않고 핵심 낱말 세 개를 선택해 새 문장으로 만드는 연습을 하며, 쓰기 피드백은 내용 구성과 맞춤법을 같은 날 한꺼번에 고치지 않습니다.",
  "중학교 첫 수학 계획은 초등 때의 계산 경험과 문자 사용 사이의 간격을 찾는 데 초점을 둡니다. 식을 세우기 전에 문제의 양과 관계를 표로 나타내고, 음수와 문자 때문에 생긴 오류인지 문장을 급하게 읽어서 생긴 오류인지 구분합니다. 시험 준비 기간에는 새 유형을 무작정 늘리지 않고 교과서 예제의 조건을 바꿔 설명하는 활동으로 기본 개념의 이동 가능성을 확인합니다.",
  "중학교 영어의 학습 기록은 단어장, 문장 분석, 본문 이해가 따로 움직이지 않게 구성합니다. 외운 단어를 본문에서 다시 찾고 그 문장에서 어떤 역할을 하는지 표시한 뒤, 문단의 연결 관계를 한 줄로 씁니다. 서술형 준비는 모범답안을 통째로 외우는 대신 질문의 핵심어, 필요한 문법, 자신의 초안을 차례로 점검하는 방식으로 운영합니다.",
  "중학교 마지막 국어 학습에서는 제한 시간 안에 발문을 분류하는 연습과 충분히 생각하며 근거를 찾는 연습을 다른 날에 실시합니다. 속도를 높이기 전에 틀린 선택지가 왜 그럴듯했는지 설명하게 하며, 문학과 비문학의 오답 원인을 같은 방식으로 묶지 않습니다. 고등 독해로 넘어갈 때는 글의 구조를 도식화하고 낯선 개념의 정의와 예시를 구분하는 힘을 우선 확인합니다.",
  "중학교 과학은 용어를 안다고 실험 자료를 해석할 수 있는지 별도로 확인합니다. 표의 단위와 축을 먼저 읽고 증가와 감소를 말로 설명한 다음 관련 개념을 연결합니다. 수행 활동을 준비할 때는 결과를 미리 정해 쓰지 않고 관찰 기준, 기록 방식, 안전 절차를 점검하며 학교에서 안내한 자료가 있을 때만 일정과 범위를 반영합니다.",
  "사회 학습은 여러 단원의 비슷한 용어를 비교표로 구분하는 것에서 시작합니다. 정의를 그대로 쓰는 칸, 실제 사례를 드는 칸, 반대 사례를 찾는 칸을 나누면 암기한 내용을 자료 문제에 적용하기 쉬워집니다. 시험 전에는 연표와 지도를 따로 외우지 않고 한 사건이 일어난 위치와 배경을 함께 표시해 인과관계를 복원합니다.",
  "중학교 수학에서 고등 과정으로 넘어가기 전에는 풀이량보다 누적 결손의 위치를 지도처럼 표시합니다. 방정식, 함수, 도형에서 반복되는 오류를 계산·조건 해석·개념 선택·표현으로 나누고 가장 앞선 원인부터 보완합니다. 시간 관리는 전체 시험을 급하게 푸는 연습보다 문항을 읽고 시작 여부를 결정하는 기준을 만드는 연습으로 진행합니다.",
  "영어 수업 첫 단계에는 학생이 질문을 멈추는 순간을 기록합니다. 모르는 단어 때문인지 긴 문장 구조 때문인지, 내용을 배경지식으로 추측하다가 근거를 놓친 것인지에 따라 과제가 달라집니다. 짧은 본문을 소리 내어 읽고 구조를 표시한 뒤 한글 번역 없이 핵심 장면을 설명하게 하여 이해와 번역 습관을 구분합니다.",
  "고등학교 첫 수학 계획은 학교 학습과 모의고사 준비를 같은 문제집 진도로 처리하지 않습니다. 교과 개념의 증명과 대표 유형을 정리하는 시간, 낯선 문항에서 조건을 해석하는 시간을 분리합니다. 주간 기록에는 풀이한 수보다 도움 없이 다시 풀 수 있었던 문항과 중단 이유를 남겨 다음 수업의 설명 깊이를 결정합니다.",
  "고등 영어는 긴 지문을 빠르게 읽는 연습 전에 문장 사이의 논리 관계를 정확히 표시합니다. 어휘 복습은 뜻 하나를 외우는 데서 끝내지 않고 문맥에서 달라지는 의미와 함께 기록합니다. 내신 자료와 모의고사 지문은 목적이 다르므로 확인된 학교 자료는 세부 표현까지 점검하고, 새로운 지문은 구조와 근거를 찾는 훈련에 사용합니다.",
  "고등학교 마지막 국어 전략은 지원 목표를 이유로 무조건 어려운 문제만 늘리지 않습니다. 독서에서는 개념 간 관계를, 문학에서는 화자와 상황의 변화를, 선택 과목에서는 판단 절차를 각각 점검합니다. 모의고사 뒤에는 맞고 틀림보다 시간을 잃은 지점과 근거 없이 선택한 지점을 표시해 다음 주의 읽기 순서를 조정합니다.",
  "고등 과학은 선택한 과목의 개념 체계와 수학적 표현을 연결하는 능력을 확인합니다. 공식을 바로 적용하기 전에 물리량의 의미와 단위를 쓰고, 그래프의 기울기나 면적이 무엇을 뜻하는지 설명합니다. 탐구 자료는 조건과 결론을 분리해서 읽으며 학교별 실험 일정이나 평가 방식은 공식 안내를 학생이 제공한 경우에만 계획에 넣습니다.",
  "고등 사회는 개념의 정의와 시사 사례를 구분해 기록합니다. 익숙한 사건을 근거 없이 교과 개념에 끼워 맞추지 않도록 자료가 제시한 시기, 공간, 집단, 통계를 먼저 확인합니다. 서술 답안은 주장 한 문장, 자료 근거, 개념 연결의 세 단계로 검토하고 진로와 선택 과목 일정은 학생이 확정한 정보만 반영합니다.",
  "고등학교 마지막 수학 관리는 새로운 교재 선택보다 남은 기간과 목표 사이의 우선순위를 명확히 하는 데 집중합니다. 모의고사 문항을 단원별 점수로만 묶지 않고 시작 판단, 풀이 전환, 계산 검토, 시간 종료의 단계로 분석합니다. 수업에서는 교사가 해결한 문제보다 학생이 전략을 선택하고 중간에 수정한 문제를 중요한 성장 기록으로 남깁니다.",
];

function contentFor(entry, grade, subjectSlug, sampleIndex) {
  const { school } = entry;
  const subject = subjects[subjectSlug];
  const seed = [...`${school.schoolId}:${grade.slug}:${subjectSlug}`].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 17);
  const pick = (list, salt) => list[(seed + salt * 37) % list.length];
  const schoolFact = `${school.schoolName}은 학교알리미 공식 데이터에서 ${school.sido} ${school.sigungu} ${school.dong} 소재 ${school.schoolLevel === "elementary" ? "초등학교" : school.schoolLevel === "middle" ? "중학교" : "고등학교"}로 확인됩니다. 주소는 ${school.address}입니다.${school.homepage ? ` 공식 홈페이지는 ${school.homepage}로 등록되어 있습니다.` : " 공식 데이터에 홈페이지 주소가 없어 별도의 사이트를 추정하지 않습니다."}`;
  const paragraphs = [
    `${pick(openings, sampleIndex)} ${schoolFact}`,
    `${grade.label}의 핵심 목표는 ${grade.goals}입니다. ${school.canonicalDong}에서 수업 계획을 세울 때도 지역에 대한 막연한 가정 대신 학생의 실제 통학 시간, 방과후 일정, 현재 교재와 주간 학습 가능 시간을 상담에서 확인합니다.`,
    `${subject.label} 학습에서는 ${subject.difficulty}을 중점적으로 진단합니다. 수업은 ${subject.method}하도록 구성하며, 문제 수를 늘리기 전에 학생이 사용한 판단 과정을 확인합니다.`,
    individualAngles[sampleIndex],
    `${school.schoolName} 내신 준비에는 학생이 직접 가져온 최신 교과서, 학교 공지, 수행평가 안내와 시험 범위표만 사용합니다. 학교알리미에 없는 난이도나 출제 비율은 단정하지 않고 ${subject.label}의 확인된 범위에서 복습 순서를 정합니다.`,
    `${pick(routines, sampleIndex + 1)} 이 기록을 ${school.canonicalDong}의 실제 통학 일정과 비교해 과제를 실행할 수 있는 시간대로 옮깁니다.`,
    `${pick(feedbacks, sampleIndex + 2)} ${school.schoolName} ${grade.label} 학생에게는 경력의 길이보다 질문을 기다리는 방식, ${subject.label} 설명 속도, 숙제 피드백의 구체성이 맞는 교사를 연결하는 것이 중요합니다.`,
    `${school.schoolName} ${grade.label} ${subject.label} 진단표에는 수업 전 혼자 해결한 범위와 도움을 요청한 순간을 따로 남깁니다. ${school.schoolName} ${grade.label} ${subject.label} 과제표에는 예상 시간과 실제 시간을 함께 적습니다. ${school.schoolName} ${grade.label} ${subject.label} 피드백은 다음 수업에서 학생이 직접 선택할 행동 하나로 마무리합니다.`,
    `${school.canonicalDong} ${school.schoolName}의 공식 주소 자료와 ${grade.label} ${subject.label} 학습 기록을 혼동하지 않습니다. 지역 정보는 위치 확인에만 쓰고 수업 수준은 학생의 실제 답안, 질문, 복습 결과로 결정합니다.`,
  ];
  if (sampleIndex === 12) {
    paragraphs.push("이 중등 수학 샘플은 고등 과정 전환 직전의 누적 결손 지도를 별도로 사용합니다. 식 변형, 함수 해석, 도형 추론을 서로 다른 색으로 표시하고 첫 오류가 나타난 단계를 찾아 보완 순서를 결정합니다. 제한 시간 연습은 풀이 속도 경쟁이 아니라 시작할 문항과 보류할 문항을 판단하는 기준을 만드는 활동으로 운영합니다.");
  }
  return { schoolFact, paragraphs };
}

for (let index = 0; index < samplePlan.length; index++) {
  const [level, gradeIndex, subjectSlug] = samplePlan[index];
  const entry = chooseSchool(level, index);
  const grade = gradePlans[level][gradeIndex];
  const subject = subjects[subjectSlug];
  const { school, place } = entry;
  const schoolSlug = school.schoolId.toLowerCase();
  const url = `/tutoring/${place.province.province.slug}/${place.district.slug}/${place.town.slug}/${schoolSlug}/${grade.slug}/${subjectSlug}`;
  const title = `${school.canonicalDong} ${school.schoolName} ${grade.label} ${subject.label}과외 | 맞춤 학습관리 | 스터디하이`;
  const description = `${school.canonicalDong} ${school.schoolName} ${grade.label} ${subject.label}과외 상담입니다. ${grade.goals}을 목표로 ${subject.difficulty}, 숙제·오답·자기주도학습을 학생 성향에 맞게 관리합니다.`;
  const content = contentFor(entry, grade, subjectSlug, index);
  const faq = [
    {
      question: `${school.canonicalDong} ${school.schoolName} ${grade.label} 학생은 ${subject.label}에서 어떤 학습 상태부터 진단하나요?`,
      answer: `${grade.goals}을 목표로 현재 기록을 살핍니다. ${individualAngles[index]}`,
    },
    {
      question: `${school.schoolName} ${grade.label}에게 맞는 ${subject.label} 공부 순서는 무엇인가요?`,
      answer: `${subject.difficulty}을 먼저 구분합니다. 이후 ${subject.method}하도록 지도하고, 학생이 혼자 같은 판단을 다시 할 수 있는지 확인합니다.`,
    },
    {
      question: `${school.canonicalDong}에서 ${school.schoolName} 내신 준비 자료는 어떻게 확인하나요?`,
      answer: `${school.schoolName}은 공식 데이터상 ${school.address}에 있는 ${school.schoolLevel === "elementary" ? "초등학교" : school.schoolLevel === "middle" ? "중학교" : "고등학교"}입니다. 내신 계획에는 학생이 제공한 최신 교과서, 학교 공지, 수행평가 안내와 시험 범위표만 반영하며 공개되지 않은 난이도나 출제 경향은 만들지 않습니다.`,
    },
    {
      question: `${grade.label} ${subject.label} 숙제와 오답을 ${school.canonicalDong} 학생 일정에 맞추려면 어떻게 하나요?`,
      answer: `${routines[(index * 3 + 3) % routines.length]} 통학일과 비통학일의 실제 가능 시간을 나누고, ${subject.label} 오답이 시작된 이유와 다음 확인 행동을 기록해 과제 분량을 다시 정합니다.`,
    },
    {
      question: `${school.schoolName} ${grade.label} 학생이 자기주도학습을 어려워할 때 보호자와 어떻게 소통하나요?`,
      answer: `${feedbacks[(index * 5 + 4) % feedbacks.length]} 계획을 대신 완성해 주지 않고 학생이 선택할 항목을 한 가지씩 늘리며, 보호자에게는 ${grade.label} ${subject.label} 진도와 질문·복습·재풀이 변화를 구분해 공유합니다.`,
    },
    {
      question: `${school.canonicalDong} ${grade.label} ${subject.label}과외 선생님은 학생 성향에 따라 무엇을 비교해야 하나요?`,
      answer: `${school.schoolName}이라는 학교명만으로 교사를 정하지 않습니다. 질문을 기다리는 시간, ${subject.label} 개념을 설명하는 방식, 숙제 피드백 주기와 학생이 편하게 도움을 요청하는지를 비교해 적합성을 판단합니다.`,
    },
  ];
  samples.push({
    id: `official-sample:${school.schoolId}:${grade.slug}:${subjectSlug}`,
    status: "sample",
    source: { name: "학교알리미 Open API", syncedAt: "2026-09-15", schoolId: school.schoolId },
    region: { sido: school.sido, sigungu: school.sigungu, eupmyeondong: school.dong, representativeRegion: school.canonicalDong, provinceSlug: place.province.province.slug, districtSlug: place.district.slug, townSlug: place.town.slug },
    school: { name: school.schoolName, level: school.schoolLevel, address: school.address, homepage: school.homepage },
    page: { url, grade: grade.label, gradeSlug: grade.slug, subject: subject.label, subjectSlug, title, description, canonical: `https://studyhigh.co.kr${url}` },
    content: {
      learningGoal: grade.goals,
      subjectDifficulty: subject.difficulty,
      studyMethod: subject.method,
      coreParagraphs: [content.schoolFact, `${grade.label}: ${grade.goals}`, `${subject.label}: ${subject.difficulty}. ${subject.method}`, individualAngles[index]],
      paragraphs: content.paragraphs,
      faq,
    },
    image: { path: `/api/seo-thumbnail?dong=${encodeURIComponent(school.canonicalDong)}&subject=${subjectSlug}`, alt: `${school.canonicalDong} ${school.schoolName} ${grade.label} ${subject.label}과외 대표 이미지` },
  });
}

const output = path.join(root, "data/manifests/nationwide/official-school-sample-20.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify({ schemaVersion: "1.0.0", generatedAt: new Date().toISOString(), source: "학교알리미 Open API", count: samples.length, records: samples }, null, 2)}\n`);
console.log(JSON.stringify({ output, count: samples.length, levels: Object.fromEntries(Object.keys(gradePlans).map((level) => [level, samples.filter((sample) => sample.school.level === level).length])), urls: samples.map((sample) => sample.page.url) }, null, 2));
