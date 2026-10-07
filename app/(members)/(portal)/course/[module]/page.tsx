import Link from "next/link";
import LockedCourse from "../../../_components/LockedCourse";
import {
  chapterParts,
  countLabel,
  first,
  formatDate,
  isPlayable,
  loadCourse,
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
  const course = await loadCourse(slug);

  if (course.status === "locked") {
    return <LockedCourse mod={course.mod} expired={course.expired} paidUntil={course.paidUntil} />;
  }

  const { mod, topics, paidUntil, isAdmin, daysLeft } = course;
  const groups = [...new Set(topics.map((t) => t.group_name).filter((g): g is string => !!g))];
  const wantedGroup = first(sp.group);
  const activeGroup = groups.includes(wantedGroup ?? "") ? wantedGroup! : (groups[0] ?? null);
  const shown = groups.length > 0 ? topics.filter((t) => t.group_name === activeGroup) : topics;

  const totalVideos = topics.reduce((n, t) => n + t.resources.filter(isPlayable).length, 0);
  const totalFiles = topics.reduce(
    (n, t) => n + t.resources.filter((r) => !isPlayable(r)).length,
    0,
  );

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-[#0D1B2A]/60">
        <Link href="/course" className="underline-offset-4 hover:underline">
          My courses
        </Link>
      </nav>

      <header className="mt-3 overflow-hidden rounded-3xl bg-[#0D1B2A] p-7 text-white sm:p-10">
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{mod.title}</h1>
        {mod.description && (
          <p className="mt-3 max-w-xl text-white/75">{mod.description}</p>
        )}
        <p className="mt-6 text-sm text-white/60">
          {topics.length} {topics.length === 1 ? "chapter" : "chapters"}, {totalVideos}{" "}
          {totalVideos === 1 ? "video" : "videos"}, {totalFiles} {totalFiles === 1 ? "file" : "files"}
          {!isAdmin && paidUntil ? `. Access until ${formatDate(paidUntil)}` : ""}
        </p>
      </header>

      {daysLeft !== null && daysLeft <= 7 && (
        <p className="mt-4 rounded-xl bg-[#F4A024]/15 px-4 py-3 text-sm">
          Your access ends in {daysLeft} {daysLeft === 1 ? "day" : "days"} (
          {formatDate(paidUntil!)}). Message Mastermind Tutoring on WhatsApp to renew.
        </p>
      )}

      {mod.live_class_info && (
        <section className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-[#0D1B2A]/10">
          <h2 className="text-lg font-semibold">Live class</h2>
          <p className="mt-2 whitespace-pre-line text-[#0D1B2A]/80">{mod.live_class_info}</p>
        </section>
      )}

      {topics.length === 0 ? (
        <p className="mt-10 text-[#0D1B2A]/70">Content for this course is being added.</p>
      ) : (
        <>
          {groups.length > 0 && (
            <nav className="mt-10 flex gap-2 overflow-x-auto pb-1" aria-label="Course sections">
              {groups.map((g) => {
                const on = g === activeGroup;
                return (
                  <Link
                    key={g}
                    href={`/course/${mod.slug}?group=${encodeURIComponent(g)}`}
                    scroll={false}
                    aria-current={on ? "page" : undefined}
                    className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#F4A024] ${
                      on
                        ? "bg-[#0D1B2A] text-white"
                        : "bg-white text-[#0D1B2A] ring-1 ring-[#0D1B2A]/15 hover:ring-[#F4A024]"
                    }`}
                  >
                    {g}
                  </Link>
                );
              })}
            </nav>
          )}

          <h2 className={`${groups.length > 0 ? "mt-6" : "mt-10"} text-xl font-semibold`}>
            {activeGroup ?? "Chapters"}
          </h2>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((t) => {
              const videos = t.resources.filter(isPlayable).length;
              const files = t.resources.length - videos;
              const { num, name } = chapterParts(t.title);
              const empty = videos === 0 && files === 0;
              return (
                <li key={t.id}>
                  <Link
                    href={`/course/${mod.slug}/${t.slug}`}
                    className="group flex h-full items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-[#0D1B2A]/10 transition hover:ring-2 hover:ring-[#F4A024] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A024]"
                  >
                    <span
                      className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#0D1B2A] text-3xl text-[#F4A024]"
                      style={{ fontFamily: "Caveat, cursive" }}
                      aria-hidden="true"
                    >
                      {num ?? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z" />
                          <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z" />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug">{name}</span>
                      <span
                        className={`mt-1 block text-sm ${empty ? "text-[#0D1B2A]/45" : "text-[#0D1B2A]/65"}`}
                      >
                        {countLabel(videos, files)}
                      </span>
                    </span>
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
