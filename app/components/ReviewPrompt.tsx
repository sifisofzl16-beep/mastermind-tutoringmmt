"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const REVIEW_LINK = "https://g.page/r/CbdZCEZW3YHKEAE/review";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

/**
 * Asks for an optional Google review before sending the visitor on to
 * `destinationUrl` (an application page or the WhatsApp alerts chat).
 * Pass a stable `onClose` (useCallback) so focus is not reset while it is open.
 */
export default function ReviewPrompt({
  open,
  destinationUrl,
  continueLabel = "Continue",
  onClose,
}: {
  open: boolean;
  destinationUrl: string;
  continueLabel?: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const textId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primaryRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = cardRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || !cardRef.current?.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !cardRef.current?.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  function goToDestination() {
    onClose();
    window.location.href = destinationUrl;
  }

  function rateAndContinue() {
    window.open(REVIEW_LINK, "_blank", "noopener,noreferrer");
    goToDestination();
  }

  return (
    <div
      onClick={goToDestination}
      className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-navy/70 p-4 backdrop-blur-sm"
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={textId}
        onClick={(e) => e.stopPropagation()}
        className="pop relative w-full max-w-sm rounded-2xl bg-paper p-7 text-center text-navy shadow-2xl ring-1 ring-navy/10 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close and stay on this page"
          className={`absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full text-navy/60 hover:bg-navy/5 hover:text-navy ${FOCUS}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="font-hand text-3xl font-bold leading-none">
          Mastermind Tutoring<span className="text-gold">.</span>
        </p>

        <div aria-hidden="true" className="mt-5 flex justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="h-7 w-7 fill-gold stroke-navy" strokeWidth="1.2" strokeLinejoin="round">
              <path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6-4.5-4.2 6.1-.8z" />
            </svg>
          ))}
        </div>

        <h2 id={titleId} className="mt-5 font-display text-2xl font-bold tracking-tight">
          A quick favour first?
        </h2>
        <p id={textId} className="mt-3 leading-relaxed text-navy/75">
          If these bursary and opportunity pages have helped you, a Google review helps other Wits students find Mastermind Tutoring. It is optional. We will take you through either way.
        </p>

        <button
          ref={primaryRef}
          type="button"
          onClick={rateAndContinue}
          className={`mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-gold px-5 py-3 font-semibold text-navy hover:bg-gold-2 ${FOCUS}`}
        >
          Leave a review and continue
        </button>
        <button
          type="button"
          onClick={goToDestination}
          className={`mt-3 flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 font-semibold text-navy ring-1 ring-navy/25 hover:ring-navy ${FOCUS}`}
        >
          Skip. {continueLabel}
        </button>
      </div>
    </div>
  );
}

/**
 * A link that opens the review prompt first. It is a real link, so it still
 * goes straight to `destinationUrl` if JavaScript has not loaded.
 */
export function ReviewGate({
  destinationUrl,
  continueLabel = "Continue",
  className,
  children,
}: {
  destinationUrl: string;
  continueLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <a
        href={destinationUrl}
        rel="noopener noreferrer"
        aria-haspopup="dialog"
        className={className}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      <ReviewPrompt open={open} destinationUrl={destinationUrl} continueLabel={continueLabel} onClose={close} />
    </>
  );
}
