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
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-400" />
          AI Writing Assistant
        </h1>
        <p className="text-gray-400 text-sm mt-1">Transform your text with AI-powered writing tools</p>
      </div>

      {/* Mode selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={writingMode} onValueChange={(v) => setWritingMode(v as WritingMode)} options={WRITING_MODES} className="w-48" />
        <Badge variant="secondary">{WRITING_MODES.find((m) => m.value === writingMode)?.label} Mode</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Input Text</CardTitle>
              <span className="text-xs text-gray-500">{wordCount(inputText)} words • {charCount(inputText)} chars</span>
            </div>
            <CardDescription>Paste or type the text you want to transform</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-[300px] text-base"
            />
            <div className="flex items-center gap-2 mt-3">
              <Button variant="ghost" size="sm" onClick={() => setInputText("")} disabled={!inputText.trim()} className="text-red-400">
                <Trash2 className="w-4 h-4 mr-1" /> Clear
              </Button>
              {outputText && (
                <Button variant="ghost" size="sm" onClick={() => setInputText(outputText)}>
                  <ArrowRight className="w-4 h-4 mr-1" /> Use Output as Input
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Output</CardTitle>
              <span className="text-xs text-gray-500">{wordCount(outputText)} words • {charCount(outputText)} chars</span>
            </div>
            <CardDescription>
              {lastAction ? `Last action: ${AI_ACTIONS.find((a) => a.id === lastAction)?.label}` : "AI-improved text will appear here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              placeholder="Improved text will appear here..."
              className="min-h-[300px] text-base"
              readOnly={isProcessing}
            />
            <div className="flex items-center gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => handleCopy(outputText)} disabled={!outputText.trim()}>
                <Copy className="w-4 h-4 mr-1" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={() => { downloadTextFile(outputText, `typify-ai-${Date.now()}.txt`); toast.success("Downloaded"); }} disabled={!outputText.trim()}>
                <Download className="w-4 h-4 mr-1" /> Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Instructions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Custom Instructions (Optional)</CardTitle>
          <CardDescription>Add specific instructions for the AI to follow</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="e.g., Use British English, keep the tone friendly, avoid jargon..."
            className="min-h-[80px]"
          />
        </CardContent>
      </Card>

      {/* AI Actions Grid */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">AI Actions</CardTitle>
          <CardDescription>Click an action to transform your input text</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {AI_ACTIONS.map((action) => {
              const Icon = ICON_MAP[action.icon] || Sparkles;
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  disabled={isProcessing || !inputText.trim()}
                  className="flex flex-col items-start gap-2 p-4 rounded-xl border border-gray-800 bg-gray-900/30 hover:bg-gray-900/60 hover:border-violet-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left group"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Icon className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white truncate">
                      {action.label}
                    </span>
                    {isProcessing && lastAction === action.id && (
                      <Loader2 className="w-3 h-3 ml-auto animate-spin text-violet-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{action.description}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
