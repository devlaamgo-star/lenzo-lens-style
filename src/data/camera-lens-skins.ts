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
];

export const CAMERA_LENS_SKINS: CameraLensSkin[] = SEEDS.map((s) => ({
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

export function lensSkinBySlug(slug: string): CameraLensSkin | undefined {
  return CAMERA_LENS_SKINS.find((s) => s.slug === slug);
}
