"use client";

import { motion } from "framer-motion";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type MotionSectionProps = ComponentPropsWithoutRef<typeof motion.section>;

export function MotionSection({ className, ...props }: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    />
  );
}
