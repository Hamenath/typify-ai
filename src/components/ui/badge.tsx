import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        {
          "bg-violet-50 text-violet-700 border border-violet-200/70": variant === "default",
          "bg-slate-100 text-slate-700 border border-slate-200": variant === "secondary",
          "border border-slate-300 text-slate-600 bg-white": variant === "outline",
          "bg-emerald-50 text-emerald-700 border border-emerald-200/70": variant === "success",
          "bg-amber-50 text-amber-700 border border-amber-200/70": variant === "warning",
        },
        className
      )}
      {...props}
    />
  );
}
