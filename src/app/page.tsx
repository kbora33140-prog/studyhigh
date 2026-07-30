import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Brain,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
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

const statsBarItems = [
  {
    title: "전문교사",
    value: "3,000명",
    label: "검증된 선생님 풀",
    icon: UserCheck,
  },
  {
    title: "교사 경력",
    value: "30년+",
    label: "누적 교육 운영 경험",
    icon: GraduationCap,
  },
  {
    title: "수업 만족도",
    value: "97.8%",
    label: "학생·학부모 피드백 기준",
    icon: ShieldCheck,
  },
  {
    title: "무료 테스트",
    value: "100%",
    label: "맞춤 선생님 추천",
    icon: Sparkles,
  },
];

const heroMetrics = [
  {
    label: "성향 진단",
    value: "98.6%",
    caption: "아이 성향 분석 만족",
    icon: Brain,
    tone: "bg-[#ede9fe] text-[#7c3aed]",
  },
  {
    label: "학습관리",
    value: "96.9%",
    caption: "숙제·오답 관리 만족",
    icon: ClipboardCheck,
    tone: "bg-[#e0f2fe] text-[#0284c7]",
  },
  {
    label: "상담 만족",
    value: "98.4%",
    caption: "학부모 상담 피드백",
    icon: MessageCircle,
    tone: "bg-[#dcfce7] text-[#16a34a]",
  },
  {
    label: "수업 피드백",
    value: "97.5%",
    caption: "수업 후 관리 만족",
    icon: Sparkles,
    tone: "bg-[#fce7f3] text-[#db2777]",
  },
];

const classPrograms = [
  {
    id: "tutoring",
    icon: HeartHandshake,
    title: "성향 맞춤 1:1 과외",
    description:
      "아이의 질문 방식, 집중 시간, 이해 속도를 먼저 확인하고 잘 맞는 선생님과 수업 방식을 설계합니다.",
  },
  {
    id: "direction",
    icon: Target,
    title: "수업 방향 설계",
    description:
      "지금 필요한 것이 개념 보완인지, 내신 대비인지, 공부 습관인지 구분해 첫 달 학습 방향을 명확히 잡습니다.",
  },
  {
    id: "ged",
    icon: GraduationCap,
    title: "검정고시·입시 관리",
    description:
      "목표 일정과 현재 수준에 맞춰 과목별 우선순위, 주간 학습량, 피드백 방식을 함께 관리합니다.",
  },
];

const strengths = [
  {
    icon: Brain,
    title: "아이 성향을 먼저 봅니다",
    description:
      "성적표보다 먼저 질문을 어려워하는지, 반복 설명이 필요한지, 칭찬과 기준 중 무엇에 반응하는지 살핍니다.",
  },
  {
    icon: UserCheck,
    title: "맞는 선생님을 연결합니다",
    description:
      "학력과 경력만 보지 않고 학생의 말투, 속도, 긴장도, 선호하는 설명 방식까지 고려해 추천합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "수업 방향을 기록합니다",
    description:
      "상담에서 정한 우선순위를 수업 목표로 옮기고, 매주 무엇이 좋아졌는지 다음 과제는 무엇인지 공유합니다.",
  },
  {
    icon: BookOpenCheck,
    title: "내신과 습관을 같이 봅니다",
    description:
      "시험 범위와 수행평가뿐 아니라 숙제, 오답, 복습 루틴까지 이어져야 성적 변화가 안정적으로 납니다.",
  },
  {
    icon: BarChart3,
    title: "데이터로 보완점을 찾습니다",
    description:
      "막연히 열심히 하라는 말 대신 취약 단원, 반복 실수, 학습량을 확인해 다음 수업에 반영합니다.",
  },
  {
    icon: ShieldCheck,
    title: "변경과 조정이 가능합니다",
    description:
      "체험 수업 후 호흡이 맞지 않거나 목표가 바뀌면 상담을 통해 선생님과 수업 방향을 다시 조정합니다.",
  },
];

