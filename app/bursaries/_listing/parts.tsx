import Icon from "@/app/_site/Icons";
import type { LiveStatus } from "@/lib/site";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

export const BTN_PRIMARY = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-center font-semibold text-navy hover:bg-gold-2 ${FOCUS}`;
export const BTN_SECONDARY = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center font-semibold text-navy ring-1 ring-navy/25 hover:ring-navy ${FOCUS}`;
export const TEXT_LINK = `font-semibold underline decoration-gold decoration-2 underline-offset-4 hover:decoration-navy ${FOCUS}`;

const CHIP: Record<LiveStatus, string> = {
  Open: "bg-gold/25 text-navy",
  "Closing soon": "bg-red-700 text-white",
  Closed: "bg-navy/10 text-navy/60",
};

export function StatusChip({ status }: { status: LiveStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${CHIP[status]}`}>
      {status}
    </span>
  );
}

/** Stands in for a logo: the organisation's initials, gold on navy. */
export function InitialsTile({ text, size = "md", muted = false }: { text: string; size?: "md" | "lg"; muted?: boolean }) {
  const box = size === "lg" ? "h-16 w-16 rounded-2xl" : "h-12 w-12 rounded-xl";
  const type =
    text.length > 2 ? (size === "lg" ? "text-base" : "text-xs") : size === "lg" ? "text-2xl" : "text-lg";
  const colour = muted ? "bg-navy/10 text-navy/60" : "bg-navy text-gold";
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center font-display font-bold tracking-tight ${box} ${type} ${colour}`}>
      {text}
    </span>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber">{children}</p>;
}

export function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-navy/10 sm:p-7">
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 leading-relaxed text-navy/80">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/25 text-navy">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 break-words">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Shows where a listing was checked. Links it when the source is a web address. */
export function SourceNote({ source, handledBy }: { source: string; handledBy: string }) {
  const isUrl = /^https?:\/\//.test(source);
  return (
    <p className="text-sm leading-relaxed text-navy/60">
      Source:{" "}
      {isUrl ? (
        <a href={source} target="_blank" rel="noopener noreferrer" className={`break-all underline underline-offset-2 hover:text-navy ${FOCUS}`}>
          {source}
        </a>
      ) : (
        <span className="break-words">{source}</span>
      )}
      . Applications are handled by {handledBy} directly. Mastermind Tutoring does not handle submissions or selection, so confirm the details on the application page before you apply.
    </p>
  );
}
