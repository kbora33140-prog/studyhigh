import type { Metadata } from "next";
import { ProgramLanding } from "@/components/ProgramLanding";

export const metadata: Metadata = { title: "초등 과외", description: "국어·영어·수학 기초부터 공부 습관, 선행과 심화까지 학생의 성장 단계에 맞춘 스터디하이 초등 1:1 과외입니다.", alternates: { canonical: "/elementary" } };

const sections = [
  { id: "korean", eyebrow: "KOREAN", title: "초등 국어", description: "글을 소리 내어 읽는 것과 내용을 이해하는 것은 다릅니다. 어휘, 문장 이해, 중심 내용 찾기와 자기 생각 말하기를 단계적으로 연결합니다.", points: ["학년 수준에 맞는 어휘와 독해", "답의 근거를 찾는 연습", "읽기와 쓰기를 함께 관리"] },
  { id: "english", eyebrow: "ENGLISH", title: "초등 영어", description: "파닉스와 기초 어휘부터 문장 읽기까지 현재 단계에서 필요한 순서를 정합니다. 듣기, 말하기, 읽기와 쓰기의 균형을 학생의 목표에 맞춰 조정합니다.", points: ["소리와 철자의 기초 연결", "짧은 문장 이해와 표현", "부담 없는 복습 루틴"] },
  { id: "math", eyebrow: "MATH", title: "초등 수학", description: "계산 속도만 높이기보다 수 개념과 풀이 과정을 확인합니다. 반복되는 실수는 계산, 개념, 문제 해석 중 어느 단계에서 생기는지 찾아 보완합니다.", points: ["연산과 개념의 균형", "문장제 해석 과정 확인", "풀이 과정을 말로 설명하는 연습"] },
  { id: "study-habits", eyebrow: "STUDY HABITS", title: "기초학습 및 공부습관", description: "긴 계획보다 매일 실행할 수 있는 짧은 루틴부터 시작합니다. 학습 시작 시간, 집중 단위, 과제 확인과 정리 습관을 함께 다룹니다.", points: ["실행 가능한 하루 학습량", "숙제 시작과 마무리 루틴", "칭찬과 확인 기준 설정"] },
  { id: "advance", eyebrow: "ADVANCE", title: "선행학습", description: "현재 학년의 필수 개념이 안정적인지 먼저 확인하고 다음 학년 내용을 시작합니다. 진도 속도보다 이해와 복습 가능성을 기준으로 범위를 조정합니다.", points: ["현재 학년의 기초 점검", "다음 단계 핵심 개념 예습", "복습 시간을 포함한 진도 계획"] },
  { id: "deep-learning", eyebrow: "DEEP LEARNING", title: "심화학습", description: "배운 개념을 새로운 문제에 적용하고 풀이 방법을 비교합니다. 어려운 문제를 많이 푸는 것보다 생각한 과정을 설명하고 수정하는 힘을 기릅니다.", points: ["개념을 활용한 응용", "여러 풀이의 비교", "도전 문제 후 오답 정리"] },
];
export default function ElementaryPage() { return <ProgramLanding eyebrow="ELEMENTARY" title="초등 1:1 맞춤 과외" description="기초 개념과 공부 습관을 함께 다져 학생이 스스로 시작하고 끝낼 수 있는 힘을 키웁니다." sections={sections} />; }
