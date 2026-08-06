import type { Lang } from "./products";

import a1 from "@/assets/air/air-1.webp.asset.json";
import a2 from "@/assets/air/air-2.webp.asset.json";
import a3 from "@/assets/air/air-3.webp.asset.json";
import a4 from "@/assets/air/air-4.webp.asset.json";
import a5 from "@/assets/air/air-5.webp.asset.json";
import a6 from "@/assets/air/air-6.webp.asset.json";
import a7 from "@/assets/air/air-7.webp.asset.json";
import a8 from "@/assets/air/air-8.webp.asset.json";
import a9 from "@/assets/air/air-9.webp.asset.json";
import a10 from "@/assets/air/air-10.webp.asset.json";

export type IphoneAirSkin = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  gallery: string[];
  category: "iphone-air-skins";
  device: string;
  inStock: boolean;
  isNew: boolean;
  popularity: number;
};

const DESC: Record<Lang, string> = {
  fr: "Skin décoratif imprimé conçu spécialement pour l’iPhone Air. Film fin, découpes précises autour des objectifs, du flash et des capteurs, pose et retrait sans résidu.",
  ar: "سكين زخرفي مطبوع مصمم خصيصًا لجهاز iPhone Air، بغشاء رفيع وقصّات دقيقة حول العدسات والفلاش والمستشعرات، سهل التركيب والإزالة دون بقايا.",
  en: "Printed decorative skin designed specifically for iPhone Air. Ultra-thin film with precise cutouts around lenses, flash and sensors, residue-free removal.",
};

const DEVICE = "iPhone Air";

const SEEDS: {
  slug: string;
  fr: string;
  ar: string;
  en: string;
  image: string;
  isNew: boolean;
  popularity: number;
}[] = [
  { slug: "air-couchant", fr: "Air Couchant", ar: "غروب إير", en: "Air Sunset", image: a1.url, isNew: true, popularity: 96 },
  { slug: "air-feuillage", fr: "Air Feuillage", ar: "أوراق إير", en: "Air Foliage", image: a2.url, isNew: true, popularity: 94 },
  { slug: "air-vigie", fr: "Air Vigie", ar: "برج إير", en: "Air Lookout", image: a3.url, isNew: true, popularity: 92 },
  { slug: "air-cobalt", fr: "Air Cobalt", ar: "إير كوبالت", en: "Air Cobalt", image: a4.url, isNew: true, popularity: 90 },
  { slug: "air-azur", fr: "Air Azur", ar: "إير أزرق", en: "Air Azure", image: a5.url, isNew: true, popularity: 88 },
  { slug: "air-ciel", fr: "Air Ciel", ar: "سماء إير", en: "Air Sky", image: a6.url, isNew: true, popularity: 86 },
  { slug: "air-minimal", fr: "Air Minimal", ar: "إير مينيمال", en: "Air Minimal", image: a7.url, isNew: true, popularity: 84 },
  { slug: "air-mandarine", fr: "Air Mandarine", ar: "إير ماندرين", en: "Air Tangerine", image: a8.url, isNew: true, popularity: 82 },
  { slug: "air-onyx", fr: "Air Onyx", ar: "إير أونيكس", en: "Air Onyx", image: a9.url, isNew: true, popularity: 80 },
  { slug: "air-nuit-douce", fr: "Air Nuit Douce", ar: "ليلة إير الهادئة", en: "Air Cozy Night", image: a10.url, isNew: true, popularity: 78 },
];

export const IPHONE_AIR_SKINS: IphoneAirSkin[] = SEEDS.map((s) => ({
  id: `air-${s.slug}`,
  slug: s.slug,
  name: { fr: s.fr, ar: s.ar, en: s.en },
  description: DESC,
  image: s.image,
  gallery: [s.image],
  category: "iphone-air-skins",
  device: DEVICE,
  inStock: true,
  isNew: s.isNew,
  popularity: s.popularity,
}));

export function iphoneAirSkinBySlug(slug: string): IphoneAirSkin | undefined {
  return IPHONE_AIR_SKINS.find((s) => s.slug === slug);
}
