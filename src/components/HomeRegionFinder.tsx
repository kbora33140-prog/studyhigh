"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { searchRegions } from "@/lib/searchRegions";

const gradeOptions = ["초등", "중등", "고등"];
const subjectOptions = ["국어", "영어", "수학", "과학"];

export function HomeRegionFinder() {
  const [regionSlug, setRegionSlug] = useState("");
  const [districtSlug, setDistrictSlug] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  const selectedRegion = useMemo(
    () => searchRegions.find((region) => region.slug === regionSlug),
    [regionSlug],
  );
  const selectedDistrict = useMemo(
    () => selectedRegion?.districts.find((district) => district.slug === districtSlug),
    [selectedRegion, districtSlug],
  );
  const isComplete = Boolean(selectedRegion && selectedDistrict && grade && subject);

  const openConsultation = () => {
    if (!selectedRegion || !selectedDistrict || !grade || !subject) return;

    window.dispatchEvent(
      new CustomEvent("studyhigh:open-consultation", {
        detail: {
          region: `${selectedRegion.name} ${selectedDistrict.name}`,
          grade,
          subject,
        },
      }),
    );
  };

  const selectClass =
    "h-14 min-w-0 rounded-2xl border border-[#DDD1F5] bg-white px-4 text-sm font-bold text-[#0F172A] outline-none transition focus:border-[#6736C8] focus:ring-4 focus:ring-[#6736C8]/10 disabled:cursor-not-allowed disabled:bg-white/55 disabled:text-black/35";

  return (
    <div className="rounded-[28px] border border-[#DDD1F5] bg-[#F5F0FF] p-5 shadow-[0_24px_70px_rgba(69,32,128,0.10)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6736C8] text-white">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-3xl font-black text-[#0F172A] sm:text-4xl">
            우리 동네 1:1 맞춤 과외 찾기
          </h2>
          <p className="mt-3 text-base font-medium leading-7 text-[#625D6B]">
            원하는 지역과 학년, 과목을 선택해 맞춤 과외를 알아보세요.
          </p>
        </div>
        <Link
          href="/regions"
          className="inline-flex items-center gap-2 text-sm font-black text-[#6736C8] hover:text-[#2B105F]"
        >
          전국 지역 전체 보기 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-[1.05fr_1.05fr_0.8fr_0.8fr_auto] lg:items-end">
        <label className="grid gap-2 text-sm font-black text-[#29252F]">
          시·도
          <select
            aria-label="시·도 선택"
            className={selectClass}
            value={regionSlug}
            onChange={(event) => {
              setRegionSlug(event.target.value);
              setDistrictSlug("");
            }}
          >
            <option value="">시·도 선택</option>
            {searchRegions.map((region) => (
              <option key={region.slug} value={region.slug}>{region.name}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-[#29252F]">
          시·군·구
          <select
            aria-label="시·군·구 선택"
            className={selectClass}
            value={districtSlug}
            disabled={!selectedRegion}
            onChange={(event) => setDistrictSlug(event.target.value)}
          >
            <option value="">{selectedRegion ? "시·군·구 선택" : "시·도 먼저 선택"}</option>
            {selectedRegion?.districts.map((district) => (
              <option key={district.slug} value={district.slug}>{district.name}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-[#29252F]">
          학년
          <select aria-label="학년 선택" className={selectClass} value={grade} onChange={(event) => setGrade(event.target.value)}>
            <option value="">학년 선택</option>
            {gradeOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-[#29252F]">
          과목
          <select aria-label="과목 선택" className={selectClass} value={subject} onChange={(event) => setSubject(event.target.value)}>
            <option value="">과목 선택</option>
            {subjectOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>

        <button
          type="button"
          disabled={!isComplete}
          onClick={openConsultation}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#6736C8] px-6 text-sm font-black text-white shadow-lg shadow-[#6736C8]/20 transition hover:-translate-y-0.5 hover:bg-[#5526B4] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
        >
          지역별 과외 알아보기 <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-4 text-xs font-medium leading-5 text-[#766F80]">
        선택한 정보는 상담 신청 화면에 자동으로 입력됩니다. 실제 수업 가능 여부는 상담 후 확인해 안내합니다.
      </p>
    </div>
  );
}
