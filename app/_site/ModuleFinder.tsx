"use client";

import { useMemo, useState } from "react";
import { whatsappLink } from "@/lib/contact";
import Icon from "./Icons";

export default function ModuleFinder({ modules }: { modules: Record<string, string[]> }) {
  const faculties = Object.keys(modules);
  const [faculty, setFaculty] = useState(faculties[0]);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (q.length < 2) return modules[faculty] ?? [];
    const seen = new Set<string>();
    return Object.values(modules)
      .flat()
      .filter((m) => m.toLowerCase().includes(q) && !seen.has(m) && seen.add(m));
  }, [q, faculty, modules]);

  const link = (name: string) => whatsappLink(`Hi Mastermind Tutoring, I need help with ${name}.`);

  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-navy/10 sm:p-8">
      <label htmlFor="module-search" className="font-display text-xl font-semibold tracking-tight">
        Find your module
      </label>
      <div className="relative mt-3">
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/45" />
        <input
          id="module-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try Corporate Finance, Taxation or Calculus"
          className="w-full rounded-full bg-cream py-3.5 pl-12 pr-5 text-base outline-none ring-1 ring-navy/15 placeholder:text-navy/45 focus:ring-2 focus:ring-gold"
        />
      </div>

      {q.length < 2 && (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Faculty or degree">
          {faculties.map((f) => {
            const on = f === faculty;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFaculty(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-gold ${
                  on ? "bg-navy text-white" : "bg-cream text-navy/75 ring-1 ring-navy/10 hover:ring-navy/40"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      )}

      <ul className="mt-5 flex flex-wrap gap-2" aria-live="polite">
        {results.map((m) => (
          <li key={m}>
            <a
              href={link(m)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl bg-cream px-4 py-2 text-sm font-medium ring-1 ring-navy/10 hover:bg-gold/25 hover:ring-gold"
            >
              {m}
            </a>
          </li>
        ))}
        {results.length === 0 && (
          <li className="text-navy/70">
            Nothing by that name on our list yet.{" "}
            <a href={link(query.trim())} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold decoration-2 underline-offset-4">
              Ask us about {query.trim()}
            </a>
          </li>
        )}
      </ul>
      <p className="mt-4 text-sm text-navy/60">Select a module to message us about it on WhatsApp.</p>
    </div>
  );
}
