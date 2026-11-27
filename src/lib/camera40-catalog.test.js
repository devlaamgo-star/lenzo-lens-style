import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import part1 from "../../catalog-templates/camera-lens-skins/imports/archive3-20261127/CATALOG_PART_1.json";
import part2 from "../../catalog-templates/camera-lens-skins/imports/archive3-20261127/CATALOG_PART_2.json";
import identities from "../../catalog-templates/camera-lens-skins/imports/archive3-20261127/identities.json";
import { ARCHIVE3_CAMERA_SKINS } from "../data/camera-lens-archive3";
import { CAMERA72_SKINS } from "../data/camera-lens-batch72";
import { CAMERA_LENS_SKINS, lensSkinBySlug } from "../data/camera-lens-skins";
import { mergeCameraImport } from "../data/merge-camera-import";
import { LENS_SKIN_PRICE, modelsForCategory, designById } from "./catalog";
import { lookupProduct } from "./product-lookup";
import { sanitizeCartItem } from "./cart-storage";
import { cameraDeliveryFee, categoryBundles } from "./pricing";

const entries = [...part1.products, ...part2.products];
function pointer(path) {
  return JSON.parse(readFileSync(new URL(`../assets/lens/archive3/${path.split("/").pop()}.asset.json`, import.meta.url), "utf8"));
}

test("both parts import exactly 40 unique products and preserve all original 72", () => {
  expect(ARCHIVE3_CAMERA_SKINS).toHaveLength(40);
  expect(CAMERA_LENS_SKINS).toHaveLength(112);
  expect(CAMERA_LENS_SKINS.slice(0, 72)).toEqual(CAMERA72_SKINS);
  for (const field of ["id", "sku", "slug", "importKey"]) expect(new Set(CAMERA_LENS_SKINS.map((p) => p[field])).size).toBe(112);
});

for (const entry of entries) {
  test(`${entry.sku} has its exact identities, matching cover and ordered own gallery`, () => {
    const product = lensSkinBySlug(entry.slug);
    expect(product).toBeDefined();
    expect(product.id).toBe(identities[entry.import_key].id);
    expect(product.id).toMatch(/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/);
    expect(product.sku).toBe(entry.sku);
    expect(product.importKey).toBe(entry.import_key);
    expect(product.name).toEqual({ fr: entry.name, en: entry.name, ar: entry.name });
    const images = [...entry.images].sort((a, b) => a.position - b.position);
    expect(product.gallery).toEqual(images.map((im) => pointer(im.path).url));
    expect(product.image).toBe(pointer(entry.primary_image).url);
    expect(product.image).toBe(product.gallery[0]);
    expect(entry.primary_image.endsWith("-01-cover.webp")).toBe(true);
    expect(product.imageWidth).toBe(images[0].width);
    expect(product.imageHeight).toBe(images[0].height);
    for (const image of images) {
      expect(image.path.startsWith(entry.folder + "/")).toBe(true);
      expect(pointer(image.path).size).toBe(image.bytes);
      expect(pointer(image.path).original_filename).toBe(image.path.split("/").pop());
    }
    expect(lookupProduct(product.id)?.image).toBe(product.image);
    expect(designById(product.id)?.image).toBe(product.image);
    expect(sanitizeCartItem({ productId: product.id, slug: product.slug, category: "lens", name: product.name, image: product.image, price: 79, qty: 1, model: "iPhone 17 Pro" })?.image).toBe(product.image);
  });
}

test("197 unique photos are used once: Sunset Rider 4, Tom Cool Vibes 3, all other designs 5", () => {
  const galleries = ARCHIVE3_CAMERA_SKINS.flatMap((p) => p.gallery);
  expect(galleries).toHaveLength(197);
  expect(new Set(galleries).size).toBe(197);
  for (const product of ARCHIVE3_CAMERA_SKINS) expect(product.gallery).toHaveLength(product.slug === "sunset-rider" ? 4 : product.slug === "tom-cool-vibes" ? 3 : 5);
});

test("reimporting by import_key or SKU never adds duplicates or changes original IDs", () => {
  expect(mergeCameraImport(CAMERA_LENS_SKINS, ARCHIVE3_CAMERA_SKINS)).toEqual(CAMERA_LENS_SKINS);
  const first = ARCHIVE3_CAMERA_SKINS[0];
  expect(mergeCameraImport([first], [{ ...first, id: "different-id", importKey: "changed-key" }])[0].id).toBe(first.id);
  expect(mergeCameraImport([first], [{ ...first, id: "different-id", sku: "changed-sku" }])[0].id).toBe(first.id);
});

test("all 40 inherit current camera price, four options, delivery and independent bundle rules", () => {
  expect(LENS_SKIN_PRICE).toBe(79);
  expect(modelsForCategory("lens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max", "iPhone 18 Pro", "iPhone 18 Pro Max"]);
  for (const product of ARCHIVE3_CAMERA_SKINS) {
    expect(product.category).toBe("camera-lens-skins");
    expect(cameraDeliveryFee([{ productId: product.id, category: "lens", qty: 1 }])).toBe(20);
    const three = [{ productId: product.id, category: "lens", qty: 3, price: 79 }];
    expect(237 - categoryBundles(three).discount).toBe(149);
    expect(cameraDeliveryFee(three)).toBe(0);
  }
});