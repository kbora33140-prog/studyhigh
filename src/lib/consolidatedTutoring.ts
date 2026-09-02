import type { Metadata } from "next";
import batch from "../../data/manifests/daejeon/consolidated-15-20260902.json";

export const consolidatedTutoringRecords = batch.records;
export type ConsolidatedTutoringRecord = (typeof batch.records)[number];

export function getConsolidatedTutoringRecord(
  city: string,
  district: string,
  dong: string,
  subject: string,
) {
  return consolidatedTutoringRecords.find(
    (record) => record.page.url === `/tutoring/${city}/${district}/${dong}/${subject}`,
  );
}

export function consolidatedTutoringMetadata(record: ConsolidatedTutoringRecord): Metadata {
  return {
    title: { absolute: record.seo.title },
    description: record.seo.description,
    keywords: record.seo.keywords,
    alternates: { canonical: record.seo.canonical },
    openGraph: {
      type: "website",
      url: record.page.canonical,
      title: record.seo.ogTitle,
      description: record.seo.ogDescription,
      images: [{
        url: record.image.imageUrl,
        width: 1254,
        height: 1254,
        alt: record.image.alt,
        type: "image/png",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: record.seo.ogTitle,
      description: record.seo.ogDescription,
      images: [record.image.imageUrl],
    },
  };
}
