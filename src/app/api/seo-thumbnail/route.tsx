/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const templatePromise = readFile(
  path.join(process.cwd(), "public", "thumbnails", "studyhigh-official-template.png"),
);
const fontPromise = readFile(path.join(process.cwd(), "public", "fonts", "malgunbd.ttf"));

const gradeNames: Record<string, string> = {
  elementary: "초등",
  middle: "중등",
  high: "고등",
  "high-1": "고1",
  "high-2": "고2",
  "high-3": "고3",
};

const subjectNames: Record<string, string> = {
  math: "수학",
  english: "영어",
  korean: "국어",
  all: "전과목",
};

const box = (left: number, top: number, width: number, height: number) => ({
  position: "absolute" as const,
  left,
  top,
  width,
  height,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dong = (searchParams.get("dong") || "스터디하이").slice(0, 12);
  const grade = gradeNames[searchParams.get("grade") || ""] || "맞춤";
  const subject = subjectNames[searchParams.get("subject") || ""] || "과목";
  const headline = `${grade} ${subject}과외`;
  const headlineSize = headline.length >= 9 ? 84 : headline.length >= 7 ? 96 : 108;
  const subjectLine =
    subject === "전과목"
      ? "부족한 과목부터 내신까지, 1:1 맞춤 수업"
      : `${subject} 기초부터 내신까지, 1:1 맞춤 ${subject} 수업`;
  const skill =
    subject === "수학"
      ? "수학 실력"
      : subject === "영어"
        ? "영어 독해"
        : subject === "국어"
          ? "국어 독해력"
          : "전과목 실력";
  const [template, font] = await Promise.all([templatePromise, fontPromise]);
  const templateUrl = `data:image/png;base64,${template.toString("base64")}`;

  return new ImageResponse(
    <div style={{ position: "relative", width: 1200, height: 1200, display: "flex", fontFamily: "Malgun" }}>
      <img src={templateUrl} alt="" width="1200" height="1200" style={{ position: "absolute", inset: 0 }} />
      <div style={{ ...box(410, 78, 380, 120), borderRadius: 60, background: "#6929d8", color: "white", fontSize: 52 }}>{dong}</div>
      <div style={{ ...box(130, 210, 950, 245), background: "#fbf9ff", color: "#1b0b38", fontSize: headlineSize }}>{headline}</div>
      <div style={{ ...box(205, 467, 790, 74), background: "#fbf9ff", color: "#1b0b38", fontSize: 34 }}>{subjectLine}</div>
      {[["필수 개념", "완벽 정리"], ["학교 내신", "집중 대비"], [skill, "단계별 향상"], ["1:1 맞춤 지도", "성향 맞춤 케어"]].map(([first, second], index) => (
        <div key={first} style={{ ...box(168 + index * 220, 740, 205, 85), flexDirection: "column", background: "#fbf9ff", color: "#1b0b38", fontSize: 23 }}>
          <div>{first}</div><div>{second}</div>
        </div>
      ))}
      <div style={{ ...box(198, 864, 420, 110), alignItems: "flex-start", flexDirection: "column", paddingLeft: 22, background: "#6929d8", color: "white", fontSize: 27 }}>
        <div>{dong} {grade} 학생들의</div>
        <div>{subject} 실력 향상을 도와드립니다.</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 1200,
      fonts: [{ name: "Malgun", data: font, weight: 700, style: "normal" }],
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    },
  );
}
