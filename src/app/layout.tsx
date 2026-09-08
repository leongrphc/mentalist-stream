import type { Metadata } from "next";
import { Barlow, Italiana } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Italiana({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Barlow({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: "The Mentalist — 7 sezon, 151 bölüm", template: "%s | The Mentalist" },
  description: "The Mentalist'in 151 bölümünün tamamını keşfedin.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <template data-design-contract dangerouslySetInnerHTML={{ __html: "<!-- THESIS: The Mentalist'in 151 bölümünü Netflix benzeri, görsel merkezli bir yayın kataloğu olarak sunar; soyut editoryal vitrin yerine gerçek bölüm görselleri ve hızlı oynatma rotaları kullanır. OWN-WORLD: Sinema siyahı, sıcak beyaz, Netflix kırmızısı ve tam kanama medya; hafif yuvarlatılmış kartlar, koyu yüzeyler. STORY: Diziyi tanı, sezonu seç, bölümü aç, kaynağı varsa oynat. FIRST VIEWPORT: Tam ekran bölüm görseli, sol altta başlık/özet/iki aksiyon; katalog alt kenardan yükselir. FORM: Kullanıcının açıkça seçtiği Netflix canon yönü. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance -->" }} />
        <a className="skip-link" href="#icerik">İçeriğe geç</a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="The Mentalist ana sayfa">MENTALIST</Link>
          <nav aria-label="Ana navigasyon"><Link href="/">Ana sayfa</Link><Link href="/sezonlar/1">Bölümler</Link><Link href="/karakterler">Karakterler</Link><Link href="/hakkinda">Hakkında</Link></nav>
          <div className="header-tools"><span className="source-badge">151 bölüm</span><Link className="browse-link" href="/sezonlar/1" aria-label="Bölümlere git"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg></Link></div>
        </header>
        {children}
        <footer className="site-footer"><div><strong>MENTALIST</strong><p>Hayran yapımı arayüz çalışmasıdır. Yayın hizmeti değildir.</p></div><div><a href="https://www.tvmaze.com/shows/116/the-mentalist" target="_blank" rel="noreferrer">Dizi ve bölüm verileri: TVmaze</a><span>Video kaynakları kullanıcı tarafından sağlanır.</span></div></footer>
      </body>
    </html>
  );
}
