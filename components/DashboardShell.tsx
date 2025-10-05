import Link from "next/link";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-600 to-amber-500" />
            <span className="font-extrabold">QuoteMyMove Admin</span>
          </div>
          <nav className="text-sm">
            <Link className="px-3 py-1.5 rounded-lg hover:bg-slate-100" href="/admin">Leads</Link>
            <Link className="px-3 py-1.5 rounded-lg hover:bg-slate-100" href="/admin/settings">Settings</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
