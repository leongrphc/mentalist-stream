"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Episode } from "@/data/episodes";
import { readWatchProgress, resumeTime, saveWatchProgress } from "@/lib/watch-progress";

const CINESRC_ORIGIN = "https://cinesrc.st";
const MENTALIST_TMDB_ID = 5920;

const icons = {
  play: "m8 5 11 7-11 7Z",
  close: "M6 6l12 12M18 6 6 18",
};

function Icon({ name }: { name: keyof typeof icons }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d={icons[name]} /></svg>;
}

type CineSrcMessage = {
  type?: string;
  currentTime?: number;
  duration?: number;
  error?: unknown;
};

export default function VideoPlayer({ episode, nextEpisode }: { episode: Episode; nextEpisode?: Episode }) {
  const router = useRouter();
  const frame = useRef<HTMLIFrameElement>(null);
  const playback = useRef({ currentTime: 0, duration: 0, lastSavedAt: 0 });
  const restored = useRef(false);
  const resumeTarget = useRef(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [finished, setFinished] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [autoNextCanceled, setAutoNextCanceled] = useState(false);

  const embedUrl = `${CINESRC_ORIGIN}/embed/tv/${MENTALIST_TMDB_ID}?${new URLSearchParams({
    s: String(episode.season),
    e: String(episode.number),
    autoplay: "false",
    controls: "true",
    back: "close",
    autonext: "false",
    seek: "10",
    quality: "1080",
    color: "#e50914",
  }).toString()}`;

  const sendCommand = useCallback((command: string, args: unknown[] = []) => {
    frame.current?.contentWindow?.postMessage({ type: "cinesrc:command", command, args }, CINESRC_ORIGIN);
  }, []);

  const restoreSavedPosition = useCallback(() => {
    if (restored.current) return;
    const saved = readWatchProgress()[String(episode.id)];
    const position = resumeTime(saved);
    if (position <= 0) {
      restored.current = true;
      resumeTarget.current = 0;
      return;
    }
    resumeTarget.current = position;
    sendCommand("seek", [position]);
  }, [episode.id, sendCommand]);

  const persistProgress = useCallback((forceCompleted = false) => {
    const { currentTime, duration } = playback.current;
    if (currentTime <= 0 || duration <= 0) return;
    saveWatchProgress(episode.id, currentTime, duration, forceCompleted);
  }, [episode.id]);

  useEffect(() => {
    const iframe = frame.current;
    if (!iframe || !window.matchMedia("(pointer: fine)").matches) return;

    let wasAway = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.intersectionRatio < 0.15) {
        wasAway = true;
        return;
      }
      if (entry.intersectionRatio < 0.45 || !wasAway) return;

      const active = document.activeElement;
      if (!active || active === document.body || active === iframe) iframe.focus({ preventScroll: true });
      wasAway = false;
    }, { threshold: [0, 0.15, 0.45, 1] });

    observer.observe(iframe);
    return () => observer.disconnect();
  }, [retry]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== CINESRC_ORIGIN || event.source !== frame.current?.contentWindow) return;
      if (!event.data || typeof event.data !== "object") return;

      const data = event.data as CineSrcMessage;
      if (data.type === "cinesrc:ready") {
        setReady(true);
        setFailed(false);
        restoreSavedPosition();
      } else if (data.type === "cinesrc:loadedmetadata") {
        if (typeof data.duration === "number") playback.current.duration = data.duration;
        restoreSavedPosition();
      } else if (data.type === "cinesrc:timeupdate") {
        if (typeof data.currentTime === "number") playback.current.currentTime = data.currentTime;
        if (typeof data.duration === "number") playback.current.duration = data.duration;
        const { currentTime, duration, lastSavedAt } = playback.current;
        if (!restored.current && resumeTarget.current > 0 && Math.abs(currentTime - resumeTarget.current) <= 5) {
          restored.current = true;
          resumeTarget.current = 0;
          playback.current.lastSavedAt = currentTime;
        }
        if (restored.current && duration > 0 && currentTime > 0 && Math.abs(currentTime - lastSavedAt) >= 5) {
          playback.current.lastSavedAt = currentTime;
          saveWatchProgress(episode.id, currentTime, duration);
        }
      } else if (data.type === "cinesrc:seeked") {
        if (typeof data.currentTime === "number") playback.current.currentTime = data.currentTime;
        if (typeof data.duration === "number") playback.current.duration = data.duration;
        if (typeof data.currentTime === "number" && resumeTarget.current > 0 && Math.abs(data.currentTime - resumeTarget.current) <= 5) {
          restored.current = true;
          resumeTarget.current = 0;
          playback.current.lastSavedAt = data.currentTime;
        }
      } else if (data.type === "cinesrc:pause") {
        persistProgress();
      } else if (data.type === "cinesrc:ended") {
        persistProgress(true);
        setFinished(true);
        setCountdown(10);
        setAutoNextCanceled(false);
      } else if (data.type === "cinesrc:nextepisode") {
        persistProgress(true);
        if (nextEpisode) router.push(`/izle/${nextEpisode.id}`);
      } else if (data.type === "cinesrc:error") {
        setReady(false);
        setFailed(true);
      } else if (data.type === "cinesrc:close") {
        persistProgress();
        router.back();
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [episode.id, nextEpisode, persistProgress, restoreSavedPosition, router]);

  useEffect(() => {
    const flush = () => persistProgress();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") persistProgress();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [persistProgress]);

  useEffect(() => {
    if (!finished || !nextEpisode || autoNextCanceled) return;
    const timer = window.setInterval(() => setCountdown(value => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [autoNextCanceled, finished, nextEpisode]);

  useEffect(() => {
    if (finished && nextEpisode && !autoNextCanceled && countdown === 0) router.push(`/izle/${nextEpisode.id}`);
  }, [autoNextCanceled, countdown, finished, nextEpisode, router]);

  const retryPlayer = () => {
    restored.current = false;
    playback.current = { currentTime: 0, duration: 0, lastSavedAt: 0 };
    setReady(false);
    setFailed(false);
    setFinished(false);
    setRetry(value => value + 1);
  };

  return (
    <section className="cinema-player" aria-label={`${episode.name} video oynatıcısı`}>
      <iframe
        key={retry}
        ref={frame}
        className="cinema-video cinema-embed"
        src={embedUrl}
        title={`${episode.name} video`}
        allow="autoplay; fullscreen; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          setReady(true);
          window.setTimeout(restoreSavedPosition, 600);
          window.setTimeout(restoreSavedPosition, 1600);
        }}
      />

      {!ready && !failed && (
        <div className="cinema-loading" role="status">
          <span />
          Video hazırlanıyor…
        </div>
      )}

      {failed && (
        <div className="cinema-status" role="alert">
          <h2>Bölüm şu anda açılamıyor</h2>
          <p>Video sağlayıcısına ulaşılamadı. Biraz sonra yeniden deneyin.</p>
          <button type="button" onClick={retryPlayer}>Yeniden dene</button>
        </div>
      )}

      {finished && !failed && (
        <aside className="next-episode-overlay" aria-live="polite">
          <button className="next-overlay-close" type="button" aria-label="Sıradaki bölüm penceresini kapat" onClick={() => { setFinished(false); setAutoNextCanceled(true); }}><Icon name="close" /></button>
          {nextEpisode ? <>
            <span>Sıradaki bölüm</span>
            <strong>S{nextEpisode.season}:B{String(nextEpisode.number).padStart(2, "0")} · {nextEpisode.name}</strong>
            <p>{autoNextCanceled ? "Otomatik geçiş iptal edildi." : `${countdown} saniye sonra otomatik başlayacak.`}</p>
            <div>
              <button type="button" className="next-primary" onClick={() => router.push(`/izle/${nextEpisode.id}`)}><Icon name="play" /> Şimdi oynat</button>
              <button type="button" className="next-secondary" onClick={() => setAutoNextCanceled(true)}>İptal</button>
            </div>
          </> : <>
            <span>Dizi tamamlandı</span>
            <strong>The Mentalist’in son bölümünü bitirdin.</strong>
            <button type="button" className="next-primary" onClick={() => router.push("/sezonlar/7")}>Bölümlere dön</button>
          </>}
        </aside>
      )}
    </section>
  );
}
