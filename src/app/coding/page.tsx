import type { Metadata } from "next";
import { Bot, Braces, Code2, GraduationCap, Laptop } from "lucide-react";
import { Header } from "@/components/Header";
import { ConsultationTimeline, PremiumCard, SectionTitle, SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "코딩 교육 | 초등·중등·고등 AI SW 교육",
  description:
    "스터디하이 코딩 교육은 초등 코딩, 중등 코딩, 고등 코딩, AI·SW 교육, 파이썬과 웹개발까지 학생 수준에 맞춰 설계합니다.",
  alternates: { canonical: "/coding" },
};

const cards = [
  {
    icon: Laptop,
    title: "코딩 교육 소개",
    description:
      "문제를 이해하고 순서대로 해결하는 사고력을 기르는 학습입니다. 단순 문법보다 사고 과정에 집중합니다.",
  },
  {
    icon: Code2,
    title: "초등 코딩",
    description:
      "엔트리와 스크래치를 활용해 알고리즘의 기초와 창의적 문제 해결 경험을 만듭니다.",
  },
  {
    icon: Braces,
    title: "중등 코딩",
    description:
      "파이썬 기초, 자료 구조 감각, 문제 풀이 루틴을 통해 텍스트 코딩으로 확장합니다.",
  },
  {
    icon: GraduationCap,
    title: "고등 코딩",
    description:
      "진로와 수행평가, 프로젝트, 정보 교과 대비까지 목표에 맞춘 수업을 설계합니다.",
  },
  {
    icon: Bot,
    title: "AI·SW 교육",
    description:
      "AI 활용, 데이터 분석, 웹개발 프로젝트까지 학생 수준에 맞춰 단계적으로 연결합니다.",
  },
];

export default function CodingPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#2b105f]">
              CODING PROGRAM
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
              사고력을 키우는
              <br />
              맞춤 코딩 교육
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-black/65">
              스터디하이는 초등, 중등, 고등 학생의 수준과 목표에 맞춰 코딩 교육과
              AI·SW 학습 로드맵을 설계합니다.
            </p>
          </div>
        </section>

        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
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
        </section>

        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle
              eyebrow="CONSULT PROCESS"
              title="상담 과정"
              description="코딩 경험, 관심 분야, 학교 과제, 진로 목표를 확인한 뒤 수업 단계를 제안합니다."
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
