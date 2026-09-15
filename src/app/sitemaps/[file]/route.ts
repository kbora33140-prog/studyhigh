import { nationwidePages, nationwidePageCount } from "@/lib/nationwideTutoring";

export const dynamic = "force-dynamic";
export const revalidate = 86400;
const shardSize = 40_000;

export function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  return params.then(({ file }) => {
    const match = /^nationwide-(\d+)\.xml$/.exec(file);
    const shard = match ? Number(match[1]) : -1;
    if (!Number.isInteger(shard) || shard < 0 || shard * shardSize >= nationwidePageCount) return new Response("Not found", { status: 404 });
    const start = shard * shardSize;
    const end = Math.min(start + shardSize, nationwidePageCount);
    const urls: string[] = [];
    let index = 0;
    for (const page of nationwidePages()) {
      if (index >= start && index < end) urls.push(`<url><loc>https://studyhigh.co.kr${page.url}</loc><lastmod>2026-09-14</lastmod></url>`);
      if (++index >= end) break;
    }
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
    return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } });
  });
}
