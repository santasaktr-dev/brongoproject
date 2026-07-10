import { z } from "zod";

// ตรวจ content ตอน build/test ตาม plan.md §5.4 — build ต้องล้มเหลวเมื่อข้อมูลไม่ถูกต้อง
export const categorySchema = z.enum(["api", "sweetener", "flavor", "color", "functional"]);
export const sourceSchema = z.enum(["SPC", "PIL", "INGREDIENTS_DOC", "BMJ_1979", "GAME_RULE"]);

export const ingredientSchema = z.object({
  id: z.string().min(1),
  category: categorySchema,
  name: z.string().min(1),
  description: z.string().min(1),
  isBrongoMatch: z.boolean(),
  funFact: z.string().min(1).optional(),
  liquidColor: z.string().min(1),
  sources: z.array(sourceSchema).min(1),
});

export type IngredientInput = z.infer<typeof ingredientSchema>;

export function validateIngredients<T extends { id: string }>(list: T[]): T[] {
  list.forEach((item) => ingredientSchema.parse(item));
  const ids = list.map((i) => i.id);
  const duplicates = [...new Set(ids.filter((id, idx) => ids.indexOf(id) !== idx))];
  if (duplicates.length) throw new Error(`Duplicate ingredient id: ${duplicates.join(", ")}`);
  return list;
}
