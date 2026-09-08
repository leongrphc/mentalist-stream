import { characters } from "@/data/mentalist";

export const metadata = { title: "Karakterler" };

export default function CharactersPage() {
  return <main id="icerik" className="inner-page"><header className="inner-hero"><span className="inner-number">05</span><div><h1>Karakterler</h1><p>Her biri başka bir ayrıntıyı görür.</p><small>CBI ekibi</small></div></header><section className="character-grid">{characters.map((character, index) => <article key={character.name}><span className="character-initials">{character.initials}</span><div><small>{character.role}</small><h2>{character.name}</h2><p>{character.description}</p></div><span>{String(index + 1).padStart(2, "0")}</span></article>)}</section></main>;
}
