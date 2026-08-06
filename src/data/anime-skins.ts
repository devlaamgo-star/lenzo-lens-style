import type { Lang } from "./products";

import a1 from "@/assets/anime/anime-1.webp.asset.json";
import a2 from "@/assets/anime/anime-2.webp.asset.json";
import a3 from "@/assets/anime/anime-3.webp.asset.json";
import a4 from "@/assets/anime/anime-4.webp.asset.json";
import a5 from "@/assets/anime/anime-5.webp.asset.json";
import a6 from "@/assets/anime/anime-6.webp.asset.json";
import a7 from "@/assets/anime/anime-7.webp.asset.json";

export type AnimeSkin = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  gallery: string[];
  category: "anime-skins";
  device: string;
  inStock: boolean;
  isNew: boolean;
  popularity: number;
};

const DESC: Record<Lang, string> = {
  fr: "Skin décoratif imprimé au design inspiré de l’univers manga. Film fin, découpes précises autour des objectifs, du flash et des capteurs, pose et retrait sans résidu.",
  ar: "سكين زخرفي مطبوع بتصميم مستوحى من عالم المانغا، غشاء رفيع وقصّات دقيقة حول العدسات والفلاش والمستشعرات، سهل التركيب والإزالة دون بقايا.",
  en: "Printed decorative skin with a manga-inspired design. Ultra-thin film with precise cutouts around lenses, flash and sensors, residue-free removal.",
};

const DEVICE = "iPhone 17 Pro Max";

const SEEDS: {
  slug: string;
  fr: string;
  ar: string;
  en: string;
  image: string;
  isNew: boolean;
  popularity: number;
}[] = [
  { slug: "esprit-dragon", fr: "Esprit Dragon", ar: "روح التنين", en: "Dragon Spirit", image: a1.url, isNew: true, popularity: 96 },
  { slug: "lame-fantome", fr: "Lame Fantôme", ar: "النصل الشبح", en: "Ghost Blade", image: a2.url, isNew: true, popularity: 94 },
  { slug: "edition-mecha", fr: "Édition Mecha", ar: "إصدار ميكا", en: "Mecha Edition", image: a3.url, isNew: true, popularity: 92 },
  { slug: "esprit-violet", fr: "Esprit Violet", ar: "روح بنفسجية", en: "Violet Spirit", image: a4.url, isNew: true, popularity: 90 },
  { slug: "guerrier-sombre", fr: "Guerrier Sombre", ar: "المحارب المظلم", en: "Dark Warrior", image: a5.url, isNew: true, popularity: 88 },
  { slug: "energie-rouge", fr: "Énergie Rouge", ar: "طاقة حمراء", en: "Red Energy", image: a6.url, isNew: true, popularity: 86 },
  { slug: "vision-manga", fr: "Vision Manga", ar: "رؤية مانغا", en: "Manga Vision", image: a7.url, isNew: true, popularity: 84 },
];

export const ANIME_SKINS: AnimeSkin[] = SEEDS.map((s) => ({
  id: `anime-${s.slug}`,
  slug: s.slug,
  name: { fr: s.fr, ar: s.ar, en: s.en },
  description: DESC,
  image: s.image,
  gallery: [s.image],
  category: "anime-skins",
  device: DEVICE,
  inStock: true,
  isNew: s.isNew,
  popularity: s.popularity,
}));

export function animeSkinBySlug(slug: string): AnimeSkin | undefined {
  return ANIME_SKINS.find((s) => s.slug === slug);
}
