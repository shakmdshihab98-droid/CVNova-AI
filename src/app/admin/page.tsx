import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Admin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single();

  if (profile?.role !== "admin") {
    return <div className="p-8">Access denied. Admin only.</div>;
  }

  const { count: users } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: resumes } = await supabase.from("resumes").select("*", { count: "exact", head: true });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-sm text-slate-500">Users</div>
          <div className="text-3xl font-bold">{users ?? 0}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-sm text-slate-500">Resumes</div>
          <div className="text-3xl font-bold">{resumes ?? 0}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-sm text-slate-500">AI</div>
          <div className="text-lg font-bold">Groq → Gemini</div>
        </div>
      </div>
    </div>
  );
         }
