import { describe, expect, it } from "vitest";
import { buildLineShareHref, buildShareText, buildShareUrl, clampScore } from "./shareLinks";

describe("clampScore", () => {
  it("rounds to an integer", () => expect(clampScore(79.6)).toBe(80));
  it("clamps below 0 and above 100", () => {
    expect(clampScore(-5)).toBe(0);
    expect(clampScore(150)).toBe(100);
  });
  it("falls back to 0 for non-finite input", () => {
    expect(clampScore(NaN)).toBe(0);
    expect(clampScore(Infinity)).toBe(0);
  });
});

describe("buildShareUrl", () => {
  it("encodes the clamped score in the ?s param", () => {
    expect(buildShareUrl(80)).toMatch(/\/\?s=80$/);
    expect(buildShareUrl(120)).toMatch(/\/\?s=100$/);
  });
});

describe("buildShareText", () => {
  it("includes the score and the share url", () => {
    const text = buildShareText(60);
    expect(text).toContain("BRONGO 60%");
    expect(text).toContain(buildShareUrl(60));
  });
});

describe("buildLineShareHref", () => {
  it("points at the LINE share endpoint with the encoded message", () => {
    const href = buildLineShareHref(100);
    expect(href.startsWith("https://line.me/R/share?text=")).toBe(true);
    expect(decodeURIComponent(href)).toContain("BRONGO 100%");
  });
});
