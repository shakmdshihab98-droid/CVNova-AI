import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Build Your <span className="text-primary">AI-Powered</span> CV
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          50+ Templates • ATS Optimized • Unlimited Free Forever
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/register" className="px-8 py-4 rounded-xl bg-primary text-white text-lg font-semibold hover:bg-indigo-700">
            Start Free →
          </Link>
          <Link href="/templates" className="px-8 py-4 rounded-xl bg-white border border-slate-300 text-lg font-semibold hover:bg-slate-50">
            View Templates
          </Link>
        </div>
      </section>
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-20">
        {[
          { t: "AI Writer", d: "Groq + Gemini dual AI, unlimited free" },
          { t: "50+ Templates", d: "Modern, ATS, Creative, Executive" },
          { t: "Always Free", d: "No subscription, no hidden cost" },
        ].map((f) => (
          <div key={f.t} className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-lg font-bold mb-2">{f.t}</h3>
            <p className="text-slate-600 text-sm">{f.d}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
