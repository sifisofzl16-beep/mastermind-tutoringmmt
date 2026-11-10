import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/app/_site/Icons";
import SiteFooter from "@/app/_site/SiteFooter";
import SiteHeader from "@/app/_site/SiteHeader";
import { ReviewGate } from "@/app/components/ReviewPrompt";
import { WA } from "@/lib/site";
import ListingBrowser from "./_listing/ListingBrowser";
import { initials, splitByStatus, type ListingCard } from "./_listing/listing";
import { BTN_PRIMARY, BTN_SECONDARY } from "./_listing/parts";
import { BURSARIES, fieldCategories, FIELD_CATEGORY_ORDER, type Bursary } from "./data";

// Statuses depend on today's date, so rebuild the page every hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bursaries for South African university students | Mastermind Tutoring",
  description:
    "Bursaries for engineering, commerce and science students in South Africa, with requirements, what is covered and closing dates. Listings close themselves when the date passes.",
  alternates: { canonical: "/bursaries" },
};

function toCard(b: Bursary, status: ListingCard["status"]): ListingCard {
  return {
    slug: b.slug,
    href: `/bursaries/${b.slug}`,
    name: b.company,
    initials: initials(b.company),
    eyebrow: `${b.year} academic year`,
    summary: b.summary,
    tags: b.fields.map((f) => f.group),
    filterKeys: fieldCategories(b),
    closingDate: b.closingDate,
    status,
  };
}

export default function BursariesIndexPage() {
  const { open, closed } = splitByStatus(BURSARIES);
  const openCards = open.map((x) => toCard(x.item, x.live));
  const closedCards = closed.map((x) => toCard(x.item, x.live));
  const present = new Set([...openCards, ...closedCards].flatMap((c) => c.filterKeys));
  const filters = FIELD_CATEGORY_ORDER.filter((c) => present.has(c));

  return (
    <>
      <SiteHeader whatsapp={WA.general} />
      <main>
        <section className="paper-grid border-b border-navy/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="font-hand text-2xl font-bold text-amber sm:text-[1.7rem]">Bursary watch</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Find <span className="marker">funding</span> before it closes.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/75">
              Each bursary is taken from the funder&apos;s own page or an established bursary listing, with the fields, requirements and closing date set out in plain language.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ReviewGate destinationUrl={WA.bursaryAlerts} continueLabel="Continue to WhatsApp" className={BTN_PRIMARY}>
                <Icon name="chat" />
                Get WhatsApp alerts
              </ReviewGate>
              <Link href="/opportunities" className={BTN_SECONDARY}>
                See internships and graduate programmes
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ListingBrowser
            open={openCards}
            closed={closedCards}
            filters={filters}
            filterLabel="Filter bursaries by field"
            noun="bursaries"
            alertsUrl={WA.bursaryAlerts}
          />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="night-grid rise rounded-2xl bg-navy px-6 py-10 text-white sm:px-12 sm:py-14">
            <p className="font-hand text-3xl font-bold text-gold">Do not miss the next one</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">More bursaries are added as they open.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
              Funders open at different points in the year, and some only stay open for two or three weeks. Send us a WhatsApp and we will message you when a new bursary goes up.
            </p>
            <ReviewGate
              destinationUrl={WA.bursaryAlerts}
              continueLabel="Continue to WhatsApp"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Icon name="chat" />
              Get WhatsApp alerts
            </ReviewGate>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
