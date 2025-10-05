// emails/LeadEmail.tsx
import * as React from "react";

export default function LeadEmail({ lead }: { lead: any }) {
  return (
    <div>
      <h1>New lead</h1>
      <p>Name: {lead.full_name}</p>
      <p>Email: {lead.email}</p>
      {/* add the rest… */}
    </div>
  );
}
