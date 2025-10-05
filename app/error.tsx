'use client';
export default function Error({ error }: { error: Error }) {
  return (
    <main className="min-h-[60vh] grid place-items-center text-center p-10">
      <div>
        <div className="text-3xl font-black">Something went wrong</div>
        <p className="mt-2 text-slate-700">{error.message}</p>
        <a className="mt-4 inline-block rounded-xl bg-orange-600 text-white px-4 py-2" href="/">Back home</a>
      </div>
    </main>
  );
}
