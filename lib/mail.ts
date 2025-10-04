import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY!);
export const FROM = process.env.FROM_EMAIL || "QuoteMyMove <onboarding@resend.dev";
export const ADMIN = process.env.ADMIN_EMAIL || "george@quotemymove.com";
