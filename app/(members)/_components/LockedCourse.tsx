import Link from "next/link";
import { formatDate, type CourseModule } from "@/lib/course";

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
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-[#0D1B2A]/10">
      <h1 className="text-2xl font-semibold">{mod.title}</h1>
      <p className="mt-3 text-[#0D1B2A]/70">
        {expired && paidUntil
          ? `Your access ended on ${formatDate(paidUntil)}. Renew to open your notes again.`
          : "You are not enrolled in this course yet."}
      </p>
      <p className="mt-4 text-sm text-[#0D1B2A]/65">
        {expired ? "Contact Mastermind Tutoring to renew." : "Contact Mastermind Tutoring to join."}
      </p>
      <div className="mt-4">
        <Link href="/course" className="text-sm underline underline-offset-4">
          Back to my courses
        </Link>
      </div>
    </div>
  );
}
