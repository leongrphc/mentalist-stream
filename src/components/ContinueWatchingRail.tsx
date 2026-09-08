"use client";

import Image from "next/image";
import Link from "next/link";
import { episodes } from "@/data/episodes";
import { useWatchProgress } from "@/hooks/useWatchProgress";
import { getContinueWatchingItems, progressPercent } from "@/lib/watch-progress";

export default function ContinueWatchingRail() {
  const history = useWatchProgress();
  const items = getContinueWatchingItems(episodes, history);
  if (!items.length) return null;

  return (
    <section className="catalog-row continue-row" aria-labelledby="continue-watching-title">
      <div className="row-heading"><h2 id="continue-watching-title">İzlemeye devam et</h2></div>
      <div className="episode-rail continue-rail">
        {items.map(({ episode, progress, kind }) => {
          const percent = progressPercent(progress);
          const remaining = progress && progress.duration > progress.currentTime
            ? Math.max(1, Math.ceil((progress.duration - progress.currentTime) / 60))
            : 0;
          return (
            <Link className="netflix-card continue-card" href={`/izle/${episode.id}`} key={episode.id}>
              <div className="card-image">
                {(episode.image ?? episode.imageMedium) ? <Image src={(episode.image ?? episode.imageMedium)!} quality={85} alt="" fill sizes="(max-width: 640px) 72vw, (max-width: 900px) 34vw, (max-width: 1200px) 264px, 22vw" /> : <span className="missing-art">S{episode.season} B{episode.number}</span>}
                <span className="play-disc" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 7 8 5-8 5Z" /></svg></span>
                <span className="episode-code">S{episode.season}:B{String(episode.number).padStart(2, "0")}</span>
                {kind === "resume" && percent > 0 && <span className="watch-progress" aria-label={`Yüzde ${Math.round(percent)} izlendi`}><span style={{ width: `${percent}%` }} /></span>}
              </div>
              <div className="card-copy continue-copy"><strong>{episode.name}</strong><span>{kind === "next" ? "Sıradaki" : remaining > 0 ? `${remaining} dk kaldı` : `%${Math.round(percent)}`}</span></div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
