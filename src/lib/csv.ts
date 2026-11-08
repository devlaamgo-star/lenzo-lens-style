// Spreadsheet apps (Excel, Sheets, LibreOffice) execute cells starting with
// these characters as formulas. Customer-supplied text must be neutralised
// before it lands in an exported CSV.
const FORMULA_PREFIX = /^[=+\-@\t\r]/;
// Plain numbers and phone numbers (e.g. "+212 694-728194", "-5") are safe and
// kept unchanged so exports stay readable.
const PLAIN_NUMBER = /^[+-]?[\d\s().-]+$/;

export function csvCell(value: unknown): string {
  let s = String(value ?? "");
  if (FORMULA_PREFIX.test(s) && !PLAIN_NUMBER.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}
