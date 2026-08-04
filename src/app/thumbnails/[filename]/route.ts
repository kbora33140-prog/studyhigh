import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const revalidate = 31536000;

const subtitles: Record<string, string[]> = {
  수학: [
    "기초부터 심화까지, 1:1 맞춤 수학 수업",
    "개념 이해부터 문제 해결까지, 단계별 맞춤 수학 수업",
    "학교 내신부터 수능까지, 빈틈없는 맞춤 수학 수업",
  ],
  영어: [
    "학교 내신부터 수능까지, 1:1 맞춤 영어 수업",
    "어휘부터 독해까지, 학생별 맞춤 영어 수업",
    "문장 이해부터 시험 대비까지, 체계적인 영어 수업",
  ],
  국어: [
    "개념부터 시험 대비까지, 1:1 맞춤 국어 수업",
    "독해 근거부터 서술형까지, 맞춤 국어 수업",
    "문학과 비문학을 연결하는, 단계별 국어 수업",
  ],
  과학: ["내신 완성, 1:1 맞춤 과학 수업", "개념부터 탐구까지, 이해 중심 과학 수업"],
  사회: ["개념 이해부터 문제 해결까지, 1:1 맞춤 사회 수업", "핵심 개념부터 내신까지, 맞춤 사회 수업"],
  한국사: ["시대 흐름부터 내신까지, 1:1 맞춤 한국사 수업", "핵심 사건부터 문제 적용까지, 맞춤 한국사 수업"],
  전과목: ["부족한 과목부터 학습 습관까지, 1:1 맞춤 수업", "학생의 현재 상황에 맞춘, 전과목 학습 관리"],
};

const featureSets: Record<string, string[][]> = {
  수학: [["필수 개념", "완벽 정리"], ["학교 내신", "집중 대비"], ["수학 실력", "단계별 향상"], ["학생 성향", "맞춤 지도"]],
  영어: [["핵심 어휘", "문장 연결"], ["학교별 시험", "집중 대비"], ["영어 독해", "실력 향상"], ["개별 피드백", "꼼꼼 제공"]],
  국어: [["교과 개념", "집중 학습"], ["지문 근거", "내신 대비"], ["국어 독해력", "단계별 향상"], ["학습 습관", "맞춤 관리"]],
  과학: [["필수 개념", "정확히 이해"], ["학교 내신", "완벽 대비"], ["과학 탐구력", "단계별 향상"], ["개별 진도", "맞춤 지도"]],
  사회: [["교과 개념", "흐름 정리"], ["학교별 시험", "집중 대비"], ["자료 해석력", "단계별 향상"], ["학생 성향", "맞춤 관리"]],
  한국사: [["시대 흐름", "완벽 정리"], ["학교 내신", "집중 대비"], ["사료 분석력", "단계별 향상"], ["개별 피드백", "꼼꼼 제공"]],
  전과목: [["부족한 개념", "우선 보완"], ["학교 내신", "통합 관리"], ["학습 실력", "단계별 향상"], ["학생 성향", "맞춤 지도"]],
};

const endings = [
  ["내신 향상을", "책임집니다."],
  ["학습 성장을", "함께합니다."],
  ["맞춤 학습을", "제공합니다."],
  ["실력 향상을", "도와드립니다."],
  ["공부의 변화를", "함께 만듭니다."],
];

function hash(value: string) {
  let result = 2166136261;
  for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619);
  return result >>> 0;
}

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
}

function centeredText(text: string, y: number, size: number, fill: string, weight = 800) {
  return `<text x="627" y="${y}" text-anchor="middle" font-family="Noto Sans KR, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(text)}</text>`;
}

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!filename.endsWith(".webp")) return new Response("Not found", { status: 404 });

  const url = new URL(request.url);
  const place = (url.searchParams.get("place") || "탄방동").slice(0, 12);
  const grade = (url.searchParams.get("grade") || "고등").slice(0, 8);
  const subject = (url.searchParams.get("subject") || "수학").slice(0, 8);
  const seed = url.searchParams.get("seed") || filename;
  const variant = hash(seed);
  const subjectKey = subtitles[subject] ? subject : "전과목";
  const subtitle = subtitles[subjectKey][variant % subtitles[subjectKey].length];
  const uniqueSubtitle = `${place} ${grade} 맞춤, ${subtitle}`;
  const features = featureSets[subjectKey];
  const ending = endings[(variant >>> 3) % endings.length];
  const headline = `${grade} ${subject}${subject === "전과목" ? "" : "과외"}`;
  const headlineSize = headline.length >= 9 ? 112 : headline.length >= 7 ? 132 : 158;
  const subtitleSize = uniqueSubtitle.length > 36 ? 31 : uniqueSubtitle.length > 30 ? 34 : 38;

  const labels = features.map((lines, index) => {
    const x = [282, 513, 741, 974][index];
    return `<rect x="${x - 105}" y="774" width="210" height="88" fill="#fbf8ff" fill-opacity="0.97"/>
      <text x="${x}" y="807" text-anchor="middle" font-family="Noto Sans KR, sans-serif" font-size="27" font-weight="700" fill="#170d2e">
        <tspan x="${x}">${escapeXml(lines[0])}</tspan><tspan x="${x}" dy="32">${escapeXml(lines[1])}</tspan>
      </text>`;
  }).join("");

  const overlay = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="badge" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#5421bd"/><stop offset="1" stop-color="#7a35d6"/></linearGradient></defs>
    <g transform="scale(0.956937799)">
    <rect x="447" y="84" width="354" height="119" rx="60" fill="url(#badge)"/>
    ${centeredText(place, 158, place.length > 7 ? 46 : 54, "#ffffff", 900)}
    <rect x="140" y="221" width="990" height="255" fill="#fbf8ff"/>
    ${centeredText(headline, 412, headlineSize, "#24113f", 900)}
    <rect x="230" y="486" width="800" height="79" fill="#fbf8ff"/>
    ${centeredText(uniqueSubtitle, 542, subtitleSize, "#24113f", 800)}
    ${labels}
    <rect x="211" y="917" width="402" height="113" rx="4" fill="#6530c8" fill-opacity="0.98"/>
    <text x="230" y="963" font-family="Noto Sans KR, sans-serif" font-size="25" font-weight="800" fill="#ffffff">
      <tspan x="230">${escapeXml(place)} ${escapeXml(grade)} 학생들의</tspan><tspan x="230" dy="42">${escapeXml(subject)} ${escapeXml(ending[0])} ${escapeXml(ending[1])}</tspan>
    </text></g>
  </svg>`);
  const overlayImage = await sharp(overlay).png().toBuffer();

  const template = await readFile(path.join(process.cwd(), "public", "thumbnails", "studyhigh-official-template.png"));
  const image = await sharp(template)
    .resize(1200, 1200, { fit: "fill" })
    .composite([{ input: overlayImage }])
    .webp({ quality: 72, effort: 5, smartSubsample: true })
    .toBuffer();

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${filename.replace(/[^a-z0-9.-]/gi, "-")}"`,
    },
  });
}
