export type Lang = "fr" | "ar" | "en";

export type CollectionId = "minimal" | "artistique" | "elegance" | "urbain";

export type Product = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  collection: CollectionId;
  isNew: boolean;
  isBestseller: boolean;
  popularity: number;
};

/**
 * Aucun produit générique ici : le catalogue SKINUP est constitué uniquement
 * des produits créés à partir des images réellement fournies (voir
 * full-body-skins, camera-lens-skins, back-lens-skins, iphone-air-skins).
 */
export const PRODUCTS: Product[] = [];

export function productById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
