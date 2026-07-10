import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/Marketing";
import { getDistrict, getRegionBySlug, regions, slugifyKorean } from "@/lib/regions";

type DistrictPageProps = {
  params: Promise<{ slug: string; district: string }>;
};

export function generateStaticParams() {
  return regions.flatMap((region) =>
    region.districts.map((district) => ({
      slug: region.slug,
      district: district.slug,
    })),
  );
}

export async function generateMetadata({ params }: DistrictPageProps): Promise<Metadata> {
  const { slug, district: districtSlug } = await params;
  const region = getRegionBySlug(slug);
  const district = getDistrict(slug, districtSlug);
  if (!region || !district) return {};

  return {
    title: `${region.name} ${district.name} 과외 | 동별 1:1 맞춤과외`,
    description: `${region.name} ${district.name} 방문과외와 화상과외 상담을 동별로 확인하세요. 전과목, 국어, 수학, 영어, 과학, 사회, 한국사 과외를 제공합니다.`,
    alternates: { canonical: `/regions/${region.slug}/${district.slug}` },
  };
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const { slug, district: districtSlug } = await params;
  const region = getRegionBySlug(slug);
  const district = getDistrict(slug, districtSlug);
  if (!region || !district) notFound();

  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Link href={`/regions/${region.slug}`} className="text-sm font-black text-[#2b105f]">
              {region.name} 전체 구 보기
            </Link>
            <h1 className="mt-8 text-5xl font-black tracking-normal sm:text-6xl">
              {region.name} {district.name} 과외
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">
              {district.name}의 행정동을 선택하면 해당 동의 과목별 과외 페이지로
              이동합니다. 방문과외와 화상과외 모두 상담 가능합니다.
            </p>
          </div>
        </section>

        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-3xl font-black tracking-normal sm:text-5xl">
              {district.name} 동 선택
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {district.dongs.map((dong) => (
                <Link
                  key={dong}
                  href={`/regions/${region.slug}/${district.slug}/${slugifyKorean(dong)}`}
                  className="rounded-[24px] bg-[#faf8ff] p-6 transition hover:-translate-y-1"
                >
                  <MapPin className="h-6 w-6 text-[#2b105f]" />
                  <h3 className="mt-5 text-2xl font-black">{dong}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/55">
                    전과목 · 국어 · 수학 · 영어 · 과학
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
