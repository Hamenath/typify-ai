import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please set GEMINI_API_KEY in your .env.local file." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;
    const language = (formData.get("language") as string) || "en-US";

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const candidateModels = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.8-flash"];

    const arrayBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    const languageName = language.startsWith("ta") ? "Tamil" : "English";
    const prompt = `Transcribe the following audio accurately. The audio is in ${languageName}. Return only the transcribed text with proper punctuation and capitalization. Do not add any commentary or explanations.`;

    let lastError: unknown = null;
    let text = "";

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: audioFile.type || "audio/webm",
              data: base64Audio,
            },
          },
        ]);
        const response = result.response;
        text = response.text();
        if (text && text.trim().length > 0) {
          break;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!text || text.trim().length === 0) {
      const errMsg = lastError instanceof Error ? `: ${lastError.message}` : "";
      return NextResponse.json(
        { error: `Could not transcribe audio${errMsg}. Please try again.` },
        { status: 422 }
      );
    }

    return NextResponse.json({ text: text.trim() });
  } catch (error) {
    console.error("Transcription error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Transcription failed: ${message}` },
      { status: 500 }
    );
  }
}
