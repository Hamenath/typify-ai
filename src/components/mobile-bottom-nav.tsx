"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Mic,
  Sparkles,
  History,
  Settings,
} from "lucide-react";

const MOBILE_NAV_ITEMS = [
  { href: "/dashboard", label: "Studio", icon: LayoutDashboard },
  { href: "/workspace", label: "Voice", icon: Mic },
  { href: "/ai-writer", label: "AI Write", icon: Sparkles },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 pb-[env(safe-area-inset-bottom,0px)] shadow-lg shadow-slate-900/5">
      <div className="flex items-center justify-around h-16 px-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-semibold transition-all duration-150 select-none active:scale-90",
                isActive ? "text-violet-700" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-xl transition-all",
                  isActive && item.href === "/workspace"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/30 -translate-y-2 p-2.5 scale-110"
                    : isActive
                    ? "bg-violet-100/70"
                    : ""
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && item.href === "/workspace" ? "text-white" : "")} />
              </div>
              <span className={cn("mt-0.5 tracking-tight", isActive ? "font-bold" : "font-medium")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
