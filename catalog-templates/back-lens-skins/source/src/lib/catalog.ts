import { type CollectionId as PCollectionId } from "@/data/products";
import {
  CAMERA_LENS_SKINS,
  lensSkinBySlug,
  type CameraLensSkin,
} from "@/data/camera-lens-skins";
import {
  BACK_LENS_SKINS,
  backLensSkinBySlug,
  type BackLensSkin,
} from "@/data/back-lens-skins";
import {
  IPHONE_AIR_SKINS,
  iphoneAirSkinBySlug,
  type IphoneAirSkin,
} from "@/data/iphone-air-skins";
export type { CameraLensSkin, BackLensSkin, IphoneAirSkin };
export { CAMERA_LENS_SKINS, lensSkinBySlug };
export { BACK_LENS_SKINS, backLensSkinBySlug };
export { IPHONE_AIR_SKINS, iphoneAirSkinBySlug };

/** Stickers caméra : uniquement les visuels réellement fournis (objectifs) */
export const CAMERA_STICKERS: CameraLensSkin[] = CAMERA_LENS_SKINS;

export const LENS_SKIN_PRICE = 79;

export const BACK_LENS_SKIN_PRICE = 129;

export const AIR_SKIN_PRICE = 79;


export type Lang = "fr" | "ar" | "en";

export type CollectionId = PCollectionId;

export type Design = CameraLensSkin;

export const DESIGNS: Design[] = CAMERA_LENS_SKINS;

export function designById(id: string): Design | undefined {
  return DESIGNS.find((d) => d.id === id);
}


export const IPHONE_MODELS = ["iPhone 17 Pro", "iPhone 17 Pro Max"] as const;
export const IPHONE_AIR_MODELS = ["iPhone Air"] as const;
/** Modèles proposés selon la catégorie : la collection iPhone Air n'accepte que l'iPhone Air. */
export function modelsForCategory(category: string): readonly string[] {
  return category === "air" ? IPHONE_AIR_MODELS : IPHONE_MODELS;
}

/** Aucun modèle présélectionné : le client doit choisir. */
export const DEFAULT_IPHONE_MODEL = "";

export const PACK_PRICE = 149;
export const PACK_OLD_PRICE = 197;
export const PACK_SIZE = 3;

export const WHATSAPP_NUMBER = "212694728194";
/** Local display format for Moroccan customers */
export const WHATSAPP_DISPLAY_LOCAL = "+212 694-728194";
/** International display format */
export const WHATSAPP_DISPLAY_INTL = "+212 694-728194";
export const PHONE_LINK = "tel:+212694728194";
export const CONTACT_EMAIL = "skinup.ma@gmail.com";
export const INSTAGRAM_LINK = "https://www.instagram.com/skinup.ma/";
export const TIKTOK_LINK = "https://www.tiktok.com/@skinup.ma";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Tétouan",
  "Kénitra",
  "Salé",
  "El Jadida",
  "Mohammedia",
  "Beni Mellal",
  "Nador",
  "Safi",
] as const;
