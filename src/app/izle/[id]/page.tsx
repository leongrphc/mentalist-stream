import Link from "next/link";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import WatchStatus from "@/components/WatchStatus";
import { episodes, getAdjacentEpisodes, getEpisode } from "@/data/episodes";

export function generateStaticParams() { return episodes.map((episode) => ({ id: String(episode.id) })); }

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const episode = getEpisode(Number(id));
  if (!episode) notFound();
  const adjacent = getAdjacentEpisodes(episode.id);

  return (
    <main id="icerik" className="watch-page">
      <VideoPlayer key={episode.id} episode={episode} nextEpisode={adjacent.next} />
      <section className="watch-info">
        <div>
          <Link href={`/sezonlar/${episode.season}`}>← {episode.season}. sezona dön</Link>
          <h2>{episode.name}</h2>
          <p className="watch-meta">S{episode.season}:B{episode.number} · {episode.runtime ?? 43} dk · {episode.airdate}</p>
          <WatchStatus episodeId={episode.id} />
          <p>{episode.summary || "Bu bölüm için özet bulunmuyor."}</p>
          <p className="language-note">Bölüm özeti kaynak dilinde sunulur.</p>
          <a className="source-credit" href={episode.sourceUrl} target="_blank" rel="noreferrer">Bölüm verisi: TVmaze</a>
        </div>
        <nav aria-label="Bölümler">
          {adjacent.previous && <Link href={`/izle/${adjacent.previous.id}`}>← Önceki bölüm</Link>}
          {adjacent.next && <Link href={`/izle/${adjacent.next.id}`}>Sonraki bölüm →</Link>}
        </nav>
      </section>
    </main>
  );
}
