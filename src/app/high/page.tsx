import type { Metadata } from "next";
import { ProgramLanding } from "@/components/ProgramLanding";
export const metadata: Metadata = { title: "고등 과외", description: "국어·영어·수학·과학, 학년별 학습과 내신·수능·서술형 대비를 목표에 맞게 설계하는 스터디하이 고등 1:1 과외입니다.", alternates: { canonical: "/high" } };
const sections = [
  { id: "korean", eyebrow: "KOREAN", title: "고등 국어", description: "문학과 독서 지문을 읽는 과정, 선택지 판단의 근거, 시간 배분을 함께 점검합니다. 취약 영역을 구분해 개념과 문제 적용을 연결합니다.", points: ["지문 구조와 핵심 정보 파악", "선택지 판단 근거 확인", "영역별 시간 관리"] },
  { id: "english", eyebrow: "ENGLISH", title: "고등 영어", description: "어휘와 구문을 바탕으로 긴 문장의 구조를 파악하고 글의 논리 흐름을 읽습니다. 학생의 현재 수준에 따라 기초 문장 분석과 실전 독해의 비중을 조절합니다.", points: ["필수 어휘와 구문", "문단 간 논리 관계", "유형별 독해 전략"] },
  { id: "math", eyebrow: "MATH", title: "고등 수학", description: "공식 암기보다 정의와 조건을 이해하고 문제에 적용하는 과정을 확인합니다. 단원별 연결과 반복 실수를 기록해 다음 학습 순서를 정합니다.", points: ["개념의 정의와 조건 이해", "문제 접근 순서 점검", "오답 원인별 재학습"] },
  { id: "science", eyebrow: "SCIENCE", title: "고등 과학", description: "선택 과목의 개념 체계와 자료 해석, 계산 과정을 구분해 학습합니다. 과목과 목표에 맞춰 개념 복습과 문제 적용의 비중을 정합니다.", points: ["과목별 개념 구조", "자료와 실험 결과 해석", "계산 및 적용 문제 연습"] },
  { id: "grade-program", eyebrow: "GRADE PROGRAM", title: "고1·고2·고3 맞춤 과외", description: "학년만으로 같은 계획을 적용하지 않습니다. 현재 이수 과목, 목표, 학습 시간과 취약 영역을 확인해 주간 계획을 설계합니다.", points: ["고1: 학습 체계와 기초", "고2: 선택 과목과 목표 구체화", "고3: 우선순위와 실전 관리"] },
  { id: "school-exam", eyebrow: "SCHOOL EXAM", title: "고등 내신대비", description: "확인된 수업 범위와 일정에 따라 개념, 학교 학습 자료, 오답 복습을 정리합니다. 확인되지 않은 학교별 출제 경향은 단정하지 않습니다.", points: ["확인된 학습 범위 정리", "개념과 유형별 복습", "시험 후 오답 분석"] },
  { id: "csat", eyebrow: "CSAT", title: "수능 및 모의고사 대비", description: "현재 성취도와 목표를 기준으로 개념 보완, 기출 분석, 실전 연습의 순서를 정합니다. 결과뿐 아니라 시간과 판단 과정도 함께 기록합니다.", points: ["성취도별 기출 활용", "시간 배분과 풀이 순서", "회차별 약점 보완"] },
  { id: "performance", eyebrow: "PERFORMANCE", title: "수행평가 및 서술형 대비", description: "과제 조건과 평가 일정을 학생이 직접 확인하도록 돕고, 답안의 근거와 표현을 점검합니다. 대필이나 결과물 대신 준비 과정을 지도합니다.", points: ["과제 조건과 일정 확인", "자료 조사와 내용 구성", "서술형 답안의 근거 점검"] },
];
export default function HighPage() { return <ProgramLanding eyebrow="HIGH SCHOOL" title="고등 1:1 맞춤 과외" description="내신과 진로 목표, 현재 학습 시간을 함께 고려해 과목별 우선순위와 복습 체계를 설계합니다." sections={sections} />; }
