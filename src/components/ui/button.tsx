import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-40 cursor-pointer active:scale-[0.98]",
          {
            "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-sm shadow-violet-500/20 hover:shadow-md hover:shadow-violet-500/30": variant === "default",
            "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 shadow-xs": variant === "secondary",
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-xs": variant === "outline",
            "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80": variant === "ghost",
            "bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-500/20": variant === "destructive",
            "text-violet-600 underline-offset-4 hover:underline p-0 h-auto font-semibold": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs rounded-lg": size === "sm",
            "h-12 px-6 text-base rounded-xl font-semibold": size === "lg",
            "h-10 w-10 p-0 rounded-xl": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
