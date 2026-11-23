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
    toast.success("Settings saved");
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
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-violet-400" />
            Settings
          </h1>
          <p className="text-gray-400 text-sm mt-1">Configure your TYPIFY AI preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Language</CardTitle>
          <CardDescription>Default language for speech recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={settings.language}
            onValueChange={(v) => update({ language: v })}
            options={LANGUAGES}
            className="w-full max-w-xs"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Default Writing Mode</CardTitle>
          <CardDescription>AI will adapt its output to this mode</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={settings.writingMode}
            onValueChange={(v) => update({ writingMode: v as WritingMode })}
            options={WRITING_MODES}
            className="w-full max-w-xs"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Auto Punctuation</CardTitle>
          <CardDescription>Automatically add punctuation to transcribed text</CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoPunctuation}
              onChange={(e) => update({ autoPunctuation: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500 focus:ring-offset-gray-900"
            />
            <span className="text-sm text-gray-300">Enable auto punctuation</span>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custom AI Instructions</CardTitle>
          <CardDescription>These instructions will be included with every AI action</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={settings.customInstructions}
            onChange={(e) => update({ customInstructions: e.target.value })}
            placeholder="e.g., Always use British English spelling. Keep responses concise. Avoid passive voice..."
            className="min-h-[120px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">API Configuration</CardTitle>
          <CardDescription>Gemini API key is configured via environment variables on the server</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50">
            <p className="text-sm text-gray-400 leading-relaxed">
              To configure the Gemini API, create a <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs">.env.local</code> file
              in the project root with:
            </p>
            <pre className="mt-3 p-3 rounded bg-gray-900 text-sm text-gray-300 font-mono overflow-x-auto">
              GEMINI_API_KEY=your_api_key_here
            </pre>
            <p className="text-xs text-gray-500 mt-2">
              Get your API key from{" "}
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                Google AI Studio
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
