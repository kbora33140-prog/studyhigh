import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";
import { getTutoringArticle, tutoringArticles } from "@/lib/tutoringArticles";

const SITE_URL = "https://studyhigh.co.kr";

type Props = {
  params: Promise<{ city: string; dong: string; subject: string }>;
};

export function generateStaticParams() {
  return tutoringArticles.map(({ city, dong, subject }) => ({ city, dong, subject }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, dong, subject } = await params;
  const article = getTutoringArticle(city, dong, subject);
  if (!article) return {};

  const canonical = `/tutoring/${city}/${dong}/${subject}`;
  return {
    title: article.title,
    description: article.description,
    keywords: [article.keyword, `${article.dongName} 고등 ${article.subjectName}과외`],
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}${canonical}`,
      type: "article",
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function TutoringPage({ params }: Props) {
  const { city, dong, subject } = await params;
  const article = getTutoringArticle(city, dong, subject);
  if (!article) notFound();

  const canonical = `${SITE_URL}/tutoring/${city}/${dong}/${subject}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: article.keyword,
    serviceType: `고등 ${article.subjectName}과외 상담`,
    provider: {
      "@type": "EducationalOrganization",
      name: "StudyHigh",
      url: SITE_URL,
    },
    areaServed: `${article.cityName} ${article.dongName}`,
    description: article.description,
    url: canonical,
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
                  {article.cityName} {article.dongName} · 고등학교 · {article.subjectName}
                </p>
                <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                  {article.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">
                  {article.lead}
                </p>
                <OpenConsultationButton
                  className={buttonVariants({
                    size: "lg",
                    className: "mt-8 bg-[#16072f]",
                  })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-white shadow-[0_24px_80px_rgba(43,16,95,0.16)]">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
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
                {article.keyword}, 무엇을 먼저 확인해야 할까요?
              </h2>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">
                최근 시험과 오답, 사용하는 교재, 가능한 수업 시간과 목표를 먼저
                정리합니다. 학생마다 막히는 지점이 다르므로 상담 후 실제 수업 가능
                지역과 방식, 비용을 확인해야 합니다.
              </p>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                <section className="rounded-[28px] bg-[#faf8ff] p-7">
                  <h3 className="text-2xl font-black">학생이 자주 겪는 어려움</h3>
                  <p className="mt-4 leading-8 text-black/62">{article.concern}</p>
                </section>
                <section className="rounded-[28px] bg-[#16072f] p-7 text-white">
                  <h3 className="text-2xl font-black">학부모가 확인할 부분</h3>
                  <p className="mt-4 leading-8 text-white/70">{article.parentConcern}</p>
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
                  {article.detailTopic}
                </h2>
              </div>
              <div className="space-y-6 text-lg leading-8 text-black/65">
                <p>{article.detailBody}</p>
                <p className="rounded-2xl bg-white p-6 font-bold text-black">
                  실천 방법: {article.method}
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 lg:py-28">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">
              <h2 className="text-3xl font-black sm:text-5xl">자주 묻는 질문</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {article.faq.map((item) => (
                  <section key={item.question} className="rounded-[28px] bg-[#faf8ff] p-7">
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
                {article.keyword} 상담이 필요하신가요?
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-white/70">
                학생의 현재 상태와 목표를 확인한 뒤 필요한 학습 방향과 수업 가능
                여부를 안내합니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <OpenConsultationButton
                  className={buttonVariants({
                    size: "lg",
                    className: "bg-white text-black hover:bg-white/90",
                  })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
                <Link
                  href="/regions/daejeon"
                  className={buttonVariants({
                    size: "lg",
                    className: "border-white/30 bg-transparent text-white hover:bg-white/10",
                  })}
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
