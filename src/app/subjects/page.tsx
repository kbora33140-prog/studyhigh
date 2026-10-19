import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Braces, Calculator, FlaskConical, Languages, Landmark, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";

export const metadata: Metadata = {
  title: "과목별 수업",
  description: "국어·영어·수학·과학·코딩 과목별 스터디하이 1:1 맞춤 수업을 확인하세요.",
  alternates: { canonical: "/subjects" },
};

const subjects = [
  { id: "korean", title: "국어", icon: BookOpen, text: "어휘·독해·문학·비문학을 학년별로 연결합니다.", links: [["초등 국어", "/elementary#korean"], ["중등 국어", "/middle#korean"], ["고등 국어", "/high#korean"]] },
  { id: "english", title: "영어", icon: Languages, text: "기초 문장부터 내신과 수능 독해까지 단계별로 학습합니다.", links: [["초등 영어", "/elementary#english"], ["중등 영어", "/middle#english"], ["고등 영어", "/high#english"]] },
  { id: "math", title: "수학", icon: Calculator, text: "개념 이해, 풀이 과정, 오답 원인을 함께 점검합니다.", links: [["초등 수학", "/elementary#math"], ["중등 수학", "/middle#math"], ["고등 수학", "/high#math"]] },
  { id: "science", title: "과학", icon: FlaskConical, text: "핵심 개념과 탐구 과정을 학교 진도에 맞춰 정리합니다.", links: [["중등 과학", "/middle#science"], ["고등 과학", "/high#science"]] },
  { id: "social", title: "사회", icon: Users, text: "개념의 관계와 자료 해석 방법을 학교 진도에 맞춰 익힙니다.", links: [["과목 상담", "/contact"]] },
  { id: "history", title: "한국사", icon: Landmark, text: "시대의 흐름과 핵심 사건을 연결해 이해하고 문제에 적용합니다.", links: [["과목 상담", "/contact"]] },
  { id: "coding", title: "코딩", icon: Braces, text: "논리적 사고와 프로젝트 경험을 학생 수준에 맞춥니다.", links: [["코딩 수업", "/coding"]] },
];

export default function SubjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-[#0F172A]">
        <section className="bg-[#F4EFFF] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black tracking-[0.28em] text-[#6736C8]">SUBJECT PROGRAM</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">과목별 1:1 맞춤 수업</h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#625D6B]">같은 과목도 학생마다 막히는 지점이 다릅니다. 현재 수준과 목표에 맞는 과목별 수업을 살펴보세요.</p>
          </div>
        </section>
        <section className="px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
            {subjects.map(({ id, title, icon: Icon, text, links }) => (
              <article key={id} id={id} className="scroll-mt-28 rounded-[28px] border border-[#E5D8FF] bg-[#FBF9FF] p-8">
                <Icon className="h-8 w-8 text-[#6736C8]" />
                <h2 className="mt-7 text-3xl font-black">{title}</h2>
                <p className="mt-4 font-medium leading-7 text-[#625D6B]">{text}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {links.map(([label, href]) => <Link key={href} href={href} className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-black text-[#6736C8] ring-1 ring-[#D8C8F4] transition hover:bg-[#6736C8] hover:text-white">{label}<ArrowRight className="h-3.5 w-3.5" /></Link>)}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-[#2B105F] px-5 py-16 text-white lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-black">필요한 과목과 수업 방향을 함께 정해보세요.</h2>
            <OpenConsultationButton className="h-13 rounded-full bg-white px-7 text-sm font-black text-[#2B105F]">무료 상담 신청</OpenConsultationButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
