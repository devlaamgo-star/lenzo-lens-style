import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { lookupProduct } from "@/lib/product-lookup";

const COVERAGE_FR: Record<string, string> = {
  full: "Arrière & côtés",
  back: "Arrière uniquement",
  camera: "Zone caméra",
};

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "processing",
  "ready_to_ship",
  "shipped",
  "out_for_delivery",
  "delivered",
  "completed",
  "cancelled",
  "returned",
  "failed_delivery",
] as const;

export const PAYMENT_STATUSES = [
  "cod_pending",
  "paid",
  "refused",
  "returned",
  "refunded",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export type StatusEvent = { status: string; at: string };

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
  paymentStatus: string;
  carrier: string;
  tracking: string;
  shippedAt: string | null;
  expectedDeliveryAt: string | null;
  adminNotes: string;
  priority: string;
  archived: boolean;
  history: StatusEvent[];
  trafficSource: string;
  utm: { source: string; medium: string; campaign: string; fbclid: string; ttclid: string };
};

function ops(row: any) {
  return {
    paymentStatus: (row.payment_status as string) || "cod_pending",
    carrier: (row.shipping_carrier as string) || "",
    tracking: (row.tracking_number as string) || "",
    shippedAt: (row.shipped_at as string) ?? null,
    expectedDeliveryAt: (row.expected_delivery_at as string) ?? null,
    adminNotes: (row.admin_notes as string) || "",
    priority: (row.priority as string) || "normal",
    archived: Boolean(row.archived),
    history: (Array.isArray(row.status_history) ? row.status_history : []) as StatusEvent[],
    trafficSource: (row.traffic_source as string) || "direct",
    utm: {
      source: (row.utm_source as string) || "",
      medium: (row.utm_medium as string) || "",
      campaign: (row.utm_campaign as string) || "",
      fbclid: (row.fbclid as string) || "",
      ttclid: (row.ttclid as string) || "",
    },
  };
}


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

      const customDetails: Record<string, string> = {};
      let customIndex = 0;

      for (const i of items) {
        const ref = lookupProduct(String(i?.productId ?? ""));
        const qty = Number(i?.qty ?? 1);
        const unit = i?.unitPrice != null ? Number(i.unitPrice) : null;
        const custom = (i?.custom ?? null) as any;
        if (custom) {
          customIndex += 1;
          const tr = custom.transform ?? {};
          customDetails[`Skin personnalisé ${customIndex}`] =
            `${custom.modelLabel ?? custom.modelId ?? ""} — ${COVERAGE_FR[String(custom.coverage)] ?? custom.coverage}` +
            ` · zoom ${Math.round(Number(tr.scale ?? 1) * 100)}%` +
            ` · rotation ${Math.round(Number(tr.rotation ?? 0))}°` +
            ` · position X ${Math.round(Number(tr.x ?? 0))} / Y ${Math.round(Number(tr.y ?? 0))}`;
        }
        lines.push({
          key: `item-${i?.productId ?? lines.length}-${i?.model ?? ""}`,
          name: ref?.name ?? i?.name ?? String(i?.productId ?? "Produit"),
          image: (i?.image as string) ?? ref?.image ?? null,
          categoryLabel: custom
            ? "Skin personnalisé"
            : (ref?.categoryLabel ?? String(i?.category ?? "")),
          model: String(custom?.modelLabel ?? i?.model ?? o.iphone_model ?? ""),
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
      const packListPrice = packCount * Number(pack?.extraUnitPrice ?? 79);
      const packTotal = Number(pack?.packTotal ?? 0);
      const packDiscount = packListPrice > packTotal ? packListPrice - packTotal : 0;
      const cameraBundleDiscount = Number(pack?.cameraBundleDiscount ?? 0) || 0;
      const discount = packDiscount + cameraBundleDiscount;

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
          discountLabel: discount
            ? [
                packDiscount ? `Offre pack 3 pour ${packTotal} MAD` : "",
                cameraBundleDiscount ? "Offre Stickers caméra 3 pour 149 MAD" : "",
              ]
                .filter(Boolean)
                .join(" + ")
            : "",
          total: o.total_mad,
          paymentMethod: o.payment_method === "cod" ? "Paiement à la livraison" : o.payment_method,
        },
        details: customDetails,
        ...ops(o),
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
        ...ops(d),
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

const targetSchema = z.object({
  kind: z.enum(["order", "design"]),
  id: z.string().uuid(),
});

function tableFor(kind: "order" | "design") {
  return kind === "order" ? "orders" : "design_requests";
}

async function applyStatus(
  admin: any,
  kind: "order" | "design",
  id: string,
  status: OrderStatus,
) {
  const table = tableFor(kind);
  const { data: row } = await admin
    .from(table)
    .select("status_history, shipped_at")
    .eq("id", id)
    .maybeSingle();
  const history: StatusEvent[] = Array.isArray(row?.status_history) ? row.status_history : [];
  const patch: Record<string, unknown> = {
    status,
    status_history: [...history, { status, at: new Date().toISOString() }],
  };
  if (status === "shipped" && !row?.shipped_at) patch['shipped_at'] = new Date().toISOString();
  const { error } = await admin.from(table).update(patch as never).eq("id", id);
  if (error) throw new Error(error.message);
}

export const updateRecordStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    targetSchema.extend({ status: z.enum(ORDER_STATUSES) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await applyStatus(supabaseAdmin, data.kind, data.id, data.status);
    return { ok: true };
  });

/** Change the status of several records at once. */
export const bulkUpdateStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        targets: z.array(targetSchema).min(1).max(200),
        status: z.enum(ORDER_STATUSES),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    for (const t of data.targets) {
      await applyStatus(supabaseAdmin, t.kind, t.id, data.status);
    }
    return { ok: true, count: data.targets.length };
  });

