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
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/25": variant === "default",
            "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700": variant === "secondary",
            "border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white": variant === "outline",
            "text-gray-400 hover:text-white hover:bg-gray-800/50": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700": variant === "destructive",
            "text-violet-400 underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
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
