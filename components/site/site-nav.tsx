"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Check, ChevronDown, Grid, Home, Mail, User } from "@/components/icons";
import { LOCALES, LOCALE_NAMES } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

type Labels = {
  home: string;
  about: string;
  portfolio: string;
  contact: string;
  talk: string;
  language: string;
  main: string;
};

/**
 * Floating navigation. On a desktop it hovers at the top centre; on a phone it is pinned to the bottom
 * (see .nav in globals.css) with an icon over each label so every target sits under the thumb.
 */
export function SiteNav({
  lang,
  labels,
  name,
}: {
  lang: Locale;
  labels: Labels;
  name: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: `/${lang}`, label: labels.home, icon: Home, exact: true },
    { href: `/${lang}/about`, label: labels.about, icon: User },
    { href: `/${lang}/portfolio`, label: labels.portfolio, icon: Grid },
    { href: `/${lang}/contact`, label: labels.contact, icon: Mail },
  ];

  const switchTo = (target: Locale) => pathname.replace(/^\/(en|id)(?=\/|$)/, `/${target}`) || `/${target}`;

  return (
    <nav className="nav" aria-label={labels.main}>
      <Link href={`/${lang}`} className="nav-brand" aria-label={name}>
        <span className="logo">
          <BrandMark />
        </span>
        <span className="hidden whitespace-nowrap lg:inline">{name}</span>
      </Link>

      <div className="nav-links">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const current = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="nav-link" aria-current={current ? "page" : undefined}>
              <Icon />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="nav-lang" ref={menuRef}>
        <button
          type="button"
          className="lang-btn"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={labels.language}
          onClick={() => setOpen((v) => !v)}
        >
          {LOCALE_NAMES[lang].short}
          <ChevronDown />
        </button>
        {open && (
          <div className="nav-menu" role="menu">
            {LOCALES.map((code) => (
              <a
                key={code}
                href={switchTo(code)}
                role="menuitem"
                hrefLang={code}
                lang={code}
                aria-current={code === lang ? "true" : undefined}
              >
                {LOCALE_NAMES[code].name}
                {code === lang && <Check className="size-4" />}
              </a>
            ))}
          </div>
        )}
      </div>

      <Link href={`/${lang}/contact`} className="nav-cta">
        {labels.talk}
      </Link>
    </nav>
  );
}
