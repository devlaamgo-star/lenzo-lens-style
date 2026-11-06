import type { Lang } from "./products";

import lens1 from "@/assets/lens/lens-1.webp.asset.json";
import lens2 from "@/assets/lens/lens-2.webp.asset.json";
import lens3 from "@/assets/lens/lens-3.webp.asset.json";
import lens4 from "@/assets/lens/lens-4.webp.asset.json";
import lens5 from "@/assets/lens/lens-5.webp.asset.json";
import lens6 from "@/assets/lens/lens-6.webp.asset.json";
import lens7 from "@/assets/lens/lens-7.webp.asset.json";
import lens8 from "@/assets/lens/lens-8.webp.asset.json";
import lens9 from "@/assets/lens/lens-9.webp.asset.json";
import lens10 from "@/assets/lens/lens-10.webp.asset.json";
import lens11 from "@/assets/lens/lens-11.webp.asset.json";
import lens12 from "@/assets/lens/lens-12.webp.asset.json";
import lens13 from "@/assets/lens/lens-13.webp.asset.json";
import lens14 from "@/assets/lens/lens-14.webp.asset.json";
import lens15 from "@/assets/lens/lens-15.webp.asset.json";
import lens16 from "@/assets/lens/lens-16.webp.asset.json";
import lens17 from "@/assets/lens/lens-17.webp.asset.json";
import lens18 from "@/assets/lens/lens-18.webp.asset.json";
import lens19 from "@/assets/lens/lens-19.webp.asset.json";
import lens20 from "@/assets/lens/lens-20.webp.asset.json";
import lens21 from "@/assets/lens/lens-21.webp.asset.json";
import lens22 from "@/assets/lens/lens-22.webp.asset.json";
import lens23 from "@/assets/lens/lens-23.webp.asset.json";
import lens24 from "@/assets/lens/lens-24.webp.asset.json";
import lens25 from "@/assets/lens/lens-25.webp.asset.json";
import lens26 from "@/assets/lens/lens-26.webp.asset.json";
import lens27 from "@/assets/lens/lens-27.webp.asset.json";
import lens28 from "@/assets/lens/lens-28.webp.asset.json";
import lens29 from "@/assets/lens/lens-29.webp.asset.json";
import lens30 from "@/assets/lens/lens-30.webp.asset.json";
import lens31 from "@/assets/lens/lens-31.webp.asset.json";
import lens32 from "@/assets/lens/lens-32.webp.asset.json";
import lens33 from "@/assets/lens/lens-33.webp.asset.json";
import lens34 from "@/assets/lens/lens-34.webp.asset.json";
import lens35 from "@/assets/lens/lens-35.webp.asset.json";
import lens36 from "@/assets/lens/lens-36.webp.asset.json";
import lens37 from "@/assets/lens/lens-37.webp.asset.json";
import lens38 from "@/assets/lens/lens-38.webp.asset.json";
import lens39 from "@/assets/lens/lens-39.webp.asset.json";
import lens40 from "@/assets/lens/lens-40.webp.asset.json";
import lens41 from "@/assets/lens/lens-41.webp.asset.json";
import lens42 from "@/assets/lens/lens-42.webp.asset.json";
import lens43 from "@/assets/lens/lens-43.webp.asset.json";
import lens44 from "@/assets/lens/lens-44.webp.asset.json";
import lens45 from "@/assets/lens/lens-45.png.asset.json";
import lens46 from "@/assets/lens/lens-46.webp.asset.json";
import lens47 from "@/assets/lens/lens-47.png.asset.json";
import lens48 from "@/assets/lens/lens-48.webp.asset.json";
import lens49 from "@/assets/lens/lens-49.png.asset.json";
import lens50 from "@/assets/lens/lens-50.png.asset.json";
import lens51 from "@/assets/lens/lens-51.png.asset.json";
import lens52 from "@/assets/lens/lens-52.png.asset.json";
import lens53 from "@/assets/lens/lens-53.png.asset.json";
import lens54 from "@/assets/lens/lens-54.png.asset.json";
import lens55 from "@/assets/lens/lens-55.png.asset.json";
import lens56 from "@/assets/lens/lens-56.png.asset.json";
import barcelone from "@/assets/lens/clubs/fc-barcelone.png.asset.json";
import psg from "@/assets/lens/clubs/paris-saint-germain.png.asset.json";
import united from "@/assets/lens/clubs/manchester-united.png.asset.json";
import city from "@/assets/lens/clubs/manchester-city.png.asset.json";
import liverpool from "@/assets/lens/clubs/liverpool.png.asset.json";
import arsenal from "@/assets/lens/clubs/arsenal.png.asset.json";
import chelsea from "@/assets/lens/clubs/chelsea.png.asset.json";
import bayern from "@/assets/lens/clubs/bayern-munich.png.asset.json";
import juventus from "@/assets/lens/clubs/juventus.png.asset.json";
import milan from "@/assets/lens/clubs/ac-milan.png.asset.json";

