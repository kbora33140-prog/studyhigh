import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { ConsultationTimeline, SiteFooter } from "@/components/Marketing";
import { getRegionBySlug, regions } from "@/lib/regions";

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return {};

  return {
    title: `${region.name} 과외 | ${region.name} 방문과외·화상과외`,
    description: `${region.name} 지역 전과목과외, 수학과외, 영어과외, 국어과외, 과학과외, 검정고시과외를 스터디하이 1:1 맞춤과외로 상담하세요.`,
    alternates: { canonical: `/regions/${region.slug}` },
  };
}

export default async function RegionDetailPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) notFound();

  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Link href="/regions" className="text-sm font-black text-[#2b105f]">
              지역별 과외 전체 보기
            </Link>
            <h1 className="mt-8 text-5xl font-black tracking-normal sm:text-6xl">
              {region.name} 지역 과외
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">
              {region.examples} 등 {region.name} 주요 지역에서 방문과외 상담을
              진행합니다. 화상과외는 전국 어디서나 가능하며, 구와 동을 선택하면
              지역별 과목 페이지로 이동할 수 있습니다.
            </p>
          </div>
        </section>

        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-3xl font-black tracking-normal sm:text-5xl">
              {region.name} 전체 구·시 선택
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {region.districts.map((district) => (
                <Link
                  key={district.slug}
                  href={`/regions/${region.slug}/${district.slug}`}
                  className="rounded-[28px] bg-[#faf8ff] p-7 transition hover:-translate-y-1"
                >
                  <MapPin className="h-7 w-7 text-[#2b105f]" />
                  <h3 className="mt-6 text-2xl font-black">{district.name}</h3>
                  <p className="mt-3 leading-7 text-black/60">
                    {district.dongs.slice(0, 4).join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-3xl font-black tracking-normal sm:text-5xl">
              상담 과정
            </h2>
            <div className="mt-12">
              <ConsultationTimeline />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
