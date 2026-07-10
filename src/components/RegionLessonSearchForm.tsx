"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CascadingRegionFields } from "@/components/CascadingRegionFields";
import { gradeOptions } from "@/lib/gradeLevels";
import { subjects, type Region } from "@/lib/regions";

const requestTypes = ["내신대비", "학습관리", "정시대비", "검정고시", "기타"];

export function RegionLessonSearchForm({ regions }: { regions: Region[] }) {
  const router = useRouter();

  return (
    <form
      className="mt-7 grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const region = String(formData.get("region") || "");
        const district = String(formData.get("district") || "");
        const dong = String(formData.get("dong") || "");
        const grade = String(formData.get("grade") || "");
        const subject = String(formData.get("subject") || "");
        const school = String(formData.get("school") || "");
        const requestType = String(formData.get("requestType") || "");

        const params = new URLSearchParams();

        if (region) params.set("region", region);
        if (district) params.set("district", district);
        if (dong) params.set("dong", dong);
        if (grade) params.set("grade", grade);
        if (subject) params.set("subject", subject);
        if (school) params.set("school", school);
        if (requestType) params.set("requestType", requestType);

        router.push(params.size ? `/regions?${params.toString()}#region-results` : "/regions");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <CascadingRegionFields regions={regions} />
        <label className="grid gap-2 text-sm font-bold text-black">
          학교명
          <input
            name="school"
            placeholder="학교명을 입력하세요"
            className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
          />
        </label>
        <SearchSelect label="학년" name="grade" options={gradeOptions} />
        <SearchSelect
          label="과목"
          name="subject"
          options={subjects.map((subject) => ({
            label: subject.name,
            value: subject.slug,
          }))}
        />
      </div>

      <SearchSelect
        label="요청수업"
        name="requestType"
        options={requestTypes.map((type) => ({ label: type, value: type }))}
      />

      <button
        type="submit"
        className="mt-2 flex h-14 items-center justify-center gap-2 rounded-full bg-[#2b105f] px-6 text-base font-black text-white shadow-[0_18px_40px_rgba(43,16,95,0.25)] transition hover:-translate-y-0.5 hover:bg-black"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
        수업 검색하기
      </button>
      <p className="text-center text-xs font-semibold leading-5 text-black/45">
        검색 조건에 맞는 지역별 수업 페이지로 이동합니다.
      </p>
    </form>
  );
}

function SearchSelect({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: Array<{ label: string; value: string }>;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-black">
      {label}
      <select
        name={name}
        defaultValue=""
        required={required}
        className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
      >
        <option value="" disabled>
          선택하세요
        </option>
        {options.map((option) => (
          <option key={`${name}-${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
