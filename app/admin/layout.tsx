import type { ReactNode } from "react";
import "../globals.css";
import { urbanist } from "../fonts";

// The admin panel is English-only and has its own root layout, separate from the language-prefixed site.
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={urbanist.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
