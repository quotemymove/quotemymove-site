'use client';

import { useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    const supa = createSupabaseBrowser();

    // Use absolute site URL so magic link works on Vercel + your domain.
    const site = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    const { error } = await supa.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${site}/auth/callback?next=/admin`,
      },
    });

    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {sent ? (
          <>
            <h1 className="text-2xl font-extrabold">Admin sign in</h1>
            <p className="mt-2 text-slate-600">We’ve sent you a one-time login link.</p>
            <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-emerald-800">
              Check your inbox for the magic link.
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold">Admin sign in</h1>
            <p className="mt-2 text-slate-600">We’ll email you a one-time login link.</p>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@quotemymove.co.uk"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700"
              >
                Send login link
              </button>
            </form>

            {err && (
              <p className="mt-3 text-sm text-red-600">
                {err}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
