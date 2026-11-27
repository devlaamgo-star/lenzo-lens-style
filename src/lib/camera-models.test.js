import { expect, test } from "bun:test";
import { CAMERA_LENS_SKINS, modelsForCategory } from "./catalog";
import { sanitizeCartItem, parseStoredCart } from "./cart-storage";
import { orderSchema } from "./orders.functions";
import { cameraDeliveryFee, categoryBundles } from "./pricing";

const models = ["iPhone 17 Pro", "iPhone 17 Pro Max", "iPhone 18 Pro", "iPhone 18 Pro Max"];

test("camera options are the four exact requested identities", () => {
  expect(modelsForCategory("lens")).toEqual(models);
});
for (const model of models) {
  test(`${model} retains its exact identity for all 72 designs through basket and order validation`, () => {
    expect(CAMERA_LENS_SKINS).toHaveLength(72);
    for (const product of CAMERA_LENS_SKINS) {
      const item = sanitizeCartItem({ productId: product.id, slug: product.slug, category: "lens", name: product.name, image: product.image, price: 79, model, qty: 1 });
      expect(item?.model).toBe(model);
      expect(item?.key).toBe(`lens:${product.id}:${model}`);
      expect(parseStoredCart(JSON.stringify([item]))[0]?.model).toBe(model);
      const order = orderSchema.parse({ fullName: "Test Camera Model", phone: "0600000000", deliveryZone: "Rabat", fullAddress: "Rue 12, N°45, Appartement 3", items: [{ ...item, name: product.name.fr }], model });
      expect(order.items[0]?.model).toBe(model);
      expect(order.model).toBe(model);
    }
  });
}
test("iPhone 18 options do not expand Back & Lens or Air choices", () => {
  expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
  expect(modelsForCategory("air")).toEqual(["iPhone Air"]);
});
test("four model identities remain separate basket lines", () => {
  const product = CAMERA_LENS_SKINS[0];
  const items = models.map((model) => ({ productId: product.id, category: "lens", name: product.name, price: 79, model, qty: 1 }));
  expect(parseStoredCart(JSON.stringify(items)).map((item) => item.model)).toEqual(models);
});
test("new models inherit 79 DH single price, 20 DH single delivery and 149 DH three-skin offer", () => {
  for (const model of models) {
    const one = [{ category: "lens", qty: 1, price: 79, model }];
    expect(cameraDeliveryFee(one)).toBe(20);
    const three = [{ ...one[0], qty: 3 }];
    expect(237 - categoryBundles(three).discount).toBe(149);
    expect(cameraDeliveryFee(three)).toBe(0);
  }
});
