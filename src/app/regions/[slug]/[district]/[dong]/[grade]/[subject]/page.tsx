import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ConsultationTimeline, SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";
import { getGradeGroup, gradeGroups } from "@/lib/gradeLevels";
import { getLocalSeoArticle } from "@/lib/localSeoArticles";
import { searchRegions } from "@/lib/searchRegions";
import { slugifyKorean, subjects } from "@/lib/regions";

type GradeSubjectPageProps = {
  params: Promise<{
    slug: string;
    district: string;
    dong: string;
    grade: string;
    subject: string;
  }>;
};

function getPageData({
  slug,
  district: districtSlug,
  dong: dongSlug,
  grade: gradeSlug,
  subject: subjectSlug,
}: {
  slug: string;
  district: string;
  dong: string;
  grade: string;
  subject: string;
}) {
  const region = searchRegions.find((item) => item.slug === slug);
  const district = region?.districts.find((item) => item.slug === districtSlug);
  const dong = district?.dongs.find((item) => slugifyKorean(item) === dongSlug);
  const grade = getGradeGroup(gradeSlug);
  const subject = subjects.find((item) => item.slug === subjectSlug);

  if (!region || !district || !dong || !grade || !subject) {
    return null;
  }

  const subjectKeyword = subject.slug === "all" ? "전과목과외" : `${subject.name}과외`;
  const pageKeyword = `${dong} ${grade.name} ${subjectKeyword}`;
  const article = getLocalSeoArticle({
    regionSlug: region.slug,
    districtSlug: district.slug,
    dong,
    gradeSlug: grade.slug,
    subjectSlug: subject.slug,
  });

  return { region, district, dong, grade, subject, subjectKeyword, pageKeyword, article };
}

export function generateStaticParams() {
  const daejeon = searchRegions.find((region) => region.slug === "daejeon");

  if (!daejeon) {
    return [];
  }

  return daejeon.districts.flatMap((district) =>
    district.dongs.flatMap((dong) =>
      gradeGroups.flatMap((grade) =>
        subjects.map((subject) => ({
          slug: daejeon.slug,
          district: district.slug,
          dong: slugifyKorean(dong),
          grade: grade.slug,
          subject: subject.slug,
        })),
      ),
    ),
  );
}

