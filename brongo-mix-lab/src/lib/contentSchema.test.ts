import { describe, expect, it } from "vitest";
import { validateIngredients } from "./contentSchema";
import { ingredients } from "@/content/ingredients";

const valid = { id: "x", category: "api", name: "X", description: "d", isBrongoMatch: true, liquidColor: "#fff", sources: ["SPC"] };

describe("validateIngredients", () => {
  it("accepts the real dataset", () => {
    expect(ingredients.length).toBe(16);
  });

  it("passes a valid record", () => {
    expect(() => validateIngredients([{ ...valid }])).not.toThrow();
  });

  it("rejects duplicate ids", () => {
    expect(() => validateIngredients([{ ...valid }, { ...valid }])).toThrow(/Duplicate/);
  });

  it("rejects an invalid category", () => {
    expect(() => validateIngredients([{ ...valid, category: "vitamin" }])).toThrow();
  });

  it("rejects a missing label", () => {
    expect(() => validateIngredients([{ ...valid, name: "" }])).toThrow();
  });

  it("rejects a non-boolean isBrongoMatch", () => {
    expect(() => validateIngredients([{ ...valid, isBrongoMatch: "yes" }])).toThrow();
  });

  it("rejects a record with no source", () => {
    expect(() => validateIngredients([{ ...valid, sources: [] }])).toThrow();
  });
});
