"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Mic,
  Copy,
  Download,
  Trash2,
  Sparkles,
  Clock,
  FileText,
  Languages,
  Pause,
  Play,
  Loader2,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MicButton } from "@/components/mic-button";
import { AudioWaveform } from "@/components/audio-waveform";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { LANGUAGES, WRITING_MODES, AI_ACTIONS, type WritingMode } from "@/lib/types";
import { addHistoryEntry, getHistory, getSettings } from "@/lib/storage";
import { wordCount, charCount, formatDuration, generateId, downloadTextFile } from "@/lib/utils";
import { InstallAppBanner } from "@/components/install-app-banner";

export default function DashboardPage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [writingMode, setWritingMode] = useState<WritingMode>("general");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentHistory, setRecentHistory] = useState<{ id: string; text: string; timestamp: number }[]>([]);
  const [useGemini, setUseGemini] = useState(false);

  const settings = typeof window !== "undefined" ? getSettings() : null;

  useEffect(() => {
    if (settings) {
      setLanguage(settings.language);
      setWritingMode(settings.writingMode);
    }
  }, []);

  useEffect(() => {
    const history = getHistory();
    setRecentHistory(history.slice(0, 5));
  }, []);

  const handleSpeechResult = useCallback(
    (transcript: string, isFinal: boolean) => {
      if (isFinal) {
        setText((prev) => (prev ? prev + " " + transcript : transcript));
      }
    },
    []
  );

  const handleSpeechError = useCallback((error: string) => {
    toast.error(error);
  }, []);

  const {
    isListening,
    interimTranscript,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    language,
    onResult: handleSpeechResult,
    onError: handleSpeechError,
  });

  const {
    isRecording,
    isPaused,
    duration,
    audioBlob,
    analyserNode,
    error: recorderError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useAudioRecorder();

  useEffect(() => {
    if (audioBlob && useGemini) {
      transcribeWithGemini(audioBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (recorderError) {
      toast.error(recorderError);
    }
  }, [recorderError]);

  const transcribeWithGemini = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      formData.append("language", language);

      const res = await fetch("/api/transcribe", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Transcription failed");
        return;
      }

      setText((prev) => (prev ? prev + " " + data.text : data.text));
      toast.success("Audio transcribed successfully");
    } catch {
      toast.error("Failed to connect to transcription service");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMicClick = () => {
    if (useGemini) {
      startRecording();
    } else {
      startListening();
    }
  };

  const handleMicStop = () => {
    if (useGemini) {
      stopRecording();
    } else {
      stopListening();
    }
  };

  const handleImprove = async (action: string) => {
    if (!text.trim()) {
      toast.error("Please enter or dictate some text first");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          action,
          mode: writingMode,
          customInstructions: settings?.customInstructions || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "AI processing failed");
        return;
      }
      setText(data.text);
      toast.success("Text improved successfully");
    } catch {
      toast.error("Failed to connect to AI service");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!text.trim()) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDownload = () => {
    if (!text.trim()) return;
    downloadTextFile(text, `typify-ai-${Date.now()}.txt`);
    toast.success("File downloaded");
  };

  const handleClear = () => {
    setText("");
    toast.info("Text cleared");
  };

  const handleSave = () => {
    if (!text.trim()) return;
    addHistoryEntry({
      id: generateId(),
      text,
      timestamp: Date.now(),
      language,
      mode: writingMode,
      source: useGemini ? "gemini" : "speech",
    });
    setRecentHistory(getHistory().slice(0, 5));
    toast.success("Saved to history");
  };

  const isActive = isListening || isRecording;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <InstallAppBanner />
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Voice Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Speak naturally and transform spoken thought into professional output with Gemini AI.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-violet-600 mr-1.5 animate-pulse" />
            AI Ready
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Voice Workspace */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recording & Mic Studio Card */}
          <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6">
                {/* Status Indicator */}
                <div className="flex items-center gap-3 min-h-7.5">
                  {isActive ? (
                    <Badge variant="success" className="animate-pulse shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5 animate-ping" />
                      {isListening ? "Listening live..." : isPaused ? "Recording Paused" : "Recording audio..."}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-slate-600">
                      Studio Ready
                    </Badge>
                  )}
                  {isRecording && (
                    <span className="text-sm font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {formatDuration(duration)}
                    </span>
                  )}
                  {isProcessing && (
                    <Badge variant="warning">
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Gemini Processing...
                    </Badge>
                  )}
                </div>

                {/* Animated Waveform */}
                <div className="w-full max-w-2xl">
                  <AudioWaveform analyserNode={analyserNode} isActive={isActive} />
                </div>

                {/* Big Interactive Mic Button */}
                <MicButton
                  isRecording={isRecording}
                  isListening={isListening}
                  onClick={handleMicClick}
                  onStop={handleMicStop}
                  disabled={isProcessing || (!isSpeechSupported && !useGemini)}
                />

                {/* Recording Controls when recording with Gemini */}
                {isRecording && useGemini && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isPaused ? resumeRecording : pauseRecording}
                    >
                      {isPaused ? (
                        <Play className="w-4 h-4 mr-1.5 text-emerald-600" />
                      ) : (
                        <Pause className="w-4 h-4 mr-1.5 text-amber-600" />
                      )}
                      {isPaused ? "Resume" : "Pause"}
                    </Button>
                  </div>
                )}

                {/* Live Interim Transcript Bubble */}
                {interimTranscript && (
                  <div className="w-full max-w-xl p-3.5 rounded-xl bg-violet-50/70 border border-violet-100 text-center animate-fade-in">
                    <p className="text-sm text-violet-900 font-medium italic">
                      "{interimTranscript}"
                    </p>
                  </div>
                )}

                {/* Engine, Language & Mode Selectors */}
                <div className="flex items-center gap-3 flex-wrap justify-center w-full pt-2 border-t border-slate-100">
                  <Select
                    value={language}
                    onValueChange={setLanguage}
                    options={LANGUAGES}
                    className="w-40"
                  />
                  <Select
                    value={writingMode}
                    onValueChange={(v) => setWritingMode(v as WritingMode)}
                    options={WRITING_MODES}
                    className="w-44"
                  />
                  <Button
                    variant={useGemini ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseGemini(!useGemini)}
                    className="gap-1.5 font-semibold"
                  >
                    <Sparkles className="w-4 h-4" />
                    {useGemini ? "Gemini Engine" : "Browser Engine"}
                  </Button>
                </div>

                {!isSpeechSupported && !useGemini && (
                  <p className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200/70 text-center max-w-md">
                    Browser speech recognition is not supported in this browser. Please enable <strong>Gemini Engine</strong> to transcribe speech.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Transcription Text Editor */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-slate-900">Transcription & Editor</CardTitle>
                  <CardDescription className="text-xs">Real-time editable output from your voice</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/70">
                  <span>{wordCount(text)} words</span>
                  <span className="text-slate-300">•</span>
                  <span>{charCount(text)} chars</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Transcribed voice text will appear here. You can also edit or type directly..."
                className="min-h-55 text-base leading-relaxed bg-slate-50/50"
              />
              <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text.trim()}>
                  <Copy className="w-4 h-4 mr-1.5 text-slate-500" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!text.trim()}>
                  <Download className="w-4 h-4 mr-1.5 text-slate-500" /> Export (.txt)
                </Button>
                <Button variant="outline" size="sm" onClick={handleSave} disabled={!text.trim()}>
                  <BookmarkCheck className="w-4 h-4 mr-1.5 text-violet-600" /> Save
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear} disabled={!text.trim()} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 ml-auto">
                  <Trash2 className="w-4 h-4 mr-1.5" /> Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Quick Actions */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-base text-slate-900">AI Intelligence Actions</CardTitle>
                  <CardDescription className="text-xs">Transform text instantly using Gemini AI</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {AI_ACTIONS.map((action) => (
                  <Button
                    key={action.id}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleImprove(action.id)}
                    disabled={isProcessing || !text.trim()}
                    className="text-xs font-semibold justify-start h-9 text-slate-700 hover:text-violet-700 hover:bg-violet-50 hover:border-violet-200 transition-all truncate"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3 h-3 mr-1.5 animate-spin text-violet-600" />
                    ) : null}
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Info Sidebar */}
        <div className="space-y-6">
          {/* Engine & Configuration Overview */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base text-slate-900">Active Profile</CardTitle>
              <CardDescription className="text-xs">Session details & engine status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
                  <Mic className="w-4 h-4 text-violet-600" />
                  Engine
                </div>
                <Badge variant={useGemini ? "default" : "secondary"}>
                  {useGemini ? "Gemini AI" : "Browser API"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
                  <Languages className="w-4 h-4 text-blue-600" />
                  Language
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {LANGUAGES.find((l) => l.value === language)?.label}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
                  <FileText className="w-4 h-4 text-cyan-600" />
                  Writing Mode
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {WRITING_MODES.find((m) => m.value === writingMode)?.label}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transcriptions */}
          <Card className="border-slate-200/80 shadow-sm bg-white">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Recent History
              </CardTitle>
              <CardDescription className="text-xs">Click to restore previous transcripts</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {recentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-500">No transcripts yet</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Transcriptions you save will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentHistory.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => setText(entry.text)}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-violet-50 hover:border-violet-200 border border-slate-200/70 transition-all duration-150 cursor-pointer group"
                    >
                      <p className="text-sm text-slate-700 group-hover:text-violet-900 font-medium line-clamp-2 leading-relaxed">
                        {entry.text}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                        {new Date(entry.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
