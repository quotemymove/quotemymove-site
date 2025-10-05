export const metadata = { title: 'How it works' };

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">How it works</h1>
        <ol className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ['Say hello', 'Start a chat on our site or WhatsApp.'],
            ['Share details', 'Postcodes, property size, access, and any photos.'],
            ['Get estimate', 'Clear price range and recommended crew.'],
            ['Book & relax', 'Pay deposit, get instant confirmation and reminders.'],
          ].map(([t, d], i) => (
            <li key={i} className="rounded-2xl border border-slate-300 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-900 text-white grid place-items-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="font-semibold text-slate-900">{t}</div>
              </div>
              <p className="mt-2 text-slate-700 text-sm">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
