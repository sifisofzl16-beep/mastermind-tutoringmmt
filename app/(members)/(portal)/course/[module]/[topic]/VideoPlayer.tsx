"use client";

import { useState } from "react";

export type PlayerVideo = {
  id: string;
  title: string;
  src: string;
  openUrl: string;
  section: string;
};

export default function VideoPlayer({
  videos,
  initialId,
}: {
  videos: PlayerVideo[];
  initialId?: string;
}) {
  const start = videos.find((v) => v.id === initialId) ?? videos[0];
  const [activeId, setActiveId] = useState(start.id);
  const [playing, setPlaying] = useState(false);
  const active = videos.find((v) => v.id === activeId) ?? start;

  const sections: { name: string; items: PlayerVideo[] }[] = [];
  for (const v of videos) {
    const hit = sections.find((s) => s.name === v.section);
    if (hit) hit.items.push(v);
    else sections.push({ name: v.section, items: [v] });
  }

  function choose(id: string) {
    setActiveId(id);
    setPlaying(true);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-[#08121D]">
          {playing ? (
            <iframe
              key={active.id}
              src={active.src}
              title={active.title}
              allow="fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center text-white outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-[#F4A024]"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-[#F4A024] text-[#0D1B2A] transition group-hover:scale-105">
                <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-lg font-semibold">{active.title}</span>
              <span className="text-sm text-white/60">Select to play</span>
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">{active.title}</h2>
          <a
            href={active.openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4"
          >
            Open in new tab
          </a>
        </div>
      </div>

      <aside
        aria-label="Video list"
        className="max-h-[32rem] overflow-y-auto rounded-2xl bg-white p-3 ring-1 ring-[#0D1B2A]/10"
      >
        {sections.map((s) => (
          <div key={s.name} className="mb-3 last:mb-0">
            <h3 className="px-3 pb-1 pt-2 text-sm font-semibold text-[#0D1B2A]/60">{s.name}</h3>
            <ul>
              {s.items.map((v) => {
                const on = v.id === active.id;
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => choose(v.id)}
                      aria-current={on ? "true" : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm outline-offset-[-2px] focus-visible:outline-2 focus-visible:outline-[#F4A024] ${
                        on ? "bg-[#F4A024]/20 font-semibold" : "hover:bg-[#0D1B2A]/5"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 shrink-0 ${on ? "text-[#0D1B2A]" : "text-[#0D1B2A]/40"}`}
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>{v.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </aside>
    </div>
  );
}
