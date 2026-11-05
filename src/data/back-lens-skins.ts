import type { BackLensSkin } from "./archive/back-lens-skins";
import { createBackLensProduct } from "./back-lens-product-template";
import orange from "@/assets/backlens/rose-bottle-orange.png.asset.json";
import trio from "@/assets/backlens/rose-bottle-trio.png.asset.json";
export type { BackLensSkin } from "./archive/back-lens-skins";

/** Active ready-made designs only. Original designs remain in archive for existing orders. */
export const BACK_LENS_SKINS: BackLensSkin[] = [
  createBackLensProduct({
    slug: "rose-bottle-orange",
    name: { fr: "Rose Bottle Orange", ar: "Rose Bottle Orange", en: "Rose Bottle Orange" },
    image: orange.url,
  }),
  createBackLensProduct({
    slug: "rose-bottle-trio",
    name: { fr: "Rose Bottle Trio", ar: "Rose Bottle Trio", en: "Rose Bottle Trio" },
    image: trio.url,
  }),
];

export function backLensSkinBySlug(slug: string): BackLensSkin | undefined {
  return BACK_LENS_SKINS.find((s) => s.slug === slug);
}
