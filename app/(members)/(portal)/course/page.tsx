import Link from "next/link";
import { getSession, todayISO } from "@/lib/session";
import { whatsappLink } from "@/lib/contact";
import { chapterParts, formatDate, isPlayable, loadOpened, resourceHref, type Resource } from "@/lib/course";
import Icon from "../../../_site/Icons";

type ModuleRow = { id: string; slug: string; title: string; description: string | null; live_class_info: string | null };
type EnrolmentRow = { module_id: string; paid_until: string };
type TopicRow = { id: string; module_id: string; slug: string; title: string; sort_order: number; resources: Resource[] };

function greeting() {
  const h = Number(
    new Intl.DateTimeFormat("en-ZA", { hour: "numeric", hour12: false, timeZone: "Africa/Johannesburg" }).format(new Date()),
  );
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default async function CoursePage() {
  const { supabase, user, profile } = await getSession();
  if (!user) return null;

  const [{ data: modules }, { data: enrolments }, { data: topicRows }, opened] = await Promise.all([
    supabase.from("modules").select("id,slug,title,description,live_class_info").order("sort_order"),
    supabase.from("enrolments").select("module_id,paid_until").eq("user_id", user.id),
    supabase
      .from("topics")
      .select("id,module_id,slug,title,sort_order,resources(id,kind,title,section,storage_path,video_url,sort_order,created_at)")
      .order("sort_order"),
    loadOpened(),
  ]);

  const today = todayISO();
  const byModule = new Map(((enrolments ?? []) as EnrolmentRow[]).map((e) => [e.module_id, e.paid_until]));
  const isAdmin = !!profile?.is_admin;
  const firstName = profile?.full_name?.split(" ")[0];
  const all = (modules ?? []) as ModuleRow[];
  const topics = (topicRows ?? []) as TopicRow[];

  const state = (m: ModuleRow) => {
    const paidUntil = byModule.get(m.id);
    const active = isAdmin || (!!paidUntil && paidUntil >= today);
    return { paidUntil, active, expired: !active && !!paidUntil };
  };
  const mine = all.filter((m) => state(m).active);
  const others = all.filter((m) => !state(m).active);

  // The last thing this student opened, and what follows it in the same chapter.
  let resume: { mod: ModuleRow; topic: TopicRow; res: Resource; next: Resource | null } | null = null;
  const lastId = opened.keys().next().value as string | undefined;
  if (lastId) {
    for (const t of topics) {
      const res = t.resources.find((r) => r.id === lastId);
      const mod = res ? mine.find((m) => m.id === t.module_id) : undefined;
      if (res && mod) {
        const vids = t.resources.filter(isPlayable).sort((a, b) => a.sort_order - b.sort_order);
        const at = vids.findIndex((v) => v.id === res.id);
        const next = at >= 0 ? (vids.slice(at + 1).find((v) => !opened.has(v.id)) ?? null) : null;
        resume = { mod, topic: t, res, next };
        break;
      }
    }
  }

  return (
    <>
      <p className="font-hand text-3xl font-bold text-amber">{greeting()}{firstName ? `, ${firstName}` : ""}</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight sm:text-5xl">My courses</h1>

      {resume && (
        <section aria-label="Continue" className="night-grid mt-8 overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Pick up where you left off</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">{(resume.next ?? resume.res).title}</h2>
              <p className="mt-1 text-white/65">
                {resume.mod.title}, {chapterParts(resume.topic.title).num ? `Chapter ${chapterParts(resume.topic.title).num}: ` : ""}
                {chapterParts(resume.topic.title).name}
                {resume.next ? ". Next video in this chapter." : ""}
              </p>
            </div>
            <Link
              href={resourceHref(resume.mod.slug, resume.topic.slug, resume.next ?? resume.res)}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-navy hover:bg-gold-2"
            >
              <Icon name="play" className="h-5 w-5" /> Continue
            </Link>
          </div>
        </section>
      )}

      {mine.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-navy/10">
          <h2 className="font-display text-2xl font-semibold">You do not have an active course yet</h2>
          <p className="mx-auto mt-2 max-w-md text-navy/70">
            Message us on WhatsApp to join a Full Course or renew your access, and your course will appear here.
          </p>
          <a
            href={whatsappLink("Hi Mastermind Tutoring, I'd like to join the Full Course.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-3"
          >
            Message us on WhatsApp
          </a>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {mine.map((m) => {
            const { paidUntil } = state(m);
            const mt = topics.filter((t) => t.module_id === m.id);
            const resources = mt.flatMap((t) => t.resources);
            const videos = resources.filter(isPlayable).length;
            const done = resources.filter((r) => opened.has(r.id)).length;
            const pct = resources.length ? Math.round((done / resources.length) * 100) : 0;
            const daysLeft =
              paidUntil && !isAdmin
                ? Math.ceil((new Date(paidUntil + "T00:00:00").getTime() - new Date(today + "T00:00:00").getTime()) / 86400000)
                : null;

            return (
              <li key={m.id}>
                <Link
                  href={`/course/${m.slug}`}
                  className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-navy/10 transition hover:ring-2 hover:ring-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight">{m.title}</h2>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-gold transition-transform group-hover:translate-x-1">
                      <Icon name="arrow" className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-navy/65">
                    {mt.length} sections, {videos} videos, {resources.length - videos} files
                  </p>

                  <div className="mt-6 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{done === 0 ? "Not started yet" : `${done} of ${resources.length} opened`}</span>
                      <span className="font-display font-bold">{pct}%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-navy/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${m.title} progress`}>
                      <div className="h-full rounded-full bg-gold" style={{ width: `${Math.max(pct, done > 0 ? 3 : 0)}%` }} />
                    </div>
                  </div>

                  {daysLeft !== null && paidUntil && (
                    <p className={`mt-5 inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-sm font-medium ${daysLeft <= 7 ? "bg-red-700 text-white" : "bg-cream text-navy/75"}`}>
                      <Icon name="clock" className="h-4 w-4" />
                      {daysLeft <= 7 ? `Access ends in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}` : `Access until ${formatDate(paidUntil)}`}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">{mine.length > 0 ? "Add another course" : "Our courses"}</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {others.map((m) => {
              const { expired, paidUntil } = state(m);
              return (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-navy/25 p-5">
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Icon name="lock" className="h-4 w-4 shrink-0 text-navy/50" />
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm text-navy/60">
                      {expired && paidUntil ? `Your access ended on ${formatDate(paidUntil)}.` : (m.description ?? "Not part of your plan yet.")}
                    </p>
                  </div>
                  <a
                    href={whatsappLink(`Hi Mastermind Tutoring, I'd like to ${expired ? "renew" : "join"} the ${m.title} Full Course.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 shrink-0 items-center rounded-full px-5 py-2 text-sm font-semibold ring-1 ring-navy/30 hover:bg-navy hover:text-white"
                  >
                    {expired ? "Renew on WhatsApp" : "Ask about joining"}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
