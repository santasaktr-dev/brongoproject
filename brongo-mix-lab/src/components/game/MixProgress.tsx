import type { Category } from "@/content/ingredients";

export function MixProgress({ categories, filled }: { categories: { id: Category; title: string }[]; filled: Set<Category> }) {
  const done = categories.filter((c) => filled.has(c.id)).length;
  return (
    <div className="mix-progress" aria-label={`เลือกส่วนผสมแล้ว ${done} จาก ${categories.length} หมวด`}>
      <ol>
        {categories.map((c, i) => (
          <li key={c.id} className={filled.has(c.id) ? "done" : ""}>
            <span className="step-dot" aria-hidden="true">{filled.has(c.id) ? "✓" : i + 1}</span>
            <small>{c.title}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
