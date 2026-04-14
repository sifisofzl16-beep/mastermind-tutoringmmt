"use client";

export default function MastermindTutoringWebsite() {
  const bookingFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSeFR9P04-aA_vJJIEukzNpAygBJl8CHMeuaDZIjaN_tiQrwlQ/viewform";

  const tutorApplicationLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSeD6l_WL1IftliSprtDEADDjadc88V1zAKaDap2cSQAtX3sRg/viewform";

  const whatsappLink = "https://wa.me/27660397779";

  const subjects = [
    "Engineering Mathematics (Calculus, Differential Equations)",
    "Thermodynamics",
    "Fluid Mechanics",
    "Strength of Materials",
    "Heat Transfer",
    "Mass Transfer",
    "Chemical Reaction Engineering",
    "Transport Phenomena",
    "Structural Analysis",
    "Circuit Analysis",
    "Signals and Systems",
    "Engineering Physics",
    "Programming for Engineers",
    "Engineering Drawing",
  ];

  const packages = [
    {
      name: "Foundation Package",
      price: "In-person: R300/session | Online: R250/session | From R1000/month",
      ideal:
        "Ideal for students who need steady weekly support, clearer understanding, and structured guidance.",
      features: [
        "1 tutoring session per week",
        "Concept clarification and homework help",
        "WhatsApp support",
        "Progress-focused academic guidance",
      ],
      badge: "Starter",
    },
    {
      name: "Momentum Package",
      price: "In-person: From R2000/month | Online: From R1700/month",
      ideal:
        "Built for students who want stronger momentum, better consistency, and more exam-focused support.",
      features: [
        "2 sessions per week",
        "Past paper practice",
        "Test and exam preparation",
        "Priority academic support",
      ],
      badge: "Most Popular",
    },
    {
      name: "Mastery Package",
      price: "In-person: From R3000/month | Online: From R2550/month",
      ideal:
        "Designed for ambitious students aiming for top performance in demanding modules.",
      features: [
        "3+ sessions per week",
        "Personalised study planning",
        "Deep problem-solving sessions",
        "Extended support and revision guidance",
      ],
      badge: "Advanced",
    },
  ];

  const highlights = [
    {
      title: "Built for first-year and second-year success",
      text:
        "MMT is designed to support all university students, with special emphasis on the years where students are most likely to feel overwhelmed, fall behind, or lose confidence.",
    },
    {
      title: "We recruit high-performing tutors",
      text:
        "Our model is built around excellence. MMT works to recruit top-performing university tutors with strong subject mastery, professionalism, and the ability to explain difficult content clearly.",
    },
    {
      title: "Professional and approachable",
      text:
        "The MMT experience is structured, professional, and high quality while still remaining student-friendly, supportive, and accessible.",
    },
  ];

  const offerings = [
    [
      "One-on-one tutoring",
      "Personalised sessions matched to the student’s module, pace, and goals.",
    ],
    [
      "Group tutoring",
      "Affordable small-group support for students who want to learn together and reduce costs.",
    ],
    [
      "Bootcamps & revision",
      "Crash courses and focused exam revision sessions for high-pressure academic periods.",
    ],
  ];

  const howItWorks = [
    [
      "1",
      "Submit an enquiry",
      "Students can enquire through WhatsApp or the online booking form.",
    ],
    [
      "2",
      "Tell us your module",
      "Share your institution, course or module, year of study, and preferred tutoring format.",
    ],
    [
      "3",
      "Get matched",
      "MMT matches you with a high-performing tutor suited to your academic needs.",
    ],
    [
      "4",
      "Start improving",
      "Begin one-on-one or group support with a focus on understanding, consistency, and results.",
    ],
  ];

  const groupPricing = [
    ["3 students", "R200 each"],
    ["4 students", "R180 each"],
    ["5 students", "R150 each"],
  ];

  const tutorProfiles = [
    [
      "Tutor profile",
      "Engineering Mathematics and Calculus support for first-year engineering students.",
    ],
    [
      "Tutor profile",
      "Thermodynamics and Fluid Mechanics tutoring with strong problem-solving focus.",
    ],
    [
      "Tutor profile",
      "Physics, Chemistry, and exam revision guidance.",
    ],
  ];

  const reviews = [
    [
      "Student review",
      "“MMT helped me finally understand the module I was struggling with. The tutor was patient, sharp, and really knew the work.”",
    ],
    [
      "Student review",
      "“The sessions were structured, professional, and genuinely useful before my tests.”",
    ],
    [
      "Student review",
      "“It felt professional but still friendly. I actually looked forward to sessions.”",
    ],
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(168,85,247,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <nav className="mb-16 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-sm font-bold tracking-[0.25em] text-cyan-200">
                MMT
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                  MMT
                </div>
                <div className="text-lg font-semibold">Mastermind Tutoring</div>
              </div>
            </div>

            <div className="hidden gap-8 text-sm text-slate-300 md:flex">
              <a href="#about" className="transition hover:text-white">
                About
              </a>
              <a href="#subjects" className="transition hover:text-white">
                Subjects
              </a>
              <a href="#packages" className="transition hover:text-white">
                Packages
              </a>
              <a href="#tutors" className="transition hover:text-white">
                Tutors
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                Launching at Wits University, expanding to other institutions
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl md:leading-[1.05]">
                Excellence made{" "}
                <span className="text-cyan-300">understandable</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Mastermind Tutoring (MMT) connects university students with
                high-performing tutors across Engineering, Mathematics, Science,
                CLM, and more. We are launching at Wits University with a strong
                focus on first-year and second-year success, and scaling to
                other institutions over time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#packages"
                  className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
                >
                  View Packages
                </a>
                <a
                  href={bookingFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Student Support</div>
                  <div className="text-2xl font-semibold">What MMT Offers</div>
                </div>
                <div className="rounded-2xl bg-emerald-400/15 px-4 py-2 text-sm font-medium text-emerald-300">
                  All Levels
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "One-on-one tutoring",
                  "Group support sessions",
                  "Exam preparation",
                  "Assignment guidance",
                  "Study planning",
                  "Concept breakdowns",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">
                  Mission
                </p>
                <p className="mt-2 text-slate-100">
                  To build confident, capable students through tutoring that is
                  strategic, supportive, and results-driven.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              About MMT
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              A tutoring company built for modern university students.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Founded by{" "}
              <span className="font-semibold text-white">
                Fezile Sifiso Nkosi
              </span>
              , a BSc Chemical Engineering graduate from Wits University and MSc
              Chemical Engineering student at UKZN, MMT is designed as a
              serious tutoring platform that matches students with excellent
              tutors in demanding university modules.
            </p>
          </div>
          <div className="grid gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="subjects"
        className="border-y border-white/10 bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Subjects
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Support across major academic areas.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              We support a wide range of university subjects while giving
              special attention to high-demand and difficult modules. MMT
              launches at Wits University and is designed to scale across other
              institutions over time.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => (
              <div
                key={subject}
                className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 text-base font-medium text-slate-100 shadow-lg"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="packages"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Packages
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Professional package options ready for editing.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Transparent package pricing helps students understand their
              options clearly. Online tutoring is offered at a lower rate, while
              in-person sessions are arranged per student.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            Editable package section
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="group rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-7 shadow-xl transition hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                  <p className="mt-2 text-3xl font-bold text-cyan-300">
                    {pkg.price}
                  </p>
                </div>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  {pkg.badge}
                </span>
              </div>

              <p className="mt-5 leading-7 text-slate-300">{pkg.ideal}</p>

              <div className="mt-6 space-y-3">
                {pkg.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-slate-900/60 p-3 text-sm text-slate-200"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={bookingFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full rounded-2xl bg-white/8 px-5 py-3 text-center text-sm font-semibold text-white transition group-hover:bg-cyan-400 group-hover:text-slate-950"
              >
                Choose Package
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:px-10 lg:grid-cols-3 lg:px-12">
          {offerings.map(([title, text]) => (
            <div
              key={title}
              className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Why choose MMT
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              A tutoring brand built around excellence.
            </h2>
            <div className="mt-8 space-y-4 text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                We recruit high-performing tutors with strong academic records
                and subject mastery.
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                We focus on difficult university modules where students need the
                most support.
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                We combine a high standard with an approachable
                student-centered experience.
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                We are launching at Wits University with a scalable model for
                other institutions.
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Simple, professional, effective.
            </h2>
            <div className="mt-8 space-y-4">
              {howItWorks.map(([num, title, text]) => (
                <div
                  key={num}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-sm font-bold text-slate-950">
                    {num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-slate-300">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Group pricing
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Affordable shared learning.
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                Group tutoring gives students a more affordable option while
                still receiving quality academic support.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {groupPricing.map(([size, price]) => (
                  <div
                    key={size}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
                  >
                    <div className="text-lg font-semibold text-white">
                      {size}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-cyan-300">
                      {price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Become a tutor
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Join the MMT standard.
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                MMT is building a network of top-performing university tutors
                who combine academic excellence with professionalism and the
                ability to help students grow.
              </p>
              <div className="mt-6 space-y-3 text-slate-300">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Strong academic performance in your subject area
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Good communication and teaching ability
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  Reliable, professional, and student-centered
                </div>
              </div>
              <a
                href={tutorApplicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400 hover:text-slate-950"
              >
                Apply as a Tutor
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tutors"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Tutors
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Our tutor network
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            MMT recruits high-performing university students with strong
            academic records and the ability to explain difficult modules
            clearly. As the platform grows, tutor profiles will appear here with
            their subjects and availability.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tutorProfiles.map(([label, quote], index) => (
            <div
              key={index}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                {label}
              </p>
              <p className="mt-4 leading-7 text-slate-200">{quote}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map(([label, quote], index) => (
            <div
              key={index}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                {label}
              </p>
              <p className="mt-4 leading-7 text-slate-200">{quote}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="grid gap-8 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 via-slate-900 to-fuchsia-500/10 p-8 md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Let’s help students unlock their full potential.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Students can enquire through WhatsApp or the online booking form.
              Tutors can apply through the tutor application form.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6">
            <div className="space-y-4 text-slate-300">
              <div>
                <p className="text-sm text-slate-500">Business Name</p>
                <p className="text-lg font-medium text-white">
                  Mastermind Tutoring (MMT)
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Audience</p>
                <p className="text-lg font-medium text-white">
                  Students across multiple disciplines
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Contact</p>
                <p className="text-lg font-medium text-white">0660397779</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-lg font-medium text-white">
                  mastermindtutoring@gmail.com
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-2xl bg-cyan-400 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
              >
                Book via WhatsApp
              </a>
              <a
                href={bookingFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open Booking Form
              </a>
              <a
                href={tutorApplicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Apply as a Tutor
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
          <div>
            <p className="font-semibold text-white">
              Mastermind Tutoring (MMT)
            </p>
            <p className="mt-1">Excellence made understandable.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#packages" className="transition hover:text-white">
              Packages
            </a>
            <a href="#tutors" className="transition hover:text-white">
              Tutors
            </a>
            <a
              href={bookingFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Book
            </a>
            <a
              href={tutorApplicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Tutor Form
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}