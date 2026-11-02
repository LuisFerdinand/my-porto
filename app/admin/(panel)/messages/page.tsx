import { deleteMessage, toggleMessageRead } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/admin-ui";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { getAdminMessages } from "@/lib/admin-data";
import { mailConfigured } from "@/lib/mail";

export default async function MessagesPage() {
  const messages = await getAdminMessages();
  const ready = mailConfigured();

  return (
    <>
      <PageHeader title="Messages" intro="Everything sent from the contact form is saved here first, then emailed to you." />

      {!ready && (
        <p className="panel mb-4 font-bold">
          Email sending isn’t set up yet, so messages are only saved here. Add <code>SMTP_USER</code> and <code>SMTP_PASS</code> (a Gmail App
          Password) to <code>.env.local</code> and restart to have them forwarded to your inbox.
        </p>
      )}

      <ul className="grid gap-3">
        {messages.map((m) => (
          <li key={m.id} className={`panel ${m.isRead ? "" : "ring-2 ring-ink"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-lg font-extrabold tracking-tight">{m.name}</p>
                <a href={`mailto:${m.email}`} className="small font-bold underline underline-offset-4">
                  {m.email}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {m.subject && <span className="chip">{m.subject}</span>}
                <span className="chip">{m.locale.toUpperCase()}</span>
                <span className={`chip ${m.emailed ? "" : "!bg-red-100 !text-red-800"}`}>{m.emailed ? "Emailed" : "Not emailed"}</span>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap">{m.message}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="small muted font-bold">
                {new Date(m.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" })} (WIB)
                {!m.emailed && m.emailError && ` · ${m.emailError}`}
              </p>
              <div className="flex gap-2">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" className="btn btn-quiet btn-sm">
                    {m.isRead ? "Mark unread" : "Mark read"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <ConfirmButton message={`Delete the message from ${m.name}?`} className="btn btn-quiet btn-sm text-red-800">
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </div>
          </li>
        ))}
        {messages.length === 0 && <li className="panel muted">No messages yet.</li>}
      </ul>
    </>
  );
}
