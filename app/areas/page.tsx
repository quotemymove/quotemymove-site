export const metadata = { title: 'Areas we cover' };

const AREAS = [
  { slug: 'glasgow', name: 'Glasgow' },
  { slug: 'dundee', name: 'Dundee' },
  { slug: 'edinburgh', name: 'Edinburgh' },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">Areas we cover</h1>
        <ul className="mt-6 grid sm:grid-cols-2 gap-4">
          {AREAS.map((a) => (
            <li key={a.slug} className="rounded-xl border p-4">
              <a className="font-semibold hover:text-orange-600" href={`/areas/${a.slug}`}>{a.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
