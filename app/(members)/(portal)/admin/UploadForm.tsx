"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type TopicOption = { id: string; label: string; folder: string };

const MAX_BYTES = 50 * 1024 * 1024;

function cleanName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

export default function UploadForm({ topics }: { topics: TopicOption[] }) {
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
    const kind = String(data.get("kind") ?? "notes");
    const title = String(data.get("title") ?? "").trim();
    const file = data.get("file");
    const topic = topics.find((t) => t.id === topicId);

    if (!topic || !title || !(file instanceof File) || file.size === 0) {
      setError("Choose a topic, add a title and pick a PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Only PDF files can be uploaded here.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That file is over 50 MB. Compress it and try again.");
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const path = `${topic.folder}/${Date.now()}-${cleanName(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from("course-files")
      .upload(path, file, { contentType: "application/pdf" });

    if (uploadError) {
      setBusy(false);
      setError("Upload failed. Check your connection and try again.");
      return;
    }

    const { error: insertError } = await supabase
      .from("resources")
      .insert({ topic_id: topic.id, kind, title, storage_path: path });

    if (insertError) {
      await supabase.storage.from("course-files").remove([path]);
      setBusy(false);
      setError("The file uploaded but could not be saved to the topic. Try again.");
      return;
    }

    form.reset();
    setBusy(false);
    setDone(`Added "${title}".`);
    router.refresh();
  }

  const field =
    "w-full rounded-lg border border-[#0D1B2A]/20 bg-white px-3 py-2 text-sm outline-none focus:border-[#F4A024]";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="topic_id" className="mb-1 block text-sm font-medium">Topic</label>
          <select id="topic_id" name="topic_id" required className={field}>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="kind" className="mb-1 block text-sm font-medium">Type</label>
          <select id="kind" name="kind" className={field} defaultValue="notes">
            <option value="notes">Study guide</option>
            <option value="practice">Practice questions</option>
            <option value="other">Other file</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">Title students will see</label>
        <input id="title" name="title" type="text" required className={field} placeholder="Chapter 28 Study Guide" />
      </div>
      <div>
        <label htmlFor="file" className="mb-1 block text-sm font-medium">PDF file (up to 50 MB)</label>
        <input id="file" name="file" type="file" accept="application/pdf" required className="block w-full text-sm" />
      </div>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">{error}</p>}
      {done && <p className="rounded-lg bg-[#F4A024]/15 px-3 py-2 text-sm" role="status">{done}</p>}
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-[#0D1B2A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16293f] disabled:opacity-60"
      >
        {busy ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
