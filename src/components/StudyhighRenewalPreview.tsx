"use client";

import { StudyhighHomeSection } from "@/components/StudyhighHomeSection";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Eye, UserRoundCheck, Focus, Monitor, UsersRound, Video, ArrowRight, BarChart3, BookOpen, BookOpenCheck, Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, FileText, MessagesSquare, MonitorPlay, Route, Search, Target, UserCheck, Waypoints } from "lucide-react";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { renewalFaqs } from "@/data/renewalFaqs";
import { regions } from "@/lib/regions";

const navItems = [["지역별 수업","#nationwide-region-links"],["과목별 수업","#subjects"],["학습관리","#learning-management"],["학습후기","#reviews"]];
const subjects = [["국어","독해 과정과 답의 근거를 확인합니다.","/subjects/korean"],["영어","어휘·문장 구조·독해를 연결합니다.","/subjects/english"],["수학","개념 이해와 풀이 과정, 오답 원인을 점검합니다.","/subjects/math"],["과학","현상과 원리를 문제 조건에 연결합니다.","/subjects/science"],["사회","핵심 개념과 자료 해석을 논리적으로 연결합니다.","/subjects/social"],["한국사","시대 흐름과 핵심 사건의 인과관계를 정리합니다.","/subjects/history"],["코딩","논리적 사고와 문제 해결 과정을 프로젝트로 익힙니다.","/subjects/coding"],["검정고시","응시 과목과 준비 기간에 맞춰 합격 계획을 세웁니다.","/ged"]];
const thoughts=["자기주도학습","공부방법","집중력","성적향상","제자리 성적","공부계획","학습관리","진로","목표","공부가 어려워요"];
const learningReviews = [
 {type:"학부모가 확인한 변화",title:"연산 실수를 스스로 설명하기 시작했어요",body:"문제를 빨리 푸는 데 집중하던 아이가 풀이 순서를 말로 설명하고, 틀린 문제는 어느 단계에서 실수했는지 표시하는 습관을 만들고 있습니다.",meta:"서울 · 초등 · 수학"},
 {type:"학생이 느낀 변화",title:"영어 문장이 길어져도 당황하지 않아요",body:"주어와 동사를 먼저 찾고 문장 구조를 나누는 연습을 반복하면서, 긴 지문도 한 문장씩 근거를 확인하며 읽게 됐습니다.",meta:"경기 · 중등 · 영어"},
 {type:"학습관리 변화",title:"오답이 다음 주 계획으로 이어져요",body:"틀린 문제를 개념 부족·계산 실수·조건 누락으로 나누고, 다음 수업 전 다시 풀 문제를 정해 복습 흐름이 끊기지 않도록 관리합니다.",meta:"대전 · 고등 · 수학"},
 {type:"학부모가 확인한 변화",title:"읽은 내용을 자기 말로 정리해요",body:"짧게 낭독한 뒤 핵심 문장을 고르고 이유를 말하는 활동을 이어가며, 지문을 끝까지 읽고 질문에 답하는 시간이 늘었습니다.",meta:"부산 · 초등 · 국어"},
 {type:"학생이 느낀 변화",title:"과학 개념과 문제 조건이 연결돼요",body:"용어를 외우는 데서 그치지 않고 현상과 실험 과정을 그림으로 정리한 뒤, 문제에 제시된 조건을 하나씩 연결해 풀이합니다.",meta:"인천 · 중등 · 과학"},
 {type:"학습관리 변화",title:"내신과 모의고사 준비를 나눠 관리해요",body:"학교 진도 복습과 모의고사 어휘·독해를 주간 계획에 따로 배치해, 급한 과제에 밀리지 않고 두 목표를 함께 점검합니다.",meta:"서울 · 고등 · 영어"},
 {type:"학생이 느낀 변화",title:"독서 지문에서 근거를 찾는 순서가 생겼어요",body:"문단의 역할을 짧게 메모하고 선택지의 근거를 지문에서 다시 찾는 과정을 연습해, 시간에 쫓길 때도 풀이 기준을 유지합니다.",meta:"충남 · N수생 · 국어"},
 {type:"학부모가 확인한 변화",title:"숙제 분량보다 완료하는 경험을 쌓아요",body:"학생의 집중 시간을 고려해 과제를 작은 단위로 나누고 완료 여부를 확인하면서, 미루던 문제도 정해진 시간에 시작하고 있습니다.",meta:"대구 · 중등 · 수학"},
 {type:"학생이 느낀 변화",title:"사건을 시대 흐름 안에서 이해해요",body:"연도만 외우기보다 앞뒤 사건의 원인과 결과를 연결하고, 헷갈리는 시대는 비교표로 정리해 기억의 기준을 만들었습니다.",meta:"경기 · 고등 · 한국사"},
 {type:"학부모가 확인한 변화",title:"작은 결과물을 완성하며 자신감이 생겼어요",body:"기능을 한 번에 많이 배우기보다 조건과 순서를 나눠 구현하고, 오류가 생기면 원인을 찾아 고치는 과정을 차근차근 경험합니다.",meta:"광주 · 초등 · 코딩"},
 {type:"학생이 느낀 변화",title:"생활 일정에 맞는 영어 루틴을 만들었어요",body:"긴 시간을 확보하기 어려운 날에도 짧은 듣기와 표현 복습을 이어가고, 수업에서는 실제로 말해 보며 부족한 부분을 바로 확인합니다.",meta:"서울 · 성인 · 영어"},
 {type:"학습관리 변화",title:"자료를 보고 답의 근거를 말해요",body:"표와 그래프의 제목·단위·변화를 먼저 확인한 뒤 관련 개념을 연결해, 느낌으로 고르던 답을 근거와 함께 설명하도록 연습합니다.",meta:"세종 · 중등 · 사회"},
 {type:"학생이 느낀 변화",title:"공식보다 적용 조건을 먼저 확인해요",body:"공식을 바로 대입하지 않고 주어진 값과 구해야 할 것을 구분한 뒤, 어떤 원리를 써야 하는지 말로 설명하고 풀이를 시작합니다.",meta:"경남 · 고등 · 과학"},
 {type:"학부모가 확인한 변화",title:"단어가 문장과 말하기로 이어져요",body:"새 단어를 짧은 문장에 넣어 읽고 말하는 활동을 반복해, 외운 단어를 지문과 대화에서 다시 알아보는 경험이 늘었습니다.",meta:"강원 · 초등 · 영어"},
 {type:"학습관리 변화",title:"시험일까지 과목별 진도를 역산해요",body:"남은 기간과 과목별 이해도를 함께 확인하고, 개념 학습·기출 풀이·오답 복습의 순서를 주 단위로 나눠 실천하고 있습니다.",meta:"대전 · 검정고시 · 학습관리"},
];
const reviewProfiles = [
 {rating:"4.9",profile:"서울시 · 초5 · 김** · 수학"},
 {rating:"4.8",profile:"경기도 · 중2 · 한** · 영어"},
 {rating:"4.9",profile:"대전시 · 고2 · 박** · 수학"},
 {rating:"4.8",profile:"부산시 · 초4 · 이** · 국어"},
 {rating:"4.9",profile:"인천시 · 중3 · 최** · 과학"},
 {rating:"4.7",profile:"서울시 · 고1 · 정** · 영어"},
 {rating:"4.9",profile:"충남 · N수생 · 윤** · 국어"},
 {rating:"4.8",profile:"대구시 · 중1 · 장** · 수학"},
 {rating:"4.9",profile:"경기도 · 고2 · 조** · 한국사"},
 {rating:"4.8",profile:"광주시 · 초6 · 임** · 코딩"},
 {rating:"4.9",profile:"서울시 · 성인 · 오** · 영어"},
 {rating:"4.8",profile:"세종시 · 중2 · 강** · 사회"},
 {rating:"4.9",profile:"경남 · 고3 · 송** · 과학"},
 {rating:"4.7",profile:"강원도 · 초5 · 신** · 영어"},
 {rating:"4.9",profile:"대전시 · 검정고시 · 문** · 학습관리"},
];
const navigationRegions = regions
 .filter(({slug})=>slug!=="jeonnam-gwangju")
 .map(region=>({...region, menuName:region.name}));

