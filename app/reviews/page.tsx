export const metadata = { title: 'Reviews' };

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">Customer reviews</h1>
        <div className="mt-6 grid gap-4">
          {[
            ['“Super quick estimate and smooth move day.”', 'Sarah M.'],
            ['“Transparent and fair pricing. Would use again.”', 'James T.'],
          ].map(([q, n], i) => (
            <blockquote key={i} className="rounded-xl border p-4 bg-white">
              <p className="text-slate-800">{q}</p>
              <cite className="block mt-2 text-sm text-slate-600">— {n}</cite>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}
