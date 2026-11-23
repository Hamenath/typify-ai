export interface TranscriptionEntry {
  id: string;
  text: string;
  timestamp: number;
  language: string;
  mode: WritingMode;
  source: "speech" | "gemini" | "manual";
}

export type WritingMode =
  | "general"
  | "professional"
  | "casual"
  | "academic"
  | "email"
  | "social-media"
  | "developer-docs";

export type AIAction =
  | "correct"
  | "professional"
  | "shorter"
  | "longer"
  | "email"
  | "whatsapp"
  | "summarize"
  | "translate-tamil"
  | "translate-english"
  | "rewrite";

export interface AIActionOption {
  id: AIAction;
  label: string;
  description: string;
  icon: string;
}

export interface AppSettings {
  language: string;
  writingMode: WritingMode;
  customInstructions: string;
  autoCorrect: boolean;
  autoPunctuation: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: "en-US",
  writingMode: "general",
  customInstructions: "",
  autoCorrect: false,
  autoPunctuation: true,
};

export const WRITING_MODES: { value: WritingMode; label: string }[] = [
  { value: "general", label: "General" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "academic", label: "Academic" },
  { value: "email", label: "Email" },
  { value: "social-media", label: "Social Media" },
  { value: "developer-docs", label: "Developer Docs" },
];

export const AI_ACTIONS: AIActionOption[] = [
  { id: "correct", label: "Correct Grammar", description: "Fix grammar, spelling and punctuation", icon: "CheckCircle" },
  { id: "professional", label: "Make Professional", description: "Rewrite in a professional tone", icon: "Briefcase" },
  { id: "shorter", label: "Make Shorter", description: "Condense the text", icon: "Minimize2" },
  { id: "longer", label: "Make Longer", description: "Expand with more detail", icon: "Maximize2" },
  { id: "email", label: "Convert to Email", description: "Format as a professional email", icon: "Mail" },
  { id: "whatsapp", label: "Convert to Message", description: "Format as a casual message", icon: "MessageCircle" },
  { id: "summarize", label: "Summarize", description: "Create a brief summary", icon: "FileText" },
  { id: "translate-tamil", label: "Translate to Tamil", description: "Translate text into Tamil", icon: "Languages" },
  { id: "translate-english", label: "Translate to English", description: "Translate text into English", icon: "Languages" },
  { id: "rewrite", label: "Rewrite", description: "Rewrite without changing meaning", icon: "RefreshCw" },
];

export const LANGUAGES = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "ta-IN", label: "Tamil" },
];
