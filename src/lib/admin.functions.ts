import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

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
  details: Record<string, unknown>;
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
      const designsList = Array.isArray(o.designs) ? (o.designs as any[]) : [];
      const product =
        [
          ...items.map((i) => `${i?.name ?? i?.productId ?? ""} x${i?.qty ?? 1}`),
          ...(designsList.length ? [`Pack objectifs (${designsList.length})`] : []),
        ]
          .filter(Boolean)
          .join(", ") || "—";
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
        details: {
          items,
          designs: designsList,
          pack_breakdown: o.pack_breakdown,
          payment_method: o.payment_method,
        },
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
        details: {
          subject: d.subject,
          style: d.style,
          colors: d.colors,
          description: d.description,
          phone_color: d.phone_color,
          request_type: d.request_type,
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
