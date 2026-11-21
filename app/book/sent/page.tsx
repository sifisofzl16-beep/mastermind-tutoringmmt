import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY } from "@/lib/contact";
import { WA } from "@/lib/site";
import Icon from "../../_site/Icons";
import SiteFooter from "../../_site/SiteFooter";
import SiteHeader from "../../_site/SiteHeader";
import ReopenWhatsApp from "./ReopenWhatsApp";

export const metadata: Metadata = {
  title: "Booking received | Mastermind Tutoring",
  robots: { index: false, follow: false },
};

export default function BookingSentPage() {
  return (
    <>
      <SiteHeader current="book" />
      <main id="main" className="paper-grid flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-navy">
            <Icon name="check" className="h-8 w-8" strokeWidth={2.6} />
          </span>
          <p className="mt-6 font-hand text-3xl font-bold text-amber">Booking request received</p>
          <h1 className="mt-1 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            One last step: tap send in WhatsApp.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-navy/75">
            WhatsApp has opened with your booking written out. Once you send it, we reply on WhatsApp to match you with
            a tutor and set up your first session.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ReopenWhatsApp fallback={WA.general} />
            <Link href="/" className="inline-flex min-h-12 items-center rounded-full px-6 py-3 font-semibold ring-1 ring-navy/25 hover:ring-navy">
              Back to the home page
            </Link>
          </div>

          <p className="mt-10 text-sm text-navy/60">
            You can also reach us directly on WhatsApp at {PHONE_DISPLAY}.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
