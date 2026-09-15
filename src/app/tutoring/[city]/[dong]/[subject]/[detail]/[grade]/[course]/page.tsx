import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdditionalTutoringPage } from "@/components/AdditionalTutoringPage";
import { getOfficialSchoolSample, officialSampleRecord } from "@/lib/officialSchoolSamples";
import { getNationwidePage, nationwideRecord } from "@/lib/nationwideTutoring";

type Props = { params: Promise<{ city: string; dong: string; subject: string; detail: string; grade: string; course: string }> };
export const dynamic = "force-dynamic";
export const revalidate = 86400;

function recordFor(params: Awaited<Props["params"]>) {
  const sample = getOfficialSchoolSample(params);
  if (sample) return officialSampleRecord(sample);
  const page = getNationwidePage({ province: params.city, district: params.dong, town: params.subject, school: params.detail, grade: params.grade, subject: params.course });
  return page ? nationwideRecord(page) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const record = recordFor(await params);
  if (!record) return {};
  return { title: { absolute: record.seo.title }, description: record.seo.description, keywords: record.seo.keywords, alternates: { canonical: record.seo.canonical }, openGraph: { type: "website", url: record.seo.canonical, title: record.seo.ogTitle, description: record.seo.ogDescription, images: [{ url: record.seo.ogImage, width: 1200, height: 1200, alt: record.image.alt, type: "image/webp" }] }, twitter: { card: "summary_large_image", title: record.seo.ogTitle, description: record.seo.ogDescription, images: [record.seo.ogImage] } };
}

export default async function NationwideTutoringPage({ params }: Props) {
  const record = recordFor(await params);
  if (!record) notFound();
  return <AdditionalTutoringPage record={record} relatedRecords={[record]} regionHref={`/regions/${record.region.provinceSlug}`} regionLabel={record.region.sido} />;
}
