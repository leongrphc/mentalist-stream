# Mentalist Stream

> A fan-made streaming-style web experience built around **The Mentalist**, one of my favorite TV series.`r`n> **The Mentalist**, çok sevdiğim dizilerden biri olduğu için hazırladığım, yayın platformu hissi veren fan yapımı bir web projesi.

[Türkçe](#türkçe) · [English](#english)

---

## Türkçe

### Proje hakkında

**Mentalist Stream**, The Mentalist için hazırladığım Netflix benzeri bir dizi deneyimi. Bu projeyi yapmamın temel sebebi diziyi çok sevmem ve yalnızca bölüm listesi gösteren basit bir sayfa yerine; sezonları gezebildiğim, bölüm açabildiğim, kaldığım yerden devam edebildiğim ve gerçek bir yayın platformuna yakın hissettiren bir arayüz oluşturmak istememdi.

Proje şu anda dizinin **7 sezonunu ve 151 bölümünü** kapsıyor. Bölümler ayrı sayfalara sahip, sezon bazında gezilebiliyor ve izleme ilerlemesi cihaz üzerinde kaydediliyor.

### Öne çıkan özellikler

- Netflix esintili koyu ve sinematik arayüz
- 7 sezon / 151 bölüm kataloğu
- Her bölüm için ayrı izleme sayfası
- Sezon bazlı bölüm listeleri
- CineSrc embed player entegrasyonu
- Player içinde kalite, altyazı, ses dili ve oynatma hızı seçenekleri
- Popup/yeni sekme davranışlarını sınırlayan sandbox yapılandırması
- Kaldığın saniyenin otomatik kaydedilmesi
- Sayfaya döndüğünde kaldığın yerden devam etme
- Tamamlanan bölümlerin **İzlendi** olarak işaretlenmesi
- Bölüm kartlarında izleme ilerleme çubuğu
- Ana sayfada **İzlemeye devam et** sırası
- Bölüm bitince sıradaki bölüme geçiş
- 10 saniyelik otomatik sonraki bölüm sayacı
- Masaüstü ve mobil uyumlu tasarım
- Statik olarak üretilen bölüm ve sezon sayfaları

### Veriler nereden geliyor?

Bölüm meta verileri **TVmaze API** üzerinden alınıyor.

Kullanılan endpoint:

```text
https://api.tvmaze.com/shows/116/episodes?specials=1
```

`scripts/sync-episodes.mjs` scripti TVmaze'den gelen veriyi işleyerek aşağıdaki bilgileri `src/data/episodes.json` dosyasına yazıyor:

- Bölüm ID'si
- Bölüm adı
- Sezon ve bölüm numarası
- Yayın tarihi
- Süre
- Bölüm özeti
- Bölüm görselleri
- TVmaze kaynak bağlantısı

Bölüm verilerini yeniden senkronize etmek için:

```bash
npm run sync:data
```

### Video oynatma

Video dosyaları bu repository içerisinde barındırılmıyor.

Player entegrasyonu **CineSrc** üzerinden yapılıyor. Uygulama The Mentalist için TMDB ID `5920` kullanarak CineSrc'nin TV embed yapısını oluşturuyor.

Örnek entegrasyon mantığı:

```text
CineSrc embed
      ↓
iframe
      ↓
CineSrc Player API / postMessage
      ↓
Mentalist Stream izleme sayfası
```

Player tarafında sağlayıcının sunduğu özellikler kullanılabiliyor:

- Quality / kalite
- Subtitles / altyazı
- Audio tracks / ses dili
- Playback speed / oynatma hızı
- Picture-in-picture
- Fullscreen
- Bölüm kontrolleri

Kaynakta bulunmayan bir kalite, ses veya altyazı seçeneği doğal olarak kullanıcıya gösterilmeyebilir.

Iframe üzerinde popup ve üst seviye yönlendirmeleri sınırlandırmak için browser `sandbox` mekanizması kullanılıyor.

### İzleme geçmişi nasıl çalışıyor?

Projede henüz kullanıcı hesabı veya veritabanı bulunmadığı için izleme geçmişi cihaz bazlı tutuluyor.

Kayıt anahtarı:

```text
mentalist.watch-progress.v1
```

Her bölüm için şunlar saklanıyor:

```ts
{
  currentTime: number,
  duration: number,
  completed: boolean,
  lastWatchedAt: number
}
```

İzleme deneyiminde:

- İlerleme yaklaşık her 5 saniyede bir güncellenir.
- Yarım kalan bölüm açıldığında yaklaşık **5 saniye geriden** devam edilir.
- Bölümün en az %95'i izlendiğinde veya son 90 saniyeye girildiğinde bölüm tamamlanmış kabul edilir.
- Tamamlanan bölümden sonra sıradaki bölüm ana sayfada önerilir.
- Bölüm sonunda 10 saniyelik otomatik geçiş ekranı gösterilir.

Bu sistem ileride üyelik eklendiğinde aynı veri modelinin backend/veritabanına taşınabileceği şekilde ayrılmıştır.

### Kullanılan teknolojiler

| Teknoloji | Kullanım |
| --- | --- |
| **Next.js 16.3.3** | App Router, sayfalar, static generation |
| **React 19.2.8** | UI ve client etkileşimleri |
| **TypeScript 5.9** | Tip güvenliği |
| **CSS** | Responsive ve streaming platform tasarımı |
| **CineSrc** | Video embed/player entegrasyonu |
| **TVmaze API** | Bölüm verileri ve görseller |
| **Playwright** | Browser tabanlı geliştirme ve doğrulama testleri |
| **localStorage** | Cihaz bazlı izleme geçmişi |

### Proje yapısı

```text
src/
├── app/
│   ├── page.tsx                  # Ana sayfa
│   ├── izle/[id]/                # Bölüm izleme sayfaları
│   ├── sezonlar/[season]/        # Sezon sayfaları
│   ├── karakterler/              # Karakterler
│   └── hakkinda/                 # Proje/dizi hakkında
│
├── components/
│   ├── VideoPlayer.tsx           # CineSrc player entegrasyonu
│   ├── EpisodeRail.tsx           # Bölüm sıraları
│   ├── ContinueWatchingRail.tsx  # İzlemeye devam et
│   ├── HeroPrimaryAction.tsx     # Ana devam/sıradaki bölüm aksiyonu
│   └── WatchStatus.tsx           # İzleme durumu
│
├── data/
│   ├── episodes.json             # TVmaze bölüm verileri
│   └── episodes.ts               # Bölüm yardımcıları
│
├── hooks/
│   └── useWatchProgress.ts       # İzleme geçmişi React hook'u
│
└── lib/
    └── watch-progress.ts         # İzleme geçmişi veri modeli

scripts/
└── sync-episodes.mjs             # TVmaze senkronizasyonu
```

### Kurulum

Repository'yi klonlayın:

```bash
git clone https://github.com/leongrphc/mentalist-stream.git
cd mentalist-stream
```

Bağımlılıkları yükleyin:

```bash
npm install
```

Development server'ı başlatın:

```bash
npm run dev
```

Tarayıcıdan:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

### Not

Bu proje kişisel/fan yapımı bir projedir ve The Mentalist'in resmi web sitesi veya yayın platformu değildir. The Mentalist ve ilgili marka/medya hakları kendi hak sahiplerine aittir. TVmaze üzerinden kullanılan bölüm meta verileri ve görseller kaynak servis tarafından sağlanır. Video dosyaları bu repository içinde bulunmaz.

---

## English

### About the project

**Mentalist Stream** is a Netflix-inspired web experience I built for **The Mentalist**, one of my favorite TV series. I wanted to create something more complete than a basic episode list: a focused streaming-style interface where I can browse seasons, open episodes, continue from where I stopped, and get an experience closer to a real streaming service.

The project currently covers all **7 seasons and 151 episodes**. Every episode has its own route, seasons can be browsed separately, and playback progress is stored locally on the device.

### Features

- Dark, cinematic Netflix-inspired interface
- 7 seasons / 151 episode catalog
- Dedicated watch page for every episode
- Season-based browsing
- CineSrc embedded player integration
- Quality, subtitles, audio tracks and playback speed controls
- Sandboxed iframe configuration to restrict popup/new-tab behavior
- Automatic playback progress tracking
- Resume from the last watched position
- Completed episodes marked as **Watched**
- Progress bars on episode cards
- **Continue Watching** row on the home page
- Next episode recommendations
- 10-second automatic next-episode countdown
- Responsive desktop and mobile layouts
- Statically generated episode and season routes

### Where does the data come from?

Episode metadata is synchronized from the **TVmaze API**.

Endpoint used:

```text
https://api.tvmaze.com/shows/116/episodes?specials=1
```

The `scripts/sync-episodes.mjs` script transforms the TVmaze response and stores the following information in `src/data/episodes.json`:

- Episode ID
- Episode title
- Season and episode number
- Air date
- Runtime
- Episode summary
- Episode artwork
- TVmaze source URL

To refresh the episode dataset:

```bash
npm run sync:data
```

### Video playback

Video files are **not hosted inside this repository**.

Playback is integrated through **CineSrc**. The application uses The Mentalist's TMDB ID (`5920`) to build CineSrc TV embed URLs.

Integration flow:

```text
CineSrc embed
      ↓
iframe
      ↓
CineSrc Player API / postMessage
      ↓
Mentalist Stream watch page
```

Depending on what the source exposes, the embedded player can provide:

- Quality selection
- Subtitles
- Audio tracks
- Playback speed
- Picture-in-picture
- Fullscreen
- Episode controls

If a specific source does not contain a subtitle, audio track, or resolution, that option may not be available for that episode.

The iframe also uses browser sandboxing to restrict popup and top-level navigation behavior.

### Watch progress

There is currently no account system or database, so watch history is stored locally per browser/device.

Storage key:

```text
mentalist.watch-progress.v1
```

Each episode stores:

```ts
{
  currentTime: number,
  duration: number,
  completed: boolean,
  lastWatchedAt: number
}
```

Current behavior:

- Progress is persisted roughly every 5 seconds.
- Resuming starts about **5 seconds before** the saved position.
- An episode is treated as completed after at least 95% has been watched or when fewer than 90 seconds remain.
- After completion, the next episode becomes the primary recommendation.
- A 10-second auto-next screen appears at the end of an episode.

The watch-progress layer is intentionally separated so the same model can later be moved to an authenticated backend/database for cross-device synchronization.

### Tech stack

| Technology | Purpose |
| --- | --- |
| **Next.js 16.3.3** | App Router, pages and static generation |
| **React 19.2.8** | UI and client-side interactions |
| **TypeScript 5.9** | Type safety |
| **CSS** | Responsive streaming-service UI |
| **CineSrc** | Embedded video/player integration |
| **TVmaze API** | Episode metadata and artwork |
| **Playwright** | Browser-based development and verification |
| **localStorage** | Device-local watch progress |

### Project structure

```text
src/
├── app/
│   ├── page.tsx                  # Home page
│   ├── izle/[id]/                # Episode watch routes
│   ├── sezonlar/[season]/        # Season routes
│   ├── karakterler/              # Characters
│   └── hakkinda/                 # About
│
├── components/
│   ├── VideoPlayer.tsx           # CineSrc player integration
│   ├── EpisodeRail.tsx           # Episode rails
│   ├── ContinueWatchingRail.tsx  # Continue Watching
│   ├── HeroPrimaryAction.tsx     # Resume / next episode action
│   └── WatchStatus.tsx           # Watch status UI
│
├── data/
│   ├── episodes.json             # TVmaze episode dataset
│   └── episodes.ts               # Episode helpers
│
├── hooks/
│   └── useWatchProgress.ts       # Watch-progress React hook
│
└── lib/
    └── watch-progress.ts         # Watch-progress data model

scripts/
└── sync-episodes.mjs             # TVmaze synchronization
```

### Installation

Clone the repository:

```bash
git clone https://github.com/leongrphc/mentalist-stream.git
cd mentalist-stream
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

### Disclaimer

This is a personal, fan-made project and is not an official website or streaming service for The Mentalist. The Mentalist and related trademarks/media belong to their respective rights holders. Episode metadata and artwork used through TVmaze are supplied by the source service. No video files are stored in this repository.

