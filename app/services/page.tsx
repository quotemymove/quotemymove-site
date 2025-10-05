export const metadata = { title: 'Services' };

const LINKS = [
  ['Removals', '/services/removals'],
  ['Packing', '/services/packing'],
  ['Storage', '/services/storage'],
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">Services</h1>
        <ul className="mt-6 grid sm:grid-cols-2 gap-4">
          {LINKS.map(([name, href]) => (
            <li key={href} className="rounded-xl border p-4">
              <a className="font-semibold hover:text-orange-600" href={href}>{name}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
