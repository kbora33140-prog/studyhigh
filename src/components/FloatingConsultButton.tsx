"use client";

import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { openConsultationModal } from "@/components/OpenConsultationButton";

export function FloatingConsultButton() {
  return (
    <div className="fixed bottom-[calc(18px+env(safe-area-inset-bottom))] right-4 z-[100] flex flex-col items-end gap-2 sm:right-6 lg:right-8">
      <motion.button
        type="button"
        onClick={openConsultationModal}
        whileHover={{ scale: 1.035 }}
        whileTap={{ scale: 0.97 }}
        className="h-14 rounded-full bg-[#2b105f] px-6 text-base font-black text-white shadow-2xl shadow-black/25 transition-colors hover:bg-[#3b176f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6736C8] focus-visible:ring-offset-2"
        aria-label="무료 상담 신청 창 열기"
      >
        무료 상담 신청
      </motion.button>

      <div className="flex gap-2">
        <motion.a
          href="http://pf.kakao.com/_xcvMin/chat"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fee500] text-black shadow-xl shadow-black/15 transition hover:bg-[#f4dc00]"
          aria-label="카카오 상담"
        >
          <MessageCircle className="h-5 w-5" />
        </motion.a>
        <motion.a
          href="tel:01025189245"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2b105f] shadow-xl shadow-black/15 ring-1 ring-black/10 transition hover:bg-violet-50"
          aria-label="전화 상담"
        >
          <Phone className="h-5 w-5" />
        </motion.a>
      </div>
    </div>
  );
}