/** Update operational fields: payment, shipping, notes, priority, archive. */
export const updateRecordOps = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    targetSchema
      .extend({
        paymentStatus: z.enum(PAYMENT_STATUSES).optional(),
        carrier: z.string().trim().max(80).optional(),
        tracking: z.string().trim().max(80).optional(),
        expectedDeliveryAt: z.string().trim().max(40).nullable().optional(),
        adminNotes: z.string().trim().max(2000).optional(),
        priority: z.enum(["normal", "urgent"]).optional(),
        archived: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (data.paymentStatus !== undefined) patch['payment_status'] = data.paymentStatus;
    if (data.carrier !== undefined) patch['shipping_carrier'] = data.carrier;
    if (data.tracking !== undefined) patch['tracking_number'] = data.tracking;
    if (data.expectedDeliveryAt !== undefined)
      patch['expected_delivery_at'] = data.expectedDeliveryAt || null;
    if (data.adminNotes !== undefined) patch['admin_notes'] = data.adminNotes;
    if (data.priority !== undefined) patch['priority'] = data.priority;
    if (data.archived !== undefined) patch['archived'] = data.archived;
    if (Object.keys(patch).length === 0) return { ok: true };
    const { error } = await supabaseAdmin
      .from(tableFor(data.kind))
      .update(patch as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Permanently delete orders/design requests (and their uploaded files). */
export const deleteRecords = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ targets: z.array(targetSchema).min(1).max(500) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as any);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let count = 0;
    for (const kind of ["order", "design"] as const) {
      const ids = data.targets.filter((t) => t.kind === kind).map((t) => t.id);
      if (!ids.length) continue;
      const { data: rows } = await supabaseAdmin
        .from(tableFor(kind))
        .select("file_paths")
        .in("id", ids);
      const paths = (rows ?? []).flatMap((r: any) => (r.file_paths ?? []) as string[]);
      const { error, count: n } = await supabaseAdmin
        .from(tableFor(kind))
        .delete({ count: "exact" })
        .in("id", ids);
      if (error) throw new Error(error.message);
      count += n ?? 0;
      if (paths.length) await supabaseAdmin.storage.from(bucketFor(kind)).remove(paths);
    }
    return { ok: true, count };
  });
