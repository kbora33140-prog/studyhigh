import type { Metadata } from "next";
import { BookOpenCheck, ClipboardCheck, GraduationCap, Route } from "lucide-react";
import { Header } from "@/components/Header";
import { ConsultationTimeline, PremiumCard, SectionTitle, SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "검정고시 맞춤 교육 | 스터디하이",
  description:
    "스터디하이 검정고시 맞춤 교육은 초졸, 중졸, 고졸 검정고시 준비 학생을 위해 진단, 합격 전략, 맞춤 커리큘럼, 상담 과정을 제공합니다.",
  alternates: { canonical: "/ged" },
};

const cards = [
  {
    icon: BookOpenCheck,
    title: "검정고시란 무엇인가요?",
    description:
      "정규 학교 과정을 마치지 않았거나 새로운 학력 취득이 필요한 학생이 시험을 통해 학력을 인정받는 제도입니다.",
  },
  {
    icon: GraduationCap,
    title: "어떤 학생에게 필요할까요?",
    description:
      "학교 밖 청소년, 홈스쿨링 학생, 학력 취득이 필요한 성인 학습자, 목표 진학을 준비하는 학생에게 적합합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "합격 전략",
    description:
      "과목별 기초 진단 후 고득점 과목과 보완 과목을 나누어 학습 순서를 설계합니다.",
  },
  {
    icon: Route,
    title: "맞춤 커리큘럼",
    description:
      "초졸, 중졸, 고졸 과정별로 개념, 기출, 오답, 실전 모의고사를 단계적으로 구성합니다.",
  },
];

export default function GedPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#2b105f]">
              GED PROGRAM
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
              검정고시 합격을 위한
              <br />
              맞춤 학습 설계
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-black/65">
              스터디하이는 학생의 현재 수준과 목표 시험일을 기준으로 검정고시
              합격 전략과 개인별 커리큘럼을 제안합니다.
            </p>
          </div>
        </section>

        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-5 md:grid-cols-2">
              {cards.map((card) => (
                <PremiumCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  className="bg-[#faf8ff]"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle
              eyebrow="CONSULT PROCESS"
              title="상담 과정"
              description="검정고시 준비 상황을 확인한 뒤 과목별 우선순위와 수업 방식을 설계합니다."
            />
            <div className="mt-14">
              <ConsultationTimeline />
            </div>
            <OpenConsultationButton
              className={buttonVariants({ size: "lg", className: "mt-12 bg-[#16072f]" })}
            >
              무료 상담 신청
            </OpenConsultationButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
