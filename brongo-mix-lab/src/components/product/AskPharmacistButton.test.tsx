import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AskPharmacistButton } from "./AskPharmacistButton";
import { setAnalyticsSink } from "@/lib/analytics";

afterEach(() => {
  delete process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;
  setAnalyticsSink(() => {});
});

describe("AskPharmacistButton", () => {
  it("links out to the LINE OA in a new tab", () => {
    render(<AskPharmacistButton sourceRoute="/result" />);
    const link = screen.getByRole("link", { name: /ถามเภสัชกร/ });
    expect(link).toHaveAttribute("href", expect.stringContaining("line.me"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("tracks a click with its source route", () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED = "true";
    const sink = vi.fn();
    setAnalyticsSink(sink);
    render(<AskPharmacistButton sourceRoute="/brongo" />);
    fireEvent.click(screen.getByRole("link", { name: /ถามเภสัชกร/ }));
    expect(sink).toHaveBeenCalledWith("pharmacist_contact_clicked", { sourceRoute: "/brongo" });
  });
});
