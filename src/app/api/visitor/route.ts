import { randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import {
  getRedisConfig,
  isAutomatedVisitor,
  VISITOR_BASE_COUNT,
  VISITOR_COOKIE_NAME,
  VISITOR_DEDUP_SECONDS,
  visitorKey,
} from "@/lib/visitorCounter";

export const dynamic = "force-dynamic";

const COUNT_KEY = "studyhigh:visitor-count";
const COUNT_SCRIPT = `
if redis.call('EXISTS', KEYS[1]) == 0 then
  redis.call('SET', KEYS[1], ARGV[1])
end
if redis.call('SET', KEYS[2], '1', 'NX', 'EX', ARGV[2]) then
  return redis.call('INCR', KEYS[1])
end
return tonumber(redis.call('GET', KEYS[1]))
`;

function createRedis(config: { url: string; token: string }) {
  return new Redis({ url: config.url, token: config.token });
}

async function readCount(redis: Redis) {
  const count = await redis.get<number>(COUNT_KEY);
  return count === null ? VISITOR_BASE_COUNT : Number(count);
}

async function countVisitor(redis: Redis, key: string) {
  const count = await redis.eval(
    COUNT_SCRIPT,
    [COUNT_KEY, key],
    [VISITOR_BASE_COUNT, VISITOR_DEDUP_SECONDS],
  );
  return Number(count);
}

export async function GET(request: NextRequest) {
  const config = getRedisConfig();
  const userAgent = request.headers.get("user-agent") ?? "";

  if (!config) {
    return NextResponse.json(
      { count: VISITOR_BASE_COUNT, counted: false, persistent: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const redis = createRedis(config);
    if (isAutomatedVisitor(userAgent)) {
      const count = await readCount(redis);
      return NextResponse.json(
        { count, counted: false, persistent: true },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const existingToken = request.cookies.get(VISITOR_COOKIE_NAME)?.value;
    const token = existingToken ?? randomUUID();
    const count = await countVisitor(redis, visitorKey(token));
    const response = NextResponse.json(
      { count, counted: !existingToken, persistent: true },
      { headers: { "Cache-Control": "no-store" } },
    );

    if (!existingToken) {
      response.cookies.set(VISITOR_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  } catch (error) {
    console.error("Visitor counter error", error);
    return NextResponse.json(
      { count: VISITOR_BASE_COUNT, counted: false, persistent: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
