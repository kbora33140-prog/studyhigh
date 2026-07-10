import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Brain,
  ClipboardCheck,
  GraduationCap,
  House,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Header } from "@/components/Header";
import {
  ConsultationTimeline,
  PremiumCard,
  ReviewCarousel,
  SectionTitle,
  SiteFooter,
} from "@/components/Marketing";
import { MotionSection } from "@/components/MotionSection";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";

const services = [
  {
    id: "tutoring",
    icon: MapPin,
    title: "지역별 1:1 과외",
    description:
      "전국 지역별 방문과외와 화상과외를 아이의 성향, 일정, 목표에 맞춰 설계합니다.",
    href: "/regions",
  },
  {
    id: "ged",
    icon: GraduationCap,
    title: "검정고시",
    description:
      "초졸, 중졸, 고졸 검정고시를 목표 일정과 현재 수준에 맞춰 준비합니다.",
    href: "/ged",
  },
];

const classModes = [
  {
    icon: House,
    title: "방문과외",
    description:
      "선생님이 직접 방문해\n집중도 높은 1:1 수업을 진행합니다.\n\n학습 환경과 생활 리듬을 살피며\n숙제, 복습, 학습 습관까지 관리합니다.",
    points: ["대면 집중 수업", "학습 환경 확인", "밀착 학습관리"],
  },
  {
    icon: Monitor,
    title: "화상과외",
    description:
      "지역 제한 없이 맞는 선생님과\n1:1 화상수업을 진행합니다.\n\n학년과 수준에 맞춘 자료,\n녹화 복습, 수업 외 관리로 흐름을 이어갑니다.",
    points: ["1:1 화상수업", "학년별 맞춤 자료", "녹화 복습"],
  },
];

const strengths = [
  {
    icon: Target,
    title: "학생 성향 분석",
    description:
      "질문 방식, 집중력, 공부 습관, 목표를 함께 분석해 수업의 첫 방향을 정합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "내신·수행평가 대비",
    description:
      "학교별 시험 범위, 수행평가 일정, 발표·보고서·프로젝트까지 체계적으로 관리합니다.",
  },
  {
    icon: Brain,
    title: "공부 습관 설계",
    description:
      "혼자 공부하는 시간까지 이어지도록 숙제, 오답, 복습 루틴을 함께 만듭니다.",
  },
  {
    icon: Bot,
    title: "AI 학습관리",
    description:
      "취약 유형과 성취도를 분석해 필요한 문제와 다음 학습 방향을 추천합니다.",
  },
  {
    icon: ShieldCheck,
    title: "선생님 매칭",
    description:
      "학력과 경력뿐 아니라 학생 성향과 수업 스타일까지 고려해 추천합니다.",
  },
  {
    icon: GraduationCap,
    title: "수능·입시 전략",
    description:
      "현재 수준과 목표 대학을 기준으로 내신, 수능, 입시 학습 로드맵을 설계합니다.",
  },
];

const learningDirections = [
  {
    icon: ClipboardCheck,
    title: "내신대비",
    summary: "학교별 시험 범위와 출제 흐름을 기준으로 관리합니다.",
    detail: "단원별 이해도, 오답 유형, 수행평가 일정을 함께 확인해 시험 기간에 흔들리지 않도록 준비합니다.",
  },
  {
    icon: GraduationCap,
    title: "정시 대비",
    summary: "현재 등급과 목표 대학 사이의 간격을 줄입니다.",
    detail: "개념, 기출, 실전 연습을 단계별로 나누고 장기 학습 루틴까지 설계합니다.",
  },
  {
    icon: Brain,
    title: "학습관리",
    summary: "수업이 없는 날의 공부 흐름까지 이어갑니다.",
    detail: "숙제, 복습, 오답, 다음 수업 준비를 확인해 공부가 끊기지 않도록 관리합니다.",
  },
  {
    icon: Target,
    title: "자기주도학습",
    summary: "혼자 공부할 수 있는 방법을 함께 만듭니다.",
    detail: "계획 세우기, 집중 시간 만들기, 복습 순서 잡기처럼 실제 습관으로 남는 훈련을 진행합니다.",
  },
  {
    icon: Bot,
    title: "AI 학습",
    summary: "학습 데이터를 바탕으로 부족한 부분을 찾습니다.",
    detail: "취약 유형과 성취도를 분석해 다음 수업에서 다룰 문제와 복습 방향을 추천합니다.",
  },
];

const reviews = [
  {
    label: "학부모 상담",
    quote:
      "상담에서 아이 성향과 공부 습관을 먼저 확인해줘서 수업 방향이 명확해졌습니다.",
  },
  {
    label: "학생 변화",
    quote:
      "모르는 부분을 편하게 질문할 수 있어서 수업이 부담스럽지 않고 복습도 쉬워졌어요.",
  },
  {
    label: "학습관리",
    quote:
      "내신 대비와 수행평가 일정을 같이 관리해주니 시험 기간에 무엇을 해야 할지 보였습니다.",
  },
];

