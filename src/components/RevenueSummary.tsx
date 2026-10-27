import { useState } from "react";
import { Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REVENUE_PERIODS, revenueSummary, type RevenuePeriod } from "@/lib/revenue";
import type { AdminRecord } from "@/lib/admin.functions";

export function RevenueSummary({ orders, loading }: { orders: readonly AdminRecord[]; loading: boolean }) {
  const [period, setPeriod] = useState<RevenuePeriod>("all");
  const summary = revenueSummary(orders, period);
  return (
    <section aria-labelledby="revenue-heading" className="mt-3 rounded-xl border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="revenue-heading" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Banknote className="h-4 w-4" aria-hidden="true" />
            Chiffre d'affaires
          </h2>
          <div aria-live="polite" aria-atomic="true" aria-busy={loading} className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-2xl font-semibold tabular-nums">{loading ? "—" : new Intl.NumberFormat("fr-MA").format(summary.total)} MAD</p>
            <p className="text-sm text-muted-foreground">{loading ? "—" : summary.count} {summary.count === 1 ? "commande" : "commandes"}</p>
          </div>
        </div>
        <div role="group" aria-label="Période du chiffre d'affaires" className="flex flex-wrap gap-1.5">
          {REVENUE_PERIODS.map((option) => (
            <Button key={option.value} size="sm" variant={period === option.value ? "default" : "outline"}
              aria-pressed={period === option.value} onClick={() => setPeriod(option.value)}>
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}