import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getValidatedTestSeoImage } from "@/lib/testSeoManifest";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const templatePromise = readFile(
  path.join(process.cwd(), "public", "thumbnails", "studyhigh-official-template.png"),
);
const fontPromise = readFile(
  path.join(process.cwd(), "public", "fonts", "malgunbd-subset.ttf"),
);

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  const record = getValidatedTestSeoImage(filename);
  if (!record) return new Response("Not found", { status: 404 });

  const dong = escapeXml(record.image.thumbnailText.eupmyeondong.slice(0, 12));
  const grade = escapeXml(record.image.thumbnailText.grade);
  const subject = escapeXml(record.page.subject);
  const [template, font] = await Promise.all([templatePromise, fontPromise]);
  const fontData = font.toString("base64");
  const subjectOverlay = record.page.subject === "수학" ? "" : `
    <rect x="120" y="215" width="970" height="250" fill="url(#paperPurple)"/>
    <text x="605" y="392" text-anchor="middle" font-size="174" fill="url(#headlinePurple)">${subject}과외</text>`;

  const overlay = Buffer.from(`<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topPurple" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5524be"/><stop offset="1" stop-color="#7834d6"/></linearGradient>
      <linearGradient id="bottomPurple" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6931c5"/><stop offset="1" stop-color="#5d29b8"/></linearGradient>
      <radialGradient id="paperPurple"><stop offset="0" stop-color="#f5effa"/><stop offset="1" stop-color="#f1e8f8"/></radialGradient>
      <linearGradient id="headlinePurple" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5421bd"/><stop offset="0.55" stop-color="#281144"/><stop offset="1" stop-color="#170b2f"/></linearGradient>
    </defs>
    <style>@font-face{font-family:Malgun;src:url(data:font/ttf;base64,${fontData})} text{font-family:Malgun,sans-serif;font-weight:700}</style>
    <rect x="426" y="80" width="350" height="114" rx="57" fill="url(#topPurple)"/>
    <text x="601" y="157" text-anchor="middle" font-size="52" fill="white">${dong}</text>
    ${subjectOverlay}
    <rect x="200" y="465" width="840" height="75" fill="url(#paperPurple)"/>
    <text x="600" y="512" text-anchor="middle" font-size="40" fill="#211039">기초부터 심화까지, 1:1 맞춤 ${grade} ${subject} 수업</text>
    <rect x="205" y="886" width="395" height="100" rx="2" fill="url(#bottomPurple)"/>
    <text x="221" y="925" font-size="27" fill="white">${dong} 학생들의</text>
    <text x="221" y="966" font-size="27" fill="white">성적 향상을 책임집니다.</text>
  </svg>`);

  const image = await sharp(template)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 88 })
    .toBuffer();

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Content-Length": String(image.byteLength),
    },
  });
}
