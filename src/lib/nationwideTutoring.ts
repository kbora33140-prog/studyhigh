import seoulRegions from "../../data/regions/seoul.json";
import seoulSchools from "../../data/schools/seoul.json";
import busanRegions from "../../data/regions/busan.json";
import busanSchools from "../../data/schools/busan.json";
import daeguRegions from "../../data/regions/daegu.json";
import daeguSchools from "../../data/schools/daegu.json";
import incheonRegions from "../../data/regions/incheon.json";
import incheonSchools from "../../data/schools/incheon.json";
import daejeonRegions from "../../data/regions/daejeon.json";
import daejeonSchools from "../../data/schools/daejeon.json";
import ulsanRegions from "../../data/regions/ulsan.json";
import ulsanSchools from "../../data/schools/ulsan.json";
import sejongRegions from "../../data/regions/sejong.json";
import sejongSchools from "../../data/schools/sejong.json";
import gyeonggiRegions from "../../data/regions/gyeonggi.json";
import gyeonggiSchools from "../../data/schools/gyeonggi.json";
import chungbukRegions from "../../data/regions/chungbuk.json";
import chungbukSchools from "../../data/schools/chungbuk.json";
import chungnamRegions from "../../data/regions/chungnam.json";
import chungnamSchools from "../../data/schools/chungnam.json";
import gyeongbukRegions from "../../data/regions/gyeongbuk.json";
import gyeongbukSchools from "../../data/schools/gyeongbuk.json";
import gyeongnamRegions from "../../data/regions/gyeongnam.json";
import gyeongnamSchools from "../../data/schools/gyeongnam.json";
import jejuRegions from "../../data/regions/jeju.json";
import jejuSchools from "../../data/schools/jeju.json";
import gangwonRegions from "../../data/regions/gangwon.json";
import gangwonSchools from "../../data/schools/gangwon.json";
import jeonbukRegions from "../../data/regions/jeonbuk.json";
import jeonbukSchools from "../../data/schools/jeonbuk.json";
import integratedRegions from "../../data/regions/gwangju-jeonnam.json";
import integratedSchools from "../../data/schools/gwangju-jeonnam.json";
import type { AdditionalTutoringRecord } from "@/lib/additionalTutoring";

const sources = [
  [seoulRegions, seoulSchools], [busanRegions, busanSchools], [daeguRegions, daeguSchools],
  [incheonRegions, incheonSchools], [daejeonRegions, daejeonSchools], [ulsanRegions, ulsanSchools],
  [sejongRegions, sejongSchools], [gyeonggiRegions, gyeonggiSchools], [chungbukRegions, chungbukSchools],
  [chungnamRegions, chungnamSchools], [gyeongbukRegions, gyeongbukSchools], [gyeongnamRegions, gyeongnamSchools],
  [jejuRegions, jejuSchools], [gangwonRegions, gangwonSchools], [jeonbukRegions, jeonbukSchools],
  [integratedRegions, integratedSchools],
] as const;

export const nationwideSubjects = {
  math: "수학", english: "영어", korean: "국어", science: "과학", social: "사회",
} as const;
export type NationwideSubjectSlug = keyof typeof nationwideSubjects;

type SchoolType = "elementary" | "middle" | "high";
type SchoolRecord = (typeof seoulSchools.schools)[number];

export type NationwidePage = {
  provinceSlug: string; districtSlug: string; townSlug: string; schoolSlug: string;
  gradeSlug: string; subjectSlug: NationwideSubjectSlug;
  sido: string; sigungu: string; town: string; school: SchoolRecord;
  grade: string; subject: string; url: string;
};

const gradeDefinitions: Record<SchoolType, Array<{ slug: string; label: string; subjects: NationwideSubjectSlug[] }>> = {
  elementary: Array.from({ length: 6 }, (_, i) => ({
    slug: `elementary-${i + 1}`, label: `초등 ${i + 1}학년`,
    subjects: i < 2 ? ["math", "korean"] : ["math", "english", "korean", "science", "social"],
  })),
  middle: Array.from({ length: 3 }, (_, i) => ({ slug: `middle-${i + 1}`, label: `중등 ${i + 1}학년`, subjects: Object.keys(nationwideSubjects) as NationwideSubjectSlug[] })),
  high: Array.from({ length: 3 }, (_, i) => ({ slug: `high-${i + 1}`, label: `고등 ${i + 1}학년`, subjects: Object.keys(nationwideSubjects) as NationwideSubjectSlug[] })),
};

