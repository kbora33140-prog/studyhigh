import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramLanding, type ProgramSection } from "@/components/ProgramLanding";

const subjects: Record<string, { name: string; summary: string; sections: ProgramSection[] }> = {
  korean: { name: "국어", summary: "읽기와 어휘, 문학·비문학, 서술형까지 학년과 현재 독해 과정에 맞춰 배우는 1:1 국어 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 국어", description: "어휘와 문장 이해, 중심 내용 찾기부터 읽은 내용을 자기 말로 설명하는 연습까지 이어갑니다.", points: ["어휘와 문장 이해", "읽기 과정 확인", "기초 쓰기와 표현"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 국어", description: "교과서 작품과 설명문을 읽는 기준을 세우고 문법과 서술형 답안의 근거를 함께 점검합니다.", points: ["문학·비문학 독해", "문법 개념", "서술형 답안 구성"] },
    { id: "high", eyebrow: "HIGH", title: "고등 국어", description: "긴 지문의 구조와 선택지 판단 근거, 영역별 시간 배분을 점검해 실전 독해력을 높입니다.", points: ["독서 지문 구조", "문학 해석 근거", "실전 시간 관리"] },
  ] },
  english: { name: "영어", summary: "어휘와 문장 구조, 독해와 표현을 학생의 학년과 목표에 맞춰 연결하는 1:1 영어 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 영어", description: "소리와 철자, 기초 어휘와 짧은 문장을 연결하며 부담 없는 복습 습관을 만듭니다.", points: ["파닉스와 기초 어휘", "문장 읽기", "듣기·말하기 기초"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 영어", description: "문법을 문장 구조와 독해에 적용하고 학교 학습 범위에 맞춰 어휘 복습을 관리합니다.", points: ["문법과 구문", "본문 이해", "어휘 복습 주기"] },
    { id: "high", eyebrow: "HIGH", title: "고등 영어", description: "긴 문장의 구조와 글의 논리 흐름을 파악하고 유형별 판단 과정과 시간 배분을 연습합니다.", points: ["필수 구문", "논리 독해", "실전 유형 연습"] },
  ] },
  math: { name: "수학", summary: "개념 이해와 풀이 과정, 오답 원인을 확인하며 기초부터 심화까지 연결하는 1:1 수학 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 수학", description: "연산과 수 개념을 함께 점검하고 문장제에서 조건을 찾고 풀이를 설명하는 연습을 합니다.", points: ["연산과 수 개념", "문장제 해석", "풀이 과정 설명"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 수학", description: "단원 간 연결과 개념 누락을 확인해 기본 적용부터 변형 문제까지 단계적으로 학습합니다.", points: ["개념 연결", "유형별 적용", "오답 재풀이"] },
    { id: "high", eyebrow: "HIGH", title: "고등 수학", description: "정의와 조건을 바탕으로 문제 접근 순서를 만들고 반복되는 실수를 원인별로 보완합니다.", points: ["정의와 조건", "문제 접근 전략", "단원별 취약점 보완"] },
  ] },
  science: { name: "과학", summary: "현상과 원리, 실험 자료와 문제 적용을 학년별 개념 체계에 맞춰 배우는 1:1 과학 과외입니다.", sections: [
    { id: "elementary", eyebrow: "ELEMENTARY", title: "초등 과학", description: "생활 속 현상을 관찰하고 과학 용어와 원리를 자기 말로 설명하는 기초를 만듭니다.", points: ["관찰과 분류", "기초 과학 용어", "현상 설명하기"] },
    { id: "middle", eyebrow: "MIDDLE", title: "중등 과학", description: "단원별 핵심 개념과 그래프·표, 실험 결과를 연결해 문제 속 조건을 해석합니다.", points: ["핵심 원리", "자료 해석", "개념 적용"] },
    { id: "high", eyebrow: "HIGH", title: "고등 과학", description: "선택 과목의 개념 체계를 정리하고 자료 해석과 계산 과정의 오류를 구분해 보완합니다.", points: ["과목별 개념 구조", "실험·자료 해석", "계산과 문제 적용"] },
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
