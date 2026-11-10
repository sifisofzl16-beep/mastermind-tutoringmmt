import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/app/_site/Icons";
import SiteFooter from "@/app/_site/SiteFooter";
import SiteHeader from "@/app/_site/SiteHeader";
import { ReviewGate } from "@/app/components/ReviewPrompt";
import { liveStatus, WA } from "@/lib/site";
import { initials } from "../../bursaries/_listing/listing";
import { BTN_PRIMARY, BTN_SECONDARY, CheckList, InitialsTile, Kicker, SourceNote, StatusChip, TEXT_LINK } from "../../bursaries/_listing/parts";
import { getOpportunity, OPPORTUNITIES } from "../data";

type Props = { params: Promise<{ slug: string }> };

// The status depends on today's date, so rebuild the page every hour.
export const revalidate = 3600;

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = getOpportunity(slug);
  if (!o) return { title: "Opportunity not found | Mastermind Tutoring" };
  return {
    title: `${o.org}: ${o.type} | Mastermind Tutoring`,
    description: o.summary,
    alternates: { canonical: `/opportunities/${o.slug}` },
  };
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const o = getOpportunity(slug);
  if (!o) notFound();

  const status = liveStatus(o.closingDate, o.status);
  const isClosed = status === "Closed";

  return (
    <>
      <SiteHeader whatsapp={WA.general} />
      <main>
        <section className="paper-grid border-b border-navy/10">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
            <Link href="/opportunities" className={`inline-flex min-h-11 items-center gap-2 ${TEXT_LINK}`}>
              <Icon name="arrow" className="h-4 w-4 rotate-180" />
              All opportunities
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InitialsTile text={initials(o.org)} size="lg" muted={isClosed} />
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip status={status} />
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy/70 ring-1 ring-navy/10">
                  {o.type}
                </span>
              </div>
            </div>

            <h1 className="mt-5 break-words font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{o.org}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy/75">{o.summary}</p>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">{isClosed ? "Closed" : "Closes"}</p>
                <p className="font-display text-2xl font-bold tracking-tight">{o.closingDate}</p>
              </div>
              {isClosed ? (
                <p className="rounded-2xl bg-navy/10 px-5 py-3 font-medium text-navy/70">
                  Applications have closed. The details below are kept for reference.
                </p>
              ) : (
                <ReviewGate destinationUrl={o.applyUrl} continueLabel="Continue to the application page" className={BTN_PRIMARY}>
                  Go to the application page
                  <Icon name="external" className="h-4 w-4" />
                </ReviewGate>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
          <section aria-labelledby="about-heading">
            <Kicker>About this opportunity</Kicker>
            <h2 id="about-heading" className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              What it is
            </h2>
            <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-navy/80">{o.about}</p>
          </section>

          <section aria-labelledby="positions-heading">
            <Kicker>Positions available</Kicker>
            <h2 id="positions-heading" className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              What you can apply for
            </h2>
            <ul className="mt-5 divide-y divide-navy/10 rounded-2xl bg-white ring-1 ring-navy/10">
              {o.positions.map((p) => (
                <li key={p.group} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="shrink-0 font-medium">{p.group}</span>
                  <span className="min-w-0 text-sm font-semibold text-amber sm:max-w-[70%] sm:text-right">{p.count}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Requirements and what the role involves" className="grid gap-4 md:grid-cols-2">
            <CheckList title="Requirements" items={o.requirements} />
            <CheckList title="What you will do" items={o.duties} />
          </section>

          <section aria-labelledby="dates-heading">
            <Kicker>Key dates</Kicker>
            <h2 id="dates-heading" className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              When and where
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {o.keyDates.map((d) => (
                <div key={d.label} className="rounded-2xl bg-white p-5 ring-1 ring-navy/10">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">{d.label}</dt>
                  <dd className="mt-1 break-words font-display text-lg font-semibold tracking-tight">{d.date}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="apply-heading" className="rounded-2xl bg-white p-6 ring-1 ring-navy/10 sm:p-10">
            <h2 id="apply-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {isClosed ? "This opportunity has closed" : "Ready to apply?"}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-navy/75">
              {isClosed
                ? "Applications have closed. Many employers run the same intake each year, so ask us for an alert and have a look at what is open now."
                : "The button takes you to the page where the application is made or explained. Check the closing date there before you start."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {!isClosed && (
                <ReviewGate destinationUrl={o.applyUrl} continueLabel="Continue to the application page" className={BTN_PRIMARY}>
                  Go to the application page
                  <Icon name="external" className="h-4 w-4" />
                </ReviewGate>
              )}
              <ReviewGate destinationUrl={WA.opportunityAlerts} continueLabel="Continue to WhatsApp" className={isClosed ? BTN_PRIMARY : BTN_SECONDARY}>
                <Icon name="chat" />
                Get WhatsApp alerts
              </ReviewGate>
              <Link href="/opportunities" className={BTN_SECONDARY}>
                See other opportunities
              </Link>
            </div>
            <div className="mt-8 border-t border-navy/10 pt-5">
              <SourceNote source={o.source} handledBy={o.org} />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
