"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Copy,
  Download,
  Trash2,
  Loader2,
  CheckCircle,
  Briefcase,
  Minimize2,
  Maximize2,
  Mail,
  MessageCircle,
  FileText,
  Languages,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AI_ACTIONS, WRITING_MODES, type WritingMode, type AIAction } from "@/lib/types";
import { getSettings } from "@/lib/storage";
import { wordCount, charCount, downloadTextFile } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle,
  Briefcase,
  Minimize2,
  Maximize2,
  Mail,
  MessageCircle,
  FileText,
  Languages,
  RefreshCw,
};

export default function AIWriterPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [writingMode, setWritingMode] = useState<WritingMode>("general");
  const [customInstructions, setCustomInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    const s = getSettings();
    setWritingMode(s.writingMode);
    setCustomInstructions(s.customInstructions);
  }, []);

  const handleAction = async (actionId: AIAction) => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first");
      return;
    }
    setIsProcessing(true);
    setLastAction(actionId);
    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, action: actionId, mode: writingMode, customInstructions }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "AI processing failed");
        return;
      }
      setOutputText(data.text);
      toast.success(`${AI_ACTIONS.find((a) => a.id === actionId)?.label || "Action"} complete`);
    } catch {
      toast.error("Failed to connect to AI service");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (t: string) => {
    navigator.clipboard.writeText(t);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            AI Writing Assistant
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Transform rough dictation and text with Gemini 3.5 AI writing engines</p>
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-2.5">
          <Select value={writingMode} onValueChange={(v) => setWritingMode(v as WritingMode)} options={WRITING_MODES} className="w-48" />
          <Badge variant="default" className="py-1 px-3">
            {WRITING_MODES.find((m) => m.value === writingMode)?.label}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-slate-900">Input Content</CardTitle>
                <CardDescription className="text-xs">Paste text or transcribed audio to improve</CardDescription>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/70">
                {wordCount(inputText)} words • {charCount(inputText)} chars
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type text you want to rewrite, translate or summarize..."
              className="min-h-[300px] text-base leading-relaxed bg-slate-50/50"
            />
            <div className="flex items-center gap-2.5 mt-3.5">
              <Button variant="ghost" size="sm" onClick={() => setInputText("")} disabled={!inputText.trim()} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                <Trash2 className="w-4 h-4 mr-1.5" /> Clear Input
              </Button>
              {outputText && (
                <Button variant="outline" size="sm" onClick={() => setInputText(outputText)} className="ml-auto font-semibold text-violet-700 border-violet-200 hover:bg-violet-50">
                  <ArrowRight className="w-4 h-4 mr-1.5" /> Use Output as Next Input
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-slate-900">AI Result</CardTitle>
                <CardDescription className="text-xs">
                  {lastAction ? `Processed: ${AI_ACTIONS.find((a) => a.id === lastAction)?.label}` : "Transformed text will appear here"}
                </CardDescription>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/70">
                {wordCount(outputText)} words • {charCount(outputText)} chars
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              placeholder="Your polished AI result will be generated here..."
              className="min-h-[300px] text-base leading-relaxed bg-slate-50/50"
              readOnly={isProcessing}
            />
            <div className="flex items-center gap-2.5 mt-3.5">
              <Button variant="outline" size="sm" onClick={() => handleCopy(outputText)} disabled={!outputText.trim()}>
                <Copy className="w-4 h-4 mr-1.5 text-slate-500" /> Copy Output
              </Button>
              <Button variant="outline" size="sm" onClick={() => { downloadTextFile(outputText, `typify-ai-${Date.now()}.txt`); toast.success("Downloaded file"); }} disabled={!outputText.trim()}>
                <Download className="w-4 h-4 mr-1.5 text-slate-500" /> Export (.txt)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom AI Directives */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base text-slate-900">Custom Directives (Optional)</CardTitle>
          <CardDescription className="text-xs">Direct instructions injected into Gemini prompts</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Textarea
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="e.g., Use British English spelling, maintain bullet points, make it sound enthusiastic..."
            className="min-h-[80px] bg-slate-50/50"
          />
        </CardContent>
      </Card>

      {/* AI Actions 10-Grid */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base text-slate-900">Select AI Transformation</CardTitle>
          <CardDescription className="text-xs">Click any action to transform input text with Gemini</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {AI_ACTIONS.map((action) => {
              const Icon = ICON_MAP[action.icon] || Sparkles;
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  disabled={isProcessing || !inputText.trim()}
                  className="flex flex-col items-start gap-2 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-violet-50 hover:border-violet-300 hover:shadow-xs transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 w-full">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 group-hover:border-violet-200 flex items-center justify-center text-violet-600 transition-colors shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-violet-950 truncate">
                      {action.label}
                    </span>
                    {isProcessing && lastAction === action.id && (
                      <Loader2 className="w-3.5 h-3.5 ml-auto animate-spin text-violet-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 group-hover:text-slate-600 leading-relaxed">{action.description}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