export type CameraLensSkin = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  gallery: string[];
  category: "camera-lens-skins";
  device: string;
  inStock: boolean;
  isNew: boolean;
  popularity: number;
  imagePresentation?: "full-phone";
};

const DESC: Record<Lang, string> = {
  fr: "Sticker décoratif découpé avec précision pour la zone des objectifs caméra de votre iPhone. Finition fine, cutouts nets autour de chaque objectif, du flash et des capteurs.",
  ar: "ملصق ديكوري مقصوص بدقة لمنطقة عدسات الكاميرا في جهاز iPhone، بفتحات دقيقة حول كل عدسة والفلاش والمستشعرات.",
  en: "Decorative skin precisely cut for the camera lens area of your iPhone, with clean cutouts around each lens, the flash and the sensors.",
};

const DEVICE = "iPhone 17 Pro Max";

type Seed = {
  slug: string;
  fr: string;
  ar: string;
  en: string;
  image: string;
  isNew: boolean;
  popularity: number;
};

const SEEDS: Seed[] = [
  { slug: "horizon-ambre", fr: "Horizon Ambré", ar: "أفق كهرماني", en: "Amber Horizon", image: lens1.url, isNew: true, popularity: 99 },
  { slug: "palmier-nocturne", fr: "Palmier Nocturne", ar: "نخيل ليلي", en: "Night Palm", image: lens2.url, isNew: true, popularity: 97 },
  { slug: "reseau-orange", fr: "Réseau Orange", ar: "شبكة برتقالية", en: "Orange Grid", image: lens3.url, isNew: true, popularity: 95 },
  { slug: "spectre-diagonal", fr: "Spectre Diagonal", ar: "طيف قطري", en: "Diagonal Spectrum", image: lens4.url, isNew: true, popularity: 93 },
  { slug: "cavalier-ecarlate", fr: "Cavalier Écarlate", ar: "فارس قرمزي", en: "Scarlet Rider", image: lens5.url, isNew: true, popularity: 91 },
  { slug: "compagnon-nuage", fr: "Compagnon Nuage", ar: "رفيق السحاب", en: "Cloud Companion", image: lens6.url, isNew: true, popularity: 89 },
  { slug: "chat-emeraude", fr: "Chat Émeraude", ar: "قط زمردي", en: "Emerald Cat", image: lens7.url, isNew: true, popularity: 87 },
  { slug: "arc-vertical", fr: "Arc Vertical", ar: "قوس عمودي", en: "Vertical Arc", image: lens8.url, isNew: true, popularity: 85 },
  { slug: "crane-obscur", fr: "Crâne Obscur", ar: "جمجمة داكنة", en: "Dark Skull", image: lens9.url, isNew: true, popularity: 83 },
  { slug: "vigie-sauvage", fr: "Vigie Sauvage", ar: "برج الغابة", en: "Wild Lookout", image: lens10.url, isNew: true, popularity: 81 },
  { slug: "tribu-pop", fr: "Tribu Pop", ar: "قبيلة بوب", en: "Pop Tribe", image: lens11.url, isNew: true, popularity: 79 },
  { slug: "note-douce", fr: "Note Douce", ar: "ملاحظة لطيفة", en: "Sweet Note", image: lens12.url, isNew: true, popularity: 77 },
  { slug: "envol-dore", fr: "Envol Doré", ar: "تحليق ذهبي", en: "Golden Flight", image: lens13.url, isNew: true, popularity: 75 },
  { slug: "feuillage-espiegle", fr: "Feuillage Espiègle", ar: "أوراق مرحة", en: "Playful Foliage", image: lens14.url, isNew: true, popularity: 73 },
  { slug: "regard-violet", fr: "Regard Violet", ar: "نظرة بنفسجية", en: "Violet Gaze", image: lens15.url, isNew: true, popularity: 71 },
  { slug: "muse-emeraude", fr: "Muse Émeraude", ar: "ملهمة زمردية", en: "Emerald Muse", image: lens16.url, isNew: true, popularity: 69 },
  { slug: "graffiti-neon", fr: "Graffiti Néon", ar: "غرافيتي نيون", en: "Neon Graffiti", image: lens17.url, isNew: true, popularity: 67 },
  { slug: "equilibre-lunaire", fr: "Équilibre Lunaire", ar: "توازن قمري", en: "Lunar Balance", image: lens18.url, isNew: true, popularity: 65 },
  { slug: "mode-hors-ligne", fr: "Mode Hors-Ligne", ar: "وضع دون اتصال", en: "Offline Mode", image: lens19.url, isNew: true, popularity: 63 },

  { slug: "bande-de-chats", fr: "Bande de Chats", ar: "عصابة القطط", en: "Cat Crew", image: lens20.url, isNew: true, popularity: 61 },
  { slug: "canards-jaunes", fr: "Canards Jaunes", ar: "بط أصفر", en: "Yellow Ducks", image: lens21.url, isNew: true, popularity: 59 },
  { slug: "pew-pew", fr: "Pew Pew", ar: "بيو بيو", en: "Pew Pew", image: lens22.url, isNew: true, popularity: 57 },
  { slug: "sieste-safran", fr: "Sieste Safran", ar: "قيلولة زعفرانية", en: "Saffron Nap", image: lens23.url, isNew: true, popularity: 55 },
  { slug: "trio-curieux", fr: "Trio Curieux", ar: "ثلاثي فضولي", en: "Curious Trio", image: lens24.url, isNew: true, popularity: 53 },
  { slug: "chat-approuve", fr: "Chat Approuvé", ar: "قط موافق", en: "Approved Cat", image: lens25.url, isNew: true, popularity: 51 },
  { slug: "lets-go-tigre", fr: "Let's Go Tigré", ar: "هيا بنا", en: "Let's Go Tabby", image: lens26.url, isNew: true, popularity: 49 },
  { slug: "chat-espion", fr: "Chat Espion", ar: "قط متلصص", en: "Spy Cat", image: lens27.url, isNew: true, popularity: 47 },
  { slug: "lune-lapin", fr: "Lune Lapin", ar: "قمر الأرنب", en: "Rabbit Moon", image: lens28.url, isNew: true, popularity: 45 },
  { slug: "dragon-fumee", fr: "Dragon Fumée", ar: "تنين الدخان", en: "Smoke Dragon", image: lens29.url, isNew: true, popularity: 43 },

  { slug: "dracaufeu-ambre", fr: "Dracaufeu Ambré", ar: "تنين كهرماني", en: "Amber Charizard", image: lens30.url, isNew: true, popularity: 41 },
  { slug: "dracaufeu-falaise", fr: "Dracaufeu Falaise", ar: "تنين الجرف", en: "Cliff Charizard", image: lens31.url, isNew: true, popularity: 39 },
  { slug: "dragon-givre", fr: "Dragon Givré", ar: "تنين الصقيع", en: "Frost Dragon", image: lens32.url, isNew: true, popularity: 37 },
  { slug: "dragon-onyx", fr: "Dragon Onyx", ar: "تنين أونيكس", en: "Onyx Dragon", image: lens33.url, isNew: true, popularity: 35 },
  { slug: "nuit-douce", fr: "Nuit Douce", ar: "ليلة هادئة", en: "Cozy Night", image: lens34.url, isNew: true, popularity: 33 },
  { slug: "chat-choque", fr: "Chat Choqué", ar: "قط مندهش", en: "Shocked Cat", image: lens35.url, isNew: true, popularity: 31 },
  { slug: "chat-safran", fr: "Chat Safran", ar: "قط زعفراني", en: "Saffron Cat", image: lens36.url, isNew: true, popularity: 29 },
  { slug: "chat-cobalt", fr: "Chat Cobalt", ar: "قط كوبالت", en: "Cobalt Cat", image: lens37.url, isNew: true, popularity: 27 },
  { slug: "majlis-blanc", fr: "Majlis Blanc", ar: "مجلس أبيض", en: "White Majlis", image: lens38.url, isNew: true, popularity: 25 },
  { slug: "majlis-nuit", fr: "Majlis Nuit", ar: "مجلس ليلي", en: "Night Majlis", image: lens39.url, isNew: true, popularity: 23 },

  { slug: "majlis-safran", fr: "Majlis Safran", ar: "مجلس زعفراني", en: "Saffron Majlis", image: lens40.url, isNew: true, popularity: 21 },
  { slug: "toile-urbaine", fr: "Toile Urbaine", ar: "نسيج المدينة", en: "Urban Web", image: lens41.url, isNew: true, popularity: 19 },
  { slug: "zellige-royal", fr: "Zellige Royal", ar: "زليج ملكي", en: "Royal Zellige", image: lens42.url, isNew: true, popularity: 18 },
  { slug: "atlas-berbere", fr: "Atlas Berbère", ar: "أطلس أمازيغي", en: "Berber Atlas", image: lens43.url, isNew: true, popularity: 17 },
  { slug: "kasbah-sunset", fr: "Kasbah Sunset", ar: "غروب القصبة", en: "Kasbah Sunset", image: lens44.url, isNew: true, popularity: 16 },
  { slug: "the-a-la-menthe", fr: "Thé à la Menthe", ar: "أتاي بالنعناع", en: "Mint Tea", image: lens45.url, isNew: true, popularity: 15 },
  { slug: "jardin-majorelle", fr: "Jardin Majorelle", ar: "حديقة ماجوريل", en: "Majorelle Garden", image: lens46.url, isNew: true, popularity: 14 },
  { slug: "bull-market", fr: "Bull Market", ar: "سوق صاعد", en: "Bull Market", image: lens47.url, isNew: true, popularity: 13 },
  { slug: "dollar-vision", fr: "Dollar Vision", ar: "رؤية الدولار", en: "Dollar Vision", image: lens48.url, isNew: true, popularity: 12 },
  { slug: "web-hustler", fr: "Web Hustler", ar: "ويب هاسلر", en: "Web Hustler", image: lens49.url, isNew: true, popularity: 11 },
  { slug: "night-trader", fr: "Night Trader", ar: "متداول الليل", en: "Night Trader", image: lens50.url, isNew: true, popularity: 10 },
  { slug: "million-mindset", fr: "Million Mindset", ar: "عقلية المليون", en: "Million Mindset", image: lens51.url, isNew: true, popularity: 9 },
  { slug: "rush-hour", fr: "Rush Hour", ar: "ساعة الذروة", en: "Rush Hour", image: lens52.url, isNew: true, popularity: 8 },
  { slug: "risk-reward", fr: "Risk & Reward", ar: "المخاطرة والمكافأة", en: "Risk & Reward", image: lens53.url, isNew: true, popularity: 7 },
  { slug: "digital-nomad", fr: "Digital Nomad", ar: "رحّالة رقمي", en: "Digital Nomad", image: lens54.url, isNew: true, popularity: 6 },
  { slug: "code-cash", fr: "Code & Cash", ar: "كود وكاش", en: "Code & Cash", image: lens55.url, isNew: true, popularity: 5 },
  { slug: "focus-mode", fr: "Focus Mode", ar: "وضع التركيز", en: "Focus Mode", image: lens56.url, isNew: true, popularity: 4 },
];

