"use client";
import type { Category, Ingredient } from "@/content/ingredients";
import { IngredientCard } from "./IngredientCard";

export function IngredientGroup({ category, items, selectedIds, onToggle }: { category: { id: Category; title: string }; items: Ingredient[]; selectedIds: string[]; onToggle: (item: Ingredient) => void }) {
  const isFunctional = category.id === "functional";
  return (
    <section className="ingredient-section">
      <div className="section-head">
        <h2><span className="cat-title">{category.title}</span></h2>
        <span className="select-badge">{isFunctional ? "เลือกได้ 1 อย่าง" : "เลือกได้หลายตัว"}</span>
      </div>
      <div className="ingredient-grid" role={isFunctional ? "radiogroup" : undefined} aria-label={isFunctional ? category.title : undefined}>
        {items.map((item) => (
          <IngredientCard key={item.id} item={item} selected={selectedIds.includes(item.id)} onToggle={onToggle} />
        ))}
      </div>
    </section>
  );
}