const provinceMap = new Map(sources.map(([r, s]) => [r.province.slug, { regions: r, schools: s }]));

function representativeTown(name: string, slug: string) {
  if (!/\d/.test(name)) return { name, slug };
  const normalizedName = name.replace(/제?\d+(?:·\d+)*동$/, "동");
  const normalizedSlug = slug.replace(/\d+(?:-(?:il|i|sam|sa|o|yuk|chil|pal|gu|sip))*(-dong)$/, "$1");
  return { name: normalizedName, slug: normalizedSlug };
}

export function getNationwidePage(params: { province: string; district: string; town: string; school: string; grade: string; subject: string }): NationwidePage | null {
  const source = provinceMap.get(params.province);
  if (!source || !(params.subject in nationwideSubjects)) return null;
  const district = source.regions.districts.find((d) => d.slug === params.district);
  const school = source.schools.schools.find((s) => s.slug === params.school && s.region?.districtId === district?.id) as SchoolRecord | undefined;
  const town = district?.towns.find((t) => t.id === school?.region?.townId && representativeTown(t.name, t.slug).slug === params.town);
  if (!district || !town || !school || school.id.includes("pending") || !school.address?.road) return null;
  const grade = gradeDefinitions[school.schoolType as SchoolType]?.find((g) => g.slug === params.grade);
  if (!grade || !grade.subjects.includes(params.subject as NationwideSubjectSlug)) return null;
  const subjectSlug = params.subject as NationwideSubjectSlug;
  const representative = representativeTown(town.name, town.slug);
  const url = `/tutoring/${params.province}/${params.district}/${representative.slug}/${params.school}/${params.grade}/${subjectSlug}`;
  return { provinceSlug: params.province, districtSlug: params.district, townSlug: representative.slug, schoolSlug: params.school, gradeSlug: params.grade, subjectSlug, sido: source.regions.province.name, sigungu: district.name, town: representative.name, school, grade: grade.label, subject: nationwideSubjects[subjectSlug], url };
}

export function* nationwidePages(): Generator<NationwidePage> {
  for (const [regions, schools] of sources) {
    const districts = new Map(regions.districts.map((d) => [d.id, d]));
    const towns = new Map(regions.districts.flatMap((d) => d.towns.map((t) => [t.id, { district: d, town: t }] as const)));
    for (const school of schools.schools as SchoolRecord[]) {
      if (school.id.includes("pending") || !school.address?.road || !school.region) continue;
      const place = towns.get(school.region.townId);
      const district = districts.get(school.region.districtId);
      if (!place || !district || place.district.id !== district.id || !place.town.schoolIds.includes(school.id)) continue;
      for (const grade of gradeDefinitions[school.schoolType as SchoolType] || []) {
        for (const subjectSlug of grade.subjects) {
          const representative = representativeTown(place.town.name, place.town.slug);
          const url = `/tutoring/${regions.province.slug}/${district.slug}/${representative.slug}/${school.slug}/${grade.slug}/${subjectSlug}`;
          yield { provinceSlug: regions.province.slug, districtSlug: district.slug, townSlug: representative.slug, schoolSlug: school.slug, gradeSlug: grade.slug, subjectSlug, sido: regions.province.name, sigungu: district.name, town: representative.name, school, grade: grade.label, subject: nationwideSubjects[subjectSlug], url };
        }
      }
    }
  }
}

export const nationwidePageCount = 238_506;

