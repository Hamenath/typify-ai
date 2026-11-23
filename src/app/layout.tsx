import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TYPIFY AI — Speak Naturally. Type Intelligently.",
  description:
    "AI-powered voice typing application. Convert speech to text, improve writing with AI, and boost your productivity.",
  keywords: ["voice typing", "speech to text", "AI writing", "transcription", "Gemini AI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-200">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
