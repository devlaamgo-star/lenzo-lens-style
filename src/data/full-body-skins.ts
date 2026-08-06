import type { Lang } from "./products";

import skin1 from "@/assets/skins/skin-1.webp.asset.json";
import skin2 from "@/assets/skins/skin-2.webp.asset.json";
import skin3 from "@/assets/skins/skin-3.webp.asset.json";
import skin4 from "@/assets/skins/skin-4.webp.asset.json";
import skin5 from "@/assets/skins/skin-5.webp.asset.json";
import skin6 from "@/assets/skins/skin-6.jpg.asset.json";
import skin7 from "@/assets/skins/skin-7.webp.asset.json";
import skin8 from "@/assets/skins/skin-8.webp.asset.json";
import skin9 from "@/assets/skins/skin-9.webp.asset.json";
import skin10 from "@/assets/skins/skin-10.webp.asset.json";
import skin12 from "@/assets/skins/skin-12.webp.asset.json";
import skin13 from "@/assets/skins/skin-13.webp.asset.json";
import skin14 from "@/assets/skins/skin-14.webp.asset.json";
import skin15 from "@/assets/skins/skin-15.webp.asset.json";
import skin16 from "@/assets/skins/skin-16.webp.asset.json";
import skin17 from "@/assets/skins/skin-17.webp.asset.json";
import skin18 from "@/assets/skins/skin-18.webp.asset.json";
import skin19 from "@/assets/skins/skin-19.webp.asset.json";
import skin20 from "@/assets/skins/skin-20.webp.asset.json";
import skin21 from "@/assets/skins/skin-21.webp.asset.json";

export type FullBodySkin = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  gallery: string[];
  category: "full-body-skins";
  device: string;
  inStock: boolean;
  isNew: boolean;
  popularity: number;
};

const DESC: Record<Lang, string> = {
  fr: "Skin intégrale découpée avec précision pour personnaliser l’apparence de votre iPhone tout en conservant un rendu fin et élégant.",
  ar: "سكين كاملة مقصوصة بدقة لتخصيص مظهر جهاز iPhone مع الحفاظ على مظهر رفيع وأنيق.",
  en: "Full-body skin precisely cut to personalise the look of your iPhone while keeping a thin, elegant finish.",
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
  { slug: "vague-neon", fr: "Vague Néon", ar: "موجة نيون", en: "Neon Wave", image: skin1.url, isNew: true, popularity: 98 },
  { slug: "marbre-cosmique", fr: "Marbre Cosmique", ar: "رخام كوني", en: "Cosmic Marble", image: skin2.url, isNew: true, popularity: 96 },
  { slug: "relief-emeraude", fr: "Relief Émeraude", ar: "تضاريس زمردية", en: "Emerald Relief", image: skin3.url, isNew: true, popularity: 93 },
  { slug: "orange-racing", fr: "Orange Racing", ar: "برتقالي السباق", en: "Orange Racing", image: skin4.url, isNew: true, popularity: 95 },
  { slug: "marbre-dore", fr: "Marbre Doré", ar: "رخام ذهبي", en: "Golden Marble", image: skin5.url, isNew: true, popularity: 94 },
  { slug: "plume-ivoire", fr: "Plume Ivoire", ar: "ريشة عاجية", en: "Ivory Feather", image: skin6.url, isNew: true, popularity: 90 },
  { slug: "regard-de-meduse", fr: "Regard de Méduse", ar: "نظرة ميدوسا", en: "Medusa Gaze", image: skin7.url, isNew: true, popularity: 92 },
  { slug: "doodle-turquoise", fr: "Doodle Turquoise", ar: "دودل فيروزي", en: "Turquoise Doodle", image: skin8.url, isNew: true, popularity: 88 },
  { slug: "doodle-violet", fr: "Doodle Violet", ar: "دودل بنفسجي", en: "Violet Doodle", image: skin9.url, isNew: true, popularity: 87 },
  { slug: "ombre-metallique", fr: "Ombre Métallique", ar: "ظل معدني", en: "Metallic Shade", image: skin10.url, isNew: true, popularity: 86 },
  { slug: "marbre-atlas", fr: "Marbre Atlas", ar: "رخام أطلس", en: "Atlas Marble", image: skin12.url, isNew: true, popularity: 85 },
  { slug: "jade-royal", fr: "Jade Royal", ar: "يشم ملكي", en: "Royal Jade", image: skin13.url, isNew: true, popularity: 84 },
  { slug: "nuit-graphite", fr: "Nuit Graphite", ar: "ليل غرافيتي", en: "Graphite Night", image: skin14.url, isNew: true, popularity: 83 },
  { slug: "bleu-mineral", fr: "Bleu Minéral", ar: "أزرق معدني", en: "Mineral Blue", image: skin15.url, isNew: true, popularity: 82 },
  { slug: "lion-solaire", fr: "Lion Solaire", ar: "أسد شمسي", en: "Solar Lion", image: skin16.url, isNew: true, popularity: 81 },
  { slug: "coq-rebelle", fr: "Coq Rebelle", ar: "ديك متمرد", en: "Rebel Rooster", image: skin17.url, isNew: true, popularity: 80 },
  { slug: "ligne-urbaine", fr: "Ligne Urbaine", ar: "خط حضري", en: "Urban Line", image: skin18.url, isNew: true, popularity: 79 },
  { slug: "leopard-pastel", fr: "Léopard Pastel", ar: "نمر باستيل", en: "Pastel Leopard", image: skin19.url, isNew: true, popularity: 78 },
  { slug: "leopard-azur", fr: "Léopard Azur", ar: "نمر سماوي", en: "Azure Leopard", image: skin20.url, isNew: true, popularity: 77 },
  { slug: "zebre-ivoire", fr: "Zèbre Ivoire", ar: "حمار وحشي عاجي", en: "Ivory Zebra", image: skin21.url, isNew: true, popularity: 76 },
];

export const FULL_BODY_SKINS: FullBodySkin[] = SEEDS.map((s) => ({
  id: `skin-${s.slug}`,
  slug: s.slug,
  name: { fr: s.fr, ar: s.ar, en: s.en },
  description: DESC,
  image: s.image,
  gallery: [s.image],
  category: "full-body-skins",
  device: DEVICE,
  inStock: true,
  isNew: s.isNew,
  popularity: s.popularity,
}));

export function skinBySlug(slug: string): FullBodySkin | undefined {
  return FULL_BODY_SKINS.find((s) => s.slug === slug);
}
