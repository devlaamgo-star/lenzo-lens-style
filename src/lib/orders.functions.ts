import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const moroccanPhone = /^(?:\+212|00212|0)([5-7])\d{8}$/;

export const orderSchema = z.object({
  fullName: z.string().trim().min(3).max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .refine((v) => moroccanPhone.test(v)),
  city: z.string().trim().min(2).max(60),
  address: z.string().trim().min(8).max(300),
  model: z.string().trim().min(3).max(40),
  designs: z.array(z.string().trim().min(1).max(40)).length(3),
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

    const orderNumber = buildOrderNumber();
    const { error } = await supabaseAdmin.from("orders").insert({
      order_number: orderNumber,
      full_name: data.fullName,
      phone: data.phone,
      city: data.city,
      address: data.address,
      iphone_model: data.model,
      designs: data.designs,
      notes: data.notes || null,
      total_mad: 99,
      payment_method: "cod",
      status: "pending",
      locale: data.locale,
    });

    if (error) {
      console.error("[orders] insert failed", error.message);
      throw new Error("ORDER_FAILED");
    }

    return { orderNumber };
  });
