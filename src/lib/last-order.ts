// Hands the just-saved order to the confirmation page. Browser storage can be
// blocked (privacy modes, some in-app browsers); a storage failure must never turn
// a saved order into an error message that invites the customer to order twice.

const KEY = "skinup-last-order";
let memory: string | null = null;

export function saveLastOrder(order: unknown) {
  const raw = JSON.stringify(order);
  memory = raw;
  try { window.sessionStorage.setItem(KEY, raw); } catch { /* the in-page copy is enough for the confirmation page */ }
}

export function readLastOrder<T>(): T | null {
  let raw: string | null = null;
  try { raw = window.sessionStorage.getItem(KEY); } catch { /* blocked storage */ }
  raw = raw ?? memory;
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}
