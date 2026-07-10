import Image from "next/image";
import { Phone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2b105f]">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal text-black sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-black/60">{description}</p>
      ) : null}
    </div>
  );
}

export function PremiumCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex min-h-64 flex-col rounded-[28px] bg-white p-7 transition duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3efff] text-[#2b105f]">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <h3 className="text-2xl font-black tracking-normal text-black">{title}</h3>
      <p className="mt-4 leading-8 text-black/58">{description}</p>
    </article>
  );
}

export function ProcessTimeline({
  steps,
}: {
  steps: Array<{ title: string; description: string }>;
}) {
  return (
    <ol className="grid gap-4 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-[28px] bg-white p-7">
          <span className="text-sm font-black text-[#2b105f]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-xl font-black text-black">{step.title}</h3>
          <p className="mt-3 leading-7 text-black/58">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function ConsultationTimeline() {
  const steps = [
    {
      title: "상담 신청",
      description: "학생의 현재 학습 상황과 희망 과목, 목표를 상담합니다.",
    },
    {
      title: "학생 성향 분석",
      description: "학생의 성향과 학습 스타일을 분석하여 교육 방향을 설계합니다.",
    },
    {
      title: "맞춤 선생님 추천",
      description: "학생과 가장 잘 맞는 전문 선생님을 추천합니다.",
    },
    {
      title: "30분 무료 테스트 수업",
      description: "실제 수업을 체험하며 학생과 선생님의 호흡을 확인합니다.",
    },
    {
      title: "정식 수업 시작",
      description: "학생만을 위한 맞춤 커리큘럼으로 본격적인 수업을 시작합니다.",
    },
  ];

  return (
    <ol className="relative mx-auto max-w-5xl">
      {steps.map((step, index) => (
        <li key={step.title} className="relative grid gap-5 pb-10 last:pb-0 md:grid-cols-[180px_1fr]">
          {index < steps.length - 1 ? (
            <span className="absolute left-6 top-12 h-[calc(100%-48px)] w-px bg-black/10 md:left-[90px]" />
          ) : null}
          <div className="relative flex items-start gap-4 md:justify-end">
            <span className="z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16072f] text-sm font-black text-white">
              {index + 1}
            </span>
            <span className="pt-3 text-sm font-black text-[#2b105f] md:hidden">
              STEP
            </span>
          </div>
          <article className="rounded-[28px] bg-white p-7 shadow-sm shadow-black/5">
            <p className="text-sm font-black text-[#2b105f]">STEP {index + 1}</p>
            <h3 className="mt-3 text-2xl font-black tracking-normal text-black">
              {step.title}
            </h3>
            <p className="mt-4 max-w-2xl whitespace-pre-line leading-8 text-black/60">
              {step.description}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}

export function ReviewCarousel({
  reviews,
}: {
  reviews: Array<{ label: string; quote: string }>;
}) {
  return (
    <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
      {reviews.map((review) => (
        <article
          key={review.label}
          className="min-w-[82%] snap-start rounded-[28px] bg-white p-7 sm:min-w-[48%] lg:min-w-0"
        >
          <p className="text-sm font-black text-[#2b105f]">{review.label}</p>
          <p className="mt-5 text-lg leading-8 text-black/68">{review.quote}</p>
        </article>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#16072f] px-5 py-14 text-sm text-white/62 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/studyhigh-logo-transparent.png"
            alt="스터디하이 로고"
            width={62}
            height={62}
            className="h-16 w-16 object-contain"
          />
          <div>
            <p className="text-2xl font-black tracking-normal text-white">스터디하이</p>
            <div className="mt-3 flex flex-col gap-3 text-base font-bold text-white sm:flex-row sm:items-center sm:gap-5">
              <p>전문 1:1 맞춤 과외</p>
              <a
                href="tel:01025189245"
                className="inline-flex items-center gap-2 text-white/82 transition hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                010-2518-9245
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-white/45">© 스터디하이. All rights reserved.</p>
          </div>
          <div className="flex gap-5 font-semibold text-white/72">
            <span>개인정보처리방침</span>
            <span>이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
