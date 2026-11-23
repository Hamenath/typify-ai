import { TranscriptionEntry, AppSettings, DEFAULT_SETTINGS } from "./types";

const HISTORY_KEY = "typify-ai-history";
const SETTINGS_KEY = "typify-ai-settings";

export function getHistory(): TranscriptionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: TranscriptionEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {
    console.error("Failed to save history to localStorage");
  }
}

export function addHistoryEntry(entry: TranscriptionEntry) {
  const history = getHistory();
  history.unshift(entry);
  if (history.length > 100) history.length = 100;
  saveHistory(history);
}

export function deleteHistoryEntry(id: string) {
  const history = getHistory().filter((e) => e.id !== id);
  saveHistory(history);
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    console.error("Failed to save settings to localStorage");
  }
}
