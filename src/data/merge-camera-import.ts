import type { CameraLensSkin } from "./camera-lens-types";

/** Replace matching import identities in place; append genuinely new designs only. */
export function mergeCameraImport(existing: readonly CameraLensSkin[], incoming: readonly CameraLensSkin[]): CameraLensSkin[] {
  const products = [...existing];
  for (const product of incoming) {
    const index = products.findIndex((current) =>
      (product.importKey !== undefined && current.importKey === product.importKey) ||
      (product.sku !== undefined && current.sku === product.sku));
    const previous = index >= 0 ? products[index] : undefined;
    if (previous) products[index] = { ...product, id: previous.id };
    else products.push(product);
  }
  return products;
}