const learningDirections = [
  {
    icon: Brain,
    title: "성향 진단",
    summary: "아이에게 맞는 수업 언어를 찾습니다.",
    detail:
      "긴 설명보다 예시가 필요한지, 질문을 먼저 열어줘야 하는지, 반복 학습이 필요한지 확인합니다.",
  },
  {
    icon: Target,
    title: "목표 설계",
    summary: "지금 가장 먼저 바꿀 한 가지를 정합니다.",
    detail:
      "성적, 습관, 자신감 중 우선순위를 정하고 첫 4주 동안 확인할 변화를 구체화합니다.",
  },
  {
    icon: HeartHandshake,
    title: "선생님 매칭",
    summary: "아이와 잘 맞는 설명 방식을 연결합니다.",
    detail:
      "차분한 관리형, 에너지 있는 동기부여형, 꼼꼼한 오답형처럼 아이에게 맞는 스타일을 추천합니다.",
  },
  {
    icon: ClipboardCheck,
    title: "피드백 관리",
    summary: "수업 후 다음 행동까지 남깁니다.",
    detail:
      "오늘 배운 내용, 어려웠던 부분, 다음 수업 전 해야 할 복습을 학부모가 알 수 있게 정리합니다.",
  },
];

const reviews = [
  {
    label: "아이 성향 진단 결과",
    student: "중2 김○○",
    result: "질문형 · 반복 확인형",
    quote:
      "질문을 못 하던 학생이라 선생님이 먼저 확인 질문을 여는 방식으로 바꿨고, 3주 뒤 오답 질문 횟수가 2배 늘었습니다.",
  },
  {
    label: "수업 변화",
    student: "초6 박○○",
    result: "산만형 · 짧은 집중형",
    quote:
      "40분을 버티기 어려워해 15분 설명, 5분 확인 문제 루틴으로 조정했습니다. 숙제 완료율이 54%에서 91%로 올랐습니다.",
  },
  {
    label: "학습관리",
    student: "고1 이○○",
    result: "계획 부족형",
    quote:
      "수업 없는 날 복습 체크표를 만들고 오답을 다음 수업 첫 10분에 확인했습니다. 중간고사 전 과목별 루틴이 잡혔습니다.",
  },
  {
    label: "성적 상승",
    student: "중3 최○○",
    result: "개념 누락형",
    quote:
      "수학 함수 단원에서 막히는 원인을 다시 진단해 중1 비례식부터 보완했습니다. 6주 뒤 단원평가가 62점에서 86점으로 올랐습니다.",
  },
  {
    label: "좋은 대학 입학",
    student: "고3 정○○",
    result: "실전 불안형",
    quote:
      "문제는 풀지만 시험장에서 흔들려 시간 배분 훈련을 넣었습니다. 모의고사 풀이 순서를 고정하고 목표 대학 합격까지 이어졌습니다.",
  },
  {
    label: "영어 내신",
    student: "중2 윤○○",
    result: "암기 부담형",
    quote:
      "본문 암기를 무작정 시키지 않고 문장 구조와 핵심 표현을 먼저 정리했습니다. 수행평가 발표까지 연결해 자신감이 생겼습니다.",
  },
  {
    label: "자기주도학습",
    student: "초5 한○○",
    result: "칭찬 반응형",
    quote:
      "작은 성공을 바로 표시하는 방식으로 바꾸자 스스로 문제를 고르는 시간이 늘었습니다. 학부모 피드백도 주 1회로 정리했습니다.",
  },
  {
    label: "검정고시 준비",
    student: "성인 학습자",
    result: "기초 재정리형",
    quote:
      "오래 쉬었던 학습자라 과목별 기초 단원을 먼저 압축했습니다. 매주 통과 기준을 정해 부담을 줄이고 꾸준히 이어갔습니다.",
  },
  {
    label: "수업 피드백",
    student: "고2 강○○",
    result: "피드백 민감형",
    quote:
      "틀린 문제를 지적하기보다 고친 과정을 먼저 짚어줬습니다. 수업 후 피드백을 짧고 구체적으로 바꾸자 참여도가 좋아졌습니다.",
  },
  {
    label: "학부모 상담",
    student: "중1 서○○",
    result: "환경 영향형",
    quote:
      "아이 문제가 아니라 공부 환경과 시간대가 맞지 않는다는 점을 확인했습니다. 저녁 수업으로 바꾸고 집중 시간이 안정됐습니다.",
  },
];

