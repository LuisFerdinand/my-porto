"use client";

import { useActionState } from "react";
import { Check, Send } from "@/components/icons";
import { sendMessage } from "@/app/[lang]/contact/actions";
import type { ContactState } from "@/app/[lang]/contact/actions";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export function ContactForm({ lang, dict }: { lang: Locale; dict: Dict }) {
  const t = dict.contact;
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });

  if (state.status === "success") {
    return (
      <div className="card-white flex flex-col items-start gap-4" role="status">
        <span className="icon-tile">
          <Check />
        </span>
        <h2 className="h3">{t.successTitle}</h2>
        <p className="muted max-w-[28rem]">{t.successBody}</p>
        <a href={`/${lang}/contact`} className="btn btn-soft btn-sm">
          {t.sendAnother}
        </a>
      </div>
    );
  }

  const v = state.values;
  const bad = state.fields ?? {};

  return (
    <form action={action} className="card-white grid gap-5" noValidate>
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="field-label">
            {t.name}
          </label>
          <input id="c-name" name="name" className="field" autoComplete="name" required defaultValue={v?.name} aria-invalid={bad.name} aria-describedby={bad.name ? "c-name-err" : undefined} />
          {bad.name && (
            <p id="c-name-err" className="help !text-red-700" role="alert">
              {t.errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="c-email" className="field-label">
            {t.emailField}
          </label>
          <input id="c-email" name="email" type="email" className="field" autoComplete="email" required defaultValue={v?.email} aria-invalid={bad.email} aria-describedby={bad.email ? "c-email-err" : undefined} />
          {bad.email && (
            <p id="c-email-err" className="help !text-red-700" role="alert">
              {t.errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="c-subject" className="field-label">
          {t.subject}
        </label>
        <select id="c-subject" name="subject" className="field" defaultValue={v?.subject || "project"}>
          {Object.entries(t.subjects).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className="field-label">
          {t.message}
        </label>
        <textarea id="c-message" name="message" className="field" rows={6} required defaultValue={v?.message} aria-invalid={bad.message} aria-describedby={bad.message ? "c-message-err" : undefined} />
        {bad.message && (
          <p id="c-message-err" className="help !text-red-700" role="alert">
            {t.errors.message}
          </p>
        )}
      </div>

      {state.error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 font-bold text-red-800" role="alert">
          {t.errors[state.error]}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="small muted">{t.formIntro}</p>
        <button type="submit" className="btn btn-ink" disabled={pending}>
          {pending ? t.sending : t.send}
          <Send />
        </button>
      </div>
    </form>
  );
}
