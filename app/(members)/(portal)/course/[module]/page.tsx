import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession, todayISO } from "@/lib/session";
import { whatsappLink } from "@/lib/contact";

type Resource = {
  id: string;
  kind: "notes" | "practice" | "video" | "other";
  title: string;
  storage_path: string | null;
  video_url: string | null;
  sort_order: number;
};
type Topic = { id: string; title: string; sort_order: number; resources: Resource[] };

const KIND_LABEL: Record<Resource["kind"], string> = {
  notes: "Study guide",
  practice: "Practice questions",
  video: "Video",
  other: "File",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: slug } = await params;
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
            `Hi MMT, I'd like to ${expired ? "renew" : "join"} the ${mod.title} Full Course.`,
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
    .select("id,title,sort_order,resources(id,kind,title,storage_path,video_url,sort_order)")
    .eq("module_id", mod.id)
    .order("sort_order");

  const topics = ((topicRows ?? []) as Topic[]).map((t) => ({
    ...t,
    resources: [...t.resources].sort((a, b) => a.sort_order - b.sort_order),
  }));

  const daysLeft =
    paidUntil && !isAdmin
      ? Math.ceil(
          (new Date(paidUntil + "T00:00:00").getTime() -
            new Date(today + "T00:00:00").getTime()) /
            86400000,
        )
      : null;

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
          {formatDate(paidUntil!)}). Message MMT on WhatsApp to renew.
        </p>
      )}

      {mod.live_class_info && (
        <section className="mt-6 rounded-2xl bg-[#0D1B2A] p-6 text-white">
          <h2 className="text-lg font-semibold text-[#F4A024]">Live class</h2>
          <p className="mt-2 whitespace-pre-line text-white/90">{mod.live_class_info}</p>
        </section>
      )}

      <div className="mt-8 space-y-5">
        {topics.length === 0 && (
          <p className="text-[#0D1B2A]/70">Content for this course is being added.</p>
        )}
        {topics.map((t) => (
          <section
            key={t.id}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#0D1B2A]/10"
          >
            <h2 className="text-xl font-semibold">{t.title}</h2>
            {t.resources.length === 0 ? (
              <p className="mt-3 text-sm text-[#0D1B2A]/60">Files coming soon.</p>
            ) : (
              <ul className="mt-4 divide-y divide-[#0D1B2A]/10">
                {t.resources.map((r) => {
                  const href =
                    r.kind === "video" && r.video_url
                      ? r.video_url
                      : r.storage_path
                        ? `/api/files?path=${encodeURIComponent(r.storage_path)}`
                        : null;
                  return (
                    <li key={r.id} className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="font-medium">{r.title}</p>
                        <p className="text-xs uppercase tracking-wide text-[#0D1B2A]/50">
                          {KIND_LABEL[r.kind]}
                        </p>
                      </div>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-lg bg-[#F4A024] px-4 py-2 text-sm font-semibold text-[#0D1B2A] hover:brightness-95"
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
  );
}
