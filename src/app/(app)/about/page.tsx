import {
  Keyboard,
  Mic,
  Sparkles,
  Languages,
  FileText,
  Shield,
  Code,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TECH_STACK = [
  { name: "Next.js 16", description: "Turbopack React framework" },
  { name: "TypeScript 5", description: "Strict type-safe architecture" },
  { name: "Tailwind CSS", description: "Utility-first modern design" },
  { name: "Google Gemini 3.5", description: "AI audio transcription & rewriting" },
  { name: "Web Speech API", description: "Zero-latency in-browser recognition" },
  { name: "MediaRecorder API", description: "High-fidelity audio recording" },
];

const FEATURES_LIST = [
  "Real-time voice-to-text dictation with live feedback",
  "Gemini AI-powered audio transcription engine",
  "Intelligent grammar, punctuation & capitalization correction",
  "Formal & professional business tone rewriting",
  "Text summarization and deep elaboration expansion",
  "Bilingual translation between English and Tamil",
  "Formatted Email & WhatsApp messaging modes",
  "7 specialized writing modes for every context",
  "Searchable local transcription history",
  "Custom persistent AI persona instructions",
  "One-click clipboard copy and text export",
  "Fluid responsive design across desktop, tablet & mobile",
];

export default function AboutPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Hero Banner */}
      <div className="text-center py-6 sm:py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/20 mb-6">
          <Keyboard className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">TYPIFY AI</h1>
        <p className="text-lg text-violet-700 font-bold mb-4 tracking-tight">
          Speak Naturally. Type Intelligently.
        </p>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
          TYPIFY AI is a premium AI voice typist agent built for professionals, students, freelancers, and content creators. It bridges natural human voice dictation with intelligent AI transformations.
        </p>
      </div>

      {/* Feature Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: Mic, title: "Voice Studio", desc: "Dual engines: Real-time browser speech recognition and Gemini AI audio transcription." },
          { icon: Sparkles, title: "AI Intelligence", desc: "Grammar correction, summarization, professional tone and format rewrites." },
          { icon: Languages, title: "Bilingual Power", desc: "Native English and Tamil transcription and seamless two-way translation." },
        ].map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title} className="border-slate-200/80 shadow-xs bg-white text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mx-auto mb-4 text-violet-600">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5 text-base">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features List */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-violet-600" />
            Complete Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES_LIST.map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-600 flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
            <Code className="w-5 h-5 text-violet-600" />
            Modern Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <p className="font-bold text-sm text-slate-900">{tech.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{tech.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Guarantee */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3.5 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            Privacy & Trust Architecture
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <p>• API credentials are isolated exclusively on the server and never shared with client browsers.</p>
            <p>• Audio processing executes in memory and is never logged or stored on external servers.</p>
            <p>• Your transcription history remains 100% under your control in client-side LocalStorage.</p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
          Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators and developers worldwide.
        </p>
      </div>
    </div>
  );
}
