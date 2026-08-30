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

  await transport.sendMail({
    from,
    to: contact.email,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}
