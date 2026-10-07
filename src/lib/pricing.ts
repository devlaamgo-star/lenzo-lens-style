import type { CartCategory } from "./cart";

/** Prix unitaires par catégorie (source unique, utilisée aussi côté serveur). */
export const CATEGORY_PRICES: Record<CartCategory, number> = {
  lens: 79,
  skins: 149,
  backlens: 129,
  air: 49,
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
