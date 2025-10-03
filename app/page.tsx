// app/page.tsx – QuoteMyMove Landing Page
// Next.js App Router + TailwindCSS

import Link from "next/link";

// Inline logo component (safe, no missing file issues)
function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="QuoteMyMove logo"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="48" height="48" rx="12" fill="url(#g)" />
      <path
        d="M14 16h20a2 2 0 0 1 2 2v8a6 6 0 0 1-6 6H20l-6 4v-4h-0a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2z"
        fill="#fff"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Announcement bar */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white text-center text-sm py-2">
        <span className="font-medium">New:</span> QuoteMyMove AI – instant
        estimates with photo/video intake.
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-bold tracking-tight text-lg">
              QuoteMyMove
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#features" className="hover:text-orange-600">
              Features
            </Link>
            <Link href="#how" className="hover:text-orange-600">
              How it works
            </Link>
            <Link href="#pricing" className="hover:text-orange-600">
              Pricing
            </Link>
            <Link href="#faq" className="hover:text-orange-600">
              FAQ
            </Link>
            <Link href="#contact" className="hover:text-orange-600">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="#quote"
              className="hidden sm:inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
            >
              Log in
            </Link>
            <Link
              href="#quote"
              className="inline-flex items-center rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700"
            >
              Get an instant estimate
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Your <span className="text-orange-600">AI removals concierge</span>
              .<br />
              Fast, fair, and transparent quotes.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl">
              Ditch 20-minute forms. Chat, send photos or a quick video
              walkthrough and get a smart estimate in minutes. Book securely
              with a deposit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-white font-semibold shadow hover:bg-slate-800"
              >
                Try the AI assistant
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-50"
              >
                Watch 60s demo
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                Live ETA updates
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                Secure deposits via Stripe
              </div>
            </div>
          </div>

          {/* Chat preview */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 shadow-sm p-4 bg-white">
              <div className="rounded-2xl bg-slate-50 p-4 h-[420px] flex flex-col">
                <div className="text-xs text-slate-500 mb-3">
                  Assistant preview
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                  <Bubble who="ai" text="Hi! I’m your removals assistant. Where are you moving from?" />
                  <Bubble who="me" text="G41 3HG to DD4 7JQ, mid October." />
                  <Bubble who="ai" text="Got it. What size is your current property and is there a lift?" />
                  <Bubble who="me" text="3-bed, 2nd floor, no lift." />
                  <Bubble who="ai" text="Thanks! Estimate £520–£690 with a 3-person crew. Want to book a survey or reserve a date?" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight">
            Why customers love it
          </h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              title="Chat, voice, or photos"
              desc="Skip long forms. Send a voice note or quick video walkthrough for smarter estimates."
            />
            <Feature
              title="Transparent pricing"
              desc="See base rate, travel time, access multipliers, and special item fees before you book."
            />
            <Feature
              title="Real calendar slots"
              desc="Reserve an actual crew & van slot. Secure your date with a small deposit."
            />
            <Feature
              title="Secure by design"
              desc="Stripe payments, GDPR-compliant storage, and PII minimisation to protect your data."
            />
            <Feature
              title="Live move updates"
              desc="Get day-before reminders and day-of ETA right in chat or by SMS."
            />
            <Feature
              title="Human when needed"
              desc="Special items or high-value moves trigger a quick video survey with an expert."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <span className="font-bold">QuoteMyMove</span>
          </div>
          <p className="mt-3 text-slate-600">
            AI-powered quoting and booking for removals & storage.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            © {new Date().getFullYear()} QuoteMyMove. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Bubble({ who, text }: { who: "ai" | "me"; text: string }) {
  const isAI = who === "ai";
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div
        className={`${
          isAI ? "bg-white border border-slate-200" : "bg-orange-600 text-white"
        } max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm`}
      >
        {text}
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
      <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-700 grid place-items-center font-bold">
        ★
      </div>
      <h3 className="mt-3 font-semibold text-lg">{title}</h3>
      <p className="mt-1 text-slate-600 text-sm">{desc}</p>
    </div>
  );
}