const faqs = [
  {
    question: "무료 상담에서는 무엇을 확인하나요?",
    answer:
      "학생의 학년, 과목, 현재 수준, 공부 습관, 질문 방식, 수업에서 어려웠던 경험을 확인합니다. 그 내용을 바탕으로 아이에게 맞는 선생님 스타일과 첫 수업 방향을 안내합니다.",
  },
  {
    question: "선생님은 어떻게 매칭되나요?",
    answer:
      "과목과 일정뿐 아니라 아이의 성향, 집중 패턴, 설명 선호도, 목표를 함께 봅니다. 체험 수업 후 호흡이 맞지 않으면 상담을 통해 다시 조정할 수 있습니다.",
  },
  {
    question: "수업 방향은 언제 정해지나요?",
    answer:
      "상담에서 큰 방향을 정하고, 첫 수업과 초기 피드백을 통해 더 구체화합니다. 내신 대비, 개념 보완, 자기주도학습, 수행평가 등 필요한 우선순위를 함께 정합니다.",
  },
  {
    question: "방문수업과 화상수업 모두 가능한가요?",
    answer:
      "가능합니다. 다만 홈에서는 지역 검색보다 아이에게 맞는 수업 방향과 선생님 매칭을 먼저 안내합니다. 상담 후 학생 상황에 맞춰 방문 또는 화상 방식을 제안합니다.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "스터디하이",
    url: "https://studyhigh.co.kr",
    logo: "https://studyhigh.co.kr/studyhigh-logo.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "스터디하이",
    url: "https://studyhigh.co.kr",
    areaServed: "대한민국",
    description:
      "학생 성향 분석을 바탕으로 수업 방향과 선생님 매칭을 설계하는 프리미엄 1:1 맞춤 교육 브랜드입니다.",
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
      <main className="bg-[#f4efff] text-[#0f172a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="relative overflow-hidden bg-[#f4efff]">
          <div className="mx-auto grid min-h-[720px] max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:py-28">
            <div className="relative z-10">
              <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#7c3aed]">
                <span className="h-px w-9 bg-[#7c3aed]" />
                Studyhigh Matching
              </p>
              <h1 className="mt-7 text-4xl font-black leading-[1.08] text-[#0f172a] sm:text-6xl lg:text-7xl">
                아이의 성향을 알아야
                <br />
                <span className="text-[#7c3aed]">좋은 선생님</span>을
                <br />
                만날 수 있습니다
              </h1>
              <p className="mt-7 max-w-xl text-base font-medium leading-8 text-[#475569] sm:text-lg">
                스터디하이는 과목부터 고르지 않습니다. 아이가 어떤 방식으로 이해하고,
                어디서 막히고, 어떤 선생님에게 마음을 여는지 먼저 확인합니다.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <OpenConsultationButton
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "bg-[#7c3aed] px-8 text-white shadow-xl shadow-[#7c3aed]/20 hover:bg-[#6d28d9]",
                  })}
                >
                  무료 상담 신청
                </OpenConsultationButton>
                <Link
                  href="#direction"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className:
                      "border-[#d8c8ff] bg-white text-[#0f172a] hover:bg-white/80",
                  })}
                >
                  수업 방향 보기
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative z-10">
              <div className="rounded-[8px] border border-white/70 bg-white/72 p-4 shadow-[0_34px_100px_rgba(79,70,229,0.16)] backdrop-blur sm:p-5">
                <div className="rounded-[8px] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#7c3aed]">
                        Satisfaction Report
                      </p>
                      <h2 className="mt-2 text-2xl font-black leading-tight text-[#0f172a]">
                        상담부터 수업 피드백까지
                        <br />
                        숫자로 확인하는 만족도
                      </h2>
                    </div>
                    <p className="text-sm font-bold text-[#94a3b8]">실제 상담·수업 관리 기준</p>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {heroMetrics.map((metric) => {
                      const Icon = metric.icon;

                      return (
                        <div
                          key={metric.label}
                          className="rounded-[8px] border border-[#edf0f7] bg-[#fbfcff] p-5 text-center shadow-[0_14px_38px_rgba(15,23,42,0.05)]"
                        >
                          <div
                            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] ${metric.tone}`}
                          >
                            <Icon className="h-7 w-7" strokeWidth={2.1} aria-hidden="true" />
                          </div>
                          <p className="mt-5 text-3xl font-black leading-none text-[#0f172a]">
                            {metric.value}
                          </p>
                          <p className="mt-3 text-sm font-black text-[#0f172a]">
                            {metric.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[#94a3b8]">
                            {metric.caption}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 space-y-4 rounded-[8px] bg-[#fbf8ff] p-5">
                  {[
                    ["맞춤 선생님 재신청률", "94%"],
                    ["학부모 피드백 확인율", "97%"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-sm font-black">
                        <span>{label}</span>
                        <span className="text-[#7c3aed]">{value}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf0f4]">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#7c3aed,#a78bfa)]"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4efff] px-5 py-10 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[24px] bg-white px-6 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-12">
            <div className="grid gap-0 md:grid-cols-4">
              {statsBarItems.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className={`flex items-start gap-4 py-5 md:px-8 md:py-3 ${
                      index === 0 ? "md:pl-0" : "border-t border-[#eef0f5] md:border-l md:border-t-0"
                    } ${index === statsBarItems.length - 1 ? "md:pr-0" : ""}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#f4f0ff] text-[#7c3aed]">
                      <Icon className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#64748b]">{stat.title}</p>
                      <p className="mt-2 text-3xl font-black leading-none tracking-normal text-[#0f172a] sm:text-4xl">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm font-bold leading-5 text-[#94a3b8]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <MotionSection className="bg-white py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle
              eyebrow="Our Strength"
              title="성적보다 먼저, 아이를 이해합니다"
              description="좋은 수업은 좋은 선생님만으로 완성되지 않습니다. 아이의 성향과 수업 방향이 맞아야 오래 이어지고, 변화가 쌓입니다."
            />
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                ["01", "성향 분석", "질문 방식과 집중 패턴 확인"],
                ["02", "방향 설계", "첫 4주 학습 우선순위 설정"],
                ["03", "선생님 매칭", "아이에게 맞는 설명 스타일 연결"],
              ].map(([number, title, description]) => (
                <article key={title} className="rounded-[8px] bg-[#f8f5ff] p-7">
                  <p className="text-sm font-black text-[#7c3aed]">{number}</p>
                  <h3 className="mt-5 text-2xl font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 leading-7 text-[#64748b]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection id="tutoring" className="bg-[#f4efff] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <SectionTitle
                eyebrow="Class Program"
                title="홈에서는 지역보다, 아이에게 맞는 수업을 먼저 보여드립니다"
                description="지역별 과외 검색은 홈에서 제외하고, 상담과 진단을 통해 아이에게 필요한 수업 방향을 먼저 안내합니다."
              />
              <p className="text-base font-medium leading-8 text-[#64748b] lg:justify-self-end">
                방문수업과 화상수업은 상담 후 상황에 맞게 안내합니다. 핵심은 어디서
                배우느냐보다 어떤 방향으로, 어떤 선생님과 시작하느냐입니다.
              </p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {classPrograms.map((program) => (
                <PremiumCard
                  key={program.title}
                  icon={program.icon}
                  title={program.title}
                  description={program.description}
                  className="rounded-[8px] border border-[#e5d8ff] bg-white"
                />
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection id="direction" className="bg-white py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#7c3aed]">
                  Study Direction
                </p>
                <h2 className="mt-5 text-4xl font-black leading-[1.12] text-[#0f172a] sm:text-6xl">
                  수업 방향은
                  <br />
                  <span className="text-[#7c3aed]">아이의 성향</span>에서 시작됩니다
                </h2>
              </div>
              <p className="max-w-2xl text-base font-medium leading-8 text-[#64748b]">
                같은 과목이어도 아이마다 막히는 이유는 다릅니다. 그래서 스터디하이는
                성향을 먼저 보고, 그 다음에 과목과 진도, 선생님 스타일을 맞춥니다.
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {learningDirections.map((direction, index) => {
                const Icon = direction.icon;

                return (
                  <article
                    key={direction.title}
                    className="rounded-[8px] border border-[#e5d8ff] bg-[#fbf8ff] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(124,58,237,0.12)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#7c3aed] shadow-sm">
                        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <span className="text-sm font-black tracking-[0.18em] text-[#a78bfa]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-7 text-2xl font-black text-[#0f172a]">
                      {direction.title}
                    </h3>
                    <p className="mt-3 text-lg font-black leading-7 text-[#0f172a]">
                      {direction.summary}
                    </p>
                    <p className="mt-3 text-base font-medium leading-7 text-[#64748b]">
                      {direction.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#f4efff] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#7c3aed]">
                Matching System
              </p>
              <h2 className="mt-5 text-4xl font-black leading-[1.12] text-[#0f172a] sm:text-6xl">
                좋은 선생님을 넘어
                <br />
                <span className="text-[#7c3aed]">아이와 맞는 선생님</span>으로
              </h2>
              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#64748b]">
                선생님의 실력은 기본입니다. 아이가 질문할 수 있고, 설명을 받아들이고,
                다시 해볼 마음이 생기는 관계를 만드는 것이 더 중요합니다.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {strengths.map((strength) => (
                <PremiumCard
                  key={strength.title}
                  icon={strength.icon}
                  title={strength.title}
                  description={strength.description}
                  className="rounded-[8px] border border-[#e5d8ff] bg-white"
                />
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-white py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#7c3aed]">
                Process
              </p>
              <h2 className="mt-5 text-4xl font-black leading-[1.12] text-[#0f172a] sm:text-6xl">
                상담 한 번으로 끝내지 않고
                <br />
                <span className="text-[#7c3aed]">수업과 피드백</span>까지 이어갑니다
              </h2>
              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#64748b]">
                무료 상담, 성향 진단, 선생님 매칭, 체험 수업, 정식 수업과 피드백까지
                학부모가 다음 단계를 알 수 있게 안내합니다.
              </p>
            </div>
            <div className="mt-16">
              <ConsultationTimeline />
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#f4efff] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle
              eyebrow="Real Student Cases"
              title="스터디하이를 만나고 달라진 실제 사례"
              description="성향 진단, 수업 변화, 학습관리, 성적 상승, 입시 결과까지 학생별로 달라진 지점을 구체적으로 기록합니다."
            />
            <div className="mt-14">
              <ReviewCarousel reviews={reviews} />
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-white py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#7c3aed]">
                  FAQ
                </p>
                <h2 className="mt-5 text-4xl font-black leading-[1.12] text-[#0f172a] sm:text-6xl">
                  상담 전, 가장 많이
                  <br />
                  <span className="text-[#7c3aed]">물어보는 질문</span>
                </h2>
              </div>
              <p className="max-w-xl text-base font-medium leading-8 text-[#64748b] lg:justify-self-end">
                비용보다 먼저 맞는 방향을 확인하세요. 학생 상황에 따라 달라지는 내용은
                무료 상담에서 구체적으로 안내합니다.
              </p>
            </div>
            <Accordion
              type="single"
              collapsible
              className="mt-12 overflow-hidden rounded-[8px] border border-[#e5d8ff] bg-[#fbf8ff] px-5 sm:px-8"
            >
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="py-7 text-lg sm:text-xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-3xl pb-7 text-base font-medium leading-8">
                    <span className="whitespace-pre-line">{faq.answer}</span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </MotionSection>

        <section id="contact" className="bg-[#f4efff] py-24 pb-40 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 rounded-[8px] bg-[#0f172a] p-8 text-white lg:grid-cols-[1fr_0.8fr] lg:items-center lg:p-12">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-white/50">
                  Consult
                </p>
                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
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
                    className: "border-white bg-white text-[#0f172a] hover:bg-white/90",
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