export default function StudyhighRenewalPreview({preview=true}:{preview?:boolean}){
 const [openFaq,setOpenFaq]=useState<number|null>(0);
 return <div className="min-h-screen bg-white text-[#17131d]">
  {preview ? <><div className="bg-[#2b105f] px-4 py-2 text-center text-[11px] font-bold text-white">디자인 미리보기 · 운영 사이트와 분리된 화면입니다</div><header className="sticky top-0 z-40 border-b border-[#ebe4f8] bg-white/95 backdrop-blur"><div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-5"><Link href="/preview/studyhigh-renewal" className="flex items-center gap-3"><Image src="/studyhigh-logo-transparent.png" alt="스터디하이" width={42} height={42}/><b className="text-xl">스터디하이</b></Link><nav className="hidden items-center gap-7 lg:flex"><div className="group relative"><Link href="#nationwide-region-links" className="text-sm font-bold text-[#352745] hover:text-[#6736c8]">지역별 수업</Link><div className="invisible absolute left-1/2 top-7 w-[620px] -translate-x-1/2 rounded-3xl border border-[#e4d9f8] bg-white p-5 opacity-0 shadow-[0_20px_60px_rgba(43,16,95,.14)] transition group-hover:visible group-hover:opacity-100"><p className="mb-3 text-xs font-black tracking-[.18em] text-[#7c3aed]">REGIONAL LESSONS</p><div className="grid grid-cols-4 gap-2">{navigationRegions.map(r=><Link key={r.slug} href={`/regions/${r.slug}`} className="rounded-xl border border-[#e5dcf7] px-3 py-2.5 text-center text-xs font-bold text-[#452080] hover:border-[#6736c8] hover:bg-[#f4efff]">{r.menuName}</Link>)}</div></div></div>{navItems.slice(1).map(([n,h])=><Link key={n} href={h} className="text-sm font-bold text-[#352745] hover:text-[#6736c8]">{n}</Link>)}</nav><OpenConsultationButton className="rounded-full bg-[#6736c8] px-5 py-3 text-sm font-black text-white">무료 상담 신청</OpenConsultationButton></div><nav className="grid grid-cols-4 border-t border-[#f0eafa] px-2 py-2 lg:hidden">{navItems.map(([n,h])=><Link key={n} href={h} className="px-1 py-2 text-center text-[10px] font-bold text-[#452080] sm:text-xs">{n.replace(" 수업","")}</Link>)}</nav></header></> : <Header />}
  <main className="studyhigh-home">
   <section className="relative overflow-hidden bg-[#f4efff] px-5 py-16 md:py-24"><div className="absolute inset-0 opacity-25"><Image src="/hero-background-premium.png" alt="" fill className="object-cover"/></div><div className="relative mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_.9fr]"><div><span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-[#6736c8]">학생을 이해하는 1:1 맞춤과외</span><h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight md:text-7xl">아이에게 맞는<br/><span className="text-[#6736c8]">배움의 방향</span>을<br/>함께 찾습니다</h1><p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[#655a73]">현재 수준과 공부 습관, 질문 방식까지 살펴보고 학생에게 맞는 선생님과 학습 흐름을 연결합니다.</p><div className="mt-8 flex flex-wrap gap-3"><OpenConsultationButton className="rounded-full bg-[#6736c8] px-7 py-4 font-black text-white">무료 상담 신청</OpenConsultationButton><Link href="#subjects" className="rounded-full border border-[#cbb9ee] bg-white px-7 py-4 font-black text-[#452080]">수업 둘러보기</Link></div></div><div className="relative mx-auto w-full max-w-[520px]"><div className="absolute -inset-5 rotate-3 rounded-[48px] bg-gradient-to-br from-white to-[#d9c8ff]"/><Image src="/hero-tutor.png" alt="학생과 선생님이 함께 공부하는 모습" width={620} height={620} className="relative h-auto w-full rounded-[40px] object-cover shadow-[0_28px_80px_rgba(43,16,95,.22)]"/></div></div></section>
   <StudyhighHomeSection name="question" />
   <StudyhighHomeSection name="why" />
   <StudyhighHomeSection name="subjects" />
   <StudyhighHomeSection name="change" />
   <StudyhighHomeSection name="matching" />
   <StudyhighHomeSection name="weekly" />
   <section className="overflow-hidden bg-[#fbf9ff] px-5 py-20 md:py-24">
    <div className="mx-auto max-w-[1180px]">
     <Heading eyebrow="CLASS METHODS" title="아이에게 맞는 수업 방식" text="같은 1:1 수업도 아이가 집중하는 방식과 필요한 도움에 따라 더 잘 맞는 환경이 다릅니다."/>
     <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <article className="overflow-hidden rounded-[32px] border border-[#eadcc5] bg-white shadow-[0_20px_60px_rgba(64,42,24,.08)]">
       <div className="relative aspect-[4/3] overflow-hidden">
        <Image src="/class-method-in-person.png" alt="선생님이 학생의 표정과 학습 상태를 살피며 진행하는 방문수업" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw"/>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#26170b]/70 to-transparent px-6 pb-6 pt-20 text-white">
         <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-[#5a3b1f]"><Route className="h-4 w-4"/> 직접 만나 세심하게</span>
        </div>
       </div>
       <div className="p-6 sm:p-8">
        <p className="text-xs font-black tracking-[.2em] text-[#9a641e]">IN-PERSON LESSON</p>
        <h3 className="mt-3 text-3xl font-black text-[#17131d]">방문수업</h3>
        <p className="mt-4 text-base font-medium leading-7 text-slate-600">선생님이 아이와 같은 공간에서 수업하며 말로 표현하지 못한 어려움과 집중 흐름까지 세심하게 살핍니다.</p>
        <ul className="mt-7 grid gap-3">
         {[
          [Eye, "표정과 상황을 바로 확인", "말하지 않아도 막히는 순간을 빠르게 알아봅니다."],
          [UserRoundCheck, "표현이 서툰 아이도 즉시 대응", "반응과 풀이 과정을 보고 설명 방식을 바로 조절합니다."],
          [Focus, "산만한 집중력을 곁에서 관리", "주변에 쉽게 흐트러지는 아이의 학습 흐름을 직접 잡아줍니다."],
         ].map(([Icon, title, description]) => {
          const BenefitIcon = Icon as typeof Eye;
          return <li key={String(title)} className="flex gap-4 rounded-2xl bg-[#fffaf2] p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffe8c3] text-[#8a5517]"><BenefitIcon className="h-5 w-5"/></span><span><b className="block text-base text-[#24170d]">{String(title)}</b><span className="mt-1 block text-sm leading-6 text-slate-600">{String(description)}</span></span></li>;
         })}
        </ul>
       </div>
      </article>
      <article className="overflow-hidden rounded-[32px] border border-[#d9ccf7] bg-[#2b105f] text-white shadow-[0_20px_60px_rgba(43,16,95,.16)]">
       <div className="relative aspect-[4/3] overflow-hidden">
        <Image src="/class-method-live-online.png" alt="학생이 PC로 선생님과 실시간 화상수업을 진행하고 녹화 내용을 복습하는 모습" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw"/>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#19063f]/80 to-transparent px-6 pb-6 pt-20">
         <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-[#452080]"><MonitorPlay className="h-4 w-4"/> 어디서나 맞춤 선생님과</span>
        </div>
       </div>
       <div className="p-6 sm:p-8">
        <p className="text-xs font-black tracking-[.2em] text-[#cbb9ee]">LIVE ONLINE LESSON</p>
        <h3 className="mt-3 text-3xl font-black">실시간 화상수업</h3>
        <p className="mt-4 text-base font-medium leading-7 text-white/72">PC만 있으면 장소에 상관없이 실시간으로 만나고, 더 넓은 선생님 후보 중 아이의 성향과 맞는 수업을 찾을 수 있습니다.</p>
        <ul className="mt-7 grid gap-3">
         {[
          [Monitor, "장소 제한 없이 PC로 수업", "이동 없이 편한 학습 공간에서 실시간으로 질문하고 답합니다."],
          [UsersRound, "더 넓은 선생님 선택", "지역의 제약을 줄여 아이의 성향과 학습 방식에 맞는 선생님을 찾습니다."],
          [Video, "녹화 수업으로 반복 복습", "수업 녹화가 가능한 경우 놓친 설명을 다시 보며 복습에 활용합니다."],
         ].map(([Icon, title, description]) => {
          const BenefitIcon = Icon as typeof Monitor;
          return <li key={String(title)} className="flex gap-4 rounded-2xl bg-white/10 p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/12 text-[#e2d9ff]"><BenefitIcon className="h-5 w-5"/></span><span><b className="block text-base">{String(title)}</b><span className="mt-1 block text-sm leading-6 text-white/68">{String(description)}</span></span></li>;
         })}
        </ul>
       </div>
      </article>
     </div>
     <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-6 text-slate-500">수업 방식과 녹화 가능 여부는 학생의 일정, 지역, 선생님 배정 조건과 사용하는 수업 환경에 따라 상담 후 안내합니다.</p>
    </div>
   </section>
   <StudyhighHomeSection name="reviews" />
   <section id="faq" className="scroll-mt-28 px-5 py-20"><div className="mx-auto max-w-[980px]"><Heading eyebrow="FAQ" title="스터디하이 자주 묻는 질문" text="과외를 시작하기 전 궁금한 내용을 확인해 보세요."/><div className="mt-10 space-y-3">{renewalFaqs.map(([q,a],i)=>{const open=openFaq===i;return <article key={q} className={`overflow-hidden rounded-2xl border ${open?"border-[#cdbaf5] bg-[#f4efff]":"border-[#e7def6] bg-white"}`}><button onClick={()=>setOpenFaq(open?null:i)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-black sm:p-6 sm:text-lg" aria-expanded={open}><span>{i+1}. {q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-[#6736c8] transition ${open?"rotate-180":""}`}/></button>{open&&<p className="px-5 pb-6 text-sm font-medium leading-7 text-[#5e5668] sm:px-6 sm:text-base">{a}</p>}</article>})}</div></div></section>
   <section id="contact" className="bg-[#f4efff] px-5 py-20"><div className="mx-auto grid max-w-[1180px] items-center gap-8 rounded-[36px] bg-[#2b105f] p-8 text-white md:grid-cols-[1fr_auto] md:p-12"><div><p className="text-xs font-black tracking-[.22em] text-[#cbb9ee]">FREE CONSULT</p><h2 className="mt-4 text-4xl font-black">우리 아이에게 맞는<br/>수업 방향을 확인하세요</h2><p className="mt-5 max-w-2xl leading-7 text-white/70">학생의 현재 상황과 희망 과목을 확인한 뒤 상담 가능한 범위에서 안내합니다.</p></div><OpenConsultationButton className="rounded-full bg-white px-8 py-4 font-black text-[#2b105f]">무료 상담 신청</OpenConsultationButton></div></section>
   <section id="nationwide-region-links" className="scroll-mt-28 border-b border-[#e8e0f5] px-5 py-20"><div className="mx-auto max-w-[1280px]"><div className="flex flex-wrap items-end justify-between gap-5"><Heading eyebrow="REGIONAL LESSONS" title="전국 지역별 수업" text="원하는 지역을 선택해 우리 아이에게 맞는 1:1 과외를 알아보세요." align="left"/><Link href="/regions" className="inline-flex items-center gap-2 text-sm font-black text-[#6736c8]">전국 지역 전체 보기 <ArrowRight className="h-4 w-4"/></Link></div><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">{navigationRegions.map(r=><Link key={r.slug} href={`/regions/${r.slug}`} className="flex h-11 items-center justify-center rounded-xl border border-[#dccffc] bg-white px-3 text-center text-sm font-black text-[#452080] transition hover:border-[#6736c8] hover:bg-[#f4efff]">{r.menuName}</Link>)}</div></div></section>
  </main><SiteFooter/>
 </div>
}

export function LearningReviewsSection(){
 const reviewsRef=useRef<HTMLDivElement>(null);
 const [isPaused,setIsPaused]=useState(false);
 const moveReviews=(direction:-1|1)=>reviewsRef.current?.scrollBy({left:direction*396,behavior:"smooth"});
 useEffect(()=>{
  if(isPaused||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const timer=window.setInterval(()=>{
   const list=reviewsRef.current;
   if(!list)return;
   const atEnd=list.scrollLeft+list.clientWidth>=list.scrollWidth-12;
   if(atEnd)list.scrollTo({left:0,behavior:"smooth"});
   else list.scrollBy({left:396,behavior:"smooth"});
  },3800);
  return()=>window.clearInterval(timer);
 },[isPaused]);
 return <section id="reviews" className="scroll-mt-28 overflow-hidden bg-[#faf8ff] px-5 py-20">
  <div className="mx-auto max-w-[1280px]">
   <Heading eyebrow="LEARNING REVIEWS" title="학습후기" text="학년과 지역, 과목은 달라도 학생에게 맞는 학습 흐름을 찾으며 달라진 행동을 살펴보세요."/>
   <div className="mt-8 flex items-center justify-between gap-4">
    <p className="max-w-2xl text-sm leading-6 text-slate-500">현재 카드는 실제 후기 데이터 연결 전 디자인 예시이며, 개인정보를 가린 형식으로 구성했습니다.</p>
    <div className="hidden shrink-0 gap-2 sm:flex">
     <button type="button" onClick={()=>moveReviews(-1)} aria-label="이전 학습후기 보기" className="grid h-12 w-12 place-items-center rounded-full border border-[#d9cdf3] bg-white text-[#6736c8] transition hover:border-[#6736c8] hover:bg-[#f1ebff]"><ChevronLeft className="h-5 w-5"/></button>
     <button type="button" onClick={()=>moveReviews(1)} aria-label="다음 학습후기 보기" className="grid h-12 w-12 place-items-center rounded-full bg-[#6736c8] text-white shadow-[0_10px_28px_rgba(103,54,200,.24)] transition hover:bg-[#5428ad]"><ChevronRight className="h-5 w-5"/></button>
    </div>
   </div>
   <div ref={reviewsRef} onMouseEnter={()=>setIsPaused(true)} onMouseLeave={()=>setIsPaused(false)} onFocusCapture={()=>setIsPaused(true)} onBlurCapture={()=>setIsPaused(false)} role="region" aria-label="학습후기 구성 예시 15개 자동 가로 목록" className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {learningReviews.map(({type,title,body,meta},index)=>{const profile=reviewProfiles[index];return <article data-review-card key={`${meta}-${title}`} className="flex min-h-[330px] min-w-[84vw] snap-start flex-col rounded-[24px] border border-[#dddfea] bg-white p-6 shadow-[0_14px_36px_rgba(51,30,88,.07)] sm:min-w-[360px] lg:min-w-[380px]">
     <div className="flex items-center justify-between gap-3"><span className="text-lg font-black tracking-[.06em] text-[#F59E0B]" aria-label={`별점 예시 ${profile.rating}점`}>★★★★★ <b className="ml-1 text-sm tracking-normal text-[#17131d]">{profile.rating}</b></span><span className="rounded-full bg-[#f1ebff] px-3 py-1.5 text-[11px] font-black text-[#6736c8]">후기 구성 예시</span></div>
     <div className="mt-6 flex items-center justify-between gap-3"><span className="text-xs font-black text-[#6736c8]">{type}</span><span className="text-xs font-bold text-slate-400">{String(index+1).padStart(2,"0")} / 15</span></div>
     <h3 className="mt-5 text-xl font-black leading-8 text-[#211629]">{title}</h3>
     <p className="mt-4 flex-1 text-[15px] font-medium leading-7 text-slate-600">{body}</p>
     <div className="mt-6 border-t border-dashed border-[#dddfea] pt-5 text-sm font-black text-[#211629]">{profile.profile}<span className="mt-1 block text-xs font-bold text-slate-400">{meta}</span></div>
    </article>})}
   </div>
   <p className="text-center text-xs font-bold text-slate-400 sm:hidden">옆으로 밀어 다양한 학습후기를 확인하세요</p>
  </div>
 </section>
}

function Heading({eyebrow,title,text,align="center"}:{eyebrow:string;title:string;text?:string;align?:"center"|"left"}){return <div className={align==="center"?"text-center":"text-left"}><p className="text-xs font-black tracking-[.22em] text-[#7c3aed]">{eyebrow}</p><h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{title}</h2>{text&&<p className={`mt-5 text-base leading-7 text-slate-600 ${align==="center"?"mx-auto max-w-2xl":"max-w-2xl"}`}>{text}</p>}</div>}
