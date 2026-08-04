const SITE_URL = "https://studyhigh.co.kr";

export function getRegionThumbnailUrl({
  dong,
  dongSlug,
  grade,
  gradeSlug,
  subject,
  subjectSlug,
}: {
  dong: string;
  dongSlug: string;
  grade: string;
  gradeSlug: string;
  subject: string;
  subjectSlug: string;
}) {
  const query = new URLSearchParams({ dong, grade, subject, v: "2" });
  return `${SITE_URL}/region-thumbnails/${dongSlug}-${gradeSlug}-${subjectSlug}.png?${query.toString()}`;
}
