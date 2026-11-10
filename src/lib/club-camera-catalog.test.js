import { expect, test } from "bun:test";
import { CAMERA_LENS_SKINS, LENS_SKIN_PRICE, modelsForCategory } from "./catalog";
import { lookupProduct } from "./product-lookup";

const slugs = ["fc-barcelone", "paris-saint-germain", "manchester-united", "manchester-city", "liverpool", "arsenal", "chelsea", "bayern-munich", "juventus", "ac-milan", "raja-casablanca", "wydad-casablanca", "as-far", "mas-fes"];

for (const slug of slugs) {
  test(`${slug} is one camera product with its own image and admin lookup`, () => {
    const matches = CAMERA_LENS_SKINS.filter((skin) => skin.slug === slug);
    expect(matches).toHaveLength(1);
    const skin = matches[0];
    expect(skin.category).toBe("camera-lens-skins");
    expect(skin.gallery).toEqual([skin.image]);
    expect(skin.image).toEndWith(`/${slug}.png`);
    expect(lookupProduct(skin.id)?.image).toBe(skin.image);
    expect(lookupProduct(skin.slug)?.id).toBe(skin.id);
  });
}

test("club imports preserve all 56 existing camera designs and unique identities", () => {
  expect(CAMERA_LENS_SKINS).toHaveLength(107);
  expect(new Set(CAMERA_LENS_SKINS.map((skin) => skin.id)).size).toBe(107);
  expect(new Set(CAMERA_LENS_SKINS.map((skin) => skin.slug)).size).toBe(107);
  expect(CAMERA_LENS_SKINS[0].slug).toBe("horizon-ambre");
  expect(CAMERA_LENS_SKINS[55].slug).toBe("focus-mode");
});

test("club stickers inherit the existing camera price and both compatible models", () => {
  expect(LENS_SKIN_PRICE).toBe(79);
  expect(modelsForCategory("lens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
});