import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

const navItems = [
  { label: "맞춤수업", href: "/#tutoring" },
  { label: "지역별 수업", href: "/regions" },
];

export function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-xl">
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

        <div className="flex items-center justify-center gap-6 text-base font-extrabold text-black sm:gap-10 lg:text-lg">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-[#2b105f]">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden justify-self-end sm:block">
          <a
            href="tel:01025189245"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#16072f] px-4 text-sm font-black text-white shadow-lg shadow-[#16072f]/15 transition hover:-translate-y-0.5 hover:bg-black lg:h-12 lg:px-5 lg:text-base"
            aria-label="전화 상담 010-2518-9245"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            010-2518-9245
          </a>
        </div>
      </nav>
    </header>
  );
}
