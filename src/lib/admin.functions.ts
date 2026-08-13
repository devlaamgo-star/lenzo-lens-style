import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { lookupProduct } from "@/lib/product-lookup";

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type AdminLine = {
  key: string;
  name: string;
  image: string | null;
  categoryLabel: string;
  model: string;
  qty: number;
  unitPrice: number | null;
  lineTotal: number | null;
  inPack: boolean;
};

export type AdminSummary = {
  totalItems: number;
  subtotal: number | null;
  discount: number | null;
  discountLabel: string;
  total: number | null;
  paymentMethod: string;
};

export type AdminRecord = {
  kind: "order" | "design";
  id: string;
  reference: string;
  createdAt: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  product: string;
  model: string;
  quantity: number;
  total: number | null;
  status: string;
  locale: string;
  notes: string;
  source: string;
  files: string[];
  lines: AdminLine[];
  summary: AdminSummary | null;
  details: Record<string, string | number | boolean | null>;
};


async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

/** Whether the signed-in user is an admin (and whether an admin exists at all). */
export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    return { isAdmin: Boolean(data), adminExists: (count ?? 0) > 0 };
  });

/** One-time bootstrap: the first signed-in user becomes admin. */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_first_admin");
    if (error) throw new Error(error.message);
    return { claimed: Boolean(data) };
  });

function bucketFor(kind: "order" | "design") {
  return kind === "design" ? "design-uploads" : "order-uploads";
}

export const listAdminOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminRecord[]> => {
    await assertAdmin(context as any);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [orders, designs] = await Promise.all([
      supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("design_requests").select("*").order("created_at", { ascending: false }),
    ]);
    if (orders.error) throw new Error(orders.error.message);
    if (designs.error) throw new Error(designs.error.message);

    const rows: AdminRecord[] = [];

    for (const o of orders.data ?? []) {
      const items = Array.isArray(o.items) ? (o.items as any[]) : [];
      const designsList = (Array.isArray(o.designs) ? (o.designs as any[]) : []).map((d) =>
        typeof d === "string" ? d : String(d?.productId ?? d?.id ?? ""),
      );
      const pack = (o.pack_breakdown ?? null) as any;
      const lines: AdminLine[] = [];

      for (const i of items) {
        const ref = lookupProduct(String(i?.productId ?? ""));
        const qty = Number(i?.qty ?? 1);
        const unit = i?.unitPrice != null ? Number(i.unitPrice) : null;
        lines.push({
          key: `item-${i?.productId ?? lines.length}-${i?.model ?? ""}`,
          name: ref?.name ?? i?.name ?? String(i?.productId ?? "Produit"),
          image: (i?.image as string) ?? ref?.image ?? null,
          categoryLabel: ref?.categoryLabel ?? String(i?.category ?? ""),
          model: String(i?.model ?? o.iphone_model ?? ""),
          qty,
          unitPrice: unit,
          lineTotal: unit != null ? unit * qty : null,
          inPack: false,
        });
      }

      const packQty = new Map<string, number>();
      for (const id of designsList) if (id) packQty.set(id, (packQty.get(id) ?? 0) + 1);
      const packUnit = pack?.promoApplied
        ? null
        : pack?.extraUnitPrice != null
          ? Number(pack.extraUnitPrice)
          : null;
      for (const [id, qty] of packQty) {
        const ref = lookupProduct(id);
        lines.push({
          key: `pack-${id}`,
          name: ref?.name ?? id,
          image: ref?.image ?? null,
          categoryLabel: ref?.categoryLabel ?? "Stickers caméra",
          model: o.iphone_model ?? "",
          qty,
          unitPrice: packUnit,
          lineTotal: packUnit != null ? packUnit * qty : null,
          inPack: true,
        });
      }

      const product =
        lines.map((l) => `${l.name} x${l.qty}`).join(", ") || "—";

      const itemsSubtotal = items.reduce(
        (s, i) => s + (Number(i?.unitPrice ?? 0) * Number(i?.qty ?? 1) || 0),
        0,
      );
      const packCount = Number(pack?.itemCount ?? designsList.length);
      const packListPrice = packCount * Number(pack?.extraUnitPrice ?? 49);
      const packTotal = Number(pack?.packTotal ?? 0);
      const discount = packListPrice > packTotal ? packListPrice - packTotal : 0;

      rows.push({
        kind: "order",
        id: o.id,
        reference: o.order_number,
        createdAt: o.created_at,
        fullName: o.full_name,
        phone: o.phone,
        city: o.city,
        address: o.address,
        product,
        model: o.iphone_model,
        quantity: o.quantity,
        total: o.total_mad,
        status: o.status,
        locale: o.locale,
        notes: o.notes ?? "",
        source: o.source || "/commande",
        files: (o.file_paths ?? []) as string[],
        lines,
        summary: {
          totalItems: lines.reduce((s, l) => s + l.qty, 0) || o.quantity,
          subtotal: itemsSubtotal + packListPrice,
          discount: discount || null,
          discountLabel: discount ? `Offre pack 3 pour ${packTotal} MAD` : "",
          total: o.total_mad,
          paymentMethod: o.payment_method === "cod" ? "Paiement à la livraison" : o.payment_method,
        },
        details: {},
      });
    }

    for (const d of designs.data ?? []) {
      rows.push({
        kind: "design",
        id: d.id,
        reference: d.request_number,
        createdAt: d.created_at,
        fullName: d.full_name,
        phone: d.phone,
        city: d.city,
        address: d.address ?? "",
        product: `Design personnalisé — ${d.request_type}`,
        model: [d.phone_brand, d.phone_model].filter(Boolean).join(" ").trim(),
        quantity: d.quantity ?? 1,
        total: null,
        status: d.status,
        locale: d.locale,
        notes: d.notes,
        source: d.source || "/design-personnalise",
        files: (d.file_paths ?? []) as string[],
        lines: [],
        summary: null,
        details: {
          Sujet: d.subject,
          Style: d.style,
          Couleurs: d.colors,
          Description: d.description,
          "Couleur du téléphone": d.phone_color,
          "Type de demande": d.request_type,
        },
      });
    }


    rows.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return rows;
  });

/** Signed URLs for a record's uploaded files (valid 1h). */
export const getRecordFileUrls = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        kind: z.enum(["order", "design"]),
        paths: z.array(z.string().min(1).max(300)).max(20),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const out: { path: string; url: string }[] = [];
    for (const path of data.paths) {
      const { data: signed } = await supabaseAdmin.storage
        .from(bucketFor(data.kind))
        .createSignedUrl(path, 3600);
      if (signed?.signedUrl) out.push({ path, url: signed.signedUrl });
    }
    return out;
  });

export const updateRecordStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        kind: z.enum(["order", "design"]),
        id: z.string().uuid(),
        status: z.enum(ORDER_STATUSES),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const table = data.kind === "order" ? "orders" : "design_requests";
    const { error } = await supabaseAdmin
      .from(table)
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
