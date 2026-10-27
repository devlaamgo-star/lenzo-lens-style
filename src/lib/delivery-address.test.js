import { test, expect } from "bun:test";
import { DELIVERY_ZONES } from "../data/delivery-zones";
import { searchDeliveryZones, deliveryZoneSchema, fullAddressSchema } from "./delivery-address";

test("empty search shows no zones", () => {
  expect(searchDeliveryZones("")).toEqual([]);
});
test("casa includes neighborhoods and parent-city nearby areas", () => {
  const labels = searchDeliveryZones("CASA").map((z) => z.label);
  expect(labels).toContain("Casablanca – Maarif");
  expect(labels).toContain("Daroua");
  expect(labels).not.toContain("Agadir");
});
test("ain matches all supplied Casablanca Ain zones", () => {
  const labels = searchDeliveryZones("ain").map((z) => z.label);
  for (const name of ["Ain Chock", "Ain Sebaa", "Ain Borja", "Ain Diab"]) {
    expect(labels).toContain(`Casablanca – ${name}`);
  }
});
test("agadir finds all 21 examples, including related areas", () => {
  expect(searchDeliveryZones("agadir")).toHaveLength(21);
  expect(searchDeliveryZones("agadir").map((z) => z.label)).toContain("Tamraght-Agadir");
});
test("biougra finds exactly the four supplied areas", () => {
  expect(searchDeliveryZones("BIOUGRA").map((z) => z.label)).toEqual([
    "Biougra (Lkhrba)-Agadir", "Biougra (Ait Sayh)-Agadir",
    "Biougra (Lghriss)-Agadir", "Biougra (Tin Hamou)-Agadir",
  ]);
});
test("search ignores accents and matches multiple words", () => {
  expect(searchDeliveryZones("casa beausejour").map((z) => z.label)).toEqual(["Casablanca – Beauséjour"]);
});
test("selected approved label is preserved exactly", () => {
  for (const label of ["Casablanca – Maarif", "Biougra (Lghriss)-Agadir", "Tamraght-Agadir"]) {
    expect(deliveryZoneSchema.parse(label)).toBe(label);
  }
});
test("custom and simplified delivery zones are rejected", () => {
  for (const label of ["casa", "Casablanca", "Rabat", "Casablanca – Unknown", "tamraght-agadir"]) {
    expect(deliveryZoneSchema.safeParse(label).success).toBe(false);
  }
});
test("incomplete addresses casa, hay salam and agadir are rejected", () => {
  for (const address of ["casa", "hay salam", "agadir", "abcdefghijklmnop"]) {
    expect(fullAddressSchema.safeParse(address).success).toBe(false);
  }
});
test("complete street and residence addresses are accepted", () => {
  expect(fullAddressSchema.parse("Hay Salam, Rue 12, N°45, Appartement 3")).toBe("Hay Salam, Rue 12, N°45, Appartement 3");
  expect(fullAddressSchema.safeParse("دوار السلام قرب مدرسة النور").success).toBe(true);
});
test("dataset remains limited to the supplied examples with unique labels", () => {
  expect(DELIVERY_ZONES).toHaveLength(52);
  expect(new Set(DELIVERY_ZONES.map((z) => z.label)).size).toBe(52);
});