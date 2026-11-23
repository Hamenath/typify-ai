# TYPIFY AI

**Speak Naturally. Type Intelligently.**

A premium AI-powered voice typing web application built with Next.js, TypeScript, Tailwind CSS, and Google Gemini AI.

![TYPIFY AI](https://img.shields.io/badge/TYPIFY-AI-violet?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)

---

## ✨ Features

### Voice Typing
- **Browser Speech Recognition** — Real-time voice-to-text using the Web Speech API
- **Gemini AI Transcription** — Alternative transcription engine using Google Gemini for audio files
- **Audio Recording** — Record audio with the MediaRecorder API with waveform visualization
- **Language Support** — English (US/UK) and Tamil

### AI Writing Assistant
- **Grammar Correction** — Fix spelling, grammar and punctuation
- **Professional Rewriting** — Transform text into formal business language
- **Summarization** — Condense long text into key points
- **Text Expansion** — Elaborate on short text with more detail
- **Translation** — Translate between English and Tamil
- **Email Mode** — Convert text into professional email format
- **Message Mode** — Convert text into casual WhatsApp/chat style
- **Rewrite** — Improve clarity without changing meaning

### Writing Modes
1. General
2. Professional
3. Casual
4. Academic
5. Email
6. Social Media
7. Developer Documentation

### Productivity
- Full text editor with word/character count
- Copy, export, clear and download
- Transcription history with search
- Custom AI instructions
- Responsive design (desktop, tablet, mobile)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or later
- **npm** 9.0 or later
- **Google Gemini API key** ([Get one here](https://aistudio.google.com/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/typify-ai.git
   cd typify-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   > ⚠️ **Important:** Never commit your API key. The `.env.local` file is gitignored by default.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
typify-ai/
├── src/
│   ├── app/
│   │   ├── (app)/                  # App routes with sidebar layout
│   │   │   ├── dashboard/page.tsx  # Main dashboard
│   │   │   ├── workspace/page.tsx  # Voice typing workspace
│   │   │   ├── ai-writer/page.tsx  # AI writing assistant
│   │   │   ├── history/page.tsx    # Transcription history
│   │   │   ├── settings/page.tsx   # App settings
│   │   │   ├── about/page.tsx      # About page
│   │   │   └── layout.tsx          # App shell with sidebar
│   │   ├── api/
│   │   │   ├── transcribe/route.ts # Gemini audio transcription
│   │   │   └── improve/route.ts    # AI text improvement
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   └── not-found.tsx           # 404 page
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   └── toast.tsx
│   │   ├── audio-waveform.tsx      # Audio waveform visualizer
│   │   ├── mic-button.tsx          # Microphone button
│   │   └── sidebar.tsx             # Navigation sidebar
│   ├── hooks/
│   │   ├── use-speech-recognition.ts  # Web Speech API hook
│   │   └── use-audio-recorder.ts      # MediaRecorder hook
│   └── lib/
│       ├── types.ts                # Type definitions
│       ├── utils.ts                # Utility functions
│       └── storage.ts             # LocalStorage helpers
├── .env.example                    # Environment variable template
├── .env.local                      # Your API key (gitignored)
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

---

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env.local` file

---

## 🌐 API Endpoints

### POST `/api/transcribe`
Transcribes audio using Gemini AI.

**Request:** `multipart/form-data`
- `audio` — Audio file (WebM format)
- `language` — Language code (e.g., `en-US`, `ta-IN`)

**Response:**
```json
{ "text": "Transcribed text here" }
```

### POST `/api/improve`
Improves text using Gemini AI.

**Request:** `application/json`
```json
{
  "text": "Text to improve",
  "action": "correct|professional|shorter|longer|email|whatsapp|summarize|translate-tamil|translate-english|rewrite",
  "mode": "general|professional|casual|academic|email|social-media|developer-docs",
  "customInstructions": "Optional custom instructions"
}
```

**Response:**
```json
{ "text": "Improved text here" }
```

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` to environment variables
4. Deploy

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

Ensure the `GEMINI_API_KEY` environment variable is set on your hosting platform.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — React framework
- [Google Gemini AI](https://ai.google.dev/) — AI engine
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Lucide Icons](https://lucide.dev/) — Icons
- [Sonner](https://sonner.emilkowal.dev/) — Toast notifications

---

**TYPIFY AI** — Speak Naturally. Type Intelligently. ✨
