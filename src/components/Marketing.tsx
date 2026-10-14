import Image from "next/image";
import Link from "next/link";
import { Phone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { footerLinks } from "@/lib/siteNavigation";

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
      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#7c3aed]">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal text-[#0f172a] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-[#64748b]">{description}</p>
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
        "flex min-h-64 flex-col rounded-[8px] bg-white p-7 transition duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3efff] text-[#7c3aed]">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </div>
      <h3 className="text-2xl font-black tracking-normal text-[#0f172a]">{title}</h3>
      <p className="mt-4 leading-8 text-[#64748b]">{description}</p>
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
        <li key={step.title} className="rounded-[8px] bg-white p-7">
          <span className="text-sm font-black text-[#7c3aed]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-xl font-black text-[#0f172a]">{step.title}</h3>
          <p className="mt-3 leading-7 text-[#64748b]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function ConsultationTimeline() {
  const steps = [
    {
      title: "무료 상담",
      description: "학년, 과목, 현재 수준과 목표를 듣고 필요한 수업 조건을 정리합니다.",
    },
    {
      title: "선생님 매칭",
      description: "학습 진단에서 확인한 성향, 목표, 일정과 원하는 수업 방식에 맞는 선생님을 추천합니다.",
    },
    {
      title: "체험 수업",
      description: "실제 수업 방식으로 설명을 이해하기 쉬운지, 학생과 호흡이 맞는지 확인합니다.",
    },
    {
      title: "정규 수업",
      description: "맞춤 커리큘럼으로 수업을 시작하고 학습 진행 상황과 다음 계획을 피드백으로 공유합니다.",
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
            <span className="z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-sm font-black text-white">
              {index + 1}
            </span>
            <span className="pt-3 text-sm font-black text-[#7c3aed] md:hidden">
              STEP
            </span>
          </div>
          <article className="rounded-[8px] border border-[#e5d8ff] bg-white p-7 shadow-sm shadow-black/5 sm:p-8">
            <p className="text-sm font-black text-[#7c3aed]">STEP {index + 1}</p>
            <h3 className="mt-3 text-2xl font-black tracking-normal text-[#0f172a]">
              {step.title}
            </h3>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-base font-medium leading-8 text-[#64748b]">
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
  reviews: Array<{ label: string; quote: string; student?: string; result?: string }>;
}) {
  const rollingReviews = [...reviews, ...reviews];

  return (
    <div className="-mx-5 overflow-hidden px-5 pb-3 lg:mx-0 lg:px-0">
      <div className="flex w-max gap-4 animate-[case-scroll_55s_linear_infinite] hover:[animation-play-state:paused]">
        {rollingReviews.map((review, index) => (
          <article
            key={`${review.label}-${review.student}-${index}`}
            className="w-[310px] shrink-0 rounded-[8px] bg-white p-7 shadow-sm shadow-[#7c3aed]/5 sm:w-[380px]"
          >
            <p className="text-sm font-black text-[#7c3aed]">{review.label}</p>
            {review.student || review.result ? (
              <div className="mt-4 rounded-2xl bg-[#fbf8ff] px-4 py-3">
                {review.student ? (
                  <p className="text-base font-black text-[#0f172a]">{review.student}</p>
                ) : null}
                {review.result ? (
                  <p className="mt-1 text-sm font-bold text-[#64748b]">{review.result}</p>
                ) : null}
              </div>
            ) : null}
            <p className="mt-5 text-base font-medium leading-7 text-[#475569]">
              {review.quote}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#0f172a] px-5 py-14 text-sm text-white/62 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <Image src="/studyhigh-logo-transparent.png" alt="스터디하이 로고" width={62} height={62} className="h-16 w-16 object-contain" />
            </Link>
            <div>
              <p className="text-2xl font-black tracking-normal text-white">스터디하이</p>
              <p className="mt-3 text-base font-bold text-white">전문 1:1 맞춤 과외</p>
              <a href="tel:01025189245" className="mt-3 inline-flex items-center gap-2 text-base font-bold text-white/82 transition hover:text-white">
                <Phone className="h-4 w-4" aria-hidden="true" />010-2518-9245
              </a>
            </div>
          </div>
          <nav aria-label="하단 사이트맵">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">SITEMAP</p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {footerLinks.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-2 py-2 font-bold text-white/75 transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-white">{item.label}</Link>)}
              <OpenConsultationButton className="rounded-lg px-2 py-2 text-left font-bold text-[#CBB7FF] transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-white">무료 상담 신청</OpenConsultationButton>
            </div>
          </nav>
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
