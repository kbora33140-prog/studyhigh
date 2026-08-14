import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const templatePromise = readFile(
  path.join(process.cwd(), "public", "thumbnails", "studyhigh-official-template.png"),
);
const fontPromise = readFile(
  path.join(process.cwd(), "public", "fonts", "malgunbd-subset.ttf"),
);

const gradeNames: Record<string, string> = {
  elementary: "초등", middle: "중등", high: "고등",
  "high-1": "고1", "high-2": "고2", "high-3": "고3",
};
const subjectNames: Record<string, string> = {
  math: "수학", english: "영어", korean: "국어", all: "전과목",
};

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dong = escapeXml((searchParams.get("dong") || "스터디하이").slice(0, 12));
  const grade = gradeNames[searchParams.get("grade") || ""] || "맞춤";
  const subject = subjectNames[searchParams.get("subject") || ""] || "과목";
  const headline = `${grade} ${subject}과외`;
  const headlineSize = headline.length >= 9 ? 84 : headline.length >= 7 ? 96 : 108;
  const subjectLine = subject === "전과목"
    ? "부족한 과목부터 내신까지, 1:1 맞춤 수업"
    : `${subject} 기초부터 내신까지, 1:1 맞춤 ${subject} 수업`;
  const skill = subject === "수학" ? "수학 실력" : subject === "영어" ? "영어 독해" : subject === "국어" ? "국어 독해력" : "전과목 실력";
  const [template, font] = await Promise.all([templatePromise, fontPromise]);
  const fontData = font.toString("base64");
  const overlay = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
    <style>@font-face{font-family:Malgun;src:url(data:font/ttf;base64,${fontData})} text{font-family:Malgun,sans-serif;font-weight:700}</style>
    <rect x="410" y="78" width="380" height="120" rx="60" fill="#6929d8"/><text x="600" y="157" text-anchor="middle" font-size="52" fill="white">${dong}</text>
    <rect x="130" y="210" width="950" height="245" fill="#fbf9ff"/><text x="605" y="369" text-anchor="middle" font-size="${headlineSize}" fill="#1b0b38">${headline}</text>
    <rect x="205" y="467" width="790" height="74" fill="#fbf9ff"/><text x="600" y="518" text-anchor="middle" font-size="34" fill="#1b0b38">${subjectLine}</text>
    <rect x="168" y="740" width="205" height="85" fill="#fbf9ff"/><text x="270" y="777" text-anchor="middle" font-size="23" fill="#1b0b38">필수 개념</text><text x="270" y="810" text-anchor="middle" font-size="23" fill="#1b0b38">완벽 정리</text>
    <rect x="388" y="740" width="205" height="85" fill="#fbf9ff"/><text x="490" y="777" text-anchor="middle" font-size="23" fill="#1b0b38">학교 내신</text><text x="490" y="810" text-anchor="middle" font-size="23" fill="#1b0b38">집중 대비</text>
    <rect x="608" y="740" width="205" height="85" fill="#fbf9ff"/><text x="710" y="777" text-anchor="middle" font-size="23" fill="#1b0b38">${skill}</text><text x="710" y="810" text-anchor="middle" font-size="23" fill="#1b0b38">단계별 향상</text>
    <rect x="828" y="740" width="205" height="85" fill="#fbf9ff"/><text x="930" y="777" text-anchor="middle" font-size="23" fill="#1b0b38">1:1 맞춤 지도</text><text x="930" y="810" text-anchor="middle" font-size="23" fill="#1b0b38">성향 맞춤 케어</text>
    <rect x="198" y="864" width="420" height="110" fill="#6929d8"/><text x="220" y="907" font-size="27" fill="white">${dong} ${grade} 학생들의</text><text x="220" y="950" font-size="27" fill="white">${subject} 실력 향상을 도와드립니다.</text>
  </svg>`);
  const image = await sharp(template)
    .resize(1200, 1200)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 84 })
    .toBuffer();

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(image.byteLength),
    },
  });
}
