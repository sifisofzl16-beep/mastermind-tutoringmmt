"use client";

import { useState } from "react";
import Icon from "../../../../../_site/Icons";
import { markOpened } from "../../progress";

export type PlayerVideo = {
  id: string;
  title: string;
  src: string;
  openUrl: string;
  section: string;
  opened: boolean;
};

export default function VideoPlayer({
  videos,
  initialId,
}: {
  videos: PlayerVideo[];
  initialId?: string;
}) {
  const start = videos.find((v) => v.id === initialId) ?? videos.find((v) => !v.opened) ?? videos[0];
  const [activeId, setActiveId] = useState(start.id);
  const [playing, setPlaying] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(() => new Set(videos.filter((v) => v.opened).map((v) => v.id)));
  const index = Math.max(0, videos.findIndex((v) => v.id === activeId));
  const active = videos[index];
  const next = videos[index + 1];

  const sections: { name: string; items: PlayerVideo[] }[] = [];
  for (const v of videos) {
    const hit = sections.find((s) => s.name === v.section);
    if (hit) hit.items.push(v);
    else sections.push({ name: v.section, items: [v] });
  }

  function play(id: string) {
    setActiveId(id);
    setPlaying(true);
    setSeen((s) => new Set(s).add(id));
    void markOpened(id);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-night shadow-[0_20px_40px_-24px_rgb(13_27_42/0.6)]">
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
              onClick={() => play(active.id)}
              className="night-grid group flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center text-white outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-gold text-navy transition-transform group-hover:scale-110">
                <Icon name="play" className="ml-1 h-10 w-10" />
              </span>
              <span className="max-w-md font-display text-xl font-semibold leading-snug">{active.title}</span>
              <span className="text-sm text-white/60">
                Video {index + 1} of {videos.length}. Select to play.
              </span>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold leading-snug">{active.title}</h2>
            <p className="mt-0.5 text-sm text-navy/60">{active.section}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={active.openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-navy/20 hover:ring-navy"
            >
              Open in new tab <Icon name="external" className="h-4 w-4" />
            </a>
            {next && (
              <button
                type="button"
                onClick={() => play(next.id)}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-3"
              >
                Next video <Icon name="arrow" className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <p className="mt-3 text-sm text-navy/55">
          If the video asks you to sign in, use the Google account you gave Mastermind Tutoring when you joined.
        </p>
      </div>

      <aside aria-label="Video list" className="max-h-[34rem] overflow-y-auto rounded-2xl bg-white p-2.5 ring-1 ring-navy/10">
        {sections.map((s) => (
          <div key={s.name} className="mb-2 last:mb-0">
            <h3 className="px-3 pb-1 pt-2.5 text-xs font-semibold uppercase tracking-wider text-navy/55">{s.name}</h3>
            <ol>
              {s.items.map((v) => {
                const on = v.id === active.id;
                const done = seen.has(v.id);
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => play(v.id)}
                      aria-current={on ? "true" : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm outline-offset-[-2px] focus-visible:outline-2 focus-visible:outline-gold ${
                        on ? "bg-navy font-semibold text-white" : "hover:bg-navy/5"
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                          done ? "bg-gold text-navy" : on ? "bg-white/15 text-white" : "bg-cream text-navy/50"
                        }`}
                      >
                        <Icon name={done ? "check" : "play"} className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="min-w-0 flex-1 leading-snug">{v.title}</span>
                      {done && <span className="sr-only">Watched</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </aside>
    </div>
  );
}
