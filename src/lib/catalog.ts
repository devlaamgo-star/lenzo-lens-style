import { PRODUCTS, type Product, type CollectionId as PCollectionId } from "@/data/products";

export type Lang = "fr" | "ar" | "en";

export type CollectionId = PCollectionId;

export type Design = Product;

export const DESIGNS: Design[] = PRODUCTS;

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
