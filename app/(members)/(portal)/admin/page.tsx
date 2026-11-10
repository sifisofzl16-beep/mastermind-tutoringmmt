import { notFound } from "next/navigation";
import { getSession, todayISO } from "@/lib/session";
import { addTopic, deleteResource, enrol, saveLiveClass, unenrol } from "./actions";
import UploadForm from "./UploadForm";
import VideoForm from "./VideoForm";

type Module = { id: string; slug: string; title: string; live_class_info: string | null };
type Resource = { id: string; kind: string; title: string; storage_path: string | null };
type Topic = {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  sort_order: number;
  resources: Resource[];
};
type Student = { id: string; email: string; full_name: string | null; created_at: string };
type Progress = { user_id: string; resource_id: string; last_opened_at: string; opens: number };
type Enrolment = { id: string; user_id: string; module_id: string; paid_until: string };

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function plusDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysAgoISO(days: number) {
  return new Date(Date.now() - days * 86400000).toISOString();
}

const card = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#0D1B2A]/10";
const field =
  "rounded-lg border border-[#0D1B2A]/20 bg-white px-3 py-2 text-sm outline-none focus:border-[#F4A024]";
const smallBtn =
  "rounded-lg bg-[#0D1B2A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#16293f]";

export default async function AdminPage() {
  const { supabase, user, profile } = await getSession();
  if (!user || !profile?.is_admin) notFound();

  const [modulesRes, topicsRes, studentsRes, enrolmentsRes, progressRes] = await Promise.all([
    supabase.from("modules").select("id,slug,title,live_class_info").order("sort_order"),
    supabase
      .from("topics")
      .select("id,module_id,slug,title,sort_order,resources(id,kind,title,storage_path)")
      .order("sort_order"),
    supabase
      .from("profiles")
      .select("id,email,full_name,created_at")
      .order("created_at", { ascending: false }),
    supabase.from("enrolments").select("id,user_id,module_id,paid_until"),
    supabase.from("resource_progress").select("user_id,resource_id,last_opened_at,opens"),
  ]);

  const modules = (modulesRes.data ?? []) as Module[];
  const topics = (topicsRes.data ?? []) as Topic[];
  const students = (studentsRes.data ?? []) as Student[];
  const enrolments = (enrolmentsRes.data ?? []) as Enrolment[];

  // Activity: who is using the portal and what they open most.
  const progress = (progressRes.data ?? []) as Progress[];
  const weekAgo = daysAgoISO(7);
  const activeThisWeek = new Set(progress.filter((p) => p.last_opened_at >= weekAgo).map((p) => p.user_id));
  const everActive = new Set(progress.map((p) => p.user_id));
  const opensByResource = new Map<string, { opens: number; students: number }>();
  for (const p of progress) {
    const row = opensByResource.get(p.resource_id) ?? { opens: 0, students: 0 };
    row.opens += p.opens;
    row.students += 1;
    opensByResource.set(p.resource_id, row);
  }
  const titleByResource = new Map<string, string>();
  for (const t of topics) for (const r of t.resources) titleByResource.set(r.id, `${r.title} (${t.title})`);
  const topResources = [...opensByResource.entries()].sort((a, b) => b[1].students - a[1].students || b[1].opens - a[1].opens).slice(0, 8);
  const lastSeen = new Map<string, string>();
  for (const p of progress) {
    if ((lastSeen.get(p.user_id) ?? "") < p.last_opened_at) lastSeen.set(p.user_id, p.last_opened_at);
  }

  const today = todayISO();
  const defaultDate = plusDays(31);
  const moduleById = new Map(modules.map((m) => [m.id, m]));

  const uploadTopics = topics.map((t) => {
    const m = moduleById.get(t.module_id);
    return {
      id: t.id,
      label: `${m?.title ?? "Module"}: ${t.title}`,
      folder: `${m?.slug ?? "module"}/${t.slug}`,
    };
  });

  return (
    <div className="space-y-10">
      <h1 className="font-display text-4xl font-bold tracking-tight">Admin</h1>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Activity</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className={card}>
            <p className="font-display text-4xl font-bold">{activeThisWeek.size}</p>
            <p className="mt-1 text-sm text-[#0D1B2A]/65">students opened something in the last 7 days</p>
          </div>
          <div className={card}>
            <p className="font-display text-4xl font-bold">{everActive.size}</p>
            <p className="mt-1 text-sm text-[#0D1B2A]/65">of {students.length} accounts have opened at least one item</p>
          </div>
          <div className={card}>
            <p className="font-display text-4xl font-bold">{progress.reduce((n, p) => n + p.opens, 0)}</p>
            <p className="mt-1 text-sm text-[#0D1B2A]/65">videos and files opened in total</p>
          </div>
        </div>
        <div className={`${card} mt-4`}>
          <h3 className="font-semibold">Most opened</h3>
          {topResources.length === 0 ? (
            <p className="mt-2 text-sm text-[#0D1B2A]/65">
              Nothing yet. Tracking started when this version of the portal went live, so numbers build from there.
            </p>
          ) : (
            <ol className="mt-3 divide-y divide-[#0D1B2A]/10 text-sm">
              {topResources.map(([id, row]) => (
                <li key={id} className="flex items-center justify-between gap-4 py-2">
                  <span>{titleByResource.get(id) ?? "Removed item"}</span>
                  <span className="shrink-0 text-[#0D1B2A]/65">
                    {row.students} {row.students === 1 ? "student" : "students"}, {row.opens} opens
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Students ({students.length})</h2>
        <div className="space-y-4">
          {students.length === 0 && (
            <p className="text-[#0D1B2A]/70">No students have signed up yet.</p>
          )}
          {students.map((s) => {
            const mine = enrolments.filter((e) => e.user_id === s.id);
            return (
              <div key={s.id} className={card}>
                <p className="font-semibold">{s.full_name || "No name"}</p>
                <p className="text-sm text-[#0D1B2A]/60">{s.email}</p>
                <p className="mt-1 text-xs text-[#0D1B2A]/55">
                  {lastSeen.has(s.id) ? `Last active ${formatDate(lastSeen.get(s.id)!.slice(0, 10))}` : "Has not opened anything yet"}
                </p>

                {mine.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {mine.map((e) => {
                      const active = e.paid_until >= today;
                      return (
                        <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                          <span>
                            {moduleById.get(e.module_id)?.title}{" "}
                            <span className={active ? "font-semibold text-[#7a4b00]" : "font-semibold text-red-700"}>
                              {active ? "active" : "expired"}
                            </span>{" "}
                            until {formatDate(e.paid_until)}
                          </span>
                          <form action={unenrol}>
                            <input type="hidden" name="id" value={e.id} />
                            <button type="submit" className="text-red-700 underline underline-offset-4">
                              Remove
                            </button>
                          </form>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <form action={enrol} className="mt-4 flex flex-wrap items-end gap-3">
                  <input type="hidden" name="user_id" value={s.id} />
                  <div>
                    <label className="mb-1 block text-xs font-medium">Module</label>
                    <select name="module_id" className={field} required>
                      {modules.map((m) => (
                        <option key={m.id} value={m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Paid until</label>
                    <input type="date" name="paid_until" defaultValue={defaultDate} required className={field} />
                  </div>
                  <button type="submit" className={smallBtn}>Enrol or update</button>
                </form>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Upload a file</h2>
        <div className={card}>
          {uploadTopics.length > 0 ? (
            <UploadForm topics={uploadTopics} />
          ) : (
            <p className="text-sm text-[#0D1B2A]/70">Add a topic first.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Add a video link</h2>
        <div className={card}>
          {uploadTopics.length > 0 ? (
            <VideoForm topics={uploadTopics.map(({ id, label }) => ({ id, label }))} />
          ) : (
            <p className="text-sm text-[#0D1B2A]/70">Add a topic first.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Content</h2>
        <div className="space-y-6">
          {modules.map((m) => {
            const mt = topics.filter((t) => t.module_id === m.id);
            return (
              <details key={m.id} className={card}>
                <summary className="flex items-center justify-between gap-3 text-lg font-semibold">
                  {m.title}
                  <span className="text-sm font-normal text-[#0D1B2A]/60">
                    {mt.length} topics, {mt.reduce((n, t) => n + t.resources.length, 0)} items. Select to open.
                  </span>
                </summary>

                <form action={saveLiveClass} className="mt-4">
                  <input type="hidden" name="module_id" value={m.id} />
                  <label className="mb-1 block text-sm font-medium">
                    Live class details students will see (day, time, link)
                  </label>
                  <textarea
                    name="live_class_info"
                    rows={3}
                    defaultValue={m.live_class_info ?? ""}
                    className={`${field} w-full`}
                    placeholder={"Thursdays 18:00 on Google Meet\nLink: ..."}
                  />
                  <button type="submit" className={`${smallBtn} mt-2`}>Save live class</button>
                </form>

                <div className="mt-6 space-y-4">
                  {mt.map((t) => (
                    <div key={t.id} className="rounded-xl bg-[#F7F4EC] p-4">
                      <p className="font-semibold">{t.title}</p>
                      {t.resources.length === 0 ? (
                        <p className="mt-1 text-sm text-[#0D1B2A]/60">No files yet.</p>
                      ) : (
                        <ul className="mt-2 space-y-1">
                          {t.resources.map((r) => (
                            <li key={r.id} className="flex items-center justify-between gap-3 text-sm">
                              <span>{r.title} <span className="text-[#0D1B2A]/50">({r.kind})</span></span>
                              <form action={deleteResource}>
                                <input type="hidden" name="id" value={r.id} />
                                <input type="hidden" name="storage_path" value={r.storage_path ?? ""} />
                                <button type="submit" className="text-red-700 underline underline-offset-4">
                                  Delete
                                </button>
                              </form>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                <form action={addTopic} className="mt-5 flex flex-wrap items-end gap-3">
                  <input type="hidden" name="module_id" value={m.id} />
                  <div>
                    <label className="mb-1 block text-xs font-medium">New topic title</label>
                    <input name="title" required className={field} placeholder="Chapter 29" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Order</label>
                    <input name="sort_order" type="number" defaultValue={mt.length + 1} className={`${field} w-24`} />
                  </div>
                  <button type="submit" className={smallBtn}>Add topic</button>
                </form>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
