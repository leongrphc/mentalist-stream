import Link from "next/link";

export default function NotFound() { return <main id="icerik" className="not-found"><span>Yanlış iz</span><h1>Bu sayfa bulunamadı.</h1><p>Aradığınız bağlantı kaldırılmış veya hiç var olmamış olabilir.</p><Link className="primary-action" href="/">Ana sayfaya dön</Link></main>; }
