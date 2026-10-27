export const REVENUE_PERIODS = [
  { value: "today", label: "Aujourd'hui" },
  { value: "yesterday", label: "Hier" },
  { value: "7d", label: "7 derniers jours" },
  { value: "30d", label: "30 derniers jours" },
  { value: "all", label: "Tout" },
] as const;

export type RevenuePeriod = (typeof REVENUE_PERIODS)[number]["value"];
type RevenueOrder = { kind: string; status: string; total: number | null; createdAt: string };

const calendar = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Casablanca", year: "numeric", month: "2-digit", day: "2-digit",
});

function calendarDay(date: Date): number {
  const parts = calendar.formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Date.UTC(get("year"), get("month") - 1, get("day")) / 86400000;
}

/** Read stored final totals only; calendar ranges use the store's Casablanca timezone. */
export function revenueSummary(orders: readonly RevenueOrder[], period: RevenuePeriod, now = new Date()) {
  const today = calendarDay(now);
  let total = 0;
  let count = 0;
  for (const order of orders) {
    if (order.kind !== "order" || order.status === "cancelled" || order.status === "returned") continue;
    if (order.total === null || !Number.isFinite(order.total)) continue;
    if (period !== "all") {
      const created = new Date(order.createdAt);
      if (!Number.isFinite(created.getTime())) continue;
      const age = today - calendarDay(created);
      const matches = period === "today" ? age === 0
        : period === "yesterday" ? age === 1
        : age >= 0 && age < (period === "7d" ? 7 : 30);
      if (!matches) continue;
    }
    total += order.total;
    count += 1;
  }
  return { total, count };
}