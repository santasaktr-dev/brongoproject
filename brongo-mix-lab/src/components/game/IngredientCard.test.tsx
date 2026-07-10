import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IngredientCard } from "./IngredientCard";
import type { Ingredient } from "@/content/ingredients";

const item: Ingredient = { id: "flavor-cherry", category: "flavor", name: "Cherry Flavor", description: "กลิ่นเชอร์รี่", isBrongoMatch: true, liquidColor: "#FFB5BC", sources: ["SPC"] };

describe("IngredientCard", () => {
  it("exposes an accessible name and selected state", () => {
    render(<IngredientCard item={item} selected onToggle={() => {}} />);
    const btn = screen.getByRole("button", { name: /Cherry Flavor/ });
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveClass("selected");
  });

  it("calls onToggle with the item", () => {
    const onToggle = vi.fn();
    render(<IngredientCard item={item} selected={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledWith(item);
  });

  it("uses radio semantics for functional items", () => {
    const fn: Ingredient = { ...item, id: "functional-none", category: "functional", name: "ไม่ใส่" };
    render(<IngredientCard item={fn} selected onToggle={() => {}} />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true");
  });
});
