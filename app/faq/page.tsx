export const metadata = { title: 'FAQ' };

const faqs = [
  ['Is the estimate fixed?', 'It’s a smart range; fixed quotes after a quick survey.'],
  ['How do deposits work?', 'Securely via Stripe. Applied to your final bill.'],
  ['Do you offer packing?', 'Yes — full or partial, plus boxes/materials.'],
  ['How is my data protected?', 'PII minimised, encrypted storage, GDPR compliant.'],
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">FAQ</h1>
        <div className="mt-8 divide-y divide-slate-200 bg-white border border-slate-300 rounded-2xl">
          {faqs.map(([q, a], i) => (
            <details key={i} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="font-semibold text-slate-800">{q}</span>
                <span className="transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-2 text-slate-700">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
