"use client";
import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const supa = createSupabaseBrowser();
    const { error } = await supa.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `http://127.0.0.1:3000/auth/callback?next=/admin`,
      },
    });
    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="w-[420px] rounded-2xl border p-6">
        <h1 className="font-bold text-xl mb-2">Admin sign in</h1>
        {sent ? (
          <p className="text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded">
            Check your inbox for the magic link.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-3 py-2"
              placeholder="you@quotemymove.co.uk"
            />
            <button className="w-full rounded-xl bg-orange-600 px-4 py-2 text-white font-semibold">
              Send login link
            </button>
            {err && <p className="text-sm text-red-600">{err}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
