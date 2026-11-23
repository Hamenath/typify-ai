import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ACTION_PROMPTS: Record<string, string> = {
  correct:
    "Fix all grammar, spelling, and punctuation errors in the following text. Preserve the original meaning and tone. Return only the corrected text.",
  professional:
    "Rewrite the following text in a professional and formal tone suitable for business communication. Preserve the original meaning. Return only the rewritten text.",
  shorter:
    "Condense the following text to be shorter while preserving all key information and meaning. Return only the shortened text.",
  longer:
    "Expand the following text with more detail, examples, and elaboration while preserving the original meaning. Do not invent facts. Return only the expanded text.",
  email:
    "Convert the following text into a well-structured professional email with appropriate greeting, body, and closing. Return only the email text.",
  whatsapp:
    "Convert the following text into a friendly, casual WhatsApp message style. Keep it concise and natural. Return only the message text.",
  summarize:
    "Create a concise summary of the following text, capturing all key points. Return only the summary.",
  "translate-tamil":
    "Translate the following text into Tamil. Provide an accurate and natural translation. Return only the Tamil translation.",
  "translate-english":
    "Translate the following text into English. Provide an accurate and natural translation. Return only the English translation.",
  rewrite:
    "Rewrite the following text to improve clarity and readability without changing the original meaning. Return only the rewritten text.",
};

const MODE_INSTRUCTIONS: Record<string, string> = {
  general: "",
  professional: "Use a formal, professional tone appropriate for business contexts.",
  casual: "Use a casual, conversational tone.",
  academic: "Use an academic and scholarly tone with precise language.",
  email: "Format and structure the text as appropriate for email communication.",
  "social-media": "Make the text engaging, concise, and suitable for social media posts.",
  "developer-docs": "Use clear, technical language appropriate for developer documentation. Use precise terminology.",
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your .env.local file." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { text, action, mode, customInstructions } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 });
    }

    if (!action || !ACTION_PROMPTS[action]) {
      return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const candidateModels = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.8-flash"];

    let prompt = ACTION_PROMPTS[action];

    if (mode && MODE_INSTRUCTIONS[mode]) {
      prompt += ` ${MODE_INSTRUCTIONS[mode]}`;
    }

    if (customInstructions && typeof customInstructions === "string" && customInstructions.trim()) {
      prompt += ` Additional instructions: ${customInstructions.trim()}`;
    }

    prompt += `\n\nText:\n${text}`;

    let lastError: unknown = null;
    let improvedText = "";

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = result.response;
        improvedText = response.text();
        if (improvedText && improvedText.trim().length > 0) {
          break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!improvedText || improvedText.trim().length === 0) {
      const errMsg = lastError instanceof Error ? `: ${lastError.message}` : "";
      return NextResponse.json(
        { error: `AI processing failed${errMsg}. Please try again.` },
        { status: 422 }
      );
    }

    return NextResponse.json({ text: improvedText.trim() });
  } catch (error) {
    console.error("AI improve error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `AI processing failed: ${message}` },
      { status: 500 }
    );
  }
}
