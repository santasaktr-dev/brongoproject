import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ShareButtons } from "./ShareButtons";
import { setAnalyticsSink } from "@/lib/analytics";

afterEach(() => {
  delete process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;
  setAnalyticsSink(() => {});
  vi.restoreAllMocks();
});

describe("ShareButtons", () => {
  it("renders a LINE share link carrying the score", () => {
    render(<ShareButtons score={80} scoreBand="almost-perfect" />);
    const line = screen.getByRole("link", { name: "แชร์ไป LINE" });
    expect(line).toHaveAttribute("href", expect.stringContaining("line.me/R/share"));
    expect(decodeURIComponent(line.getAttribute("href")!)).toContain("BRONGO 80%");
    expect(line).toHaveAttribute("target", "_blank");
  });

  it("copies the share text and shows feedback + fires analytics", async () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED = "true";
    const sink = vi.fn();
    setAnalyticsSink(sink);
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<ShareButtons score={60} scoreBand="happy" />);
    fireEvent.click(screen.getByRole("button", { name: "คัดลอกลิงก์" }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("BRONGO 60%"));
    expect(await screen.findByText("คัดลอกแล้ว ✓")).toBeInTheDocument();
    expect(sink).toHaveBeenCalledWith("result_shared", { channel: "copy", scoreBand: "happy" });
  });
});
