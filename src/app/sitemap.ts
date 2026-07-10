import type { MetadataRoute } from "next";
import { gradeGroups } from "@/lib/gradeLevels";
import { regions, slugifyKorean, subjects } from "@/lib/regions";
import { searchRegions } from "@/lib/searchRegions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studyhigh.example.com";
  const daejeonRegion = searchRegions.find((region) => region.slug === "daejeon");

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ged`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/coding`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/regions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...regions.map((region) => ({
      url: `${baseUrl}/regions/${region.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...regions.flatMap((region) =>
      region.districts.flatMap((district) => [
        {
          url: `${baseUrl}/regions/${region.slug}/${district.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.65,
        },
        ...district.dongs.flatMap((dong) => [
          {
            url: `${baseUrl}/regions/${region.slug}/${district.slug}/${slugifyKorean(dong)}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
          ...subjects.map((subject) => ({
            url: `${baseUrl}/regions/${region.slug}/${district.slug}/${slugifyKorean(dong)}/${subject.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.55,
          })),
        ]),
      ]),
    ),
    ...(daejeonRegion
      ? daejeonRegion.districts.flatMap((district) =>
          district.dongs.flatMap((dong) =>
            gradeGroups.flatMap((grade) =>
              subjects.map((subject) => ({
                url: `${baseUrl}/regions/${daejeonRegion.slug}/${district.slug}/${slugifyKorean(dong)}/${grade.slug}/${subject.slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.58,
              })),
            ),
          ),
        )
      : []),
  ];
}
