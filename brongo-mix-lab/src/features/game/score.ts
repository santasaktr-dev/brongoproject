import { reactions, type ReactionBand } from "@/content/reactions";
import type { Ingredient } from "@/content/ingredients";

export type RecipeScore = { score: number; correct: number; missing: number; extra: number };

// "ไม่ใส่" (functional-none) แปลว่า "ไม่เติม" ไม่ใช่ส่วนผสมจริง จึงไม่นับในคะแนน
const isRealIngredient = (i: Ingredient): boolean => i.id !== "functional-none";

// คะแนนความตรงกับสูตรจริงของ BRONGO แบบ Jaccard (ความเหมือนของเซต):
//   score = correct / (correct + missing + extra)
//   - correct = เลือกและอยู่ในสูตร BRONGO
//   - missing = อยู่ในสูตรแต่ไม่ได้เลือก
//   - extra   = เลือกแต่ไม่มีในสูตร
// 100% ก็ต่อเมื่อเลือกครบสูตรพอดีและไม่มีตัวเกิน
export function recipeScore(selected: Ingredient[], all: Ingredient[]): RecipeScore {
  const target = all.filter((i) => i.isBrongoMatch);
  const picks = selected.filter(isRealIngredient);
  const correct = picks.filter((i) => i.isBrongoMatch).length;
  const extra = picks.length - correct;
  const missing = target.length - correct;
  const union = correct + missing + extra;
  const score = union ? Math.round((correct / union) * 100) : 0;
  return { score, correct, missing, extra };
}

export const getReaction = (score: number): ReactionBand =>
  [...reactions].reverse().find((reaction) => score >= reaction.min)!;

export { reactions };
