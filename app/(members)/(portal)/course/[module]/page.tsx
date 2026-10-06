import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession, todayISO } from "@/lib/session";
import { whatsappLink } from "@/lib/contact";
import { toEmbed } from "@/lib/video";

type Kind = "notes" | "practice" | "video" | "other";
type Resource = {
  id: string;
  kind: Kind;
  title: string;
  section: string | null;
  storage_path: string | null;
  video_url: string | null;
  sort_order: number;
  created_at: string;
};
type Topic = {
  id: string;
  slug: string;
  title: string;
  group_name: string | null;
  sort_order: number;
  resources: Resource[];
};

const SECTION_ORDER = [
  "Pre-recorded videos",
  "Live classes",
  "Study guide",
  "Problem set",
  "Tutorials",
  "Questions",
  "Test questions",
  "Other files",
];
const ALWAYS_VIDEO = "Pre-recorded videos";
const ALWAYS_FILES = ["Study guide", "Problem set"];

function sectionOf(r: Resource) {
  if (r.section) return r.section;
  if (r.kind === "video") return "Pre-recorded videos";
  if (r.kind === "notes") return "Study guide";
  if (r.kind === "practice") return "Problem set";
  return "Other files";
}
function rank(s: string) {
  const i = SECTION_ORDER.indexOf(s);
  return i === -1 ? 50 : i;
}
function bySection(items: Resource[]) {
  const map = new Map<string, Resource[]>();
  for (const r of items) {
    const s = sectionOf(r);
    map.set(s, [...(map.get(s) ?? []), r]);
  }
  return map;
}
function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

const card = "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#0D1B2A]/10";

