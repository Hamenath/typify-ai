"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-16 lg:pb-0">
        {/* Mobile top app bar with native app header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 hover:text-slate-900 p-1.5 rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-base tracking-tight">TYPIFY</span>
              <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-md">AI</span>
            </div>
          </div>
          <Link
            href="/workspace"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold border border-violet-200/70 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Voice Studio</span>
          </Link>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-slate-50/70">{children}</main>

        {/* Native Mobile Bottom Navigation Bar */}
        <MobileBottomNav />
      </div>
    </div>
  );
}
