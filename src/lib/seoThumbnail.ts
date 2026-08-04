const SITE_URL = "https://studyhigh.co.kr";

type ThumbnailInput = {
  dongSlug: string;
  dongName: string;
  gradeSlug: string;
  gradeName: string;
  subjectSlug: string;
  subjectName: string;
  seed?: string;
};

export function getSeoThumbnailUrl(input: ThumbnailInput) {
  const dongSlug = input.dongSlug.replace(/-dong$/, "");
  const filename = `${dongSlug}-${input.gradeSlug}-${input.subjectSlug}.webp`;
  const query = new URLSearchParams({
    place: input.dongName,
    grade: input.gradeName,
    subject: input.subjectName,
    seed: input.seed || filename,
  });

  return `${SITE_URL}/thumbnails/${filename}?${query.toString()}`;
}
