export function LeadAdminEmail({ id, p }: { id: string; p: any }) {
  return (
    <div>
      <h2>New lead</h2>
      <p><b>ID:</b> {id}</p>
      <ul>
        <li><b>Name:</b> {p.full_name}</li>
        <li><b>Email:</b> {p.email}</li>
        <li><b>Phone:</b> {p.phone}</li>
        <li><b>From→To:</b> {p.from_postcode} → {p.to_postcode}</li>
        <li><b>Date:</b> {p.move_date}</li>
        <li><b>Property:</b> {p.property_from}, floors {p.floors_from}, lift {p.lift_from}</li>
        {p.special_items && <li><b>Special:</b> {p.special_items}</li>}
        {p.notes && <li><b>Notes:</b> {p.notes}</li>}
      </ul>
    </div>
  );
}
