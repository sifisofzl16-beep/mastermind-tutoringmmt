import Link from "next/link";
import { PHONE_DISPLAY } from "@/lib/contact";
import { getCatalogue, totals, type CatalogueCourse } from "@/lib/catalogue";
import { FULL_COURSE_PRICES, MODULES, SESSION_PRICES, TUTOR_FORM, WA, liveStatus } from "@/lib/site";
import { BURSARIES } from "./bursaries/data";
import { OPPORTUNITIES } from "./opportunities/data";
import Icon from "./_site/Icons";
import ModuleFinder from "./_site/ModuleFinder";
import SiteFooter from "./_site/SiteFooter";
import SiteHeader from "./_site/SiteHeader";
import Syllabus from "./_site/Syllabus";

export const revalidate = 3600;


function chapterParts(title: string) {
  const m = title.match(/^chapter\s+(\d+)\s*[:\-]?\s*(.*)$/i);
  if (!m) return { num: null as string | null, name: title };
  return { num: m[1], name: m[2].trim() || `Chapter ${m[1]}` };
}

export default async function HomePage() {
  const courses = await getCatalogue();
  const sum = totals(courses);
  const hasData = sum.videos > 0;
  const hasQuiz = courses.some((c) => c.topics.some((t) => t.quiz > 0));

  const openBursaries = BURSARIES.filter((b) => liveStatus(b.closingDate, b.status) !== "Closed").length;
  const openOpportunities = OPPORTUNITIES.filter((o) => liveStatus(o.closingDate, o.status) !== "Closed").length;

  const joinLinks = Object.fromEntries(courses.map((c) => [c.slug, WA.course(c.title)]));

  const features = [
    { icon: "play", title: "Recorded lessons", text: "Every section explained on video, in the order your lecturer teaches it. Pause, rewind and watch again before a test." },
    { icon: "book", title: "Study guides", text: "Our own notes for each chapter, written to be read by someone seeing the work for the first time." },
    { icon: "pencil", title: "Problem sets", text: "Practice questions at test level, plus past papers and tut tests, so you know what the marks are given for." },
    { icon: "live", title: "A live class every week", text: "Bring your questions to a live online class. If you miss it, the recording goes into the portal." },
    ...(hasQuiz
      ? [{ icon: "quiz", title: "Quizzes that mark themselves", text: "Answer, then see why the right answer is right. We are adding these chapter by chapter." }]
      : []),
    { icon: "chat", title: "A tutor you can message", text: "Stuck at 9pm on question 4? Send it on WhatsApp and a tutor who passed the module will help you through it." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Mastermind Tutoring",
    url: "https://www.mastermindtutoring.co.za",
    logo: "https://www.mastermindtutoring.co.za/icon-512.png",
    slogan: "Discipline. Understanding. Systems. Results.",
    areaServed: "Johannesburg, South Africa",
    telephone: "+27655112416",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <SiteHeader whatsapp={WA.general} />

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="paper-grid relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-20">
            <div className="pop">
              <p className="font-hand text-2xl font-bold text-amber sm:text-[1.7rem]">
                For Wits students, taught by people who passed the module
              </p>
              <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.2rem]">
                Your whole module, <span className="marker">in order</span>, in one place.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/75 sm:text-xl">
                The Mastermind Tutoring Full Course takes you through first-year Engineering Physics, Mathematics,
                Chemistry and Applied Physics chapter by chapter, with recorded lessons, study guides, problem sets and
                a live class every week.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WA.fullCourse}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-navy shadow-[0_6px_0_0_var(--color-navy)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_0_var(--color-navy)]"
                >
                  Join the Full Course <Icon name="arrow" className="h-5 w-5" />
                </a>
                <a
                  href="#syllabus"
                  className="inline-flex min-h-12 items-center rounded-full bg-white px-7 py-3.5 text-base font-semibold ring-1 ring-navy/20 hover:ring-navy"
                >
                  See what is inside
                </a>
              </div>
              <p className="mt-5 text-navy/70">
                From R250 a month.{" "}
                <a href="#tutoring" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4">
                  Looking for one-on-one tutoring?
                </a>
              </p>
            </div>

            <PortalPreview courses={courses} />
          </div>

          {hasData && (
            <div className="border-y border-navy/10 bg-paper">
              <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-7 sm:px-6 md:grid-cols-4">
                <Stat value={sum.videos} label="lesson and class videos" />
                <Stat value={sum.files} label="study guides and problem files" />
                <Stat value={sum.chapters} label="chapters and sections" />
                <Stat value="Feb 2026" label="tutoring Wits students since" />
              </dl>
            </div>
          )}
        </section>

        {/* Full Course */}
        <section id="full-course" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="rise max-w-2xl">
            <Eyebrow>The Full Course</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
              Everything you need to pass, not just one more hour of tutoring.
            </h2>
            <p className="mt-5 text-lg text-navy/75">
              Most students fall behind in week three and spend the rest of the block catching up. The Full Course gives
              you a set path through the module, so you always know what to do next.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className="rise rounded-3xl bg-white p-7 ring-1 ring-navy/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-navy/70">{f.text}</p>
              </li>
            ))}
          </ul>

          {/* Pricing */}
          <div className="rise mt-12 overflow-hidden rounded-[2rem] bg-navy text-white">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:p-12">
              <div>
                <p className="font-hand text-3xl font-bold text-gold">What it costs</p>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Pay by the month. Add modules and the price per module drops.
                </h3>
                <p className="mt-4 text-white/70">
                  Available for first-year Engineering Physics, Engineering Mathematics, Engineering Chemistry and Applied Physics, in both semesters.{" "}
                  No contract. Your access runs for the month you have paid for.
                </p>
                <ol className="mt-7 space-y-3 text-white/85">
                  {["Message us on WhatsApp and tell us your modules.", "Pay for the month.", "We set up your login and you start with Chapter 1."].map((s, i) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold font-display text-sm font-bold text-navy">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <ul className="grid gap-3 sm:grid-cols-3">
                  {FULL_COURSE_PRICES.map((p, i) => (
                    <li
                      key={p.modules}
                      className={`rounded-2xl p-5 ${i === 2 ? "bg-gold text-navy" : "bg-white/[0.06] ring-1 ring-white/10"}`}
                    >
                      <p className={`text-sm font-semibold ${i === 2 ? "text-navy/75" : "text-white/65"}`}>{p.modules}</p>
                      <p className="mt-3 font-display text-4xl font-bold tracking-tight">{p.price}</p>
                      <p className={`mt-1 text-sm ${i === 2 ? "text-navy/75" : "text-white/65"}`}>{p.note}</p>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={WA.fullCourse}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-navy hover:bg-gold-2"
                  >
                    Join on WhatsApp <Icon name="arrow" className="h-5 w-5" />
                  </a>
                  <Link href="/login" className="font-semibold underline decoration-gold decoration-2 underline-offset-4">
                    Already a student? Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Syllabus */}
        {courses.length > 0 && (
          <section id="syllabus" className="night-grid bg-navy text-white">
            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
              <div className="rise max-w-2xl">
                <p className="font-hand text-3xl font-bold text-gold">Look before you join</p>
                <h2 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                  This is exactly what is in the portal today.
                </h2>
                <p className="mt-5 text-lg text-white/70">
                  This list comes straight from the student portal and updates as we add material. Nothing here is a
                  promise for later. It is what you can open the day you join.
                </p>
              </div>
              <div className="rise mt-10">
                <Syllabus courses={courses} joinLinks={joinLinks} />
              </div>
            </div>
          </section>
        )}

        {/* Tutoring */}
        <section id="tutoring" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="rise">
              <Eyebrow>One-on-one tutoring</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                Stuck on one module? Sit with someone who passed it.
              </h2>
              <p className="mt-5 text-lg text-navy/75">
                We match you with a tutor who has written the same tests for the same module at Wits, across
                Engineering, Commerce and Science. Sessions are online or in person.
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  ["Tell us your module", "Send us a WhatsApp with the module and what you are struggling with."],
                  ["Meet your tutor", "We pair you with a tutor who did well in that exact module."],
                  ["Start working", "Book a single session, or lock in a weekly slot with the monthly package."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-hand text-5xl font-bold leading-none text-gold [-webkit-text-stroke:1px_var(--color-navy)]">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{t}</h3>
                      <p className="text-navy/70">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rise space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {SESSION_PRICES.map((p, i) => (
                  <article key={p.name} className={`flex flex-col rounded-3xl p-7 ring-1 ${i === 1 ? "bg-white ring-2 ring-gold" : "bg-white ring-navy/10"}`}>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="mt-2 text-sm text-navy/70">{p.blurb}</p>
                    <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-navy/10 py-4">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-navy/55">Online</dt>
                        <dd className="mt-1 font-display text-2xl font-bold tracking-tight">{p.online}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-navy/55">In person</dt>
                        <dd className="mt-1 font-display text-2xl font-bold tracking-tight">{p.inPerson}</dd>
                      </div>
                    </dl>
                    <p className="mt-2 text-sm text-navy/60">{p.unit}</p>
                    <ul className="mt-4 flex-1 space-y-2 text-sm">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={WA.session}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 font-semibold ${
                        i === 1 ? "bg-navy text-white hover:bg-navy-3" : "ring-1 ring-navy/25 hover:ring-navy"
                      }`}
                    >
                      Book on WhatsApp
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="rise mt-12">
            <ModuleFinder modules={MODULES} />
          </div>
        </section>

        {/* High school */}
        <section id="high-school" className="bg-paper">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
            <div className="rise">
              <Eyebrow>Grades 10, 11 and 12</Eyebrow>
              <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                Maths and Physical Sciences, taught by university students who were there not long ago.
              </h2>
              <p className="mt-5 text-lg text-navy/75">
                Matric marks decide which degrees stay open. Our tutors are Wits students who earned their place in
                Engineering, Science and Commerce, and they teach the method as well as the answer.
              </p>
              <p className="mt-4 text-lg text-navy/75">
                Going into Grade 12 next year? The best time to close the gaps from Grade 11 is before the year starts.
              </p>
              <a
                href={WA.highSchool}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-semibold text-white hover:bg-navy-3"
              >
                Talk to us about your child <Icon name="arrow" className="h-5 w-5" />
              </a>
            </div>
            <div className="rise self-center rounded-3xl bg-white p-7 ring-1 ring-navy/10 sm:p-9">
              <h3 className="font-display text-xl font-semibold tracking-tight">High school pricing</h3>
              <table className="mt-5 w-full text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-navy/55">
                    <th className="pb-3 font-semibold">Per subject</th>
                    <th className="pb-3 font-semibold">Online</th>
                    <th className="pb-3 font-semibold">In person</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10 border-y border-navy/10">
                  {SESSION_PRICES.map((p) => (
                    <tr key={p.name}>
                      <th scope="row" className="py-4 pr-3 font-medium">
                        {p.name}
                        <span className="block text-sm font-normal text-navy/60">{p.unit}</span>
                      </th>
                      <td className="py-4 font-display text-xl font-bold">{p.online}</td>
                      <td className="py-4 font-display text-xl font-bold">{p.inPerson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="mt-5 space-y-2 text-navy/75">
                {[
                  "Mathematics and Physical Sciences",
                  "Taking both subjects? Split one monthly package across the two",
                  "A direct WhatsApp line to the tutor",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-amber" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="rise max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
              Four words we hold every tutor and every student to.
            </h2>
          </div>
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Discipline", "A weekly rhythm you can keep: lessons, then problems, then the live class. Small work done every week beats a panic before the test."],
              ["Understanding", "We explain where a formula comes from before we use it. If you understand it, you do not need to memorise it."],
              ["Systems", "Every chapter is laid out the same way, so you never waste time working out where to start."],
              ["Results", "The point is the mark on your transcript. Everything we make is built around how the tests are set and marked."],
            ].map(([t, d], i) => (
              <li key={t} className="rise border-t-2 border-navy pt-5">
                <span className="font-hand text-3xl font-bold text-amber">0{i + 1}</span>
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-navy/70">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Bursaries, opportunities, tutors */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="grid gap-5 lg:grid-cols-3">
            <TeaserCard
              href="/bursaries"
              kicker={openBursaries > 0 ? `${openBursaries} open now` : "Bursary board"}
              title="Bursaries"
              text="Funding for Engineering, Commerce and Science students, with requirements, closing dates and the official link to apply."
              cta="Browse bursaries"
            />
            <TeaserCard
              href="/opportunities"
              kicker={openOpportunities > 0 ? `${openOpportunities} open now` : "Work board"}
              title="Opportunities"
              text="Internships, vacation work, learnerships and graduate programmes, each with a link to the original listing."
              cta="Browse opportunities"
            />
            <article className="rise flex flex-col rounded-3xl bg-gold p-7 text-navy sm:p-8">
              <p className="font-hand text-2xl font-bold">Did well in a Wits module?</p>
              <h3 className="mt-1 font-display text-3xl font-bold tracking-tight">Tutor with us</h3>
              <p className="mt-3 flex-1 text-navy/80">
                Earn R150 to R300 an hour teaching the modules you did well in, on a schedule that fits around your own
                lectures.
              </p>
              <a
                href={TUTOR_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-3"
              >
                Apply to tutor <Icon name="external" className="h-4 w-4" />
              </a>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-paper">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">Before you message us</h2>
            <div className="mt-10 divide-y divide-navy/15 border-y border-navy/15">
              <Faq q="How do I join the Full Course?">
                Message us on WhatsApp on {PHONE_DISPLAY} and tell us which modules you want. Once your payment for the
                month is in, we create your login and you can open the portal straight away.
              </Faq>
              <Faq q="Which modules does the Full Course cover?">
                First semester: Engineering Physics (PHYS1032 and PHYS1000), Engineering Mathematics (MATH1042) and Engineering Chemistry. Second semester: Engineering Physics (PHYS1033), Engineering Mathematics (MATH1043) and Applied Physics (PHYS1034). We also run Integrated Science for Medical Students in both semesters.{" "}
                For any other module, one-on-one tutoring is the way to go.
              </Faq>
              <Faq q="Can I use the portal on my phone?">
                Yes. It works in any browser, and you can add it to your home screen so it opens like an app. Everything
                is laid out for a phone first.
              </Faq>
              <Faq q="Why does a video ask me to sign in to Google?">
                Our videos are stored privately so that only enrolled students can watch them. Sign in with the Google
                account you gave us when you joined and the video will play.
              </Faq>
              <Faq q="What happens if I miss the live class?">
                The recording is added to that chapter in the portal, under Live classes, so you can watch it when it
                suits you.
              </Faq>
              <Faq q="Is tutoring online or in person?">
                Both. Online sessions cost a little less. In-person sessions happen in Johannesburg at a place and time
                you agree with your tutor.
              </Faq>
              <Faq q="Is Mastermind Tutoring part of Wits?">
                No. We are an independent tutoring business started by a Wits graduate and run with current and recent
                Wits students. We are not affiliated with the university.
              </Faq>
            </div>
          </div>
        </section>

        {/* Closing call */}
        <section className="night-grid bg-navy text-white">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <p className="font-hand text-3xl font-bold text-gold">Start with one module</p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-6xl">
              The next test is closer than it feels.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Tell us what you are studying and where you are stuck. A real person replies.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={WA.general}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-semibold text-navy hover:bg-gold-2"
              >
                <Icon name="chat" className="h-5 w-5" /> WhatsApp {PHONE_DISPLAY}
              </a>
              <Link href="/login" className="inline-flex min-h-12 items-center rounded-full px-8 py-4 text-lg font-semibold ring-1 ring-white/30 hover:ring-white">
                Student login
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-hand text-3xl font-bold text-amber">{children}</p>;
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="px-1">
      <dd className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{value}</dd>
      <dt className="mt-1 max-w-[11rem] text-sm text-navy/65">{label}</dt>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
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

function TeaserCard({ href, kicker, title, text, cta }: { href: string; kicker: string; title: string; text: string; cta: string }) {
  return (
    <Link href={href} className="rise group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-navy/10 transition-shadow hover:ring-2 hover:ring-gold sm:p-8">
      <p className="font-hand text-2xl font-bold text-amber">{kicker}</p>
      <h3 className="mt-1 font-display text-3xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 flex-1 text-navy/70">{text}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-semibold">
        {cta} <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** A drawing of the student portal built from the real chapter list. */
function PortalPreview({ courses }: { courses: CatalogueCourse[] }) {
  const course = courses.find((c) => c.slug === "engineering-physics-1") ?? courses[0];
  const chapters = (course?.topics ?? []).filter((t) => /^chapter/i.test(t.title) && t.videos > 0);
  const lead = [...chapters].sort((a, b) => b.videos - a.videos)[0];
  const start = lead ? chapters.indexOf(lead) : 0;
  const next = chapters.slice(start + 1, start + 4);
  const leadParts = lead ? chapterParts(lead.title) : { num: "16", name: "Waves in one dimension" };

  return (
    <div className="pop relative mx-auto w-full max-w-xl lg:max-w-none" aria-hidden="true">
      <p className="absolute -top-12 right-10 z-10 hidden rotate-[-4deg] font-hand text-2xl font-bold text-navy sm:block">
        this is the real portal
        <svg viewBox="0 0 60 40" className="absolute -bottom-8 -left-12 h-9 w-14 text-navy" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M50 3C40 6 22 12 14 32M14 32l-3-11M14 32l11-5" />
        </svg>
      </p>
      <div className="rotate-[1.2deg] rounded-[1.75rem] bg-navy p-2.5 shadow-[0_30px_60px_-20px_rgb(13_27_42/0.55)] ring-1 ring-navy">
        <div className="flex items-center gap-1.5 px-3 pb-2.5 pt-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-1 text-[0.7rem] text-white/60">mastermindtutoring.co.za/course</span>
        </div>
        <div className="rounded-[1.25rem] bg-cream p-4 sm:p-5">
          <div className="flex items-center gap-4 rounded-2xl bg-navy p-4 text-white">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white/10 font-hand text-4xl font-bold text-gold">{leadParts.num}</span>
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold leading-tight">{leadParts.name}</p>
              <p className="text-sm text-white/60">{course?.title ?? "Engineering Physics"}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-1 overflow-hidden border-b border-navy/15 text-[0.8rem] font-semibold">
            <span className="-mb-px border-b-[3px] border-gold px-2.5 py-2">Videos {lead ? <span className="ml-1 rounded-full bg-gold/30 px-1.5">{lead.videos}</span> : null}</span>
            <span className="px-2.5 py-2 text-navy/55">Study guide</span>
            <span className="px-2.5 py-2 text-navy/55">Problem set</span>
            <span className="hidden px-2.5 py-2 text-navy/55 sm:inline">Live classes</span>
          </div>
          <div className="mt-3 grid aspect-video place-items-center rounded-2xl bg-night">
            <span className="grid justify-items-center gap-3 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-navy">
                <Icon name="play" className="ml-1 h-8 w-8" />
              </span>
              <span className="text-sm text-white/60">Video 1 of {lead?.videos ?? 16}</span>
            </span>
          </div>
          {next.length > 0 && (
            <ul className="mt-3 space-y-2">
              {next.map((t) => {
                const p = chapterParts(t.title);
                return (
                  <li key={t.title} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-navy/10">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy font-hand text-lg font-bold text-gold">{p.num}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{p.name}</span>
                    <span className="shrink-0 text-xs text-navy/55">{t.videos} videos</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <p className="absolute -bottom-8 left-4 hidden rotate-[3deg] font-hand text-2xl font-bold text-navy sm:block">
        works on your phone too
      </p>
    </div>
  );
}
