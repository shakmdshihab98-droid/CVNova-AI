import { NextRequest, NextResponse } from "next/server";
import { askGroq } from "@/lib/ai/groq";
import { askGemini } from "@/lib/ai/gemini";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "prompt required" }, { status: 400 });
    }

    // 1st try: Groq
    try {
      const text = await askGroq(prompt);
      return NextResponse.json({ text, provider: "groq" });
    } catch (e) {
      console.warn("Groq failed → Gemini fallback", e);
    }

    // 2nd try: Gemini
    try {
      const text = await askGemini(prompt);
      return NextResponse.json({ text, provider: "gemini" });
    } catch (e) {
      console.error("Gemini also failed", e);
    }

    return NextResponse.json({ error: "Both AI providers failed. Try later." }, { status: 503 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
        }
