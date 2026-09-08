"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Episode } from "@/data/episodes";
import { useWatchProgress } from "@/hooks/useWatchProgress";
import { progressPercent } from "@/lib/watch-progress";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d={direction === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} /></svg>;
}

export default function EpisodeRail({ title, items }: { title: string; items: Episode[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const history = useWatchProgress();
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .82, behavior: "smooth" });

  return (
    <section className="catalog-row" aria-labelledby={`row-${items[0]?.season}`}>
      <div className="row-heading">
        <h2 id={`row-${items[0]?.season}`}>{title}</h2>
        <Link href={`/sezonlar/${items[0]?.season}`}>Tüm bölümler <span aria-hidden="true">›</span></Link>
      </div>
      <div className="rail-shell">
        <button className="rail-control rail-control-left" type="button" aria-label="Önceki bölümler" onClick={() => move(-1)}><Chevron direction="left" /></button>
        <div className="episode-rail" ref={rail}>
          {items.map((episode) => {
            const progress = history[String(episode.id)];
            const percent = progressPercent(progress);
            return (
              <Link className="netflix-card" href={`/izle/${episode.id}`} key={episode.id}>
                <div className="card-image">
                  {(episode.image ?? episode.imageMedium) ? <Image src={(episode.image ?? episode.imageMedium)!} quality={85} alt="" fill sizes="(max-width: 640px) 72vw, (max-width: 900px) 34vw, (max-width: 1200px) 264px, 22vw" /> : <span className="missing-art">S{episode.season} B{episode.number}</span>}
                  <span className="play-disc" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 7 8 5-8 5Z" /></svg></span>
                  <span className="episode-code">S{episode.season}:B{String(episode.number).padStart(2, "0")}</span>
                  {progress?.completed && <span className="watched-label">İzlendi</span>}
                  {percent > 0 && <span className="watch-progress" aria-label={progress?.completed ? "Bölüm izlendi" : `Yüzde ${Math.round(percent)} izlendi`}><span style={{ width: `${percent}%` }} /></span>}
                </div>
                <div className="card-copy"><strong>{episode.name}</strong><span>{progress?.completed ? "Tamamlandı" : `${episode.runtime ?? 43} dk`}</span></div>
              </Link>
            );
          })}
        </div>
        <button className="rail-control rail-control-right" type="button" aria-label="Sonraki bölümler" onClick={() => move(1)}><Chevron direction="right" /></button>
      </div>
    </section>
  );
}
