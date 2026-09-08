# The Mentalist Dizi Sitesi — MVP Planı

## 1. Ürün hedefi

The Mentalist'i tek yapımlık, premium ve sinematik bir deneyimle sunan; sezonları, bölümleri ve karakterleri keşfetmeye odaklanan bir web sitesi. İlk sürümde video oynatma ve üyelik olmayacak. Altyapı daha sonra başka diziler, oynatma ve kullanıcı özellikleri eklenebilecek şekilde kurulacak.

Başarı ölçütü: Yeni bir ziyaretçi ilk ekranda sitenin The Mentalist'e ait olduğunu anlar, dizinin atmosferini hisseder ve en fazla iki etkileşim içinde bir sezonun bölüm listesine ulaşır.

## 2. Deneyim ve görsel yön

### Seçilen yön: İşaretli deste / Soğuk okuma

Patrick Jane'in gözlem, yönlendirme ve sahne sihri tarafını temel alan bir arayüz. İçerik blokları iskambil destesinin katmanlı yapısından esinlenir; doğrudan iskambil kartı taklidi yapılmaz. Netflix'ten tam ekran medya kullanımı, hızlı gezinme ve güçlü içerik hiyerarşisi alınır; tipik kırmızı-siyah katalog görünümü kopyalanmaz.

### Tasarım sistemi taslağı

- Gece laciverti — `#101722`: ana zemin
- CBI mavisi — `#243B53`: yüzeyler ve navigasyon
- Kanıt kâğıdı — `#EEE7D8`: açık metin ve seçili alanlar
- Pirinç — `#C39A54`: premium vurgu ve odak çizgileri
- Jane kırmızısı — `#A93632`: yalnızca kritik aksiyon ve ipuçları
- Sis grisi — `#9BA7B4`: ikincil metin

Tipografi: başlıklarda kontrollü biçimde `Italiana`, gövde ve arayüzde `Barlow`, sezon/bölüm etiketlerinde `Barlow Condensed`. Büyük başlıklar zarif; kontroller hızlı okunur ve sade kalır.

### İmza etkileşim: Bakış modu

Hero veya karakter görseline klavye odağı ya da imleç geldiğinde üç küçük gözlem noktası belirir. Noktalar dekorasyon değil, karakter veya sahne hakkında kısa ve gerçek bilgi taşır. Mobilde aynı içerik “Ayrıntıları gör” kontrolüyle açılır. Hareket azaltma tercihi olan kullanıcılar animasyonsuz sürümü görür.

## 3. İlk sürümün sayfa yapısı

### Ana sayfa `/`

- Sade üst navigasyon: Ana Sayfa, Sezonlar, Karakterler, Dizi Hakkında
- Sinematik açılış alanı: The Mentalist başlığı, kısa tanıtım, “Sezonları keşfet” ana aksiyonu
- Sağ kenarda üst üste binen yedi sezon sekmesi; seçim yapıldığında ana görsel ve özet değişir
- Bakış modu ile keşfedilebilir ayrıntılar
- Öne çıkan bölümler şeridi
- Ana karakterler bölümü
- Dizi hakkında kısa bilgi ve kapanış

### Sezon sayfası `/sezonlar/[sezon]`

- Sezon başlığı, kısa özet ve bölüm sayısı
- Bölüm kartları: sıra, ad, kısa özet, süre ve görsel alanı
- Oynatma yerine pasif olmayan, dürüst bir “Bölüm bilgisi” aksiyonu
- Önceki/sonraki sezon geçişi

### Karakterler `/karakterler`

- Patrick Jane ve ana ekip için geniş portreler
- Kısa karakter tanımları
- Karakter seçildiğinde sayfa içinde açılan ayrıntı paneli
- İlk sürümde ayrı karakter detay rotası yok

### Dizi hakkında `/hakkinda`

- Konu özeti, tür, yayın bilgileri ve yaratıcı ekip
- Doğrulanmış kaynaklara dayalı kısa yapım bilgileri
- Medya/lisans ve içerik kaynağı notu

## 4. Ana sayfa yerleşim taslağı

