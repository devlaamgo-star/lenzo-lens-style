import { expect, test } from "bun:test";
import { BACK_LENS_SKINS, backLensSkinBySlug } from "../data/back-lens-skins";
import { ARCHIVED_BACK_LENS_SKINS } from "../data/archive/back-lens-skins";
import { createBackLensProduct } from "../data/back-lens-product-template";
import { lookupProduct } from "./product-lookup";

test("All 30 ready-made Back & Lens designs are removed from active listings and slug lookup", () => {
  expect(BACK_LENS_SKINS).toEqual([]);
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
  expect(BACK_LENS_SKINS).toEqual([]);
});