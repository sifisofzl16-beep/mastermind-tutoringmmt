import Link from "next/link";
import LockedCourse from "../../../_components/LockedCourse";
import { PortalBack } from "../../../_components/Header";
import Icon from "../../../../_site/Icons";
import CourseSearch, { type SearchItem } from "./CourseSearch";
import {
  chapterParts,
  countLabel,
  first,
  formatDate,
  isPlayable,
  loadCourse,
  loadOpened,
  resourceHref,
} from "@/lib/course";

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ module: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { module: slug } = await params;
  const sp = await searchParams;
  const [course, opened] = await Promise.all([loadCourse(slug), loadOpened()]);

  if (course.status === "locked") {
    return <LockedCourse mod={course.mod} expired={course.expired} paidUntil={course.paidUntil} />;
  }

  const { mod, topics, paidUntil, isAdmin, daysLeft } = course;
  const groups = [...new Set(topics.map((t) => t.group_name).filter((g): g is string => !!g))];
  const wantedGroup = first(sp.group);
  const activeGroup = groups.includes(wantedGroup ?? "") ? wantedGroup! : (groups.find((g) => g !== "Start here") ?? groups[0] ?? null);
  const shown = groups.length > 0 ? topics.filter((t) => t.group_name === activeGroup) : topics;

  const allResources = topics.flatMap((t) => t.resources);
  const totalVideos = allResources.filter(isPlayable).length;
  const totalFiles = allResources.length - totalVideos;
  const done = allResources.filter((r) => opened.has(r.id)).length;
  const pct = allResources.length ? Math.round((done / allResources.length) * 100) : 0;

  const searchItems: SearchItem[] = topics.flatMap((t) =>
    t.resources.map((r) => ({
      id: r.id,
      title: r.title,
      chapter: t.group_name && t.group_name !== t.title ? `${t.group_name}: ${t.title}` : t.title,
      href: resourceHref(mod.slug, t.slug, r),
      video: isPlayable(r),
    })),
  );

  return (
    <>
      <PortalBack href="/course">My courses</PortalBack>

      <header className="night-grid mt-4 overflow-hidden rounded-3xl bg-navy p-7 text-white sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{mod.title}</h1>
            {mod.description && <p className="mt-3 text-white/70">{mod.description}</p>}
            <p className="mt-5 text-sm text-white/60">
              {topics.length} sections, {totalVideos} videos, {totalFiles} files
              {!isAdmin && paidUntil ? `. Access until ${formatDate(paidUntil)}` : ""}
            </p>
          </div>
          <div className="w-full sm:w-56">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-white/65">Your progress</span>
              <span className="font-display text-3xl font-bold text-gold">{pct}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Course progress">
              <div className="h-full rounded-full bg-gold" style={{ width: `${Math.max(pct, done > 0 ? 3 : 0)}%` }} />
            </div>
            <p className="mt-2 text-sm text-white/60">{done} of {allResources.length} opened</p>
          </div>
        </div>
      </header>

      {daysLeft !== null && daysLeft <= 7 && (
        <p className="mt-4 flex items-start gap-3 rounded-2xl bg-gold/20 px-5 py-4 text-sm ring-1 ring-gold/50" role="status">
          <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            Your access ends in {daysLeft} {daysLeft === 1 ? "day" : "days"} ({formatDate(paidUntil!)}). Message Mastermind
            Tutoring on WhatsApp to renew.
          </span>
        </p>
      )}

      {mod.live_class_info && (
        <section className="mt-4 flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy/10 sm:p-6">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
            <Icon name="live" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold">Live class</h2>
            <p className="mt-1 whitespace-pre-line text-navy/80">{mod.live_class_info}</p>
          </div>
        </section>
      )}

      {topics.length === 0 ? (
        <p className="mt-10 text-navy/70">Content for this course is being added.</p>
      ) : (
        <>
          <div className="mt-8">
            <CourseSearch items={searchItems} />
          </div>

          {groups.length > 0 && (
            <nav className="mt-8 flex gap-2 overflow-x-auto pb-1" aria-label="Course sections">
              {groups.map((g) => {
                const on = g === activeGroup;
                return (
                  <Link
                    key={g}
                    href={`/course/${mod.slug}?group=${encodeURIComponent(g)}`}
                    scroll={false}
                    aria-current={on ? "page" : undefined}
                    className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold outline-offset-2 focus-visible:outline-2 focus-visible:outline-gold ${
                      on ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/15 hover:ring-gold"
                    }`}
                  >
                    {g}
                  </Link>
                );
              })}
            </nav>
          )}

          <h2 className={`${groups.length > 0 ? "mt-6" : "mt-8"} font-display text-2xl font-semibold tracking-tight`}>
            {activeGroup ?? "Chapters"}
          </h2>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((t) => {
              const videos = t.resources.filter(isPlayable).length;
              const files = t.resources.length - videos;
              const { num, name } = chapterParts(t.title);
              const empty = t.resources.length === 0;
              const seen = t.resources.filter((r) => opened.has(r.id)).length;
              const complete = !empty && seen === t.resources.length;
              const part = empty ? 0 : Math.round((seen / t.resources.length) * 100);
              return (
                <li key={t.id}>
                  <Link
                    href={`/course/${mod.slug}/${t.slug}`}
                    className="group flex h-full flex-col rounded-2xl bg-white p-4 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:ring-2 hover:ring-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <span className="flex items-center gap-4">
                      <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-navy font-hand text-4xl font-bold text-gold" aria-hidden="true">
                        {num ?? <Icon name="book" className="h-7 w-7" />}
                        {complete && (
                          <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-gold text-navy ring-2 ring-white">
                            <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug">{name}</span>
                        <span className={`mt-1 block text-sm ${empty ? "text-navy/45" : "text-navy/65"}`}>{countLabel(videos, files)}</span>
                      </span>
                    </span>
                    {!empty && (
                      <span className="mt-4 flex items-center gap-3">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/10">
                          <span className="block h-full rounded-full bg-gold" style={{ width: `${part}%` }} />
                        </span>
                        <span className="shrink-0 text-xs font-medium text-navy/60">
                          {complete ? "All opened" : seen === 0 ? "Not started" : `${seen} of ${t.resources.length}`}
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
