import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/app/_site/Icons";
import SiteFooter from "@/app/_site/SiteFooter";
import SiteHeader from "@/app/_site/SiteHeader";
import { ReviewGate } from "@/app/components/ReviewPrompt";
import { WA } from "@/lib/site";
import ListingBrowser from "../bursaries/_listing/ListingBrowser";
import { initials, splitByStatus, type ListingCard } from "../bursaries/_listing/listing";
import { BTN_PRIMARY, BTN_SECONDARY } from "../bursaries/_listing/parts";
import { OPPORTUNITIES, type Opportunity } from "./data";

// Statuses depend on today's date, so rebuild the page every hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Internships, vacation work and graduate programmes | Mastermind Tutoring",
  description:
    "Internships, vacation work, learnerships and graduate programmes for South African students and graduates, with requirements and closing dates. Listings close themselves when the date passes.",
  alternates: { canonical: "/opportunities" },
};

function toCard(o: Opportunity, status: ListingCard["status"]): ListingCard {
  return {
    slug: o.slug,
    href: `/opportunities/${o.slug}`,
    name: o.org,
    initials: initials(o.org),
    eyebrow: o.type,
    summary: o.summary,
    tags: [],
    filterKeys: [o.type],
    closingDate: o.closingDate,
    status,
  };
}

export default function OpportunitiesIndexPage() {
  const { open, closed } = splitByStatus(OPPORTUNITIES);
  const openCards = open.map((x) => toCard(x.item, x.live));
  const closedCards = closed.map((x) => toCard(x.item, x.live));
  const filters = [...new Set([...openCards, ...closedCards].map((c) => c.filterKeys[0]))];

  return (
    <>
      <SiteHeader whatsapp={WA.general} />
      <main>
        <section className="paper-grid border-b border-navy/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="font-hand text-2xl font-bold text-amber sm:text-[1.7rem]">Opportunity watch</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Get real <span className="marker">work</span> on your CV.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/75">
              Internships, vacation work, learnerships and graduate programmes for students and recent graduates, each with a link to the original listing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ReviewGate destinationUrl={WA.opportunityAlerts} continueLabel="Continue to WhatsApp" className={BTN_PRIMARY}>
                <Icon name="chat" />
                Get WhatsApp alerts
              </ReviewGate>
              <Link href="/bursaries" className={BTN_SECONDARY}>
                See bursaries
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ListingBrowser
            open={openCards}
            closed={closedCards}
            filters={filters}
            filterLabel="Filter opportunities by type"
            noun="opportunities"
            alertsUrl={WA.opportunityAlerts}
          />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="night-grid rise rounded-2xl bg-navy px-6 py-10 text-white sm:px-12 sm:py-14">
            <p className="font-hand text-3xl font-bold text-gold">Do not miss the next one</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">More opportunities are added as they open.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
              Vacation work and graduate intakes often open for only a few weeks. Send us a WhatsApp and we will message you when a new one goes up.
            </p>
            <ReviewGate
              destinationUrl={WA.opportunityAlerts}
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
