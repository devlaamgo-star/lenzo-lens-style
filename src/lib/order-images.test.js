import { expect, test } from "bun:test";
import { CAMERA_LENS_SKINS } from "../data/camera-lens-skins";
import { ARCHIVED_CAMERA_LENS_SKINS } from "../data/archive/camera-lens-skins";
import { orderItemImage, snapshotOrderItem, stableOrderImage, ORDER_ASSET_ORIGIN } from "./order-images";

const chatId = "skinup-camera-batch72-20261126-003";
const chatCover = `${ORDER_ASSET_ORIGIN}/__l5e/assets-v1/4df56082-19aa-4f6b-8f82-3710720cc56b/camera72-003-chat-bleu-tourbillon-01-cover.webp`;

test("Chat Bleu Tourbillon resolves its exact main cover, not another item's snapshot", () => {
  expect(orderItemImage({ productId: chatId, image: CAMERA_LENS_SKINS[0].image })).toBe(chatCover);
});
test("a legacy order with no image snapshot falls back to its matching archived catalog cover", () => {
  const old = ARCHIVED_CAMERA_LENS_SKINS.find((p) => p.id === "lens-horizon-ambre");
  expect(old).toBeDefined();
  expect(orderItemImage({ productId: old.id, image: "" })).toBe(ORDER_ASSET_ORIGIN + old.image);
});
test("all 112 camera products resolve main covers by ID, SKU and import key, never their gallery alternatives", () => {
  for (const product of CAMERA_LENS_SKINS) {
    expect(orderItemImage({ productId: product.id, image: product.gallery[1] })).toBe(ORDER_ASSET_ORIGIN + product.image);
    expect(orderItemImage({ sku: product.sku })).toBe(ORDER_ASSET_ORIGIN + product.image);
    expect(orderItemImage({ importKey: product.importKey })).toBe(ORDER_ASSET_ORIGIN + product.image);
  }
});
test("new snapshots retain product/model identity, quantities and prices while saving a permanent cover", () => {
  const original = { productId: chatId, name: "Skin caméra – Chat Bleu Tourbillon", category: "lens", model: "iPhone 17 Pro", qty: 2, unitPrice: 79, lineTotal: 158, image: "blob:temporary" };
  expect(snapshotOrderItem(original)).toEqual({ ...original, slug: "camera-chat-bleu-tourbillon", sku: "SK-CAM-B72-003", importKey: chatId, image: chatCover });
});
test("unknown products never receive another catalog photo", () => {
  expect(orderItemImage({ productId: "not-a-product", image: "", slug: "blue-cat-made-up" })).toBeNull();
});
test("temporary, local and signed photo URLs are not persisted", () => {
  for (const url of ["blob:test", "data:image/png;base64,test", "file:///tmp/photo.webp", "http://localhost:8080/photo.webp", "/tmp/photo.webp", "https://files.example/storage/v1/object/sign/photo.webp?token=expired", "https://files.example/storage/v1/object/public/photo.webp?token=expired"]) {
    expect(stableOrderImage(url)).toBeNull();
    expect(snapshotOrderItem({ productId: "unknown", image: url }).image).toBe("");
  }
});
test("absolute permanent covers are idempotent across storefront hosts", () => {
  expect(stableOrderImage(chatCover)).toBe(chatCover);
  expect(stableOrderImage(chatCover.replace(ORDER_ASSET_ORIGIN, "https://skinup.ma"))).toBe(chatCover);
});