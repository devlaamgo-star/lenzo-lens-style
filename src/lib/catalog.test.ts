import { expect, test } from "bun:test";
import * as catalog from "./catalog";

test("Full Body Skins is not available in the storefront catalog", () => {
  expect("FULL_BODY_SKINS" in catalog).toBe(false);
  expect("skinBySlug" in catalog).toBe(false);
});

test("Other storefront categories remain available", () => {
  expect(catalog.CAMERA_LENS_SKINS.length).toBeGreaterThan(0);
  expect(catalog.BACK_LENS_SKINS.length).toBeGreaterThan(0);
  expect(catalog.IPHONE_AIR_SKINS.length).toBeGreaterThan(0);
});