import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";

export type ProgramSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export function ProgramLanding({
  eyebrow,
  title,
  description,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: ProgramSection[];
}) {
  const subjectName = title.split(" ")[0];
  const faqs = [
    { question: `${subjectName} 과외는 어떤 학생에게 필요한가요?`, answer: description },
    { question: `${subjectName} 과외는 학년별로 어떻게 진행되나요?`, answer: sections.map((section) => `${section.title}: ${section.description}`).join(" ") },
  ];
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return (
    <>
      <Header />
      <main className="bg-white text-[#0F172A]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <section className="bg-[#F4EFFF] px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="현재 위치" className="text-sm font-bold text-[#403A48]">
              <Link href="/" className="hover:text-[#6736C8]">홈</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span>{title}</span>
            </nav>
            <p className="mt-10 text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.12] sm:text-6xl">{title}</h1>
            <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-[#403A48]">{description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <OpenConsultationButton className="inline-flex h-13 items-center justify-center rounded-full bg-[#6736C8] px-7 text-sm font-black text-white transition hover:bg-[#5526B4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6736C8]">
                무료 상담 신청
              </OpenConsultationButton>
              <Link href="/regions" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-[#D8C8F4] bg-white px-7 text-sm font-black text-[#2B105F] transition hover:border-[#6736C8] hover:text-[#6736C8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6736C8]">
                지역별 과외 찾기 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-[#E9E1F7] bg-white px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black tracking-[0.24em] text-[#6736C8]">WHY THIS SUBJECT</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">{subjectName}, 어디에서 막히는지 먼저 확인합니다</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[['01','현재 수준 진단','점수만 보지 않고 개념·이해·풀이 과정 중 막히는 지점을 확인합니다.'],['02','학생별 원인 분석',`${subjectName} 공부가 어렵거나 오답이 반복되는 이유를 학생의 설명에서 찾습니다.`],['03','학년별 학습 설계','초등·중등·고등의 목표에 맞춰 필요한 순서와 복습 계획을 정합니다.']].map(([number, heading, copy]) => <article key={number} className="rounded-[24px] border border-[#E5D8FF] bg-[#FAF8FF] p-7"><span className="text-xs font-black text-[#7C3AED]">{number}</span><h3 className="mt-5 text-xl font-black">{heading}</h3><p className="mt-3 text-sm font-semibold leading-7 text-[#403A48]">{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} className="scroll-mt-28 rounded-[24px] border border-[#E5D8FF] bg-white p-7 shadow-[0_18px_55px_rgba(43,16,95,0.06)] sm:p-9">
                <p className="text-xs font-black tracking-[0.2em] text-[#7C3AED]">{String(index + 1).padStart(2, "0")} · {section.eyebrow}</p>
                <h2 className="mt-4 text-2xl font-black sm:text-3xl">{section.title}</h2>
                <p className="mt-4 font-semibold leading-8 text-[#403A48]">{section.description}</p>
                <ul className="mt-6 grid gap-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm font-bold leading-6 text-[#403A48]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#6736C8]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#FAF8FF] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-center text-xs font-black tracking-[0.24em] text-[#6736C8]">QUESTIONS & ANSWERS</p>
            <h2 className="mt-4 text-center text-3xl font-black sm:text-5xl">{subjectName} 과외, 자주 묻는 질문</h2>
            <div className="mt-10 grid gap-4">{faqs.map(({ question, answer }) => <article key={question} className="rounded-[22px] border border-[#E5D8FF] bg-white p-7"><h3 className="text-lg font-black">Q. {question}</h3><p className="mt-4 font-semibold leading-8 text-[#403A48]">A. {answer}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-[#2B105F] px-5 py-16 text-white lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black text-white/60">STUDYHIGH CONSULT</p>
              <h2 className="mt-3 text-3xl font-black">학생에게 맞는 수업 방향을 함께 정해보세요.</h2>
            </div>
            <OpenConsultationButton className="inline-flex h-13 items-center justify-center rounded-full bg-white px-7 text-sm font-black text-[#2B105F] transition hover:bg-[#F4EFFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              무료 상담 신청
            </OpenConsultationButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
