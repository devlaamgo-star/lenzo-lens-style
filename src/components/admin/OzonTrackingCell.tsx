import { useState } from "react";
import { Plus, RefreshCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fmtDate } from "@/lib/admin-ui";

type Props = {
  reference: string;
  tracking: string;
  status: string;
  syncedAt: string | null;
  onSave: (tracking: string) => Promise<void>;
  onRefresh: () => Promise<void>;
};

/** "Suivi Ozon" block in the Livraison column — separate from manual order statuses. */
export function OzonTrackingCell({ reference, tracking, status, syncedAt, onSave, onRefresh }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  if (!tracking) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="mt-2 h-7 gap-1 px-2 text-xs">
            <Plus className="h-3 w-3" aria-hidden="true" />
            Ajouter un numéro de suivi
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const t = value.trim();
              if (!t) return;
              void run(async () => {
                await onSave(t);
                setOpen(false);
                setValue("");
              });
            }}
          >
            <label htmlFor={`ozon-${reference}`} className="text-xs font-medium">
              Numéro de suivi Ozon · {reference}
            </label>
            <Input
              id={`ozon-${reference}`}
              className="mt-2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ex. numéro Ozon du colis"
              maxLength={80}
              autoFocus
            />
            <Button type="submit" size="sm" className="mt-2 w-full" disabled={busy || !value.trim()}>
              {busy ? "Enregistrement…" : "Enregistrer et suivre"}
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="mt-2 rounded-md border bg-muted/40 px-2 py-1.5 text-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 font-semibold text-foreground">
          <Truck className="h-3 w-3" aria-hidden="true" />
          Suivi Ozon
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={() => void run(onRefresh)}
          disabled={busy}
          aria-label={`Actualiser le suivi Ozon de ${reference}`}
          title="Actualiser maintenant"
        >
          <RefreshCw className={`h-3 w-3 ${busy ? "animate-spin" : ""}`} aria-hidden="true" />
        </Button>
      </div>
      <p className="mt-0.5 font-medium text-foreground">{status || "En attente du statut Ozon"}</p>
      <p className="text-muted-foreground" dir="ltr">
        {tracking}
      </p>
      <p className="text-muted-foreground">
        {syncedAt ? `Mis à jour ${fmtDate(syncedAt)}` : "Pas encore mis à jour"}
      </p>
    </div>
  );
}
