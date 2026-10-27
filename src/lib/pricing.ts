import type { CartCategory } from "./cart";

/** Prix unitaires par catégorie (source unique, utilisée aussi côté serveur). */
export const CATEGORY_PRICES: Record<CartCategory, number> = {
  lens: 79,
  skins: 149,
  backlens: 129,
  air: 79,
  custom: 149,
};

/** Prix des skins personnalisés selon la couverture choisie. */
export const CUSTOM_COVERAGE_PRICES = { full: 149, back: 199, camera: 99 } as const;

export const PACK_TOTAL = 149;
/** Nombre d'articles couverts par l'offre 3 pour 149 MAD. */
export const PACK_PROMO_SIZE = 3;
/** Prix unitaire d'un sticker caméra hors offre. */
export const LENS_UNIT_PRICE = CATEGORY_PRICES.lens;

export type PackBreakdown = {
  count: number;
  promoApplies: boolean;
  promoCount: number;
  promoTotal: number;
  extraCount: number;
  extraTotal: number;
  total: number;
};

/**
 * Les 3 premiers stickers caméra = 149 MAD.
 * Chaque article supplémentaire est facturé à son prix normal.
 * Moins de 3 articles : prix normal à l'unité.
 */
export function packBreakdown(count: number): PackBreakdown {
  const n = Math.max(0, Math.floor(count) || 0);
  const promoApplies = n >= PACK_PROMO_SIZE;
  const promoCount = Math.min(n, PACK_PROMO_SIZE);
  const promoTotal = promoApplies ? PACK_TOTAL : promoCount * LENS_UNIT_PRICE;
  const extraCount = Math.max(0, n - PACK_PROMO_SIZE);
  const extraTotal = extraCount * LENS_UNIT_PRICE;
  return {
    count: n,
    promoApplies,
    promoCount,
    promoTotal,
    extraCount,
    extraTotal,
    total: promoTotal + extraTotal,
  };
}

export type CameraBundle = {
  units: number;
  groups: number;
  remainder: number;
  listTotal: number;
  bundledTotal: number;
  discount: number;
};

/**
 * Offre Stickers caméra : chaque groupe de 3 stickers = 149 MAD.
 * Les articles restants gardent leur prix normal.
 */
export function cameraBundle(units: number): CameraBundle {
  const n = Math.max(0, Math.floor(units) || 0);
  const groups = Math.floor(n / PACK_PROMO_SIZE);
  const remainder = n % PACK_PROMO_SIZE;
  const listTotal = n * LENS_UNIT_PRICE;
  const bundledTotal = groups * PACK_TOTAL + remainder * LENS_UNIT_PRICE;
  return {
    units: n,
    groups,
    remainder,
    listTotal,
    bundledTotal,
    discount: Math.max(0, listTotal - bundledTotal),
  };
}

/** Seules les catégories "caméra uniquement" comptent pour l'offre 3 pour 149 MAD (jamais le prix). */
export const BUNDLE_ELIGIBLE_CATEGORIES = ["lens", "air"] as const;
export function isBundleEligible(category: string): boolean {
  return (BUNDLE_ELIGIBLE_CATEGORIES as readonly string[]).includes(category);
}

export type EligibleBundle = {
  units: number;
  groups: { listTotal: number; total: number }[];
  remainderCount: number;
  remainderTotal: number;
  listTotal: number;
  bundledTotal: number;
  discount: number;
};

/** Groupes de 3 articles éligibles (prix unitaires réels) → 149 MAD chacun, jamais plus cher que le prix normal. */
export function eligibleBundle(unitPrices: number[]): EligibleBundle {
  const prices = [...unitPrices].sort((a, b) => b - a);
  const nGroups = Math.floor(prices.length / PACK_PROMO_SIZE);
  const groups: { listTotal: number; total: number }[] = [];
  for (let g = 0; g < nGroups; g++) {
    const list = prices.slice(g * 3, g * 3 + 3).reduce((s, p) => s + p, 0);
    groups.push({ listTotal: list, total: Math.min(list, PACK_TOTAL) });
  }
  const rest = prices.slice(nGroups * 3);
  const remainderTotal = rest.reduce((s, p) => s + p, 0);
  const listTotal = prices.reduce((s, p) => s + p, 0);
  const bundledTotal = groups.reduce((s, g) => s + g.total, 0) + remainderTotal;
  return { units: prices.length, groups, remainderCount: rest.length, remainderTotal, listTotal, bundledTotal, discount: listTotal - bundledTotal };
}

type PricingItem = { category: string; qty: number; price: number };

/** Camera and Air offers are independent; never pool their quantities. */
export function categoryBundles(items: PricingItem[]) {
  const bundles = BUNDLE_ELIGIBLE_CATEGORIES.map((category) => ({
    category,
    ...eligibleBundle(items.flatMap((i) => i.category === category ? Array(i.qty).fill(i.price) : [])),
  }));
  return {
    discount: bundles.reduce((sum, b) => sum + b.discount, 0),
    groups: bundles.flatMap((b) => b.groups.map((g) => ({ ...g, category: b.category }))),
    remainderCount: bundles.reduce((sum, b) => sum + b.remainderCount, 0),
    remainderTotal: bundles.reduce((sum, b) => sum + b.remainderTotal, 0),
  };
}

/** Only a basket of exactly one regular camera skin incurs delivery. Legacy pack designs are camera skins. */
export function cameraDeliveryFee(items: { category: string; qty: number }[], packCount = 0): number {
  const cameraCount = packCount + items.reduce((sum, i) => sum + (i.category === "lens" ? i.qty : 0), 0);
  const hasOther = items.some((i) => i.category !== "lens" && i.qty > 0);
  return cameraCount === 1 && !hasOther ? 20 : 0;
}
