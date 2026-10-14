import type { Metadata } from "next";
import { ProgramLanding } from "@/components/ProgramLanding";
export const metadata: Metadata = { title: "중등 과외", description: "국어·영어·수학·과학 개념, 학교 내신 준비와 고등 선행을 학생별로 설계하는 스터디하이 중등 1:1 과외입니다.", alternates: { canonical: "/middle" } };
const sections = [
  { id: "korean", eyebrow: "KOREAN", title: "중등 국어", description: "교과서 작품과 설명문을 읽고 핵심 정보와 표현의 근거를 찾는 연습을 합니다. 서술형은 질문 의도를 파악하고 답의 구조를 만드는 과정까지 확인합니다.", points: ["문학·비문학 독해 과정", "어휘와 문법 개념", "서술형 답안 구성"] },
  { id: "english", eyebrow: "ENGLISH", title: "중등 영어", description: "어휘, 문법, 문장 구조와 독해를 따로 외우지 않고 연결합니다. 학교 학습과 복습 주기를 맞춰 누적되는 기초 누락을 줄입니다.", points: ["문장 구조와 문법 연결", "본문 이해와 핵심 표현", "어휘 복습 주기 관리"] },
  { id: "math", eyebrow: "MATH", title: "중등 수학", description: "단원별 개념의 연결을 확인하고 풀이 과정에서 생기는 실수를 유형별로 정리합니다. 개념 확인, 기본 적용, 변형 문제 순으로 난도를 조절합니다.", points: ["선행 개념의 누락 점검", "풀이 단계별 오류 확인", "오답 재풀이와 설명"] },
  { id: "science", eyebrow: "SCIENCE", title: "중등 과학", description: "용어를 외우는 데서 끝내지 않고 현상, 원리, 자료 해석을 연결합니다. 단원별 핵심 개념과 문제 속 조건을 읽는 방법을 함께 익힙니다.", points: ["핵심 용어와 원리 이해", "그래프·표 자료 해석", "개념을 활용한 문제 적용"] },
  { id: "school-exam", eyebrow: "SCHOOL EXAM", title: "중학교 내신대비", description: "학교별 실제 시험 범위나 경향을 임의로 단정하지 않습니다. 확인된 학습 범위와 일정, 학생의 취약 단원을 바탕으로 계획과 복습 순서를 정합니다.", points: ["확인된 범위와 일정 정리", "과목별 우선순위 설정", "서술형과 오답 복습"] },
  { id: "high-advance", eyebrow: "HIGH ADVANCE", title: "고등 선행학습", description: "중학교 과정의 기반이 충분한지 점검한 뒤 고등 개념을 시작합니다. 선행 진도와 중등 내신 준비가 충돌하지 않도록 학습량을 조절합니다.", points: ["중등 필수 개념 점검", "고등 학습 용어와 구조 익히기", "현재 학습과 선행의 시간 배분"] },
];
export default function MiddlePage() { return <ProgramLanding eyebrow="MIDDLE SCHOOL" title="중등 1:1 맞춤 과외" description="깊어지는 과목별 개념과 학교 학습을 연결하고, 스스로 복습할 수 있는 내신 기반을 만듭니다." sections={sections} />; }
