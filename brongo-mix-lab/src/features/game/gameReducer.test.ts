import { describe, expect, it } from "vitest";
import { gameReducer, initialGameState } from "./gameReducer";

describe("gameReducer", () => {
  it("toggles regular ingredients", () => {
    const selected = gameReducer(initialGameState, { type: "toggle", id: "api-carbocisteine" });
    expect(selected.selectedIds).toEqual(["api-carbocisteine"]);
    expect(gameReducer(selected, { type: "toggle", id: "api-carbocisteine" }).selectedIds).toEqual([]);
  });

  it("keeps functional choices mutually exclusive", () => {
    const withB6 = gameReducer(initialGameState, { type: "selectFunctional", id: "functional-vitamin-b6" });
    const withNone = gameReducer(withB6, { type: "selectFunctional", id: "functional-none" });
    expect(withNone.selectedIds).toEqual(["functional-none"]);
  });

  it("resets the mix", () => {
    const state = { selectedIds: ["flavor-cherry"], hasMixed: true };
    expect(gameReducer(state, { type: "reset" })).toEqual(initialGameState);
  });
});
