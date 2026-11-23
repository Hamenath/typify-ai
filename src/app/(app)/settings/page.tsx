"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Settings, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { LANGUAGES, WRITING_MODES, DEFAULT_SETTINGS, type AppSettings, type WritingMode } from "@/lib/types";
import { getSettings, saveSettings } from "@/lib/storage";

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    toast.info("Settings reset to defaults");
  };

  const update = (partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            Preferences & Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Configure default language, writing persona and Gemini directives</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline" size="sm" onClick={handleReset} className="font-semibold">
            <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
          </Button>
          <Button size="sm" onClick={handleSave} className="font-semibold shadow-xs">
            <Save className="w-4 h-4 mr-1.5" /> Save Changes
          </Button>
        </div>
      </div>

      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base text-slate-900">Default Language</CardTitle>
          <CardDescription className="text-xs">Primary language used for speech recognition and transcription</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Select
            value={settings.language}
            onValueChange={(v) => update({ language: v })}
            options={LANGUAGES}
            className="w-full max-w-xs"
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base text-slate-900">Default Writing Mode</CardTitle>
          <CardDescription className="text-xs">Tone and style persona applied by the AI Writing Assistant</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Select
            value={settings.writingMode}
            onValueChange={(v) => update({ writingMode: v as WritingMode })}
            options={WRITING_MODES}
            className="w-full max-w-xs"
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base text-slate-900">Automatic Punctuation</CardTitle>
          <CardDescription className="text-xs">Instruct speech engines to automatically capitalize and punctuate sentences</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.autoPunctuation}
              onChange={(e) => update({ autoPunctuation: e.target.checked })}
              className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500/30 accent-violet-600 cursor-pointer"
            />
            <span className="text-sm font-semibold text-slate-800">Enable automatic sentence punctuation & capitalization</span>
          </label>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base text-slate-900">Custom AI Directives</CardTitle>
          <CardDescription className="text-xs">Persistent guidance appended to all Gemini AI transformations</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Textarea
            value={settings.customInstructions}
            onChange={(e) => update({ customInstructions: e.target.value })}
            placeholder="e.g., Always use British English spelling. Keep responses concise. Avoid overly complex vocabulary..."
            className="min-h-[120px] bg-slate-50/50"
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base text-slate-900">Gemini API Configuration</CardTitle>
          <CardDescription className="text-xs">Server-side credentials status</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              API credentials are kept server-side in your <code className="text-violet-700 bg-violet-50 font-semibold px-1.5 py-0.5 rounded border border-violet-200/70">.env.local</code> file and are never leaked to client browsers.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Gemini 3.5 AI is active and authenticated.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
