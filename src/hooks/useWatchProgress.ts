"use client";

import { useEffect, useState } from "react";
import {
  readWatchProgress,
  WATCH_PROGRESS_EVENT,
  WATCH_PROGRESS_KEY,
  type WatchProgressMap,
} from "@/lib/watch-progress";

export function useWatchProgress() {
  const [history, setHistory] = useState<WatchProgressMap>({});

  useEffect(() => {
    const sync = () => setHistory(readWatchProgress());
    const onStorage = (event: StorageEvent) => {
      if (event.key === WATCH_PROGRESS_KEY) sync();
    };
    sync();
    window.addEventListener("storage", onStorage);
    window.addEventListener(WATCH_PROGRESS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(WATCH_PROGRESS_EVENT, sync);
    };
  }, []);

  return history;
}
