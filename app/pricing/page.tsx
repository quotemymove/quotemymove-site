export const metadata = { title: 'Pricing' };

function Tier({ name, price, items }: { name: string; price: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-300 p-6 bg-white shadow-sm">
      <div className="font-semibold text-slate-900">{name}</div>
      <div className="text-2xl font-black mt-1">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc list-inside">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">Simple, upfront pricing</h1>
        <p className="mt-3 text-slate-700">All figures shown are guidance; final quote after survey.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Tier name="2 movers + Luton" price="from £85/hr" items={['3 hr minimum','Local moves','1–2 bed']} />
          <Tier name="3 movers + Luton" price="from £110/hr" items={['4 hr minimum','Most popular','2–3 bed']} />
          <Tier name="4 movers + 2 vans" price="from £165/hr" items={['Project moves','Faster load/unload','3–4 bed+']} />
        </div>
      </section>
    </main>
  );
}
