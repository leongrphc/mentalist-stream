import { mkdir, writeFile } from "node:fs/promises";

const endpoint = "https://api.tvmaze.com/shows/116/episodes?specials=1";
const response = await fetch(endpoint);
if (!response.ok) throw new Error(`TVmaze isteği başarısız: ${response.status}`);

const raw = await response.json();
const episodes = raw.map((episode) => ({
  id: episode.id,
  name: episode.name,
  season: episode.season,
  number: episode.number,
  airdate: episode.airdate,
  runtime: episode.runtime,
  summary: (episode.summary ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim(),
  image: episode.image?.original ?? episode.image?.medium ?? null,
  imageMedium: episode.image?.medium ?? episode.image?.original ?? null,
  sourceUrl: episode.url,
}));

await mkdir("src/data", { recursive: true });
await writeFile("src/data/episodes.json", `${JSON.stringify(episodes, null, 2)}\n`, "utf8");
console.log(`${episodes.length} bölüm src/data/episodes.json dosyasına yazıldı.`);
