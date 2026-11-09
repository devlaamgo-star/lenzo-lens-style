import type { BackLensSkin } from "./archive/back-lens-skins";
import { ARCHIVED_BACK_LENS_SKINS } from "./archive/back-lens-skins";

type NewBackLensDesign = Pick<BackLensSkin, "slug" | "name" | "image"> &
  Partial<Pick<BackLensSkin, "id" | "gallery" | "description">> & {
    externalReference?: string;
    sourceProductNumber?: number;
    displayOrder?: number;
  };

/** Reuse the original Horizon Céleste configuration; never generate artwork or translations. */
export function createBackLensProduct(design: NewBackLensDesign): BackLensSkin & Pick<NewBackLensDesign, "externalReference" | "sourceProductNumber" | "displayOrder"> {
  const reference = ARCHIVED_BACK_LENS_SKINS.find((skin) => skin.slug === "horizon-celeste");
  if (!reference) throw new Error("Missing preserved Back & Lens reference product");
  return {
    ...reference,
    id: design.id ?? `backlens-${design.slug}`,
    slug: design.slug,
    name: { ...design.name },
    description: { ...(design.description ?? reference.description) },
    image: design.image,
    gallery: design.gallery ? [...design.gallery] : [design.image],
    ...(design.externalReference ? { externalReference: design.externalReference } : {}),
    ...(design.sourceProductNumber !== undefined ? { sourceProductNumber: design.sourceProductNumber } : {}),
    ...(design.displayOrder !== undefined ? { displayOrder: design.displayOrder } : {}),
  };
}