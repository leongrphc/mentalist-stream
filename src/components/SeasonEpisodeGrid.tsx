"use client";

import Image from "next/image";
import Link from "next/link";
import type { Episode } from "@/data/episodes";
import { useWatchProgress } from "@/hooks/useWatchProgress";
import { progressPercent } from "@/lib/watch-progress";

export default function SeasonEpisodeGrid({ items, season }: { items: Episode[]; season: number }) {
  const history = useWatchProgress();

  return (
    <div className="episode-grid">
      {items.map((episode) => {
        const progress = history[String(episode.id)];
        const percent = progressPercent(progress);
        return (
          <Link className="grid-episode" href={`/izle/${episode.id}`} key={episode.id}>
            <div>
              {(episode.image ?? episode.imageMedium) ? <Image src={(episode.image ?? episode.imageMedium)!} quality={85} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 900px) 46vw, 31vw" /> : <span className="missing-art">S{episode.season}<b>B{String(episode.number).padStart(2,"0")}</b></span>}
              <span className="grid-play"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z" /></svg></span>
              {progress?.completed && <span className="watched-label">İzlendi</span>}
              {percent > 0 && <span className="watch-progress" aria-label={progress?.completed ? "Bölüm izlendi" : `Yüzde ${Math.round(percent)} izlendi`}><span style={{ width: `${percent}%` }} /></span>}
            </div>
            <span>S{season}:B{String(episode.number).padStart(2,"0")}{progress && !progress.completed && percent > 0 ? ` · %${Math.round(percent)}` : ""}</span>
            <h2>{episode.name}</h2>
            <p>{episode.summary || "Bölüm özeti bulunmuyor."}</p>
          </Link>
        );
      })}
    </div>
  );
}
