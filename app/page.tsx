import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY } from "@/lib/contact";
import { GOOGLE_REVIEWS, SESSION_PRICES, TUTOR_FORM, WA } from "@/lib/site";
import { Eyebrow, Faq, Stars } from "./_site/Bits";
import GradeEnquiry from "./_site/GradeEnquiry";
import Icon from "./_site/Icons";
import SiteFooter from "./_site/SiteFooter";
import SiteHeader from "./_site/SiteHeader";

const title = "Maths and Physical Sciences Tutors for Grades 10 to 12 | Mastermind Tutoring, Johannesburg";
const description =
  "One-on-one Maths and Physical Sciences tutoring for Grades 10, 11 and 12, with a focus on matric. Taught by Wits students who did well in these subjects. Online, or in person in Johannesburg. Rated 4.8 on Google.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  keywords: [
    "matric maths tutor Johannesburg",
    "Grade 12 physical sciences tutor",
    "Grade 11 maths tutor",
    "high school tutor Johannesburg",
    "online maths tutor South Africa",
  ],
  openGraph: { title, description, url: "https://www.mastermindtutoring.co.za" },
};

const GRADE_12_PLAN = [
  {
    when: "Now to January",
    title: "Close the Grade 11 gaps",
    text: "Grade 12 builds directly on Grade 11. We find the topics that did not stick and fix them before the new year piles on more work.",
  },
  {
    when: "Terms 1 and 2",
    title: "Keep up, week by week",
    text: "Sessions follow what your child is doing at school, so tests and the June exams are preparation, not panic.",
  },
  {
    when: "Term 3",
    title: "Prelims",
    text: "Full exam papers under time, then we go through every mark lost and why. Prelim results often go to universities, so they count.",
  },
  {
    when: "Term 4",
    title: "Final exams",
    text: "Past papers, exam technique and the topics that carry the most marks, right up to the last paper.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Mastermind Tutoring",
    url: "https://www.mastermindtutoring.co.za",
    logo: "https://www.mastermindtutoring.co.za/icon-512.png",
    slogan: "Discipline. Understanding. Systems. Results.",
    areaServed: "Johannesburg, South Africa",
    telephone: "+27655112416",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEWS.rating,
      reviewCount: GOOGLE_REVIEWS.count,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <SiteHeader whatsapp={WA.highSchool} current="school" />

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="paper-grid">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-24 lg:pt-20">
            <div className="pop min-w-0">
              <p className="font-hand text-2xl font-bold text-amber sm:text-[1.7rem]">
                Grades 10, 11 and 12. Online, or in person in Johannesburg.
              </p>
              <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.1rem]">
                Maths and Physical Sciences, <span className="marker">explained until it clicks</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/75 sm:text-xl">
                One-on-one tutoring from Wits students who did well in these subjects not long ago. They know the
                work, they remember where it gets hard, and they teach your child the method, not just the answer.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#grade-12"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-navy-3"
                >
                  Matric in 2027? Start here <Icon name="arrow" className="h-5 w-5" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex min-h-12 items-center rounded-full bg-white px-7 py-3.5 text-base font-semibold ring-1 ring-navy/20 hover:ring-navy"
                >
                  See prices
                </a>
              </div>
              <a
                href={GOOGLE_REVIEWS.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 ring-1 ring-navy/10 hover:ring-gold"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                  {GOOGLE_REVIEWS.rating}
                </span>
                <span>
                  <Stars className="h-4 w-4" />
                  <span className="block text-sm text-navy/70">from {GOOGLE_REVIEWS.count} Google reviews</span>
                </span>
              </a>
            </div>

            <div className="pop min-w-0">
              <GradeEnquiry />
            </div>
          </div>
        </section>

        {/* Grade 12 */}
        <section id="grade-12" className="night-grid bg-navy text-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <div className="rise">
                <p className="font-hand text-3xl font-bold text-gold">Grade 12 in 2027</p>
                <h2 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                  Matric is one year. The best time to start is before it does.
                </h2>
                <p className="mt-5 text-lg text-white/75">
                  Maths and Physical Sciences decide which university courses stay open, from engineering and
                  medicine to actuarial science and commerce. Our tutors went through exactly that, and got in.
                </p>
                <a
                  href={WA.grade12}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-navy hover:bg-gold-2"
                >
                  <Icon name="chat" className="h-5 w-5" /> Book matric tutoring
                </a>
              </div>

              <ol className="rise grid gap-4 sm:grid-cols-2">
                {GRADE_12_PLAN.map((s, i) => (
                  <li key={s.when} className="rounded-3xl bg-white/[0.05] p-6 ring-1 ring-white/10">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold font-display text-sm font-bold text-navy">
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">{s.when}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-white/70">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Grades 10 and 11 */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rise rounded-3xl bg-white p-7 ring-1 ring-navy/10 sm:p-9">
              <p className="font-hand text-3xl font-bold text-amber">Grade 11</p>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">The year universities look at first</h2>
              <p className="mt-3 text-navy/75">
                Many universities make their early offers using Grade 11 final results. Grade 11 is also where the
                Maths and Science that matric depends on is taught, so gaps here follow your child into Grade 12.
              </p>
            </article>
            <article className="rise rounded-3xl bg-white p-7 ring-1 ring-navy/10 sm:p-9">
              <p className="font-hand text-3xl font-bold text-amber">Grade 10</p>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Where the foundations are laid</h2>
              <p className="mt-3 text-navy/75">
                Grade 10 is when Maths and Physical Sciences step up. Getting algebra, functions and the basics of
                physics and chemistry solid now makes the next two years much easier.
              </p>
            </article>
          </div>

          <div className="rise mt-5 rounded-3xl bg-white p-7 ring-1 ring-navy/10 sm:p-9">
            <h2 className="font-display text-2xl font-bold tracking-tight">What we teach</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {[
                ["Mathematics", "Algebra, functions and graphs, trigonometry, calculus, geometry, statistics and probability, worked through the way exam questions ask them."],
                ["Physical Sciences", "Physics and Chemistry: the concepts, the calculations, and how to set out an answer so every mark is earned."],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy text-gold">
                    <Icon name={t === "Mathematics" ? "pencil" : "quiz"} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{t}</h3>
                    <p className="mt-1 text-navy/70">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="rise max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                From your first message to the first session.
              </h2>
            </div>
            <ol className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {[
                ["Tell us about your child", "Send us a WhatsApp with their grade, the subject and what they are finding hard. A real person replies."],
                ["We match a tutor", "We pair your child with a tutor who did well in that subject and suits the way your child learns."],
                ["Start the sessions", "Online, or in person in Johannesburg, at a time that fits around school and extra-murals."],
              ].map(([t, d], i) => (
                <li key={t} className="rise border-t-2 border-navy pt-5">
                  <span className="font-hand text-4xl font-bold text-amber">0{i + 1}</span>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{t}</h3>
                  <p className="mt-2 text-navy/70">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="rise max-w-2xl">
            <Eyebrow>Prices</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
              Clear prices, per subject. No contract.
            </h2>
            <p className="mt-5 text-lg text-navy/75">
              Online sessions cost a little less than in person. Taking both Maths and Physical Sciences? One monthly
              package can be split across the two.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {SESSION_PRICES.map((p, i) => (
              <article
                key={p.name}
                className={`rise flex flex-col rounded-3xl p-7 sm:p-9 ${i === 1 ? "bg-navy text-white" : "bg-white ring-1 ring-navy/10"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                  {i === 1 && <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">Best value</span>}
                </div>
                <p className={`mt-2 ${i === 1 ? "text-white/70" : "text-navy/70"}`}>
                  {i === 0
                    ? "One focused hour on whatever your child is stuck on. Good before a test."
                    : "Eight sessions a month with the same tutor, so the work builds week on week. The best fit for matric."}
                </p>
                <dl className={`mt-6 grid grid-cols-2 gap-4 border-y py-5 ${i === 1 ? "border-white/15" : "border-navy/10"}`}>
                  <div>
                    <dt className={`text-xs font-semibold uppercase tracking-wider ${i === 1 ? "text-white/60" : "text-navy/55"}`}>Online</dt>
                    <dd className="mt-1 font-display text-4xl font-bold tracking-tight">{p.online}</dd>
                  </div>
                  <div>
                    <dt className={`text-xs font-semibold uppercase tracking-wider ${i === 1 ? "text-white/60" : "text-navy/55"}`}>In person</dt>
                    <dd className="mt-1 font-display text-4xl font-bold tracking-tight">{p.inPerson}</dd>
                  </div>
                </dl>
                <p className={`mt-2 text-sm ${i === 1 ? "text-white/60" : "text-navy/60"}`}>{p.unit}, per subject</p>
                <a
                  href={WA.highSchool}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-semibold ${
                    i === 1 ? "bg-gold text-navy hover:bg-gold-2" : "ring-1 ring-navy/25 hover:ring-navy"
                  }`}
                >
                  Book on WhatsApp
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-navy text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-4 py-14 sm:px-6">
            <div className="flex items-center gap-6">
              <span className="font-display text-7xl font-bold leading-none tracking-tight text-gold sm:text-8xl">
                {GOOGLE_REVIEWS.rating}
              </span>
              <div>
                <Stars className="h-6 w-6" />
                <p className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                  Rated by {GOOGLE_REVIEWS.count} students and parents on Google
                </p>
                <p className="mt-1 text-white/65">Every review is on our public Google profile. Read them for yourself.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={GOOGLE_REVIEWS.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-2"
              >
                Read the reviews <Icon name="external" className="h-4 w-4" />
              </a>
              <a
                href={GOOGLE_REVIEWS.writeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-full px-6 py-3 font-semibold ring-1 ring-white/30 hover:ring-white"
              >
                Leave a review
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-paper">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
            <Eyebrow>Questions parents ask</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">Before you message us</h2>
            <div className="mt-10 divide-y divide-navy/15 border-y border-navy/15">
              <Faq q="Who are the tutors?">
                Current and recent Wits University students who did well in Maths and Physical Sciences at school and
                now study subjects like engineering, science and commerce. We match each child with one tutor so they
                can build a working relationship.
              </Faq>
              <Faq q="How do online sessions work?">
                Your child joins a video call with the tutor from home. All they need is a phone, tablet or computer
                with a stable connection, and their school work and textbook.
              </Faq>
              <Faq q="Where do in-person sessions happen?">
                In Johannesburg, at a place and time you agree with the tutor. Tell us your area when you message us.
              </Faq>
              <Faq q="My child needs both subjects. How does that work?">
                You can book each subject separately, or split one monthly package of eight sessions across Maths and
                Physical Sciences.
              </Faq>
              <Faq q="Is it too late to start in Grade 12?">
                No. The earlier the better, but we work with matrics at every point in the year, from closing gaps in
                January to exam practice in the final weeks.
              </Faq>
              <Faq q="How do we book?">
                Send us a WhatsApp on {PHONE_DISPLAY} with your child&apos;s grade and subject. We reply, match a tutor and
                set up the first session with you.
              </Faq>
            </div>
          </div>
        </section>

        {/* University and more */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Link
              href="/university"
              className="rise group flex flex-col rounded-3xl bg-navy p-7 text-white sm:p-8 lg:col-span-2"
            >
              <p className="font-hand text-3xl font-bold text-gold">Already at university?</p>
              <h2 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Full Courses and tutoring for university students
              </h2>
              <p className="mt-3 max-w-xl flex-1 text-white/70">
                First-year Engineering Physics, Mathematics, Chemistry and Applied Physics, chapter by chapter in our
                student portal, plus one-on-one tutoring for Wits modules across Engineering, Commerce and Science.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold">
                Go to the university page <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <div className="grid gap-5">
              <Link href="/bursaries" className="rise group rounded-3xl bg-white p-7 ring-1 ring-navy/10 hover:ring-2 hover:ring-gold">
                <p className="font-hand text-2xl font-bold text-amber">Planning for university?</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">Bursaries</h3>
                <span className="mt-3 inline-flex items-center gap-2 font-semibold">
                  See open bursaries <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <a
                href={TUTOR_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="rise group rounded-3xl bg-gold p-7 text-navy"
              >
                <p className="font-hand text-2xl font-bold">Did well in Maths or Science?</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">Tutor with us</h3>
                <span className="mt-3 inline-flex items-center gap-2 font-semibold">
                  Apply <Icon name="external" className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Closing call */}
        <section className="night-grid bg-navy text-white">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <p className="font-hand text-3xl font-bold text-gold">Start this week</p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-6xl">
              The next test is closer than it feels.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Tell us your child&apos;s grade, the subject and where they are stuck. We will take it from there.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={WA.highSchool}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-semibold text-navy hover:bg-gold-2"
              >
                <Icon name="chat" className="h-5 w-5" /> WhatsApp {PHONE_DISPLAY}
              </a>
              <Link href="/university" className="inline-flex min-h-12 items-center rounded-full px-8 py-4 text-lg font-semibold ring-1 ring-white/30 hover:ring-white">
                I am a university student
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
