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
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            Transcription History
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            {entries.length} transcription{entries.length !== 1 ? "s" : ""} securely saved in your browser storage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportAll} disabled={entries.length === 0} className="font-semibold">
            <Download className="w-4 h-4 mr-1.5 text-slate-500" /> Export All
          </Button>
          <Button
            variant={confirmClear ? "destructive" : "outline"}
            size="sm"
            onClick={handleClearAll}
            disabled={entries.length === 0}
            className="font-semibold"
          >
            {confirmClear ? (
              <>
                <AlertTriangle className="w-4 h-4 mr-1.5" /> Click Again to Confirm
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-1.5 text-rose-500" /> Clear All
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transcripts by keywords..."
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-xs font-medium"
        />
      </div>

      {/* Entries List */}
      {filtered.length === 0 ? (
        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardContent className="py-16">
            <div className="text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700 mb-1">
                {searchQuery ? "No matching transcripts found" : "No transcriptions yet"}
              </h3>
              <p className="text-xs text-slate-400">
                {searchQuery
                  ? "Try searching for a different keyword"
                  : "Start voice typing to record and preserve transcripts here"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((entry) => (
            <Card key={entry.id} className="border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-150 bg-white group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary" className="font-semibold">
                        {WRITING_MODES.find((m) => m.value === entry.mode)?.label || entry.mode}
                      </Badge>
                      <Badge variant="outline">
                        {LANGUAGES.find((l) => l.value === entry.language)?.label || entry.language}
                      </Badge>
                      <Badge variant={entry.source === "gemini" ? "default" : "secondary"}>
                        {entry.source === "gemini" ? "Gemini AI" : entry.source === "speech" ? "Browser API" : "Manual"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-normal">
                      {entry.text}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(entry.timestamp).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-800" onClick={() => handleCopy(entry.text)} title="Copy">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-800" onClick={() => { downloadTextFile(entry.text, `typify-${entry.id}.txt`); toast.success("Downloaded"); }} title="Download">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50" onClick={() => handleDelete(entry.id)} title="Delete">
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
