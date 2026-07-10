"use client";
import { Accordion } from "@/components/ui/Accordion";
import { productSections } from "@/content/product";

export function ProductAccordion({ onOpen }: { onOpen?: (id: string) => void }) {
  return (
    <Accordion
      onOpen={onOpen}
      items={productSections.map((s) => ({
        id: s.id,
        title: s.title,
        body: s.body.length === 1 ? <p>{s.body[0]}</p> : <ul>{s.body.map((line, i) => <li key={i}>{line}</li>)}</ul>,
      }))}
    />
  );
}
