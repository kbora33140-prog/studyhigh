import type { Metadata } from "next";
import { ProgramLanding } from "@/components/ProgramLanding";
export const metadata: Metadata = { title: "학습관리", description: "학습 계획, 자기주도학습, 숙제·오답, 취약 유형과 월간 리포트를 연결하는 스터디하이 맞춤형 학습관리입니다.", alternates: { canonical: "/learning-management" } };
const sections = [
  { id: "personal-management", eyebrow: "PERSONAL PLAN", title: "맞춤형 학습관리", description: "학생의 학년, 과목, 목표와 실제로 공부할 수 있는 시간을 확인해 주간 계획을 세웁니다. 계획은 수업 진도와 과제 수행 결과에 맞춰 조정합니다.", points: ["현재 수준과 목표 확인", "실행 가능한 주간 계획", "수업 결과에 따른 계획 조정"] },
  { id: "self-directed", eyebrow: "SELF DIRECTED", title: "자기주도학습 코칭", description: "무엇을 공부할지 정하는 것부터 시작 시간, 완료 기준과 스스로 확인하는 방법까지 연습합니다. 교사의 도움을 줄여가며 학생이 계획을 운영하도록 돕습니다.", points: ["학습 순서를 스스로 정하기", "완료 기준과 시간 기록", "주간 회고와 다음 계획"] },
  { id: "homework-errors", eyebrow: "HOMEWORK & ERRORS", title: "숙제 및 오답관리", description: "숙제의 양보다 목적과 완료 여부를 확인합니다. 오답은 단순 실수, 개념 누락, 문제 해석, 풀이 과정으로 원인을 구분해 다시 학습합니다.", points: ["과제 목적과 분량 안내", "미완료 원인 확인", "오답 원인별 재풀이"] },
  { id: "weakness-analysis", eyebrow: "WEAKNESS", title: "취약 유형 분석", description: "반복해서 막히는 단원과 문제 유형, 풀이 단계와 학습 습관을 함께 봅니다. 확인한 약점은 다음 수업의 설명과 복습 계획에 반영합니다.", points: ["단원과 유형별 기록", "풀이 단계의 오류 확인", "보완 학습 후 재점검"] },
  { id: "ai-math", eyebrow: "AI MATH", title: "AI 수학 학습", description: "AI 기반 분석 기능을 사용할 때에도 결과만으로 수업을 결정하지 않습니다. 학습 기록과 교사의 확인을 함께 보고 보완할 개념과 문제를 정합니다.", points: ["학습 기록 기반 성취 확인", "교사의 풀이 과정 점검", "학생에게 필요한 복습 추천"] },
  { id: "monthly-report", eyebrow: "MONTHLY REPORT", title: "월간 학습 리포트", description: "한 달 동안 배운 범위와 과제, 오답, 학습 태도의 변화를 정리합니다. 다음 달에 유지할 점과 보완할 우선순위를 학부모와 공유합니다.", points: ["학습 범위와 수행 기록", "잘된 점과 보완점", "다음 달 학습 방향"] },
];
export default function LearningManagementPage() { return <ProgramLanding eyebrow="LEARNING MANAGEMENT" title="학습관리" description="수업이 없는 날에도 공부가 이어지도록 계획, 숙제, 오답과 피드백을 하나의 흐름으로 관리합니다." sections={sections} />; }
