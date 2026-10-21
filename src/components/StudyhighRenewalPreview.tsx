"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart3, BookOpen, Check, ChevronDown, ClipboardCheck, Eye, Focus, GraduationCap, MapPin, Monitor, Search, Sparkles, Target, UserRoundCheck, UsersRound, Video } from "lucide-react";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { renewalFaqs } from "@/data/renewalFaqs";
import { regions } from "@/lib/regions";

const navItems = [["지역별 수업","#nationwide-region-links"],["학년별 수업","#grades"],["과목별 수업","#subjects"],["학습관리","#learning-management"],["학습후기","#reviews"]];
const grades = [["초등학생","공부를 시작하는 힘","읽기·연산 기초와 짧은 학습 루틴부터 차근차근 만듭니다.","/elementary"],["중학생","개념과 내신의 연결","학교 진도와 현재 이해도를 함께 확인해 오답의 원인을 찾습니다.","/middle"],["고등학생","목표에 맞춘 학습 설계","내신과 진로 목표에 맞춰 과목별 우선순위와 복습 계획을 세웁니다.","/high"],["검정고시","다시 시작하는 학습","목표 일정과 현재 수준을 확인해 필요한 과목부터 계획합니다.","/ged"]];
const subjects = [["국어","독해 과정과 답의 근거를 확인합니다.","/subjects#korean"],["영어","어휘·문장 구조·독해를 연결합니다.","/subjects#english"],["수학","개념 이해와 풀이 과정, 오답 원인을 점검합니다.","/subjects#math"],["과학","현상과 원리를 문제 조건에 연결합니다.","/subjects#science"]];
const thoughts=["자기주도학습","공부방법","집중력","성적향상","제자리 성적","공부계획","학습관리","진로","목표","공부가 어려워요"];
const navigationRegions = regions
 .filter(({slug})=>slug!=="jeonnam-gwangju")
 .map(region=>({...region, menuName:region.name}));

