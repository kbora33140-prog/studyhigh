export type District = {
  name: string;
  slug: string;
  dongs: string[];
};

export type Region = {
  name: string;
  slug: string;
  examples: string;
  districts: District[];
};

export const subjects = [
  { name: "전과목", slug: "all" },
  { name: "국어", slug: "korean" },
  { name: "수학", slug: "math" },
  { name: "영어", slug: "english" },
  { name: "과학", slug: "science" },
  { name: "사회", slug: "social" },
  { name: "한국사", slug: "history" },
];

export const regions: Region[] = [
  {
    name: "서울",
    slug: "seoul",
    examples: "강남·송파·노원",
    districts: [
      { name: "강남구", slug: "gangnam", dongs: ["대치동", "도곡동", "역삼동", "삼성동", "청담동", "논현동"] },
      { name: "서초구", slug: "seocho", dongs: ["서초동", "반포동", "잠원동", "방배동", "양재동"] },
      { name: "송파구", slug: "songpa", dongs: ["잠실동", "문정동", "가락동", "방이동", "석촌동"] },
      { name: "노원구", slug: "nowon", dongs: ["중계동", "상계동", "하계동", "월계동", "공릉동"] },
      { name: "강서구", slug: "gangseo", dongs: ["마곡동", "화곡동", "등촌동", "가양동", "염창동"] },
      { name: "양천구", slug: "yangcheon", dongs: ["목동", "신정동", "신월동"] },
    ],
  },
  {
    name: "경기",
    slug: "gyeonggi",
    examples: "분당·수원·일산",
    districts: [
      { name: "성남시", slug: "seongnam", dongs: ["분당동", "정자동", "서현동", "수내동"] },
      { name: "수원시", slug: "suwon", dongs: ["영통동", "광교동", "정자동", "매탄동"] },
      { name: "고양시", slug: "goyang", dongs: ["일산동", "마두동", "주엽동", "화정동"] },
    ],
  },
  {
    name: "인천",
    slug: "incheon",
    examples: "송도·부평·청라",
    districts: [
      { name: "연수구", slug: "yeonsu", dongs: ["송도동", "연수동", "동춘동"] },
      { name: "부평구", slug: "bupyeong", dongs: ["부평동", "삼산동", "청천동"] },
      { name: "서구", slug: "seo", dongs: ["청라동", "검암동", "가정동"] },
    ],
  },
  {
    name: "부산",
    slug: "busan",
    examples: "해운대·동래·수영",
    districts: [
      { name: "해운대구", slug: "haeundae", dongs: ["좌동", "우동", "중동"] },
      { name: "동래구", slug: "dongnae", dongs: ["명륜동", "온천동", "사직동"] },
      { name: "수영구", slug: "suyeong", dongs: ["광안동", "남천동", "망미동"] },
    ],
  },
  { name: "대구", slug: "daegu", examples: "수성·달서·중구", districts: [{ name: "수성구", slug: "suseong", dongs: ["범어동", "만촌동", "수성동"] }, { name: "달서구", slug: "dalseo", dongs: ["상인동", "월성동", "이곡동"] }] },
  {
    name: "대전",
    slug: "daejeon",
    examples: "둔산·유성·서구",
    districts: [
      { name: "서구", slug: "seo", dongs: ["갈마동", "둔산동", "탄방동", "도마동", "복수동", "관저동", "괴정동", "가수원동"] },
      { name: "유성구", slug: "yuseong", dongs: ["노은동", "봉명동", "도룡동", "전민동", "관평동"] },
      { name: "중구", slug: "jung", dongs: ["은행동", "대흥동", "태평동", "문화동"] },
      { name: "동구", slug: "dong", dongs: ["가오동", "용전동", "판암동", "신흥동"] },
      { name: "대덕구", slug: "daedeok", dongs: ["송촌동", "중리동", "신탄진동", "법동"] },
    ],
  },
  { name: "광주", slug: "gwangju", examples: "상무·수완·동구", districts: [{ name: "서구", slug: "seo", dongs: ["상무동", "화정동", "풍암동"] }, { name: "광산구", slug: "gwangsan", dongs: ["수완동", "첨단동", "운남동"] }] },
  { name: "울산", slug: "ulsan", examples: "남구·중구·동구", districts: [{ name: "남구", slug: "nam", dongs: ["삼산동", "옥동", "무거동"] }, { name: "중구", slug: "jung", dongs: ["성남동", "태화동", "우정동"] }] },
  { name: "세종", slug: "sejong", examples: "한솔·새롬·도담", districts: [{ name: "세종시", slug: "sejong", dongs: ["한솔동", "새롬동", "도담동", "아름동"] }] },
  { name: "충북", slug: "chungbuk", examples: "청주·충주·제천", districts: [{ name: "청주시", slug: "cheongju", dongs: ["복대동", "가경동", "율량동"] }, { name: "충주시", slug: "chungju", dongs: ["연수동", "칠금동", "교현동"] }] },
  { name: "충남", slug: "chungnam", examples: "천안·아산·서산", districts: [{ name: "천안시", slug: "cheonan", dongs: ["불당동", "쌍용동", "신부동"] }, { name: "아산시", slug: "asan", dongs: ["배방읍", "탕정면", "온천동"] }] },
  { name: "전북", slug: "jeonbuk", examples: "전주·익산·군산", districts: [{ name: "전주시", slug: "jeonju", dongs: ["효자동", "송천동", "서신동"] }, { name: "익산시", slug: "iksan", dongs: ["영등동", "모현동", "부송동"] }] },
  { name: "전남", slug: "jeonnam", examples: "목포·여수·순천", districts: [{ name: "목포시", slug: "mokpo", dongs: ["상동", "옥암동", "하당동"] }, { name: "순천시", slug: "suncheon", dongs: ["조례동", "연향동", "왕지동"] }] },
  { name: "경북", slug: "gyeongbuk", examples: "포항·구미·경산", districts: [{ name: "포항시", slug: "pohang", dongs: ["장성동", "양덕동", "이동"] }, { name: "구미시", slug: "gumi", dongs: ["송정동", "인동동", "옥계동"] }] },
  { name: "경남", slug: "gyeongnam", examples: "창원·김해·진주", districts: [{ name: "창원시", slug: "changwon", dongs: ["상남동", "중앙동", "팔용동"] }, { name: "김해시", slug: "gimhae", dongs: ["내동", "삼계동", "장유동"] }] },
  { name: "강원", slug: "gangwon", examples: "춘천·원주·강릉", districts: [{ name: "춘천시", slug: "chuncheon", dongs: ["퇴계동", "석사동", "후평동"] }, { name: "원주시", slug: "wonju", dongs: ["무실동", "단구동", "반곡동"] }] },
  { name: "제주", slug: "jeju", examples: "제주시·서귀포·노형", districts: [{ name: "제주시", slug: "jeju-si", dongs: ["노형동", "연동", "아라동"] }, { name: "서귀포시", slug: "seogwipo", dongs: ["동홍동", "서홍동", "중문동"] }] },
];

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug);
}

export function getDistrict(regionSlug: string, districtSlug: string) {
  return getRegionBySlug(regionSlug)?.districts.find(
    (district) => district.slug === districtSlug,
  );
}

export function slugifyKorean(value: string) {
  return encodeURIComponent(value);
}

export function normalizeKoreanSlug(value: string) {
  let normalized = value;

  for (let index = 0; index < 3; index += 1) {
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) {
        return decoded;
      }
      normalized = decoded;
    } catch {
      return normalized;
    }
  }

  return normalized;
}

export function findDong(regionSlug: string, districtSlug: string, dongSlug: string) {
  const district = getDistrict(regionSlug, districtSlug);
  const normalizedDongSlug = normalizeKoreanSlug(dongSlug);

  return district?.dongs.find((dong) => dong === normalizedDongSlug);
}
