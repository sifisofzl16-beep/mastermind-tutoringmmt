import { liveStatus, parseClosingDate, type LiveStatus } from "@/lib/site";

/** What the index pages hand to the client-side filter. Plain data only. */
export type ListingCard = {
  slug: string;
  href: string;
  name: string;
  initials: string;
  eyebrow?: string;
  summary: string;
  tags: string[];
  /** The filter pills this listing belongs to. */
  filterKeys: string[];
  closingDate: string;
  status: LiveStatus;
};

const SKIP_WORDS = new Set(["of", "the", "and", "for", "in", "south", "southern", "africa"]);

/** "Mercedes-Benz South Africa" becomes "MB", "PSG Financial Services" stays "PSG". */
export function initials(name: string): string {
  const words = name
    .replace(/\(.*?\)/g, " ")
    .split(/[\s-]+/)
    .filter((w) => /^[A-Za-z]/.test(w));
  if (words.length === 0) return "?";
  if (/^[A-Z]{2,4}$/.test(words[0])) return words[0];
  const significant = words.filter((w) => !SKIP_WORDS.has(w.toLowerCase()));
  const pool = significant.length > 0 ? significant : words;
  if (pool.length === 1) return pool[0].slice(0, 2).toUpperCase();
  return (pool[0][0] + pool[1][0]).toUpperCase();
}

type Dated = { closingDate: string; status: string };

/**
 * Works out each listing's status from its closing date, then splits the list:
 * open ones first with the soonest closing date on top (rolling intakes after
 * the dated ones), closed ones separately with the most recently closed on top.
 */
export function splitByStatus<T extends Dated>(items: T[], now = new Date()) {
  const withStatus = items.map((item) => ({
    item,
    live: liveStatus(item.closingDate, item.status, now),
    time: parseClosingDate(item.closingDate)?.getTime() ?? null,
  }));
  const open = withStatus
    .filter((x) => x.live !== "Closed")
    .sort((a, b) => (a.time ?? Infinity) - (b.time ?? Infinity));
  const closed = withStatus
    .filter((x) => x.live === "Closed")
    .sort((a, b) => (b.time ?? -Infinity) - (a.time ?? -Infinity));
  return { open, closed };
}
