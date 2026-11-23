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
    description: "Real-time speech recognition powered by browser APIs and Gemini AI transcription.",
  },
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description: "Grammar correction, professional rewriting, summarization and text expansion.",
  },
  {
    icon: Languages,
    title: "Multi-Language",
    description: "Support for English and Tamil with seamless translation between languages.",
  },
  {
    icon: Mail,
    title: "Email Mode",
    description: "Convert your speech into professionally formatted emails instantly.",
  },
  {
    icon: MessageCircle,
    title: "Message Mode",
    description: "Transform voice input into casual WhatsApp and social media messages.",
  },
  {
    icon: BookOpen,
    title: "Academic Writing",
    description: "Scholarly tone with precise language for academic documents and papers.",
  },
  {
    icon: FileText,
    title: "Export & History",
    description: "Download your transcriptions and access full history with search.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "API keys stay on the server. Your data is processed securely.",
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
    <div className="min-h-screen bg-gray-950 bg-grid">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <Keyboard className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg tracking-tight">TYPIFY</h1>
                <p className="text-[10px] text-violet-400 font-medium -mt-0.5 tracking-widest">AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/about">
                <Button variant="ghost" size="sm">About</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm">
                  Launch App <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-8">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Voice Typing Agent</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">Speak Naturally.</span>
              <br />
              <span className="gradient-text">Type Intelligently.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Transform your voice into polished text with AI-powered transcription,
              grammar correction, professional rewriting, and multi-language support.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/dashboard">
                <Button size="lg" className="text-base px-8">
                  <Mic className="w-5 h-5 mr-2" />
                  Start Typing with Voice
                </Button>
              </Link>
              <Link href="/ai-writer">
                <Button variant="outline" size="lg" className="text-base px-8">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try AI Writer
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-14 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-violet-400" />
                <span>Multi-Language</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Gemini AI Powered</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to{" "}
              <span className="gradient-text">write better</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A complete voice typing and AI writing toolkit designed for productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-xl border border-gray-800 bg-gray-900/30 hover:bg-gray-900/60 hover:border-gray-700 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-600/20 transition-colors">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Writing Modes Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              7 Writing Modes
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Adapt your voice input to any context with specialized AI writing modes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {MODES.map((mode) => (
                <span
                  key={mode}
                  className="px-5 py-2.5 rounded-full bg-gray-800/60 border border-gray-700/50 text-sm text-gray-300 hover:border-violet-500/30 hover:text-violet-300 transition-colors cursor-default"
                >
                  {mode}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Actions Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powered by <span className="gradient-text">AI Intelligence</span>
            </h2>
            <p className="text-gray-400 text-lg">
              One click to transform your text in any direction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              "Correct Grammar",
              "Make Professional",
              "Summarize",
              "Expand Text",
              "Translate",
              "Write Email",
              "Write Message",
              "Rewrite",
              "Make Shorter",
              "Make Longer",
            ].map((action) => (
              <div
                key={action}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-800 text-sm text-gray-300"
              >
                <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0" />
                {action}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950 p-12 text-center overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to type with your voice?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Start using TYPIFY AI now. No sign-up required.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="text-base px-10">
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <Keyboard className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-400">TYPIFY AI</span>
            </div>
            <p className="text-xs text-gray-600">
              Built with Next.js, Gemini AI & Web Speech API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
