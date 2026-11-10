import Link from "next/link";
import SiteFooter from "@/app/_site/SiteFooter";
import SiteHeader from "@/app/_site/SiteHeader";
import { WA } from "@/lib/site";
import { BTN_PRIMARY } from "../../bursaries/_listing/parts";

export default function OpportunityNotFound() {
  return (
    <>
      <SiteHeader whatsapp={WA.general} />
      <main className="paper-grid">
        <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold tracking-tight">Opportunity not found</h1>
          <p className="mt-4 leading-relaxed text-navy/75">
            This one may have been removed or moved. You can see everything that is open on the opportunities page.
          </p>
          <Link href="/opportunities" className={`mt-8 ${BTN_PRIMARY}`}>
            View all opportunities
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
