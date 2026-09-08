import streams from "./streams.json";

// Refresh upstream episode URLs with npm run sync:videos.
export const videoSources: Record<number, string> = streams;
