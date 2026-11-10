"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icons";

const links = [
  { href: "/#full-course", label: "Full Course" },
  { href: "/#tutoring", label: "Tutoring" },
  { href: "/#high-school", label: "High school" },
  { href: "/bursaries", label: "Bursaries" },
  { href: "/opportunities", label: "Opportunities" },
];

export default function SiteHeader({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" className="font-hand text-[1.7rem] font-bold leading-none text-navy sm:text-3xl" onClick={() => setOpen(false)}>
          Mastermind Tutoring<span className="text-gold">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.95rem] font-medium lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-navy/75 underline-offset-8 hover:text-navy hover:underline hover:decoration-gold hover:decoration-2">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="rounded-full px-4 py-2 text-[0.95rem] font-semibold text-navy ring-1 ring-navy/25 hover:ring-navy">
            Student login
          </Link>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-navy px-5 py-2.5 text-[0.95rem] font-semibold text-white hover:bg-navy-3">
            WhatsApp us
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-navy/20 lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-navy/10 bg-cream px-4 pb-5 lg:hidden">
          <ul className="divide-y divide-navy/10">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3.5 text-lg font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link href="/login" className="rounded-full px-4 py-3 text-center font-semibold ring-1 ring-navy/30">
              Student login
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-navy px-4 py-3 text-center font-semibold text-white">
              WhatsApp us
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