export async function generateMetadata({
  params,
}: GradeSubjectPageProps): Promise<Metadata> {
  const data = getPageData(await params);

  if (!data) {
    return {};
  }

  const { region, district, dong, grade, subject, subjectKeyword, pageKeyword, article } = data;
  const canonical = `/regions/${region.slug}/${district.slug}/${slugifyKorean(dong)}/${grade.slug}/${subject.slug}`;
  const articleImage = article?.image || "/high-school-math-tutoring.png";

  return {
    title: article?.title || `${region.name} ${district.name} ${pageKeyword} | 스터디하이`,
    description:
      article?.metaDescription ||
      `${region.name} ${district.name} ${pageKeyword}를 찾는 학생을 위해 내신대비, 정시 대비, 학습관리, 방문과외와 화상과외를 1:1 맞춤으로 상담합니다.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: article?.title || `${region.name} ${district.name} ${pageKeyword}`,
      description:
        article?.metaDescription ||
        `${dong} ${grade.name} 학생을 위한 ${subjectKeyword} 상담 페이지입니다. 학생 수준과 목표에 맞춰 수업 방향을 제안합니다.`,
      url: canonical,
      type: "article",
      images: [articleImage],
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title || `${dong} ${grade.name} ${subjectKeyword}`,
      description:
        article?.metaDescription ||
        `${dong} ${grade.name} ${subjectKeyword} 1:1 맞춤수업 상담`,
    },
  };
}

export default async function GradeSubjectPage({ params }: GradeSubjectPageProps) {
  const data = getPageData(await params);

  if (!data) {
    notFound();
  }

  const { region, district, dong, grade, subject, subjectKeyword, pageKeyword, article } = data;
  const canonical = `/regions/${region.slug}/${district.slug}/${slugifyKorean(dong)}/${grade.slug}/${subject.slug}`;
  const articleImage = article?.image || "/high-school-math-tutoring.png";
  const articleImageAlt =
    article?.imageAlt || `${region.name} ${district.name} ${dong} ${grade.name} ${subject.name}과외 이미지`;
  const faqItems =
    article?.faq || [
      {
        question: `${dong} ${grade.name} ${subjectKeyword} 상담이 가능한가요?`,
        answer:
          "가능합니다. 학생의 현재 수준, 학교 진도, 목표 성적, 희망 수업 방식을 확인한 뒤 1:1 맞춤수업 방향을 안내합니다.",
      },
      {
        question: "방문과외와 화상과외를 모두 선택할 수 있나요?",
        answer:
          "방문과외는 지역별 선생님 매칭 여부에 따라 진행하며, 화상과외는 전국 어디서나 1:1로 상담할 수 있습니다.",
      },
    ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://studyhigh.example.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "지역별 수업",
        item: "https://studyhigh.example.com/regions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${region.name} ${district.name} ${pageKeyword}`,
        item: `https://studyhigh.example.com${canonical}`,
      },
    ],
  };

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.metaDescription,
        mainEntityOfPage: `https://studyhigh.example.com${canonical}`,
        author: {
          "@type": "Organization",
          name: "스터디하이",
        },
        publisher: {
          "@type": "EducationalOrganization",
          name: "스터디하이",
        },
        about: [`${dong} 고등 수학과외`, "내신대비", "정시 대비", "학습관리", "자기주도학습"],
        areaServed: `${region.name} ${district.name} ${dong}`,
      }
    : null;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `스터디하이 ${dong} ${grade.name} ${subject.name}과외`,
    areaServed: `${region.name} ${district.name} ${dong}`,
    telephone: "010-2518-9245",
    url: `https://studyhigh.example.com${canonical}`,
    description: article?.metaDescription || `${dong} ${grade.name} ${subjectKeyword} 1:1 맞춤수업 상담`,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {articleSchema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <article>
          <section className="bg-[#f7f4ff] py-24 lg:py-32">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_0.86fr] lg:items-center lg:px-8">
              <div>
                <Link href="/regions" className="text-sm font-black text-[#2b105f]">
                  지역별 수업 검색으로 돌아가기
                </Link>
                <h1 className="mt-8 max-w-5xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
                  {article?.title || (
                    <>
                      {region.name} {district.name} {dong}
                      <br />
                      {grade.name} {subjectKeyword}
                    </>
                  )}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-black/65">
                  {article?.lead ||
                    `${dong}에서 ${grade.name} ${subjectKeyword}를 찾는 학생을 위해 현재 수준, 학교 진도, 목표 성적, 공부 습관을 확인하고 맞춤 수업 방향을 제안합니다.`}
                </p>
                {article ? (
                  <ul className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {article.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full bg-white px-4 py-3 text-center text-sm font-black text-[#2b105f] shadow-sm shadow-black/5"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <OpenConsultationButton
                  className={buttonVariants({ size: "lg", className: "mt-10 bg-[#16072f]" })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(43,16,95,0.16)]">
                <Image
                  src={articleImage}
                  alt={articleImageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {article ? (
            <section className="bg-white py-20 lg:py-28">
              <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                    LOCAL SEO GUIDE
                  </p>
                  <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
                    {dong} 고등 수학,
                    <br />
                    수업 방향부터
                    <br />
                    정확히 잡습니다.
                  </h2>
                </div>
                <div className="grid gap-5">
                  {article.sections.map((section) => (
                    <section key={section.heading} className="rounded-[28px] bg-[#faf8ff] p-7">
                      <h3 className="text-2xl font-black text-black">{section.heading}</h3>
                      <p className="mt-4 text-lg leading-8 text-black/62">{section.body}</p>
                    </section>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="bg-white py-20 lg:py-28">
              <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                    LOCAL LESSON
                  </p>
                  <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
                    {dong} 학생에게 맞는
                    <br />
                    {grade.name} {subject.name} 수업
                  </h2>
                </div>
                <div className="space-y-6 text-lg leading-8 text-black/65">
                  <p>
                    {grade.name} {subject.name}은 학생의 현재 이해도와 목표에 따라 수업 방식이
                    달라져야 합니다. 스터디하이는 단순히 선생님을 연결하는 데서 끝나지 않고
                    학생에게 맞는 학습 방향을 함께 설계합니다.
                  </p>
                  <p>
                    내신대비가 필요한 학생은 학교 시험 범위와 출제 유형을 중심으로 관리하고,
                    학습관리가 필요한 학생은 숙제, 오답, 복습 계획까지 함께 점검합니다.
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="bg-[#faf8ff] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                방문과외와 화상과외
              </h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <section className="rounded-[28px] bg-white p-7">
                  <h3 className="text-2xl font-black">방문과외</h3>
                  <p className="mt-4 leading-8 text-black/60">
                    지역별 선생님 매칭이 가능할 경우 직접 방문하는 1:1 수업을 진행합니다.
                    학생의 학습 환경과 생활 패턴까지 고려해 밀착 관리가 가능합니다.
                  </p>
                </section>
                <section className="rounded-[28px] bg-white p-7">
                  <h3 className="text-2xl font-black">화상과외</h3>
                  <p className="mt-4 leading-8 text-black/60">
                    지역 제한 없이 학생에게 맞는 선생님과 1:1로 연결됩니다. 학년별 맞춤 자료,
                    녹화 복습, 수업 없는 날의 학습관리까지 이어갈 수 있습니다.
                  </p>
                </section>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">자주 묻는 질문</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {faqItems.map((faq) => (
                  <section key={faq.question} className="rounded-[28px] bg-[#faf8ff] p-7">
                    <h3 className="text-xl font-black">{faq.question}</h3>
                    <p className="mt-4 leading-8 text-black/60">{faq.answer}</p>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#16072f] py-20 text-white lg:py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                {article?.title || pageKeyword}
                <br />
                무료 상담으로 확인하세요
              </h2>
              <div className="mt-10">
                <OpenConsultationButton
                  className={buttonVariants({
                    size: "lg",
                    className: "bg-white text-black hover:bg-white/90",
                  })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
              </div>
            </div>
          </section>

          <section className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <h2 className="text-3xl font-black tracking-normal sm:text-5xl">상담 과정</h2>
              <div className="mt-12">
                <ConsultationTimeline />
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
