"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toEmbed } from "@/lib/video";

type TopicOption = { id: string; label: string };

const field =
  "w-full rounded-lg border border-[#0D1B2A]/20 bg-white px-3 py-2 text-sm outline-none focus:border-[#F4A024]";

export default function VideoForm({ topics }: { topics: TopicOption[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDone(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const topicId = String(data.get("topic_id") ?? "");
    const title = String(data.get("title") ?? "").trim();
    const link = String(data.get("link") ?? "").trim();

    if (!topicId || !title || !link) {
      setError("Choose a topic, add a title and paste the video link.");
      return;
    }
    const embed = toEmbed(link);
    if (!embed) {
      setError("That link is not a Google Drive or YouTube video link. Copy it again from the share button.");
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const { error: insertError } = await supabase.from("resources").insert({
      topic_id: topicId,
      kind: "video",
      title,
      video_url: embed.openUrl,
      sort_order: 0,
    });
    setBusy(false);

    if (insertError) {
      setError("Could not save the video. Try again.");
      return;
    }
    form.reset();
    setDone(`Added "${title}".`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor="v_topic" className="mb-1 block text-sm font-medium">Topic</label>
        <select id="v_topic" name="topic_id" required className={field}>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="v_title" className="mb-1 block text-sm font-medium">Title students will see</label>
        <input id="v_title" name="title" type="text" required className={field} placeholder="Chapter 28 Video 1" />
      </div>
      <div>
        <label htmlFor="v_link" className="mb-1 block text-sm font-medium">Google Drive or YouTube link</label>
        <input id="v_link" name="link" type="url" required className={field} placeholder="https://drive.google.com/file/d/..." />
        <p className="mt-1 text-xs text-[#0D1B2A]/60">
          In Drive, set the video to &quot;Anyone with the link&quot; first, otherwise students will see a
          permission error. Keep it unlisted on YouTube.
        </p>
      </div>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">{error}</p>}
      {done && <p className="rounded-lg bg-[#F4A024]/15 px-3 py-2 text-sm" role="status">{done}</p>}
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-[#0D1B2A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16293f] disabled:opacity-60"
      >
        {busy ? "Saving..." : "Add video"}
      </button>
    </form>
  );
}