```text
┌──────────────────────────────────────────────────────────────┐
│ LOGO       Ana Sayfa  Sezonlar  Karakterler  Hakkında        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ THE MENTALIST                [S1]                             │
│ İnsanlar her şeyi söyler.    [S2]      SİNEMATİK GÖRSEL      │
│ Jane yalnızca bakar.         [S3]      + Bakış noktaları     │
│ [Sezonları keşfet]           [...]                            │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ Seçili sezon  →  yatay bölüm şeridi                          │
├──────────────────────────────────────────────────────────────┤
│ Karakter portreleri / açılan bilgi paneli                    │
├──────────────────────────────────────────────────────────────┤
│ Dizi hakkında kısa bilgi                          [İncele]    │
└──────────────────────────────────────────────────────────────┘
```

Mobilde sezon sekmeleri yatay, kaydırılabilir bir şeride dönüşür; hero metni görselin altında okunaklı bir zemine taşınır. Bölüm kartları tek sütun yerine yatay kaydırma kullanır ancak klavye ve ekran okuyucu erişimi korunur.

## 5. Teknik yaklaşım

- Next.js App Router + TypeScript
- Bileşen stilleri ve tasarım tokenları için CSS Modules + global CSS değişkenleri
- İlk sürümde veritabanı ve backend yok
- İçerik, doğrulanmış yerel TypeScript/JSON dosyalarından gelir
- Görseller `next/image` ile boyutlandırılır ve WebP/AVIF sunulur
- Hareketler öncelikle CSS ile; yalnızca anlamlı geçişlerde küçük bir animasyon katmanı
- SEO için sayfa bazlı metadata, Open Graph ve yapılandırılmış TVSeries verisi
- Erişilebilirlik: semantik başlık sırası, görünür klavye odağı, yeterli kontrast, `prefers-reduced-motion`
- Dağıtım hedefi: Vercel

Önerilen veri yapıları: `Series`, `Season`, `Episode`, `Character` ve `Observation`. Böylece bugün yerel veriyle çalışan arayüz daha sonra CMS veya API'ye bağlanabilir.

## 6. Uygulama aşamaları

1. Proje temeli: Next.js kurulumu, klasör yapısı, fontlar, renk/ölçek tokenları ve ortak layout.
2. İçerik modeli: The Mentalist, sezon, bölüm ve karakter verilerinin tipli yerel dosyalara aktarılması.
3. Ana deneyim: navigasyon, açılış alanı, sezon seçici, bölüm şeridi ve Bakış modu.
4. Alt sayfalar: sezon, karakterler ve hakkında sayfaları; boş/veri eksik durumları.
5. Kalite turu: mobil uyumluluk, klavye kullanımı, kontrast, hareket azaltma, görsel optimizasyon ve SEO.
6. Yayına hazırlık: üretim derlemesi, masaüstü/mobil görsel kontrol ve Vercel dağıtımı.

## 7. İlk sürüm dışında kalanlar

- Üyelik, giriş ve profil sistemi
- Video barındırma ve gerçek bölüm oynatma
- İzleme geçmişi, favoriler ve “izlemeye devam et”
- Ödeme veya abonelik
- Yönetim paneli ve CMS
- Birden fazla dizi kataloğu
- Yorumlar, puanlama ve sosyal özellikler

## 8. İçerik ve telif gereksinimi

Kodlamaya başlamadan önce kullanılacak poster, arka plan, karakter ve bölüm görsellerinin kaynağı belirlenmeli. Sağlanan veya kullanım hakkı doğrulanmış medya tercih edilmeli. Geçici görseller açıkça demo içeriği olarak işaretlenmeli; site herhangi bir yayın hakkına sahipmiş gibi sunulmamalı.

## 9. Onay noktası

Uygulamaya geçmeden önce bu kapsam, “İşaretli deste / Soğuk okuma” yönü ve lisanslı medya yaklaşımı onaylanmalı. Onay sonrası önce ana sayfanın masaüstü ve mobil ilk ekranı hazırlanır; kalan sayfalar bu görsel dünya sabitlendikten sonra geliştirilir.
