import Image from "next/image";
import Link from "next/link";
import { UsersRound } from "lucide-react";

const navItems = [
  { label: "맞춤수업", href: "/#tutoring" },
  { label: "지역별 수업", href: "/regions" },
  { label: "상담 신청", href: "/#contact" },
];

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-[#e8dcff] bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="주요 메뉴"
        className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 lg:h-20 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="스터디하이 홈">
          <Image
            src="/studyhigh-logo-transparent.png"
            alt="스터디하이 로고"
            width={44}
            height={44}
            priority
            className="h-10 w-10 object-contain lg:h-11 lg:w-11"
          />
          <span className="text-xl font-black tracking-normal text-black lg:text-2xl">
            스터디하이
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-6 text-base font-extrabold text-[#0f172a] sm:flex sm:gap-8 lg:text-lg">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-[#7c3aed]">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden justify-self-end sm:block">
          <div className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e5d8ff] bg-[#f8f5ff] px-4 text-sm font-black text-[#0f172a] lg:h-12 lg:px-5 lg:text-base">
            <UsersRound className="h-4 w-4 text-[#7c3aed]" aria-hidden="true" />
            누적 방문자 353,112명
          </div>
        </div>
      </nav>
    </header>
  );
}
