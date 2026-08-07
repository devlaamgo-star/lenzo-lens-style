import type { Lang } from "./products";

import bl1 from "@/assets/backlens/bl-1.webp.asset.json";
import bl2 from "@/assets/backlens/bl-2.webp.asset.json";
import bl3 from "@/assets/backlens/bl-3.webp.asset.json";
import bl4 from "@/assets/backlens/bl-4.webp.asset.json";
import bl5 from "@/assets/backlens/bl-5.webp.asset.json";
import bl6 from "@/assets/backlens/bl-6.webp.asset.json";
import bl7 from "@/assets/backlens/bl-7.webp.asset.json";
import bl8 from "@/assets/backlens/bl-8.webp.asset.json";
import bl9 from "@/assets/backlens/bl-9.webp.asset.json";
import bl10 from "@/assets/backlens/bl-10.webp.asset.json";
import bl11 from "@/assets/backlens/bl-11.webp.asset.json";
import bl12 from "@/assets/backlens/bl-12.webp.asset.json";
import bl13 from "@/assets/backlens/bl-13.webp.asset.json";
import bl14 from "@/assets/backlens/bl-14.webp.asset.json";
import bl15 from "@/assets/backlens/bl-15.webp.asset.json";
import bl16 from "@/assets/backlens/bl-16.png.asset.json";
import bl17 from "@/assets/backlens/bl-17.webp.asset.json";
import bl18 from "@/assets/backlens/bl-18.webp.asset.json";
import bl19 from "@/assets/backlens/bl-19.webp.asset.json";
import bl20 from "@/assets/backlens/bl-20.webp.asset.json";
import bl21 from "@/assets/backlens/bl-21.webp.asset.json";
import bl22 from "@/assets/backlens/bl-22.webp.asset.json";
import bl23 from "@/assets/backlens/bl-23.webp.asset.json";
import bl24 from "@/assets/backlens/bl-24.webp.asset.json";
import bl25 from "@/assets/backlens/bl-25.webp.asset.json";
import bl26 from "@/assets/backlens/bl-26.webp.asset.json";
import bl27 from "@/assets/backlens/bl-27.webp.asset.json";
import bl28 from "@/assets/backlens/bl-28.webp.asset.json";
import bl29 from "@/assets/backlens/bl-29.webp.asset.json";

export type BackLensSkin = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  gallery: string[];
  category: "back-and-lens-skins";
  device: string;
  inStock: boolean;
  isNew: boolean;
  popularity: number;
};

