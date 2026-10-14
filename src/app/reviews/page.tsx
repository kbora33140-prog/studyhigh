import type { Metadata } from "next";
import { ProgramLanding } from "@/components/ProgramLanding";
export const metadata: Metadata = { title: "수업 후기", description: "스터디하이 기존 수업 사례를 학부모·학생 피드백, 성적과 학습 습관 변화의 관점에서 확인합니다.", alternates: { canonical: "/reviews" } };
const sections = [
  { id: "parent-reviews", eyebrow: "PARENTS", title: "학부모 후기", description: "기존 홈페이지에 공개된 상담 및 학습관리 사례를 통해 수업 방향과 피드백 방식이 어떻게 달라졌는지 확인할 수 있습니다. 개인 정보는 일부 가려 표시합니다.", points: ["상담에서 확인한 학생 성향", "수업 후 전달된 학습 피드백", "가정에서 관찰한 학습 변화"] },
  { id: "student-reviews", eyebrow: "STUDENTS", title: "학생 후기", description: "질문하기, 과제 시작하기, 오답 다시 풀기처럼 학생이 실제로 바꾼 학습 행동을 중심으로 기존 사례를 정리합니다.", points: ["수업 참여와 질문의 변화", "과제와 복습 습관", "과목에 대한 자신감"] },
  { id: "score-cases", eyebrow: "RESULTS", title: "성적 향상 사례", description: "점수나 결과만 제시하지 않고 어떤 기초 누락을 보완했고 어떤 학습 루틴을 적용했는지 함께 살펴봅니다. 학생마다 변화 속도와 결과는 다를 수 있습니다.", points: ["학습 전 어려움과 목표", "적용한 수업 및 복습 방식", "확인된 변화와 다음 과제"] },
  { id: "change-cases", eyebrow: "CHANGES", title: "학습 변화 사례", description: "성적 외에도 집중 시간, 질문 횟수, 숙제 완료, 계획 실천과 같은 과정을 살펴봅니다. 꾸준한 변화를 만드는 데 필요한 조건을 확인합니다.", points: ["집중과 수업 참여", "숙제 완료와 오답 복습", "자기주도 계획 실천"] },
  { id: "columns", eyebrow: "COLUMNS", title: "교육 정보 및 칼럼", description: "학년 전환, 과목별 공부법, 학습 습관과 상담 준비에 관한 정보를 제공합니다. 학교별로 확인되지 않은 시험 정보는 다루지 않습니다.", points: ["학년별 학습 방향", "과목별 기초 점검법", "학부모 상담 체크리스트"] },
];
export default function ReviewsPage() { return <ProgramLanding eyebrow="CLASS REVIEWS" title="수업 후기" description="기존에 공개된 수업 사례를 바탕으로 학생의 학습 과정과 변화가 어떻게 이어졌는지 확인하세요." sections={sections} />; }
