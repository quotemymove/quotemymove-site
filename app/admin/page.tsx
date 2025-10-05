import DashboardShell from "@/components/DashboardShell";
import { createSupabaseService } from "@/lib/supabase-service";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const supa = createSupabaseService();
  const { data: leads } = await supa
    .from("leads")
    .select("id, created_at, full_name, email, phone, from_postcode, to_postcode, move_date, property_from, status")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <DashboardShell>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Leads</h1>
          <p className="text-slate-600 text-sm">Newest first • last 200</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">From → To</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Property</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(leads || []).map((l:any) => (
              <tr key={l.id} className="border-t border-slate-100">
                <td className="px-3 py-2">
                  <div className="font-semibold">{l.full_name}</div>
                  <div className="text-slate-500">{l.email}</div>
                </td>
                <td className="px-3 py-2">{l.from_postcode} → {l.to_postcode}</td>
                <td className="px-3 py-2">{l.move_date}</td>
                <td className="px-3 py-2">{l.property_from}</td>
                <td className="px-3 py-2"><StatusBadge status={l.status} /></td>
                <td className="px-3 py-2 text-right">
                  <Link href={`/admin/leads/${l.id}`} className="text-orange-700 hover:underline">Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!leads?.length && <div className="p-6 text-slate-600">No leads yet.</div>}
      </div>
    </DashboardShell>
  );
}

function StatusBadge({ status }:{status:string}) {
  const map:any = {
    new: "bg-slate-100 text-slate-800",
    review: "bg-amber-100 text-amber-800",
    booked: "bg-emerald-100 text-emerald-800",
    lost: "bg-rose-100 text-rose-800",
  };
  return <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${map[status] || map.new}`}>{status || "new"}</span>;
}
