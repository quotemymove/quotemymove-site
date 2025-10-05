// lib/mail.tsx
import React from "react"; // <-- required so JSX compiles in TSX
import { Resend } from "resend";
import { render } from "@react-email/render";
import LeadEmail from "@/emails/LeadEmail";   // this should be a .tsx file too
export async function sendLeadEmail(lead: any) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY missing");
  
    const resend = new Resend(apiKey);
  
    // JSX now valid because file is .tsx and React is imported
    const html = render(<LeadEmail lead={lead} />);
  
    await resend.emails.send({
      from: "QuoteMyMove <noreply@quotemymove.co.uk>",
      to: ["george@quotemymove.co.uk"],
      subject: `New lead: ${lead.full_name || "Customer"}`,
      html,
    });
  }
  