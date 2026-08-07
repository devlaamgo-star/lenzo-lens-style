import type { CartCategory } from "./cart";

/** Prix unitaires par catégorie (source unique, utilisée aussi côté serveur). */
export const CATEGORY_PRICES: Record<CartCategory, number> = {
  lens: 49,
  skins: 149,
  backlens: 129,
  air: 49,
  anime: 149,
};

export const PACK_TOTAL = 99;
/** Nombre d'articles couverts par l'offre 3 pour 99 MAD. */
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
 * Les 3 premiers stickers caméra = 99 MAD.
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
