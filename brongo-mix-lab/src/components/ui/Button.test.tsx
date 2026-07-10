import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the primary variant by default", () => {
    render(<Button>เริ่ม</Button>);
    const btn = screen.getByRole("button", { name: "เริ่ม" });
    expect(btn).toHaveClass("button", "primary");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("applies the secondary variant", () => {
    render(<Button variant="secondary">รอง</Button>);
    expect(screen.getByRole("button")).toHaveClass("secondary");
  });

  it("can be disabled", () => {
    render(<Button disabled>ปิด</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
