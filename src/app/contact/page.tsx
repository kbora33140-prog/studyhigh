import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "무료 상담 신청",
  description:
    "스터디하이 무료 상담에서 아이 성향, 과목별 고민, 수업 방식에 맞는 선생님 연결 방향을 확인하세요.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-5 py-16 lg:px-8 lg:py-24">
        <section className="mx-auto max-w-5xl rounded-[28px] border border-black/10 bg-white p-8 shadow-2xl shadow-black/10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#2b105f]">
            CONSULT
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-normal text-black sm:text-6xl">
            아이에게 맞는
            <br />
            선생님을 상담으로 확인하세요
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">
            아이의 성향,
            <br />
            현재 과목별 고민,
            <br />
            원하는 수업 방식을 알려주세요.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <OpenConsultationButton
              className={buttonVariants({
                size: "lg",
                className: "bg-[#2b105f] hover:bg-[#3b176f]",
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
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Phone className="h-5 w-5" />
              전화 상담
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
