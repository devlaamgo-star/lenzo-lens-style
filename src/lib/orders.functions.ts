import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CATEGORY_PRICES, CUSTOM_COVERAGE_PRICES, packBreakdown } from "./pricing";

const moroccanPhone = /^(?:\+212|00212|0)([5-7])\d{8}$/;

const customSkinSchema = z.object({
  modelId: z.string().trim().max(60),
  modelLabel: z.string().trim().max(60),
  coverage: z.enum(["full", "back", "camera"]),
  templateId: z.string().trim().max(80),
  transform: z.object({
    x: z.number(),
    y: z.number(),
    scale: z.number(),
    rotation: z.number(),
  }),
  originalPath: z.string().trim().max(300),
  previewPath: z.string().trim().max(300),
});

const itemSchema = z.object({
  productId: z.string().trim().min(1).max(60),
  name: z.string().trim().min(1).max(120),
  category: z.enum(["lens", "skins", "backlens", "air", "custom"]),
  model: z.string().trim().min(3).max(40),
  qty: z.number().int().min(1).max(20),
  image: z.string().trim().max(400).optional().default(""),
  slug: z.string().trim().max(80).optional().default(""),
  custom: customSkinSchema.optional(),
});

/** Prix unitaire d'une ligne : couverture du skin personnalisé sinon prix catégorie. */
function unitPriceFor(item: z.infer<typeof itemSchema>) {
  if (item.category === "custom" && item.custom) {
    return CUSTOM_COVERAGE_PRICES[item.custom.coverage];
  }
  return CATEGORY_PRICES[item.category];
}

export const orderSchema = z.object({
  fullName: z.string().trim().min(3).max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .refine((v) => moroccanPhone.test(v)),
  city: z.string().trim().min(2).max(60),
  address: z.string().trim().min(8).max(300),
  model: z.string().trim().max(40).default(""),
  designs: z.array(z.string().trim().min(1).max(40)).max(30).default([]),
  items: z.array(itemSchema).max(30).default([]),
  notes: z.string().trim().max(500).optional().default(""),
  locale: z.enum(["fr", "ar", "en"]).default("fr"),
  source: z.string().trim().max(120).default("/commande"),
});

export type OrderInput = z.infer<typeof orderSchema>;

function buildOrderNumber() {
  const d = new Date();
  const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate(),
  ).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LNZ-${stamp}-${rand}`;
}

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const pack = packBreakdown(data.designs.length);
    const hasPack = pack.count > 0;
    if (!hasPack && data.items.length === 0) throw new Error("EMPTY_ORDER");
    if (hasPack && !data.model) throw new Error("MODEL_REQUIRED");

    const itemsTotal = data.items.reduce((sum, i) => sum + unitPriceFor(i) * i.qty, 0);

    const customPaths = data.items.flatMap((i) =>
      i.custom ? [i.custom.previewPath, i.custom.originalPath] : [],
    );
    const total = itemsTotal + pack.total;
    const quantity =
      data.items.reduce((sum, i) => sum + i.qty, 0) + pack.count;

    const orderNumber = buildOrderNumber();
    const { error } = await supabaseAdmin.from("orders").insert({
      order_number: orderNumber,
      full_name: data.fullName,
      phone: data.phone,
      city: data.city,
      address: data.address,
      iphone_model: data.model,
      designs: data.designs,
      items: data.items.map((i) => ({
        ...i,
        image: i.image || undefined,
        unitPrice: unitPriceFor(i),
        lineTotal: unitPriceFor(i) * i.qty,
      })),
      file_paths: customPaths,
      quantity,
      notes: data.notes || null,
      pack_breakdown: {
        itemCount: pack.count,
        promoApplied: pack.promoApplies,
        promoItems: pack.promoCount,
        promoTotal: pack.promoTotal,
        extraItems: pack.extraCount,
        extraUnitPrice: CATEGORY_PRICES.lens,
        extraTotal: pack.extraTotal,
        packTotal: pack.total,
      },
      total_mad: total,
      payment_method: "cod",
      status: "new",
      source: data.source,
      locale: data.locale,
    });

    if (error) {
      console.error("[orders] insert failed", error.message);
      throw new Error("ORDER_FAILED");
    }

    const { postWebhookJson } = await import("./webhook.server");
    const { designById } = await import("./catalog");
    await postWebhookJson({
      event_type: "new_order",
      order_number: orderNumber,
      customer: {
        full_name: data.fullName,
        phone: data.phone,
        address: data.address,
        city: data.city,
      },
      products: [
        ...data.items.map((i) => ({
          name: i.name,
          category: i.category,
          design: i.productId,
          model: i.model,
          quantity: i.qty,
          price: `${unitPriceFor(i)} MAD`,
          line_total: `${unitPriceFor(i) * i.qty} MAD`,
          custom_skin: i.custom
            ? {
                model: i.custom.modelLabel,
                coverage: i.custom.coverage,
                template: i.custom.templateId,
                transform: i.custom.transform,
                original_file: i.custom.originalPath,
                preview_file: i.custom.previewPath,
              }
            : undefined,
        })),
        ...data.designs.map((id) => ({
          name: designById(id)?.name.fr ?? id,
          category: "lens",
          design: id,
          model: data.model,
          quantity: 1,
          price: `${CATEGORY_PRICES.lens} MAD`,
          in_pack: true,
        })),
      ],
      discount: pack.promoApplies
        ? `Pack 3 pour 99 MAD (${pack.promoCount} articles à ${pack.promoTotal} MAD)`
        : "",
      pack_breakdown: pack,
      quantity,
      total: `${total} MAD`,
      payment_method: "cod",
      notes: data.notes || "",
      language: data.locale,
      timestamp: new Date().toISOString(),
    });

    return { orderNumber, total, quantity };
  });