const DESC: Record<Lang, string> = {
  fr: "Skin décoratif en deux parties : un panneau pour le dos de l’iPhone et un panneau assorti pour la zone caméra. Découpes précises autour des objectifs, du flash et des capteurs, pour un design parfaitement coordonné.",
  ar: "سكين زخرفي من قطعتين: لوحة لظهر الـ iPhone ولوحة مطابقة لمنطقة الكاميرا، بقصّات دقيقة حول العدسات والفلاش والمستشعرات.",
  en: "Two-piece decorative skin: one panel for the iPhone back and a matching panel for the camera area, with precise cutouts around lenses, flash and sensors.",
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
  { slug: "nuit-etoilee", fr: "Nuit Étoilée", ar: "ليلة مرصعة", en: "Starry Night", image: bl1.url, isNew: true, popularity: 96 },
  { slug: "horizon-celeste", fr: "Horizon Céleste", ar: "أفق سماوي", en: "Celestial Horizon", image: bl2.url, isNew: true, popularity: 94 },
  { slug: "cite-dragon", fr: "Cité Dragon", ar: "مدينة التنين", en: "Dragon City", image: bl3.url, isNew: true, popularity: 92 },
  { slug: "leopard-ambre", fr: "Léopard Ambré", ar: "فهد كهرماني", en: "Amber Leopard", image: bl4.url, isNew: true, popularity: 90 },
  { slug: "canard-comptoir", fr: "Canard Comptoir", ar: "بطة الحانة", en: "Counter Duck", image: bl5.url, isNew: true, popularity: 88 },
  { slug: "canard-smoking", fr: "Canard Smoking", ar: "بطة أنيقة", en: "Tuxedo Duck", image: bl6.url, isNew: true, popularity: 86 },
  { slug: "canard-cobalt", fr: "Canard Cobalt", ar: "بطة كوبالت", en: "Cobalt Duck", image: bl7.url, isNew: true, popularity: 84 },
  { slug: "canard-nocturne", fr: "Canard Nocturne", ar: "بطة ليلية", en: "Night Duck", image: bl8.url, isNew: true, popularity: 82 },
  { slug: "envol-urbain", fr: "Envol Urbain", ar: "إقلاع حضري", en: "Urban Takeoff", image: bl9.url, isNew: true, popularity: 80 },
  { slug: "zellige-azur", fr: "Zellige Azur", ar: "زليج أزرق", en: "Azure Zellige", image: bl10.url, isNew: true, popularity: 79 },
  { slug: "marrakech-sunset", fr: "Marrakech Coucher", ar: "غروب مراكش", en: "Marrakech Sunset", image: bl11.url, isNew: true, popularity: 78 },
  { slug: "jardin-cobalt", fr: "Jardin Cobalt", ar: "حديقة كوبالت", en: "Cobalt Garden", image: bl12.url, isNew: true, popularity: 77 },
  { slug: "palmeraie-verte", fr: "Palmeraie Verte", ar: "واحة خضراء", en: "Green Palm Grove", image: bl13.url, isNew: true, popularity: 76 },
  { slug: "zellige-noir-or", fr: "Zellige Noir & Or", ar: "زليج أسود وذهبي", en: "Black & Gold Zellige", image: bl14.url, isNew: true, popularity: 75 },
  { slug: "porte-terracotta", fr: "Porte Terracotta", ar: "باب طيني", en: "Terracotta Door", image: bl15.url, isNew: true, popularity: 74 },
  { slug: "dunes-dorees", fr: "Dunes Dorées", ar: "كثبان ذهبية", en: "Golden Dunes", image: bl16.url, isNew: true, popularity: 73 },
  { slug: "nuit-lanterne", fr: "Nuit Lanterne", ar: "ليلة الفانوس", en: "Lantern Night", image: bl17.url, isNew: true, popularity: 72 },
  { slug: "tapis-berbere", fr: "Tapis Berbère", ar: "زربية أمازيغية", en: "Berber Rug", image: bl18.url, isNew: true, popularity: 71 },
  { slug: "medina-collage", fr: "Médina Collage", ar: "كولاج المدينة", en: "Medina Collage", image: bl19.url, isNew: true, popularity: 70 },
  { slug: "success-bear", fr: "Success Bear", ar: "دب النجاح", en: "Success Bear", image: bl20.url, isNew: true, popularity: 99 },
  { slug: "millionaire-mindset", fr: "Millionaire Mindset", ar: "عقلية المليونير", en: "Millionaire Mindset", image: bl21.url, isNew: true, popularity: 98 },
  { slug: "crypto-bull", fr: "Crypto Bull", ar: "ثور الكريبتو", en: "Crypto Bull", image: bl22.url, isNew: true, popularity: 97 },
  { slug: "hustle-mindset", fr: "Hustle Mindset", ar: "عقلية الكفاح", en: "Hustle Mindset", image: bl23.url, isNew: true, popularity: 96 },
  { slug: "wealth-mode", fr: "Wealth Mode", ar: "وضع الثراء", en: "Wealth Mode", image: bl24.url, isNew: true, popularity: 95 },
  { slug: "designer-mindset", fr: "Designer Mindset", ar: "عقلية المصمم", en: "Designer Mindset", image: bl25.url, isNew: true, popularity: 94 },
  { slug: "crypto-shark", fr: "Crypto Shark", ar: "قرش الكريبتو", en: "Crypto Shark", image: bl26.url, isNew: true, popularity: 93 },
  { slug: "discipline", fr: "Discipline", ar: "الانضباط", en: "Discipline", image: bl27.url, isNew: true, popularity: 92 },
  { slug: "crypto-city", fr: "Crypto City", ar: "مدينة الكريبتو", en: "Crypto City", image: bl28.url, isNew: true, popularity: 91 },
  { slug: "build-wealth-lion", fr: "Build Wealth Lion", ar: "أسد بناء الثروة", en: "Build Wealth Lion", image: bl29.url, isNew: true, popularity: 90 },
];

export const BACK_LENS_SKINS: BackLensSkin[] = SEEDS.map((s) => ({
  id: `backlens-${s.slug}`,
  slug: s.slug,
  name: { fr: s.fr, ar: s.ar, en: s.en },
  description: DESC,
  image: s.image,
  gallery: [s.image],
  category: "back-and-lens-skins",
  device: DEVICE,
  inStock: true,
  isNew: s.isNew,
  popularity: s.popularity,
}));

export function backLensSkinBySlug(slug: string): BackLensSkin | undefined {
  return BACK_LENS_SKINS.find((s) => s.slug === slug);
}
