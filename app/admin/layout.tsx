import type { ReactNode } from "react";
import "../globals.css";
import { urbanist } from "../fonts";

// The admin panel is English-only and has its own root layout, separate from the language-prefixed site.
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={urbanist.variable} data-scroll-behavior="smooth">
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before React loads; that is not a bug in the app. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
