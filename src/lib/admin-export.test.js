import { describe, expect, it } from "bun:test";
import { buildCsv, rowsForExport, setViewSelection, viewSelectionState } from "./admin-export";

const table = [
  { id: "a", ref: "SKU-1", phone: "0612345678" },
  { id: "b", ref: "SKU-2", phone: "0698765432" },
  { id: "c", ref: "SKU-3", phone: "0700000001" },
  { id: "d", ref: "SKU-4", phone: "0611111111" },
  { id: "e", ref: "SKU-5", phone: "0622222222" },
];

describe("orders CSV export selection", () => {
  it("exports exactly the 3 selected orders, in table order", () => {
    const checked = { d: true, a: true, c: true };
    expect(rowsForExport(table, checked).map((r) => r.id)).toEqual(["a", "c", "d"]);
  });

  it("deselecting an order removes it from the export", () => {
    const checked = { a: true, c: true, d: true, c2: false };
    checked.c = false;
    expect(rowsForExport(table, checked).map((r) => r.id)).toEqual(["a", "d"]);
  });

  it("exports nothing when no order is selected", () => {
    expect(rowsForExport(table, {})).toEqual([]);
  });

  it("header checkbox selects only orders in the filtered view", () => {
    const next = setViewSelection({}, ["b", "d"], true);
    expect(rowsForExport(table, next).map((r) => r.id)).toEqual(["b", "d"]);
  });

  it("header checkbox deselects only the filtered view and keeps other selections", () => {
    const next = setViewSelection({ a: true, b: true, d: true }, ["b", "d"], false);
    expect(rowsForExport(table, next).map((r) => r.id)).toEqual(["a"]);
  });

  it("header checkbox is checked only when every visible order is selected", () => {
    expect(viewSelectionState(["b", "d"], { b: true, d: true })).toBe(true);
    expect(viewSelectionState(["b", "d"], { b: true })).toBe("indeterminate");
    expect(viewSelectionState([], {})).toBe(false);
  });

  it("CSV keeps phone leading zeros and has one line per selected order", () => {
    const list = rowsForExport(table, { a: true, c: true, e: true });
    const csv = buildCsv(["reference", "telephone"], list.map((r) => [r.ref, r.phone]));
    expect(csv.split("\n")).toEqual([
      "reference,telephone",
      '"SKU-1","0612345678"',
      '"SKU-3","0700000001"',
      '"SKU-5","0622222222"',
    ]);
  });
});
