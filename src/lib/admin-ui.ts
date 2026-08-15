import type { AdminRecord } from "@/lib/admin.functions";

export const STATUS_LABEL: Record<string, string> = {
  new: "Nouvelle",
  design_review: "Revue design",
  awaiting_approval: "Attente validation client",
  approved: "Design approuvé",
  confirmed: "Confirmée",
  processing: "En traitement",
  preparing: "En traitement",
  ready_to_ship: "Prête à expédier",
  shipped: "Expédiée",
  out_for_delivery: "En cours de livraison",
  delivered: "Livrée",
  completed: "Terminée",
  cancelled: "Annulée",
  returned: "Retournée",
  failed_delivery: "Livraison échouée",
};

export const STATUS_CLASS: Record<string, string> = {
  new: "bg-primary/15 text-primary",
  design_review: "bg-fuchsia-500/15 text-fuchsia-600",
  awaiting_approval: "bg-yellow-500/15 text-yellow-700",
  approved: "bg-teal-500/15 text-teal-600",
  confirmed: "bg-blue-500/15 text-blue-600",
  processing: "bg-amber-500/15 text-amber-600",
  preparing: "bg-amber-500/15 text-amber-600",
  ready_to_ship: "bg-orange-500/15 text-orange-600",
  shipped: "bg-violet-500/15 text-violet-600",
  out_for_delivery: "bg-indigo-500/15 text-indigo-600",
  delivered: "bg-emerald-500/15 text-emerald-600",
  completed: "bg-emerald-600/20 text-emerald-700",
  cancelled: "bg-destructive/15 text-destructive",
  returned: "bg-rose-500/15 text-rose-600",
  failed_delivery: "bg-red-500/15 text-red-600",
};

export const PAYMENT_LABEL: Record<string, string> = {
  cod_pending: "COD en attente",
  paid: "Payée",
  refused: "Refusée",
  returned: "Retournée",
  refunded: "Remboursée",
};

export const PAYMENT_CLASS: Record<string, string> = {
  cod_pending: "bg-muted text-muted-foreground",
  paid: "bg-emerald-500/15 text-emerald-600",
  refused: "bg-destructive/15 text-destructive",
  returned: "bg-rose-500/15 text-rose-600",
  refunded: "bg-slate-500/15 text-slate-600",
};

/** Étapes principales du flux, utilisées pour la timeline. */
export const TIMELINE_STEPS = [
  "new",
  "confirmed",
  "processing",
  "ready_to_ship",
  "shipped",
  "delivered",
  "completed",
] as const;

/** Actions rapides proposées sur chaque ligne. */
export const QUICK_ACTIONS = [
  { status: "design_review", label: "Revue design" },
  { status: "awaiting_approval", label: "Attente client" },
  { status: "approved", label: "Design approuvé" },
  { status: "confirmed", label: "Confirmer" },
  { status: "processing", label: "En traitement" },
  { status: "ready_to_ship", label: "Prête à expédier" },
  { status: "shipped", label: "Expédiée" },
  { status: "out_for_delivery", label: "En livraison" },
  { status: "delivered", label: "Livrée" },
  { status: "completed", label: "Terminée" },
  { status: "cancelled", label: "Annuler" },
] as const;

export type ShippingState = "not_shipped" | "shipped" | "delivered" | "returned";

export function shippingState(r: AdminRecord): ShippingState {
  if (["returned", "failed_delivery"].includes(r.status)) return "returned";
  if (["delivered", "completed"].includes(r.status)) return "delivered";
  if (["shipped", "out_for_delivery"].includes(r.status)) return "shipped";
  return "not_shipped";
}

export const SHIPPING_LABEL: Record<ShippingState, string> = {
  not_shipped: "Non expédiée",
  shipped: "En transit",
  delivered: "Livrée",
  returned: "Retour / échec",
};

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("fr-MA", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function waDigits(phone: string) {
  return phone.replace(/\D/g, "").replace(/^0/, "212");
}

/** Modèles de messages WhatsApp pré-remplis (relus avant envoi). */
export function waTemplates(r: AdminRecord) {
  const total = r.total != null ? `${r.total} MAD` : "";
  return [
    {
      key: "confirm",
      label: "Confirmer la commande",
      text: `Bonjour ${r.fullName}, ici SKINUP 👋\nNous confirmons votre commande ${r.reference}${
        total ? ` (${total} à la livraison)` : ""
      }.\nLivraison à : ${r.city}${r.address ? ` — ${r.address}` : ""}.\nMerci de confirmer ces informations.`,
    },
    {
      key: "shipped",
      label: "Commande expédiée",
      text: `Bonjour ${r.fullName}, votre commande SKINUP ${r.reference} vient d'être expédiée${
        r.carrier ? ` via ${r.carrier}` : ""
      }${r.tracking ? ` (suivi : ${r.tracking})` : ""}. Vous serez contacté(e) à la livraison. Merci !`,
    },
    {
      key: "delivered",
      label: "Commande livrée",
      text: `Bonjour ${r.fullName}, votre commande SKINUP ${r.reference} a bien été livrée 🎉 Merci pour votre confiance ! Votre avis nous aiderait beaucoup.`,
    },
    {
      key: "unreachable",
      label: "Client injoignable",
      text: `Bonjour ${r.fullName}, nous avons essayé de vous joindre au sujet de votre commande SKINUP ${r.reference} sans succès. Pouvez-vous nous indiquer un moment pour vous rappeler ?`,
    },
  ];
}
