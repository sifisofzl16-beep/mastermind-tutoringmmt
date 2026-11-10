import { GOOGLE_REVIEWS } from "@/lib/site";
import Icon from "./Icons";

export function Stars({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-gold" role="img" aria-label={`Rated ${GOOGLE_REVIEWS.rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-hand text-3xl font-bold text-amber">{children}</p>;
}

export function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group py-1">
      <summary className="flex min-h-14 items-center justify-between gap-4 py-3 font-display text-lg font-semibold outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold sm:text-xl">
        {q}
        <span className="chev grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-gold transition-transform">
          <Icon name="plus" className="h-4 w-4" />
        </span>
      </summary>
      <p className="pb-5 pr-10 text-navy/75">{children}</p>
    </details>
  );
}
