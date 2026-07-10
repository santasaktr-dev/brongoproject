import { describe, expect, it } from "vitest";
import { liquidLevel, mixLiquidColor } from "./mixing";

describe("liquidLevel", () => {
  it("follows the specified level table", () => {
    expect([0, 1, 2, 3, 4, 5, 6].map(liquidLevel)).toEqual([12, 24, 36, 48, 60, 70, 78]);
  });
  it("grows 2% per extra selection past 6 and caps at 92%", () => {
    expect(liquidLevel(7)).toBe(80);
    expect(liquidLevel(10)).toBe(86);
    expect(liquidLevel(50)).toBe(92);
  });
});

describe("mixLiquidColor", () => {
  it("returns the base color when nothing colored is selected", () => {
    expect(mixLiquidColor([])).toBe("#EAF7FA");
    expect(mixLiquidColor([{ category: "functional", liquidColor: "transparent" }])).toBe("#EAF7FA");
  });
  it("uses a single color directly", () => {
    expect(mixLiquidColor([{ category: "flavor", liquidColor: "#FFB5BC" }])).toBe("#FFB5BC");
  });
  it("blends multiple colors into a valid hex", () => {
    const result = mixLiquidColor([
      { category: "color", liquidColor: "#ED5A5A" },
      { category: "flavor", liquidColor: "#5E9FEA" },
    ]);
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
    expect(result).not.toBe("#EAF7FA");
  });
});
