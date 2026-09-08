"use client";

import Link from "next/link";
import { episodes } from "@/data/episodes";
import { useWatchProgress } from "@/hooks/useWatchProgress";
import { getPrimaryContinueItem } from "@/lib/watch-progress";

function PlayIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z" /></svg>;
}

export default function HeroPrimaryAction({ fallbackId }: { fallbackId: number }) {
  const history = useWatchProgress();
  const item = getPrimaryContinueItem(episodes, history);
  const target = item?.episode;
  const label = target
    ? `${item.kind === "resume" ? "Devam et" : "Sıradaki bölüm"} · S${target.season}:B${String(target.number).padStart(2, "0")}`
    : "1. bölümü aç";

  return <Link className="play-action" href={`/izle/${target?.id ?? fallbackId}`}><PlayIcon /> {label}</Link>;
}
