import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center px-4 py-10">
      <div className="panel w-full max-w-md !p-8 sm:!p-10">
        <h1 className="text-[2.5rem] font-extrabold leading-[0.95] tracking-tight">Admin sign in</h1>
        <p className="mt-3 muted">Edit your hero, about section and projects.</p>
        <LoginForm />
        <p className="mt-6 text-sm muted">
          <Link href="/" className="underline decoration-ink/30 underline-offset-4 hover:text-ink">
            Back to the site
          </Link>
        </p>
      </div>
    </main>
  );
}
