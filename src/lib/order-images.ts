import { lookupProduct } from "./product-lookup";

// These assets are served by Lovable, not by the separately hosted storefront.
export const ORDER_ASSET_ORIGIN = "https://lenzo-lens-style.lovable.app";
const PROJECT_ASSET_PATH = /^\/__l5e\/assets-v1\/[\da-f-]{36}\/[^/?#]+$/i;

/** Accept only permanent project assets or unsigned public storage objects. */
export function stableOrderImage(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const image = value.trim();
  if (PROJECT_ASSET_PATH.test(image)) return ORDER_ASSET_ORIGIN + image;
  try {
    const url = new URL(image);
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) return null;
    if (PROJECT_ASSET_PATH.test(url.pathname)) return ORDER_ASSET_ORIGIN + url.pathname;
    if (url.pathname.startsWith("/storage/v1/object/public/")) return url.href;
  } catch { /* Relative uploads, blob URLs and local files are not durable. */ }
  return null;
}

export type OrderImageIdentity = {
  productId?: unknown;
  sku?: unknown;
  importKey?: unknown;
  slug?: unknown;
  image?: unknown;
};

/** Never guess artwork from names, phone colors or model strings. */
export function orderProduct(item: OrderImageIdentity) {
  for (const value of [item.productId, item.sku, item.importKey, item.slug]) {
    if (typeof value !== "string") continue;
    const product = lookupProduct(value);
    if (product) return product;
  }
  return undefined;
}

export function orderItemImage(item: OrderImageIdentity): string | null {
  const product = orderProduct(item);
  return product ? stableOrderImage(product.image) : stableOrderImage(item.image);
}

/** Canonical cover + identity, preserving every other order-item field. */
export function snapshotOrderItem<T extends OrderImageIdentity>(item: T) {
  const product = orderProduct(item);
  return {
    ...item,
    ...(product ? {
      productId: product.id,
      slug: product.slug,
      ...(product.sku ? { sku: product.sku } : {}),
      ...(product.importKey ? { importKey: product.importKey } : {}),
    } : {}),
    image: orderItemImage(item) ?? "",
  };
}