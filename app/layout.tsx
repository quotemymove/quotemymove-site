// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'QuoteMyMove – AI removals concierge',
    template: '%s | QuoteMyMove',
  },
  description:
    'Fast, fair, and transparent moving quotes. Chat, send photos/video, and book securely with a deposit.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: 'QuoteMyMove',
    title: 'QuoteMyMove – AI removals concierge',
    description:
      'Fast, fair, and transparent moving quotes across the UK. AI intake with photo/video.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuoteMyMove – AI removals concierge',
    description:
      'Fast, fair, and transparent moving quotes across the UK. AI intake with photo/video.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
