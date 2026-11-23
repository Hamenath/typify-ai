"use client";

import { useState } from "react";
import { Download, Smartphone, X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadApkModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPwaPackage = () => {
    setDownloading(true);
    // Trigger download of the progressive web app configuration package
    setTimeout(() => {
      const pwaManifest = {
        name: "TYPIFY AI — Voice Typist Agent",
        short_name: "TYPIFY AI",
        description: "Speak Naturally. Type Intelligently. AI voice typing application.",
        start_url: "https://typify-ai.vercel.app/dashboard",
        display: "standalone",
        theme_color: "#7c3aed",
        background_color: "#ffffff",
      };
      const blob = new Blob([JSON.stringify(pwaManifest, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "typify-ai-mobile.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-white rounded-3xl shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 mb-4">
            <Smartphone className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Download TYPIFY AI Mobile
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Install TYPIFY AI directly on your Android phone as a native application or download the mobile package.
          </p>

          <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong>Android Direct Install:</strong> Open this website in Chrome on your phone, tap the browser menu (⋮), and tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong>iOS Install:</strong> Open in Safari, tap the <strong>Share</strong> button, and tap <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Button
              onClick={handleDownloadPwaPackage}
              disabled={downloading}
              className="w-full font-bold shadow-md shadow-violet-500/20 gap-2 h-11"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" /> Package Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Download Mobile Package (.json)
                </>
              )}
            </Button>
            <a
              href="/dashboard"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 hover:text-violet-700 hover:bg-violet-50 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              Open Web App Directly <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
