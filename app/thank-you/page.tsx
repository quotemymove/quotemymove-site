"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type EstimatePayload = {
  ok: boolean;
  low: number;
  high: number;
  currency: string;
  breakdown: any;
};

export default function ThankYou() {
  const [data, setData] = useState<EstimatePayload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("qmm:lastSubmission");
    if (!raw) {
      setErr("No submission found. Please complete the form again.");
      return;
    }
    fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
    })
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok) setData(j);
        else setErr(j?.error || "Could not calculate estimate.");
      })
      .catch((e) => setErr(String(e)));
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Thank you — here’s your estimate</h1>
        <p className="mt-2 text-slate-700">
          This is an indicative price range in <b>GBP</b> based on your move details.
        </p>

        {err && (
          <div className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-red-800">
            {err} <Link href="/intake" className="underline">Go back</Link>
          </div>
        )}

        {data && (
          <div className="mt-6 rounded-2xl border border-slate-300 p-6 bg-white shadow-sm">
            <div className="text-4xl font-black text-slate-900">
              £{data.low} – £{data.high}
            </div>
            <div className="mt-1 text-slate-600 text-sm">Approximate total cost</div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Info label="Crew" value={String(data.breakdown.crew)} />
              <Info label="Miles (approx.)" value={String(data.breakdown.miles)} />
              <Info label="Hours (adjusted)" value={String(data.breakdown.adjusted_hours)} />
              <Info label="Hourly rate" value={`£${data.breakdown.hourly_rate}/hr`} />
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <Chip label="Labour" value={`£${data.breakdown.labour}`} />
              <Chip label="Travel" value={`£${data.breakdown.travel}`} />
              <Chip label="Extras" value={`£${data.breakdown.extras}`} />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/intake" className="inline-flex items-center justify-center rounded-2xl bg-orange-600 px-6 py-3 text-white font-semibold shadow hover:bg-orange-700">
                Adjust details
              </Link>
              <Link href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-50">
                Book a survey
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-600">
              To confirm the final price, we may ask for a quick video survey for accuracy.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-300 p-3 bg-white">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-300 p-4 bg-slate-50 text-center">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  );
}
