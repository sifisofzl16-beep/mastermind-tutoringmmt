import Link from "next/link";
import { notFound } from "next/navigation";
import LockedCourse from "../../../../_components/LockedCourse";
import Icon from "../../../../../_site/Icons";
import FileList from "./FileList";
import Quiz, { type QuizQuestion } from "./Quiz";
import VideoPlayer, { type PlayerVideo } from "./VideoPlayer";
import {
  ALWAYS_FILES,
  bySection,
  chapterParts,
  countLabel,
  fileHref,
  first,
  isPlayable,
  loadCourse,
  loadOpened,
  rank,
  sectionOf,
  slugify,
  type Resource,
} from "@/lib/course";
import { getSession } from "@/lib/session";
import { toEmbed } from "@/lib/video";

type Tab = { key: string; label: string; items: Resource[]; count: number };

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ module: string; topic: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { module: slug, topic: topicSlug } = await params;
  const sp = await searchParams;
  const [course, opened] = await Promise.all([loadCourse(slug), loadOpened()]);

  if (course.status === "locked") {
    return <LockedCourse mod={course.mod} expired={course.expired} paidUntil={course.paidUntil} />;
  }

  const { mod, topics } = course;
  const { supabase } = await getSession();
  const index = topics.findIndex((t) => t.slug === topicSlug);
  if (index === -1) notFound();
  const topic = topics[index];
  const prev = topics[index - 1];
  const next = topics[index + 1];
  const { num, name } = chapterParts(topic.title);

  // Tabs: Videos first, then one tab per kind of file.
  const playable = topic.resources.filter(isPlayable);
  const fileGroups = new Map(bySection(topic.resources.filter((r) => !isPlayable(r))));
  for (const s of ALWAYS_FILES) if (!fileGroups.has(s)) fileGroups.set(s, []);

  const { data: quizRows } = await supabase
    .from("quiz_questions")
    .select("id,section,prompt,options,sort_order")
    .eq("topic_id", topic.id)
    .order("sort_order");
  const questions = (quizRows ?? []) as QuizQuestion[];

  const tabs: Tab[] = [
    { key: "videos", label: "Videos", items: playable, count: playable.length },
    ...[...fileGroups.entries()]
      .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
      .map(([label, items]) => ({ key: slugify(label), label, items, count: items.length })),
    ...(questions.length > 0
      ? [{ key: "quiz", label: "Quiz", items: [] as Resource[], count: questions.length }]
      : []),
  ];

  const wantedTab = first(sp.tab);
  const activeTab =
    tabs.find((t) => t.key === wantedTab) ?? tabs.find((t) => t.count > 0) ?? tabs[0];
  const wantedVideo = first(sp.v);

  const videos: PlayerVideo[] = [...playable]
    .sort((a, b) => rank(sectionOf(a)) - rank(sectionOf(b)))
    .flatMap((r) => {
      const e = toEmbed(r.video_url);
      return e
        ? [{ id: r.id, title: r.title, src: e.src, openUrl: e.openUrl, section: sectionOf(r), opened: opened.has(r.id) }]
        : [];
    });

  const fileCount = topic.resources.length - playable.length;
  const seen = topic.resources.filter((r) => opened.has(r.id)).length;
  const pct = topic.resources.length ? Math.round((seen / topic.resources.length) * 100) : 0;
  const here = `/course/${mod.slug}/${topic.slug}`;
  const back = topic.group_name
    ? `/course/${mod.slug}?group=${encodeURIComponent(topic.group_name)}`
    : `/course/${mod.slug}`;

  return (
    <>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-medium text-navy/60">
        <Link href="/course" className="hover:text-navy">
          My courses
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={back} className="hover:text-navy">
          {mod.title}
        </Link>
      </nav>

      <header className="night-grid mt-4 flex flex-wrap items-center gap-5 rounded-3xl bg-navy p-6 text-white sm:p-8">
        {num && (
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white/10 font-hand text-6xl font-bold text-gold" aria-hidden="true">
            {num}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{name}</h1>
          <p className="mt-1 text-sm text-white/65">
            {topic.group_name && topic.group_name !== topic.title ? `${topic.group_name}. ` : ""}
            {countLabel(playable.length, fileCount)}
          </p>
        </div>
        {topic.resources.length > 0 && (
          <div className="w-full sm:w-44">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-white/65">Chapter progress</span>
              <span className="font-display text-xl font-bold text-gold">{pct}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </header>

      <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-navy/15" aria-label="Chapter content">
        {tabs.map((t) => {
          const on = t.key === activeTab.key;
          return (
            <Link
              key={t.key}
              href={`${here}?tab=${t.key}`}
              scroll={false}
              aria-current={on ? "page" : undefined}
              className={`-mb-px flex min-h-12 shrink-0 items-center gap-2 border-b-4 px-4 py-3 text-sm font-semibold outline-offset-[-2px] focus-visible:outline-2 focus-visible:outline-gold ${
                on ? "border-gold text-navy" : "border-transparent text-navy/60 hover:text-navy"
              }`}
            >
              {t.label}
              <span className={`rounded-full px-2 py-0.5 text-xs ${on ? "bg-gold/30" : "bg-navy/10 text-navy/60"}`}>{t.count}</span>
            </Link>
          );
        })}
      </nav>

      <section className="mt-6" aria-label={activeTab.label}>
        {activeTab.key === "quiz" ? (
          <Quiz key={topic.id} questions={questions} />
        ) : activeTab.items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy/25 p-10 text-center">
            <p className="font-display text-lg font-semibold">{activeTab.label} for this chapter are coming soon.</p>
            <p className="mt-1 text-sm text-navy/60">We add new material here as soon as it is ready.</p>
          </div>
        ) : activeTab.key === "videos" ? (
          <VideoPlayer key={`${topic.id}:${wantedVideo ?? ""}`} videos={videos} initialId={wantedVideo} />
        ) : (
          <FileList
            key={`${topic.id}:${activeTab.key}`}
            items={activeTab.items.map((r) => ({ id: r.id, title: r.title, href: fileHref(r), opened: opened.has(r.id) }))}
          />
        )}
      </section>

      {(prev || next) && (
        <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Chapters">
          {prev ? (
            <Link href={`/course/${mod.slug}/${prev.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-navy/10 hover:ring-2 hover:ring-gold">
              <Icon name="arrow" className="h-5 w-5 shrink-0 rotate-180 text-navy/50 transition-transform group-hover:-translate-x-1" />
              <span className="min-w-0">
                <span className="block text-sm text-navy/60">Previous</span>
                <span className="block truncate font-semibold">{chapterParts(prev.title).name}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/course/${mod.slug}/${next.slug}`} className="group flex items-center justify-end gap-4 rounded-2xl bg-white p-4 text-right ring-1 ring-navy/10 hover:ring-2 hover:ring-gold">
              <span className="min-w-0">
                <span className="block text-sm text-navy/60">Next</span>
                <span className="block truncate font-semibold">{chapterParts(next.title).name}</span>
              </span>
              <Icon name="arrow" className="h-5 w-5 shrink-0 text-navy/50 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
