import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CATEGORY_PRICES, PACK_TOTAL } from "./pricing";

const moroccanPhone = /^(?:\+212|00212|0)([5-7])\d{8}$/;

const itemSchema = z.object({
  productId: z.string().trim().min(1).max(60),
  name: z.string().trim().min(1).max(120),
  category: z.enum(["lens", "skins", "backlens", "air", "anime"]),
  model: z.string().trim().min(3).max(40),
  qty: z.number().int().min(1).max(20),
});

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
  designs: z.array(z.string().trim().min(1).max(40)).max(3).default([]),
  items: z.array(itemSchema).max(30).default([]),
  notes: z.string().trim().max(500).optional().default(""),
  locale: z.enum(["fr", "ar", "en"]).default("fr"),
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

    const hasPack = data.designs.length === 3;
    if (!hasPack && data.items.length === 0) throw new Error("EMPTY_ORDER");
    if (hasPack && !data.model) throw new Error("MODEL_REQUIRED");

    const itemsTotal = data.items.reduce(
      (sum, i) => sum + CATEGORY_PRICES[i.category] * i.qty,
      0,
    );
    const total = itemsTotal + (hasPack ? PACK_TOTAL : 0);
    const quantity =
      data.items.reduce((sum, i) => sum + i.qty, 0) + (hasPack ? 1 : 0);

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
        unitPrice: CATEGORY_PRICES[i.category],
        lineTotal: CATEGORY_PRICES[i.category] * i.qty,
      })),
      quantity,
      notes: data.notes || null,
      total_mad: total,
      payment_method: "cod",
      status: "pending_confirmation",
      locale: data.locale,
    });

    if (error) {
      console.error("[orders] insert failed", error.message);
      throw new Error("ORDER_FAILED");
    }

    return { orderNumber, total, quantity };
  });
