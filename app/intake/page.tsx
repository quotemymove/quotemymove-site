// app/intake/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = "idle" | "submitting" | "success" | "error";

export default function IntakePage() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // --- Client-side validation (unchanged logic, clearer errors) ---
    const errs: string[] = [];
    const postcodeRe = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
    if (!postcodeRe.test((data.from_postcode || "").trim())) errs.push("Enter a valid FROM postcode (e.g. G41 3HG).");
    if (!postcodeRe.test((data.to_postcode || "").trim())) errs.push("Enter a valid TO postcode (e.g. DD4 7JQ).");
    if (!data.move_date) errs.push("Select a preferred move date.");
    if (!["Studio","1 Bed","2 Bed","3 Bed","4+ Bed"].includes(data.property_from || "")) errs.push("Select property size.");
    if (!["0","1","2","3","4","5"].includes(data.floors_from || "")) errs.push("Select floors.");
    const phoneRe = /^\+?\d[\d\s()-]{7,}$/;
    if (!phoneRe.test((data.phone || "").trim())) errs.push("Enter a valid phone number.");
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test((data.email || "").trim())) errs.push("Enter a valid email address.");

    if (errs.length) {
      setError(errs.join(" "));
      return;
    }

    try {
      setState("submitting");
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.text()) || "Submission failed");
      setState("success");
      form.reset();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
      setState("error");
    }
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-[15px] text-slate-900 " +
    "placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-orange-500 shadow-sm";

  const selectClass =
    "mt-1 w-full rounded-xl border border-slate-400 bg-white px-3 py-2.5 text-[15px] text-slate-900 " +
    "outline-none focus:ring-2 focus:ring-orange-500 shadow-sm";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold hover:text-orange-600">← QuoteMyMove</Link>
          <div className="text-sm text-slate-700">Removals & Storage Intake</div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight">Tell us about your move</h1>
        <p className="mt-2 text-slate-700">
          2–3 minutes. We’ll use this to generate a smart estimate and offer survey/booking options.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-900">Full name</label>
              <input name="full_name" required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Phone</label>
              <input name="phone" required inputMode="tel" className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-900">Email</label>
              <input name="email" required type="email" className={inputClass} />
            </div>
          </div>

          {/* Addresses */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-900">From postcode</label>
              <input name="from_postcode" required placeholder="e.g. G41 3HG" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">To postcode</label>
              <input name="to_postcode" required placeholder="e.g. DD4 7JQ" className={inputClass} />
            </div>
          </div>

          {/* Move info */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-900">Preferred move date</label>
              <input name="move_date" required type="date" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Property size</label>
              <select name="property_from" required className={selectClass}>
                <option value="">Select…</option>
                <option>Studio</option>
                <option>1 Bed</option>
                <option>2 Bed</option>
                <option>3 Bed</option>
                <option>4+ Bed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Floors (current)</label>
              <select name="floors_from" required className={selectClass}>
                <option value="">Select…</option>
                <option value="0">Ground (0)</option>
                <option value="1">1</option><option value="2">2</option>
                <option value="3">3</option><option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Lift available?</label>
              <select name="lift_from" required className={selectClass}>
                <option value="">Select…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Extras */}
          <div>
            <label className="block text-sm font-medium text-slate-900">Extras</label>
            <div className="mt-2 grid md:grid-cols-3 gap-3 text-[15px] text-slate-800">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="packing" value="yes" /> Packing service
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="storage" value="yes" /> Storage
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="dismantle" value="yes" /> Dismantle/Reassemble
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Special items (optional)</label>
            <input name="special_items" placeholder="e.g. Piano, American fridge, safe" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">Notes (optional)</label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Access/parking details, long carry, images you can send later…"
              className={inputClass}
            />
          </div>

          {/* Messages */}
          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-red-800 text-sm">
              {error}
            </div>
          )}
          {state === "success" && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-emerald-800 text-sm">
              Thank you! We’ve received your details. We’ll generate an estimate and follow up shortly.
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={state === "submitting"}
              className="inline-flex items-center rounded-xl bg-orange-600 px-5 py-2.5 text-white font-semibold hover:bg-orange-700 disabled:opacity-60 shadow"
            >
              {state === "submitting" ? "Submitting…" : "Submit details"}
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl border border-slate-400 px-5 py-2.5 font-semibold hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>

          <p className="text-[12px] text-slate-700">
            By submitting you agree to our Terms and Privacy Policy.
          </p>
        </form>
      </section>
    </main>
  );
}
