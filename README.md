# TYPIFY AI — Voice Typist Agent

<div align="center">

<img src="https://raw.githubusercontent.com/Hamenath/typify-ai/main/public/favicon.ico" width="80" height="80" alt="TYPIFY AI Logo" />

### *Speak Naturally. Type Intelligently.*

An AI-powered voice typing, real-time audio transcription, and writing assistant SaaS web application. Built with Next.js 16, TypeScript, Tailwind CSS, Google Gemini 3.5 AI, and Lenis smooth momentum scrolling.

---

[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://typify-ai-7.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Google Gemini 3.5](https://img.shields.io/badge/Google_Gemini-3.5_Flash-8b5cf6?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-emerald?style=for-the-badge&logo=pwa)](https://typify-ai-7.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

[🌐 Live Application](https://typify-ai-7.vercel.app/) • [📱 Mobile App / APK](#-mobile-app--pwa-installation) • [✨ Key Features](#-key-features) • [🚀 Quickstart](#-getting-started) • [🔒 Security](#-security--privacy-architecture) • [📦 Deployment](#-vercel-production-deployment)

</div>

---

## ⚡ What is TYPIFY AI?

**TYPIFY AI** is a full-stack, voice-first AI typist and writing copilot. It allows students, software engineers, freelancers, and content creators to speak freely without typing barriers, converting raw thoughts into structured documents, emails, documentation, and casual messages in real-time.

```
       ┌────────────────┐
       │ Spoken Audio   │
       └───────┬────────┘
               │
        ───────┴───────
       │               │
       ▼               ▼
┌─────────────┐ ┌─────────────┐
│  Browser    │ │   Gemini    │
│ Web Speech  │ │  Multimodal │
│  (Realtime) │ │  Audio API  │
└──────┬──────┘ └──────┬──────┘
       │               │
        ───────┬───────
               ▼
┌─────────────────────────────┐
│    Interactive Editor       │
│  (Word / Char Count, Wave)  │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  Gemini 3.5 Writing Engine  │
│ 10 Transformations • 7 Modes│
└─────────────────────────────┘
```

---

## ✨ Key Features

### 🎙️ 1. Dual-Engine Transcription Studio
- **Browser Web Speech Engine**: Instant, zero-latency dictation directly in Chrome, Edge, and Safari with real-time interim results.
- **Google Gemini Audio Engine**: Multimodal audio transcription running server-side on `gemini-3.5-flash-lite` with fallback redundancy to handle noisy recordings, complex vocabulary, and bilingual audio.
- **Real-Time Canvas Waveform**: HTML5 Canvas spectrum analyzer visualizing audio frequencies via `AudioContext` and `AnalyserNode`.
- **Haptic Microphone Button**: Pulsing multi-ring button with tactile feedback for start, pause, resume, and stop.

### 🧠 2. 10 AI Writing Transformations
1. **Grammar & Spelling Correction**: Fixes errors and applies standard punctuation.
2. **Make Professional**: Translates casual speech into formal business language.
3. **Summarize**: Condenses large paragraphs into high-impact bulleted summaries.
4. **Expand Content**: Elaborates on short dictation with examples and reasoning without inventing facts.
5. **Convert to Email**: Formats dictation into a structured email with subject, greeting, body, and sign-off.
6. **Convert to Message**: Adapts text for WhatsApp, Slack, and social chat formats.
7. **Translate to Tamil**: Accurate, natural English-to-Tamil translation.
8. **Translate to English**: Seamless Tamil-to-English translation.
9. **Paraphrase & Rewrite**: Restructures sentences for flow while preserving original meaning.
10. **Make Shorter / Longer**: Adjusts text density with a single click.

### 🎭 3. 7 Specialized Writing Modes
- **General**: Neutral, clear tone.
- **Professional**: Corporate, business-ready tone.
- **Casual**: Friendly, conversational phrasing.
- **Academic**: Scholarly tone with precise research terminology.
- **Email**: Formatted business correspondence.
- **Social Media**: Punchy, engaging copy for posts and threads.
- **Developer Documentation**: Clear, technical phrasing for READMEs and code comments.

### 📱 4. Mobile App (PWA & APK Download)
- **Installable PWA**: Install directly onto iOS Safari ("Add to Home Screen") and Android Chrome ("Install App") for a fullscreen native app experience without browser URL bars.
- **Mobile Bottom Navigation Bar**: Pinned, safe-area-padded navigation (`Studio`, `Voice`, `AI Write`, `History`, `Settings`) with an elevated center mic button.
- **Download APK Modal**: 1-click mobile download package on the landing page.

### 💾 5. Productivity & History
- **Searchable History**: Saved transcriptions stored locally in your browser with real-time text search and filter.
- **One-Click Export**: Instant `.txt` file download and clipboard copy with toast feedback.
- **Custom AI Instructions**: Define custom persistent personas from Settings (e.g., "Always use UK English spelling").

---

## 🎨 Design & Aesthetic

- **Theme**: Premium Light SaaS with subtle violet (`#7c3aed`), indigo (`#4f46e5`), and cyan accents.
- **Smooth Momentum Scrolling**: Driven by `lenis` with an Apple deceleration curve:
  $$\text{Easing}(t) = \min(1, 1.001 - 2^{-10t})$$
- **GSAP Animations**: Staggered scroll reveals, spring card hover states (`.apple-card`), and active button scale compression (`.apple-button`).
- **Responsive Layout**: Fluid experience across mobile, tablet, and desktop displays.

---

## 📁 Repository Structure

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
│   │   ├── mobile-bottom-nav.tsx     # Native mobile app navigation bar
│   │   ├── install-app-banner.tsx    # PWA install prompt banner
│   │   ├── download-apk-modal.tsx    # Mobile APK download modal
│   │   ├── smooth-scroll.tsx         # Lenis smooth scroll provider
│   │   └── sidebar.tsx               # Navigation sidebar
│   ├── hooks/
│   │   ├── use-speech-recognition.ts # Web Speech API integration
│   │   └── use-audio-recorder.ts     # MediaRecorder audio capture hook
│   └── lib/
│       ├── types.ts                  # TypeScript schemas & constants
│       ├── utils.ts                  # Formatting, counters, and file export helpers
│       └── storage.ts                # Type-safe LocalStorage manager
├── public/
│   └── manifest.json                 # PWA Web App Manifest
├── .env.example                      # Template for environment configuration
├── next.config.ts                    # Next.js 16 configuration
└── package.json                      # Dependencies & scripts
```

---

## 🔒 Security & Privacy Architecture

- **Zero Client-Side Secret Leakage**: Your `GEMINI_API_KEY` is referenced exclusively on the server in Next.js route handlers. No API keys are bundled into client code.
- **Audio File Sanitization**: Audio uploads are validated against an audio MIME type whitelist and a strict $25\text{MB}$ size limit.
- **Input Constraints**: Text transformations are bounded at $50,000$ characters to prevent memory exhaustion and rate-limit spikes.
- **In-Memory Audio Processing**: Uploaded audio buffers are processed in memory and never written to disk or third-party storage.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or later
- **npm**: `v9.0.0` or later
- **Google Gemini API Key**: [Get a free API key from Google AI Studio](https://aistudio.google.com/apikey)

### Local Setup

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
   Add your Gemini API key in `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Vercel Production Deployment

TYPIFY AI is pre-configured for deployment on **Vercel**:

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```
2. Open **[vercel.com/new](https://vercel.com/new)** and import `Hamenath/typify-ai`.
3. In **Environment Variables**, add:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key`
4. Click **Deploy**. Vercel will build and assign your production URL.

---

## 📱 Mobile App / PWA Installation

### Android (Chrome)
1. Open the deployed application URL in Chrome.
2. Tap the **"Install TYPIFY AI"** banner or tap Chrome's menu (`⋮`) $\rightarrow$ **"Install app"**.
3. Launch TYPIFY AI from your home screen or app drawer.

### iOS (Safari)
1. Open the application in Safari.
2. Tap the **Share** button at the bottom of the screen.
3. Scroll down and tap **"Add to Home Screen"**.

---

## 📡 API Reference

### `POST /api/transcribe`
Transcribes audio recordings with Gemini AI.
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `audio`: Audio file blob (`audio/webm`, `audio/wav`, `audio/mp3`, max 25MB)
  - `language`: `en-US` or `ta-IN`
- **Response**:
  ```json
  { "text": "Transcribed text formatted with punctuation." }
  ```

### `POST /api/improve`
Transforms and refines text using Gemini 3.5 AI.
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "text": "Rough dictation",
    "action": "correct | professional | shorter | longer | email | whatsapp | summarize | translate-tamil | translate-english | rewrite",
    "mode": "general | professional | casual | academic | email | social-media | developer-docs",
    "customInstructions": "Optional custom prompt directives"
  }
  ```
- **Response**:
  ```json
  { "text": "Polished, transformed content." }
  ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with care by Hamenath using Next.js 16 and Google Gemini AI.</sub>
</div>
