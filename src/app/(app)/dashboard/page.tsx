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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        setText((prev) => {
          const newText = prev ? prev + " " + transcript : transcript;
          return newText;
        });
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

  // Auto-transcribe when audio blob is ready and Gemini mode is on
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
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Your AI-powered voice typing workspace
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main workspace - takes 2 cols */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recording Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-6">
                {/* Status */}
                <div className="flex items-center gap-3">
                  {isActive && (
                    <Badge variant="success" className="animate-pulse">
                      {isListening ? "Listening..." : "Recording..."}
                    </Badge>
                  )}
                  {isRecording && (
                    <span className="text-sm font-mono text-gray-400">
                      {formatDuration(duration)}
                    </span>
                  )}
                  {isProcessing && (
                    <Badge variant="warning">
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Processing...
                    </Badge>
                  )}
                </div>

                {/* Waveform */}
                <div className="w-full">
                  <AudioWaveform analyserNode={analyserNode} isActive={isActive} />
                </div>

                {/* Mic Button */}
                <MicButton
                  isRecording={isRecording}
                  isListening={isListening}
                  onClick={handleMicClick}
                  onStop={handleMicStop}
                  disabled={isProcessing || (!isSpeechSupported && !useGemini)}
                />

                {/* Recording controls */}
                {isRecording && useGemini && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isPaused ? resumeRecording : pauseRecording}
                    >
                      {isPaused ? (
                        <Play className="w-4 h-4 mr-1" />
                      ) : (
                        <Pause className="w-4 h-4 mr-1" />
                      )}
                      {isPaused ? "Resume" : "Pause"}
                    </Button>
                  </div>
                )}

                {/* Interim transcript */}
                {interimTranscript && (
                  <p className="text-sm text-gray-400 italic text-center max-w-lg">
                    {interimTranscript}
                  </p>
                )}

                {/* Controls row */}
                <div className="flex items-center gap-4 flex-wrap justify-center">
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
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    {useGemini ? "Gemini Mode" : "Browser Mode"}
                  </Button>
                </div>

                {!isSpeechSupported && !useGemini && (
                  <p className="text-sm text-yellow-400 text-center">
                    Browser speech recognition is not supported. Enable Gemini Mode for AI transcription.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Text Editor */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Transcription</CardTitle>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{wordCount(text)} words</span>
                  <span>•</span>
                  <span>{charCount(text)} chars</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start speaking or type here..."
                className="min-h-[200px] text-base leading-relaxed"
              />
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!text.trim()}>
                  <Copy className="w-4 h-4 mr-1" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!text.trim()}>
                  <Download className="w-4 h-4 mr-1" /> Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleSave} disabled={!text.trim()}>
                  <FileText className="w-4 h-4 mr-1" /> Save
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClear} disabled={!text.trim()} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4 mr-1" /> Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                AI Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {AI_ACTIONS.map((action) => (
                  <Button
                    key={action.id}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleImprove(action.id)}
                    disabled={isProcessing || !text.trim()}
                    className="text-xs justify-start"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    ) : null}
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Mic className="w-4 h-4 text-violet-400" />
                  Engine
                </div>
                <Badge variant={useGemini ? "default" : "secondary"}>
                  {useGemini ? "Gemini AI" : "Browser"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Languages className="w-4 h-4 text-blue-400" />
                  Language
                </div>
                <span className="text-sm text-gray-200">
                  {LANGUAGES.find((l) => l.value === language)?.label}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Mode
                </div>
                <span className="text-sm text-gray-200">
                  {WRITING_MODES.find((m) => m.value === writingMode)?.label}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Recent
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No transcriptions yet</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Your saved transcriptions will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentHistory.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => setText(entry.text)}
                      className="w-full text-left p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                    >
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {entry.text}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(entry.timestamp).toLocaleDateString()}
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
