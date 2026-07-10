"use client";
import type { Ingredient } from "@/content/ingredients";
import { TestTube } from "./TestTube";

export function IngredientCard({ item, selected, onToggle }: { item: Ingredient; selected: boolean; onToggle: (item: Ingredient) => void }) {
  const isFunctional = item.category === "functional";
  return (
    <button
      role={isFunctional ? "radio" : undefined}
      aria-checked={isFunctional ? selected : undefined}
      aria-pressed={isFunctional ? undefined : selected}
      className={`ingredient-card ${selected ? "selected" : ""}`}
      onClick={() => onToggle(item)}
    >
      {selected && <span className="pick-badge" aria-hidden="true">✓</span>}
      <TestTube color={item.liquidColor} id={item.id} />
      <b>{item.name}</b>
      <small>{item.description}</small>
    </button>
  );
}
