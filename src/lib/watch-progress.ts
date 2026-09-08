import type { Episode } from "@/data/episodes";

export const WATCH_PROGRESS_KEY = "mentalist.watch-progress.v1";
export const WATCH_PROGRESS_EVENT = "mentalist:watch-progress";

export type EpisodeWatchProgress = {
  currentTime: number;
  duration: number;
  completed: boolean;
  lastWatchedAt: number;
};

export type WatchProgressMap = Record<string, EpisodeWatchProgress>;

function validNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function normalize(value: unknown): WatchProgressMap {
  if (!value || typeof value !== "object") return {};
  const result: WatchProgressMap = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Partial<EpisodeWatchProgress>;
    if (!validNumber(item.currentTime) || !validNumber(item.duration) || !validNumber(item.lastWatchedAt)) continue;
    result[key] = {
      currentTime: item.currentTime!,
      duration: item.duration!,
      completed: Boolean(item.completed),
      lastWatchedAt: item.lastWatchedAt!,
    };
  }
  return result;
}

export function readWatchProgress(): WatchProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return normalize(JSON.parse(window.localStorage.getItem(WATCH_PROGRESS_KEY) ?? "{}"));
  } catch {
    return {};
  }
}

export function isEpisodeComplete(currentTime: number, duration: number) {
  if (duration <= 0) return false;
  const remaining = Math.max(0, duration - currentTime);
  return currentTime / duration >= 0.95 || remaining <= 90;
}

export function saveWatchProgress(
  episodeId: number,
  currentTime: number,
  duration: number,
  forceCompleted = false,
) {
  if (typeof window === "undefined" || currentTime < 0 || duration < 0) return;
  const history = readWatchProgress();
  const completed = forceCompleted || isEpisodeComplete(currentTime, duration);
  history[String(episodeId)] = {
    currentTime: completed && duration > 0 ? duration : currentTime,
    duration,
    completed,
    lastWatchedAt: Date.now(),
  };
  window.localStorage.setItem(WATCH_PROGRESS_KEY, JSON.stringify(history));
  window.dispatchEvent(new CustomEvent(WATCH_PROGRESS_EVENT, { detail: { episodeId } }));
}

export function progressPercent(progress?: EpisodeWatchProgress) {
  if (!progress) return 0;
  if (progress.completed) return 100;
  if (progress.duration <= 0) return 0;
  return Math.max(0, Math.min(100, (progress.currentTime / progress.duration) * 100));
}

export function resumeTime(progress?: EpisodeWatchProgress) {
  if (!progress || progress.completed || progress.currentTime < 20) return 0;
  if (progress.duration > 0 && progress.duration - progress.currentTime <= 90) return 0;
  return Math.max(0, progress.currentTime - 5);
}


export type ContinueWatchingItem = {
  episode: Episode;
  progress?: EpisodeWatchProgress;
  kind: "resume" | "next";
};

export function getContinueWatchingItems(
  episodes: Episode[],
  history: WatchProgressMap,
  limit = 8,
): ContinueWatchingItem[] {
  const ordered = Object.entries(history).sort(([, a], [, b]) => b.lastWatchedAt - a.lastWatchedAt);
  if (!ordered.length) return [];

  const episodeById = new Map(episodes.map(episode => [String(episode.id), episode]));
  const items: ContinueWatchingItem[] = ordered
    .filter(([, progress]) => !progress.completed && progress.currentTime >= 20)
    .map(([id, progress]) => ({ episode: episodeById.get(id), progress }))
    .filter((item): item is { episode: Episode; progress: EpisodeWatchProgress } => Boolean(item.episode))
    .map(item => ({ ...item, kind: "resume" as const }));

  const [latestId, latestProgress] = ordered[0];
  if (latestProgress.completed) {
    const latestIndex = episodes.findIndex(episode => String(episode.id) === latestId);
    const nextEpisode = latestIndex >= 0 ? episodes[latestIndex + 1] : undefined;
    if (nextEpisode && !items.some(item => item.episode.id === nextEpisode.id)) {
      items.unshift({ episode: nextEpisode, progress: history[String(nextEpisode.id)], kind: "next" });
    }
  }

  return items.slice(0, limit);
}

export function getPrimaryContinueItem(episodes: Episode[], history: WatchProgressMap) {
  return getContinueWatchingItems(episodes, history, 1)[0];
}
