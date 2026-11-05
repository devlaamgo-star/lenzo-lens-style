import { expect, test } from "bun:test";
import { BACK_LENS_SKINS, backLensSkinBySlug, mergeBackLensProducts } from "../data/back-lens-skins";
import manifest from "../../catalog-templates/back-lens-skins/imports/organized-2026-11/catalog.json";
import { BACK_LENS_SKIN_PRICE, modelsForCategory } from "./catalog";
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
  expect(BACK_LENS_SKINS).toHaveLength(22);
  expect(BACK_LENS_SKINS.map((p) => p.sourceProductNumber)).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21,22,24]);
  expect(BACK_LENS_SKINS.some((p) => [17,23].includes(p.sourceProductNumber))).toBe(false);
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
  expect(result).toHaveLength(23);
  expect(result[0]).toEqual(existing);
  expect(result.find((p) => p.externalReference === first.externalReference)).toEqual(updated);
});