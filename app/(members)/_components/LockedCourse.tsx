import Link from "next/link";
import { whatsappLink } from "@/lib/contact";
import { formatDate, type CourseModule } from "@/lib/course";
import Icon from "../../_site/Icons";

export default function LockedCourse({
  mod,
  expired,
  paidUntil,
}: {
  mod: CourseModule;
  expired: boolean;
  paidUntil?: string;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center ring-1 ring-navy/10 sm:p-10">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold">
        <Icon name="lock" className="h-6 w-6" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">{mod.title}</h1>
      <p className="mt-3 text-navy/70">
        {expired && paidUntil
          ? `Your access ended on ${formatDate(paidUntil)}. Renew and everything opens again, with your progress kept.`
          : "You are not enrolled in this course yet."}
      </p>
      <a
        href={whatsappLink(
          `Hi Mastermind Tutoring, I'd like to ${expired ? "renew" : "join"} the ${mod.title} Full Course.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-2"
      >
        {expired ? "Renew on WhatsApp" : "Ask about joining on WhatsApp"}
      </a>
      <div className="mt-5">
        <Link href="/course" className="text-sm font-medium underline underline-offset-4">
          Back to my courses
        </Link>
      </div>
    </div>
  );
}
