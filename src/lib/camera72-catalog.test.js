import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import manifest from "../../catalog-templates/camera-lens-skins/imports/batch72/products.json";
import savedSettings from "../../catalog-templates/camera-lens-skins/settings-before-replacement.json";
import { CAMERA_LENS_SKINS, LENS_SKIN_PRICE, PACK_PRICE, PACK_SIZE, DEFAULT_IPHONE_MODEL, modelsForCategory, designById } from "./catalog";
import { ARCHIVED_CAMERA_LENS_SKINS } from "../data/archive/camera-lens-skins";
import { BACK_LENS_SKINS } from "../data/back-lens-skins";
import { IPHONE_AIR_SKINS } from "../data/iphone-air-skins";
import { lensSkinBySlug } from "../data/camera-lens-skins";
import { lookupProduct } from "./product-lookup";
import { cameraDeliveryFee, categoryBundles } from "./pricing";

function assetUrl(path) {
  const file = new URL(`../assets/lens/batch72/${path.replace(/^products\//, "")}.asset.json`, import.meta.url);
  return JSON.parse(readFileSync(file, "utf8")).url;
}

test("exactly 72 active camera designs follow supplied order with Comic Boom first", () => {
  expect(CAMERA_LENS_SKINS).toHaveLength(72);
  expect(CAMERA_LENS_SKINS[0].name.fr).toBe("Skin caméra – Comic Boom");
  expect(CAMERA_LENS_SKINS.map((p) => p.slug)).toEqual(manifest.products.map((p) => p.slug));
  for (const field of ["id", "slug", "sku", "importKey"]) expect(new Set(CAMERA_LENS_SKINS.map((p) => p[field])).size).toBe(72);
});

for (const entry of manifest.products) {
  test(`${entry.import_key} retains exact identity and its own ordered images`, () => {
    const product = lensSkinBySlug(entry.slug);
    expect(product).toBeDefined();
    expect(product.id).toBe(entry.import_key);
    expect(product.sku).toBe(entry.sku);
    expect(product.name.fr).toBe(entry.title_fr);
    expect(product.description.fr).toBe(entry.description_fr);
    expect(product.tags).toEqual(entry.tags);
    expect(product.image).toBe(assetUrl(entry.primary_image));
    expect(product.gallery).toEqual(entry.images.map((image) => assetUrl(image.path)));
    expect(product.gallery[0]).toBe(product.image);
    expect(product.responsiveCover).toEqual(entry.primary_image_responsive.map((image) => ({ url: assetUrl(image.path), width: image.width, height: image.height })));
    expect(product.category).toBe("camera-lens-skins");
    expect(lookupProduct(product.id)?.image).toBe(product.image);
  });
}

test("493 gallery images and 144 derivatives are unique and never shared across products", () => {
  const galleries = CAMERA_LENS_SKINS.flatMap((p) => p.gallery);
  expect(galleries).toHaveLength(493);
  expect(new Set(galleries).size).toBe(493);
  const derivatives = CAMERA_LENS_SKINS.flatMap((p) => p.responsiveCover.filter((c) => c.width < 1200).map((c) => c.url));
  expect(derivatives).toHaveLength(144);
  expect(new Set(derivatives).size).toBe(144);
  expect(derivatives.some((url) => galleries.includes(url))).toBe(false);
});

test("all 107 retired products remain readable in historical orders but not active", () => {
  expect(ARCHIVED_CAMERA_LENS_SKINS).toHaveLength(107);
  for (const old of ARCHIVED_CAMERA_LENS_SKINS) {
    expect(lensSkinBySlug(old.slug)).toBeUndefined();
    expect(CAMERA_LENS_SKINS.some((p) => p.id === old.id)).toBe(false);
    expect(lookupProduct(old.id)?.image).toBe(old.image);
    expect(designById(old.id)?.name).toEqual(old.name);
  }
});

test("replacement keeps camera prices, models and selection settings exactly unchanged", () => {
  expect(LENS_SKIN_PRICE).toBe(savedSettings.price);
  expect(PACK_PRICE).toBe(savedSettings.bundlePrice);
  expect(PACK_SIZE).toBe(savedSettings.bundleSize);
  expect(modelsForCategory("lens")).toEqual(savedSettings.models);
  expect(DEFAULT_IPHONE_MODEL).toBe(savedSettings.defaultModel);
});

test("three identical or different camera designs remain 149 MAD with free delivery", () => {
  for (const ids of [[0, 0, 0], [0, 35, 71]]) {
    const items = ids.map((i) => ({ productId: CAMERA_LENS_SKINS[i].id, category: "lens", qty: 1, price: LENS_SKIN_PRICE }));
    expect(237 - categoryBundles(items).discount).toBe(149);
    expect(cameraDeliveryFee(items)).toBe(0);
  }
});

test("single-camera delivery and independent Air offers remain unchanged", () => {
  expect(cameraDeliveryFee([{ category: "lens", qty: 1 }])).toBe(20);
  expect(cameraDeliveryFee([{ category: "lens", qty: 1 }, { category: "backlens", qty: 1 }])).toBe(0);
  expect(categoryBundles([{ category: "lens", qty: 2, price: 79 }, { category: "air", qty: 1, price: 79 }]).discount).toBe(0);
});

test("new camera products never appear in other categories", () => {
  const otherIds = new Set([...BACK_LENS_SKINS, ...IPHONE_AIR_SKINS].map((p) => p.id));
  expect(CAMERA_LENS_SKINS.some((p) => otherIds.has(p.id))).toBe(false);
});