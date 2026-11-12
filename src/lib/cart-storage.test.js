import { describe, expect, it } from "bun:test";
import { parseStoredCart, parseStoredPack, sanitizeCartItem } from "./cart-storage";

const valid = {
  productId: "lens-zellige", slug: "zellige-royal", category: "lens",
  name: { fr: "Zellige", ar: "زليج", en: "Zellige" }, image: "/a.webp", price: 79,
  model: "iPhone 17 Pro Max", qty: 2, key: "lens:lens-zellige:iPhone 17 Pro Max",
};

describe("saved basket from earlier visits", () => {
  it("keeps a complete item unchanged", () => {
    expect(parseStoredCart(JSON.stringify([valid]))).toEqual([valid]);
  });

  it("drops an item missing its name or category instead of crashing the cart", () => {
    const items = parseStoredCart(JSON.stringify([{ productId: "x1", qty: 1 }, valid]));
    expect(items.map((i) => i.productId)).toEqual(["lens-zellige"]);
  });

  it("keeps an older item saved with a single name text", () => {
    const item = sanitizeCartItem({ ...valid, name: "Ancien nom" });
    expect(item?.name).toEqual({ fr: "Ancien nom", ar: "Ancien nom", en: "Ancien nom" });
  });

  it("drops null, numbers and unreadable text", () => {
    expect(parseStoredCart(JSON.stringify([null, 5, "a"]))).toEqual([]);
    expect(parseStoredCart("{not json")).toEqual([]);
    expect(parseStoredCart(JSON.stringify({ items: [valid] }))).toEqual([]);
  });

  it("caps quantity at 20 and rejects zero or negative quantities", () => {
    expect(sanitizeCartItem({ ...valid, qty: 99 })?.qty).toBe(20);
    expect(sanitizeCartItem({ ...valid, qty: 0 })).toBeNull();
    expect(sanitizeCartItem({ ...valid, qty: "3" })?.qty).toBe(3);
  });

  it("forces iPhone Air items to the iPhone Air model", () => {
    const air = sanitizeCartItem({ ...valid, category: "air", model: "iPhone 17 Pro" });
    expect(air?.model).toBe("iPhone Air");
    expect(air?.key).toBe("air:lens-zellige:iPhone Air");
  });

  it("drops a custom design without its saved files", () => {
    expect(sanitizeCartItem({ ...valid, category: "custom" })).toBeNull();
  });
});

describe("saved pack selection", () => {
  it("keeps only design ids", () => {
    expect(parseStoredPack(JSON.stringify({ designs: [{ id: 1 }, null, "a", "b"] }))).toEqual({ designs: ["a", "b"] });
    expect(parseStoredPack("null")).toEqual({ designs: [] });
  });
});
