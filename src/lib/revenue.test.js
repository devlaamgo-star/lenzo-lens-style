import { test, expect } from "bun:test";
import { revenueSummary } from "./revenue";

const now = new Date("2026-10-27T12:00:00Z");
const order = (createdAt, total = 99, status = "new", kind = "order") => ({ createdAt, total, status, kind });

test("revenue excludes cancelled and returned orders, and design requests", () => {
  expect(revenueSummary([
    order(now.toISOString(), 99), order(now.toISOString(), 149, "cancelled"),
    order(now.toISOString(), 199, "returned"), order(now.toISOString(), 299, "new", "design"),
  ], "all", now)).toEqual({ total: 99, count: 1 });
});
test("revenue sums stored final totals including discounts and delivery", () => {
  expect(revenueSummary([order(now.toISOString(), 99), order(now.toISOString(), 149), order(now.toISOString(), 1594)], "all", now))
    .toEqual({ total: 1842, count: 3 });
});
test("today includes the full creation calendar day, not a rolling 24 hours", () => {
  expect(revenueSummary([order("2026-10-27T00:00:00Z"), order("2026-10-27T23:00:00Z"), order("2026-10-26T12:01:00Z")], "today", now))
    .toEqual({ total: 198, count: 2 });
});
test("yesterday includes only the preceding creation calendar day", () => {
  expect(revenueSummary([order("2026-10-26T00:00:00Z"), order("2026-10-26T22:59:59Z"), order("2026-10-25T12:00:00Z"), order(now.toISOString())], "yesterday", now))
    .toEqual({ total: 198, count: 2 });
});
test("7 days includes today plus previous 6 days and excludes future dates", () => {
  expect(revenueSummary([order(now.toISOString()), order("2026-10-21T00:00:00Z"), order("2026-10-20T12:00:00Z"), order("2026-10-28T12:00:00Z")], "7d", now))
    .toEqual({ total: 198, count: 2 });
});
test("30 days includes today plus previous 29 days", () => {
  expect(revenueSummary([order(now.toISOString()), order("2026-09-28T00:00:00Z"), order("2026-09-27T12:00:00Z")], "30d", now))
    .toEqual({ total: 198, count: 2 });
});
test("all includes all valid orders without a creation-date restriction", () => {
  expect(revenueSummary([order("2020-01-01T12:00:00Z", 79, "completed"), order(now.toISOString(), 149, "confirmed")], "all", now))
    .toEqual({ total: 228, count: 2 });
});
test("calendar uses Casablanca rather than browser timezone", () => {
  const date = new Date("2026-08-04T23:30:00Z");
  expect(revenueSummary([order("2026-08-04T23:15:00Z"), order("2026-08-04T22:59:59Z")], "today", date))
    .toEqual({ total: 99, count: 1 });
});
test("already-filtered order input determines both total and count", () => {
  const rows = [{ ...order(now.toISOString(), 99), source: "tiktok" }, { ...order(now.toISOString(), 149), source: "direct" }];
  expect(revenueSummary(rows.filter((r) => r.source === "tiktok"), "all", now)).toEqual({ total: 99, count: 1 });
});
test("empty input or cancelled-only input shows zero", () => {
  expect(revenueSummary([], "all", now)).toEqual({ total: 0, count: 0 });
  expect(revenueSummary([order(now.toISOString(), 149, "cancelled")], "all", now)).toEqual({ total: 0, count: 0 });
});