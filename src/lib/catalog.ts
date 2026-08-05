import orClassique from "@/assets/skin-or-classique.jpg";
import noirMat from "@/assets/skin-noir-mat.jpg";
import argentMinimal from "@/assets/skin-argent-minimal.jpg";
import bleuNuit from "@/assets/skin-bleu-nuit.jpg";
import roseDore from "@/assets/skin-rose-dore.jpg";
import vertEmeraude from "@/assets/skin-vert-emeraude.jpg";
import cuivreUrbain from "@/assets/skin-cuivre-urbain.jpg";
import blancPerle from "@/assets/skin-blanc-perle.jpg";

export type Lang = "fr" | "ar" | "en";

export type CollectionId = "minimal" | "artistique" | "elegance" | "urbain";

export type Design = {
  id: string;
  name: Record<Lang, string>;
  image: string;
  collection: CollectionId;
  isNew: boolean;
  isBestseller: boolean;
  popularity: number;
};

export const DESIGNS: Design[] = [
  {
    id: "or-classique",
    name: { fr: "Or Classique", ar: "ذهبي كلاسيكي", en: "Classic Gold" },
    image: orClassique,
    collection: "elegance",
    isNew: false,
    isBestseller: true,
    popularity: 98,
  },
  {
    id: "noir-mat",
    name: { fr: "Noir Mat", ar: "أسود مطفي", en: "Matte Black" },
    image: noirMat,
    collection: "minimal",
    isNew: false,
    isBestseller: true,
    popularity: 96,
  },
  {
    id: "argent-minimal",
    name: { fr: "Argent Minimal", ar: "فضي بسيط", en: "Minimal Silver" },
    image: argentMinimal,
    collection: "minimal",
    isNew: false,
    isBestseller: false,
    popularity: 84,
  },
  {
    id: "bleu-nuit",
    name: { fr: "Bleu Nuit", ar: "أزرق ليلي", en: "Midnight Blue" },
    image: bleuNuit,
    collection: "urbain",
    isNew: true,
    isBestseller: false,
    popularity: 88,
  },
  {
    id: "rose-dore",
    name: { fr: "Rose Doré", ar: "ذهبي وردي", en: "Rose Gold" },
    image: roseDore,
    collection: "artistique",
    isNew: true,
    isBestseller: true,
    popularity: 92,
  },
  {
    id: "vert-emeraude",
    name: { fr: "Vert Émeraude", ar: "أخضر زمردي", en: "Emerald Green" },
    image: vertEmeraude,
    collection: "artistique",
    isNew: true,
    isBestseller: false,
    popularity: 79,
  },
  {
    id: "cuivre-urbain",
    name: { fr: "Cuivre Urbain", ar: "نحاسي حضري", en: "Urban Copper" },
    image: cuivreUrbain,
    collection: "urbain",
    isNew: true,
    isBestseller: false,
    popularity: 81,
  },
  {
    id: "blanc-perle",
    name: { fr: "Blanc Perle", ar: "أبيض لؤلؤي", en: "Pearl White" },
    image: blancPerle,
    collection: "elegance",
    isNew: false,
    isBestseller: false,
    popularity: 74,
  },
];

export function designById(id: string): Design | undefined {
  return DESIGNS.find((d) => d.id === id);
}

export const IPHONE_MODELS = [
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max",
  "iPhone 12",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone 13",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14",
  "iPhone 14 Plus",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Plus",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
] as const;

export const PACK_PRICE = 99;
export const PACK_OLD_PRICE = 147;
export const PACK_SIZE = 3;

export const WHATSAPP_NUMBER = "212600000000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
