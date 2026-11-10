"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "../../../../_site/Icons";

export type SearchItem = { id: string; title: string; chapter: string; href: string; video: boolean };

export default function CourseSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const hits = useMemo(() => {
    if (q.length < 2) return [];
    const words = q.split(/\s+/);
    return items
      .filter((it) => {
        const hay = `${it.title} ${it.chapter}`.toLowerCase();
        return words.every((w) => hay.includes(w));
      })
      .slice(0, 12);
  }, [q, items]);

  return (
    <div className="relative">
      <label htmlFor="course-search" className="sr-only">
        Search this course
      </label>
      <Icon name="search" className="pointer-events-none absolute left-4 top-[1.6rem] h-5 w-5 -translate-y-1/2 text-navy/45" />
      <input
        id="course-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos and files in this course"
        autoComplete="off"
        className="h-[3.2rem] w-full rounded-full bg-white pl-12 pr-5 text-base outline-none ring-1 ring-navy/15 placeholder:text-navy/45 focus:ring-2 focus:ring-gold"
      />
      {q.length >= 2 && (
        <div className="mt-2 overflow-hidden rounded-2xl bg-white ring-1 ring-navy/15" aria-live="polite">
          {hits.length === 0 ? (
            <p className="px-5 py-4 text-navy/70">Nothing matches &ldquo;{query.trim()}&rdquo;. Try a shorter word.</p>
          ) : (
            <ul className="divide-y divide-navy/10">
              {hits.map((h) => (
                <li key={h.id}>
                  <Link href={h.href} className="flex items-center gap-3 px-5 py-3 hover:bg-gold/15 focus-visible:bg-gold/15 focus-visible:outline-none">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy text-gold">
                      <Icon name={h.video ? "play" : "file"} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{h.title}</span>
                      <span className="block truncate text-sm text-navy/60">{h.chapter}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
