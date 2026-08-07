import type { CartCategory } from "./cart";

/** Prix unitaires par catégorie (source unique, utilisée aussi côté serveur). */
export const CATEGORY_PRICES: Record<CartCategory, number> = {
  lens: 79,
  skins: 149,
  backlens: 129,
  air: 49,
  anime: 149,
};

export const PACK_TOTAL = 99;
