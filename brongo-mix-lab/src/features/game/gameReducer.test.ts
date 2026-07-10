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

  it("deselects a functional choice when tapped again", () => {
    const withB6 = gameReducer(initialGameState, { type: "selectFunctional", id: "functional-vitamin-b6" });
    const cleared = gameReducer(withB6, { type: "selectFunctional", id: "functional-vitamin-b6" });
    expect(cleared.selectedIds).toEqual([]);
  });

  it("keeps other ingredients when switching functional choice", () => {
    const base = gameReducer({ selectedIds: ["flavor-cherry"], hasMixed: false }, { type: "selectFunctional", id: "functional-vitamin-b6" });
    expect(base.selectedIds).toEqual(["flavor-cherry", "functional-vitamin-b6"]);
    const switched = gameReducer(base, { type: "selectFunctional", id: "functional-none" });
    expect(switched.selectedIds).toEqual(["flavor-cherry", "functional-none"]);
  });

  it("resets the mix", () => {
    const state = { selectedIds: ["flavor-cherry"], hasMixed: true };
    expect(gameReducer(state, { type: "reset" })).toEqual(initialGameState);
  });
});
