import type { Metadata } from "next";
import batch from "../../data/manifests/national/expansion-50-20260903.json";

export const nationalTutoringRecords = batch.records;
export type NationalTutoringRecord = (typeof batch.records)[number];

export function getNationalTutoringRecord(city: string, district: string, dong: string, subject: string) {
  return nationalTutoringRecords.find(
    (record) => record.page.url === `/tutoring/${city}/${district}/${dong}/${subject}`,
  );
}

export function nationalTutoringMetadata(record: NationalTutoringRecord): Metadata {
  return {
    title: { absolute: record.seo.title },
    description: record.seo.description,
    keywords: record.seo.keywords,
    alternates: { canonical: record.seo.canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: record.page.canonical,
      title: record.seo.ogTitle,
      description: record.seo.ogDescription,
      images: [{ url: record.image.imageUrl, width: 1200, height: 1200, alt: record.image.alt, type: "image/webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: record.seo.ogTitle,
      description: record.seo.ogDescription,
      images: [record.image.imageUrl],
    },
  };
}
