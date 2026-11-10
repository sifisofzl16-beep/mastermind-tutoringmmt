"use client";

import { useState } from "react";
import type { CatalogueCourse } from "@/lib/catalogue";
import Icon from "./Icons";

function chapterParts(title: string) {
  const m = title.match(/^chapter\s+(\d+)\s*[:\-]?\s*(.*)$/i);
  if (!m) return { num: null as string | null, name: title };
  return { num: m[1], name: m[2].trim() || `Chapter ${m[1]}` };
}

export default function Syllabus({
  courses,
  joinLinks,
}: {
  courses: CatalogueCourse[];
  joinLinks: Record<string, string>;
}) {
  const semesters = [1, 2].filter((n) => courses.some((c) => c.semester === n));
  // Open on the semester that has material in it today.
  const firstWithContent = courses.find((c) => c.topics.length > 0) ?? courses[0];
  const [semester, setSemester] = useState<number | null>(firstWithContent?.semester ?? null);
  const inSemester = semesters.length > 1 ? courses.filter((c) => c.semester === semester) : courses;
  const [active, setActive] = useState(firstWithContent?.slug);
  const course = inSemester.find((c) => c.slug === active) ?? inSemester[0];
  if (!course) return null;

  const groups: { name: string | null; topics: CatalogueCourse["topics"] }[] = [];
  for (const t of course.topics) {
    const hit = groups.find((g) => g.name === t.group);
    if (hit) hit.topics.push(t);
    else groups.push({ name: t.group, topics: [t] });
  }
  const videos = course.topics.reduce((n, t) => n + t.videos, 0);
  const files = course.topics.reduce((n, t) => n + t.files, 0);

  return (
    <div>
      {semesters.length > 1 && (
        <div role="group" aria-label="Semester" className="mb-5 inline-flex rounded-full bg-white/[0.06] p-1 ring-1 ring-white/15">
          {semesters.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={semester === n}
              onClick={() => setSemester(n)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold outline-offset-2 focus-visible:outline-2 focus-visible:outline-gold ${
                semester === n ? "bg-white text-navy" : "text-white/75 hover:text-white"
              }`}
            >
              Semester {n}
            </button>
          ))}
        </div>
      )}
      <div role="tablist" aria-label="Courses" className="flex gap-2 overflow-x-auto pb-2">
        {inSemester.map((c) => {
          const on = c.slug === course.slug;
          return (
            <button
              key={c.slug}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(c.slug)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold outline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                on ? "bg-gold text-navy" : "bg-white/5 text-white/80 ring-1 ring-white/15 hover:bg-white/10"
              }`}
            >
              {c.title.replace(/^Integrated Science for Medical Students \(ISMS\).*$/, "ISMS")}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="mt-6 rounded-3xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{course.title}</h3>
            <p className="mt-2 text-white/65">
              {course.topics.length === 0
                ? (course.description ?? "")
                : `${course.topics.length} sections, ${videos} videos, ${files} notes and problem files`}
            </p>
          </div>
          {joinLinks[course.slug] && (
            <a
              href={joinLinks[course.slug]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-2"
            >
              Join this course <Icon name="arrow" className="h-4 w-4" />
            </a>
          )}
        </div>

        {course.topics.length === 0 && (
          <p className="mt-8 rounded-2xl border border-dashed border-white/25 p-6 text-white/75">
            We are loading this course for the first semester of 2027. Chapters will show here as they go into the
            portal. Message us and we will tell you the moment it opens.
          </p>
        )}
        <div className="mt-8 space-y-8">
          {groups.map((g) => (
            <div key={g.name ?? "all"}>
              {g.name && groups.length > 1 && (
                <h4 className="mb-3 font-hand text-2xl font-bold text-gold">{g.name}</h4>
              )}
              <ol className="grid gap-x-8 sm:grid-cols-2">
                {g.topics.map((t) => {
                  const { num, name } = chapterParts(t.title);
                  const bits: string[] = [];
                  if (t.videos) bits.push(`${t.videos} ${t.videos === 1 ? "video" : "videos"}`);
                  if (t.files) bits.push(`${t.files} ${t.files === 1 ? "file" : "files"}`);
                  if (t.quiz) bits.push("quiz");
                  return (
                    <li key={t.title + (t.group ?? "")} className="flex items-center gap-4 border-b border-white/10 py-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.07] font-hand text-xl font-bold text-gold">
                        {num ?? <Icon name="book" className="h-4 w-4" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium leading-snug">{name}</span>
                        <span className="block text-sm text-white/55">{bits.join(", ") || "Coming soon"}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
