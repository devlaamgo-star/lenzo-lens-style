import { csvCell } from "./csv";

export type SelectionMap = Record<string, boolean>;

/**
 * Rows to export: only the checked rows, matched by their unique id,
 * kept in the same order as the current table view.
 */
export function rowsForExport<T extends { id: string }>(view: T[], checked: SelectionMap): T[] {
  return view.filter((r) => checked[r.id] === true);
}

/**
 * Header checkbox: select or deselect only the rows of the current view.
 * Selections outside the view are left untouched.
 */
export function setViewSelection(
  checked: SelectionMap,
  viewIds: string[],
  on: boolean,
): SelectionMap {
  const next: SelectionMap = { ...checked };
  for (const id of viewIds) {
    if (on) next[id] = true;
    else delete next[id];
  }
  return next;
}

/** Header checkbox state for the current view. */
export function viewSelectionState(
  viewIds: string[],
  checked: SelectionMap,
): boolean | "indeterminate" {
  if (!viewIds.length) return false;
  const n = viewIds.filter((id) => checked[id] === true).length;
  if (n === 0) return false;
  return n === viewIds.length ? true : "indeterminate";
}

/** Build CSV text with every value escaped as a quoted text cell. */
export function buildCsv(head: string[], rows: unknown[][]): string {
  return [head.join(","), ...rows.map((r) => r.map(csvCell).join(","))].join("\n");
}
