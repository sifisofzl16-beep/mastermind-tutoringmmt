import { getSession, todayISO } from "@/lib/session";
import { formatDate } from "@/lib/course";
import { whatsappLink } from "@/lib/contact";
import { PortalBack } from "../../_components/Header";
import { changePassword } from "./actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Row = { paid_until: string; modules: { title: string } | { title: string }[] | null };

const field =
  "w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-base outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export default async function AccountPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : null;
  const message = typeof sp.message === "string" ? sp.message : null;
  const { supabase, user, profile } = await getSession();
  if (!user) return null;

  const { data } = await supabase
    .from("enrolments")
    .select("paid_until,modules(title)")
    .eq("user_id", user.id)
    .order("paid_until");
  const rows = (data ?? []) as Row[];
  const today = todayISO();

  return (
    <div className="mx-auto max-w-3xl">
      <PortalBack href="/course">My courses</PortalBack>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Your account</h1>

      <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-navy/10 sm:p-8">
        <h2 className="font-display text-xl font-semibold">Details</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-navy/60">Name</dt>
            <dd className="font-medium">{profile?.full_name || "Not set"}</dd>
          </div>
          <div>
            <dt className="text-sm text-navy/60">Email you log in with</dt>
            <dd className="break-words font-medium">{profile?.email ?? user.email}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-navy/60">
          Something wrong here?{" "}
          <a
            href={whatsappLink("Hi Mastermind Tutoring, please update my details on the student portal.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
          >
            Message us and we will fix it
          </a>
          .
        </p>
      </section>

      <section className="mt-5 rounded-3xl bg-white p-6 ring-1 ring-navy/10 sm:p-8">
        <h2 className="font-display text-xl font-semibold">Your courses</h2>
        {rows.length === 0 ? (
          <p className="mt-3 text-navy/70">You are not enrolled in a course yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-navy/10">
            {rows.map((r) => {
              const mod = Array.isArray(r.modules) ? r.modules[0] : r.modules;
              const active = r.paid_until >= today;
              return (
                <li key={(mod?.title ?? "") + r.paid_until} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span className="font-medium">{mod?.title ?? "Course"}</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${active ? "bg-gold/25" : "bg-red-700 text-white"}`}>
                    {active ? `Access until ${formatDate(r.paid_until)}` : `Ended ${formatDate(r.paid_until)}`}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mt-5 rounded-3xl bg-white p-6 ring-1 ring-navy/10 sm:p-8">
        <h2 className="font-display text-xl font-semibold">Change your password</h2>
        <p className="mt-1 text-sm text-navy/60">If we gave you a password when you joined, change it to one only you know.</p>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="mt-4 rounded-xl bg-gold/20 px-4 py-3 text-sm" role="status">
            {message}
          </p>
        )}

        <form action={changePassword} className="mt-5 space-y-4">
          <div>
            <label htmlFor="current" className="mb-1 block text-sm font-medium">
              Current password
            </label>
            <input id="current" name="current" type="password" required autoComplete="current-password" className={field} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="next" className="mb-1 block text-sm font-medium">
                New password (8 characters or more)
              </label>
              <input id="next" name="next" type="password" required minLength={8} autoComplete="new-password" className={field} />
            </div>
            <div>
              <label htmlFor="again" className="mb-1 block text-sm font-medium">
                New password again
              </label>
              <input id="again" name="again" type="password" required minLength={8} autoComplete="new-password" className={field} />
            </div>
          </div>
          <button type="submit" className="rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-3">
            Change password
          </button>
        </form>
      </section>
    </div>
  );
}
