import manifestData from "../../data/manifests/daejeon/test-30-v1.json";

export type TestSeoManifestRecord = (typeof manifestData.records)[number];

export const validatedTestSeoRecords = manifestData.records.filter(
  (record) => record.status === "validated",
);

export function getValidatedTestSeoRecord(
  city: string,
  district: string,
  dong: string,
  subject: string,
) {
  const url = `/tutoring/${city}/${district}/${dong}/${subject}`;
  return validatedTestSeoRecords.find((record) => record.page.url === url);
}

export function getValidatedTestSeoImage(filename: string) {
  const imagePath = `/seo-images/draft/${filename}`;
  return validatedTestSeoRecords.find((record) => record.image.imagePath === imagePath);
}
