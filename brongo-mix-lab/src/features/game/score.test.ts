import { describe, expect, it } from "vitest";
import { getReaction, recipeScore } from "./score";
import type { Ingredient } from "@/content/ingredients";

// fixture ย่อ — target (isBrongoMatch:true) = a, b, c, d = 4 ตัว
const mk = (id: string, isBrongoMatch: boolean): Ingredient => ({
  id,
  category: "sweetener",
  name: id,
  description: "",
  isBrongoMatch,
  liquidColor: "#fff",
  sources: ["GAME_RULE"],
});
const all: Ingredient[] = [
  mk("a", true),
  mk("b", true),
  mk("c", true),
  mk("d", true),
  mk("x", false),
  mk("y", false),
  { ...mk("functional-none", false), category: "functional" },
];
const pick = (...ids: string[]) => all.filter((i) => ids.includes(i.id));

describe("recipeScore", () => {
  it("is 100 only when the exact recipe is selected", () => {
    expect(recipeScore(pick("a", "b", "c", "d"), all).score).toBe(100);
  });
  it("penalises missing ingredients (1 correct of 4 → 25)", () => {
    expect(recipeScore(pick("a"), all).score).toBe(25);
  });
  it("penalises extra (wrong) ingredients (4 correct + 1 wrong → 80)", () => {
    expect(recipeScore(pick("a", "b", "c", "d", "x"), all).score).toBe(80);
  });
  it("is 0 when nothing selected is in the recipe", () => {
    expect(recipeScore(pick("x", "y"), all).score).toBe(0);
  });
  it("reports correct / missing / extra counts", () => {
    expect(recipeScore(pick("a", "b", "x"), all)).toEqual({ score: 40, correct: 2, missing: 2, extra: 1 });
  });
  it("ignores functional-none (abstaining is not a wrong pick)", () => {
    expect(recipeScore(pick("a", "functional-none"), all)).toEqual({ score: 25, correct: 1, missing: 3, extra: 0 });
  });
  it("is 0 for an empty selection", () => {
    expect(recipeScore([], all).score).toBe(0);
  });
});

describe("getReaction", () => {
  it("uses the perfect state at 100", () => expect(getReaction(100).state).toBe("perfect"));
  it("uses the curious state at 25", () => expect(getReaction(25).state).toBe("curious"));
});
