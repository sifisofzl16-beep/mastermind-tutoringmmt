export type CatalogueTopic = {
  title: string;
  group: string | null;
  videos: number;
  files: number;
  live: number;
  quiz: number;
};
export type CatalogueCourse = {
  slug: string;
  title: string;
  description: string | null;
  topics: CatalogueTopic[];
};

/**
 * The public syllabus: course and chapter names with counts, straight from the
 * student portal's database, refreshed hourly. Returns [] if it cannot be reached,
 * and the page falls back to copy that needs no numbers.
 */
export async function getCatalogue(): Promise<CatalogueCourse[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/rest/v1/rpc/course_catalogue`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: "{}",
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as CatalogueCourse[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function totals(courses: CatalogueCourse[]) {
  let videos = 0;
  let files = 0;
  let chapters = 0;
  for (const c of courses) {
    for (const t of c.topics) {
      videos += t.videos;
      files += t.files;
      chapters += 1;
    }
  }
  return { videos, files, chapters, courses: courses.length };
}
