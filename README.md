# TYPIFY AI

<div align="center">

**Speak Naturally. Type Intelligently.**

An AI-powered voice typing and writing assistant SaaS web application. Built with Next.js 16, TypeScript, Tailwind CSS, and Google Gemini AI.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.5_AI-8b5cf6?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

[Live Demo](#-deployment--hosting) • [Features](#-key-features) • [Quickstart](#-getting-started) • [Architecture](#-technical-architecture) • [Vercel Deployment](#-deploy-to-vercel)

</div>

---

## 🌟 Overview

**TYPIFY AI** transforms voice dictation into clear text. It is designed for students, software engineers, content creators, and professionals who want to speak freely while producing structured documents, professional emails, code documentation, or casual chats.

### 🎙️ Dual Engine Approach
1. **In-Browser Web Speech Engine**: Zero-latency speech recognition directly in your browser with real-time interim results.
2. **Google Gemini Audio Engine**: Server-side multimodal transcription powered by Google Gemini, capable of handling complex audio recordings, diverse accents, and bilingual speech (English & Tamil).

---

## 🚀 Key Features

### 1. Voice Dictation Studio
- **Interactive Multi-Ring Microphone Button**: Clear visual feedback with pulse animations during active recording.
- **Real-Time Audio Waveform**: HTML5 Canvas audio spectrum analyzer connected to the browser's `AudioContext` and `AnalyserNode`.
- **Interim Speech Highlighting**: Live stream of partial speech dictation prior to finalization.
- **Recording Controls**: Start, pause, resume, stop, and reset recording workflows.

### 2. AI Writing Intelligence (10 Transformations)
- **Grammar & Punctuation**: Corrects spelling, grammar, and sentence structure without altering tone.
- **Make Professional**: Rewrites rough transcripts into formal business communication.
- **Summarize**: Distills complex paragraphs into concise core takeaways.
- **Expand Content**: Deepens ideas with elaboration and examples without inventing facts.
- **Email Converter**: Automatically structures transcripts into formal emails complete with subject line, greeting, and sign-off.
- **Message Converter**: Re-formats voice notes into casual WhatsApp and Slack messages with natural phrasing.
- **Bilingual Translation**: High-accuracy translation between English and Tamil.
- **Paraphrase & Rewrite**: Enhances readability and flow while preserving intent.
- **Make Shorter / Make Longer**: Quick text length adjustments.

### 3. 7 Specialized Writing Modes
- `General` • `Professional` • `Casual` • `Academic` • `Email` • `Social Media` • `Developer Documentation`

### 4. Productivity & Workflow
- **Full Text Editor**: In-place editing with live word and character counters.
- **One-Click Export**: Instant `.txt` file generation and download via Blob streams.
- **Clipboard Sync**: Quick copy with toast notifications.
- **Searchable History**: Saved transcriptions in LocalStorage with instant keyword search, export all, and individual deletions.
- **Custom AI Directives**: Personalize Gemini's output persona and style from Settings.

---

## 🧱 Technical Architecture

```
typify-ai/
├── src/
│   ├── app/
│   │   ├── (app)/                    # SaaS app layout & protected shell
│   │   │   ├── dashboard/page.tsx    # Primary voice studio & quick AI actions
│   │   │   ├── workspace/page.tsx    # Distraction-free voice typing studio
│   │   │   ├── ai-writer/page.tsx    # 10-tool AI transformation workspace
│   │   │   ├── history/page.tsx      # Searchable transcript history
│   │   │   ├── settings/page.tsx     # Custom directives & default preferences
│   │   │   ├── about/page.tsx        # Overview & specifications
│   │   │   └── layout.tsx            # Responsive sidebar & mobile drawer layout
│   │   ├── api/
│   │   │   ├── transcribe/route.ts   # Secure Gemini audio transcription endpoint
│   │   │   └── improve/route.ts      # Secure Gemini text rewriting endpoint
│   │   ├── globals.css               # Clean SaaS light design system
│   │   ├── layout.tsx                # Root layout with Inter font & Sonner toasts
│   │   ├── page.tsx                  # Marketing landing page
│   │   └── not-found.tsx             # 404 handler
│   ├── components/
│   │   ├── ui/                       # Accessible UI primitives (Button, Card, Textarea, Select, Badge, Toast)
│   │   ├── audio-waveform.tsx        # HTML5 Canvas Web Audio API visualizer
│   │   ├── mic-button.tsx            # Animated recording button
│   │   └── sidebar.tsx               # Navigation sidebar
│   ├── hooks/
│   │   ├── use-speech-recognition.ts # Web Speech API integration
│   │   └── use-audio-recorder.ts     # MediaRecorder audio capture hook
│   └── lib/
│       ├── types.ts                  # TypeScript schemas & constants
│       ├── utils.ts                  # Formatting, counters, and file export helpers
│       └── storage.ts                # Type-safe LocalStorage manager
├── .env.example                      # Template for environment configuration
├── vercel.json                       # Vercel deployment configuration
├── next.config.ts                    # Next.js 16 configuration
└── package.json                      # Dependencies & scripts
```

---

## 🔒 Security & Privacy Guarantees

- **Server-Side API Key Isolation**: Your `GEMINI_API_KEY` is referenced **strictly** on the server inside API routes. It is never exposed in client bundles or client requests.
- **Input Validation & DOS Protection**: Text payloads are capped at 50,000 characters; audio uploads are verified against an audio MIME whitelist with a 25MB file size limit.
- **Confidentiality**: Audio is processed in-memory and is not retained or logged on external servers.
- **Client Storage**: User transcriptions and directives remain in your local browser (`localStorage`).

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or later
- **npm**: `v9.0.0` or later
- **Google Gemini API Key**: [Get a free API key from Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hamenath/typify-ai.git
   cd typify-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and insert your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Run the local development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Verify the production build**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploy to Vercel

Deploy TYPIFY AI to Vercel in a few steps:

### Method 1: Using the Vercel Dashboard (Recommended)

1. Push your repository to your GitHub account:
   ```bash
   git push -u origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new).
3. Import the **`typify-ai`** repository.
4. Under **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `Your Google Gemini API Key`
5. Click **Deploy**. Vercel will build and launch your application.

### Method 2: Using the Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
# When prompted, enter your GEMINI_API_KEY
vercel --prod
```

---

## 📡 API Reference

### `POST /api/transcribe`
Transcribes audio recordings with Gemini AI.

- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `audio`: Audio file blob (`audio/webm`, `audio/wav`, `audio/mp3`, max 25MB)
  - `language`: Target language (`en-US` or `ta-IN`)
- **Response**:
  ```json
  {
    "text": "Transcribed speech content formatted with punctuation."
  }
  ```

### `POST /api/improve`
Transforms and edits text using Gemini AI models.

- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "text": "Raw text content",
    "action": "correct | professional | shorter | longer | email | whatsapp | summarize | translate-tamil | translate-english | rewrite",
    "mode": "general | professional | casual | academic | email | social-media | developer-docs",
    "customInstructions": "Optional custom prompt directives"
  }
  ```
- **Response**:
  ```json
  {
    "text": "Polished output from the AI model."
  }
  ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with care using Next.js and Google Gemini AI.</sub>
</div>
