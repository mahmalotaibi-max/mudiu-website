import nodemailer from "nodemailer";
import { contact } from "@/content/site";

export function getMailTransport() {
  const user = process.env.GMAIL_USER || contact.email;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!pass) {
    throw new Error("GMAIL_APP_PASSWORD is not configured.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendMail(options: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const transport = getMailTransport();
  const from = process.env.GMAIL_USER || contact.email;
  // Optional second recipient (set in Vercel's env vars, never in source) so
  // submissions also land in a personal inbox alongside the public contact
  // address - contact.email stays the one shown publicly on the site.
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;
  const to = notifyEmail ? `${contact.email}, ${notifyEmail}` : contact.email;

  await transport.sendMail({
    from,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}
