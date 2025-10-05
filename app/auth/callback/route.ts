// app/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const next = url.searchParams.get('next') || '/admin';

  // Exchange the OTP/code for a session and set cookies.
  const supa = createSupabaseRouteClient(req);
  const { error } = await supa.auth.exchangeCodeForSession();

  if (error) {
    // Surface a friendly error on the homepage if something goes wrong.
    const home = new URL('/', req.url);
    home.searchParams.set('error', error.message);
    return NextResponse.redirect(home);
  }

  // Redirect to the intended page, now authenticated.
  return NextResponse.redirect(new URL(next, req.url));
}
