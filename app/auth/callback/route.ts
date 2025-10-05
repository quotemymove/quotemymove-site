import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase-server";

/**
 * Handles both PKCE (?code=...) and legacy (?token_hash=...).
 * Always sets cookies on the response we return.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") || "/admin";
  const response = NextResponse.redirect(new URL(next, url.origin));

  const supabase = createSupabaseRouteClient(request as any, response);

  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
    } else if (token_hash) {
      const { data, error } = await supabase.auth.verifyOtp({ token_hash, type: "magiclink" });
      if (error || !data?.user) throw error || new Error("No user from token_hash");
    } else {
      throw new Error("Missing code/token_hash in callback");
    }
  } catch (e) {
    console.error("Auth callback error:", e);
    return NextResponse.redirect(new URL("/admin/login", url.origin));
  }

  return response;
}
