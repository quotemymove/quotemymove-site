// app/api/intake/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/lib/supabase-server"; // the "route" version from your lib
import { sendLeadEmail } from "@/lib/mail"; // just exports a function, no side effects

export async function POST(req: NextRequest) {
  try {
    // ✅ ALWAYS read from req, never a global `body`
    const payload = await req.json();

    // Basic sanity (don’t throw during build/import)
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ ok: false, error: "Bad payload" }, { status: 400 });
    }

    const supa = createSupabaseRouteClient(req); // passes cookies safely for route handlers

    const { data, error } = await supa
      .from("leads")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Insert lead error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // ✅ Call email after DB insert; no top-level calls anywhere
    try {
      await sendLeadEmail(data);
    } catch (e) {
      console.warn("Email send failed (non-fatal):", e);
      // Don’t fail the response just because email failed
    }

    return NextResponse.json({ ok: true, leadId: data.id });
  } catch (e: any) {
    console.error("API /intake POST error:", e);
    return NextResponse.json({ ok: false, error: e?.message || "Unknown" }, { status: 500 });
  }
}
