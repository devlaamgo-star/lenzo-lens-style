import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  type AdminRecord,
  type OrderStatus,
  bulkUpdateStatus,
  claimFirstAdmin,
  getAdminStatus,
  getRecordFileUrls,
  listAdminOrders,
  updateRecordOps,
  updateRecordStatus,
} from "@/lib/admin.functions";
import {
  PAYMENT_CLASS,
  PAYMENT_LABEL,
  QUICK_ACTIONS,
  SHIPPING_LABEL,
  STATUS_CLASS,
  STATUS_LABEL,
  TIMELINE_STEPS,
  fmtDate,
  shippingState,
  waDigits,
  waTemplates,
} from "@/lib/admin-ui";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type DatePreset = "all" | "today" | "yesterday" | "7d" | "month";

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function matchesPreset(iso: string, preset: DatePreset) {
  if (preset === "all") return true;
  const d = new Date(iso);
  const now = new Date();
  if (preset === "today") return dayKey(d) === dayKey(now);
  if (preset === "yesterday") {
    const y = new Date(now);
    y.setDate(y.getDate() - 1);
    return dayKey(d) === dayKey(y);
  }
  if (preset === "7d") return now.getTime() - d.getTime() <= 7 * 864e5;
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

function AdminOrdersPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchStatus = useServerFn(getAdminStatus);
  const fetchOrders = useServerFn(listAdminOrders);
  const claim = useServerFn(claimFirstAdmin);
  const setStatus = useServerFn(updateRecordStatus);
  const setBulk = useServerFn(bulkUpdateStatus);
  const setOps = useServerFn(updateRecordOps);
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
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [shippingFilter, setShippingFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [preset, setPreset] = useState<DatePreset>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<null | {
    title: string;
    body: string;
    run: () => void;
  }>(null);

  const rows = ordersQuery.data ?? [];
  const selected = useMemo(
    () => rows.find((r) => r.id === selectedId) ?? null,
    [rows, selectedId],
  );

  const cities = useMemo(
    () => Array.from(new Set(rows.map((r) => r.city).filter(Boolean))).sort(),
    [rows],
  );
  const products = useMemo(
    () =>
      Array.from(
        new Set(rows.flatMap((r) => r.lines.map((l) => l.categoryLabel)).filter(Boolean)),
      ).sort(),
    [rows],
  );
  const models = useMemo(
    () => Array.from(new Set(rows.map((r) => r.model).filter(Boolean))).sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (Boolean(r.archived) !== showArchived) return false;
      if (q && ![r.fullName, r.phone, r.reference, r.city].some((v) => v?.toLowerCase().includes(q)))
        return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (paymentFilter !== "all" && r.paymentStatus !== paymentFilter) return false;
      if (shippingFilter !== "all" && shippingState(r) !== shippingFilter) return false;
      if (cityFilter !== "all" && r.city !== cityFilter) return false;
      if (modelFilter !== "all" && r.model !== modelFilter) return false;
      if (productFilter !== "all" && !r.lines.some((l) => l.categoryLabel === productFilter))
        return false;
      if (!matchesPreset(r.createdAt, preset)) return false;
      return true;
    });
  }, [
    rows,
    search,
    statusFilter,
    paymentFilter,
    shippingFilter,
    cityFilter,
    productFilter,
    modelFilter,
    preset,
    showArchived,
  ]);

  const active = useMemo(() => rows.filter((r) => !r.archived), [rows]);
  const count = (s: string) => active.filter((r) => r.status === s).length;
  const counters = [
    { key: "all", label: "Total", value: active.length },
    { key: "new", label: "Nouvelles", value: count("new") },
    { key: "confirmed", label: "Confirmées", value: count("confirmed") },
    { key: "processing", label: "En traitement", value: count("processing") + count("preparing") },
    { key: "ready_to_ship", label: "Prêtes", value: count("ready_to_ship") },
    { key: "shipped", label: "Expédiées", value: count("shipped") },
    { key: "delivered", label: "Livrées", value: count("delivered") },
    { key: "completed", label: "Terminées", value: count("completed") },
    {
      key: "cancelled",
      label: "Annulées / retours",
      value: count("cancelled") + count("returned") + count("failed_delivery"),
    },
  ];

  const selectedRows = filtered.filter((r) => checked[r.id]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-orders"] });

  const statusMutation = useMutation({
    mutationFn: (v: { kind: "order" | "design"; id: string; status: OrderStatus }) =>
      setStatus({ data: v }),
    onSuccess: () => {
      toast.success("Statut mis à jour");
      invalidate();
    },
    onError: () => toast.error("Mise à jour impossible"),
  });

  const bulkMutation = useMutation({
    mutationFn: (status: OrderStatus) =>
      setBulk({
        data: { status, targets: selectedRows.map((r) => ({ kind: r.kind, id: r.id })) },
      }),
    onSuccess: (res) => {
      toast.success(`${res.count} commande(s) mises à jour`);
      setChecked({});
      invalidate();
    },
    onError: () => toast.error("Mise à jour groupée impossible"),
  });

  const opsMutation = useMutation({
    mutationFn: (v: Record<string, unknown>) => setOps({ data: v as never }),
    onSuccess: () => {
      toast.success("Commande mise à jour");
      invalidate();
    },
    onError: () => toast.error("Enregistrement impossible"),
  });

  const filesQuery = useQuery({
    queryKey: ["admin-files", selected?.id],
    enabled: Boolean(selected && selected.files.length),
    queryFn: () => fetchFiles({ data: { kind: selected!.kind, paths: selected!.files } }),
  });

  function quickStatus(r: AdminRecord, status: OrderStatus) {
    if (status === "cancelled") {
      setConfirmAction({
        title: `Annuler la commande ${r.reference} ?`,
        body: "La commande sera marquée comme annulée. Aucune donnée n'est supprimée.",
        run: () => statusMutation.mutate({ kind: r.kind, id: r.id, status }),
      });
      return;
    }
    statusMutation.mutate({ kind: r.kind, id: r.id, status });
  }

  function exportCsv(list: AdminRecord[]) {
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
      "paiement",
      "transporteur",
      "suivi",
      "priorite",
      "notes_admin",
      "langue",
      "source",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      head.join(","),
      ...list.map((r) =>
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
          PAYMENT_LABEL[r.paymentStatus] ?? r.paymentStatus,
          r.carrier,
          r.tracking,
          r.priority,
          r.adminNotes,
          r.locale,
          r.source,
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
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Commandes</h1>
          <p className="text-sm text-muted-foreground">
            Commandes boutique et demandes de design personnalisé.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowArchived((v) => !v)}>
            {showArchived ? "Voir les commandes actives" : "Voir les archives"}
          </Button>
          <Button variant="outline" onClick={() => exportCsv(filtered)}>
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

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
        {counters.map((c) => {
          const isActive = statusFilter === c.key || (c.key === "all" && statusFilter === "all");
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setStatusFilter(c.key)}
              className={`rounded-xl border p-3 text-left transition-colors ${
                isActive ? "border-primary bg-primary/5" : "bg-card hover:bg-muted/50"
              }`}
            >
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{c.label}</p>
              <p className="mt-1 text-xl font-semibold">{c.value}</p>
            </button>
          );
        })}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Rechercher nom, téléphone, n° commande…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={preset} onValueChange={(v) => setPreset(v as DatePreset)}>
          <SelectTrigger>
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les dates</SelectItem>
            <SelectItem value="today">Aujourd'hui</SelectItem>
            <SelectItem value="yesterday">Hier</SelectItem>
            <SelectItem value="7d">7 derniers jours</SelectItem>
            <SelectItem value="month">Ce mois-ci</SelectItem>
          </SelectContent>
        </Select>
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
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Paiement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les paiements</SelectItem>
            {PAYMENT_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {PAYMENT_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={shippingFilter} onValueChange={setShippingFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Livraison" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les livraisons</SelectItem>
            {Object.entries(SHIPPING_LABEL).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Ville" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Produit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les produits</SelectItem>
            {products.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={modelFilter} onValueChange={setModelFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Modèle iPhone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les modèles</SelectItem>
            {models.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {selectedRows.length > 0 && (
        <section className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border bg-muted/40 p-3">
          <span className="text-sm font-medium">{selectedRows.length} sélectionnée(s)</span>
          {QUICK_ACTIONS.filter((a) => a.status !== "out_for_delivery").map((a) => (
            <Button
              key={a.status}
              size="sm"
              variant={a.status === "cancelled" ? "destructive" : "outline"}
              onClick={() => {
                if (a.status === "cancelled") {
                  setConfirmAction({
                    title: `Annuler ${selectedRows.length} commande(s) ?`,
                    body: "Les commandes seront marquées comme annulées. Rien n'est supprimé.",
                    run: () => bulkMutation.mutate("cancelled"),
                  });
                  return;
                }
                bulkMutation.mutate(a.status as OrderStatus);
              }}
            >
              {a.label}
            </Button>
          ))}
          <Button size="sm" variant="secondary" onClick={() => exportCsv(selectedRows)}>
            Exporter la sélection
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setChecked({})}>
            Désélectionner
          </Button>
        </section>
      )}

      <section className="mt-6 overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[1400px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-3">
                <Checkbox
                  checked={filtered.length > 0 && selectedRows.length === filtered.length}
                  onCheckedChange={(v) =>
                    setChecked(
                      v ? Object.fromEntries(filtered.map((r) => [r.id, true])) : {},
                    )
                  }
                  aria-label="Tout sélectionner"
                />
              </th>
              {[
                "N°",
                "Date",
                "Client",
                "Téléphone",
                "Ville",
                "",
                "Produit",
                "Modèle",
                "Qté",
                "Total",
                "Paiement",
                "Statut",
                "Livraison",
                "Actions",
                "WhatsApp",
              ].map((h, i) => (
                <th key={`${h}-${i}`} className="px-3 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordersQuery.isLoading && (
              <tr>
                <td colSpan={16} className="px-3 py-8 text-center text-muted-foreground">
                  Chargement…
                </td>
              </tr>
            )}
            {!ordersQuery.isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={16} className="px-3 py-8 text-center text-muted-foreground">
                  Aucune commande.
                </td>
              </tr>
            )}
            {filtered.map((r) => {
              const thumb = r.lines.find((l) => l.image)?.image ?? null;
              return (
                <tr
                  key={r.id}
                  className={`cursor-pointer border-t hover:bg-muted/40 ${
                    r.priority === "urgent" ? "bg-destructive/5" : ""
                  }`}
                  onClick={() => setSelectedId(r.id)}
                >
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={Boolean(checked[r.id])}
                      onCheckedChange={(v) =>
                        setChecked((c) => ({ ...c, [r.id]: Boolean(v) }))
                      }
                      aria-label={`Sélectionner ${r.reference}`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {r.priority === "urgent" && (
                      <Badge variant="destructive" className="mr-2 align-middle">
                        Urgent
                      </Badge>
                    )}
                    {r.reference}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{fmtDate(r.createdAt)}</td>
                  <td className="px-3 py-3">{r.fullName}</td>
                  <td className="whitespace-nowrap px-3 py-3" dir="ltr">
                    {r.phone}
                  </td>
                  <td className="px-3 py-3">{r.city}</td>
                  <td className="px-3 py-2">
                    <div className="h-11 w-11 overflow-hidden rounded-md border bg-muted">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={r.product}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-[9px] text-muted-foreground">
                          {r.kind === "design" ? "Design" : "—"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="max-w-[220px] truncate px-3 py-3">{r.product}</td>
                  <td className="px-3 py-3">{r.model || "—"}</td>
                  <td className="px-3 py-3">{r.quantity}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {r.total != null ? `${r.total} MAD` : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <Badge className={PAYMENT_CLASS[r.paymentStatus] ?? ""} variant="secondary">
                      {PAYMENT_LABEL[r.paymentStatus] ?? r.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Badge className={STATUS_CLASS[r.status] ?? ""} variant="secondary">
                      {STATUS_LABEL[r.status] ?? r.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">
                    {SHIPPING_LABEL[shippingState(r)]}
                    {r.tracking ? ` · ${r.tracking}` : ""}
                  </td>
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          Action rapide
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {QUICK_ACTIONS.map((a) => (
                          <DropdownMenuItem
                            key={a.status}
                            onSelect={() => quickStatus(r, a.status as OrderStatus)}
                            className={a.status === "cancelled" ? "text-destructive" : ""}
                          >
                            {a.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          WhatsApp
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {waTemplates(r).map((t) => (
                          <DropdownMenuItem
                            key={t.key}
                            onSelect={() =>
                              window.open(
                                `https://wa.me/${waDigits(r.phone)}?text=${encodeURIComponent(t.text)}`,
                                "_blank",
                                "noopener",
                              )
                            }
                          >
                            {t.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <Dialog open={Boolean(selected)} onOpenChange={(o) => !o && setSelectedId(null)}>
        <DialogContent className="max-h-[88vh] max-w-4xl overflow-y-auto">
          {selected && (
            <OrderDetail
              record={selected}
              files={filesQuery.data ?? []}
              onStatus={(s) => quickStatus(selected, s)}
              onOps={(patch) =>
                opsMutation.mutate({ kind: selected.kind, id: selected.id, ...patch })
              }
              onArchive={() =>
                setConfirmAction({
                  title: `Archiver la commande ${selected.reference} ?`,
                  body: "La commande sera masquée de la liste active mais conservée dans les archives.",
                  run: () => {
                    opsMutation.mutate({
                      kind: selected.kind,
                      id: selected.id,
                      archived: !selected.archived,
                    });
                    setSelectedId(null);
                  },
                })
              }
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(confirmAction)}
        onOpenChange={(o) => !o && setConfirmAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmAction?.title}</AlertDialogTitle>
            <AlertDialogDescription>{confirmAction?.body}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Retour</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                confirmAction?.run();
                setConfirmAction(null);
              }}
            >
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function OrderDetail({
  record,
  files,
  onStatus,
  onOps,
  onArchive,
}: {
  record: AdminRecord;
  files: { path: string; url: string }[];
  onStatus: (s: OrderStatus) => void;
  onOps: (patch: Record<string, unknown>) => void;
  onArchive: () => void;
}) {
  const [carrier, setCarrier] = useState(record.carrier);
  const [tracking, setTracking] = useState(record.tracking);
  const [expected, setExpected] = useState(record.expectedDeliveryAt?.slice(0, 10) ?? "");
  const [notes, setNotes] = useState(record.adminNotes);

  useEffect(() => {
    setCarrier(record.carrier);
    setTracking(record.tracking);
    setExpected(record.expectedDeliveryAt?.slice(0, 10) ?? "");
    setNotes(record.adminNotes);
  }, [record.id, record.carrier, record.tracking, record.expectedDeliveryAt, record.adminNotes]);

  const lastAt = (status: string) =>
    [...record.history].reverse().find((h) => h.status === status)?.at ?? null;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex flex-wrap items-center gap-3">
          <span>Commande {record.reference}</span>
          <Badge className={STATUS_CLASS[record.status] ?? ""} variant="secondary">
            {STATUS_LABEL[record.status] ?? record.status}
          </Badge>
          <Badge className={PAYMENT_CLASS[record.paymentStatus] ?? ""} variant="secondary">
            {PAYMENT_LABEL[record.paymentStatus] ?? record.paymentStatus}
          </Badge>
          {record.priority === "urgent" && <Badge variant="destructive">Urgent</Badge>}
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((a) => (
          <Button
            key={a.status}
            size="sm"
            variant={
              a.status === "cancelled"
                ? "destructive"
                : record.status === a.status
                  ? "default"
                  : "outline"
            }
            onClick={() => onStatus(a.status as OrderStatus)}
          >
            {a.label}
          </Button>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={record.priority === "urgent" ? "destructive" : "outline"}
          onClick={() =>
            onOps({ priority: record.priority === "urgent" ? "normal" : "urgent" })
          }
        >
          {record.priority === "urgent" ? "Repasser en normal" : "Marquer urgent"}
        </Button>
        <Button size="sm" variant="outline" onClick={onArchive}>
          {record.archived ? "Désarchiver" : "Archiver"}
        </Button>
        <Select
          value={record.paymentStatus}
          onValueChange={(v) => onOps({ paymentStatus: v })}
        >
          <SelectTrigger className="h-9 w-[190px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {PAYMENT_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              Message WhatsApp
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {waTemplates(record).map((t) => (
              <DropdownMenuItem
                key={t.key}
                onSelect={() =>
                  window.open(
                    `https://wa.me/${waDigits(record.phone)}?text=${encodeURIComponent(t.text)}`,
                    "_blank",
                    "noopener",
                  )
                }
              >
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <section className="mt-6">
        <h3 className="text-sm font-semibold">Suivi du statut</h3>
        <ol className="mt-3 space-y-1 text-sm">
          {TIMELINE_STEPS.map((s) => {
            const at = lastAt(s) ?? (s === "new" ? record.createdAt : null);
            return (
              <li key={s} className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${at ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
                <span className={at ? "font-medium" : "text-muted-foreground"}>
                  {STATUS_LABEL[s]}
                </span>
                <span className="text-xs text-muted-foreground">{at ? fmtDate(at) : "—"}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold">Informations client</h3>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {[
            ["Nom complet", record.fullName],
            ["Téléphone", record.phone],
            ["Ville", record.city],
            ["Adresse", record.address || "—"],
            ["Date", fmtDate(record.createdAt)],
            ["Langue", record.locale.toUpperCase()],
          ].map(([k, v]) => (
            <div key={k} className="border-b py-1">
              <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
              <dd className="break-words">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-6 rounded-xl border p-4">
        <h3 className="text-sm font-semibold">Expédition</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs uppercase text-muted-foreground">Transporteur</label>
            <Input
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              placeholder="Amana, CTM, Cathedis…"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted-foreground">Numéro de suivi</label>
            <div className="flex gap-2">
              <Input value={tracking} onChange={(e) => setTracking(e.target.value)} />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(tracking);
                  toast.success("Numéro de suivi copié");
                }}
                disabled={!tracking}
              >
                Copier
              </Button>
            </div>
          </div>
          <div>
            <label className="text-xs uppercase text-muted-foreground">Date d'expédition</label>
            <p className="py-2 text-sm">
              {record.shippedAt ? fmtDate(record.shippedAt) : "Non expédiée"}
            </p>
          </div>
          <div>
            <label className="text-xs uppercase text-muted-foreground">Livraison prévue</label>
            <Input type="date" value={expected} onChange={(e) => setExpected(e.target.value)} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Button
            size="sm"
            onClick={() =>
              onOps({ carrier, tracking, expectedDeliveryAt: expected || null })
            }
          >
            Enregistrer l'expédition
          </Button>
          <span className="text-xs text-muted-foreground">
            Statut livraison : {SHIPPING_LABEL[shippingState(record)]}
          </span>
        </div>
      </section>

      <section className="mt-6 rounded-xl border p-4">
        <h3 className="text-sm font-semibold">Notes internes (jamais visibles par le client)</h3>
        <Textarea
          className="mt-3"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Client confirmé par WhatsApp, rappeler demain…"
        />
        <Button className="mt-3" size="sm" onClick={() => onOps({ adminNotes: notes })}>
          Enregistrer les notes
        </Button>
      </section>

      {record.kind === "order" && (
        <section className="mt-6">
          <h3 className="text-sm font-semibold">Produits commandés ({record.lines.length})</h3>
          <ul className="mt-3 space-y-3">
            {record.lines.map((l) => (
              <li key={l.key} className="flex items-center gap-4 rounded-xl border bg-card p-3">
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
                        Pack 3 pour 149 MAD
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
            {record.lines.length === 0 && (
              <li className="text-sm text-muted-foreground">Aucun produit enregistré.</li>
            )}
          </ul>
        </section>
      )}

      {record.kind === "design" && (
        <section className="mt-6">
          <h3 className="text-sm font-semibold">Détails du design</h3>
          <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {Object.entries(record.details)
              .filter(([, v]) => v !== null && String(v).trim() !== "")
              .map(([k, v]) => (
                <div key={k} className="border-b py-1">
                  <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
                  <dd className="break-words">{String(v)}</dd>
                </div>
              ))}
            <div className="border-b py-1">
              <dt className="text-xs uppercase text-muted-foreground">Quantité</dt>
              <dd>{record.quantity}</dd>
            </div>
          </dl>
        </section>
      )}

      <section className="mt-6">
        <h3 className="text-sm font-semibold">
          Fichiers envoyés par le client ({record.files.length})
        </h3>
        {record.files.length === 0 && (
          <p className="mt-2 text-sm text-muted-foreground">Aucun fichier.</p>
        )}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {files.map((f) => (
            <a
              key={f.path}
              href={f.url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-lg border bg-muted"
              title="Ouvrir en taille réelle"
            >
              {/\.(pdf)$/i.test(f.path) ? (
                <span className="flex h-64 items-center justify-center text-sm">PDF — ouvrir</span>
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

      {record.summary && (
        <section className="mt-6 rounded-xl border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold">Récapitulatif</h3>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt>Total articles</dt>
              <dd>{record.summary.totalItems}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Sous-total</dt>
              <dd>{record.summary.subtotal} MAD</dd>
            </div>
            {record.summary.discount != null && (
              <div className="flex justify-between text-emerald-600">
                <dt>{record.summary.discountLabel || "Remise"}</dt>
                <dd>-{record.summary.discount} MAD</dd>
              </div>
            )}
            <div className="flex justify-between border-t pt-2 text-base font-semibold">
              <dt>Total à encaisser</dt>
              <dd>{record.summary.total} MAD</dd>
            </div>
            <div className="flex justify-between pt-1 text-muted-foreground">
              <dt>Paiement</dt>
              <dd>{record.summary.paymentMethod}</dd>
            </div>
          </dl>
          {record.notes && (
            <p className="mt-3 text-sm">
              <span className="text-xs uppercase text-muted-foreground">Note client : </span>
              {record.notes}
            </p>
          )}
        </section>
      )}
    </>
  );
}
