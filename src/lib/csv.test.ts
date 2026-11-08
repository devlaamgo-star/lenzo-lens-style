import { describe, expect, it } from "vitest";
import { csvCell } from "./csv";

describe("csvCell", () => {
  it("neutralises formula-leading text", () => {
    expect(csvCell('=HYPERLINK("http://x","y")')).toBe(`"'=HYPERLINK(""http://x"",""y"")"`);
    expect(csvCell("+cmd|' /C calc'!A0")).toBe(`"'+cmd|' /C calc'!A0"`);
    expect(csvCell("-2+3+cmd")).toBe(`"'-2+3+cmd"`);
    expect(csvCell("@SUM(A1)")).toBe(`"'@SUM(A1)"`);
    expect(csvCell("\t=1")).toBe(`"'\t=1"`);
  });

  it("keeps ordinary values and phone numbers unchanged", () => {
    expect(csvCell("Hamza")).toBe(`"Hamza"`);
    expect(csvCell("+212 694-728194")).toBe(`"+212 694-728194"`);
    expect(csvCell(149)).toBe(`"149"`);
    expect(csvCell(null)).toBe(`""`);
  });
});
