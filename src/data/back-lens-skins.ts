import type { BackLensSkin } from "./archive/back-lens-skins";
import { ORGANIZED_BACK_LENS_PRODUCTS } from "./organized-back-lens-products";
import { BATCH02_BACK_LENS_PRODUCTS } from "./batch02-back-lens-products";
export type { BackLensSkin } from "./archive/back-lens-skins";

/** Active ready-made designs only. Original designs remain in archive for existing orders. */
export type ActiveBackLensSkin = BackLensSkin & {
  externalReference?: string;
  sourceProductNumber?: number;
  displayOrder?: number;
};

/** Match imports by external reference, never by similar artwork or source numbering. */
export function mergeBackLensProducts(existing: ActiveBackLensSkin[], incoming: ActiveBackLensSkin[]): ActiveBackLensSkin[] {
  const products = [...existing];
  for (const product of incoming) {
    const index = products.findIndex((current) => product.externalReference && current.externalReference === product.externalReference);
    if (index < 0) products.push(product);
    else products[index] = product;
  }
  return products;
}

export const BACK_LENS_SKINS = mergeBackLensProducts(ORGANIZED_BACK_LENS_PRODUCTS, BATCH02_BACK_LENS_PRODUCTS);

export function backLensSkinBySlug(slug: string): BackLensSkin | undefined {
  return BACK_LENS_SKINS.find((s) => s.slug === slug);
}
