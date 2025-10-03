// app/api/intake/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation (mirrors client)
    const required = ["full_name","phone","email","from_postcode","to_postcode","move_date","property_from","floors_from","lift_from"];
    for (const k of required) {
      if (!body?.[k]) {
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
      }
    }

    const postcodeRe = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
    if (!postcodeRe.test(String(body.from_postcode))) return NextResponse.json({ error: "Invalid from_postcode" }, { status: 400 });
    if (!postcodeRe.test(String(body.to_postcode))) return NextResponse.json({ error: "Invalid to_postcode" }, { status: 400 });

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(String(body.email))) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    const phoneRe = /^\+?\d[\d\s()-]{7,}$/;
    if (!phoneRe.test(String(body.phone))) return NextResponse.json({ error: "Invalid phone" }, { status: 400 });

    // Generate a temporary ID for this lead (replace with DB later)
    const id = crypto.randomUUID();

    // For now we just log; later you’ll insert into Supabase
    console.log("New intake", { id, ...body });

    return NextResponse.json({ id, ok: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Invalid JSON" }, { status: 400 });
  }
}
