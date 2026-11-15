"use client";
import { useState } from "react";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const ask = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setErr(""); setResult(""); setProvider("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data.text);
      setProvider(data.provider);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">AI Assistant</h1>
      <p className="text-sm text-slate-500 mb-6">Groq → Gemini fallback. Unlimited free.</p>
      <textarea
        className="w-full border p-3 rounded-lg h-40"
        placeholder="e.g. Write a professional summary for a junior dev in Bangladesh..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={ask}
        disabled={loading}
        className="mt-3 px-6 py-3 bg-primary text-white rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {err && <p className="mt-4 text-red-600 text-sm">{err}</p>}
      {result && (
        <div className="mt-6 p-5 bg-white rounded-xl shadow">
          <div className="text-xs text-slate-400 mb-2">Provider: {provider}</div>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
        }
