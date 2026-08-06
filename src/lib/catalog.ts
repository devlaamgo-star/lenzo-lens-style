import { PRODUCTS, type Product, type CollectionId as PCollectionId } from "@/data/products";
import { FULL_BODY_SKINS, skinBySlug, type FullBodySkin } from "@/data/full-body-skins";
import {
  CAMERA_LENS_SKINS,
  lensSkinBySlug,
  type CameraLensSkin,
} from "@/data/camera-lens-skins";

export type { FullBodySkin, CameraLensSkin };
export { FULL_BODY_SKINS, skinBySlug };
export { CAMERA_LENS_SKINS, lensSkinBySlug };

/** Camera stickers (small decorative camera-module stickers) */
export const CAMERA_STICKERS: Product[] = PRODUCTS;

export const FULL_SKIN_PRICE = 149;

export const LENS_SKIN_PRICE = 79;

export type Lang = "fr" | "ar" | "en";

export type CollectionId = PCollectionId;

export type Design = Product;

export const DESIGNS: Design[] = PRODUCTS;

export function designById(id: string): Design | undefined {
  return DESIGNS.find((d) => d.id === id);
}

export const IPHONE_MODELS = ["iPhone 17 Pro Max"] as const;

export const DEFAULT_IPHONE_MODEL = "iPhone 17 Pro Max";

export const PACK_PRICE = 99;
export const PACK_OLD_PRICE = 147;
export const PACK_SIZE = 3;

export const WHATSAPP_NUMBER = "212600000000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
