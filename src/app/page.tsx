import Image from "next/image";
import Link from "next/link";
import ContinueWatchingRail from "@/components/ContinueWatchingRail";
import EpisodeRail from "@/components/EpisodeRail";
import HeroPrimaryAction from "@/components/HeroPrimaryAction";
import { episodes, episodesBySeason } from "@/data/episodes";

function InfoIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></svg>; }

export default function Home() {
  const hero = episodes[0];

  return (
    <main id="icerik" className="netflix-home">
      <section className="billboard" aria-labelledby="billboard-title">
        {hero.image && <Image className="billboard-image" src={hero.image} alt="The Mentalist dizisinden Patrick Jane" fill priority quality={90} sizes="(max-width: 640px) 1100px, (max-width: 900px) 1200px, 100vw" />}
        <div className="billboard-vignette" />
        <div className="billboard-content">
          <p className="series-mark">The <strong>Mentalist</strong></p>
          <h1 id="billboard-title">Gerçeği görmek için<br />yalnızca bakmak yetmez.</h1>
          <div className="billboard-meta"><span className="match">%98 eşleşme</span><span>2008</span><span>7 sezon</span><span className="age">13+</span><span>HD</span></div>
          <p className="billboard-summary">Eski bir sahne mentalisti, keskin gözlem gücünü en karmaşık cinayetleri çözmek için kullanırken ailesini öldüren seri katilin izini sürer.</p>
          <div className="billboard-actions">
            <HeroPrimaryAction fallbackId={hero.id} />
            <Link className="info-action" href="/hakkinda"><InfoIcon /> Daha fazla bilgi</Link>
          </div>
        </div>
        <div className="billboard-note"><span>7 sezonun tamamı</span></div>
      </section>

      <div className="catalog">
        <ContinueWatchingRail />
        <EpisodeRail title="Baştan başla" items={episodesBySeason[1]} />
        {Array.from({ length: 6 }, (_, index) => {
          const season = index + 2;
          return <EpisodeRail key={season} title={`${season}. sezon`} items={episodesBySeason[season]} />;
        })}
      </div>
    </main>
  );
}
