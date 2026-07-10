import { describe, expect, it } from "vitest";
import { ingredients } from "@/content/ingredients";
import { filledCategoryCount, matchedCount, matchedIngredients, selectIngredients, unmatchedIngredients } from "./selectors";

const pick = (...ids: string[]) => selectIngredients(ingredients, ids);

describe("selectors", () => {
  it("selects ingredients by id", () => {
    expect(pick("flavor-cherry", "flavor-banana").map((i) => i.id)).toEqual(["flavor-cherry", "flavor-banana"]);
  });
  it("splits matched and unmatched", () => {
    const s = pick("flavor-cherry", "flavor-banana"); // cherry matches, banana does not
    expect(matchedIngredients(s).map((i) => i.id)).toEqual(["flavor-cherry"]);
    expect(unmatchedIngredients(s).map((i) => i.id)).toEqual(["flavor-banana"]);
    expect(matchedCount(s)).toBe(1);
  });
  it("counts distinct filled categories", () => {
    expect(filledCategoryCount(pick("flavor-cherry", "flavor-banana", "color-caramel"))).toBe(2);
  });
});
