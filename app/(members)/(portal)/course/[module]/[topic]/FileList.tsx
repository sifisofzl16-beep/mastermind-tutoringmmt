"use client";

import { useState } from "react";
import Icon from "../../../../../_site/Icons";
import { markOpened } from "../../progress";

export type FileItem = { id: string; title: string; href: string | null; opened: boolean };

export default function FileList({ items }: { items: FileItem[] }) {
  const [seen, setSeen] = useState<Set<string>>(() => new Set(items.filter((i) => i.opened).map((i) => i.id)));

  function open(id: string) {
    setSeen((s) => new Set(s).add(id));
    void markOpened(id);
  }

  return (
    <ul className="divide-y divide-navy/10 overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10">
      {items.map((r) => {
        const done = seen.has(r.id);
        return (
          <li key={r.id} className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
            <span className="flex min-w-0 items-center gap-3">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${done ? "bg-gold text-navy" : "bg-cream text-navy/50"}`}>
                <Icon name={done ? "check" : "file"} className="h-4 w-4" strokeWidth={done ? 3 : 1.8} />
              </span>
              <span className="min-w-0">
                <span className="block font-medium leading-snug">{r.title}</span>
                {done && <span className="block text-xs text-navy/55">Opened</span>}
              </span>
            </span>
            {r.href && (
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => open(r.id)}
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy hover:bg-gold-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                Open <Icon name="external" className="h-4 w-4" />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
