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
  { name: "Next.js", description: "React framework for production" },
  { name: "TypeScript", description: "Type-safe development" },
  { name: "Tailwind CSS", description: "Utility-first styling" },
  { name: "Google Gemini AI", description: "AI transcription and writing" },
  { name: "Web Speech API", description: "Browser speech recognition" },
  { name: "MediaRecorder API", description: "Audio capture" },
];

const FEATURES_LIST = [
  "Real-time voice-to-text transcription",
  "Gemini AI-powered audio transcription",
  "Grammar correction and punctuation",
  "Professional rewriting",
  "Text summarization and expansion",
  "English-Tamil translation",
  "Email and message writing modes",
  "7 specialized writing modes",
  "Transcription history with search",
  "Custom AI instructions",
  "Export and download support",
  "Responsive design for all devices",
];

export default function AboutPage() {
  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-2xl shadow-violet-500/20 mb-6">
          <Keyboard className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">TYPIFY AI</h1>
        <p className="text-lg text-violet-400 font-medium mb-4">
          Speak Naturally. Type Intelligently.
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          TYPIFY AI is a premium AI-powered voice typing application that transforms your speech
          into polished, professional text. Built for students, developers, freelancers,
          professionals and content creators.
        </p>
      </div>

      {/* Core features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: Mic, title: "Voice Typing", desc: "Real-time speech recognition with browser and Gemini AI engines" },
          { icon: Sparkles, title: "AI Intelligence", desc: "Grammar correction, rewriting, translation and smart formatting" },
          { icon: Languages, title: "Multi-Language", desc: "English and Tamil support with seamless translation" },
        ].map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full feature list */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-violet-400" />
            All Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FEATURES_LIST.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-300 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech stack */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-violet-400" />
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
              >
                <p className="font-medium text-sm text-gray-200">{tech.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{tech.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-400" />
            Privacy & Security
          </h2>
          <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <p>• API keys are stored exclusively on the server and never exposed to the client.</p>
            <p>• Transcription data is processed through secure server-side API endpoints.</p>
            <p>• History is stored locally in your browser using LocalStorage.</p>
            <p>• No user data is collected, tracked or shared with third parties.</p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          Built with <Heart className="w-4 h-4 text-red-400" /> using Next.js & Gemini AI
        </p>
      </div>
    </div>
  );
}
