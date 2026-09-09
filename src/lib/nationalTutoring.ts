import type { Metadata } from "next";
import firstBatch from "../../data/manifests/national/expansion-50-20260903.json";
import secondBatch from "../../data/manifests/national/expansion-50-20260907.json";
import thirdBatch from "../../data/manifests/national/expansion-50-20260908.json";
import dailyBatch20260909 from "../../data/manifests/daily-50-20260909.json";

export const nationalTutoringRecords = [
  ...firstBatch.records,
  ...secondBatch.records,
  ...thirdBatch.records,
  ...dailyBatch20260909.records,
];
export type NationalTutoringRecord = (typeof nationalTutoringRecords)[number];

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
