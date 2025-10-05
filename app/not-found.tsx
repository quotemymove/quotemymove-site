export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center text-center p-10">
      <div>
        <div className="text-5xl font-black">404</div>
        <p className="mt-2 text-slate-700">This page could not be found.</p>
        <a className="mt-4 inline-block rounded-xl bg-orange-600 text-white px-4 py-2" href="/">Back home</a>
      </div>
    </main>
  );
}
