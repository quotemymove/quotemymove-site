import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase-server";

export const config = {
  // Protect admin/portal/partners and allow callback to run
  matcher: ["/admin/:path*", "/portal/:path*", "/partners/:path*", "/auth/callback"],
};

const PUBLIC_PATHS = [
  "/admin/login",
  "/portal/login",
  "/partners/login",
  "/auth/callback",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let public pages through (login + callback)
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supa = createSupabaseRouteClient(req as any, res);
  const { data: { user } } = await supa.auth.getUser();

  const needsAuth =
    pathname === "/admin" || pathname.startsWith("/admin/") ||
    pathname === "/portal" || pathname.startsWith("/portal/") ||
    pathname === "/partners" || pathname.startsWith("/partners/");

  if (needsAuth && !user) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return res;
}
