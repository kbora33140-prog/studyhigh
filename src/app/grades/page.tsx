import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, GraduationCap, School } from "lucide-react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";

export const metadata: Metadata = {
  title: "학년별 수업",
  description: "초등·중등·고등·검정고시 단계에 맞춘 스터디하이 1:1 맞춤 수업을 확인하세요.",
  alternates: { canonical: "/grades" },
};

const grades = [
  { title: "초등 과외", href: "/elementary", icon: BookOpenCheck, text: "기초 개념과 공부 습관을 함께 만드는 수업" },
  { title: "중등 과외", href: "/middle", icon: School, text: "과목별 개념과 학교 내신을 연결하는 수업" },
  { title: "고등 과외", href: "/high", icon: GraduationCap, text: "내신·모의고사·수능 목표에 맞춘 수업" },
  { title: "검정고시", href: "/ged", icon: BookOpenCheck, text: "현재 수준부터 시험 일정까지 고려한 수업" },
];

export default function GradesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-[#0F172A]">
        <section className="bg-[#F4EFFF] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black tracking-[0.28em] text-[#6736C8]">GRADE PROGRAM</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">학년별 1:1 맞춤 수업</h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#625D6B]">학생의 현재 학년과 학습 단계에 맞춰 과목, 진도, 공부 습관의 우선순위를 설계합니다.</p>
          </div>
        </section>
        <section className="px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
            {grades.map(({ title, href, icon: Icon, text }) => (
              <Link key={href} href={href} className="group rounded-[28px] border border-[#E5D8FF] bg-[#FBF9FF] p-8 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_65px_rgba(103,54,200,0.12)]">
                <Icon className="h-8 w-8 text-[#6736C8]" />
                <h2 className="mt-7 text-3xl font-black">{title}</h2>
                <p className="mt-4 font-medium leading-7 text-[#625D6B]">{text}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#6736C8]">자세히 보기 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-[#2B105F] px-5 py-16 text-white lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-black">어떤 학년 수업이 맞을지 함께 확인하세요.</h2>
            <OpenConsultationButton className="h-13 rounded-full bg-white px-7 text-sm font-black text-[#2B105F]">무료 상담 신청</OpenConsultationButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
