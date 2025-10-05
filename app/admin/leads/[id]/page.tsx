import DashboardShell from "@/components/DashboardShell";
import { createSupabaseService } from "@/lib/supabase-service";

export default async function LeadView({ params }: { params: { id: string } }) {
  const supa = createSupabaseService();
  const { data: lead } = await supa.from("leads").select("*").eq("id", params.id).single();
  if (!lead) return <DashboardShell><div>Lead not found.</div></DashboardShell>;

  async function updateStatus(formData: FormData) {
    "use server";
    const status = formData.get("status") as string;
    const supa2 = createSupabaseService();
    await supa2.from("leads").update({ status }).eq("id", params.id);
  }

  return (
    <DashboardShell>
      <h1 className="text-2xl font-extrabold">Lead</h1>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="text-sm text-slate-500">Customer</div>
          <div className="mt-1 font-semibold">{lead.full_name}</div>
          <div className="text-slate-600">{lead.email}</div>
          <div className="text-slate-600">{lead.phone}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="text-sm text-slate-500">Move</div>
          <div className="mt-1">{lead.from_postcode} → {lead.to_postcode}</div>
          <div>{lead.property_from}, floors {lead.floors_from}, lift {lead.lift_from}</div>
          <div>Date: {lead.move_date}</div>
        </div>
      </div>

      <form action={updateStatus} className="mt-6 flex items-center gap-3">
        <select name="status" defaultValue={lead.status || "new"} className="rounded-xl border border-slate-300 px-3 py-2">
          <option value="new">New</option>
          <option value="review">In review</option>
          <option value="booked">Booked</option>
          <option value="lost">Lost</option>
        </select>
        <button className="rounded-xl bg-slate-900 text-white px-4 py-2">Save</button>
      </form>
    </DashboardShell>
  );
}