const CLUB_DESIGNS = [
  { slug: "fc-barcelone", club: "FC Barcelone", image: barcelone.url },
  { slug: "paris-saint-germain", club: "Paris Saint-Germain", image: psg.url },
  { slug: "manchester-united", club: "Manchester United", image: united.url },
  { slug: "manchester-city", club: "Manchester City", image: city.url },
  { slug: "liverpool", club: "Liverpool", image: liverpool.url },
  { slug: "arsenal", club: "Arsenal", image: arsenal.url },
  { slug: "chelsea", club: "Chelsea", image: chelsea.url },
  { slug: "bayern-munich", club: "Bayern Munich", image: bayern.url },
  { slug: "juventus", club: "Juventus", image: juventus.url },
  { slug: "ac-milan", club: "AC Milan", image: milan.url },
];

const ORIGINAL_SKINS: CameraLensSkin[] = SEEDS.map((s) => ({
  id: `lens-${s.slug}`,
  slug: s.slug,
  name: { fr: s.fr, ar: s.ar, en: s.en },
  description: DESC,
  image: s.image,
  gallery: [s.image],
  category: "camera-lens-skins",
  device: DEVICE,
  inStock: true,
  isNew: s.isNew,
  popularity: s.popularity,
}));

// Stable club slugs update a matching product in place, preserving its order-history ID.
export const CAMERA_LENS_SKINS: CameraLensSkin[] = [...ORIGINAL_SKINS];
for (const design of CLUB_DESIGNS) {
  const existingIndex = CAMERA_LENS_SKINS.findIndex((skin) => skin.slug === design.slug);
  const existing = CAMERA_LENS_SKINS[existingIndex];
  const skin: CameraLensSkin = {
    id: existing?.id ?? `lens-${design.slug}`,
    slug: existing?.slug ?? design.slug,
    name: { fr: `Sticker caméra – ${design.club}`, en: `Camera sticker – ${design.club}`, ar: `ملصق الكاميرا – ${design.club}` },
    description: {
      fr: `Affichez votre passion pour ${design.club} avec ce sticker décoratif pour la zone caméra de votre iPhone, aux couleurs du club et découpé autour des objectifs, du flash et des capteurs.`,
      en: `Show your passion for ${design.club} with this decorative iPhone camera skin in the club's colors, precisely cut around the lenses, flash and sensors.`,
      ar: DESC.ar,
    },
    image: design.image,
    gallery: [design.image],
    category: "camera-lens-skins",
    device: DEVICE,
    inStock: true,
    isNew: false,
    popularity: existing?.popularity ?? 3,
    imagePresentation: "full-phone",
  };
  if (existingIndex >= 0) CAMERA_LENS_SKINS[existingIndex] = skin;
  else CAMERA_LENS_SKINS.push(skin);
}

export function lensSkinBySlug(slug: string): CameraLensSkin | undefined {
  return CAMERA_LENS_SKINS.find((s) => s.slug === slug);
}
