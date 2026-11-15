import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex gap-3 mb-8 flex-wrap">
        <Link href="/builder/new" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold">+ New Resume</Link>
        <Link href="/ai-assistant" className="px-6 py-3 bg-white border rounded-lg font-semibold">AI Assistant</Link>
        <Link href="/my-resumes" className="px-6 py-3 bg-white border rounded-lg font-semibold">My Resumes</Link>
      </div>
      <h2 className="text-xl font-semibold mb-3">Recent ({resumes?.length || 0})</h2>
      {resumes && resumes.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {resumes.map((r: any) => (
            <Link key={r.id} href={`/builder/${r.id}`} className="p-4 bg-white rounded-xl shadow hover:shadow-md">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-slate-500 mt-1">Updated: {new Date(r.updated_at).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No resumes yet.</p>
      )}
    </div>
  );
}
