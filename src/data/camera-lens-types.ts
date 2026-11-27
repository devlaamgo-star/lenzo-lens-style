import type { Lang } from "./products";

export type CameraLensSkin = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  importKey?: string;
  sku?: string;
  sortOrder?: number;
  tags?: string[];
  altFr?: string;
  imageWidth?: number;
  imageHeight?: number;
  responsiveCover?: { url: string; width: number; height: number }[];
  image: string;
  gallery: string[];
  category: "camera-lens-skins";
  device: string;
  inStock: boolean;
  isNew: boolean;
  popularity: number;
  imagePresentation?: "full-phone";
  /** Highlighted product-scope notice shown on the product page and quick view. */
  scopeNote?: Record<Lang, string>;
};

export const CAMERA_ONLY_NOTE: Record<Lang, string> = {
  fr: "Skin pour le module caméra uniquement. Téléphone et skin arrière non inclus.",
  en: "Skin for the camera module only. Phone and back skin not included.",
  ar: "سكين لوحدة الكاميرا فقط. الهاتف وسكين الظهر غير متضمنين.",
};

