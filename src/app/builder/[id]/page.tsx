import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Builder({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  if (params.id === "new") {
    const { data, error } = await supabase
      .from("resumes")
      .insert({ user_id: user.id, title: "Untitled Resume" })
      .select()
      .single();
    if (error || !data) return <div className="p-8">Error: {error?.message}</div>;
    redirect(`/builder/${data.id}`);
  }

  const { data: resume } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!resume) return <div className="p-8">Resume not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{resume.title}</h1>
        <Link href="/dashboard" className="text-sm text-slate-500">← Dashboard</Link>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-slate-600 mb-4">Full editor coming soon. Use AI Assistant to generate content:</p>
        <Link href="/ai-assistant" className="inline-block px-6 py-3 bg-primary text-white rounded-lg">Open AI</Link>
      </div>
    </div>
  );
        }
