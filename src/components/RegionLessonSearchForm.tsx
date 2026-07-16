"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { CascadingRegionFields } from "@/components/CascadingRegionFields";
import { gradeOptions } from "@/lib/gradeLevels";
import { subjects, type Region } from "@/lib/regions";

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
        const request = String(formData.get("request") || "");

        const params = new URLSearchParams();

        if (region) params.set("region", region);
        if (district) params.set("district", district);
        if (dong) params.set("dong", dong);
        if (grade) params.set("grade", grade);
        if (subject) params.set("subject", subject);
        if (school) params.set("school", school);
        if (request) params.set("request", request);

        router.push(params.size ? `/regions?${params.toString()}#region-results` : "/regions");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <CascadingRegionFields regions={regions} />
        <SearchSelect label="학년" name="grade" options={gradeOptions} />
        <label className="grid gap-2 text-sm font-bold text-black">
          학교명
          <input
            name="school"
            placeholder="예: 둔산고, 대전중, 검정고시"
            className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
          />
        </label>
        <SearchSelect
          label="희망 과목"
          name="subject"
          options={subjects.map((subject) => ({
            label: subject.name,
            value: subject.slug,
          }))}
        />
      </div>

      <label className="grid gap-2 text-sm font-bold text-black">
        요청사항
        <textarea
          name="request"
          rows={3}
          placeholder="예: 내신대비, 수학 개념 보완, 숙제 관리, 방문수업 희망"
          className="resize-none rounded-2xl bg-[#f7f7fa] px-4 py-3 text-sm font-semibold leading-6 text-black outline-none transition placeholder:text-black/35 focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
        />
      </label>

      <button
        type="submit"
        className="mt-2 flex h-14 items-center justify-center gap-2 rounded-full bg-[#2b105f] px-6 text-base font-black text-white shadow-[0_18px_40px_rgba(43,16,95,0.25)] transition hover:-translate-y-0.5 hover:bg-black"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
        수업 검색하기
      </button>
      <p className="text-center text-xs font-semibold leading-5 text-black/45">
        지역을 선택하지 않아도 학교와 학년만으로 검색할 수 있습니다.
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
