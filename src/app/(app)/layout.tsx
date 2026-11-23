"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Menu } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3.5 border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight">TYPIFY</span>
              <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-md">AI</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-0 bg-slate-50/70">{children}</main>
      </div>
    </div>
  );
}
