export function LeadCustomerEmail({ name }: { name: string }) {
  return (
    <div>
      <h2>Thanks, {name} — we’ve got your details</h2>
      <p>We’re preparing your estimate and will follow up shortly.</p>
      <p>Reply to this email to add photos or notes.</p>
      <p>— QuoteMyMove</p>
    </div>
  );
}
