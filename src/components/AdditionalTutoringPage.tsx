import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";
import { additionalTutoringRecords, type AdditionalTutoringRecord } from "@/lib/additionalTutoring";

// This component is exclusively for the new batch. Existing page markup is unchanged.
export function AdditionalTutoringPage({ record: r }: { record: AdditionalTutoringRecord }) {
  const c = r.content;
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: c.faq.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
  const service = { "@context": "https://schema.org", "@type": "Service", name: r.page.title, description: r.page.description, url: r.page.canonical, image: r.image.imageUrl,
    areaServed: `${r.region.sido} ${r.region.sigungu} ${r.region.eupmyeondong}`, provider: { "@type": "EducationalOrganization", name: "StudyHigh", url: "https://studyhigh.co.kr" } };
  const index = additionalTutoringRecords.findIndex(x => x.id === r.id);
  const related = [1, 2, 3].map(offset => additionalTutoringRecords[(index + offset) % additionalTutoringRecords.length]);
  return <><Header /><main className="bg-white text-black">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service).replace(/</g, "\\u003c") }} />
    <article>
      <section className="bg-[#f7f4ff] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div><p className="text-sm font-black text-[#6736C8]">{r.region.sido} {r.region.sigungu} · {r.school.name}</p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">{r.page.title.split(" | ")[0]}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">{c.introduction}</p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="주변 학교 생활권"><span className="rounded-full border border-[#6736C8]/15 bg-white px-3 py-1.5 text-sm font-bold text-black/65">{r.school.name} 생활권</span></div>
            <OpenConsultationButton className={buttonVariants({ size: "lg", className: "mt-8 bg-[#16072f]" })}>무료 상담 신청</OpenConsultationButton>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[30px] bg-white shadow-[0_24px_80px_rgba(43,16,95,0.16)] [container-type:inline-size]">
            <Image src={r.image.imagePath} alt={r.image.alt} fill priority unoptimized sizes="(min-width: 1024px) 42vw, 100vw" className="object-contain" />
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28"><div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">QUICK ANSWER</p>
        <h2 className="mt-4 text-3xl font-black sm:text-5xl">{c.theme}, 먼저 살펴볼 부분</h2>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">{c.regionContext}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <section className="rounded-[28px] bg-[#faf8ff] p-7"><h3 className="text-2xl font-black">학생의 학습 고민</h3><p className="mt-4 leading-8 text-black/62">{c.concern}</p></section>
          <section className="rounded-[28px] bg-[#16072f] p-7 text-white"><h3 className="text-2xl font-black">대표적인 학부모 상담 유형</h3><p className="mt-4 leading-8 text-white/70">{c.parentConcern}</p></section>
        </div>
      </div></section>
      <section className="bg-[#faf8ff] py-20 lg:py-28"><div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div><p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">STUDY GUIDE</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">학교 자료와 연결하는 {c.theme}</h2></div>
        <div className="space-y-6 text-lg leading-8 text-black/65"><p>{c.schoolAnalysis}</p><p>{c.examCaveat}</p><p>{c.exam}</p><p className="rounded-2xl bg-white p-6 font-bold text-black">{c.studyMethod}</p><h3 className="text-2xl font-black text-black">학습 예시: {c.theme}</h3><p>{c.workedExample}</p></div>
      </div></section>
      <section className="py-20 lg:py-28"><div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">PERSONAL DIAGNOSIS</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-black sm:text-5xl">{r.school.name} 학생도 필요한 출발점은 다릅니다</h2>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">{c.difficultUnit}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <section className="rounded-[28px] border border-black/8 p-7"><p className="text-sm font-black text-[#6736C8]">01 · 현재 상태 진단</p><h3 className="mt-3 text-2xl font-black">어려운 지점 확인</h3><p className="mt-4 leading-8 text-black/62">{c.concern}</p></section>
          <section className="rounded-[28px] border border-black/8 p-7"><p className="text-sm font-black text-[#6736C8]">02 · 내신 대비</p><h3 className="mt-3 text-2xl font-black">실제 범위에 맞춘 준비</h3><p className="mt-4 leading-8 text-black/62">{c.exam}</p></section>
          <section className="rounded-[28px] bg-[#f1ebff] p-7"><p className="text-sm font-black text-[#6736C8]">03 · 부족한 부분 보완</p><h3 className="mt-3 text-2xl font-black">혼자 해보는 단계</h3><p className="mt-4 leading-8 text-black/62">{c.studyMethod}</p></section>
        </div>
        <div className="mt-10 rounded-[30px] bg-[#16072f] p-8 text-white sm:p-10"><h3 className="text-2xl font-black sm:text-3xl">{c.theme} 중심의 1:1 수업 방향</h3><p className="mt-4 max-w-4xl leading-8 text-white/72">{c.lesson}</p><OpenConsultationButton className={buttonVariants({ size: "lg", className: "mt-7 bg-white text-black hover:bg-white/90" })}>내 상황 무료로 상담하기</OpenConsultationButton></div>
      </div></section>
      <section className="bg-[#faf8ff] py-20 lg:py-28"><div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">CONSULTATION PROCESS</p>
        <h2 className="mt-4 text-3xl font-black sm:text-5xl">상담에서 수업 방향까지</h2>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">{r.region.eupmyeondong} 수업 일정·방식·비용은 상담 후 확인합니다. 신청만으로 등록되지 않습니다.</p>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[["상담 신청", c.parentConcern], ["학습 기록 확인", c.difficultUnit], ["보완 순서 제안", c.studyMethod], ["가능한 수업 안내", `${r.school.name}의 진도와 ${c.theme} 목표를 확인하고 일정·방문 또는 화상·비용을 안내합니다.`]].map(([title, body], i) => <li key={title} className="rounded-[26px] bg-white p-7 shadow-sm shadow-black/5"><span className="text-sm font-black text-[#6736C8]">STEP {i + 1}</span><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-black/60">{body}</p></li>)}</ol>
      </div></section>
      <section className="py-20 lg:py-28"><div className="mx-auto max-w-6xl px-5 lg:px-8"><h2 className="text-3xl font-black sm:text-5xl">자주 묻는 질문</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{c.faq.map(f => <section key={f.question} className="rounded-[28px] bg-[#faf8ff] p-7"><h3 className="text-xl font-black">{f.question}</h3><p className="mt-4 leading-8 text-black/62">{f.answer}</p></section>)}</div></div></section>
      <section className="bg-[#16072f] py-20 text-white"><div className="mx-auto max-w-6xl px-5 lg:px-8"><h2 className="text-3xl font-black sm:text-5xl">{r.region.eupmyeondong} {r.page.grade} {r.page.subject} 학습 상담</h2><p className="mt-5 max-w-3xl leading-8 text-white/70">실제 학습 기록을 바탕으로 필요한 도움부터 정리합니다.</p><div className="mt-8 flex flex-wrap gap-3"><OpenConsultationButton className={buttonVariants({ size: "lg", className: "bg-white text-black hover:bg-white/90" })}>무료 상담 신청</OpenConsultationButton><Link href="/regions/daejeon" className={buttonVariants({ size: "lg", className: "border-white/30 bg-transparent text-white hover:bg-white/10" })}>대전 지역 보기</Link></div><nav aria-label="관련 학습 안내" className="mt-8 flex flex-wrap gap-4">{related.map(x => <Link key={x.id} href={x.page.url} className="underline">{x.region.eupmyeondong} {x.page.grade} {x.page.subject} 학습 안내</Link>)}</nav></div></section>
    </article>
  </main><SiteFooter /></>;
}
