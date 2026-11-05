import { expect, test } from "bun:test";
import { BACK_LENS_SKINS, backLensSkinBySlug } from "../data/back-lens-skins";
import { ARCHIVED_BACK_LENS_SKINS } from "../data/archive/back-lens-skins";
import { createBackLensProduct } from "../data/back-lens-product-template";
import { lookupProduct } from "./product-lookup";
import registry from "../data/back-lens-upload-registry.json";
import { BACK_LENS_SKIN_PRICE, modelsForCategory } from "./catalog";

test("All 30 ready-made Back & Lens designs are removed from active listings and slug lookup", () => {
  expect(ARCHIVED_BACK_LENS_SKINS).toHaveLength(30);
  for (const product of ARCHIVED_BACK_LENS_SKINS) {
    expect(backLensSkinBySlug(product.slug)).toBeUndefined();
  }
});

test("Historical orders retain every original product name, image and identifier", () => {
  for (const product of ARCHIVED_BACK_LENS_SKINS) {
    const expected = { id: product.id, slug: product.slug, name: product.name.fr, image: product.image, categoryLabel: "Skins arrière & caméra" };
    expect(lookupProduct(product.id)).toEqual(expected);
    expect(lookupProduct(product.slug)).toEqual(expected);
  }
});

test("Reusable template replaces only supplied design-specific fields", () => {
  const reference = ARCHIVED_BACK_LENS_SKINS.find((skin) => skin.slug === "horizon-celeste");
  expect(reference).toBeDefined();
  const design = { slug: "template-test-only", name: { fr: "Test FR", ar: "Test AR", en: "Test EN" }, image: "test-image", gallery: ["test-image", "test-detail"] };
  const product = createBackLensProduct(design);
  expect(product).toEqual({ ...reference, ...design, id: "backlens-template-test-only" });
  expect(backLensSkinBySlug(design.slug)).toBeUndefined();
});

test("Each of the two supplied images has exactly one separate active product", () => {
  expect(BACK_LENS_SKINS.map((p) => p.slug)).toEqual(["rose-bottle-orange", "rose-bottle-trio"]);
  expect(new Set(registry.map((p) => p.sha256)).size).toBe(2);
  for (const entry of registry) {
    expect(BACK_LENS_SKINS.filter((p) => p.id === entry.productId)).toHaveLength(1);
    expect(backLensSkinBySlug(entry.slug)?.id).toBe(entry.productId);
  }
});

test("New products preserve 129 MAD pricing and both existing selectable models", () => {
  expect(BACK_LENS_SKIN_PRICE).toBe(129);
  expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
});

test("New designs inherit all non-artwork settings and keep each complete image in its gallery", () => {
  const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
  expect(reference).toBeDefined();
  for (const p of BACK_LENS_SKINS) {
    expect(p).toEqual({ ...reference, id: p.id, slug: p.slug, name: p.name, image: p.image, gallery: [p.image] });
    expect(p.category).toBe("back-and-lens-skins");
    expect(lookupProduct(p.id)?.image).toBe(p.image);
  }
});