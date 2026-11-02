import type { Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { urbanist } from "../fonts";
import { LOCALES, isLocale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#e6e9f2",
};

// The public site's root layout. The language is the first segment of every URL.
export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={urbanist.variable} data-scroll-behavior="smooth">
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before React loads; that is not a bug in the app. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
