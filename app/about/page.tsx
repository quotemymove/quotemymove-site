export const metadata = { title: 'About' };

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-black tracking-tight">About QuoteMyMove</h1>
        <p className="mt-4 text-slate-700">
          We’re building the fastest, most transparent removals experience in the UK —
          with instant estimates, real crew availability, and secure deposits.
        </p>
      </section>
    </main>
  );
}
