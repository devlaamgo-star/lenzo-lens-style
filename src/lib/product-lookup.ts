import { CAMERA_LENS_SKINS } from "@/data/camera-lens-skins";
import { ARCHIVED_CAMERA_LENS_SKINS } from "@/data/archive/camera-lens-skins";
import { BACK_LENS_SKINS } from "@/data/back-lens-skins";
import { ARCHIVED_BACK_LENS_SKINS } from "@/data/archive/back-lens-skins";
import { FULL_BODY_SKINS } from "@/data/full-body-skins";
import { IPHONE_AIR_SKINS, ARCHIVED_AIR_SKINS } from "@/data/iphone-air-skins";


export type ProductRef = {
  id: string;
  slug: string;
  name: string;
  image: string;
  categoryLabel: string;
  sku?: string;
  importKey?: string;
};

const GROUPS: { label: string; items: readonly { id: string; slug: string; name: { fr: string }; image: string; sku?: string; importKey?: string }[] }[] = [
  { label: "Stickers caméra", items: [...ARCHIVED_CAMERA_LENS_SKINS, ...CAMERA_LENS_SKINS] },
  { label: "Skins arrière & caméra", items: [...ARCHIVED_BACK_LENS_SKINS, ...BACK_LENS_SKINS] },
  { label: "Full body skins", items: FULL_BODY_SKINS },
  { label: "iPhone Duo / Air Series", items: IPHONE_AIR_SKINS },
  { label: "Skins iPhone Air (archive)", items: ARCHIVED_AIR_SKINS },
  
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
      ...(p.sku ? { sku: p.sku } : {}),
      ...(p.importKey ? { importKey: p.importKey } : {}),
    };
    INDEX.set(p.id, ref);
    if (!INDEX.has(p.slug)) INDEX.set(p.slug, ref);
    if (p.sku) INDEX.set(p.sku, ref);
    if (p.importKey) INDEX.set(p.importKey, ref);
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
