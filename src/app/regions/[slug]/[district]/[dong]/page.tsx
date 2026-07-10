import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import {
  findDong,
  getDistrict,
  getRegionBySlug,
  regions,
  slugifyKorean,
  subjects,
} from "@/lib/regions";

type DongPageProps = {
  params: Promise<{ slug: string; district: string; dong: string }>;
};

export function generateStaticParams() {
  return regions.flatMap((region) =>
    region.districts.flatMap((district) =>
      district.dongs.map((dong) => ({
        slug: region.slug,
        district: district.slug,
        dong: slugifyKorean(dong),
      })),
    ),
  );
}

export async function generateMetadata({ params }: DongPageProps): Promise<Metadata> {
  const { slug, district: districtSlug, dong: dongSlug } = await params;
  const region = getRegionBySlug(slug);
  const district = getDistrict(slug, districtSlug);
  const dong = findDong(slug, districtSlug, dongSlug);
  if (!region || !district || !dong) return {};

  return {
    title: `${region.name} ${district.name} ${dong} 과외 | 과목별 1:1 맞춤과외`,
    description: `${dong} 전과목과외, 국어과외, 수학과외, 영어과외, 과학과외, 사회과외, 한국사 과외 상담 페이지입니다.`,
    alternates: { canonical: `/regions/${region.slug}/${district.slug}/${dongSlug}` },
  };
}

export default async function DongPage({ params }: DongPageProps) {
  const { slug, district: districtSlug, dong: dongSlug } = await params;
  const region = getRegionBySlug(slug);
  const district = getDistrict(slug, districtSlug);
  const dong = findDong(slug, districtSlug, dongSlug);
  if (!region || !district || !dong) notFound();

  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Link
              href={`/regions/${region.slug}/${district.slug}`}
              className="text-sm font-black text-[#2b105f]"
            >
              {district.name} 동 목록 보기
            </Link>
            <h1 className="mt-8 text-5xl font-black tracking-normal sm:text-6xl">
              {region.name} {district.name} {dong} 과외
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">
              {dong} 학생을 위한 전과목 1:1 맞춤과외입니다. 과목을 선택하면
              해당 지역과 과목에 맞춘 상담 페이지로 이동합니다.
            </p>
          </div>
        </section>

        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-3xl font-black tracking-normal sm:text-5xl">
              과목 선택
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {subjects.map((subject) => (
                <Link
                  key={subject.slug}
                  href={`/regions/${region.slug}/${district.slug}/${dongSlug}/${subject.slug}`}
                  className="rounded-[24px] bg-[#faf8ff] p-6 transition hover:-translate-y-1"
                >
                  <BookOpen className="h-6 w-6 text-[#2b105f]" />
                  <h3 className="mt-5 text-2xl font-black">{subject.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {dong} {subject.name} 1:1 맞춤과외
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
