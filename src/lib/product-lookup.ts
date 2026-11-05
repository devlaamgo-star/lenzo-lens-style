import { CAMERA_LENS_SKINS } from "@/data/camera-lens-skins";
import { BACK_LENS_SKINS } from "@/data/back-lens-skins";
import { ARCHIVED_BACK_LENS_SKINS } from "@/data/archive/back-lens-skins";
import { FULL_BODY_SKINS } from "@/data/full-body-skins";
import { IPHONE_AIR_SKINS } from "@/data/iphone-air-skins";


export type ProductRef = {
  id: string;
  slug: string;
  name: string;
  image: string;
  categoryLabel: string;
};

const GROUPS: { label: string; items: readonly { id: string; slug: string; name: { fr: string }; image: string }[] }[] = [
  { label: "Stickers caméra", items: CAMERA_LENS_SKINS },
  { label: "Skins arrière & caméra", items: [...ARCHIVED_BACK_LENS_SKINS, ...BACK_LENS_SKINS] },
  { label: "Full body skins", items: FULL_BODY_SKINS },
  { label: "Skins iPhone Air", items: IPHONE_AIR_SKINS },
  
];

const INDEX = new Map<string, ProductRef>();
for (const group of GROUPS) {
  for (const p of group.items) {
    const ref: ProductRef = {
      id: p.id,
      slug: p.slug,
      name: p.name.fr,
      image: p.image,
      categoryLabel: group.label,
    };
    INDEX.set(p.id, ref);
    if (!INDEX.has(p.slug)) INDEX.set(p.slug, ref);
  }
}

/** Résout un identifiant (id, slug ou id préfixé) vers le produit du catalogue. */
export function lookupProduct(idOrSlug: string): ProductRef | undefined {
  if (!idOrSlug) return undefined;
  const direct = INDEX.get(idOrSlug);
  if (direct) return direct;
  const stripped = idOrSlug.replace(/^(lens|skin|backlens|air)-/, "");
  return INDEX.get(stripped);
}
