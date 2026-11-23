"use client";

import Link from "next/link";
import {
  Mic,
  Sparkles,
  Languages,
  FileText,
  Keyboard,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  Mail,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Mic,
    title: "Voice-to-Text",
    description: "Real-time speech recognition powered by browser APIs and Gemini AI audio transcription.",
  },
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description: "Grammar correction, professional rewriting, summarization and intelligent text expansion.",
  },
  {
    icon: Languages,
    title: "Multi-Language",
    description: "Support for English and Tamil with accurate translation between both languages.",
  },
  {
    icon: Mail,
    title: "Email Mode",
    description: "Convert raw voice notes into structured, professional emails with formal greetings and closings.",
  },
  {
    icon: MessageCircle,
    title: "Message Mode",
    description: "Transform voice input into casual WhatsApp, Slack, and social chat formats instantly.",
  },
  {
    icon: BookOpen,
    title: "Academic Writing",
    description: "Scholarly tone with precise language tailored for research papers and reports.",
  },
  {
    icon: FileText,
    title: "Export & History",
    description: "Instant .txt file download, clipboard sync, and searchable local transcript history.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "API keys stay securely on the server. Your transcripts remain confidential in local storage.",
  },
];

const MODES = [
  "General",
  "Professional",
  "Casual",
  "Academic",
  "Email",
  "Social Media",
  "Developer Docs",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 bg-grid text-slate-900 selection:bg-violet-100 selection:text-violet-900">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/20">
                  <Keyboard className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 border-2 border-white rounded-full animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight">TYPIFY</span>
                  <span className="text-[10px] font-bold bg-violet-100 text-violet-700 px-1.5 py-0.2 rounded tracking-wider">AI</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Voice Typist Agent</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/about">
                <Button variant="ghost" size="sm" className="font-medium">About</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="font-semibold gap-1.5 shadow-sm">
                  Launch Studio <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Soft background glow circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-violet-200/40 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 lg:pt-28 lg:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200/80 text-violet-700 text-xs font-semibold mb-8 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-violet-600" />
              <span>Next-Gen AI Voice Typist & Rewriter</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Speak Naturally. <br />
              <span className="gradient-text">Type Intelligently.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Dictate with real-time speech recognition, transcribe audio with Google Gemini,
              and transform raw thoughts into polished, professional writing in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/dashboard">
                <Button size="lg" className="px-8 font-semibold shadow-md gap-2">
                  <Mic className="w-5 h-5" />
                  Start Voice Typing Free
                </Button>
              </Link>
              <Link href="/ai-writer">
                <Button variant="outline" size="lg" className="px-8 font-semibold gap-2 border-slate-300">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  Try AI Writing Assistant
                </Button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mt-14 text-xs font-semibold text-slate-500 flex-wrap">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-violet-600" />
                <span>English & Tamil Supported</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Powered by Gemini 3.5 AI</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Zero Audio Retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-slate-200/80 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Engineered for <span className="gradient-text">effortless productivity</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything students, developers, and professionals need for faster dictation and writing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-violet-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-4 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-base">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Writing Modes */}
      <section className="py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            7 Tailored Writing Modes
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
            Switch styles on the fly to match your audience and communication channel.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {MODES.map((mode) => (
              <span
                key={mode}
                className="px-5 py-2.5 rounded-full bg-white border border-slate-200 font-semibold text-sm text-slate-700 shadow-2xs hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50/50 transition-colors"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* AI Actions Checklist */}
      <section className="py-20 border-t border-slate-200/80 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              One-Click <span className="gradient-text">AI Transformations</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Fine-tune, translate, or reformat any piece of text without changing its meaning.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 max-w-5xl mx-auto">
            {[
              "Grammar Correction",
              "Make Professional",
              "Summarize Text",
              "Expand Content",
              "Translate to Tamil",
              "Convert to Email",
              "WhatsApp Style",
              "Paraphrase & Rewrite",
              "Make Shorter",
              "Make Longer",
            ].map((action) => (
              <div
                key={action}
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white border border-slate-200/80 text-sm font-semibold text-slate-800 shadow-2xs"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-12 text-center text-white overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
                Ready to type at the speed of thought?
              </h2>
              <p className="text-violet-100 text-lg mb-8 leading-relaxed font-normal">
                Join thousands of creators, professionals, and students using TYPIFY AI for voice typing.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-slate-100 shadow-lg px-8 font-bold gap-2">
                  Launch Dashboard Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white">
              <Keyboard className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-800">TYPIFY AI</span>
            <span className="text-xs text-slate-400">— Speak Naturally. Type Intelligently.</span>
          </div>
          <p className="text-xs text-slate-400">
            Next.js 16 • Tailwind CSS • Google Gemini AI • Web Speech API
          </p>
        </div>
      </footer>
    </div>
  );
}