export default async function ModulePage({
  params,
  searchParams,
}: {
  params: Promise<{ module: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { module: slug } = await params;
  const sp = await searchParams;
  const { supabase, user, profile } = await getSession();
  if (!user) return null;

  const { data: mod } = await supabase
    .from("modules")
    .select("id,slug,title,description,live_class_info")
    .eq("slug", slug)
    .maybeSingle();
  if (!mod) notFound();

  const isAdmin = !!profile?.is_admin;
  const { data: enrolment } = await supabase
    .from("enrolments")
    .select("paid_until")
    .eq("user_id", user.id)
    .eq("module_id", mod.id)
    .maybeSingle();

  const today = todayISO();
  const paidUntil = enrolment?.paid_until as string | undefined;
  const active = isAdmin || (!!paidUntil && paidUntil >= today);

  if (!active) {
    const expired = !!paidUntil;
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-[#0D1B2A]/10">
        <h1 className="text-2xl font-semibold">{mod.title}</h1>
        <p className="mt-3 text-[#0D1B2A]/70">
          {expired
            ? `Your access ended on ${formatDate(paidUntil!)}. Renew to open your notes again.`
            : "You are not enrolled in this course yet."}
        </p>
        <a
          href={whatsappLink(
            `Hi Mastermind Tutoring, I'd like to ${expired ? "renew" : "join"} the ${mod.title} Full Course.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-[#0D1B2A] px-5 py-2.5 font-semibold text-white hover:bg-[#16293f]"
        >
          {expired ? "Renew on WhatsApp" : "Enquire on WhatsApp"}
        </a>
        <div className="mt-4">
          <Link href="/course" className="text-sm underline underline-offset-4">
            Back to my courses
          </Link>
        </div>
      </div>
    );
  }

  const { data: topicRows } = await supabase
    .from("topics")
    .select(
      "id,slug,title,group_name,sort_order,resources(id,kind,title,section,storage_path,video_url,sort_order,created_at)",
    )
    .eq("module_id", mod.id)
    .order("sort_order");

  const topics = ((topicRows ?? []) as Topic[]).map((t) => ({
    ...t,
    resources: [...t.resources].sort(
      (a, b) => a.sort_order - b.sort_order || a.created_at.localeCompare(b.created_at),
    ),
  }));

  const daysLeft =
    paidUntil && !isAdmin
      ? Math.ceil(
          (new Date(paidUntil + "T00:00:00").getTime() -
            new Date(today + "T00:00:00").getTime()) /
            86400000,
        )
      : null;

  // Which chapter is open
  const wantedTopic = first(sp.topic);
  const wantedGroup = first(sp.group);
  const activeTopic =
    topics.find((t) => t.slug === wantedTopic) ??
    (wantedGroup ? topics.find((t) => t.group_name === wantedGroup) : undefined) ??
    topics[0];

  const groups = [...new Set(topics.map((t) => t.group_name).filter((g): g is string => !!g))];
  const activeGroup = activeTopic?.group_name ?? null;
  const chapterTabs = topics.filter((t) => (t.group_name ?? null) === activeGroup);

  const base = `/course/${mod.slug}`;
  const link = (topic: string, v?: string) =>
    `${base}?topic=${encodeURIComponent(topic)}${v ? `&v=${encodeURIComponent(v)}` : ""}`;

  // Split the open chapter into videos and files
  const resources = activeTopic?.resources ?? [];
  const videos = resources.filter((r) => r.kind === "video" && toEmbed(r.video_url));
  const files = resources.filter((r) => !(r.kind === "video" && toEmbed(r.video_url)));
  const wantedVideo = first(sp.v);
  const videoSections = bySection(videos);
  const orderedVideos = [...videoSections.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
    .flatMap(([, list]) => list);
  const selected = orderedVideos.find((r) => r.id === wantedVideo) ?? orderedVideos[0];
  const embed = selected ? toEmbed(selected.video_url) : null;

  if (!videoSections.has(ALWAYS_VIDEO)) videoSections.set(ALWAYS_VIDEO, []);
  const fileSections = bySection(files);
  for (const s of ALWAYS_FILES) if (!fileSections.has(s)) fileSections.set(s, []);
  const sortedVideoSections = [...videoSections.entries()].sort(
    (a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]),
  );
  const sortedFileSections = [...fileSections.entries()].sort(
    (a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]),
  );

  function fileHref(r: Resource) {
    if (r.storage_path) return `/api/files?path=${encodeURIComponent(r.storage_path)}`;
    return toEmbed(r.video_url)?.openUrl ?? null;
  }

  return (
    <>
      <Link href="/course" className="text-sm underline underline-offset-4">
        All courses
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">{mod.title}</h1>
      {mod.description && <p className="mt-2 text-[#0D1B2A]/70">{mod.description}</p>}

      {daysLeft !== null && daysLeft <= 7 && (
        <p className="mt-4 rounded-lg bg-[#F4A024]/15 px-4 py-3 text-sm">
          Your access ends in {daysLeft} {daysLeft === 1 ? "day" : "days"} (
          {formatDate(paidUntil!)}). Message Mastermind Tutoring on WhatsApp to renew.
        </p>
      )}

      {mod.live_class_info && (
        <section className="mt-6 rounded-2xl bg-[#0D1B2A] p-6 text-white">
          <h2 className="text-lg font-semibold text-[#F4A024]">Live class</h2>
          <p className="mt-2 whitespace-pre-line text-white/90">{mod.live_class_info}</p>
        </section>
      )}

      {topics.length === 0 || !activeTopic ? (
        <p className="mt-8 text-[#0D1B2A]/70">Content for this course is being added.</p>
      ) : (
        <>
          {groups.length > 0 && (
            <nav className="mt-8 flex gap-2 overflow-x-auto border-b border-[#0D1B2A]/15" aria-label="Sections">
              {groups.map((g) => {
                const firstTopic = topics.find((t) => t.group_name === g)!;
                const on = g === activeGroup;
                return (
                  <Link
                    key={g}
                    href={link(firstTopic.slug)}
                    scroll={false}
                    className={`-mb-px shrink-0 border-b-4 px-4 py-2 text-base font-semibold ${
                      on
                        ? "border-[#F4A024] text-[#0D1B2A]"
                        : "border-transparent text-[#0D1B2A]/60 hover:text-[#0D1B2A]"
                    }`}
                  >
                    {g}
                  </Link>
                );
              })}
            </nav>
          )}

          <nav
            className={`${groups.length > 0 ? "mt-4" : "mt-8"} flex gap-2 overflow-x-auto pb-1`}
            aria-label="Chapters"
          >
            {chapterTabs.map((t) => {
              const on = t.id === activeTopic.id;
              return (
                <Link
                  key={t.id}
                  href={link(t.slug)}
                  scroll={false}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                    on
                      ? "bg-[#0D1B2A] text-white"
                      : "bg-white text-[#0D1B2A] ring-1 ring-[#0D1B2A]/15 hover:ring-[#F4A024]"
                  }`}
                >
                  {t.title}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <section className={`${card} lg:col-span-2`}>
              {selected && embed ? (
                <>
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                    <iframe
                      key={selected.id}
                      src={embed.src}
                      title={selected.title}
                      loading="lazy"
                      allow="fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="h-full w-full border-0"
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold">{selected.title}</h2>
                    <a
                      href={embed.openUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline underline-offset-4"
                    >
                      Open in new tab
                    </a>
                  </div>
                </>
              ) : (
                <div className="grid aspect-video w-full place-items-center rounded-xl bg-[#0D1B2A]/5 text-sm text-[#0D1B2A]/60">
                  Videos for {activeTopic.title} are coming soon.
                </div>
              )}
            </section>

            <aside className={`${card} max-h-[34rem] overflow-y-auto`}>
              {sortedVideoSections.map(([name, list]) => (
                <div key={name} className="mb-4 last:mb-0">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0D1B2A]/60">
                    {name}
                  </h3>
                  {list.length === 0 ? (
                    <p className="mt-2 text-sm text-[#0D1B2A]/50">Coming soon.</p>
                  ) : (
                    <ul className="mt-2 space-y-1">
                      {list.map((r) => {
                        const on = r.id === selected?.id;
                        return (
                          <li key={r.id}>
                            <Link
                              href={link(activeTopic.slug, r.id)}
                              scroll={false}
                              className={`block rounded-lg px-3 py-2 text-sm ${
                                on
                                  ? "bg-[#F4A024]/20 font-semibold"
                                  : "hover:bg-[#0D1B2A]/5"
                              }`}
                            >
                              {r.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </aside>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {sortedFileSections.map(([name, list]) => (
              <section key={name} className={card}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0D1B2A]/60">
                  {name}
                </h3>
                {list.length === 0 ? (
                  <p className="mt-3 text-sm text-[#0D1B2A]/50">Coming soon.</p>
                ) : (
                  <ul className="mt-3 divide-y divide-[#0D1B2A]/10">
                    {list.map((r) => {
                      const href = fileHref(r);
                      return (
                        <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                          <span className="text-sm font-medium">{r.title}</span>
                          {href && (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 rounded-lg bg-[#F4A024] px-3 py-1.5 text-sm font-semibold text-[#0D1B2A] hover:brightness-95"
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
            ))}
          </div>
        </>
      )}
    </>
  );
}
