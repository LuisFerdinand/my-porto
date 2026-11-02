import "server-only";
import nodemailer from "nodemailer";

const DEFAULT_TO = "ferdinandluis88@gmail.com";

export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export type ContactMail = {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
};

/**
 * Sends a contact-form message to CONTACT_TO (default: ferdinandluis88@gmail.com) over SMTP.
 * For Gmail, SMTP_USER is the address and SMTP_PASS is a 16-character App Password
 * (Google Account > Security > 2-Step Verification > App passwords).
 */
export async function sendContactMail(mail: ContactMail): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!mailConfigured()) return { ok: false, error: "SMTP_USER and SMTP_PASS are not set" };

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });

  const subject = mail.subject || "Message";
  try {
    await transporter.sendMail({
      from: `"Portfolio contact form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || DEFAULT_TO,
      replyTo: `"${mail.name.replace(/"/g, "")}" <${mail.email}>`,
      subject: `[Portfolio] ${subject} from ${mail.name}`,
      text: `From: ${mail.name} <${mail.email}>\nLanguage: ${mail.locale}\nTopic: ${subject}\n\n${mail.message}\n`,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message.slice(0, 300) : "Unknown mail error" };
  }
}
