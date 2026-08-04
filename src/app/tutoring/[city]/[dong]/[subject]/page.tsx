import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";
import { getSeoThumbnailUrl } from "@/lib/seoThumbnail";
import { getTutoringArticle, tutoringArticles } from "@/lib/tutoringArticles";

const SITE_URL = "https://studyhigh.co.kr";

type Props = {
  params: Promise<{ city: string; dong: string; subject: string }>;
};

export function generateStaticParams() {
  return tutoringArticles.map(({ city, dong, subject }) => ({ city, dong, subject }));
}

const subjectPlans = {
  math: {
    diagnosis: "개념 이해, 조건 해석, 계산 정확도, 문제 접근 순서와 시간 관리를 나누어 확인합니다.",
    exam: "교과서와 학교 프린트, 부교재, 최근 시험지를 기준으로 출제 범위를 정리하고 자주 틀리는 유형부터 다시 풉니다.",
    recovery: "공식을 외웠지만 적용하지 못하는 단원은 선수 개념으로 돌아가 설명과 기본 문제를 연결한 뒤 변형 문제로 확장합니다.",
  },
  english: {
    diagnosis: "어휘량, 문장 구조 해석, 지문 이해, 어법 판단과 제한 시간 안의 문제 해결력을 나누어 확인합니다.",
    exam: "학교 교과서와 부교재 본문, 프린트의 핵심 문장과 변형 가능 부분을 정리하고 서술형까지 단계적으로 대비합니다.",
    recovery: "단어를 외워도 해석이 막힌다면 문장의 주어와 동사부터 찾고, 긴 문장을 의미 단위로 나누는 훈련으로 기초를 채웁니다.",
  },
  korean: {
    diagnosis: "지문 독해, 선지 판단 근거, 문학 개념, 어휘와 서술형 답안 구성을 영역별로 확인합니다.",
    exam: "교과서 작품과 수업 필기, 학교 프린트를 한 흐름으로 묶고 표현법과 핵심 근거를 변형 문제에 적용합니다.",
    recovery: "문제를 많이 풀어도 점수가 오르지 않는다면 지문의 근거를 표시하고 오답 선지가 틀린 이유를 설명하는 연습부터 시작합니다.",
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, dong, subject } = await params;
  const article = getTutoringArticle(city, dong, subject);
  if (!article) return {};

  const canonical = `/tutoring/${city}/${dong}/${subject}`;
  const thumbnail = getSeoThumbnailUrl({
    dongSlug: dong,
    dongName: article.dongName,
    gradeSlug: "high",
    gradeName: "고등",
    subjectSlug: subject,
    subjectName: article.subjectName,
    seed: canonical,
  });
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
      images: [{ url: thumbnail, width: 1200, height: 1200, alt: article.keyword }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [thumbnail],
    },
  };
}

export default async function TutoringPage({ params }: Props) {
  const { city, dong, subject } = await params;
  const article = getTutoringArticle(city, dong, subject);
  if (!article) notFound();
  const plan = subjectPlans[article.subject as keyof typeof subjectPlans];

  const canonical = `${SITE_URL}/tutoring/${city}/${dong}/${subject}`;
  const thumbnail = getSeoThumbnailUrl({
    dongSlug: dong,
    dongName: article.dongName,
    gradeSlug: "high",
    gradeName: "고등",
    subjectSlug: subject,
    subjectName: article.subjectName,
    seed: canonical,
  });
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
    image: thumbnail,
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
                {article.nearbySchools?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2" aria-label="주변 학교 생활권">
                    {article.nearbySchools.map((school) => (
                      <span
                        key={school}
                        className="rounded-full border border-[#6736C8]/15 bg-white px-3 py-1.5 text-sm font-bold text-black/65"
                      >
                        {school} 생활권
                      </span>
                    ))}
                  </div>
                ) : null}
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
                  src={thumbnail.replace(SITE_URL, "")}
                  alt={`${article.keyword} 공식 썸네일`}
                  fill
                  priority
                  unoptimized
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
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                PERSONAL DIAGNOSIS
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black sm:text-5xl">
                같은 {article.dongName} 고등학생이어도 필요한 수업은 다릅니다
              </h2>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-black/65">
                현재 등급만 보고 진도를 정하지 않습니다. 최근 시험에서 왜 틀렸는지,
                어느 단원부터 이해가 끊겼는지, 혼자 공부할 때 무엇을 미루는지까지
                확인해야 실제로 성적을 바꿀 수 있는 수업 방향이 나옵니다. 학생의 상황이
                먼저이고 교재와 진도는 그다음입니다.
              </p>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                <section className="rounded-[28px] border border-black/8 p-7">
                  <p className="text-sm font-black text-[#6736C8]">01 · 현재 상태 진단</p>
                  <h3 className="mt-3 text-2xl font-black">어디에서 막히는지 찾기</h3>
                  <p className="mt-4 leading-8 text-black/62">{plan.diagnosis}</p>
                </section>
                <section className="rounded-[28px] border border-black/8 p-7">
                  <p className="text-sm font-black text-[#6736C8]">02 · 내신 대비</p>
                  <h3 className="mt-3 text-2xl font-black">학교 시험 범위에 맞추기</h3>
                  <p className="mt-4 leading-8 text-black/62">{plan.exam}</p>
                </section>
                <section className="rounded-[28px] bg-[#f1ebff] p-7">
                  <p className="text-sm font-black text-[#6736C8]">03 · 부족한 부분 보완</p>
                  <h3 className="mt-3 text-2xl font-black">기초부터 다시 연결하기</h3>
                  <p className="mt-4 leading-8 text-black/62">{plan.recovery}</p>
                </section>
              </div>

              <div className="mt-10 rounded-[30px] bg-[#16072f] p-8 text-white sm:p-10">
                <h3 className="text-2xl font-black sm:text-3xl">
                  {article.concern}이라면 수업 방향부터 확인해보세요
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
                상담 신청을 남기면 학생의 상황을 먼저 확인하고, {article.dongName}에서
                가능한 수업 방식과 {article.subjectName} 학습 방향을 순서대로 안내합니다.
              </p>
              <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  ["상담 신청", "이름, 연락처, 학교와 학년, 희망 과목과 현재 고민을 남깁니다."],
                  ["학생 상황 확인", "현재 성적, 최근 시험, 목표, 공부 습관과 부족한 부분을 구체적으로 확인합니다."],
                  ["수업 방향 제안", `${article.subjectName} 내신 대비와 기초 보완 중 무엇을 우선할지 정리합니다.`],
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
