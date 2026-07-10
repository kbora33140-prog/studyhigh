"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { gradeOptions } from "@/lib/gradeLevels";
import { subjects, slugifyKorean, type Region } from "@/lib/regions";

type SearchResult = {
  region: Region;
  district: Region["districts"][number];
  dong: string;
};

export function RegionLessonSearchResults({ regions }: { regions: Region[] }) {
  const searchParams = useSearchParams();
  const regionSlug = searchParams.get("region") || "";
  const districtSlug = searchParams.get("district") || "";
  const dongName = searchParams.get("dong") || "";
  const gradeSlug = searchParams.get("grade") || "";
  const subjectSlug = searchParams.get("subject") || "";
  const schoolName = searchParams.get("school") || "";
  const requestType = searchParams.get("requestType") || "";
  const hasSearch = Array.from(searchParams.keys()).length > 0;

  if (!hasSearch) {
    return null;
  }

  const gradeLabel =
    gradeOptions.find((grade) => grade.value === gradeSlug)?.label.replace(/\s*\d학년$/, "") ||
    "맞춤";
  const subjectLabel = subjects.find((subject) => subject.slug === subjectSlug)?.name || "전과목";
  const lessonType = requestType || "1:1 맞춤수업";

  const results = regions.flatMap((region) => {
    if (regionSlug && region.slug !== regionSlug) {
      return [];
    }

    return region.districts.flatMap((district) => {
      if (districtSlug && district.slug !== districtSlug) {
        return [];
      }

      return district.dongs
        .filter((dong) => !dongName || dong === dongName)
        .map((dong) => ({ region, district, dong }));
    });
  });

  const visibleResults = results.slice(0, 24);

  return (
    <section id="region-results" className="mt-8 rounded-[1.55rem] bg-[#faf8ff] p-5 sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#6736C8]">
            SEARCH RESULTS
          </p>
          <h3 className="mt-3 text-2xl font-black text-black">검색 조건에 맞는 수업</h3>
        </div>
        <p className="text-sm font-bold text-black/55">
          {results.length}개 지역 중 {visibleResults.length}개 표시
        </p>
      </div>

      {schoolName ? (
        <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black/60">
          학교명: <span className="font-black text-black">{schoolName}</span>
        </p>
      ) : null}

      {visibleResults.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {visibleResults.map((result) => {
            const href = `/regions/${result.region.slug}/${result.district.slug}/${slugifyKorean(
              result.dong,
            )}/${gradeSlug || "high"}/${subjectSlug || "all"}`;

            return (
              <Link
                key={`${result.region.slug}-${result.district.slug}-${result.dong}`}
                href={href}
                className="group rounded-3xl bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(30,20,55,0.1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-black text-[#6736C8]">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {result.region.name} {result.district.name} {result.dong}
                    </div>
                    <p className="mt-3 text-lg font-black leading-7 text-black">
                      {result.dong} {gradeLabel} {subjectLabel} 과외
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-black/55">
                      {lessonType} 기준으로 방문과외와 화상과외 상담이 가능합니다.
                    </p>
                  </div>
                  <ArrowRight
                    className="mt-1 h-5 w-5 shrink-0 text-black/30 transition group-hover:translate-x-1 group-hover:text-[#6736C8]"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="mt-5 rounded-3xl bg-white p-5 text-sm font-semibold leading-6 text-black/60">
          선택한 조건과 정확히 일치하는 지역이 없습니다. 조건을 줄여서 다시 검색해 주세요.
        </p>
      )}
    </section>
  );
}
