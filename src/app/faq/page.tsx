import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { commonFaqs } from "@/lib/faqs";

export const metadata = {
  title: "자주 묻는 질문",
  description: "스터디하이 1:1 과외의 학년, 과목, 수업 방식, 학습관리와 상담신청에 관한 자주 묻는 질문입니다.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F0FF] px-5 py-16 lg:px-8 lg:py-24">
        <section className="mx-auto max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#6736C8]">FAQ</p>
          <h1 className="mt-5 text-4xl font-black text-[#0F172A] sm:text-6xl">자주 묻는 질문</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#675F70]">과외를 시작하기 전 궁금한 내용을 확인해 보세요. 학생 상황에 따라 달라지는 내용은 상담에서 확인해 안내합니다.</p>

          <Accordion type="single" collapsible className="mt-12 overflow-hidden rounded-[24px] border border-[#DDD1F5] bg-white px-5 sm:px-8">
            {commonFaqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="py-7 text-left text-lg sm:text-xl">{faq.question}</AccordionTrigger>
                <AccordionContent className="max-w-3xl pb-7 text-base font-medium leading-8 text-[#625D6B]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex flex-col gap-5 rounded-[24px] bg-[#2B105F] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <h2 className="text-2xl font-black">더 궁금한 점이 있으신가요?</h2>
              <p className="mt-2 text-sm font-medium text-white/75">학년, 과목, 지역과 원하는 수업 방식을 남겨주세요.</p>
            </div>
            <OpenConsultationButton className={buttonVariants({ variant: "secondary", size: "lg", className: "border-white bg-white text-[#2B105F]" })}>상담신청</OpenConsultationButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
