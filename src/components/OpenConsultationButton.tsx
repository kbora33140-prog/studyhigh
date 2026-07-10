"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function openConsultationModal() {
  window.dispatchEvent(new Event("studyhigh:open-consultation"));
}

export function OpenConsultationButton({
  children = "무료 상담 신청",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openConsultationModal} className={cn(className)}>
      {children}
    </button>
  );
}
