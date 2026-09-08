export type Season = {
  number: number;
  years: string;
  episodeCount: number;
  line: string;
  summary: string;
  highlights: string[];
};

export type Character = {
  initials: string;
  name: string;
  role: string;
  description: string;
};

export const seasons: Season[] = [
  { number: 1, years: "2008–09", episodeCount: 23, line: "Her ayrıntı bir itiraftır.", summary: "Patrick Jane, keskin gözlem gücünü California Soruşturma Bürosu'nun en zor vakalarında kullanırken geçmişindeki Red John yarasıyla yüzleşir.", highlights: ["Pilot", "Red Hair and Silver Tape", "Red John's Footsteps"] },
  { number: 2, years: "2009–10", episodeCount: 23, line: "Oyun artık iki kişilik.", summary: "Jane'in yöntemleri ekibin sınırlarını zorlarken Red John soruşturması daha kişisel ve daha tehlikeli bir hâl alır.", highlights: ["Redemption", "The Scarlet Letter", "Red Sky in the Morning"] },
  { number: 3, years: "2010–11", episodeCount: 24, line: "Gerçek, doğru soruyu bekler.", summary: "CBI içindeki güven çatlakları büyür; Jane her vakada hem suçluyu hem de karşısındaki insanı okumaya devam eder.", highlights: ["Red Sky at Night", "The Blood on His Hands", "Strawberries and Cream"] },
  { number: 4, years: "2011–12", episodeCount: 24, line: "Kontrol bir yanılsamadır.", summary: "Yeni dengeler ve eski düşmanlar, Jane ile Lisbon'ın ortaklığını her zamankinden daha ağır sınavlara taşır.", highlights: ["Scarlet Ribbons", "Blinking Red Light", "The Crimson Hat"] },
  { number: 5, years: "2012–13", episodeCount: 22, line: "Liste daralıyor.", summary: "Red John avı somut bir şekil kazanırken Jane'in uzun oyunu ekip için geri dönüşü olmayan sonuçlar doğurur.", highlights: ["The Crimson Ticket", "Red Dawn", "Red John's Rules"] },
  { number: 6, years: "2013–14", episodeCount: 22, line: "Bir son, başka bir başlangıç.", summary: "Yıllardır süren arayış belirleyici bir eşiğe ulaşır; karakterlerin hayatları ve çalışma biçimleri kökten değişir.", highlights: ["The Desert Rose", "Red John", "Blue Bird"] },
  { number: 7, years: "2014–15", episodeCount: 13, line: "Son numara daima en sadedir.", summary: "Jane ve Lisbon yeni hayatlarının ne anlama geldiğini keşfederken ekip son vakalarına birlikte girer.", highlights: ["Nothing But Blue Skies", "The Silver Briefcase", "White Orchids"] },
];

export const characters: Character[] = [
  { initials: "PJ", name: "Patrick Jane", role: "Bağımsız danışman", description: "İnsan davranışındaki en küçük sapmaları okuyan, sahne mentalizmi geçmişine sahip keskin bir gözlemci." },
  { initials: "TL", name: "Teresa Lisbon", role: "Ekip lideri", description: "Jane'in öngörülemez yöntemlerini disiplin, sezgi ve güçlü bir adalet duygusuyla dengeler." },
  { initials: "KC", name: "Kimball Cho", role: "Kıdemli ajan", description: "Az konuşan, ayrıntıları kaçırmayan ve baskı altında sakinliğini koruyan güvenilir saha ajanı." },
  { initials: "WR", name: "Wayne Rigsby", role: "Saha ajanı", description: "Sadakati ve doğrudan yaklaşımıyla ekibin hem enerjisini hem de duygusal merkezini güçlendirir." },
  { initials: "VG", name: "Grace Van Pelt", role: "Özel ajan", description: "Araştırma becerisi, teknoloji bilgisi ve güçlü sezgileriyle soruşturmaların görünmeyen bağlantılarını kurar." },
];
