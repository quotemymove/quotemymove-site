import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseRouteClient } from '@/lib/supabase-server';

// Paths that are actual login pages (always allowed even if unauthenticated)
const LOGIN_PATHS = ['/admin/login', '/portal/login', '/partners/login'];

// Sections that require auth
const PROTECTED_ROOTS = ['/admin', '/portal', '/partners'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // allow login pages and the auth callback route without checks
  if (LOGIN_PATHS.includes(pathname) || pathname.startsWith('/auth/callback')) {
    return res;
  }

  // does this path need auth?
  const needsAuth =
    PROTECTED_ROOTS.some((r) => pathname === r || pathname.startsWith(r + '/'));

  if (!needsAuth) return res;

  // Check the current user via Supabase (route client binds to req cookies)
  const supa = createSupabaseRouteClient(req);
  const { data: { user } } = await supa.auth.getUser();

  if (user) return res;

  // Not signed in — send to the appropriate login with ?next=
  const login =
    pathname.startsWith('/partners') ? '/partners/login' :
    pathname.startsWith('/portal')   ? '/portal/login'   :
                                       '/admin/login';

  const url = new URL(login, req.url);
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

// Exclude static assets, API, and the auth callback from middleware
export const config = {
  matcher: [
    '/((?!_next|.*\\..*|api|auth/callback).*)',
  ],
};
