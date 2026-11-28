import type { BackLensSkin } from "./archive/back-lens-skins";
import { OPTIMIZED43_BACK_LENS_PRODUCTS } from "./back-lens-optimized43";
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

export const BACK_LENS_SKINS: ActiveBackLensSkin[] = OPTIMIZED43_BACK_LENS_PRODUCTS;

export function backLensSkinBySlug(slug: string): BackLensSkin | undefined {
  return BACK_LENS_SKINS.find((s) => s.slug === slug);
}