const faqs = [
  {
    question: "무료 상담에서는 무엇을 확인하나요?",
    answer:
      "학생의 학년, 현재 학습 수준, 희망 과목, 목표, 수업 방식, 공부 습관을 확인하고 가장 적합한 수업 방향을 안내합니다.",
  },
  {
    question: "수업료는 얼마인가요?",
    answer:
      "학생의 학년,\n현재 학습 수준,\n수업 횟수,\n방문과외 또는 화상과외 여부에 따라 달라집니다.\n\n상담 후 학생에게 가장 적합한 수업 형태와 함께 자세히 안내드립니다.",
  },
  {
    question: "수행평가 대비도 가능한가요?",
    answer:
      "가능합니다.\n\n학교별 수행평가 일정과 유형을 고려하여\n발표,\n보고서,\n프로젝트,\n실험,\n서술형 평가까지\n학생에게 맞춰 체계적으로 준비합니다.",
  },
  {
    question: "검정고시나 코딩도 상담 가능한가요?",
    answer:
      "가능합니다. 검정고시는 합격 전략과 맞춤 커리큘럼을, 코딩은 초등·중등·고등 수준별 AI·SW 교육 방향을 안내합니다.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "스터디하이",
    url: "https://studyhigh.example.com",
    logo: "https://studyhigh.example.com/studyhigh-logo.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "스터디하이",
    url: "https://studyhigh.example.com",
    areaServed: "대한민국",
    description:
      "학생 성향 분석, 선생님 매칭, 내신 대비, 수행평가, 수능 대비, AI 학습관리를 제공하는 프리미엄 교육 플랫폼입니다.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://studyhigh.example.com",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="relative min-h-[760px] overflow-hidden bg-[#0f071f] pt-16 lg:min-h-[860px] lg:pt-20">
          <Image
            src="/hero-background-premium.png"
            alt="한국인 선생님과 학생이 세련된 공간에서 1:1 수업을 하는 모습"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(20,8,47,0.76)_42%,rgba(20,8,47,0.24)_74%,rgba(0,0,0,0.08)_100%)]" />

          <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-center px-5 py-24 lg:min-h-[780px] lg:px-8">
            <div className="max-w-2xl text-white">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-white/60">
                PREMIUM EDUCATION PLATFORM
              </p>
              <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-normal sm:text-6xl lg:text-7xl">
                아이에게 맞는
                <br />
                선생님이
                <br />
                성적을 만듭니다
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
                학생 성향과 공부 습관을 분석해 선생님 매칭부터 학습관리까지
                하나의 흐름으로 설계합니다.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <OpenConsultationButton
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "border border-white bg-transparent px-8 text-white hover:bg-white/10",
                  })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
              </div>
            </div>
          </div>
        </section>

        <MotionSection className="bg-white py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2b105f]">
                SERVICES
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-black sm:text-5xl">
                필요한 교육을
                <br />
                <span className="text-6xl sm:text-7xl">단순하게</span>
                <br />
                선택하세요
              </h2>
              <p className="mt-6 text-lg leading-8 text-black/60">
                과외와 검정고시를 학생의 목표와 현재 상황에 맞춰 상담
                흐름을 정리했습니다.
              </p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-2">
              {services.map((service) => (
                <Link key={service.title} href={service.href} id={service.id}>
                  <PremiumCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    className="bg-[#faf8ff]"
                  />
                </Link>
              ))}
            </div>

            <div className="relative left-1/2 mt-24 -mb-24 w-screen -translate-x-1/2 bg-[#16072f] px-5 pb-28 pt-20 sm:px-8 lg:-mb-36 lg:px-8 lg:pb-36">
              <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">
                  CLASS TYPE
                </p>
                <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
                  수업 방식도
                  <br />
                  아이에게 맞게 선택하세요
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                  <span className="block">
                    학생의 성향, 일정, 지역, 학습 환경을 살펴 방문과외와 화상과외 중
                  </span>
                  <span className="block">더 잘 맞는 방식을 함께 정합니다.</span>
                </p>
              </div>

              <div className="mt-12 grid gap-5 lg:grid-cols-2">
                {classModes.map((mode) => {
                  const Icon = mode.icon;

                  return (
                    <article
                      key={mode.title}
                      className="flex min-h-[360px] flex-col rounded-[28px] bg-white p-7 transition duration-300 hover:-translate-y-1"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3efff] text-[#2b105f]">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </div>
                      <h3 className="mt-8 text-3xl font-black tracking-normal text-black">
                        {mode.title}
                      </h3>
                      <p className="mt-4 whitespace-pre-line leading-8 text-black/58">
                        {mode.description}
                      </p>
                      <ul className="mt-auto grid gap-3 pt-7 sm:grid-cols-3">
                        {mode.points.map((point) => (
                          <li
                            key={point}
                            className="rounded-full bg-[#f6f1ff] px-4 py-3 text-center text-sm font-black text-[#2b105f]"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-white py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2b105f]">
                  STUDY DIRECTION
                </p>
                <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-black sm:text-5xl">
                  수업보다 먼저
                  <br />
                  <span className="text-6xl sm:text-7xl">방향을</span>
                  <br />
                  설계합니다
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
                  스터디하이는 과목만 정하지 않습니다. 학생에게 필요한 목표가 내신인지,
                  정시인지, 학습관리인지 먼저 구분하고 그에 맞는 선생님과 수업 흐름을
                  연결합니다.
                </p>
              </div>

              <div className="grid gap-4">
                {learningDirections.map((direction, index) => {
                  const Icon = direction.icon;

                  return (
                    <article
                      key={direction.title}
                      className="group grid gap-5 rounded-[32px] bg-[#faf8ff] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(35,17,78,0.1)] sm:grid-cols-[72px_1fr] sm:p-7"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#2b105f] shadow-sm shadow-black/5 transition group-hover:bg-[#16072f] group-hover:text-white">
                        <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-black tracking-[0.22em] text-[#6736C8]">
                            0{index + 1}
                          </span>
                          <h3 className="text-2xl font-black text-black">{direction.title}</h3>
                        </div>
                        <p className="mt-3 text-lg font-black leading-7 text-black">
                          {direction.summary}
                        </p>
                        <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-black/58">
                          {direction.detail}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#f7f4ff] py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2b105f]">
                MATCHING SYSTEM
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-black sm:text-5xl">
                좋은 선생님보다 중요한 것은
                <br />
                <span className="text-6xl sm:text-7xl">아이에게</span>
                <br />
                맞는 선생님입니다.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">
                스터디하이는 성적만 보지 않습니다. 학생 성향, 질문 방식, 집중력,
                공부 습관, 목표를 함께 분석해 가장 잘 맞는 선생님과 학습 방향을
                설계합니다.
              </p>
            </div>
            <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {strengths.map((strength) => (
                <PremiumCard
                  key={strength.title}
                  icon={strength.icon}
                  title={strength.title}
                  description={strength.description}
                />
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-white py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2b105f]">
                PROCESS
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-black sm:text-5xl">
                상담부터
                <br />
                <span className="text-6xl sm:text-7xl">학습관리까지</span>
                <br />
                하나의 흐름으로
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">
                상담 신청부터 30분 무료 테스트 수업, 정식 수업 시작까지 학생과
                학부모가 이해하기 쉬운 과정으로 안내합니다.
              </p>
            </div>
            <div className="mt-16">
              <ConsultationTimeline />
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#f7f4ff] py-24 lg:py-36">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle
              eyebrow="PARENT EXPERIENCE"
              title="상담 후 달라지는 학습 경험"
              description="내신 대비, 수행평가, 수능 대비, 학습관리, 학부모 상담까지 한 번의 상담에서 방향을 정리합니다."
            />
            <div className="mt-14">
              <ReviewCarousel reviews={reviews} />
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-white py-24 lg:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <SectionTitle
              eyebrow="FAQ"
              title="자주 묻는 질문"
              description="상담 전에 궁금한 점을 확인하세요. 더 자세한 내용은 학생 상황에 맞춰 안내합니다."
            />
            <Accordion type="single" collapsible className="rounded-[28px] bg-[#faf8ff] px-6">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <span className="whitespace-pre-line">{faq.answer}</span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </MotionSection>

        <section id="contact" className="bg-[#f7f4ff] py-24 pb-40 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 rounded-[36px] bg-[#16072f] p-8 text-white lg:grid-cols-[1fr_0.8fr] lg:items-center lg:p-12">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-white/50">
                  CONSULT
                </p>
                <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal sm:text-5xl">
                  우리 아이에게 맞는
                  <br />
                  수업 방향을 확인하세요
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                  학생 성향, 공부 습관, 목표 과목, 희망 수업 방식을 확인한 뒤
                  가장 적합한 선생님 매칭과 커리큘럼을 안내합니다.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <OpenConsultationButton
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className: "border-white bg-white text-black hover:bg-white/90",
                  })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
                <Link
                  href="http://pf.kakao.com/_xcvMin/chat"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: "kakao", size: "lg" })}
                >
                  <MessageCircle className="h-5 w-5" />
                  카카오 상담
                </Link>
                <Link
                  href="tel:01025189245"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className: "border-white/20 bg-white/10 text-white hover:bg-white/15",
                  })}
                >
                  <Phone className="h-5 w-5" />
                  전화 상담
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
