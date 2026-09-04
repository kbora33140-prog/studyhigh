import { createHash } from "node:crypto";
export { VISITOR_BASE_COUNT, VISITOR_COOKIE_NAME, VISITOR_DEDUP_SECONDS } from "@/lib/visitorConstants";

const BOT_PATTERN = /bot|crawler|spider|slurp|bingpreview|headless|lighthouse|pagespeed|monitor|uptime|curl|wget|python-requests|axios|facebookexternalhit|naver|yeti|google-inspectiontool/i;

export function isAutomatedVisitor(userAgent: string) {
  return !userAgent.trim() || BOT_PATTERN.test(userAgent);
}

export function visitorKey(token: string) {
  return `studyhigh:visitor:${createHash("sha256").update(token).digest("hex")}`;
}

export function getRedisConfig() {
  const url = process.env.VISITOR_STORE_REST_URL
    ?? process.env.UPSTASH_REDIS_REST_URL
    ?? process.env.KV_REST_API_URL;
  const token = process.env.VISITOR_STORE_REST_TOKEN
    ?? process.env.UPSTASH_REDIS_REST_TOKEN
    ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}
