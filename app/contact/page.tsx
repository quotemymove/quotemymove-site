export const metadata = { title: 'Contact' };

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">Contact</h1>
        <div className="mt-6 rounded-2xl border border-slate-300 p-6 bg-white shadow-sm">
          <p className="text-slate-700">
            Email: <a className="underline" href="mailto:hello@quotemymove.co.uk">hello@quotemymove.co.uk</a><br/>
            WhatsApp: +44 7xxx xxx xxx<br/>
            Office: Glasgow, Scotland
          </p>
        </div>
      </section>
    </main>
  );
}
