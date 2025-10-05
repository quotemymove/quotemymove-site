import type { Metadata } from 'next';

const POSTS = {
  'moving-checklist-uk': {
    title: 'The essential UK moving checklist',
    body: 'Short intro… (replace with real content).'
  },
  'how-we-estimate': {
    title: 'How our estimates work',
    body: 'Explain labour, travel, extras, and ranges.'
  },
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS[params.slug as keyof typeof POSTS];
  return { title: post ? post.title : 'Blog post' };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug as keyof typeof POSTS];
  if (!post) return <div className="p-10">Post not found.</div>;
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">{post.title}</h1>
        <article className="prose prose-slate mt-6 max-w-none">
          <p>{post.body}</p>
        </article>
      </section>
    </main>
  );
}
