"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { VisitorCounter } from "@/components/VisitorCounter";
import { mainMenu } from "@/lib/siteNavigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        setMobileMenu(null);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeAll = () => {
    setDesktopMenu(null);
    setMobileMenu(null);
    setIsOpen(false);
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-[#E9E1F7] bg-white/95 backdrop-blur-xl">
      <nav aria-label="주요 메뉴" className="mx-auto flex h-16 max-w-[1440px] items-center gap-5 px-5 lg:h-20 lg:px-8">
        <Link href="/" onClick={closeAll} className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6736C8]" aria-label="스터디하이 홈">
          <Image src="/studyhigh-logo-transparent.png" alt="스터디하이 로고" width={44} height={44} priority className="h-10 w-10 object-contain" />
          <span className="text-xl font-black text-[#0F172A]">스터디하이</span>
        </Link>

        <div className="ml-auto hidden h-full items-stretch xl:flex">
          {mainMenu.map((item) => {
            const expanded = desktopMenu === item.label;
            return (
              <div key={item.label} className="relative flex items-center" onMouseEnter={() => setDesktopMenu(item.label)} onMouseLeave={() => setDesktopMenu(null)} onFocusCapture={() => setDesktopMenu(item.label)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopMenu(null); }}>
                <Link href={item.href} onClick={() => setDesktopMenu(null)} className="whitespace-nowrap rounded-lg px-3 py-3 text-sm font-extrabold text-[#39343F] transition hover:bg-[#F5F0FF] hover:text-[#6736C8] focus-visible:outline-2 focus-visible:outline-[#6736C8]">{item.label}</Link>
                <button type="button" onClick={() => setDesktopMenu(item.label)} aria-expanded={expanded} aria-label={`${item.label} 하위 메뉴 ${expanded ? "열림" : "열기"}`} className="mr-1 inline-flex h-9 w-7 items-center justify-center rounded-lg text-[#6B6470] hover:bg-[#F5F0FF] hover:text-[#6736C8] focus-visible:outline-2 focus-visible:outline-[#6736C8]">
                  <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded ? (
                  <div className="absolute left-1/2 top-full w-[290px] -translate-x-1/2 pt-2">
                    <div className="rounded-[20px] border border-[#E5D8FF] bg-white p-3 shadow-[0_24px_70px_rgba(43,16,95,0.16)]">
                      <Link href={item.href} onClick={closeAll} className="block rounded-xl bg-[#F5F0FF] px-4 py-3 text-sm font-black text-[#2B105F] hover:bg-[#EDE5FF]">{item.label} 전체 보기</Link>
                      <ul className="mt-2 grid gap-1">
                        {item.children.map((child) => <li key={child.href}><Link href={child.href} onClick={closeAll} className="block rounded-xl px-4 py-2.5 text-sm font-bold text-[#504857] transition hover:bg-[#F5F0FF] hover:text-[#6736C8] focus-visible:outline-2 focus-visible:outline-[#6736C8]">{child.label}</Link></li>)}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <OpenConsultationButton className="inline-flex h-11 items-center justify-center rounded-full bg-[#6736C8] px-5 text-sm font-black text-white transition hover:bg-[#5526B4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6736C8]">무료 상담 신청</OpenConsultationButton>
          <div className="hidden 2xl:block"><VisitorCounter /></div>
        </div>

        <button type="button" onClick={() => setIsOpen((open) => !open)} className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F0FF] text-[#2B105F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6736C8] xl:hidden" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div id="mobile-navigation" className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-[#E9E1F7] bg-white px-5 py-5 xl:hidden">
          <div className="mx-auto max-w-7xl">
            {mainMenu.map((item) => {
              const expanded = mobileMenu === item.label;
              return (
                <div key={item.label} className="border-b border-[#F0EAF9] py-1">
                  <div className="flex items-center gap-1">
                    <Link href={item.href} onClick={closeAll} className="flex-1 rounded-xl px-4 py-3 text-base font-black text-[#29252F] hover:bg-[#F5F0FF] hover:text-[#6736C8]">{item.label}</Link>
                    <button type="button" onClick={() => setMobileMenu(expanded ? null : item.label)} aria-expanded={expanded} aria-label={`${item.label} 하위 메뉴 ${expanded ? "닫기" : "열기"}`} className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F5FF] text-[#6736C8]"><ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} /></button>
                  </div>
                  {expanded ? <ul className="mb-2 grid gap-1 rounded-2xl bg-[#F8F5FF] p-2 sm:grid-cols-2">{item.children.map((child) => <li key={child.href}><Link href={child.href} onClick={closeAll} className="block rounded-xl px-3 py-2.5 text-sm font-bold text-[#504857] hover:bg-white hover:text-[#6736C8]">{child.label}</Link></li>)}</ul> : null}
                </div>
              );
            })}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link href="/regions" onClick={closeAll} className="inline-flex h-12 items-center justify-center rounded-xl border border-[#D8C8F4] text-sm font-black text-[#2B105F]">지역별 과외</Link>
              <Link href="/faq" onClick={closeAll} className="inline-flex h-12 items-center justify-center rounded-xl border border-[#D8C8F4] text-sm font-black text-[#2B105F]">자주 묻는 질문</Link>
              <OpenConsultationButton className="inline-flex h-12 items-center justify-center rounded-xl bg-[#6736C8] px-5 text-sm font-black text-white sm:col-span-2">무료 상담 신청</OpenConsultationButton>
            </div>
            <div className="mt-4 px-4"><VisitorCounter /></div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
