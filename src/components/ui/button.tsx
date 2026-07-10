import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#6736C8] text-white shadow-lg shadow-violet-700/25 hover:-translate-y-0.5 hover:bg-[#5526b4]",
        secondary:
          "border border-violet-200 bg-white text-violet-950 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-50",
        kakao: "bg-[#fee500] text-[#191600] hover:-translate-y-0.5 hover:bg-[#f4dc00]",
      },
      size: {
        default: "h-12 px-6",
        lg: "h-14 px-7 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
