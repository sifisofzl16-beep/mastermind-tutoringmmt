import Link from "next/link";
import { notFound } from "next/navigation";
import LockedCourse from "../../../../_components/LockedCourse";
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
  rank,
  sectionOf,
  slugify,
  type Resource,
} from "@/lib/course";
import { toEmbed } from "@/lib/video";

type Tab = { key: string; label: string; items: Resource[] };

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ module: string; topic: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { module: slug, topic: topicSlug } = await params;
  const sp = await searchParams;
  const course = await loadCourse(slug);

  if (course.status === "locked") {
    return <LockedCourse mod={course.mod} expired={course.expired} paidUntil={course.paidUntil} />;
  }

  const { mod, topics } = course;
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

  const tabs: Tab[] = [
    { key: "videos", label: "Videos", items: playable },
    ...[...fileGroups.entries()]
      .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
      .map(([label, items]) => ({ key: slugify(label), label, items })),
  ];

  const wantedTab = first(sp.tab);
  const activeTab =
    tabs.find((t) => t.key === wantedTab) ?? tabs.find((t) => t.items.length > 0) ?? tabs[0];

  const videos: PlayerVideo[] = [...playable]
    .sort((a, b) => rank(sectionOf(a)) - rank(sectionOf(b)))
    .flatMap((r) => {
      const e = toEmbed(r.video_url);
      return e ? [{ id: r.id, title: r.title, src: e.src, openUrl: e.openUrl, section: sectionOf(r) }] : [];
    });

  const fileCount = topic.resources.length - playable.length;
  const here = `/course/${mod.slug}/${topic.slug}`;
  const back = topic.group_name
    ? `/course/${mod.slug}?group=${encodeURIComponent(topic.group_name)}`
    : `/course/${mod.slug}`;

  return (
    <>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#0D1B2A]/60">
        <Link href="/course" className="underline-offset-4 hover:underline">
          My courses
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={back} className="underline-offset-4 hover:underline">
          {mod.title}
        </Link>
      </nav>

      <header className="mt-3 flex items-center gap-5 rounded-3xl bg-[#0D1B2A] p-6 text-white sm:p-8">
        {num && (
          <span
            className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white/10 text-5xl text-[#F4A024]"
            style={{ fontFamily: "Caveat, cursive" }}
            aria-hidden="true"
          >
            {num}
          </span>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">{name}</h1>
          <p className="mt-1 text-sm text-white/65">
            {topic.group_name ? `${topic.group_name}. ` : ""}
            {countLabel(playable.length, fileCount)}
          </p>
        </div>
      </header>

      <nav
        className="mt-6 flex gap-1 overflow-x-auto border-b border-[#0D1B2A]/15"
        aria-label="Chapter content"
      >
        {tabs.map((t) => {
          const on = t.key === activeTab.key;
          return (
            <Link
              key={t.key}
              href={`${here}?tab=${t.key}`}
              scroll={false}
              aria-current={on ? "page" : undefined}
              className={`-mb-px flex shrink-0 items-center gap-2 border-b-4 px-4 py-3 text-sm font-semibold outline-offset-[-2px] focus-visible:outline-2 focus-visible:outline-[#F4A024] ${
                on
                  ? "border-[#F4A024] text-[#0D1B2A]"
                  : "border-transparent text-[#0D1B2A]/60 hover:text-[#0D1B2A]"
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  on ? "bg-[#F4A024]/25" : "bg-[#0D1B2A]/8 text-[#0D1B2A]/60"
                }`}
              >
                {t.items.length}
              </span>
            </Link>
          );
        })}
      </nav>

      <section className="mt-6" aria-label={activeTab.label}>
        {activeTab.items.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-[#0D1B2A]/10">
            <p className="font-semibold">{activeTab.label} for this chapter are coming soon.</p>
            <p className="mt-1 text-sm text-[#0D1B2A]/60">
              We add new material here as soon as it is ready.
            </p>
          </div>
        ) : activeTab.key === "videos" ? (
          <VideoPlayer videos={videos} initialId={first(sp.v)} />
        ) : (
          <ul className="divide-y divide-[#0D1B2A]/10 overflow-hidden rounded-2xl bg-white ring-1 ring-[#0D1B2A]/10">
            {activeTab.items.map((r) => {
              const href = fileHref(r);
              return (
                <li key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="flex min-w-0 items-center gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0 text-[#0D1B2A]/45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                      <path d="M14 3v5h5" />
                    </svg>
                    <span className="font-medium">{r.title}</span>
                  </span>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-xl bg-[#F4A024] px-4 py-2 text-sm font-semibold text-[#0D1B2A] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D1B2A]"
                    >
                      Open
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {(prev || next) && (
        <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Chapters">
          {prev ? (
            <Link
              href={`/course/${mod.slug}/${prev.slug}`}
              className="rounded-2xl bg-white p-4 ring-1 ring-[#0D1B2A]/10 hover:ring-2 hover:ring-[#F4A024]"
            >
              <span className="block text-sm text-[#0D1B2A]/60">Previous chapter</span>
              <span className="block font-semibold">{chapterParts(prev.title).name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/course/${mod.slug}/${next.slug}`}
              className="rounded-2xl bg-white p-4 text-right ring-1 ring-[#0D1B2A]/10 hover:ring-2 hover:ring-[#F4A024]"
            >
              <span className="block text-sm text-[#0D1B2A]/60">Next chapter</span>
              <span className="block font-semibold">{chapterParts(next.title).name}</span>
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
