import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase-server";

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/partners/:path*", "/auth/callback"],
};

export async function middleware(req: NextRequest) {
  // Let the callback through
  if (req.nextUrl.pathname.startsWith("/auth/callback")) return NextResponse.next();

  const res = NextResponse.next();
  const supa = createSupabaseRouteClient(req as any, res);
  const { data: { user } } = await supa.auth.getUser();

  const protectedRoot = ["/admin", "/portal", "/partners"].some(p =>
    req.nextUrl.pathname === p || req.nextUrl.pathname.startsWith(p + "/")
  );

  if (protectedRoot && !user) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return res;
}
