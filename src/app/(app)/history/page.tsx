"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  History,
  Search,
  Trash2,
  Copy,
  Download,
  FileText,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type TranscriptionEntry, WRITING_MODES, LANGUAGES } from "@/lib/types";
import { getHistory, deleteHistoryEntry, clearHistory } from "@/lib/storage";
import { downloadTextFile } from "@/lib/utils";

export default function HistoryPage() {
  const [entries, setEntries] = useState<TranscriptionEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const filtered = searchQuery.trim()
    ? entries.filter((e) =>
        e.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : entries;

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id);
    setEntries(getHistory());
    toast.success("Entry deleted");
  };

  const handleClearAll = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    clearHistory();
    setEntries([]);
    setConfirmClear(false);
    toast.success("History cleared");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleExportAll = () => {
    const content = entries
      .map(
        (e) =>
          `--- ${new Date(e.timestamp).toLocaleString()} ---\nMode: ${e.mode} | Language: ${e.language} | Source: ${e.source}\n\n${e.text}\n`
      )
      .join("\n\n");
    downloadTextFile(content, `typify-ai-history-${Date.now()}.txt`);
    toast.success("History exported");
  };

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-violet-400" />
            Transcription History
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {entries.length} transcription{entries.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportAll} disabled={entries.length === 0}>
            <Download className="w-4 h-4 mr-1" /> Export All
          </Button>
          <Button
            variant={confirmClear ? "destructive" : "outline"}
            size="sm"
            onClick={handleClearAll}
            disabled={entries.length === 0}
          >
            {confirmClear ? (
              <>
                <AlertTriangle className="w-4 h-4 mr-1" /> Confirm Clear
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-1" /> Clear All
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transcriptions..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-700 bg-gray-800/50 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-400 mb-1">
                {searchQuery ? "No matching transcriptions" : "No transcriptions yet"}
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery
                  ? "Try a different search term"
                  : "Start voice typing to build your history"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <Card key={entry.id} className="group hover:border-gray-700 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary">
                        {WRITING_MODES.find((m) => m.value === entry.mode)?.label || entry.mode}
                      </Badge>
                      <Badge variant="outline">
                        {LANGUAGES.find((l) => l.value === entry.language)?.label || entry.language}
                      </Badge>
                      <Badge variant={entry.source === "gemini" ? "default" : "secondary"}>
                        {entry.source === "gemini" ? "Gemini AI" : entry.source === "speech" ? "Browser" : "Manual"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {entry.text}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(entry.text)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { downloadTextFile(entry.text, `typify-${entry.id}.txt`); toast.success("Downloaded"); }}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300" onClick={() => handleDelete(entry.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
