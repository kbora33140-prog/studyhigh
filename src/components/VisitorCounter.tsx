"use client";

import { useEffect, useState } from "react";
import { UsersRound } from "lucide-react";
import { VISITOR_BASE_COUNT } from "@/lib/visitorConstants";

export function VisitorCounter() {
  const [count, setCount] = useState(VISITOR_BASE_COUNT);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/visitor", { cache: "no-store", signal: controller.signal })
      .then((response) => response.json())
      .then((data: { count?: number }) => {
        if (Number.isFinite(data.count) && Number(data.count) >= VISITOR_BASE_COUNT) {
          setCount(Number(data.count));
        }
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return (
    <div className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e5d8ff] bg-[#f8f5ff] px-4 text-sm font-black text-[#0f172a] lg:h-12 lg:px-5 lg:text-base">
      <UsersRound className="h-4 w-4 text-[#7c3aed]" aria-hidden="true" />
      누적 방문자 {count.toLocaleString("ko-KR")}명
    </div>
  );
}
