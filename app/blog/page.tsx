export const metadata = { title: 'Blog' };

const POSTS = [
  { slug: 'moving-checklist-uk', title: 'The essential UK moving checklist', excerpt: 'Everything to do from 4 weeks out.' },
  { slug: 'how-we-estimate', title: 'How our estimates work', excerpt: 'Transparent pricing explained.' },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">Blog</h1>
               <ul className="mt-6 space-y-4">
          {POSTS.map(p => (
            <li key={p.slug} className="rounded-xl border p-4">
              <a className="font-semibold hover:text-orange-600" href={`/blog/${p.slug}`}>{p.title}</a>
              <p className="text-sm text-slate-700 mt-1">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
