import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-8 py-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold text-primary">CVNova</Link>
      <div className="flex gap-2 md:gap-4">
        <Link href="/templates" className="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm">Templates</Link>
        <Link href="/ai-assistant" className="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm">AI</Link>
        <Link href="/login" className="px-3 py-2 rounded-lg hover:bg-slate-100 text-sm">Login</Link>
        <Link href="/register" className="px-3 py-2 rounded-lg bg-primary text-white text-sm hover:bg-indigo-700">Sign Up</Link>
      </div>
    </nav>
  );
}
