import { describe, expect, it } from "vitest";
import { calculateScore, getReaction } from "./score";

describe("calculateScore", () => {
  it("returns 100 for one match from one selection", () => expect(calculateScore([true])).toBe(100));
  it("returns 60 for three matches from five selections", () => expect(calculateScore([true, true, true, false, false])).toBe(60));
  it("returns 0 when nothing matches", () => expect(calculateScore([false, false, false])).toBe(0));
  it("returns null for an empty selection", () => expect(calculateScore([])).toBeNull());
  it("rounds fractional scores", () => expect(calculateScore([true, false, false])).toBe(33));
});

describe("getReaction", () => {
  it("uses the perfect state at 100", () => expect(getReaction(100).state).toBe("perfect"));
  it("uses the curious state at 25", () => expect(getReaction(25).state).toBe("curious"));
});
