import { test, expect } from "bun:test";
import { eligibleBundle, isBundleEligible } from "./pricing";
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
