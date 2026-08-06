import chatCurieux from "@/assets/skin-chat-curieux.jpg";
import chatOrange from "@/assets/skin-chat-orange.jpg";
import regardNoir from "@/assets/skin-regard-noir.jpg";
import soleilFelin from "@/assets/skin-soleil-felin.jpg";
import canardPop from "@/assets/skin-canard-pop.jpg";
import nuitSauvage from "@/assets/skin-nuit-sauvage.jpg";
import fleursPastel from "@/assets/skin-fleurs-pastel.jpg";
import vagueRetro from "@/assets/skin-vague-retro.jpg";

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
    id: "chat-curieux",
    name: { fr: "Chat Curieux", ar: "قطة فضولية", en: "Curious Cat" },
    image: chatCurieux,
    collection: "artistique",
    isNew: true,
    isBestseller: true,
    popularity: 98,
  },
  {
    id: "chat-orange",
    name: { fr: "Chat Orange", ar: "قطة برتقالية", en: "Orange Cat" },
    image: chatOrange,
    collection: "artistique",
    isNew: true,
    isBestseller: true,
    popularity: 95,
  },
  {
    id: "regard-noir",
    name: { fr: "Regard Noir", ar: "نظرة سوداء", en: "Black Gaze" },
    image: regardNoir,
    collection: "minimal",
    isNew: false,
    isBestseller: true,
    popularity: 92,
  },
  {
    id: "soleil-felin",
    name: { fr: "Soleil Félin", ar: "شمس القطط", en: "Feline Sun" },
    image: soleilFelin,
    collection: "artistique",
    isNew: true,
    isBestseller: false,
    popularity: 88,
  },
  {
    id: "canard-pop",
    name: { fr: "Canard Pop", ar: "بطة بوب", en: "Pop Duck" },
    image: canardPop,
    collection: "urbain",
    isNew: true,
    isBestseller: false,
    popularity: 84,
  },
  {
    id: "nuit-sauvage",
    name: { fr: "Nuit Sauvage", ar: "ليل بري", en: "Wild Night" },
    image: nuitSauvage,
    collection: "urbain",
    isNew: false,
    isBestseller: false,
    popularity: 81,
  },
  {
    id: "fleurs-pastel",
    name: { fr: "Fleurs Pastel", ar: "زهور باستيل", en: "Pastel Flowers" },
    image: fleursPastel,
    collection: "elegance",
    isNew: false,
    isBestseller: false,
    popularity: 79,
  },
  {
    id: "vague-retro",
    name: { fr: "Vague Rétro", ar: "موجة ريترو", en: "Retro Wave" },
    image: vagueRetro,
    collection: "elegance",
    isNew: false,
    isBestseller: false,
    popularity: 76,
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
