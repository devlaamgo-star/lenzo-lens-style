import { type CollectionId as PCollectionId } from "@/data/products";
import { FULL_BODY_SKINS, skinBySlug, type FullBodySkin } from "@/data/full-body-skins";
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
import { ANIME_SKINS, animeSkinBySlug, type AnimeSkin } from "@/data/anime-skins";

export type { FullBodySkin, CameraLensSkin, BackLensSkin, IphoneAirSkin, AnimeSkin };
export { FULL_BODY_SKINS, skinBySlug };
export { CAMERA_LENS_SKINS, lensSkinBySlug };
export { BACK_LENS_SKINS, backLensSkinBySlug };
export { IPHONE_AIR_SKINS, iphoneAirSkinBySlug };
export { ANIME_SKINS, animeSkinBySlug };

/** Stickers caméra : uniquement les visuels réellement fournis (objectifs) */
export const CAMERA_STICKERS: CameraLensSkin[] = CAMERA_LENS_SKINS;

export const FULL_SKIN_PRICE = 149;

export const LENS_SKIN_PRICE = 79;

export const BACK_LENS_SKIN_PRICE = 129;

export const AIR_SKIN_PRICE = 49;

export const ANIME_SKIN_PRICE = 149;

export type Lang = "fr" | "ar" | "en";

export type CollectionId = PCollectionId;

export type Design = CameraLensSkin;

export const DESIGNS: Design[] = CAMERA_LENS_SKINS;

export function designById(id: string): Design | undefined {
  return DESIGNS.find((d) => d.id === id);
}


export const IPHONE_MODELS = ["iPhone 17 Pro", "iPhone 17 Pro Max"] as const;

/** Aucun modèle présélectionné : le client doit choisir. */
export const DEFAULT_IPHONE_MODEL = "";

export const PACK_PRICE = 99;
export const PACK_OLD_PRICE = 147;
export const PACK_SIZE = 3;

export const WHATSAPP_NUMBER = "212666256545";
/** Local display format for Moroccan customers */
export const WHATSAPP_DISPLAY_LOCAL = "06 66 25 65 45";
/** International display format */
export const WHATSAPP_DISPLAY_INTL = "+212 666 256 545";

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
