"use client";

import { useMemo, useState } from "react";
import type { Region } from "@/lib/regions";

const POPULAR_DONG_LIMIT = 8;

export function CascadingRegionFields({ regions }: { regions: Region[] }) {
  const [regionSlug, setRegionSlug] = useState("");
  const [districtSlug, setDistrictSlug] = useState("");
  const [dong, setDong] = useState("");

  const selectedRegion = useMemo(
    () => regions.find((region) => region.slug === regionSlug),
    [regions, regionSlug],
  );

  const selectedDistrict = useMemo(
    () => selectedRegion?.districts.find((district) => district.slug === districtSlug),
    [selectedRegion, districtSlug],
  );

  const popularDongs = useMemo(
    () => selectedDistrict?.dongs.slice(0, POPULAR_DONG_LIMIT) || [],
    [selectedDistrict],
  );

  return (
    <>
      <label className="grid gap-2 text-sm font-bold text-black">
        시·도
        <select
          name="region"
          value={regionSlug}
          onChange={(event) => {
            setRegionSlug(event.target.value);
            setDistrictSlug("");
            setDong("");
          }}
          className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
        >
          <option value="" disabled>
            시·도를 선택하세요
          </option>
          {regions.map((region) => (
            <option key={region.slug} value={region.slug}>
              {region.name}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-bold text-black">
        시·군·구
        <select
          name="district"
          value={districtSlug}
          onChange={(event) => {
            setDistrictSlug(event.target.value);
            setDong("");
          }}
          disabled={!selectedRegion}
          className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition disabled:cursor-not-allowed disabled:text-black/35 focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
        >
          <option value="" disabled>
            {selectedRegion ? "시·군·구를 선택하세요" : "시·도를 먼저 선택하세요"}
          </option>
          {selectedRegion?.districts.map((district) => (
            <option key={district.slug} value={district.slug}>
              {district.name}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-bold text-black">
        동·면·읍
        <select
          name="dong"
          value={dong}
          onChange={(event) => setDong(event.target.value)}
          disabled={!selectedDistrict}
          className="h-12 rounded-2xl bg-[#f7f7fa] px-4 text-sm font-semibold text-black outline-none transition disabled:cursor-not-allowed disabled:text-black/35 focus:bg-white focus:ring-2 focus:ring-[#6736C8]"
        >
          <option value="" disabled>
            {selectedDistrict ? "동·면·읍을 선택하세요" : "시·군·구를 먼저 선택하세요"}
          </option>
          {popularDongs.map((dong) => (
            <option key={dong} value={dong}>
              {dong}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
