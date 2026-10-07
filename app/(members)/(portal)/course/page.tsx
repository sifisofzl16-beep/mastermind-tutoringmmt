import Link from "next/link";
import { getSession, todayISO } from "@/lib/session";

type ModuleRow = { id: string; slug: string; title: string; description: string | null };
type EnrolmentRow = { module_id: string; paid_until: string };

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CoursePage() {
  const { supabase, user, profile } = await getSession();
  if (!user) return null;

  const [{ data: modules }, { data: enrolments }] = await Promise.all([
    supabase.from("modules").select("id,slug,title,description").order("sort_order"),
    supabase.from("enrolments").select("module_id,paid_until").eq("user_id", user.id),
  ]);

  const today = todayISO();
  const byModule = new Map(
    ((enrolments ?? []) as EnrolmentRow[]).map((e) => [e.module_id, e.paid_until]),
  );
  const isAdmin = !!profile?.is_admin;
  const firstName = profile?.full_name?.split(" ")[0];

  return (
    <>
      <h1 className="text-3xl font-semibold">
        {firstName ? `Welcome, ${firstName}` : "Welcome"}
      </h1>
      <p className="mt-2 text-[#0D1B2A]/70">Your Mastermind Tutoring Full Course modules.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {((modules ?? []) as ModuleRow[]).map((m) => {
          const paidUntil = byModule.get(m.id);
          const active = isAdmin || (!!paidUntil && paidUntil >= today);
          const expired = !!paidUntil && paidUntil < today;

          return (
            <section
              key={m.id}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#0D1B2A]/10"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold">{m.title}</h2>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    active
                      ? "bg-[#F4A024]/20 text-[#7a4b00]"
                      : "bg-[#0D1B2A]/10 text-[#0D1B2A]/70"
                  }`}
                >
                  {active ? "Active" : expired ? "Expired" : "Locked"}
                </span>
              </div>
              {m.description && (
                <p className="mt-2 flex-1 text-sm text-[#0D1B2A]/70">{m.description}</p>
              )}

              {active ? (
                <div className="mt-5">
                  {!isAdmin && paidUntil && (
                    <p className="mb-3 text-xs text-[#0D1B2A]/60">
                      Paid until {formatDate(paidUntil)}
                    </p>
                  )}
                  <Link
                    href={`/course/${m.slug}`}
                    className="inline-block rounded-lg bg-[#0D1B2A] px-5 py-2.5 font-semibold text-white hover:bg-[#16293f]"
                  >
                    Open course
                  </Link>
                </div>
              ) : (
                <p className="mt-5 text-sm text-[#0D1B2A]/65">
                  {expired
                    ? "Your access has ended. Contact Mastermind Tutoring to renew."
                    : "Contact Mastermind Tutoring to join this course."}
                </p>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
