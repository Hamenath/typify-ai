import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { SmoothScrollProvider } from "@/components/smooth-scroll";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TYPIFY AI — Speak Naturally. Type Intelligently.",
  description:
    "AI-powered voice typing application. Convert speech to text, improve writing with AI, and boost your productivity.",
  keywords: ["voice typing", "speech to text", "AI writing", "transcription", "Gemini AI", "PWA"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TYPIFY AI",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-violet-100 selection:text-violet-900 overscroll-none">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster />
      </body>
    </html>
  );
}
