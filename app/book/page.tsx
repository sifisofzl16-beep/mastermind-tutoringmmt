import type { Metadata } from "next";
import { Suspense } from "react";
import { PHONE_DISPLAY } from "@/lib/contact";
import { WA } from "@/lib/site";
import BookingForm from "../_site/BookingForm";
import SiteFooter from "../_site/SiteFooter";
import SiteHeader from "../_site/SiteHeader";

export const metadata: Metadata = {
  title: "Book sessions | Mastermind Tutoring",
  description:
    "Book Maths and Physical Sciences tutoring for Grades 10 to 12, or tutoring and Full Courses for university modules. Fill in a short form and send it to us on WhatsApp.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <SiteHeader whatsapp={WA.general} current="book" />
      <main id="main" className="paper-grid flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="font-hand text-3xl font-bold text-amber">Book sessions</p>
          <h1 className="mt-1 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            Tell us what you need. We reply on WhatsApp.
          </h1>
          <p className="mt-4 text-lg text-navy/75">
            Fill in the details below and tap send. WhatsApp opens with your booking written out, so we have everything
            we need to match you with the right tutor.
          </p>
          <div className="mt-8">
            <Suspense fallback={<div className="skeleton h-96 rounded-[1.75rem] bg-navy/10" />}>
              <BookingForm />
            </Suspense>
          </div>
          <p className="mt-6 text-center text-sm text-navy/60">
            Prefer to just chat? WhatsApp us on{" "}
            <a href={WA.general} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
