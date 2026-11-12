// Saved basket/pack data from earlier visits can be incomplete or come from an older
// version of the site. Anything read back from the browser is validated here so a
// returning visitor's old data can never crash the cart or checkout pages.

import type { CartCategory, CartItem, CustomSkinMeta } from "./cart";

const CATEGORIES: readonly CartCategory[] = ["lens", "skins", "backlens", "air", "custom"];
const MAX_QTY = 20;
export const MAX_PACK_DESIGNS = 30;

function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v : null;
}

function num(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
}

type Loose<K extends string> = { [P in K]?: unknown };
type SavedItem = Loose<"productId" | "slug" | "category" | "name" | "image" | "price" | "model" | "qty" | "custom">;
type SavedNames = Loose<"fr" | "ar" | "en">;
type SavedCustom = Loose<"modelId" | "modelLabel" | "coverage" | "templateId" | "originalPath" | "previewPath" | "transform">;
type SavedTransform = Loose<"x" | "y" | "scale" | "rotation">;

function customMeta(v: unknown): CustomSkinMeta | null {
  if (!v || typeof v !== "object") return null;
  const c = v as SavedCustom;
  const t = (c.transform && typeof c.transform === "object" ? c.transform : {}) as SavedTransform;
  const coverage = c.coverage === "full" || c.coverage === "back" || c.coverage === "camera" ? c.coverage : null;
  const modelId = str(c.modelId), modelLabel = str(c.modelLabel), templateId = str(c.templateId);
  const originalPath = str(c.originalPath), previewPath = str(c.previewPath);
  if (!coverage || !modelId || !modelLabel || !templateId || !originalPath || !previewPath) return null;
  return {
    modelId, modelLabel, coverage, templateId, originalPath, previewPath,
    transform: { x: num(t.x) ?? 0, y: num(t.y) ?? 0, scale: num(t.scale) ?? 1, rotation: num(t.rotation) ?? 0 },
  };
}

/** Returns a valid item, or null when the saved entry cannot be shown or ordered safely. */
export function sanitizeCartItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== "object") return null;
  const i = raw as SavedItem;
  const productId = str(i.productId);
  const category = CATEGORIES.includes(i.category as CartCategory) ? (i.category as CartCategory) : null;
  if (!productId || !category) return null;

  // Older saves may hold a single name string instead of one name per language.
  const names = (typeof i.name === "string" ? { fr: i.name } : i.name && typeof i.name === "object" ? i.name : {}) as SavedNames;
  const fr = str(names.fr) ?? str(names.en) ?? str(names.ar);
  if (!fr) return null;

  const price = num(i.price);
  if (price === null || price < 0) return null;

  const qty = Math.floor(num(i.qty) ?? 0);
  if (qty < 1) return null;

  const model = category === "air" ? "iPhone Air" : str(i.model);
  if (!model) return null;

  let custom: CustomSkinMeta | undefined;
  if (category === "custom") {
    const meta = customMeta(i.custom);
    if (!meta) return null;
    custom = meta;
  }

  return {
    productId,
    slug: str(i.slug) ?? "",
    category,
    name: { fr, ar: str(names.ar) ?? fr, en: str(names.en) ?? fr },
    image: typeof i.image === "string" ? i.image : "",
    price,
    ...(custom ? { custom } : {}),
    model,
    qty: Math.min(MAX_QTY, qty),
    key: `${category}:${productId}:${model}`,
  };
}

/** Parses the saved basket text; malformed or unrecognised entries are dropped. */
export function parseStoredCart(raw: string | null | undefined): CartItem[] {
  if (!raw) return [];
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { return []; }
  if (!Array.isArray(parsed)) return [];
  const seen = new Set<string>();
  const items: CartItem[] = [];
  for (const entry of parsed) {
    const item = sanitizeCartItem(entry);
    if (!item || seen.has(item.key)) continue;
    seen.add(item.key);
    items.push(item);
  }
  return items;
}

/** Parses the saved "compose my pack" selection: only design ids (text) are kept. */
export function parseStoredPack(raw: string | null | undefined): { designs: string[] } {
  if (!raw) return { designs: [] };
  try {
    const parsed = JSON.parse(raw) as { designs?: unknown } | null;
    const list = parsed && Array.isArray(parsed.designs) ? parsed.designs : [];
    return { designs: list.filter((d): d is string => typeof d === "string" && d.length > 0 && d.length < 200).slice(0, MAX_PACK_DESIGNS) };
  } catch {
    return { designs: [] };
  }
}
