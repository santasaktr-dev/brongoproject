import type { Ingredient } from "@/content/ingredients";

// Pure selectors ตาม plan.md Task 4 — ไม่มี dependency กับ React
export const selectIngredients = (all: Ingredient[], ids: string[]): Ingredient[] =>
  all.filter((i) => ids.includes(i.id));

export const matchedIngredients = (selected: Ingredient[]): Ingredient[] =>
  selected.filter((i) => i.isBrongoMatch);

export const unmatchedIngredients = (selected: Ingredient[]): Ingredient[] =>
  selected.filter((i) => !i.isBrongoMatch);

export const matchedCount = (selected: Ingredient[]): number => matchedIngredients(selected).length;

// จำนวนหมวด (จาก 5) ที่เลือกไปแล้วอย่างน้อยหนึ่งรายการ — ใช้กับ MixProgress
export const filledCategoryCount = (selected: Ingredient[]): number =>
  new Set(selected.map((i) => i.category)).size;
