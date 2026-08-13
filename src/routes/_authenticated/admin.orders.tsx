import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ORDER_STATUSES,
  type AdminRecord,
  type OrderStatus,
  claimFirstAdmin,
  getAdminStatus,
  getRecordFileUrls,
  listAdminOrders,
  updateRecordStatus,
} from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WHATSAPP_NUMBER } from "@/lib/catalog";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: AdminOrdersPage,
  head: () => ({
    meta: [
      { title: "Commandes — Admin SKINUP" },
      { name: "description", content: "Gestion des commandes et demandes de design SKINUP." },
      { property: "og:title", content: "Commandes — Admin SKINUP" },
      {
        property: "og:description",
        content: "Gestion des commandes et demandes de design SKINUP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const STATUS_LABEL: Record<string, string> = {
  new: "Nouvelle",
  confirmed: "Confirmée",
  preparing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_CLASS: Record<string, string> = {
  new: "bg-primary/15 text-primary",
  confirmed: "bg-blue-500/15 text-blue-600",
  preparing: "bg-amber-500/15 text-amber-600",
  shipped: "bg-violet-500/15 text-violet-600",
  delivered: "bg-emerald-500/15 text-emerald-600",
  cancelled: "bg-destructive/15 text-destructive",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("fr-MA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function waLink(phone: string, ref: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0/, "212");
  return `https://wa.me/${digits || WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Bonjour, il s'agit de SKINUP au sujet de votre commande ${ref}.`,
  )}`;
}

function AdminOrdersPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchStatus = useServerFn(getAdminStatus);
  const fetchOrders = useServerFn(listAdminOrders);
  const claim = useServerFn(claimFirstAdmin);
  const setStatus = useServerFn(updateRecordStatus);
  const fetchFiles = useServerFn(getRecordFileUrls);

  const statusQuery = useQuery({ queryKey: ["admin-status"], queryFn: () => fetchStatus() });
  const isAdmin = statusQuery.data?.isAdmin ?? false;

  const ordersQuery = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders(),
    enabled: isAdmin,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState<AdminRecord | null>(null);

  const rows = ordersQuery.data ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (q && ![r.fullName, r.phone, r.reference, r.city].some((v) => v?.toLowerCase().includes(q)))
        return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      const d = r.createdAt.slice(0, 10);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }, [rows, search, statusFilter, from, to]);

  const counters = useMemo(
    () => ({
      total: rows.length,
      fresh: rows.filter((r) => r.status === "new").length,
      delivered: rows.filter((r) => r.status === "delivered").length,
    }),
    [rows],
  );

  const statusMutation = useMutation({
    mutationFn: (v: { kind: "order" | "design"; id: string; status: OrderStatus }) =>
      setStatus({ data: v }),
    onSuccess: () => {
      toast.success("Statut mis à jour");
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: () => toast.error("Mise à jour impossible"),
  });

  const filesQuery = useQuery({
    queryKey: ["admin-files", selected?.id],
    enabled: Boolean(selected && selected.files.length),
    queryFn: () => fetchFiles({ data: { kind: selected!.kind, paths: selected!.files } }),
  });

  function exportCsv() {
    const head = [
      "reference",
      "date",
      "type",
      "client",
      "telephone",
      "ville",
      "adresse",
      "produit",
      "modele",
      "quantite",
      "total_mad",
      "statut",
      "langue",
      "source",
      "notes",
      "fichiers",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      head.join(","),
      ...filtered.map((r) =>
        [
          r.reference,
          r.createdAt,
          r.kind,
          r.fullName,
          r.phone,
          r.city,
          r.address,
          r.product,
          r.model,
          r.quantity,
          r.total ?? "",
          STATUS_LABEL[r.status] ?? r.status,
          r.locale,
          r.source,
          r.notes,
          r.files.join(" | "),
        ]
          .map(esc)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `skinup-commandes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (statusQuery.isLoading) {
    return <main className="p-10 text-sm text-muted-foreground">Chargement…</main>;
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">Accès restreint</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Votre compte n'a pas les droits administrateur.
        </p>
        {!statusQuery.data?.adminExists && (
          <Button
            className="mt-6"
            onClick={async () => {
              const res = await claim();
              if (res.claimed) {
                toast.success("Vous êtes maintenant administrateur");
                statusQuery.refetch();
              } else {
                toast.error("Un administrateur existe déjà");
              }
            }}
          >
            Devenir administrateur
          </Button>
        )}
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Se déconnecter
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Commandes</h1>
          <p className="text-sm text-muted-foreground">
            Commandes boutique et demandes de design personnalisé.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCsv}>
            Exporter CSV
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Déconnexion
          </Button>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Total commandes", value: counters.total },
          { label: "Nouvelles", value: counters.fresh },
          { label: "Livrées", value: counters.delivered },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold">{c.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
        <Input
          placeholder="Rechercher nom, téléphone, n° commande…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      </section>

      <section className="mt-6 overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              {["N°", "Date", "Client", "Téléphone", "Ville", "Produit", "Modèle", "Qté", "Total", "Fichiers", "Statut", ""].map(
                (h) => (
                  <th key={h} className="px-3 py-3 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {ordersQuery.isLoading && (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center text-muted-foreground">
                  Chargement…
                </td>
              </tr>
            )}
            {!ordersQuery.isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center text-muted-foreground">
                  Aucune commande.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="cursor-pointer border-t hover:bg-muted/40"
                onClick={() => setSelected(r)}
              >
                <td className="px-3 py-3 font-medium">{r.reference}</td>
                <td className="whitespace-nowrap px-3 py-3">{fmtDate(r.createdAt)}</td>
                <td className="px-3 py-3">{r.fullName}</td>
                <td className="whitespace-nowrap px-3 py-3" dir="ltr">
                  {r.phone}
                </td>
                <td className="px-3 py-3">{r.city}</td>
                <td className="max-w-[220px] truncate px-3 py-3">{r.product}</td>
                <td className="px-3 py-3">{r.model || "—"}</td>
                <td className="px-3 py-3">{r.quantity}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  {r.total != null ? `${r.total} MAD` : "—"}
                </td>
                <td className="px-3 py-3">{r.files.length || "—"}</td>
                <td className="px-3 py-3">
                  <Badge className={STATUS_CLASS[r.status] ?? ""} variant="secondary">
                    {STATUS_LABEL[r.status] ?? r.status}
                  </Badge>
                </td>
                <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                  <a
                    className="text-xs font-medium text-primary underline underline-offset-4"
                    href={waLink(r.phone, r.reference)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Dialog open={Boolean(selected)} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center gap-3">
                  <span>Commande {selected.reference}</span>
                  <Badge className={STATUS_CLASS[selected.status] ?? ""} variant="secondary">
                    {STATUS_LABEL[selected.status] ?? selected.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-wrap items-center gap-3">
                <Select
                  value={selected.status}
                  onValueChange={(v) => {
                    setSelected({ ...selected, status: v });
                    statusMutation.mutate({
                      kind: selected.kind,
                      id: selected.id,
                      status: v as OrderStatus,
                    });
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <a
                  href={waLink(selected.phone, selected.reference)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline">Contacter sur WhatsApp</Button>
                </a>
              </div>

              <section className="mt-6">
                <h3 className="text-sm font-semibold">Informations client</h3>
                <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  {[
                    ["Nom complet", selected.fullName],
                    ["Téléphone", selected.phone],
                    ["Ville", selected.city],
                    ["Adresse", selected.address || "—"],
                    ["Date", fmtDate(selected.createdAt)],
                    ["Langue", selected.locale.toUpperCase()],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b py-1">
                      <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
                      <dd className="break-words">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {selected.kind === "order" && (
                <section className="mt-6">
                  <h3 className="text-sm font-semibold">
                    Produits commandés ({selected.lines.length})
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {selected.lines.map((l) => (
                      <li
                        key={l.key}
                        className="flex items-center gap-4 rounded-xl border bg-card p-3"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                          {l.image ? (
                            <img
                              src={l.image}
                              alt={l.name}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                              Sans image
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{l.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {l.categoryLabel}
                            {l.model ? ` · ${l.model}` : ""}
                          </p>
                          <p className="mt-1 text-sm">
                            Quantité : <span className="font-medium">{l.qty}</span>
                            {l.inPack && (
                              <Badge variant="secondary" className="ml-2 align-middle">
                                Pack 3 pour 99 MAD
                              </Badge>
                            )}
                          </p>
                        </div>
                        <div className="shrink-0 text-right text-sm">
                          {l.unitPrice != null ? (
                            <>
                              <p>{l.unitPrice} MAD / u.</p>
                              <p className="font-semibold">{l.lineTotal} MAD</p>
                            </>
                          ) : (
                            <p className="text-muted-foreground">Inclus dans le pack</p>
                          )}
                        </div>
                      </li>
                    ))}
                    {selected.lines.length === 0 && (
                      <li className="text-sm text-muted-foreground">Aucun produit enregistré.</li>
                    )}
                  </ul>
                </section>
              )}

              {selected.kind === "design" && (
                <section className="mt-6">
                  <h3 className="text-sm font-semibold">Détails du design</h3>
                  <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                    {Object.entries(selected.details)
                      .filter(([, v]) => v !== null && String(v).trim() !== "")
                      .map(([k, v]) => (
                        <div key={k} className="border-b py-1">
                          <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
                          <dd className="break-words">{String(v)}</dd>
                        </div>
                      ))}
                    <div className="border-b py-1">
                      <dt className="text-xs uppercase text-muted-foreground">Quantité</dt>
                      <dd>{selected.quantity}</dd>
                    </div>
                  </dl>
                </section>
              )}

              <section className="mt-6">
                <h3 className="text-sm font-semibold">
                  Fichiers envoyés par le client ({selected.files.length})
                </h3>
                {selected.files.length === 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">Aucun fichier.</p>
                )}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(filesQuery.data ?? []).map((f) => (
                    <a
                      key={f.path}
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-lg border bg-muted"
                      title="Ouvrir en taille réelle"
                    >
                      {/\.(pdf)$/i.test(f.path) ? (
                        <span className="flex h-64 items-center justify-center text-sm">
                          PDF — ouvrir
                        </span>
                      ) : (
                        <img
                          src={f.url}
                          alt={`Fichier client ${f.path}`}
                          className="h-64 w-full object-contain"
                          loading="lazy"
                        />
                      )}
                    </a>
                  ))}
                </div>
              </section>

              {selected.summary && (
                <section className="mt-6 rounded-xl border bg-muted/30 p-4">
                  <h3 className="text-sm font-semibold">Récapitulatif</h3>
                  <dl className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt>Total articles</dt>
                      <dd>{selected.summary.totalItems}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Sous-total</dt>
                      <dd>{selected.summary.subtotal} MAD</dd>
                    </div>
                    {selected.summary.discount != null && (
                      <div className="flex justify-between text-emerald-600">
                        <dt>{selected.summary.discountLabel || "Remise"}</dt>
                        <dd>-{selected.summary.discount} MAD</dd>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2 text-base font-semibold">
                      <dt>Total à encaisser</dt>
                      <dd>{selected.summary.total} MAD</dd>
                    </div>
                    <div className="flex justify-between pt-1 text-muted-foreground">
                      <dt>Paiement</dt>
                      <dd>{selected.summary.paymentMethod}</dd>
                    </div>
                  </dl>
                  {selected.notes && (
                    <p className="mt-3 text-sm">
                      <span className="text-xs uppercase text-muted-foreground">Notes : </span>
                      {selected.notes}
                    </p>
                  )}
                </section>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

