import type { Metadata } from "next";
import { ProgramLanding } from "@/components/ProgramLanding";

export const metadata: Metadata = {
  title: "스터디하이 소개",
  description: "학생의 성향과 학습 목표를 바탕으로 선생님과 수업 방향을 연결하는 스터디하이 1:1 맞춤 교육 시스템을 소개합니다.",
  alternates: { canonical: "/about" },
};

const sections = [
  { id: "brand", eyebrow: "BRAND", title: "학생을 먼저 이해하는 스터디하이", description: "스터디하이는 학년이나 과목만으로 수업을 정하지 않습니다. 학생이 어디서 막히는지, 어떤 설명을 편하게 받아들이는지, 혼자 공부할 때 무엇이 어려운지부터 확인합니다.", points: ["초등부터 고등까지 단계별 1:1 수업", "현재 수준과 목표를 함께 보는 상담", "수업과 학습관리를 연결하는 운영"] },
  { id: "philosophy", eyebrow: "PHILOSOPHY", title: "성적 변화가 이어지는 교육 철학", description: "빠른 진도보다 이해와 반복 가능한 학습 루틴을 우선합니다. 학생이 답을 맞히는 데서 끝나지 않고, 풀이 근거를 설명하고 스스로 다음 계획을 세우도록 돕습니다.", points: ["이해 속도에 맞춘 설명", "작은 성취를 확인하는 피드백", "학생이 실행할 수 있는 학습 계획"] },
  { id: "personal-system", eyebrow: "1:1 SYSTEM", title: "1:1 맞춤 교육 시스템", description: "상담과 학습 진단에서 확인한 내용을 수업 목표, 과제, 오답 복습과 피드백에 반영합니다. 학생의 변화에 따라 수업 방향도 조정합니다.", points: ["상담과 진단", "개인별 학습 계획", "수업·숙제·오답 피드백"] },
  { id: "teachers", eyebrow: "TEACHERS", title: "전문 선생님을 확인하는 기준", description: "담당 과목과 지도 학년, 수업 가능 방식, 설명과 관리 스타일을 확인해 학생과 맞는 선생님을 연결합니다. 개별 선생님의 실제 경력과 수업 가능 여부는 상담에서 확인해 안내합니다.", points: ["과목과 학년 지도 범위 확인", "방문·화상 수업 가능 조건 확인", "학생 성향과 설명 방식의 적합성 확인"] },
  { id: "class-methods", eyebrow: "CLASS METHODS", title: "방문과외와 화상과외", description: "방문과외는 정해진 장소에서 대면으로 진행하며, 화상과외는 이동 없이 온라인으로 만납니다. 학생의 집중 방식, 일정, 지역과 선생님 배정 가능 여부를 함께 고려합니다.", points: ["방문: 대면 상호작용과 현장 학습 점검", "화상: 이동 부담 없이 일정 조정", "실제 가능 여부는 상담 후 안내"] },
  { id: "matching-process", eyebrow: "MATCHING", title: "선생님 매칭 과정", description: "학생 정보만 받고 바로 배정하지 않습니다. 상담, 목표 확인, 후보 검토, 수업 방식 안내의 순서로 학생과 선생님이 잘 맞을 가능성을 높입니다.", points: ["학생 상황과 요청 조건 상담", "과목·학년·지역에 맞는 후보 확인", "수업 시작 전 방식과 일정 조율"] },
];

export default function AboutPage() {
  return <ProgramLanding eyebrow="ABOUT STUDYHIGH" title="스터디하이 소개" description="학생에게 맞는 선생님과 학습 방향을 연결해 수업이 꾸준한 변화로 이어지도록 돕습니다." sections={sections} />;
}
