"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ConsultationPrefill = {
  region?: string;
  grade?: string;
  subject?: string;
};

export function openConsultationModal(prefill?: ConsultationPrefill) {
  window.dispatchEvent(
    new CustomEvent("studyhigh:open-consultation", { detail: prefill || {} }),
  );
}

export function OpenConsultationButton({
  children = "무료 상담 신청",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => openConsultationModal()} className={cn(className)}>
      {children}
    </button>
  );
}
