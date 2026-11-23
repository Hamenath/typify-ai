"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Copy,
  Download,
  Trash2,
  Sparkles,
  Pause,
  Play,
  Loader2,
  Square,
  RotateCcw,
  BookmarkCheck,
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Voice Typing Workspace</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Distraction-free dictation studio with waveform monitoring</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-3 flex-wrap p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <Select value={language} onValueChange={setLanguage} options={LANGUAGES} className="w-44" />
        <Select value={writingMode} onValueChange={(v) => setWritingMode(v as WritingMode)} options={WRITING_MODES} className="w-48" />
        <Button variant={useGemini ? "default" : "outline"} size="sm" onClick={() => setUseGemini(!useGemini)} className="font-semibold gap-1.5 ml-auto">
          <Sparkles className="w-4 h-4" />
          {useGemini ? "Gemini Engine" : "Browser Engine"}
        </Button>
      </div>

      {/* Central Dictation Studio */}
      <Card className="border-slate-200/80 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6 sm:p-10">
          <div className="flex flex-col items-center gap-6">
            {/* Status bar */}
            <div className="flex items-center gap-3 min-h-[30px]">
              {isActive ? (
                <Badge variant="success" className="animate-pulse shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1.5 animate-ping" />
                  {isListening ? "Listening live..." : isPaused ? "Paused" : "Recording audio..."}
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-slate-600 font-medium">
                  Ready to Dictate
                </Badge>
              )}
              {isRecording && <span className="text-sm font-mono font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">{formatDuration(duration)}</span>}
              {isProcessing && (
                <Badge variant="warning"><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Gemini Transcribing...</Badge>
              )}
            </div>

            {/* Waveform Canvas */}
            <div className="w-full max-w-2xl">
              <AudioWaveform analyserNode={analyserNode} isActive={isActive} />
            </div>

            {/* Mic Button */}
            <MicButton
              isRecording={isRecording}
              isListening={isListening}
              onClick={handleStart}
              onStop={handleStop}
              disabled={isProcessing || (!isSupported && !useGemini)}
            />

            {/* Play/Pause/Stop toolbar */}
            <div className="flex items-center gap-2.5">
              {isRecording && useGemini && (
                <Button variant="outline" size="sm" onClick={isPaused ? resumeRecording : pauseRecording}>
                  {isPaused ? <Play className="w-4 h-4 mr-1.5 text-emerald-600" /> : <Pause className="w-4 h-4 mr-1.5 text-amber-600" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
              )}
              {isActive && (
                <Button variant="outline" size="sm" onClick={handleStop} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200">
                  <Square className="w-4 h-4 mr-1.5 fill-rose-600" /> Stop Recording
                </Button>
              )}
            </div>

            {interimTranscript && (
              <div className="w-full max-w-xl p-3.5 rounded-xl bg-violet-50/70 border border-violet-100 text-center animate-fade-in">
                <p className="text-sm text-violet-900 font-medium italic">"{interimTranscript}"</p>
              </div>
            )}

            {!isSupported && !useGemini && (
              <p className="text-xs text-amber-700 bg-amber-50 px-3.5 py-2 rounded-lg border border-amber-200 text-center">
                Browser speech recognition is not supported in this browser. Switch to <strong>Gemini Engine</strong>.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor Card */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-800">Transcribed Content</span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/70">
              {wordCount(text)} words • {charCount(text)} chars
            </span>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your spoken words will appear here instantly..."
            className="min-h-[260px] text-base leading-relaxed bg-slate-50/50"
          />
          <div className="flex items-center gap-2.5 mt-4 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied to clipboard"); }} disabled={!text.trim()}>
              <Copy className="w-4 h-4 mr-1.5 text-slate-500" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => { downloadTextFile(text, `typify-${Date.now()}.txt`); toast.success("Exported text file"); }} disabled={!text.trim()}>
              <Download className="w-4 h-4 mr-1.5 text-slate-500" /> Export (.txt)
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave} disabled={!text.trim()}>
              <BookmarkCheck className="w-4 h-4 mr-1.5 text-violet-600" /> Save to History
            </Button>
            <Button variant="outline" size="sm" onClick={() => { resetTranscript(); setText(""); toast.info("Reset transcription"); }} disabled={!text.trim() && !interimTranscript}>
              <RotateCcw className="w-4 h-4 mr-1.5 text-slate-500" /> Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setText(""); toast.info("Text cleared"); }} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 ml-auto" disabled={!text.trim()}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
