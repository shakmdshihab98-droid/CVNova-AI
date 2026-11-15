import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MyResumes() {
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
      <h1 className="text-3xl font-bold mb-6">My Resumes</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {resumes?.map((r: any) => (
          <Link key={r.id} href={`/builder/${r.id}`} className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold">{r.title}</h3>
            <p className="text-sm text-slate-500">Updated: {new Date(r.updated_at).toLocaleDateString()}</p>
          </Link>
        ))}
        {!resumes?.length && <p className="text-slate-500">No resumes.</p>}
      </div>
    </div>
  );
    }
