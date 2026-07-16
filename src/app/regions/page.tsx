import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Bot,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Route,
  School,
  Search,
  Target,
} from "lucide-react";
import { Header } from "@/components/Header";
import { ConsultationTimeline } from "@/components/Marketing";
import { MotionSection } from "@/components/MotionSection";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { RegionLessonSearchForm } from "@/components/RegionLessonSearchForm";
import { RegionLessonSearchResults } from "@/components/RegionLessonSearchResults";
import { regions } from "@/lib/regions";
import { searchRegions } from "@/lib/searchRegions";

const strengths = [
  {
    icon: School,
    title: "학교별 내신 대비",
    description:
      "학교 시험 범위와 출제 경향을 반영해\n국어, 수학, 영어, 과학, 사회를\n맞춤 관리합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "수행평가 관리",
    description:
      "발표, 보고서, 프로젝트, 서술형 평가까지\n일정에 맞춰 체계적으로 준비합니다.",
  },
  {
    icon: Target,
    title: "학년별 학습 설계",
    description:
      "초등과외, 중등과외, 고등과외에 맞는\n학습 습관과 목표를 단계별로 잡아줍니다.",
  },
  {
    icon: BookOpen,
    title: "전과목 1:1 맞춤수업",
    description:
      "수학과외, 영어과외, 국어과외,\n과학과외, 사회과외, 한국사까지\n필요한 과목을 선택합니다.",
  },
  {
    icon: CheckCircle2,
    title: "방문과외와 화상과외",
    description:
      "지역별 선생님 매칭이 가능한 방문수업과\n전국 어디서나 가능한 화상수업을\n함께 운영합니다.",
  },
  {
    icon: GraduationCap,
    title: "입시와 검정고시",
    description:
      "정시대비, 검정고시과외,\n취약 단원 보완까지\n학생의 목표에 맞춰 방향을 정합니다.",
  },
];

const directionHighlights = [
  {
    icon: ClipboardCheck,
    title: "내신대비",
    text: "학교별 시험 범위와 출제 경향을 기준으로 과목별 학습 우선순위를 정합니다.",
  },
  {
    icon: GraduationCap,
    title: "정시 대비",
    text: "현재 등급과 목표 대학을 바탕으로 개념, 기출, 실전 연습의 순서를 설계합니다.",
  },
  {
    icon: Brain,
    title: "학습관리",
    text: "수업이 없는 날에도 숙제, 복습, 오답, 학습 계획이 이어지도록 관리합니다.",
  },
  {
    icon: Target,
    title: "자기주도학습",
    text: "혼자 공부하는 시간에 무엇을 어떻게 해야 하는지 습관 중심으로 잡아줍니다.",
  },
  {
    icon: Bot,
    title: "AI 학습",
    text: "취약 유형과 성취도를 분석해 다음 수업과 복습 방향을 더 정확하게 제안합니다.",
  },
];

export const metadata: Metadata = {
  title: "지역별 수업 | 시군구·학교·학년·과목별 1:1 맞춤 과외",
  description:
    "스터디하이 지역별 수업 검색. 시·군·구, 동·면·읍, 학년, 학교, 희망 과목, 요청사항 기준으로 방문과외와 화상과외를 찾고 1:1 맞춤수업 상담을 신청하세요.",
  alternates: {
    canonical: "/regions",
  },
  openGraph: {
    title: "스터디하이 지역별 수업",
    description:
      "전국 지역별 방문과외와 화상과외를 시군구, 동면읍, 학교, 학년, 희망 과목, 요청사항 기준으로 찾는 1:1 맞춤수업 페이지입니다.",
    url: "/regions",
    type: "website",
  },
};

