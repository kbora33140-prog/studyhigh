import { nationwidePageCount } from "@/lib/nationwideTutoring";

export const dynamic = "force-dynamic";
export const revalidate = 86400;
const shardSize = 40_000;

export function GET() {
  const count = Math.ceil(nationwidePageCount / shardSize);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Array.from({ length: count }, (_, i) => `<sitemap><loc>https://studyhigh.co.kr/sitemaps/nationwide-${i}.xml</loc></sitemap>`).join("")}</sitemapindex>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } });
}
