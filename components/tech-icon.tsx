import type { ReactNode } from "react";
import { BarChart, Code, Lock, Mail, Phone, Upload } from "@/components/icons";
import { BRAND_PATHS } from "@/lib/tech-icons";

// Technologies without a brand glyph get a plain outline icon that hints at what they do.
const FALLBACKS: Record<string, (p: { className?: string }) => ReactNode> = {
  NextAuth: Lock,
  "Auth.js": Lock,
  Recharts: BarChart,
  Twilio: Phone,
  EmailJS: Mail,
  UploadThing: Upload,
};

/** One technology as an icon. The name stays available as a tooltip and to screen readers. */
export function TechIcon({ name, size = "md", className = "" }: { name: string; size?: "sm" | "md"; className?: string }) {
  const path = BRAND_PATHS[name];
  const Fallback = FALLBACKS[name] ?? Code;
  return (
    <span className={`tech-icon tech-icon-${size} ${className}`} title={name} role="img" aria-label={name}>
      {path ? (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={path} />
        </svg>
      ) : (
        <Fallback className="size-full" />
      )}
    </span>
  );
}

export function TechIconList({ names, max, className = "" }: { names: string[]; max?: number; className?: string }) {
  const shown = max ? names.slice(0, max) : names;
  const rest = names.length - shown.length;
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Technologies">
      {shown.map((t) => (
        <li key={t}>
          <TechIcon name={t} />
        </li>
      ))}
      {rest > 0 && <li className="small muted px-1 font-bold">+{rest}</li>}
    </ul>
  );
}
