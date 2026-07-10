import type { Ingredient } from "@/content/ingredients";

export function ResultIngredient({ item }: { item: Ingredient }) {
  return (
    <article className="result-card">
      <p className={`result-status ${item.isBrongoMatch ? "match" : ""}`}>{item.isBrongoMatch ? "✓ มีใน BRONGO" : "× ไม่มีใน BRONGO"}</p>
      <h3>{item.name}</h3>
      <p>{item.name}{item.isBrongoMatch ? " เป็นส่วนหนึ่งของสูตร BRONGO" : " ไม่ได้อยู่ในสูตร BRONGO"}</p>
      {item.funFact && (
        <div className="fact"><b>รู้หรือไม่?</b><p>{item.funFact}</p></div>
      )}
    </article>
  );
}
