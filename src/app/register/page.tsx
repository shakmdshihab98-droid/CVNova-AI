"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    });
    if (error) setMsg(error.message);
    else {
      setMsg("Registered! Check email to verify.");
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input className="w-full border p-3 rounded-lg" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full border p-3 rounded-lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border p-3 rounded-lg" type="password" placeholder="Password (min 6)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Sign Up — Free</button>
      </form>
      {msg && <p className="mt-4 text-sm text-slate-600">{msg}</p>}
      <p className="mt-4 text-center text-sm">Have account? <Link href="/login" className="text-primary">Login</Link></p>
    </div>
  );
  }
