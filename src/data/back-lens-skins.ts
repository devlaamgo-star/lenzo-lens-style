import type { BackLensSkin } from "./archive/back-lens-skins";
export type { BackLensSkin } from "./archive/back-lens-skins";

/** Active ready-made designs only. Original designs remain in archive for existing orders. */
export const BACK_LENS_SKINS: BackLensSkin[] = [];

export function backLensSkinBySlug(slug: string): BackLensSkin | undefined {
  return BACK_LENS_SKINS.find((s) => s.slug === slug);
}
