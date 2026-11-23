"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Mic,
  LayoutDashboard,
  Sparkles,
  History,
  Settings,
  Info,
  Keyboard,
  X,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workspace", label: "Voice Typing", icon: Mic },
  { href: "/ai-writer", label: "AI Writer", icon: Sparkles },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/about", label: "About", icon: Info },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto shadow-sm lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/25 group-hover:scale-105 transition-transform duration-200">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 border-2 border-white rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-slate-900 text-lg tracking-tight">TYPIFY</h1>
                <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-1.5 py-0.2 rounded tracking-wider">AI</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">Voice Typist Agent</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Workspace
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group",
                  isActive
                    ? "bg-violet-50 text-violet-700 shadow-xs border border-violet-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Pro Banner / Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/15">
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold tracking-wide">Gemini 3.5 AI Enabled</span>
            </div>
            <p className="text-[11px] text-violet-100 leading-snug">
              Speak naturally, type intelligently in English and Tamil.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
