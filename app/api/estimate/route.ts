// app/api/estimate/route.ts
import { NextRequest, NextResponse } from "next/server";

// --- Base rules per property type ---
const BASE_BY_PROPERTY: Record<string, { hours: number; crew: number; rate: number }> = {
  "Studio": { hours: 2.5, crew: 2, rate: 85 },
  "1 Bed":  { hours: 3.0, crew: 2, rate: 85 },
  "2 Bed":  { hours: 4.0, crew: 3, rate: 110 },
  "3 Bed":  { hours: 5.5, crew: 3, rate: 110 },
  "4+ Bed": { hours: 7.0, crew: 4, rate: 165 },
};

// --- Distance multiplier based on miles ---
function distanceMultiplier(mi: number) {
  if (mi <= 5) return 0.5;     // very local
  if (mi <= 25) return 1.0;    // normal city range
  if (mi <= 80) return 2.0;    // regional
  return 3.5;                  // long distance
}

// --- Access multiplier (floors, lift) ---
function accessMultiplier(floors: number, lift: string) {
  const stairs = Math.max(0, Number(floors || 0));
  let mult = 1 + stairs * 0.08; // +8% per floor
  if (String(lift).toLowerCase() === "yes") mult *= 0.9;
  return mult;
}

// --- Extras ---
function extrasCost(packing: boolean, dismantle: boolean, specialItems: string) {
  let extra = 0;
  if (packing) extra += 80;
  if (dismantle) extra += 50;
  const s = (specialItems || "").toLowerCase();
  if (s.includes("piano")) extra += 120;
  if (s.includes("american fridge")) extra += 60;
  if (s.includes("safe")) extra += 90;
  return extra;
}

// --- Rough miles estimate from outward codes (temporary placeholder until we add Google Distance Matrix) ---
function roughMiles(fromPc: string, toPc: string) {
  const f = (fromPc || "").trim().toUpperCase().split(" ")[0];
  const t = (toPc || "").trim().toUpperCase().split(" ")[0];
  if (!f || !t) return 5;
  if (f === t) return 3;
  const a0 = f.charCodeAt(0) || 65;
  const a1 = f.charCodeAt(1) || 65;
  const b0 = t.charCodeAt(0) || 65;
  const b1 = t.charCodeAt(1) || 65;
  const d = Math.abs(a0 - b0) * 6 + Math.abs(a1 - b1) * 2; // scaled for miles
  return Math.max(5, Math.min(150, d));
}

// --- API Route Handler ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      from_postcode, to_postcode, property_from,
      floors_from, lift_from, packing, dismantle, special_items
    } = body || {};

    const base = BASE_BY_PROPERTY[property_from] || BASE_BY_PROPERTY["2 Bed"];
    const miles = roughMiles(from_postcode, to_postcode);
    const multAccess = accessMultiplier(floors_from, lift_from);
    const multDistance = distanceMultiplier(miles);

    const baseHours = base.hours * multAccess;
    const labour = baseHours * base.rate;
    const travel = multDistance * base.rate * 0.6; // travel priced lower
    const extras = extrasCost(packing === "yes", dismantle === "yes", String(special_items || ""));

    const subtotal = labour + travel + extras;

    // ±12% range to show flexibility
    const low = Math.round(subtotal * 0.88);
    const high = Math.round(subtotal * 1.12);

    const breakdown = {
      property_from: property_from || "2 Bed",
      crew: base.crew,
      base_hours: Number(base.hours.toFixed(1)),
      adjusted_hours: Number(baseHours.toFixed(1)),
      hourly_rate: base.rate,
      miles,
      access_multiplier: Number(multAccess.toFixed(2)),
      distance_multiplier: multDistance,
      labour: Math.round(labour),
      travel: Math.round(travel),
      extras: Math.round(extras),
    };

    return NextResponse.json({ ok: true, low, high, currency: "GBP", breakdown });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || "Invalid data" }, { status: 400 });
  }
}
