export default function Templates() {
  const templates = [
    { id: "modern-01", name: "Modern Blue" },
    { id: "professional-01", name: "Professional Clean" },
    { id: "minimal-01", name: "Minimal Mono" },
    { id: "creative-01", name: "Creative Gradient" },
    { id: "ats-01", name: "ATS Classic" },
    { id: "student-01", name: "Student Fresher" },
  ];
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Templates</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center text-slate-500">
              {t.name}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-xs text-slate-500 mt-1">ID: {t.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