export default function StudyhighRenewalPreview({preview=true}:{preview?:boolean}){
 const [openFaq,setOpenFaq]=useState<number|null>(0);
 return <div className="min-h-screen bg-white text-[#17131d]">
  {preview ? <><div className="bg-[#2b105f] px-4 py-2 text-center text-[11px] font-bold text-white">디자인 미리보기 · 운영 사이트와 분리된 화면입니다</div><header className="sticky top-0 z-40 border-b border-[#ebe4f8] bg-white/95 backdrop-blur"><div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-5"><Link href="/preview/studyhigh-renewal" className="flex items-center gap-3"><Image src="/studyhigh-logo-transparent.png" alt="스터디하이" width={42} height={42}/><b className="text-xl">스터디하이</b></Link><nav className="hidden items-center gap-7 lg:flex"><div className="group relative"><Link href="#nationwide-region-links" className="text-sm font-bold text-[#352745] hover:text-[#6736c8]">지역별 수업</Link><div className="invisible absolute left-1/2 top-7 w-[620px] -translate-x-1/2 rounded-3xl border border-[#e4d9f8] bg-white p-5 opacity-0 shadow-[0_20px_60px_rgba(43,16,95,.14)] transition group-hover:visible group-hover:opacity-100"><p className="mb-3 text-xs font-black tracking-[.18em] text-[#7c3aed]">REGIONAL LESSONS</p><div className="grid grid-cols-4 gap-2">{navigationRegions.map(r=><Link key={r.slug} href={`/regions/${r.slug}`} className="rounded-xl border border-[#e5dcf7] px-3 py-2.5 text-center text-xs font-bold text-[#452080] hover:border-[#6736c8] hover:bg-[#f4efff]">{r.menuName}</Link>)}</div></div></div>{navItems.slice(1).map(([n,h])=><Link key={n} href={h} className="text-sm font-bold text-[#352745] hover:text-[#6736c8]">{n}</Link>)}</nav><OpenConsultationButton className="rounded-full bg-[#6736c8] px-5 py-3 text-sm font-black text-white">무료 상담 신청</OpenConsultationButton></div><nav className="grid grid-cols-5 border-t border-[#f0eafa] px-2 py-2 lg:hidden">{navItems.map(([n,h])=><Link key={n} href={h} className="px-1 py-2 text-center text-[10px] font-bold text-[#452080] sm:text-xs">{n.replace(" 수업","")}</Link>)}</nav></header></> : <Header />}
  <main>
   <section className="relative overflow-hidden bg-[#f4efff] px-5 py-16 md:py-24"><div className="absolute inset-0 opacity-25"><Image src="/hero-background-premium.png" alt="" fill className="object-cover"/></div><div className="relative mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_.9fr]"><div><span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black text-[#6736c8]">학생을 이해하는 1:1 맞춤과외</span><h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight md:text-7xl">아이에게 맞는<br/><span className="text-[#6736c8]">배움의 방향</span>을<br/>함께 찾습니다</h1><p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[#655a73]">현재 수준과 공부 습관, 질문 방식까지 살펴보고 학생에게 맞는 선생님과 학습 흐름을 연결합니다.</p><div className="mt-8 flex flex-wrap gap-3"><OpenConsultationButton className="rounded-full bg-[#6736c8] px-7 py-4 font-black text-white">무료 상담 신청</OpenConsultationButton><Link href="#grades" className="rounded-full border border-[#cbb9ee] bg-white px-7 py-4 font-black text-[#452080]">수업 둘러보기</Link></div></div><div className="relative mx-auto w-full max-w-[520px]"><div className="absolute -inset-5 rotate-3 rounded-[48px] bg-gradient-to-br from-white to-[#d9c8ff]"/><Image src="/hero-tutor.png" alt="학생과 선생님이 함께 공부하는 모습" width={620} height={620} className="relative h-auto w-full rounded-[40px] object-cover shadow-[0_28px_80px_rgba(43,16,95,.22)]"/></div></div></section>
   <section id="grades" className="scroll-mt-28 px-5 py-20"><div className="mx-auto max-w-[1180px]"><Heading eyebrow="GRADE LESSONS" title="학년별 1:1 맞춤 수업" text="학년마다 다른 학습 과제와 속도에 맞춰 수업의 시작점을 정합니다."/><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{grades.map(([t,s,d,h])=><Link key={t} href={h} className="group rounded-[26px] border border-[#e2d7f8] p-6 hover:border-[#6736c8] hover:bg-[#faf8ff]"><GraduationCap className="h-10 w-10 text-[#6736c8]"/><p className="mt-6 text-xs font-black text-[#7c3aed]">{s}</p><h3 className="mt-2 text-2xl font-black">{t}</h3><p className="mt-4 text-sm leading-6 text-slate-600">{d}</p></Link>)}</div></div></section>
   <section id="subjects" className="scroll-mt-28 bg-[#faf8ff] px-5 py-20"><div className="mx-auto max-w-[1180px]"><Heading eyebrow="SUBJECT LESSONS" title="과목별 수업" text="정답만 확인하지 않고 학생이 어느 과정에서 막히는지 함께 살펴봅니다."/><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{subjects.map(([t,d,h])=><Link key={t} href={h} className="rounded-[24px] bg-white p-6 shadow-[0_12px_34px_rgba(55,34,92,.07)]"><BookOpen className="h-9 w-9 text-[#6736c8]"/><h3 className="mt-5 text-2xl font-black">{t}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{d}</p></Link>)}</div></div></section>
   <section className="px-5 py-20"><div className="mx-auto max-w-[1180px]"><Heading eyebrow="WHY STUDYHIGH" title="왜 스터디하이 과외여야 할까요?"/><div className="mt-12 grid items-stretch gap-8 rounded-[36px] bg-[#2b105f] p-7 text-white md:grid-cols-2 md:p-12"><div className="relative min-h-[300px] overflow-hidden rounded-[28px] md:min-h-[390px]"><Image src="/studyhigh-one-to-one-tutoring-v2.webp" alt="밝은 학습 공간에서 학생의 질문을 듣고 설명하는 1:1 맞춤과외 선생님" fill sizes="(max-width: 767px) calc(100vw - 96px), 520px" className="object-cover"/></div><div className="flex flex-col justify-center"><p className="text-sm font-black text-[#cbb9ee]">ONE STUDENT, ONE DIRECTION</p><h3 className="mt-4 text-3xl font-black">설명보다 먼저<br/>학생의 반응을 봅니다</h3><p className="mt-5 leading-7 text-[#ded5ef]">성적표 하나가 아니라 질문 방식, 집중 리듬과 오답 습관을 함께 보고 수업의 시작점을 정합니다.</p><div className="mt-7 grid grid-cols-3 gap-2 text-center text-xs font-bold"><span className="rounded-xl bg-white/10 p-3">성향 진단</span><span className="rounded-xl bg-white/10 p-3">방향 설계</span><span className="rounded-xl bg-white/10 p-3">맞춤 매칭</span></div></div></div></div></section>
   <section className="bg-[#fff8ed] px-5 py-20"><div className="mx-auto max-w-[1180px]"><Heading eyebrow="LEARNING QUESTION" title="공부를 해도 왜 제자리일까요?"/><div className="mt-12 grid items-center gap-8 lg:grid-cols-[.8fr_1.2fr]"><div className="mx-auto flex aspect-square w-full max-w-[400px] items-center justify-center rounded-full bg-[#ffe7bd]"><div className="text-center"><Search className="mx-auto h-20 w-20 text-[#6736c8]"/><p className="mt-5 text-2xl font-black">열심히 하는데<br/>어디서 막힌 걸까?</p></div></div><div className="flex flex-wrap justify-center gap-3">{thoughts.map((x,i)=><span key={x} className={`rounded-full border px-5 py-3 font-bold ${i%3===0?"border-[#cbb9ee] bg-[#6736c8] text-white":"border-[#eadcc5] bg-white"}`}>{x}</span>)}</div></div></div></section>
   <section className="px-5 py-20"><div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-2"><div><p className="text-xs font-black tracking-[.22em] text-[#7c3aed]">TEACHER MATCH</p><h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">학생과 성향이 맞는<br/>선생님이 중요합니다</h2><p className="mt-6 text-lg leading-8 text-slate-600">학력과 경력뿐 아니라 학생의 말투, 속도와 선호하는 설명 방식까지 확인해 수업의 호흡을 맞춥니다.</p><ul className="mt-7 space-y-3">{["질문을 기다려주는 설명","학생 속도에 맞춘 확인","수업 후 다음 행동까지 기록"].map(x=><li key={x} className="flex gap-3 font-bold"><Check className="text-[#6736c8]"/>{x}</li>)}</ul></div><div className="relative min-h-[440px] overflow-hidden rounded-[40px] bg-[#f4efff]"><Image src="/hero-tutor.png" alt="학생과 선생님의 맞춤 수업" fill className="object-cover object-top"/></div></div></section>
   <section className="bg-[#f4efff] px-5 py-20"><div className="mx-auto max-w-[1180px]"><Heading eyebrow="SYNERGY" title="학생도 선생님도 시너지 UP!"/><div className="mt-12 grid gap-5 md:grid-cols-[1fr_auto_1fr]"><div className="rounded-[32px] bg-white p-8"><span className="text-xs font-black text-slate-400">BEFORE</span><h3 className="mt-4 text-2xl font-black">혼자 버티는 공부</h3><div className="mt-8 space-y-4 text-slate-500"><p>계획이 자주 끊겨요</p><p>틀린 이유를 모르겠어요</p><p>질문을 미루게 돼요</p></div></div><div className="flex items-center justify-center"><ArrowRight className="h-10 w-10 rotate-90 text-[#6736c8] md:rotate-0"/></div><div className="rounded-[32px] bg-gradient-to-br from-[#6736c8] to-[#2b105f] p-8 text-white"><span className="text-xs font-black text-[#d9ccf7]">함께 만드는 변화</span><h3 className="mt-4 text-2xl font-black">함께 설계하는 공부</h3><div className="mt-8 space-y-4"><p>✓ 주간 목표를 확인해요</p><p>✓ 오답 원인을 기록해요</p><p>✓ 질문과 피드백을 이어가요</p></div></div></div></div></section>
   <section className="px-5 py-20"><div className="mx-auto max-w-[1180px]"><Heading eyebrow="MATCHING PROCESS" title="선생님 매칭 4단계"/><div className="mt-12 grid gap-4 md:grid-cols-4">{[["상담",BookOpen,"현재 고민 듣기"],["학습 진단",BarChart3,"막히는 지점 찾기"],["선생님 매칭",UserRoundCheck,"성향과 방식 연결"],["수업 시작",Sparkles,"계획과 피드백 실행"]].map(([t,I,d],i)=>{const Icon=I as typeof BookOpen;return <article key={String(t)} className="rounded-[28px] border border-[#ddd1fa] p-6 text-center"><span className="text-xs font-black text-[#7c3aed]">STEP 0{i+1}</span><div className="mx-auto mt-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#f4efff]"><Icon className="h-11 w-11 text-[#6736c8]"/></div><h3 className="mt-5 text-xl font-black">{String(t)}</h3><p className="mt-2 text-sm text-slate-500">{String(d)}</p></article>})}</div></div></section>
   <section id="learning-management" className="scroll-mt-28 bg-[#17131d] px-5 py-20 text-white"><div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p className="text-xs font-black tracking-[.22em] text-[#cbb9ee]">LEARNING MANAGEMENT</p><h2 className="mt-4 text-4xl font-black md:text-5xl">수업이 없는 날에도<br/>학습은 이어집니다</h2><p className="mt-6 leading-8 text-white/65">수업 목표와 숙제, 복습, 오답 점검을 연결해 다음 수업에서 확인할 내용을 분명하게 만듭니다.</p></div><div className="grid gap-4 sm:grid-cols-3">{[["수업 목표",Target],["숙제·복습",ClipboardCheck],["오답 피드백",BarChart3]].map(([n,I])=>{const Icon=I as typeof Target;return <div key={String(n)} className="rounded-[26px] bg-white/10 p-6"><Icon className="h-9 w-9 text-[#d8c8ff]"/><h3 className="mt-8 text-xl font-black">{String(n)}</h3></div>})}</div></div></section>
   <section className="overflow-hidden bg-[#fbf9ff] px-5 py-20 md:py-24">
    <div className="mx-auto max-w-[1180px]">
     <Heading eyebrow="CLASS METHODS" title="수업 방식, 아이에게 맞게 선택하세요" text="같은 1:1 수업도 아이가 집중하는 방식과 필요한 도움에 따라 더 잘 맞는 환경이 다릅니다."/>
     <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <article className="overflow-hidden rounded-[32px] border border-[#eadcc5] bg-white shadow-[0_20px_60px_rgba(64,42,24,.08)]">
       <div className="relative aspect-[4/3] overflow-hidden">
        <Image src="/class-method-in-person.png" alt="선생님이 학생의 표정과 학습 상태를 살피며 진행하는 방문수업" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw"/>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#26170b]/70 to-transparent px-6 pb-6 pt-20 text-white">
         <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-[#5a3b1f]"><MapPin className="h-4 w-4"/> 직접 만나 세심하게</span>
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
         <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-[#452080]"><Video className="h-4 w-4"/> 어디서나 맞춤 선생님과</span>
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
   <section id="reviews" className="scroll-mt-28 bg-[#faf8ff] px-5 py-20"><div className="mx-auto max-w-[1180px]"><Heading eyebrow="LEARNING REVIEWS" title="학습후기" text="수업 참여, 질문, 과제와 복습처럼 학생의 학습 행동이 달라진 지점을 살펴보세요."/><div className="mt-10 grid gap-5 md:grid-cols-3">{[["학부모 후기","상담에서 확인한 학생 성향과 수업 후 전달된 피드백"],["학생 후기","질문하기와 오답 다시 풀기처럼 달라진 학습 행동"],["학습 변화 사례","집중 시간, 숙제 완료와 계획 실천 과정"]].map(([t,d])=><article key={t} className="rounded-[28px] bg-white p-7 shadow-sm"><Sparkles className="h-8 w-8 text-[#6736c8]"/><h3 className="mt-5 text-2xl font-black">{t}</h3><p className="mt-4 leading-7 text-slate-600">{d}</p></article>)}</div></div></section>
   <section id="faq" className="scroll-mt-28 px-5 py-20"><div className="mx-auto max-w-[980px]"><Heading eyebrow="FAQ" title="스터디하이 자주 묻는 질문" text="과외를 시작하기 전 궁금한 내용을 확인해 보세요."/><div className="mt-10 space-y-3">{renewalFaqs.map(([q,a],i)=>{const open=openFaq===i;return <article key={q} className={`overflow-hidden rounded-2xl border ${open?"border-[#cdbaf5] bg-[#f4efff]":"border-[#e7def6] bg-white"}`}><button onClick={()=>setOpenFaq(open?null:i)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-black sm:p-6 sm:text-lg" aria-expanded={open}><span>{i+1}. {q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-[#6736c8] transition ${open?"rotate-180":""}`}/></button>{open&&<p className="px-5 pb-6 text-sm font-medium leading-7 text-[#5e5668] sm:px-6 sm:text-base">{a}</p>}</article>})}</div></div></section>
   <section id="contact" className="bg-[#f4efff] px-5 py-20"><div className="mx-auto grid max-w-[1180px] items-center gap-8 rounded-[36px] bg-[#2b105f] p-8 text-white md:grid-cols-[1fr_auto] md:p-12"><div><p className="text-xs font-black tracking-[.22em] text-[#cbb9ee]">FREE CONSULT</p><h2 className="mt-4 text-4xl font-black">우리 아이에게 맞는<br/>수업 방향을 확인하세요</h2><p className="mt-5 max-w-2xl leading-7 text-white/70">학생의 현재 상황과 희망 과목을 확인한 뒤 상담 가능한 범위에서 안내합니다.</p></div><OpenConsultationButton className="rounded-full bg-white px-8 py-4 font-black text-[#2b105f]">무료 상담 신청</OpenConsultationButton></div></section>
   <section id="nationwide-region-links" className="scroll-mt-28 border-b border-[#e8e0f5] px-5 py-20"><div className="mx-auto max-w-[1280px]"><div className="flex flex-wrap items-end justify-between gap-5"><Heading eyebrow="REGIONAL LESSONS" title="전국 지역별 수업" text="원하는 지역을 선택해 우리 아이에게 맞는 1:1 과외를 알아보세요." align="left"/><Link href="/regions" className="inline-flex items-center gap-2 text-sm font-black text-[#6736c8]">전국 지역 전체 보기 <ArrowRight className="h-4 w-4"/></Link></div><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">{navigationRegions.map(r=><Link key={r.slug} href={`/regions/${r.slug}`} className="flex h-11 items-center justify-center rounded-xl border border-[#dccffc] bg-white px-3 text-center text-sm font-black text-[#452080] transition hover:border-[#6736c8] hover:bg-[#f4efff]">{r.menuName}</Link>)}</div></div></section>
  </main><SiteFooter/>
 </div>
}

function Heading({eyebrow,title,text,align="center"}:{eyebrow:string;title:string;text?:string;align?:"center"|"left"}){return <div className={align==="center"?"text-center":"text-left"}><p className="text-xs font-black tracking-[.22em] text-[#7c3aed]">{eyebrow}</p><h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{title}</h2>{text&&<p className={`mt-5 text-base leading-7 text-slate-600 ${align==="center"?"mx-auto max-w-2xl":"max-w-2xl"}`}>{text}</p>}</div>}
