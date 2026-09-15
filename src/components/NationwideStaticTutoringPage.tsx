import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdditionalTutoringPage } from "@/components/AdditionalTutoringPage";
import { getNationwidePage, nationwideRecord } from "@/lib/nationwideTutoring";

export type NationwideStaticRoute = {
  province: string;
  district: string;
  town: string;
  school: string;
  grade: string;
  subject: string;
};

function recordFor(route: NationwideStaticRoute) {
  const page = getNationwidePage(route);
  return page ? nationwideRecord(page) : null;
}

export function metadataForNationwideStaticRoute(route: NationwideStaticRoute): Metadata {
  const record = recordFor(route);
  if (!record) return {};
  return {
    title: { absolute: record.seo.title },
    description: record.seo.description,
    keywords: record.seo.keywords,
    alternates: { canonical: record.seo.canonical },
    openGraph: {
      type: "website",
      url: record.seo.canonical,
      title: record.seo.ogTitle,
      description: record.seo.ogDescription,
      images: [{ url: record.seo.ogImage, width: 1200, height: 1200, alt: record.image.alt, type: "image/webp" }],
    },
    twitter: { card: "summary_large_image", title: record.seo.ogTitle, description: record.seo.ogDescription, images: [record.seo.ogImage] },
  };
}

export function NationwideStaticTutoringPage({ route }: { route: NationwideStaticRoute }) {
  const record = recordFor(route);
  if (!record) notFound();
  return <AdditionalTutoringPage record={record} relatedRecords={[record]} regionHref={`/regions/${record.region.provinceSlug}`} regionLabel={record.region.sido} />;
}
