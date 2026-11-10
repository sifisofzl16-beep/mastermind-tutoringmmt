"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/app/_site/Icons";
import { ReviewGate } from "@/app/components/ReviewPrompt";
import type { ListingCard } from "./listing";
import { BTN_PRIMARY, BTN_SECONDARY, InitialsTile, StatusChip } from "./parts";

const ALL = "All";

export default function ListingBrowser({
  open,
  closed,
  filters,
  filterLabel,
  noun,
  alertsUrl,
}: {
  open: ListingCard[];
  closed: ListingCard[];
  /** Pill labels, without "All". */
  filters: string[];
  /** Read out for the pill group, for example "Filter by field". */
  filterLabel: string;
  /** Plural noun used in the copy: "bursaries" or "opportunities". */
  noun: string;
  alertsUrl: string;
}) {
  const [active, setActive] = useState(ALL);
  const matches = (c: ListingCard) => active === ALL || c.filterKeys.includes(active);
  const openShown = open.filter(matches);
  const closedShown = closed.filter(matches);

  return (
    <div>
      {filters.length > 1 && (
        <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
          {[ALL, ...filters].map((f) => {
            const pressed = active === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(f)}
                className={`min-h-11 rounded-full px-4 py-2 text-[0.95rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                  pressed ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/25 hover:ring-navy"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      )}

      <section aria-labelledby="open-heading" className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="open-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Open now
          </h2>
          <p aria-live="polite" className="text-sm text-navy/60">
            {openShown.length} open{active === ALL ? "" : ` in ${active}`}
          </p>
        </div>

        {openShown.length > 0 ? (
          <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {openShown.map((c) => (
              <Card key={c.slug} card={c} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-2xl bg-white p-8 text-center ring-1 ring-navy/10 sm:p-12">
            <p className="font-hand text-3xl font-bold text-amber">Nothing open just yet</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {active === ALL ? `There are no open ${noun} right now.` : `There are no open ${noun} in ${active} right now.`}
            </h3>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-navy/70">
              New ones open throughout the year. Send us a WhatsApp and we will message you when the next one goes up.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ReviewGate destinationUrl={alertsUrl} continueLabel="Continue to WhatsApp" className={BTN_PRIMARY}>
                <Icon name="chat" />
                Get WhatsApp alerts
              </ReviewGate>
              {active !== ALL && (
                <button type="button" onClick={() => setActive(ALL)} className={BTN_SECONDARY}>
                  Show all {noun}
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {closedShown.length > 0 && (
        <section aria-labelledby="closed-heading" className="mt-16">
          <h2 id="closed-heading" className="font-display text-2xl font-bold tracking-tight text-navy/70 sm:text-3xl">
            Recently closed
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-navy/70">
            These have passed their closing date. Most run every year, so they are worth reading if you want to be ready next time.
          </p>
          <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {closedShown.map((c) => (
              <Card key={c.slug} card={c} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Card({ card: c }: { card: ListingCard }) {
  const isClosed = c.status === "Closed";
  return (
    <li className="min-w-0">
      <article
        className={`relative flex h-full flex-col rounded-2xl p-6 ring-1 ring-navy/10 transition-shadow focus-within:ring-2 focus-within:ring-navy ${
          isClosed ? "bg-white/50" : "bg-white hover:shadow-[0_6px_0_0_var(--color-navy)] hover:ring-navy"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <InitialsTile text={c.initials} muted={isClosed} />
          <StatusChip status={c.status} />
        </div>

        {c.eyebrow && (
          <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.12em] ${isClosed ? "text-navy/60" : "text-amber"}`}>{c.eyebrow}</p>
        )}
        <h3 className={`font-display text-xl font-semibold leading-snug tracking-tight ${c.eyebrow ? "mt-1" : "mt-5"} ${isClosed ? "text-navy/70" : ""}`}>
          <Link href={c.href} className="break-words outline-none after:absolute after:inset-0 after:rounded-2xl">
            {c.name}
          </Link>
        </h3>
        <p className={`mt-2 line-clamp-4 text-[0.95rem] leading-relaxed ${isClosed ? "text-navy/60" : "text-navy/70"}`}>{c.summary}</p>

        {c.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {c.tags.map((t) => (
              <li key={t} className={`rounded-full px-2.5 py-1 text-xs font-medium ${isClosed ? "bg-navy/5 text-navy/60" : "bg-cream text-navy/80"}`}>
                {t}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-navy/10 pt-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy/60">{isClosed ? "Closed" : "Closes"}</p>
            <p className={`font-display font-semibold ${isClosed ? "text-navy/60" : ""}`}>{c.closingDate}</p>
          </div>
          {isClosed ? (
            <p className="text-sm font-medium text-navy/60">Applications have closed</p>
          ) : (
            <p aria-hidden="true" className="inline-flex items-center gap-1.5 font-semibold">
              View details
              <Icon name="arrow" className="h-4 w-4" />
            </p>
          )}
          </div>
        </div>
      </article>
    </li>
  );
}
