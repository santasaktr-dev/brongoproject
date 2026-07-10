import { afterEach, describe, expect, it, vi } from "vitest";
import { sanitize, setAnalyticsSink, track } from "./analytics";

afterEach(() => {
  delete process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;
  setAnalyticsSink(() => {});
});

describe("sanitize", () => {
  it("keeps only allowlisted properties", () => {
    expect(sanitize("ingredient_toggled", { ingredientId: "flavor-cherry", category: "flavor", selected: true, name: "Cherry" }))
      .toEqual({ ingredientId: "flavor-cherry", category: "flavor", selected: true });
  });
  it("throws on an unknown event", () => {
    expect(() => sanitize("secret_event", {})).toThrow(/Unknown analytics event/);
  });
  it("drops disallowed free-text / PII keys", () => {
    expect(sanitize("mix_submitted", { selectedCount: 3, matchedCount: 2, childName: "น้อง" }))
      .toEqual({ selectedCount: 3, matchedCount: 2 });
  });
});

describe("track", () => {
  it("is a no-op when analytics is disabled", () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED = "false";
    const sink = vi.fn();
    setAnalyticsSink(sink);
    track("result_viewed", { scoreBand: "perfect", selectedCount: 3 });
    expect(sink).not.toHaveBeenCalled();
  });
  it("forwards sanitized events when enabled", () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED = "true";
    const sink = vi.fn();
    setAnalyticsSink(sink);
    track("result_viewed", { scoreBand: "perfect", selectedCount: 3 });
    expect(sink).toHaveBeenCalledWith("result_viewed", { scoreBand: "perfect", selectedCount: 3 });
  });
});
