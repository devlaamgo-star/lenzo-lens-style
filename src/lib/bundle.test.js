import { test, expect } from "bun:test";
import { eligibleBundle, isBundleEligible, categoryBundles, cameraDeliveryFee, CATEGORY_PRICES } from "./pricing";
test("only camera-only categories are eligible", () => {
  expect(isBundleEligible("lens")).toBe(true);
  expect(isBundleEligible("air")).toBe(true);
  for (const c of ["backlens", "skins", "custom"]) expect(isBundleEligible(c)).toBe(false);
});
test("3/6/9 camera skins at 79", () => {
  expect(eligibleBundle(Array(3).fill(79)).bundledTotal).toBe(149);
  expect(eligibleBundle(Array(4).fill(79)).bundledTotal).toBe(228);
  expect(eligibleBundle(Array(6).fill(79)).bundledTotal).toBe(298);
  expect(eligibleBundle(Array(9).fill(79)).bundledTotal).toBe(447);
});
test("iPhone Air keeps its 79 MAD price and separate 149 MAD bundle", () => {
  expect(CATEGORY_PRICES.air).toBe(79);
  const items = [{ category: "air", qty: 3, price: 79 }];
  expect(237 - categoryBundles(items).discount).toBe(149);
  expect(cameraDeliveryFee(items)).toBe(0);
});
test("one camera skin is 79 plus 20 delivery, total 99 MAD", () => {
  const items = [{ category: "lens", qty: 1, price: 79 }];
  expect(CATEGORY_PRICES.lens).toBe(79);
  expect(cameraDeliveryFee(items)).toBe(20);
  expect(79 - categoryBundles(items).discount + cameraDeliveryFee(items)).toBe(99);
});
test("three camera skins are 149 MAD with free delivery", () => {
  const items = [{ category: "lens", qty: 3, price: 79 }];
  expect(237 - categoryBundles(items).discount + cameraDeliveryFee(items)).toBe(149);
  expect(cameraDeliveryFee(items)).toBe(0);
});
test("different camera designs qualify together", () => {
  const items = Array.from({ length: 3 }, (_, id) => ({ productId: String(id), category: "lens", qty: 1, price: 79 }));
  expect(categoryBundles(items).discount).toBe(88);
});
test("Air and camera skins cannot mix to qualify", () => {
  expect(categoryBundles([{ category: "lens", qty: 2, price: 79 }, { category: "air", qty: 1, price: 79 }]).discount).toBe(0);
  expect(categoryBundles([{ category: "lens", qty: 1, price: 79 }, { category: "air", qty: 2, price: 79 }]).discount).toBe(0);
});
test("mixed baskets keep free delivery", () => {
  for (const category of ["air", "backlens", "custom", "skins"]) {
    expect(cameraDeliveryFee([{ category: "lens", qty: 1 }, { category, qty: 1 }])).toBe(0);
  }
});
test("non-camera prices and delivery are unchanged", () => {
  expect(CATEGORY_PRICES).toEqual({ lens: 79, skins: 149, backlens: 129, air: 79, custom: 149 });
  for (const category of ["backlens", "custom", "skins"]) {
    expect(categoryBundles([{ category, qty: 3, price: 79 }]).discount).toBe(0);
    expect(cameraDeliveryFee([{ category, qty: 1 }])).toBe(0);
  }
});
test("two camera skins keep normal price and free delivery", () => {
  const items = [{ category: "lens", qty: 2, price: 79 }];
  expect(158 - categoryBundles(items).discount + cameraDeliveryFee(items)).toBe(158);
});
test("legacy camera-only selection has the same single-item fee", () => {
  expect(cameraDeliveryFee([], 1)).toBe(20);
  expect(cameraDeliveryFee([], 3)).toBe(0);
  expect(cameraDeliveryFee([{ category: "air", qty: 1 }], 1)).toBe(0);
  expect(cameraDeliveryFee([])).toBe(0);
});
test("3 identical or 3 different camera designs both cost 149 MAD with free delivery", () => {
  const identical = [{ productId: "lens-naruto-curieux", category: "lens", qty: 3, price: 79 }];
  const different = ["lens-naruto-curieux", "lens-pepe-blase", "lens-fc-barcelone"].map((productId) => ({ productId, category: "lens", qty: 1, price: 79 }));
  for (const items of [identical, different]) {
    expect(237 - categoryBundles(items).discount + cameraDeliveryFee(items)).toBe(149);
    expect(cameraDeliveryFee(items)).toBe(0);
  }
});
test("the camera offer never applies to back & lens skins", () => {
  const items = [{ category: "backlens", qty: 3, price: 129 }];
  expect(categoryBundles(items).discount).toBe(0);
});
