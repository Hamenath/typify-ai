"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Mic,
  Copy,
  Download,
  Trash2,
  Sparkles,
  Pause,
  Play,
  Loader2,
  Square,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MicButton } from "@/components/mic-button";
import { AudioWaveform } from "@/components/audio-waveform";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { LANGUAGES, WRITING_MODES, type WritingMode } from "@/lib/types";
import { addHistoryEntry, getSettings } from "@/lib/storage";
import { wordCount, charCount, formatDuration, generateId, downloadTextFile } from "@/lib/utils";

export default function WorkspacePage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [writingMode, setWritingMode] = useState<WritingMode>("general");
  const [isProcessing, setIsProcessing] = useState(false);
  const [useGemini, setUseGemini] = useState(false);

  useEffect(() => {
    const s = getSettings();
    setLanguage(s.language);
    setWritingMode(s.writingMode);
  }, []);

  const handleResult = useCallback((transcript: string, isFinal: boolean) => {
    if (isFinal) setText((prev) => (prev ? prev + " " + transcript : transcript));
  }, []);

  const {
    isListening,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    language,
    onResult: handleResult,
    onError: (e) => toast.error(e),
  });

  const {
    isRecording,
    isPaused,
    duration,
    audioBlob,
    analyserNode,
    error: recError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  } = useAudioRecorder();

  useEffect(() => {
    if (audioBlob && useGemini) {
      (async () => {
        setIsProcessing(true);
        try {
          const fd = new FormData();
          fd.append("audio", audioBlob, "recording.webm");
          fd.append("language", language);
          const res = await fetch("/api/transcribe", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) { toast.error(data.error); return; }
          setText((p) => (p ? p + " " + data.text : data.text));
          toast.success("Transcribed successfully");
        } catch { toast.error("Transcription service unavailable"); }
        finally { setIsProcessing(false); }
      })();
    }
  }, [audioBlob]);

  useEffect(() => { if (recError) toast.error(recError); }, [recError]);

  const isActive = isListening || isRecording;

  const handleStart = () => { useGemini ? startRecording() : startListening(); };
  const handleStop = () => { useGemini ? stopRecording() : stopListening(); };

  const handleSave = () => {
    if (!text.trim()) return;
    addHistoryEntry({ id: generateId(), text, timestamp: Date.now(), language, mode: writingMode, source: useGemini ? "gemini" : "speech" });
    toast.success("Saved to history");
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Voice Typing Workspace</h1>
        <p className="text-gray-400 text-sm mt-1">Speak and let AI transcribe your words</p>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={language} onValueChange={setLanguage} options={LANGUAGES} className="w-40" />
        <Select value={writingMode} onValueChange={(v) => setWritingMode(v as WritingMode)} options={WRITING_MODES} className="w-44" />
        <Button variant={useGemini ? "default" : "outline"} size="sm" onClick={() => setUseGemini(!useGemini)}>
          <Sparkles className="w-4 h-4 mr-1" />
          {useGemini ? "Gemini" : "Browser"}
        </Button>
      </div>

      {/* Recording Area */}
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-6">
            {/* Status bar */}
            <div className="flex items-center gap-3 min-h-[28px]">
              {isActive && (
                <Badge variant="success" className="animate-pulse">
                  {isListening ? "Listening..." : isPaused ? "Paused" : "Recording..."}
                </Badge>
              )}
              {isRecording && <span className="text-sm font-mono text-gray-400">{formatDuration(duration)}</span>}
              {isProcessing && (
                <Badge variant="warning"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Processing...</Badge>
              )}
            </div>

            {/* Waveform */}
            <div className="w-full max-w-2xl">
              <AudioWaveform analyserNode={analyserNode} isActive={isActive} />
            </div>

            {/* Mic */}
            <MicButton
              isRecording={isRecording}
              isListening={isListening}
              onClick={handleStart}
              onStop={handleStop}
              disabled={isProcessing || (!isSupported && !useGemini)}
            />

            {/* Extra controls */}
            <div className="flex items-center gap-2">
              {isRecording && useGemini && (
                <Button variant="outline" size="sm" onClick={isPaused ? resumeRecording : pauseRecording}>
                  {isPaused ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
              )}
              {isActive && (
                <Button variant="outline" size="sm" onClick={handleStop}>
                  <Square className="w-4 h-4 mr-1" /> Stop
                </Button>
              )}
            </div>

            {interimTranscript && (
              <p className="text-sm text-gray-400 italic text-center max-w-lg">{interimTranscript}</p>
            )}

            {!isSupported && !useGemini && (
              <p className="text-sm text-yellow-400 text-center">
                Browser speech recognition not supported. Switch to Gemini mode.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">Output</span>
            <span className="text-xs text-gray-500">{wordCount(text)} words • {charCount(text)} chars</span>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Transcribed text will appear here..."
            className="min-h-[250px] text-base leading-relaxed"
          />
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied"); }} disabled={!text.trim()}>
              <Copy className="w-4 h-4 mr-1" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => { downloadTextFile(text, `typify-${Date.now()}.txt`); toast.success("Downloaded"); }} disabled={!text.trim()}>
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave} disabled={!text.trim()}>
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={() => { resetTranscript(); setText(""); toast.info("Reset transcription"); }} disabled={!text.trim() && !interimTranscript}>
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setText(""); toast.info("Text cleared"); }} className="text-red-400 hover:text-red-300" disabled={!text.trim()}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