export function nationwideCopy(page: NationwidePage) {
  const stage = page.grade.startsWith("초등") ? "개념을 말과 그림으로 설명하고 짧은 과제를 끝까지 마치는 습관" : page.grade.startsWith("중등") ? "교과 진도와 시험 범위를 연결하고 오답의 원인을 분류하는 습관" : "내신·모의고사·진로 목표를 한 계획표에서 조정하는 전략";
  const challenge = { math: "풀이 근거를 생략하거나 계산 실수를 반복하는 문제", english: "어휘·구문·독해를 따로 공부해 지문 이해로 연결하지 못하는 문제", korean: "근거 문장을 찾지 않고 감으로 답을 고르는 문제", science: "개념과 실험 조건, 자료 해석을 한 흐름으로 연결하지 못하는 문제", social: "용어를 외워도 자료와 사례에 적용하지 못하는 문제" }[page.subjectSlug];
  const method = { math: "대표 문제를 설명한 뒤 조건이 바뀐 문제에 같은 원리를 적용", english: "어휘 회상, 문장 구조 표시, 문단 요약을 순서대로 기록", korean: "발문을 먼저 분류하고 본문에서 선택지의 근거와 반례를 표시", science: "개념도를 만든 뒤 실험의 통제 변인과 그래프 변화를 설명", social: "핵심 개념을 시간·공간·원인·결과 표로 재구성" }[page.subjectSlug];
  const seed = [...`${page.school.id}:${page.gradeSlug}:${page.subjectSlug}`].reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 5381);
  const openings = ["최근 과제의 시작 시각을 살피면", "학생이 틀린 문제를 다시 설명하게 하면", "교과서와 필기, 문제집을 나란히 놓으면", "한 주의 질문 기록을 시간순으로 보면", "맞힌 문제의 근거까지 말하게 하면", "시험 범위표에 현재 진도를 표시하면", "수업 전 짧은 회상 활동을 해보면", "오답을 원인별 색으로 구분하면", "공부 장소별 집중 시간을 비교하면", "숙제를 미룬 날의 일정을 되짚으면", "단원별 자신감과 실제 정확도를 대조하면", "보호자의 관찰과 학생의 설명을 함께 들으면"];
  const diagnostics = ["개념을 몰랐는지 적용 순서를 놓쳤는지 구별할 수 있습니다.", "속도 문제와 이해 문제를 섞지 않고 다음 목표를 정할 수 있습니다.", "도움을 기다린 지점과 스스로 해결한 지점이 분명해집니다.", "점수표에는 보이지 않던 읽기와 판단의 습관이 드러납니다.", "반복 실수의 시작점이 문제 해석인지 계산인지 확인됩니다.", "기억 부족과 표현 부족을 서로 다른 과제로 다룰 수 있습니다.", "수업에서는 이해했지만 혼자 풀 때 멈추는 구간을 찾게 됩니다.", "어려운 단원보다 먼저 바로잡아야 할 학습 행동이 보입니다.", "분량을 늘리기 전 필요한 설명 수준과 연습 간격을 결정할 수 있습니다.", "긴장 때문에 놓친 부분과 평소에도 불안정한 부분을 나눌 수 있습니다.", "질문을 못 한 이유가 낯선 용어인지 수업 관계인지 확인됩니다.", "학생이 실제로 사용할 수 있는 공부 시간을 과장 없이 계산할 수 있습니다."];
  const practices = ["첫 과제는 열 문제보다 두 문제의 근거를 끝까지 기록하는 방식으로 제시합니다.", "다음 날에는 해설을 가리고 핵심 판단을 한 줄로 복원하게 합니다.", "유사 문항과 조건이 달라진 문항을 번갈아 풀어 전이를 확인합니다.", "교사의 힌트는 단계별로 줄이고 마지막에는 학생 혼자 설명하게 합니다.", "정답률과 함께 풀이를 시작하기까지 걸린 시간을 기록합니다.", "복습 카드는 정의, 예시, 반례가 한 장 안에 들어가도록 만듭니다.", "숙제는 통학일과 비통학일의 가능한 시간을 따로 반영해 나눕니다.", "오답 노트에는 정답 대신 처음 잘못 읽은 조건과 다음 확인 행동을 적습니다.", "주말에는 새 진도보다 평일 기록 중 반복된 한 가지 문제를 정리합니다.", "말로 설명한 뒤 글과 식, 표 중 과목에 맞는 형태로 다시 표현합니다.", "한 단원을 짧은 회상, 적용, 누적 점검의 세 단계로 순환합니다.", "수행 여부와 정확도를 분리해 계획이 무리했는지도 함께 판단합니다."];
  const communications = ["보호자에게는 수행 사실과 다음 주 행동 목표를 구분해 전달합니다.", "점수보다 질문 빈도와 재풀이 결과를 포함해 상담합니다.", "이해한 부분과 아직 도움을 받는 부분을 나눠 공유합니다.", "막힌 지점과 도움을 요청한 방식을 짧은 기록으로 남깁니다.", "숙제 미완료를 의지로 단정하지 않고 분량과 일정부터 조정합니다.", "수업 참여 변화와 혼자 시작한 과제의 수를 함께 알립니다.", "진도 변경 이유를 학생과 보호자에게 같은 표현으로 설명합니다.", "주간 피드백은 잘한 행동 하나와 다음 실천 하나에 집중합니다.", "시험 뒤에는 결과보다 준비 과정에서 재사용할 방법을 정리합니다.", "학부모의 우려와 학생이 느끼는 어려움이 다를 때 각각 확인합니다.", "교체가 필요한 경우 경력보다 소통 방식의 불일치를 먼저 살핍니다.", "상담 내용은 확인된 학교 자료와 일반 학습 조언을 명확히 구분합니다."];
  const matching = ["질문을 기다려 주는 교사", "짧고 자주 확인하는 교사", "원리를 말로 풀어 주는 교사", "풀이 기록을 꼼꼼히 보는 교사", "학습 속도를 유연하게 조절하는 교사", "학생의 설명을 끝까지 듣는 교사", "작은 과제의 완결을 중시하는 교사", "시험 계획을 역산해 주는 교사", "시각 자료와 예시를 잘 활용하는 교사", "오답 이유를 함께 분류하는 교사", "학부모와 간결하게 소통하는 교사", "진로 목표와 과목 계획을 연결하는 교사"];
  const subjectObjects: Record<NationwideSubjectSlug, string[]> = {
    math: ["풀이 근거를", "계산 순서를", "조건 관계를", "개념 연결을", "식의 의미를", "그래프 변화를", "서술 과정을", "문제 해석을", "단위 확인을", "유형 판단을", "검산 습관을", "시간 배분을"],
    english: ["어휘 회상을", "문장 구조를", "문단 요지를", "근거 표현을", "어법 판단을", "듣기 단서를", "서술 표현을", "해석 순서를", "접속 관계를", "지문 흐름을", "요약 문장을", "복습 간격을"],
    korean: ["발문 조건을", "근거 문장을", "선택지 판단을", "문단 관계를", "작품 맥락을", "표현 효과를", "화자의 태도를", "자료 해석을", "독서 속도를", "서술 근거를", "어휘 문맥을", "오답 반례를"],
    science: ["개념 관계를", "실험 조건을", "변인 통제를", "자료 변화를", "그래프 축을", "단위 관계를", "탐구 순서를", "관찰 근거를", "계산 과정을", "현상 원리를", "용어 구분을", "서술 결론을"],
    social: ["핵심 용어를", "원인 관계를", "시간 흐름을", "공간 분포를", "자료 근거를", "사례 적용을", "제도 차이를", "지도 정보를", "도표 변화를", "쟁점 관점을", "서술 구조를", "개념 비교를"],
  };
  const studyMoments = ["수업을 시작하며", "짧은 회상 뒤", "교과서를 펼쳐", "최근 답안을 놓고", "주간 계획 전에", "혼자 다시 풀며", "설명을 마친 뒤", "과제를 정하기 전", "누적 복습에서", "시험 범위를 보며", "질문 기록으로", "오답을 분류하며", "다음 날 복습에서", "제한 시간을 두고", "힌트를 줄인 뒤", "학습을 마치며"];
  const approachParts = ["자기 말로 먼저", "표와 식으로 바꿔", "핵심 조건부터", "앞 단계와 연결해", "도움 없이 다시", "짧은 메모로 남겨", "예시와 반례로", "순서를 소리 내어", "교과서 표현으로", "다른 조건에 맞춰", "틀린 이유와 함께", "한 문장으로 줄여", "시간을 표시하며", "질문 형태로 바꿔", "기억을 가린 채", "선택 근거를 붙여"];
  const learningVerbs = ["설명하게 합니다", "복원하도록 합니다", "비교하게 합니다", "적용하도록 돕습니다", "분류하게 합니다", "확인하도록 합니다", "기록하게 합니다", "다시 구성합니다", "점검하게 합니다", "연결하도록 합니다", "요약하게 합니다", "수정하도록 합니다", "말하게 합니다", "선택하게 합니다", "재현하도록 합니다", "검토하게 합니다"];
  const observationStarts = ["교사는 이 과정에서", "학생과 함께", "첫 진단에서는", "재풀이 결과로", "학습 기록에서는", "주간 점검 때", "과제 확인에서는", "질문이 멈춘 곳에서", "설명 순서를 보며", "답안의 흔적으로", "복습 간격을 두고", "수행 시간을 비교해", "도움 요청을 살펴", "정확도와 별도로", "오래된 오답에서", "다음 계획을 세우며"];
  const observationEnds = ["이해와 암기를 나눕니다", "실수의 시작점을 찾습니다", "도움이 필요한 단계를 정합니다", "가능한 과제량을 계산합니다", "다음 연습의 순서를 고릅니다", "혼자 해결한 범위를 표시합니다", "반복되는 원인을 묶습니다", "설명 수준을 다시 맞춥니다", "속도와 정확도를 구분합니다", "계획의 무리 여부를 판단합니다", "개념 빈칸을 좁혀 갑니다", "질문의 변화를 확인합니다", "학습 행동을 한 가지 정합니다", "재현 가능한 방법을 남깁니다", "새 진도 시점을 결정합니다", "피드백의 근거를 마련합니다"];
  const pick = <T,>(values: T[], salt: number) => {
    let value = 2166136261;
    for (const char of `${seed}:${page.school.id}:${page.gradeSlug}:${page.subjectSlug}:${salt}`) {
      value ^= char.charCodeAt(0);
      value = Math.imul(value, 16777619) >>> 0;
    }
    value ^= value >>> 16;
    value = Math.imul(value, 0x7feb352d) >>> 0;
    value ^= value >>> 15;
    return values[(value >>> 0) % values.length];
  };
  const paragraphs = [
    `${page.school.name} ${page.grade} ${page.subject} 학습은 학교명만으로 진도나 시험 특성을 가정하지 않습니다. ${pick(openings, 17)} ${pick(diagnostics, 29)} 학생이 가져온 범위표, 최근 답안과 실제 주간 일정을 확인해 ${stage}을 우선순위에 맞게 배치합니다.`,
    `${page.town} 생활권의 ${page.school.name} ${page.grade} ${page.subject} 학습에서 먼저 살필 과제는 ${challenge}입니다. ${pick(diagnostics, 41)} 정답률만 보지 않고 문제를 읽기 시작한 시점, 도움을 요청한 단계와 재풀이 결과를 함께 기록해 개념 부족과 실행 습관을 구분합니다.`,
    `${page.subject} 수업에서는 ${method}합니다. ${pick(practices, 53)} 학생이 풀이나 판단 근거를 자기 말로 설명한 뒤 새로운 조건에도 같은 원리를 사용할 수 있는지 확인하며, 설명을 대신해 주는 수업이 되지 않도록 힌트를 단계적으로 줄입니다.`,
    `${page.grade} 시기의 계획은 가능한 공부 시간을 과장하지 않는 데서 출발합니다. ${pick(practices, 67)} 일정이 빡빡한 날의 최소 과제와 여유가 있는 날의 확장 과제를 구분하고, 한 주 뒤 수행률과 정확도를 비교해 분량을 다시 조정합니다.`,
    `학부모 상담에서는 “${challenge}”라는 관찰을 점수와 분리해 확인합니다. ${pick(communications, 79)} 확인되지 않은 학교별 출제 경향은 안내하지 않고, 공식 수업 자료와 학생 기록에서 확인된 사실만 학습 계획에 반영합니다.`,
    `실제 연습은 ${method}한 뒤 조건이나 표현이 달라진 문항으로 이어집니다. ${pick(practices, 83)} 같은 답을 기억해 맞힌 경우와 개념을 이해해 해결한 경우를 구분하고, 다음 수업에서는 실패한 단계부터 짧게 회상한 뒤 적용 범위를 넓힙니다.`,
    `${page.school.name} ${page.grade} ${page.subject} 학생에게는 ${pick(matching, 97)}가 적합한지 상담에서 살핍니다. 경력이나 학벌만 비교하지 않고 질문을 기다리는 시간, 설명의 길이, 과제 확인 방식이 학생 성향과 맞는지 확인하며, 수업 중 질문이 줄거나 과제가 지속되지 않으면 매칭 방식도 다시 점검합니다.`,
    `${page.sigungu} ${page.town}에서 ${page.grade} ${page.subject} 방문·화상 수업과 일정은 배정 상황에 따라 달라질 수 있습니다. ${pick(communications, 109)} 상담 신청만으로 수업이 확정되지는 않으며, 현재 목표와 학습 기록을 바탕으로 필요한 관리 강도와 수업 방식을 충분히 안내한 뒤 결정합니다.`,
  ];
  const identity = `${page.school.name} ${page.grade} ${page.subject}`;
  const objects = subjectObjects[page.subjectSlug];
  const essayParagraphs = Array.from({ length: 5 }, (_, paragraphIndex) => {
    const salt = 211 + paragraphIndex * 257;
    const sentences = Array.from({ length: paragraphIndex === 4 ? 2 : 4 }, (_, sentenceIndex) => {
      const offset = salt + sentenceIndex * 31;
      if (sentenceIndex === 0) {
        return `${paragraphIndex === 0 ? identity : `${page.town} ${page.grade} ${page.subject} 학습`}에서는 ${pick(studyMoments, offset)} ${pick(objects, offset + 1)} ${pick(approachParts, offset + 2)} ${pick(learningVerbs, offset + 3)}.`;
      }
      if (sentenceIndex % 2 === 1) {
        return `${pick(observationStarts, offset + 4)} ${pick(objects, offset + 5)} ${pick(approachParts, offset + 6)} ${pick(learningVerbs, offset + 7)}. 이어서 ${pick(observationEnds, offset + 14)}.`;
      }
      return `${pick(studyMoments, offset + 8)} ${pick(objects, offset + 9)} ${pick(approachParts, offset + 10)} ${pick(learningVerbs, offset + 11)}. ${pick(observationStarts, offset + 12)} ${pick(observationEnds, offset + 13)}.`;
    });
    return sentences.join(" ");
  });
  return { stage, challenge, method, paragraphs, essayParagraphs };
}

