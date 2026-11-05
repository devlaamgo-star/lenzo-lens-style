import type { BackLensSkin } from "./archive/back-lens-skins";
import { ARCHIVED_BACK_LENS_SKINS } from "./archive/back-lens-skins";

type NewBackLensDesign = Pick<BackLensSkin, "slug" | "name" | "image"> &
  Partial<Pick<BackLensSkin, "id" | "gallery">>;

/** Reuse the original Horizon Céleste configuration; never generate artwork or translations. */
export function createBackLensProduct(design: NewBackLensDesign): BackLensSkin {
  const reference = ARCHIVED_BACK_LENS_SKINS.find((skin) => skin.slug === "horizon-celeste");
  if (!reference) throw new Error("Missing preserved Back & Lens reference product");
  return {
    ...reference,
    id: design.id ?? `backlens-${design.slug}`,
    slug: design.slug,
    name: { ...design.name },
    description: { ...reference.description },
    image: design.image,
    gallery: design.gallery ? [...design.gallery] : [design.image],
  };
}