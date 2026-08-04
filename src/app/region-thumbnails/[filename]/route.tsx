import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";

const copyBySubject: Record<string, { subtitle: string; labels: string[][]; bottom: string }> = {
  수학: {
    subtitle: "기초부터 심화까지, 1:1 맞춤 수학 수업",
    labels: [["개념 이해", "완벽 정리"], ["학교 내신", "완벽 대비"], ["수학 실력", "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]],
    bottom: "성적 향상을 책임집니다.",
  },
  영어: {
    subtitle: "어휘부터 독해까지, 1:1 맞춤 영어 수업",
    labels: [["필수 어휘", "완벽 정리"], ["학교 내신", "집중 대비"], ["영어 독해", "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]],
    bottom: "영어 실력 향상을 도와드립니다.",
  },
  국어: {
    subtitle: "개념부터 독해까지, 1:1 맞춤 국어 수업",
    labels: [["교과 개념", "집중 학습"], ["학교 내신", "완벽 대비"], ["국어 독해력", "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]],
    bottom: "국어 실력 향상을 함께합니다.",
  },
  과학: {
    subtitle: "개념부터 탐구까지, 1:1 맞춤 과학 수업",
    labels: [["필수 개념", "정확히 이해"], ["학교 내신", "집중 대비"], ["과학 탐구력", "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]],
    bottom: "과학 실력 향상을 도와드립니다.",
  },
  사회: {
    subtitle: "개념부터 자료 해석까지, 1:1 맞춤 사회 수업",
    labels: [["교과 개념", "흐름 정리"], ["학교 내신", "집중 대비"], ["자료 해석력", "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]],
    bottom: "사회 실력 향상을 함께합니다.",
  },
  한국사: {
    subtitle: "시대 흐름부터 내신까지, 1:1 맞춤 한국사 수업",
    labels: [["시대 흐름", "완벽 정리"], ["학교 내신", "집중 대비"], ["사료 분석력", "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]],
    bottom: "한국사 실력 향상을 도와드립니다.",
  },
  전과목: {
    subtitle: "부족한 과목부터 습관까지, 1:1 맞춤 학습 관리",
    labels: [["부족한 개념", "우선 보완"], ["학교 내신", "통합 관리"], ["학습 실력", "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]],
    bottom: "학습 성장을 함께합니다.",
  },
};

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!);
}

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!filename.endsWith(".png")) return new Response("Not found", { status: 404 });

  const url = new URL(request.url);
  const dong = (url.searchParams.get("dong") || "탄방동").slice(0, 12);
  const grade = (url.searchParams.get("grade") || "고등").slice(0, 8);
  const subject = (url.searchParams.get("subject") || "수학").slice(0, 8);
  const item = copyBySubject[subject] || copyBySubject.전과목;
  const headline = `${grade} ${subject}${subject === "전과목" ? "" : "과외"}`;
  const headlineSize = headline.length >= 9 ? 106 : headline.length >= 7 ? 124 : 145;
  const font = await readFile(path.join(process.cwd(), "public", "fonts", "NotoSansKR-VF.ttf"));
  const fontData = font.toString("base64");
  const labels = item.labels.map((lines, index) => {
    const x = [269, 487, 704, 929][index];
    return `<rect x="${x - 100}" y="740" width="201" height="84" fill="#fbf8ff"/>
      <text x="${x}" y="774" text-anchor="middle" class="label"><tspan x="${x}">${escapeXml(lines[0])}</tspan><tspan x="${x}" dy="31">${escapeXml(lines[1])}</tspan></text>`;
  }).join("");
  const overlay = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
    <style>
      @font-face { font-family: StudyHigh; src: url(data:font/ttf;base64,${fontData}); font-weight: 100 900; }
      text { font-family: StudyHigh, sans-serif; font-weight: 800; }
      .label { font-size: 26px; fill: #170d2e; }
    </style>
    <defs><linearGradient id="badge" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#5421bd"/><stop offset="1" stop-color="#7a35d6"/></linearGradient></defs>
    <rect x="428" y="80" width="339" height="114" rx="57" fill="url(#badge)"/>
    <text x="597" y="153" text-anchor="middle" font-size="52" fill="#fff">${escapeXml(dong)}</text>
    <rect x="134" y="211" width="947" height="244" fill="#fbf8ff"/>
    <text x="607" y="394" text-anchor="middle" font-size="${headlineSize}" fill="#211039">${escapeXml(headline)}</text>
    <rect x="220" y="465" width="765" height="76" fill="#fbf8ff"/>
    <text x="602" y="518" text-anchor="middle" font-size="${item.subtitle.length > 27 ? 34 : 39}" fill="#211039">${escapeXml(item.subtitle)}</text>
    ${labels}
    <rect x="202" y="877" width="385" height="108" fill="#6530c8"/>
    <text x="220" y="918" font-size="25" fill="#fff"><tspan x="220">${escapeXml(dong)} ${escapeXml(grade)} 학생들의</tspan><tspan x="220" dy="40">${escapeXml(item.bottom)}</tspan></text>
  </svg>`);
  const template = await readFile(path.join(process.cwd(), "public", "thumbnails", "studyhigh-official-template.png"));
  const image = await sharp(template).resize(1200, 1200, { fit: "fill" }).composite([{ input: overlay }]).png({ compressionLevel: 9 }).toBuffer();

  return new Response(new Uint8Array(image), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400, s-maxage=31536000" },
  });
}