export function nationwideRecord(page: NationwidePage): AdditionalTutoringRecord {
  const copy = nationwideCopy(page);
  const canonical = `https://studyhigh.co.kr${page.url}`;
  const imagePath = `/api/seo-thumbnail?dong=${encodeURIComponent(page.town)}&subject=${page.subjectSlug}`;
  const title = `${page.town} ${page.school.name} ${page.grade} ${page.subject}과외 | 1:1 맞춤 학습관리 | 스터디하이`;
  const description = `${page.sido} ${page.sigungu} ${page.town} ${page.school.name} ${page.grade} ${page.subject}과외 안내입니다. 공식 학교 정보와 학생의 현재 학습 기록을 바탕으로 개념, 숙제, 오답, 자기주도학습 순서를 맞춤 설계합니다.`;
  const seed = [...`${page.school.id}:${page.gradeSlug}:${page.subjectSlug}`].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 17);
  const pick = <T,>(values: T[], salt: number) => values[(seed + salt * 2654435761) % values.length];
  const firstChecks = ["최근 풀이에서 멈춘 첫 단계", "교과서 개념을 자기 말로 설명하는 과정", "숙제를 시작하고 끝내는 시간", "맞힌 문제의 근거를 다시 설명하는 과정", "오답을 며칠 뒤 혼자 복원하는 과정"];
  const feedback = ["수행 여부와 정확도를 나눠", "질문한 지점과 혼자 해결한 지점을 구분해", "이번 주에 유지할 행동과 바꿀 행동을 하나씩 골라", "진도보다 재현 가능한 학습 행동을 중심으로", "학생의 기록과 보호자의 관찰을 함께 비교해"];
  const teacherStyles = ["질문을 충분히 기다려 주는", "짧게 설명하고 자주 확인하는", "풀이 기록을 세밀하게 살피는", "학습 속도를 유연하게 조절하는", "학생이 직접 설명하도록 이끄는"];
  const faq = [
    {
      question: `${page.school.name} ${page.grade} ${page.subject} 학습은 무엇부터 점검하나요?`,
      answer: `${page.town} 생활권의 수업 일정과 함께 ${pick(firstChecks, 1)}을 먼저 확인합니다. 학교별 시험 범위나 난이도를 추정하지 않고 학생이 가져온 공식 수업 자료와 실제 학습 기록에서 출발합니다.`,
    },
    {
      question: `${page.grade} ${page.subject}에서 ${copy.challenge}는 어떻게 보완하나요?`,
      answer: `${copy.method}하는 과정을 수업에서 연습합니다. 같은 유형을 반복하기보다 학생이 판단 근거를 말하고 다른 조건에도 적용할 수 있는지 확인합니다.`,
    },
    {
      question: `${page.school.name} 내신 준비는 언제부터 어떻게 시작하나요?`,
      answer: `확인 가능한 교과서, 학교 안내 자료, 학생이 받은 시험 범위표를 모은 뒤 현재 진도와 남은 시간을 나눕니다. 공식 자료에 없는 출제 경향이나 난이도는 단정하지 않습니다.`,
    },
    {
      question: `${page.town} ${page.grade} 학생의 숙제와 오답은 어떤 방식으로 관리하나요?`,
      answer: `${pick(copy.paragraphs, 4)} 숙제 분량은 가능한 시간에 맞추고, 오답은 처음 잘못 판단한 지점과 다음 확인 행동을 함께 기록합니다.`,
    },
    {
      question: `자기주도학습이 어려운 ${page.grade} 학생도 수업을 따라갈 수 있나요?`,
      answer: `처음에는 교사가 시작 신호와 완료 기준을 분명히 제시하고 점차 도움을 줄입니다. ${pick(feedback, 5)} 학생과 보호자에게 피드백해 혼자 시작하고 마치는 행동을 늘립니다.`,
    },
    {
      question: `${page.subject}과외 선생님은 학생 성향에 따라 어떻게 선택하나요?`,
      answer: `${page.school.name} 학생의 질문 방식, 설명 선호, 과제 수행 속도를 상담에서 확인합니다. 경력만 비교하지 않고 ${pick(teacherStyles, 6)} 선생님처럼 실제 학습 행동과 맞는 수업 방식을 우선합니다.`,
    },
  ];
  return {
    id: `nationwide:${page.school.id}:${page.gradeSlug}:${page.subjectSlug}`,
    status: "published",
    createdAt: "2026-09-15",
    region: { sido: page.sido, sigungu: page.sigungu, eupmyeondong: page.town, provinceSlug: page.provinceSlug, districtSlug: page.districtSlug, townSlug: page.townSlug, townId: page.school.region?.townId || "" },
    school: { id: page.school.id, name: page.school.name, type: page.school.schoolType, typeName: page.school.schoolTypeName, address: page.school.address.road, addressDetail: page.school.address.detail || "", source: "학교알리미 공식 API", sourceDate: "2026-09-14" },
    page: { url: page.url, canonical, title, description, grade: page.grade, subject: page.subject, subjectSlug: page.subjectSlug },
    content: {
      theme: `${page.grade} ${page.subject} 학습관리`, introduction: copy.paragraphs[0], regionContext: copy.paragraphs[1], schoolAnalysis: copy.paragraphs[2], exam: copy.paragraphs[3],
      examCaveat: "학교별 시험 범위·난이도·출제 경향은 학생이 제공한 최신 공식 자료를 확인한 뒤 계획에 반영합니다.", concern: copy.challenge, difficultUnit: copy.challenge,
      studyMethod: copy.method, parentConcern: copy.paragraphs[4], workedExample: copy.paragraphs[5], lesson: copy.stage, longForm: copy.essayParagraphs, faq,
    },
    seo: { title, description, canonical, ogTitle: title, ogDescription: description, ogImage: `https://studyhigh.co.kr${imagePath}`, keywords: [`${page.town} ${page.grade} ${page.subject}과외`, `${page.school.name} ${page.subject}`, `${page.sigungu} 1:1 과외`] },
    image: { masterImage: "/thumbnails/studyhigh-official-template.png", imagePath, imageUrl: `https://studyhigh.co.kr${imagePath}`, alt: `${page.town} ${page.school.name} ${page.grade} ${page.subject}과외 대표 이미지`, regionText: page.town, subjectText: `${page.subject}과외`, width: 1200, height: 1200 },
    provenance: { regionFile: "data/regions", schoolFile: "data/schools", schoolId: page.school.id, teachingAdvice: "grade-and-subject-general-guidance", verifiedSchoolExamPattern: false },
  } as AdditionalTutoringRecord;
}
