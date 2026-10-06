import { cache } from "react";
import { notFound } from "next/navigation";
import { getSession, todayISO } from "@/lib/session";
import { toEmbed } from "@/lib/video";

export type Kind = "notes" | "practice" | "video" | "other";
export type Resource = {
  id: string;
  kind: Kind;
  title: string;
  section: string | null;
  storage_path: string | null;
  video_url: string | null;
  sort_order: number;
  created_at: string;
};
export type Topic = {
  id: string;
  slug: string;
  title: string;
  group_name: string | null;
  sort_order: number;
  resources: Resource[];
};
export type CourseModule = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  live_class_info: string | null;
};

export const SECTION_ORDER = [
  "Pre-recorded videos",
  "Live classes",
  "Study guide",
  "Problem set",
  "Tutorials",
  "Questions",
  "Test questions",
  "Other files",
];
// File tabs every chapter shows, even before anything is uploaded.
export const ALWAYS_FILES = ["Study guide", "Problem set"];

export function sectionOf(r: Resource) {
  if (r.section) return r.section;
  if (r.kind === "video") return "Pre-recorded videos";
  if (r.kind === "notes") return "Study guide";
  if (r.kind === "practice") return "Problem set";
  return "Other files";
}

export function rank(s: string) {
  const i = SECTION_ORDER.indexOf(s);
  return i === -1 ? 50 : i;
}

export function bySection(items: Resource[]) {
  const map = new Map<string, Resource[]>();
  for (const r of items) {
    const s = sectionOf(r);
    map.set(s, [...(map.get(s) ?? []), r]);
  }
  return [...map.entries()].sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]));
}

export function isPlayable(r: Resource) {
  return r.kind === "video" && !!toEmbed(r.video_url);
}

export function fileHref(r: Resource) {
  if (r.storage_path) return `/api/files?path=${encodeURIComponent(r.storage_path)}`;
  return toEmbed(r.video_url)?.openUrl ?? null;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

/** "Chapter 28: Sources of magnetic fields" becomes { num: "28", name: "Sources of magnetic fields" }. */
export function chapterParts(title: string): { num: string | null; name: string } {
  const m = title.match(/^chapter\s+(\d+)\s*[:\-]?\s*(.*)$/i);
  if (!m) return { num: null, name: title };
  return { num: m[1], name: m[2].trim() || `Chapter ${m[1]}` };
}

export function countLabel(videos: number, files: number) {
  if (videos === 0 && files === 0) return "Coming soon";
  const parts: string[] = [];
  if (videos > 0) parts.push(`${videos} ${videos === 1 ? "video" : "videos"}`);
  if (files > 0) parts.push(`${files} ${files === 1 ? "file" : "files"}`);
  return parts.join(", ");
}

export type CourseState =
  | { status: "locked"; mod: CourseModule; expired: boolean; paidUntil?: string }
  | {
      status: "ok";
      mod: CourseModule;
      topics: Topic[];
      paidUntil?: string;
      isAdmin: boolean;
      daysLeft: number | null;
    };

/** Loads a course and checks the signed-in student's access. One lookup per request. */
export const loadCourse = cache(async (slug: string): Promise<CourseState> => {
  const { supabase, user, profile } = await getSession();
  if (!user) notFound();

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
    return { status: "locked", mod: mod as CourseModule, expired: !!paidUntil, paidUntil };
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

  return { status: "ok", mod: mod as CourseModule, topics, paidUntil, isAdmin, daysLeft };
});
