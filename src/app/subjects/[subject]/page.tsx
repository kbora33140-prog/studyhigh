import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramLanding, type ProgramSection } from "@/components/ProgramLanding";

const subjects: Record<string, { name: string; summary: string; sections: ProgramSection[] }> = {
  korean: { name: "국어", summary: "짧은 영상과 짧은 글에 익숙해 긴 글을 어려워하는 학생이 늘고 있습니다. 국어 독해력·어휘력·이해력은 수학 문장제와 사회·과학 문제를 이해하는 바탕이므로, 전 과목 학습을 위해 먼저 점검해야 할 중요한 역량입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 국어 커리큘럼", description: "짧은 글에서 시작해 문장과 문단의 중심 내용을 찾고, 낯선 어휘를 문맥 속에서 이해하며 긴 글을 읽는 힘을 단계적으로 만듭니다.", points: ["기초 어휘와 문장 이해", "중심 문장 찾기와 내용 요약", "읽은 내용을 말과 글로 표현하기"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 국어 커리큘럼", description: "교과서 문학과 비문학의 구조를 읽는 기준을 세우고, 문법·서술형·수행평가까지 답의 근거를 설명하는 훈련을 합니다.", points: ["문학 작품의 표현과 근거", "설명문·논설문 구조 독해", "문법과 서술형 답안 구성"] },
    { id: "high", eyebrow: "HIGH", title: "고등 국어 커리큘럼", description: "긴 독서 지문의 논리 구조, 문학 선택지의 판단 근거, 내신과 수능의 시간 배분을 점검해 감이 아닌 기준으로 풀이합니다.", points: ["독서 지문 구조와 추론", "문학·언어와 매체 판단 근거", "내신·수능 실전 시간 관리"] },
  ] },
  english: { name: "영어", summary: "어휘와 문장 구조, 독해와 표현을 학생의 학년과 목표에 맞춰 연결하는 1:1 영어 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 영어", description: "소리와 철자, 기초 어휘와 짧은 문장을 연결하며 부담 없는 복습 습관을 만듭니다.", points: ["파닉스와 기초 어휘", "문장 읽기", "듣기·말하기 기초"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 영어", description: "문법을 문장 구조와 독해에 적용하고 학교 학습 범위에 맞춰 어휘 복습을 관리합니다.", points: ["문법과 구문", "본문 이해", "어휘 복습 주기"] },
    { id: "high", eyebrow: "HIGH", title: "고등 영어", description: "긴 문장의 구조와 글의 논리 흐름을 파악하고 유형별 판단 과정과 시간 배분을 연습합니다.", points: ["필수 구문", "논리 독해", "실전 유형 연습"] },
  ] },
  math: { name: "수학", summary: "수학을 어렵고 재미없는 과목으로 느끼는 이유부터 찾습니다. 기초가 부족한 학생은 개념과 문장제 해석을, 상위권 학생은 심화 문제에서 오답이 반복되는 사고 과정과 조건 누락을 구체적으로 점검합니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 수학 커리큘럼", description: "계산 속도만 높이기보다 수 개념과 연산 원리를 이해하고, 문장제의 조건을 찾아 자신의 풀이를 설명하도록 지도합니다.", points: ["연산 정확도와 수 개념", "문장제 조건 표시", "풀이를 말로 설명하기"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 수학 커리큘럼", description: "단원 간 개념 연결을 확인하고 기본·유형·변형 문제 순서로 적용하며, 틀린 이유를 개념 부족과 풀이 실수로 나눕니다.", points: ["개념 연결과 공식의 조건", "내신 유형별 적용", "오답 원인 기록과 재풀이"] },
    { id: "high", eyebrow: "HIGH", title: "고등 수학 커리큘럼", description: "정의와 조건에서 출발해 문제 접근 순서를 만들고, 상위권 심화 문제의 반복 오답을 발상·계산·조건 해석 단계로 분석합니다.", points: ["정의·조건 기반 접근", "심화 문제 사고 과정 분석", "내신·수능 취약 단원 보완"] },
  ] },
  science: { name: "과학", summary: "현상과 원리, 실험 자료와 문제 적용을 학년별 개념 체계에 맞춰 배우는 1:1 과학 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 과학", description: "생활 속 현상을 관찰하고 과학 용어와 원리를 자기 말로 설명하는 기초를 만듭니다.", points: ["관찰과 분류", "기초 과학 용어", "현상 설명하기"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 과학", description: "단원별 핵심 개념과 그래프·표, 실험 결과를 연결해 문제 속 조건을 해석합니다.", points: ["핵심 원리", "자료 해석", "개념 적용"] },
    { id: "high", eyebrow: "HIGH", title: "고등 과학", description: "선택 과목의 개념 체계를 정리하고 자료 해석과 계산 과정의 오류를 구분해 보완합니다.", points: ["과목별 개념 구조", "실험·자료 해석", "계산과 문제 적용"] },
  ] },
  social: { name: "사회", summary: "외우기만 하면 금방 잊기 쉬운 사회 개념을 원인과 결과, 지도·표·그래프 자료와 연결해 이해하고 내신과 사회탐구 문제에 적용하는 1:1 사회 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 사회 커리큘럼", description: "생활 주변의 지역과 사회 현상을 지도와 사진 자료로 살펴보고 핵심 용어를 자기 말로 설명합니다.", points: ["기초 사회 용어", "지도와 자료 읽기", "원인과 결과 말하기"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 사회 커리큘럼", description: "지리·일반사회·역사 개념의 관계를 정리하고 학교 시험의 자료형·서술형 문제에 적용합니다.", points: ["단원별 개념 구조", "표·그래프 자료 해석", "내신 서술형 근거"] },
    { id: "high", eyebrow: "HIGH", title: "고등 사회·사탐 커리큘럼", description: "선택 과목의 핵심 개념과 기출 선지 판단 기준을 세우고 시간 안에 자료를 해석하는 연습을 합니다.", points: ["선택 과목 개념 체계", "기출 선지 판단", "자료 분석과 시간 관리"] },
  ] },
  history: { name: "한국사", summary: "연도와 사건을 따로 외우는 대신 시대 흐름과 사건의 원인·전개·결과를 연결해 이해하고 내신과 한국사능력검정시험에 적용하는 1:1 한국사 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 한국사 커리큘럼", description: "인물과 이야기 중심으로 시대의 큰 흐름을 익히고 역사에 대한 흥미와 배경지식을 만듭니다.", points: ["시대 순서 익히기", "인물과 사건 연결", "역사 어휘 이해"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 한국사 커리큘럼", description: "교과서 단원별 사건을 원인과 결과로 정리하고 사료·지도·연표 문제의 근거를 찾습니다.", points: ["교과서 흐름 정리", "사료와 연표 해석", "내신 서술형 대비"] },
    { id: "high", eyebrow: "HIGH", title: "고등 한국사 커리큘럼", description: "근현대사를 포함한 전 시대의 핵심 쟁점을 비교하고 내신·수능·한국사능력검정시험 유형을 대비합니다.", points: ["시대별 핵심 쟁점", "사료 비교와 선지 판단", "내신·수능·한능검 대비"] },
  ] },
  coding: { name: "코딩", summary: "문법을 외우는 수업이 아니라 문제를 작은 단계로 나누고 직접 구현하며 오류를 고치는 과정을 통해 논리적 사고와 문제 해결력을 기르는 1:1 코딩 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 코딩 커리큘럼", description: "블록 코딩과 간단한 프로젝트로 순서·조건·반복의 원리를 익히고 결과물을 완성하는 경험을 쌓습니다.", points: ["순서·조건·반복", "블록 코딩 프로젝트", "오류를 찾아 고치기"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 코딩 커리큘럼", description: "텍스트 코딩의 기초 문법을 문제 해결 과정과 연결하고 작은 프로그램을 기획하고 구현합니다.", points: ["파이썬 기초 문법", "알고리즘 사고", "미니 프로젝트"] },
    { id: "high", eyebrow: "HIGH", title: "고등 코딩 커리큘럼", description: "진로와 목표에 맞춰 자료구조·알고리즘·프로젝트를 선택하고 코드의 논리와 개선 과정을 설명합니다.", points: ["자료구조와 알고리즘 기초", "문제 풀이와 코드 리뷰", "진로 연계 프로젝트"] },
  ] },
};

export function generateStaticParams() { return Object.keys(subjects).map((subject) => ({ subject })); }
export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const { subject } = await params; const data = subjects[subject];
  if (!data) return {};
  return { title: `${data.name} 과외`, description: data.summary, alternates: { canonical: `/subjects/${subject}` } };
}
export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params; const data = subjects[subject]; if (!data) notFound();
  return <ProgramLanding eyebrow="SUBJECT PROGRAM" title={`${data.name} 1:1 맞춤 과외`} description={data.summary} sections={data.sections} />;
}
