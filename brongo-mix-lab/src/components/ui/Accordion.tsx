"use client";
// Disclosure accordion บนพื้นฐาน <details>/<summary> (รองรับ keyboard + screen reader โดยกำเนิด)
export type AccordionItem = { id: string; title: string; body: React.ReactNode };

export function Accordion({ items, onOpen }: { items: AccordionItem[]; onOpen?: (id: string) => void }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details key={item.id} onToggle={(e) => { if (e.currentTarget.open) onOpen?.(item.id); }}>
          <summary>{item.title}</summary>
          <div className="detail-body">{item.body}</div>
        </details>
      ))}
    </div>
  );
}
