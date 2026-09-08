import rawEpisodes from "./episodes.json";

export type Episode = {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number | null;
  summary: string;
  image: string | null;
  imageMedium: string | null;
  sourceUrl: string;
};

export const episodes = rawEpisodes as Episode[];

export const episodesBySeason = Object.fromEntries(
  Array.from({ length: 7 }, (_, index) => {
    const season = index + 1;
    return [season, episodes.filter((episode) => episode.season === season)];
  }),
) as Record<number, Episode[]>;

export function getEpisode(id: number) {
  return episodes.find((episode) => episode.id === id);
}

export function getAdjacentEpisodes(id: number) {
  const index = episodes.findIndex((episode) => episode.id === id);
  return {
    previous: index > 0 ? episodes[index - 1] : undefined,
    next: index >= 0 && index < episodes.length - 1 ? episodes[index + 1] : undefined,
  };
}
