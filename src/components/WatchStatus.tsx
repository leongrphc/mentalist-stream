"use client";

import { useWatchProgress } from "@/hooks/useWatchProgress";
import { progressPercent } from "@/lib/watch-progress";

export default function WatchStatus({ episodeId }: { episodeId: number }) {
  const history = useWatchProgress();
  const progress = history[String(episodeId)];

  if (!progress) return <p className="watch-save-note">İzleme ilerlemen bu cihazda otomatik kaydedilir.</p>;
  if (progress.completed) return <p className="watch-save-note watch-complete">Bu bölümü tamamladın.</p>;

  const percent = progressPercent(progress);
  if (percent <= 0) return <p className="watch-save-note">İzleme ilerlemen bu cihazda otomatik kaydedilir.</p>;
  return <p className="watch-save-note">%{Math.round(percent)} izlendi · kaldığın yer kaydedildi.</p>;
}
