// lib/mail.ts
import { Resend } from "resend";
import { render } from "@react-email/render";
import LeadEmail from "@/emails/LeadEmail"; // your react-email component

export async function sendLeadEmail(lead: any) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY missing");

  const resend = new Resend(apiKey);

  const html = render(<LeadEmail lead={lead} />);

  await resend.emails.send({
    from: "QuoteMyMove <noreply@quotemymove.co.uk>",
    to: ["george@quotemymove.co.uk"],
    subject: `New lead: ${lead.full_name || "Customer"}`,
    html,
  });
}
