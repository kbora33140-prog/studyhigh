import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ConsultationTimeline, SiteFooter } from "@/components/Marketing";
import { OpenConsultationButton } from "@/components/OpenConsultationButton";
import { buttonVariants } from "@/components/ui/button";
import {
  findDong,
  getDistrict,
  getRegionBySlug,
  regions,
  slugifyKorean,
  subjects,
} from "@/lib/regions";

type SubjectShortcutPageProps = {
  params: Promise<{ slug: string; district: string; dong: string; grade: string }>;
};

export function generateStaticParams() {
  return regions.flatMap((region) =>
    region.districts.flatMap((district) =>
      district.dongs.flatMap((dong) =>
        subjects.map((subject) => ({
          slug: region.slug,
          district: district.slug,
          dong: slugifyKorean(dong),
          grade: subject.slug,
        })),
      ),
    ),
  );
}

export async function generateMetadata({
  params,
}: SubjectShortcutPageProps): Promise<Metadata> {
  const { slug, district: districtSlug, dong: dongSlug, grade: subjectSlug } = await params;
  const region = getRegionBySlug(slug);
  const district = getDistrict(slug, districtSlug);
  const dong = findDong(slug, districtSlug, dongSlug);
  const subject = subjects.find((item) => item.slug === subjectSlug);
  if (!region || !district || !dong || !subject) return {};

  return {
    title: `${region.name} ${district.name} ${dong} ${subject.name} 과외`,
    description: `${region.name} ${district.name} ${dong} ${subject.name} 1:1 맞춤과외 상담 페이지입니다. 방문과외와 화상과외 모두 상담 가능합니다.`,
    alternates: {
      canonical: `/regions/${region.slug}/${district.slug}/${dongSlug}/${subject.slug}`,
    },
  };
}

export default async function SubjectShortcutPage({ params }: SubjectShortcutPageProps) {
  const { slug, district: districtSlug, dong: dongSlug, grade: subjectSlug } = await params;
  const region = getRegionBySlug(slug);
  const district = getDistrict(slug, districtSlug);
  const dong = findDong(slug, districtSlug, dongSlug);
  const subject = subjects.find((item) => item.slug === subjectSlug);
  if (!region || !district || !dong || !subject) notFound();

  return (
    <>
      <Header />
      <main className="bg-white text-black">
        <section className="bg-[#f7f4ff] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Link
              href={`/regions/${region.slug}/${district.slug}/${dongSlug}`}
              className="text-sm font-black text-[#2b105f]"
            >
              {dong} 과목 목록 보기
            </Link>
            <h1 className="mt-8 text-5xl font-black tracking-normal sm:text-6xl">
              {region.name} {district.name} {dong}
              <br />
              {subject.name} 과외
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/65">
              {dong} 학생을 위한 {subject.name} 1:1 맞춤과외입니다. 현재 학습 수준,
              내신 대비, 수행평가, 수능 대비, 공부 습관까지 함께 확인하고 수업 방향을
              설계합니다.
            </p>
            <OpenConsultationButton
              className={buttonVariants({ size: "lg", className: "mt-10 bg-[#16072f]" })}
            >
              무료 상담 신청
            </OpenConsultationButton>
          </div>
        </section>

        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-3xl font-black tracking-normal sm:text-5xl">상담 과정</h2>
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
