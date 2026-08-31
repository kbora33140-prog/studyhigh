import type { Metadata } from "next";
import batch from "../../data/manifests/daejeon/additional-50-20260901.json";

export const additionalTutoringRecords = batch.records;
export type AdditionalTutoringRecord = (typeof batch.records)[number];
export function getAdditionalTutoringRecord(city: string, district: string, dong: string, subject: string) {
  return additionalTutoringRecords.find(r => r.page.url === `/tutoring/${city}/${district}/${dong}/${subject}`);
}
export function additionalTutoringMetadata(r: AdditionalTutoringRecord): Metadata {
  return {
    title: { absolute: r.seo.title }, description: r.seo.description,
    keywords: r.seo.keywords, alternates: { canonical: r.seo.canonical },
    openGraph: { type: "website", url: r.page.canonical, title: r.seo.ogTitle,
      description: r.seo.ogDescription,
      images: [{ url: r.image.imageUrl, width: 1254, height: 1254, alt: r.image.alt, type: "image/png" }] },
    twitter: { card: "summary_large_image", title: r.seo.ogTitle, description: r.seo.ogDescription, images: [r.image.imageUrl] },
  };
}
