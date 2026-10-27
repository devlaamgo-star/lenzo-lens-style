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
test("agadir includes official smaller zones and nearby areas", () => {
  expect(searchDeliveryZones("agadir").length).toBeGreaterThanOrEqual(22);
  expect(searchDeliveryZones("agadir").map((z) => z.label)).toContain("Tamraght-Agadir");
  expect(searchDeliveryZones("agadir").map((z) => z.label)).toContain("Ait Melloul");
});
test("biougra finds its city and four official neighborhoods", () => {
  const labels = searchDeliveryZones("BIOUGRA").map((z) => z.label);
  for (const label of ["Biougra ", "Biougra:(Lkhrba)-agadir", "Biougra(Ait Sayh)-agadir",
    "Biougra( Lghriss)-agadir", "Biougra(  Tin Hamou)-agadir"]) expect(labels).toContain(label);
});
test("search ignores accents and matches multiple words", () => {
  expect(searchDeliveryZones("casa beausejour").map((z) => z.label)).toEqual(["Casablanca – Beauséjour"]);
});
test("selected approved label is preserved exactly", () => {
  for (const label of ["Casablanca – Maarif", "Biougra( Lghriss)-agadir", "Tamraght-Agadir", "Rabat", "Biougra ", "El Menzel - Sefrou\t"]) {
    expect(deliveryZoneSchema.parse(label)).toBe(label);
  }
});
test("custom and simplified delivery zones are rejected", () => {
  for (const label of ["casa", "Unknown city", "Casablanca – Unknown", "tamraght-agadir", "x"]) {
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
test("nationwide snapshot retains all 955 unique real Ozon destination values", () => {
  expect(DELIVERY_ZONES).toHaveLength(955);
  expect(new Set(DELIVERY_ZONES.map((z) => z.label)).size).toBe(955);
});
for (const city of ["Casablanca", "Agadir", "Rabat", "Salé", "Temara", "Fes", "Meknes", "Marrakech", "Oujda", "Tanger", "Tetouan", "Kenitra", "El Jadida", "Mohammedia", "Beni Mellal", "Khouribga", "Settat", "Safi", "Nador", "Taza", "Laayoune", "Dakhla"]) {
  test(`supported city ${city} returns delivery zones`, () => {
    expect(searchDeliveryZones(city).length).toBeGreaterThan(0);
  });
}
test("rabat matches its official smaller areas and parent-city alias", () => {
  const labels = searchDeliveryZones("rabat").map((z) => z.label);
  for (const label of ["Rabat", "Youssoufia-RABAT", "akrach-RABAT", "Ain Aouda"]) expect(labels).toContain(label);
});
test("oujda includes related Bni Drar without changing its official value", () => {
  expect(searchDeliveryZones("oujda").map((z) => z.label)).toContain("Bni Drar");
});
test("fes matches all official Fes-named destinations", () => {
  const labels = searchDeliveryZones("fès").map((z) => z.label);
  for (const label of ["Fes", "Ras El Ma-FES", "Ain Allah-fes", "Douiyat-fes", "Oulad Tayeb-fes"]) expect(labels).toContain(label);
});
test("ain partial word matches nationwide areas, not only Casablanca", () => {
  const labels = searchDeliveryZones("aIN").map((z) => z.label);
  for (const label of ["Ain Aouda", "Ain Harouda", "Ain Allah-fes", "Ain Jemaa-meknes", "AIN ATTIQ-TEMARA"]) expect(labels).toContain(label);
});
test("parent city and partial neighborhood search compose across Morocco", () => {
  expect(searchDeliveryZones("temara val").map((z) => z.label)).toEqual(["Plage Val d’Or-TEMARA"]);
  expect(searchDeliveryZones("فاس").map((z) => z.label)).toContain("Ain Allah-fes");
});