import type { Metadata } from 'next';
type Props = { params: { slug: string } };

const AREAS = {
  glasgow: { name: 'Glasgow', copy: 'Local moves across Glasgow and nearby towns.' },
  dundee: { name: 'Dundee', copy: 'Fast, transparent quotes in Dundee and Angus.' },
  edinburgh: { name: 'Edinburgh', copy: 'Experienced city moves across Edinburgh.' },
};

export function generateMetadata({ params }: Props): Metadata {
  const area = AREAS[params.slug as keyof typeof AREAS];
  const title = area ? `${area.name} removals` : 'Area';
  return { title };
}

export default function Page({ params }: Props) {
  const area = AREAS[params.slug as keyof typeof AREAS];
  if (!area) return <div className="p-10">Area not found.</div>;
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">{area.name} removals</h1>
        <p className="mt-4 text-slate-700">{area.copy}</p>
      </section>
    </main>
  );
}
