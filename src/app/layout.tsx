import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CVNova — Free AI CV Builder",
  description: "50+ Templates • AI Powered • ATS Optimized • Unlimited Free",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen">{children}</body>
    </html>
  );
        }
