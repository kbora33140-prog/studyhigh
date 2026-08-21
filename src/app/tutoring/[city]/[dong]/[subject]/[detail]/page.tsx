import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";
import {
  getValidatedTestSeoRecord,
  validatedTestSeoRecords,
} from "@/lib/testSeoManifest";

type Props = {
  params: Promise<{ city: string; dong: string; subject: string; detail: string }>;
};

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return validatedTestSeoRecords.map((record) => {
    const [, , city, district, dong, subject] = record.page.url.split("/");
    return { city, dong: district, subject: dong, detail: subject };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, dong: district, subject: dong, detail: subject } = await params;
  const record = getValidatedTestSeoRecord(city, district, dong, subject);
  if (!record) return {};

  return {
    title: { absolute: record.seo.title },
    description: record.seo.description,
    keywords: record.seo.keywords,
    alternates: { canonical: record.seo.canonical },
    openGraph: {
      title: record.seo.ogTitle,
      description: record.seo.ogDescription,
      url: record.seo.canonical,
      type: "website",
      images: [{
        url: record.seo.ogImage,
        width: 1200,
        height: 1200,
        alt: record.image.alt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: record.seo.ogTitle,
      description: record.seo.ogDescription,
      images: [record.seo.ogImage],
    },
  };
}

export default async function ManifestTutoringPage({ params }: Props) {
  const { city, dong: district, subject: dong, detail: subject } = await params;
  const record = getValidatedTestSeoRecord(city, district, dong, subject);
  if (!record) notFound();

  const faqSchema = record.aeo.faqPageSchema;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: record.page.title,
    serviceType: `${record.page.grade} ${record.page.subject}과외 상담`,
    provider: {
      "@type": "EducationalOrganization",
      name: "StudyHigh",
      url: "https://studyhigh.co.kr",
    },
    areaServed: record.geo.region,
    description: record.page.description,
    url: record.page.canonical,
    image: record.image.imageUrl,
  };

  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <article>
          <section className="bg-[#f7f4ff] py-20 lg:py-28">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
              <div>
                <p className="text-sm font-black text-[#6736C8]">
                  {record.region.sido} {record.region.sigungu} · {record.school.schoolName}
                </p>
                <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                  {record.page.title.split(" | ")[0]}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">
                  {record.content.regionIntro.text}
                </p>
                <div className="mt-6 flex flex-wrap gap-2" aria-label="주변 학교 생활권">
                  <span className="rounded-full border border-[#6736C8]/15 bg-white px-3 py-1.5 text-sm font-bold text-black/65">
                    {record.school.schoolName} 생활권
                  </span>
                </div>
                <OpenConsultationButton
                  className={buttonVariants({ size: "lg", className: "mt-8 bg-[#16072f]" })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[30px] bg-white shadow-[0_24px_80px_rgba(43,16,95,0.16)] [container-type:inline-size]">
                <Image
                  src={record.image.imagePath}
                  alt={record.image.alt}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </section>

          <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                QUICK ANSWER
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                {record.image.thumbnailText.eupmyeondong} {record.page.grade} {record.page.subject}과외, 무엇을 먼저 확인해야 할까요?
              </h2>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">
                최근 시험과 오답, 사용하는 교재, 가능한 수업 시간과 목표를 먼저
                정리합니다. 학생마다 막히는 지점이 다르므로 상담 후 실제 수업 가능
                지역과 방식, 비용을 확인해야 합니다.
              </p>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                <section className="rounded-[28px] bg-[#faf8ff] p-7">
                  <h3 className="text-2xl font-black">학생이 자주 겪는 어려움</h3>
                  <p className="mt-4 leading-8 text-black/62">
                    {record.content.learningConcerns[0].text}
                  </p>
                </section>
                <section className="rounded-[28px] bg-[#16072f] p-7 text-white">
                  <h3 className="text-2xl font-black">학부모가 확인할 부분</h3>
                  <p className="mt-4 leading-8 text-white/70">
                    {record.content.consultationType.text}
                  </p>
                </section>
              </div>
            </div>
          </section>

          <section className="bg-[#faf8ff] py-20 lg:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                  STUDY GUIDE
                </p>
                <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                  {record.image.thumbnailText.optionalSchoolOrTopic}
                </h2>
              </div>
              <div className="space-y-6 text-lg leading-8 text-black/65">
                <p>
                  {record.content.examCharacteristics[0].text}
                </p>
                <p className="rounded-2xl bg-white p-6 font-bold text-black">
                  실천 방법: {record.content.studyMethod[0].text}
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                PERSONAL DIAGNOSIS
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black sm:text-5xl">
                같은 {record.region.eupmyeondong} {record.page.grade} 학생이어도 필요한 수업은 다릅니다
              </h2>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">
                {record.geo.localLearningContext.text} 현재 등급만으로 진도를 정하지 않고,
                학교 진도와 최근 풀이 기록을 함께 확인해 학생에게 필요한 순서를 찾습니다.
              </p>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                <section className="rounded-[28px] border border-black/8 p-7">
                  <p className="text-sm font-black text-[#6736C8]">01 · 현재 상태 진단</p>
                  <h3 className="mt-3 text-2xl font-black">어디에서 막히는지 찾기</h3>
                  <p className="mt-4 leading-8 text-black/62">
                    {record.content.learningConcerns[0].text}
                  </p>
                </section>
                <section className="rounded-[28px] border border-black/8 p-7">
                  <p className="text-sm font-black text-[#6736C8]">02 · 내신 대비</p>
                  <h3 className="mt-3 text-2xl font-black">학교 시험 범위에 맞추기</h3>
                  <p className="mt-4 leading-8 text-black/62">
                    {record.content.schoolAnalysis?.text} {record.content.examCharacteristics[0].text}
                  </p>
                </section>
                <section className="rounded-[28px] bg-[#f1ebff] p-7">
                  <p className="text-sm font-black text-[#6736C8]">03 · 부족한 부분 보완</p>
                  <h3 className="mt-3 text-2xl font-black">기초부터 다시 연결하기</h3>
                  <p className="mt-4 leading-8 text-black/62">
                    {record.content.studyMethod[0].text}
                  </p>
                </section>
              </div>

              <div className="mt-10 rounded-[30px] bg-[#16072f] p-8 text-white sm:p-10">
                <h3 className="text-2xl font-black sm:text-3xl">
                  {record.content.learningConcerns[0].text} 상황이라면 수업 방향부터 확인해보세요
                </h3>
                <p className="mt-4 max-w-4xl leading-8 text-white/72">
                  무조건 수업을 권하기보다 현재 공부 방식과 목표, 시험 일정, 가능한
                  수업 시간을 먼저 듣습니다. 상담만으로도 지금 가장 먼저 바꿔야 할
                  학습 우선순위를 정리할 수 있습니다.
                </p>
                <OpenConsultationButton
                  className={buttonVariants({
                    size: "lg",
                    className: "mt-7 bg-white text-black hover:bg-white/90",
                  })}
                >
                  내 상황 무료로 상담하기
                </OpenConsultationButton>
              </div>
            </div>
          </section>

          <section className="bg-[#faf8ff] py-20 lg:py-28">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                CONSULTATION PROCESS
              </p>
              <h2 className="mt-4 text-3xl font-black sm:text-5xl">
                무료상담은 이렇게 진행됩니다
              </h2>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">
                상담 신청을 남기면 학생의 상황을 먼저 확인하고, {record.region.eupmyeondong}에서
                가능한 수업 방식과 {record.page.subject} 학습 방향을 순서대로 안내합니다.
              </p>
              <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  ["상담 신청", "이름, 연락처, 학교와 학년, 희망 과목과 현재 고민을 남깁니다."],
                  ["학생 상황 확인", "현재 성적, 최근 시험, 목표, 공부 습관과 부족한 부분을 구체적으로 확인합니다."],
                  ["수업 방향 제안", `${record.page.subject} 내신 대비와 기초 보완 중 무엇을 우선할지 정리합니다.`],
                  ["선생님·수업 안내", "방문 또는 화상 가능 여부, 일정과 비용을 안내하고 동의 후 수업을 연결합니다."],
                ].map(([title, body], index) => (
                  <li key={title} className="rounded-[26px] bg-white p-7 shadow-sm shadow-black/5">
                    <span className="text-sm font-black text-[#6736C8]">STEP {index + 1}</span>
                    <h3 className="mt-3 text-xl font-black">{title}</h3>
                    <p className="mt-3 leading-7 text-black/60">{body}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-[#6736C8]/20 bg-white p-8 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-2xl font-black">수업을 결정하기 전, 상담부터 받아보세요</h3>
                  <p className="mt-2 leading-7 text-black/60">
                    상담 신청만으로 수업이 확정되지 않습니다. 충분히 안내받은 뒤 결정할 수 있습니다.
                  </p>
                </div>
                <OpenConsultationButton
                  className={buttonVariants({ size: "lg", className: "shrink-0 bg-[#16072f]" })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
              </div>
            </div>
          </section>

          <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <h2 className="text-3xl font-black sm:text-5xl">자주 묻는 질문</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {record.content.faq.map((item) => (
                  <section key={item.id} className="rounded-[28px] bg-[#faf8ff] p-7">
                    <h3 className="text-xl font-black">{item.question}</h3>
                    <p className="mt-4 leading-8 text-black/62">{item.answer}</p>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#16072f] py-20 text-white">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <h2 className="text-3xl font-black sm:text-5xl">
                {record.image.thumbnailText.eupmyeondong} {record.page.grade} {record.page.subject}과외 상담
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-white/70">
                학생의 현재 상태와 학교 진도를 확인한 뒤 필요한 학습 방향과 수업 가능 여부를 안내합니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <OpenConsultationButton
                  className={buttonVariants({ size: "lg", className: "bg-white text-black hover:bg-white/90" })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
                <Link
                  href="/regions/daejeon"
                  className={buttonVariants({ size: "lg", className: "border-white/30 bg-transparent text-white hover:bg-white/10" })}
                >
                  대전 지역 보기
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
