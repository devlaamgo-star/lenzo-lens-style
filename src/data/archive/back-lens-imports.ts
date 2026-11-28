import { ORGANIZED_BACK_LENS_PRODUCTS } from "../organized-back-lens-products";
import { BATCH02_BACK_LENS_PRODUCTS } from "../batch02-back-lens-products";
import { BATCH03_BACK_LENS_PRODUCTS } from "../batch03-back-lens-products";
import { BATCH04_BACK_LENS_PRODUCTS } from "../batch04-back-lens-products";

/** Immutable previous imports: historical orders only, never storefront listings. */
export const RETIRED_BACK_LENS_PRODUCTS = [
  ...ORGANIZED_BACK_LENS_PRODUCTS,
  ...BATCH02_BACK_LENS_PRODUCTS,
  ...BATCH03_BACK_LENS_PRODUCTS,
  ...BATCH04_BACK_LENS_PRODUCTS,
];

export function retiredBackLensSkinBySlug(slug: string) {
  return RETIRED_BACK_LENS_PRODUCTS.find((product) => product.slug === slug);
}