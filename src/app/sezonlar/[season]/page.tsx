import Link from "next/link";
import { notFound } from "next/navigation";
import { episodesBySeason } from "@/data/episodes";
import SeasonEpisodeGrid from "@/components/SeasonEpisodeGrid";
import SeasonSelect from "@/components/SeasonSelect";

export function generateStaticParams() { return Array.from({ length: 7 }, (_, index) => ({ season: String(index + 1) })); }

export default async function SeasonPage({ params }: { params: Promise<{ season: string }> }) {
  const { season: value } = await params;
  const season = Number(value);
  const items = episodesBySeason[season];
  if (!items) notFound();

  return (
    <main id="icerik" className="browse-page">
      <header className="browse-heading"><div><Link href="/">The Mentalist</Link><h1>{season}. sezon</h1><p>{items.length} bölüm · {items[0].airdate.slice(0,4)}</p><small>Bölüm adları ve özetleri kaynak dilinde sunulur.</small></div><SeasonSelect value={season} /></header>
      <SeasonEpisodeGrid items={items} season={season} />
    </main>
  );
}