export default function RegionsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "스터디하이 지역별 수업",
    itemListElement: regions.map((region, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${region.name} 지역별 수업`,
      url: `https://studyhigh.example.com/regions/${region.slug}`,
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="bg-white text-black">
        <MotionSection className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:pt-20 lg:px-8 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#6736C8]">
                REGIONAL CLASS SEARCH
              </p>
              <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-normal text-black sm:text-5xl lg:text-[3.55rem]">
                지역별 수업을
                <br />
                <span className="whitespace-nowrap">원하는 조건에 맞게</span>
                <br />
                찾으세요.
              </h1>
              <p className="mt-7 text-lg font-medium leading-8 text-black/68">
                <span className="block">
                  방문과외와 화상과외를
                </span>
                <span className="block">
                  지역, 학교, 학년, 과목에 맞춰 연결합니다.
                </span>
              </p>
              <p className="mt-5 text-base leading-7 text-black/58">
                <span className="block">
                  내신대비, 검정고시, 학습관리까지
                </span>
                <span className="block">
                  1:1로 상담합니다.
                </span>
              </p>
            </div>

            <section
              aria-labelledby="search-heading"
              className="rounded-[2rem] bg-[#f6f1ff] p-4 shadow-[0_24px_70px_rgba(37,18,84,0.12)] sm:p-6"
            >
              <div className="rounded-[1.55rem] bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6736C8] text-white">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 id="search-heading" className="text-xl font-black text-black">
                      지역별 수업 검색
                    </h2>
                    <p className="mt-1 text-sm font-medium text-black/55">
                      학교와 학년만 입력해도 상담 후보를 확인할 수 있습니다.
                    </p>
                  </div>
                </div>

                <RegionLessonSearchForm regions={searchRegions} />
                <Suspense fallback={null}>
                  <RegionLessonSearchResults regions={searchRegions} />
                </Suspense>
              </div>
            </section>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#16072f] px-5 py-20 text-white lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">
                  STUDY DIRECTION
                </p>
                <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
                  지역을 찾은 다음,
                  <br />
                  <span className="text-white">수업 방향을</span>
                  <br />
                  정확히 정합니다.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
                  같은 수학과외라도 학생에게 필요한 방향은 다릅니다. 스터디하이는 상담에서
                  목표와 습관을 먼저 확인하고, 학생에게 맞는 수업 방향을 제안합니다.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {directionHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="group min-h-52 rounded-[28px] bg-white/8 p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white hover:text-black"
                    >
                      <Icon className="h-7 w-7 text-white/80 group-hover:text-[#2b105f]" aria-hidden="true" />
                      <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                      <p className="mt-4 text-base font-medium leading-7 text-white/62 transition group-hover:text-black/58">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-white px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                  WHY STUDYHIGH
                </p>
                <h2 className="mt-5 text-3xl font-black leading-tight text-black sm:text-5xl">
                  조건 검색 이후,
                  <br />
                  <span className="whitespace-nowrap">학습 방향까지</span>
                  <br />
                  설계합니다.
                </h2>
                <p className="mt-6 text-lg leading-8 text-black/62">
                  <span className="block">
                    스터디하이는 단순히 지역 선생님을
                  </span>
                  <span className="block">
                    연결하는 데서 끝나지 않습니다.
                  </span>
                  <span className="block">
                    학생의 성향, 공부 습관, 학교 진도, 목표 성적을
                  </span>
                  <span className="block">
                    함께 분석해
                  </span>
                  <span className="block">
                    가장 적합한 수업 방식을 제안합니다.
                  </span>
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {strengths.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="min-h-56 rounded-[1.5rem] bg-[#faf8ff] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_60px_rgba(30,20,55,0.1)]"
                    >
                      <Icon className="h-7 w-7 text-[#6736C8]" aria-hidden="true" />
                      <h3 className="mt-6 text-xl font-black text-black">{item.title}</h3>
                      <p className="mt-3 whitespace-pre-line text-base font-medium leading-7 text-black/58">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </MotionSection>

        <section className="bg-[#faf8ff] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">
                CONSULTING PROCESS
              </p>
              <h2 className="mt-5 text-3xl font-black leading-tight text-black sm:text-5xl">
                상담 과정
              </h2>
              <p className="mt-5 text-lg leading-8 text-black/62">
                지역, 학교, 학년, 희망 과목, 요청사항을 확인한 뒤 학생에게 맞는 선생님과 수업 방향을 차근차근 연결합니다.
              </p>
            </div>
            <ConsultationTimeline />
          </div>
        </section>

        <section className="bg-black px-5 py-16 text-white lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Route className="h-8 w-8 text-white/70" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                우리 지역, 우리 학교에 맞는
                <br />
                수업을 찾아보세요.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/62">
                무료 상담에서 학생의 현재 상황을 확인하고 방문과외 또는 화상과외 중 적합한 방식을 안내합니다.
              </p>
            </div>
            <OpenConsultationButton
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-base font-black text-black transition hover:-translate-y-0.5"
            >
              무료 상담 신청
            </OpenConsultationButton>
          </div>
        </section>
      </main>
    </>
  );
}
