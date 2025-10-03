import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["full_name","phone","email","from_postcode","to_postcode","move_date","property_from","floors_from","lift_from"];
    for (const k of required) if (!body?.[k]) return NextResponse.json({ error: "Missing field: " + k }, { status: 400 });

    const postcodeRe = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^\+?\d[\d\s()-]{7,}$/;
    if (!postcodeRe.test(String(body.from_postcode))) return NextResponse.json({ error: "Invalid from_postcode" }, { status: 400 });
    if (!postcodeRe.test(String(body.to_postcode))) return NextResponse.json({ error: "Invalid to_postcode" }, { status: 400 });
    if (!emailRe.test(String(body.email))) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    if (!phoneRe.test(String(body.phone))) return NextResponse.json({ error: "Invalid phone" }, { status: 400 });

    const insert = {
      full_name: String(body.full_name),
      phone: String(body.phone),
      email: String(body.email),
      from_postcode: String(body.from_postcode).toUpperCase(),
      to_postcode: String(body.to_postcode).toUpperCase(),
      move_date: String(body.move_date),
      property_from: String(body.property_from),
      floors_from: Number(body.floors_from),
      lift_from: String(body.lift_from),
      packing: body.packing === "yes",
      storage: body.storage === "yes",
      dismantle: body.dismantle === "yes",
      special_items: body.special_items ? String(body.special_items) : null,
      notes: body.notes ? String(body.notes) : null,
      user_agent: req.headers.get("user-agent"),
      ip: (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || null,
    };

    const url = process.env.SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    if (!url || !serviceKey) return NextResponse.json({ error: "Server not configured (Supabase env missing)" }, { status: 500 });

    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

    const { data, error } = await supabase.from("leads").insert(insert).select("id").single();
    if (error) {
      console.error("Supabase insert error", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ id: data.id, ok: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Invalid JSON" }, { status: 400 });
  }
}
