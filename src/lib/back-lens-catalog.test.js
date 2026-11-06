import { expect, test } from "bun:test";
import { BACK_LENS_SKINS, backLensSkinBySlug, mergeBackLensProducts } from "../data/back-lens-skins";
import manifest from "../../catalog-templates/back-lens-skins/imports/organized-2026-11/catalog.json";
import batch02Manifest from "../../catalog-templates/back-lens-skins/imports/batch02/catalog.json";
import { ORGANIZED_BACK_LENS_PRODUCTS } from "../data/organized-back-lens-products";
import { BATCH02_BACK_LENS_PRODUCTS } from "../data/batch02-back-lens-products";
import { BACK_LENS_SKIN_PRICE, modelsForCategory } from "./catalog";
import { readFileSync } from "node:fs";
import { ARCHIVED_BACK_LENS_SKINS } from "../data/archive/back-lens-skins";
import { createBackLensProduct } from "../data/back-lens-product-template";
import { lookupProduct } from "./product-lookup";

test("All 30 archived designs remain absent from active listings and slug lookup", () => {
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
});

test("Exactly 22 ready entries preserve original numbering; 17 and 23 remain pending", () => {
  expect(ORGANIZED_BACK_LENS_PRODUCTS).toHaveLength(22);
  expect(ORGANIZED_BACK_LENS_PRODUCTS.map((p) => p.sourceProductNumber)).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21,22,24]);
  expect(ORGANIZED_BACK_LENS_PRODUCTS.some((p) => [17,23].includes(p.sourceProductNumber))).toBe(false);
});

for (const entry of manifest.products.filter((p) => p.import_status === "ready")) {
  test(`Product ${entry.source_product_number}: exact manifest mapping and inherited setup`, () => {
    const product = backLensSkinBySlug(entry.slug);
    const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
    expect(product).toBeDefined();
    expect(product.id).toBe(entry.external_reference);
    expect(product.externalReference).toBe(entry.external_reference);
    expect(product.displayOrder).toBe(entry.display_order);
    expect(product.name).toEqual({ fr: entry.name, ar: entry.name, en: entry.name });
    expect(product.gallery).toHaveLength(2);
    expect(product.image).toBe(product.gallery[0]);
    expect(product.gallery[1]).not.toBe(product.image);
    const pointer = (role) => JSON.parse(readFileSync(new URL(`../assets/backlens/organized-2026-11/product-${String(entry.source_product_number).padStart(2, "0")}-${role}.png.asset.json`, import.meta.url), "utf8")).url;
    expect(product.gallery).toEqual([pointer("main"), pointer("gallery")]);
    expect(product.description).toEqual(reference.description);
    expect(product.category).toBe("back-and-lens-skins");
    expect(product.device).toBe(reference.device);
    expect(product.inStock).toBe(reference.inStock);
    expect(BACK_LENS_SKIN_PRICE).toBe(129);
    expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
    expect(lookupProduct(product.id)?.name).toBe(entry.name);
  });
}

test("Repeated imports update by external reference and preserve unrelated products", () => {
  const first = BACK_LENS_SKINS[0];
  const existing = { ...first, id: "existing-product", slug: "existing-product", externalReference: "existing-product" };
  const updated = { ...first, name: { fr: "Updated", ar: "Updated", en: "Updated" } };
  const result = mergeBackLensProducts([existing, ...BACK_LENS_SKINS], [updated]);
  expect(result).toHaveLength(31);
  expect(result[0]).toEqual(existing);
  expect(result.find((p) => p.externalReference === first.externalReference)).toEqual(updated);
});

test("Batch 02 appends eight products without replacing Batch 01 local numbers", () => {
  expect(BATCH02_BACK_LENS_PRODUCTS).toHaveLength(8);
  expect(BACK_LENS_SKINS).toHaveLength(30);
  expect(BACK_LENS_SKINS.slice(0, 22)).toEqual(ORGANIZED_BACK_LENS_PRODUCTS);
  expect(BACK_LENS_SKINS.slice(22)).toEqual(BATCH02_BACK_LENS_PRODUCTS);
  expect(BATCH02_BACK_LENS_PRODUCTS.map((p) => p.sourceProductNumber)).toEqual([1,2,3,4,5,6,7,8]);
  expect(new Set(BACK_LENS_SKINS.map((p) => p.id)).size).toBe(30);
  expect(new Set(BACK_LENS_SKINS.map((p) => p.slug)).size).toBe(30);
  expect(mergeBackLensProducts(BACK_LENS_SKINS, BATCH02_BACK_LENS_PRODUCTS)).toEqual(BACK_LENS_SKINS);
});

for (const entry of batch02Manifest.products) {
  test(`Batch 02 product ${entry.source_product_number}: exact identity, gallery order and inherited configuration`, () => {
    const product = backLensSkinBySlug(entry.slug);
    const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
    const pointer = (role) => JSON.parse(readFileSync(new URL(`../assets/backlens/batch02/batch02-product-${String(entry.source_product_number).padStart(2, "0")}-${role}.png.asset.json`, import.meta.url), "utf8")).url;
    expect(product).toEqual({
      ...reference,
      id: entry.external_reference,
      externalReference: entry.external_reference,
      sourceProductNumber: entry.source_product_number,
      displayOrder: entry.suggested_catalog_position,
      slug: entry.slug,
      name: { fr: entry.name, ar: entry.name, en: entry.name },
      image: pointer("main"),
      gallery: [pointer("main"), pointer("gallery")],
    });
    expect(BACK_LENS_SKIN_PRICE).toBe(129);
    expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
    expect(lookupProduct(entry.external_reference)?.name).toBe(entry.name);
  });
}