import "server-only";
import { Resend } from "resend";

const DEFAULT_TO = "ferdinandluis88@gmail.com";
// Resend's shared test sender. It only delivers to the email address your Resend account was created with.
// Once you verify your own domain in Resend, set CONTACT_FROM to an address on it.
const DEFAULT_FROM = "Portfolio contact form <onboarding@resend.dev>";

export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export type ContactMail = {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
};

/**
 * Sends a contact-form message to CONTACT_TO (default: ferdinandluis88@gmail.com) through Resend.
 * Replying to the email goes to the visitor, not to the sender address.
 */
export async function sendContactMail(mail: ContactMail): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not set" };

  const subject = mail.subject || "Message";
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM || DEFAULT_FROM,
      to: process.env.CONTACT_TO || DEFAULT_TO,
      replyTo: `${mail.name.replace(/[<>"\r\n]/g, "")} <${mail.email}>`,
      subject: `[Portfolio] ${subject} from ${mail.name.replace(/[\r\n]/g, " ")}`,
      text: `From: ${mail.name} <${mail.email}>\nLanguage: ${mail.locale}\nTopic: ${subject}\n\n${mail.message}\n`,
    });
    if (error) return { ok: false, error: `${error.name}: ${error.message}`.slice(0, 300) };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message.slice(0, 300) : "Unknown mail error" };
  }
}
