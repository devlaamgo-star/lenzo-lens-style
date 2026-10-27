import { test, expect } from "bun:test";
import { SKIN_MODELS, templateFor } from "./skin-templates";

test("customizer offers Pro directly after Pro Max", () => {
  expect(SKIN_MODELS.map((m) => m.label)).toEqual(["iPhone 17 Pro Max", "iPhone 17 Pro"]);
});

test("Pro selection keeps each existing coverage preview unchanged and records the selected model", () => {
  for (const coverage of ["back", "camera"]) {
    const max = templateFor("iphone-17-pro-max", coverage);
    const pro = templateFor("iphone-17-pro", coverage);
    expect(pro).toEqual({ ...max, modelId: "iphone-17-pro", modelLabel: "iPhone 17 Pro" });
    expect(pro?.coverage).toBe(coverage);
  }
});