"use client";

import { useMemo, useState } from "react";
import type { Region } from "@/lib/regions";

const POPULAR_DONG_LIMIT = 24;

const districtPriorityDongs: Record<string, string[]> = {
  "daejeon-서구": [
    "둔산동",
    "탄방동",
    "월평동",
    "용문동",
    "갈마동",
    "관저동",
    "도안동",
    "괴정동",
    "내동",
    "도마동",
    "복수동",
    "가수원동",
    "만년동",
    "정림동",
    "가장동",
    "변동",
  ],
  "daejeon-유성구": [
    "봉명동",
    "노은동",
    "전민동",
    "관평동",
    "도룡동",
    "궁동",
    "어은동",
    "죽동",
    "지족동",
    "반석동",
    "원신흥동",
    "상대동",
    "복용동",
    "학하동",
    "구암동",
    "장대동",
    "신성동",
    "문지동",
    "송강동",
    "원내동",
  ],
  "daejeon-동구": [
    "대동",
    "가양동",
    "가오동",
    "용전동",
    "판암동",
    "용운동",
    "성남동",
    "자양동",
    "신흥동",
    "천동",
    "홍도동",
    "신안동",
    "효동",
    "인동",
  ],
  "daejeon-중구": [
    "태평동",
    "문화동",
    "대흥동",
    "은행동",
    "선화동",
    "오류동",
    "용두동",
    "유천동",
    "중촌동",
    "목동",
    "석교동",
    "산성동",
    "문창동",
    "부사동",
  ],
  "daejeon-대덕구": [
    "송촌동",
    "중리동",
    "법동",
    "비래동",
    "오정동",
    "대화동",
    "석봉동",
    "신탄진동",
    "덕암동",
    "와동",
    "읍내동",
    "연축동",
  ],
};

const priorityDongs = [
  "둔산동",
  "탄방동",
  "월평동",
  "용문동",
  "갈마동",
  "관저동",
  "도안동",
  "괴정동",
  "내동",
  "도마동",
  "복수동",
  "가수원동",
  "만년동",
  "정림동",
  "가장동",
  "변동",
  "대치동",
  "목동",
  "중계동",
  "잠실동",
  "반포동",
  "분당동",
  "정자동",
  "서현동",
  "수내동",
  "판교동",
  "영통동",
  "광교동",
  "일산동",
  "마두동",
  "주엽동",
  "송도동",
  "청라동",
  "좌동",
  "우동",
  "범어동",
  "수성동",
  "봉명동",
  "노은동",
  "전민동",
  "관평동",
  "송촌동",
  "중리동",
  "태평동",
  "문화동",
  "가오동",
  "용전동",
  "판암동",
  "상무동",
  "수완동",
  "삼산동",
  "옥동",
  "무거동",
  "새롬동",
  "도담동",
  "한솔동",
  "복대동",
  "가경동",
  "율량동",
  "불당동",
  "쌍용동",
  "배방읍",
  "탕정면",
  "효자동",
  "송천동",
  "상동",
  "옥암동",
  "조례동",
  "연향동",
  "장성동",
  "양덕동",
  "상남동",
  "삼계동",
  "장유동",
  "무실동",
  "단구동",
  "노형동",
  "연동",
];

const lowResidentialDongs = new Set([
  "괴곡동",
  "매노동",
  "봉곡동",
  "산직동",
  "오동",
  "용촌동",
  "우명동",
  "원정동",
  "흑석동",
  "구도동",
  "낭월동",
  "내탑동",
  "대별동",
  "마산동",
  "비룡동",
  "사성동",
  "삼괴동",
  "상소동",
  "소호동",
  "신하동",
  "오동",
  "직동",
  "하소동",
  "구완동",
  "목달동",
  "무수동",
  "어남동",
  "정생동",
  "침산동",
  "호동",
]);

const priorityIndex = new Map(priorityDongs.map((dong, index) => [dong, index]));

function getPopularDongs(regionSlug: string, districtName: string, dongs: string[]) {
  const districtPriority = districtPriorityDongs[`${regionSlug}-${districtName}`] || [];
  const districtPriorityIndex = new Map(
    districtPriority.map((dong, index) => [dong, index]),
  );

  if (districtPriority.length > 0) {
    return districtPriority
      .filter((dong) => dongs.includes(dong) && !lowResidentialDongs.has(dong))
      .slice(0, POPULAR_DONG_LIMIT);
  }

  return [...dongs]
    .filter((dong) => !lowResidentialDongs.has(dong))
    .sort((a, b) => {
      const aDistrictIndex = districtPriorityIndex.get(a) ?? Number.MAX_SAFE_INTEGER;
      const bDistrictIndex = districtPriorityIndex.get(b) ?? Number.MAX_SAFE_INTEGER;

      if (aDistrictIndex !== bDistrictIndex) {
        return aDistrictIndex - bDistrictIndex;
      }

      const aIndex = priorityIndex.get(a) ?? Number.MAX_SAFE_INTEGER;
      const bIndex = priorityIndex.get(b) ?? Number.MAX_SAFE_INTEGER;

      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }

      return dongs.indexOf(a) - dongs.indexOf(b);
    })
    .slice(0, POPULAR_DONG_LIMIT);
}

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
    () =>
      selectedRegion && selectedDistrict
        ? getPopularDongs(selectedRegion.slug, selectedDistrict.name, selectedDistrict.dongs)
        : [],
    [selectedRegion, selectedDistrict],
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
