import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/session";
import { logout } from "../login/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Everything under here reads the session cookie, so it streams in behind this boundary.
export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p className="grid min-h-svh place-items-center font-semibold muted">Loading…</p>}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}

async function Shell({ children }: { children: ReactNode }) {
  await requireAdmin();
  return (
    <div className="mx-auto grid w-[min(100%-2rem,80rem)] items-start gap-6 py-6 lg:grid-cols-[14.5rem_minmax(0,1fr)]">
      <aside className="panel panel-dark grid gap-5 !p-4 lg:sticky lg:top-6">
        <div className="flex items-center justify-between gap-3 px-1">
          <span className="text-xl font-extrabold tracking-tight">Admin</span>
          <Link href="/" className="text-sm font-bold text-white/70 underline underline-offset-4 hover:text-white">
            View site
          </Link>
        </div>
        <AdminNav />
        <form action={logout}>
          <button type="submit" className="btn btn-light btn-sm w-full">
            Sign out
          </button>
        </form>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
