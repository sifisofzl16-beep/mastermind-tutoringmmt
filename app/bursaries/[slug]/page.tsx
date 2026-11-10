import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/app/_site/Icons";
import SiteFooter from "@/app/_site/SiteFooter";
import SiteHeader from "@/app/_site/SiteHeader";
import { ReviewGate } from "@/app/components/ReviewPrompt";
import { liveStatus, WA } from "@/lib/site";
import { initials } from "../_listing/listing";
import { BTN_PRIMARY, BTN_SECONDARY, CheckList, InitialsTile, Kicker, SourceNote, StatusChip, TEXT_LINK } from "../_listing/parts";
import { BURSARIES, getBursary } from "../data";

type Props = { params: Promise<{ slug: string }> };

// The status depends on today's date, so rebuild the page every hour.
export const revalidate = 3600;

export function generateStaticParams() {
  return BURSARIES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBursary(slug);
  if (!b) return { title: "Bursary not found | Mastermind Tutoring" };
  return {
    title: `${b.company} bursary ${b.year} | Mastermind Tutoring`,
    description: b.summary,
    alternates: { canonical: `/bursaries/${b.slug}` },
  };
}

export default async function BursaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const b = getBursary(slug);
  if (!b) notFound();

  const status = liveStatus(b.closingDate, b.status);
  const isClosed = status === "Closed";

  return (
    <>
      <SiteHeader whatsapp={WA.general} />
      <main>
        <section className="paper-grid border-b border-navy/10">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
            <Link href="/bursaries" className={`inline-flex min-h-11 items-center gap-2 ${TEXT_LINK}`}>
              <Icon name="arrow" className="h-4 w-4 rotate-180" />
              All bursaries
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <InitialsTile text={initials(b.company)} size="lg" muted={isClosed} />
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip status={status} />
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy/70 ring-1 ring-navy/10">
                  Bursary for {b.year}
                </span>
              </div>
            </div>

            <h1 className="mt-5 break-words font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{b.company}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy/75">{b.summary}</p>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">{isClosed ? "Closed" : "Closes"}</p>
                <p className="font-display text-2xl font-bold tracking-tight">{b.closingDate}</p>
              </div>
              {isClosed ? (
                <p className="rounded-2xl bg-navy/10 px-5 py-3 font-medium text-navy/70">
                  Applications have closed. The details below are kept for reference.
                </p>
              ) : (
                <ReviewGate destinationUrl={b.applyUrl} continueLabel="Continue to the application page" className={BTN_PRIMARY}>
                  Go to the application page
                  <Icon name="external" className="h-4 w-4" />
                </ReviewGate>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
          <section aria-labelledby="about-heading">
            <Kicker>About this bursary</Kicker>
            <h2 id="about-heading" className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              What it is
            </h2>
            <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-navy/80">{b.about}</p>
          </section>

          <section aria-labelledby="fields-heading">
            <Kicker>Fields covered</Kicker>
            <h2 id="fields-heading" className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              What you can study
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {b.fields.map((f) => (
                <div key={f.group} className="rounded-2xl bg-white p-6 ring-1 ring-navy/10">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{f.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {f.items.map((item) => (
                      <li key={item} className="rounded-full bg-cream px-3 py-1 text-sm text-navy/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Requirements and benefits" className="grid gap-4 md:grid-cols-2">
            <CheckList title="Requirements" items={b.requirements} />
            <CheckList title="What you get" items={b.benefits} />
          </section>

          <section aria-labelledby="apply-heading" className="rounded-2xl bg-white p-6 ring-1 ring-navy/10 sm:p-10">
            <h2 id="apply-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {isClosed ? "This bursary has closed" : "Ready to apply?"}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-navy/75">
              {isClosed
                ? `Applications closed on ${b.closingDate}. Many funders reopen at the same time each year, so ask us for an alert and have a look at what is open now.`
                : `Applications close on ${b.closingDate}. The button takes you to the page where the application is made or explained.`}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {!isClosed && (
                <ReviewGate destinationUrl={b.applyUrl} continueLabel="Continue to the application page" className={BTN_PRIMARY}>
                  Go to the application page
                  <Icon name="external" className="h-4 w-4" />
                </ReviewGate>
              )}
              <ReviewGate destinationUrl={WA.bursaryAlerts} continueLabel="Continue to WhatsApp" className={isClosed ? BTN_PRIMARY : BTN_SECONDARY}>
                <Icon name="chat" />
                Get WhatsApp alerts
              </ReviewGate>
              <Link href="/bursaries" className={BTN_SECONDARY}>
                See other bursaries
              </Link>
            </div>
            <div className="mt-8 border-t border-navy/10 pt-5">
              <SourceNote source={b.source} handledBy={b.company} />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
