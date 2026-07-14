import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import { ConsultationModal } from "@/components/ConsultationModal";
import { FloatingConsultButton } from "@/components/FloatingConsultButton";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studyhigh.example.com"),
  title: {
    default: "스터디하이 | 아이에게 맞는 선생님을 연결하는 프리미엄 교육 브랜드",
    template: "%s | 스터디하이",
  },
  description:
    "스터디하이는 아이 성향 분석을 바탕으로 방문과외, 화상과외, 검정고시, 코딩 수업에 맞는 선생님을 연결하는 프리미엄 1:1 교육 브랜드입니다.",
  keywords: [
    "스터디하이",
    "과외",
    "방문과외",
    "화상과외",
    "검정고시",
    "코딩",
    "무료상담",
  ],
  authors: [{ name: "스터디하이" }],
  creator: "스터디하이",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "스터디하이 | 아이에게 맞는 선생님이 성적을 만듭니다",
    description:
      "아이 성향을 먼저 분석하고 가장 잘 맞는 선생님을 연결하는 1:1 맞춤 교육 브랜드입니다.",
    url: "https://studyhigh.example.com",
    siteName: "스터디하이",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "스터디하이 | 프리미엄 1:1 맞춤 교육",
    description:
      "무료 상담으로 아이에게 맞는 선생님과 학습 방향을 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    naver: "581ab2f8a96a02f965cdfcdc63f82cb7d0d29618",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#fbf8ff] font-sans text-slate-950">
        {children}
        <ConsultationModal />
        <FloatingConsultButton />
      </body>
    </html>
  );
}
