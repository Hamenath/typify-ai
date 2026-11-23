import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-violet-600/20 text-violet-300 border border-violet-500/30": variant === "default",
          "bg-gray-700/50 text-gray-300 border border-gray-600/30": variant === "secondary",
          "border border-gray-600 text-gray-400": variant === "outline",
          "bg-green-600/20 text-green-300 border border-green-500/30": variant === "success",
          "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30": variant === "warning",
        },
        className
      )}
      {...props}
    />
  );
}
