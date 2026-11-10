import Link from "next/link";
import { EMAIL, PHONE_DISPLAY } from "@/lib/contact";
import { TUTOR_FORM, WA } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div>
          <p className="font-hand text-4xl font-bold leading-none text-gold">Mastermind Tutoring</p>
          <p className="mt-3 text-sm tracking-wide text-white/60">Discipline. Understanding. Systems. Results.</p>
          <p className="mt-6 max-w-xs text-sm text-white/60">
            Maths and Physical Sciences tutoring for Grades 10 to 12, and Full Courses and tutoring for university
            students. Johannesburg and online.
          </p>
        </div>
        <FooterCol title="High school">
          <FooterLink href="/#grade-12">Grade 12 (matric)</FooterLink>
          <FooterLink href="/#how-it-works">How it works</FooterLink>
          <FooterLink href="/#pricing">Prices</FooterLink>
          <FooterLink href="/#faq">Questions parents ask</FooterLink>
        </FooterCol>
        <FooterCol title="University">
          <FooterLink href="/university#full-course">The Full Course</FooterLink>
          <FooterLink href="/university#syllabus">What is inside</FooterLink>
          <FooterLink href="/university#tutoring">One-on-one tutoring</FooterLink>
          <FooterLink href="/login">Student login</FooterLink>
        </FooterCol>
        <FooterCol title="Funding and work">
          <FooterLink href="/bursaries">Bursaries</FooterLink>
          <FooterLink href="/opportunities">Opportunities</FooterLink>
          <FooterLink href={TUTOR_FORM} external>
            Become a tutor
          </FooterLink>
        </FooterCol>
        <FooterCol title="Contact">
          <FooterLink href={WA.general} external>
            WhatsApp {PHONE_DISPLAY}
          </FooterLink>
          <FooterLink href={`mailto:${EMAIL}`}>{EMAIL}</FooterLink>
          <li className="text-sm text-white/60">Johannesburg, South Africa</li>
        </FooterCol>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:px-6">
          <p>© {new Date().getFullYear()} Mastermind Tutoring. Not affiliated with the University of the Witwatersrand.</p>
          <p>CEO: Fezile Nkosi. COO: Thandeka Valelo.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "text-sm text-white/75 underline-offset-4 hover:text-white hover:underline break-words";
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </li>
  );
}
