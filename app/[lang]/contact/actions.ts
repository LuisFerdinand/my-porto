"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { sendContactMail } from "@/lib/mail";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Which fields failed validation. The page maps these to text in the visitor's language. */
  fields?: Partial<Record<"name" | "email" | "message", true>>;
  error?: "tooMany" | "generic";
  values?: { name: string; email: string; subject: string; message: string };
};

const SUBJECTS: Record<string, string> = {
  project: "A project",
  connect: "Just saying hi",
  collaboration: "Collaboration",
  question: "A question",
  other: "Something else",
};

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().max(200).pipe(z.email()),
  subject: z.string().trim().max(40),
  message: z.string().trim().min(10).max(4000),
  lang: z.enum(["en", "id"]),
  // A honeypot: real visitors never see or fill this field.
  hp_check: z.string().max(0),
});

const MAX_PER_HOUR = 5;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    lang: String(formData.get("lang") ?? "en"),
    hp_check: String(formData.get("hp_check") ?? ""),
  };
  const values = { name: raw.name, email: raw.email, subject: raw.subject, message: raw.message };

  // Bots fill the hidden field. Pretend it worked and store nothing.
  if (raw.hp_check) {
    console.warn("[contact] ignored: the hidden spam-trap field was filled (a bot, or a browser extension autofilling it)");
    return { status: "success" };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields: NonNullable<ContactState["fields"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message") fields[key] = true;
    }
    console.warn("[contact] not sent: invalid", Object.keys(fields).join(", ") || "form");
    return { status: "error", fields, values };
  }

  const data = parsed.data;
  const subject = SUBJECTS[data.subject] ?? "";
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  try {
    const db = getSql();
    const [{ n }] = await db.query(
      "select count(*)::int as n from messages where ip = $1 and created_at > now() - interval '1 hour'",
      [ip],
    );
    if (Number(n) >= MAX_PER_HOUR) return { status: "error", error: "tooMany", values };

    // Save first, so a message is never lost even if the email can't be sent.
    const [{ id }] = await db.query(
      "insert into messages (name, email, subject, message, locale, ip) values ($1,$2,$3,$4,$5,$6) returning id",
      [data.name, data.email, subject, data.message, data.lang, ip],
    );

    const mail = await sendContactMail({ name: data.name, email: data.email, subject, message: data.message, locale: data.lang });
    await db.query("update messages set emailed = $2, email_error = $3 where id = $1", [
      id,
      mail.ok,
      mail.ok ? "" : mail.error,
    ]);
    return { status: "success" };
  } catch {
    return { status: "error", error: "generic", values };
  }
}
