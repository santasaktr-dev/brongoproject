"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { IngredientGroup } from "@/components/game/IngredientGroup";
import { MixProgress } from "@/components/game/MixProgress";
import { MixingVessel } from "@/components/game/MixingVessel";
import { MixingTransition } from "@/components/game/MixingTransition";
import { categories, ingredients, type Category, type Ingredient } from "@/content/ingredients";
import { useGame } from "@/features/game/GameProvider";
import { selectIngredients, matchedCount } from "@/features/game/selectors";
import { liquidLevel, mixLiquidColor } from "@/features/game/mixing";
import { track } from "@/lib/analytics";

export default function Mix() {
  const { state, toggle, markMixed, reset } = useGame();
  const router = useRouter();
  const [mixing, setMixing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [announce, setAnnounce] = useState("");
  const cancelRef = useRef<HTMLButtonElement>(null);

  const selected = selectIngredients(ingredients, state.selectedIds);
  const liquid = mixLiquidColor(selected);
  const level = liquidLevel(selected.filter((i) => i.liquidColor !== "transparent").length);
  const filled = new Set<Category>(selected.map((i) => i.category));

  useEffect(() => {
    if (confirmClear) cancelRef.current?.focus();
  }, [confirmClear]);

  function handleToggle(item: Ingredient) {
    const isFunctional = item.category === "functional";
    const active = state.selectedIds.includes(item.id);
    const len = state.selectedIds.length;
    const funcSelected = state.selectedIds.some((x) => x.startsWith("functional-"));
    const count = active ? len - 1 : isFunctional && funcSelected ? len : len + 1;
    setAnnounce(active ? `ยกเลิก ${item.name} เหลือ ${count} รายการ` : `${item.name} ถูกเลือก รวม ${count} รายการ`);
    track("ingredient_toggled", { ingredientId: item.id, category: item.category, selected: !active });
    toggle(item.id, isFunctional);
  }

  function submit() {
    if (!selected.length || mixing) return;
    track("mix_submitted", { selectedCount: selected.length, matchedCount: matchedCount(selected) });
    markMixed();
    setMixing(true);
    setTimeout(() => router.push("/result"), 900);
  }

  function doClear() {
    reset();
    setConfirmClear(false);
    setAnnounce("ล้างสูตรเรียบร้อย เริ่มผสมใหม่ได้เลย");
    track("mix_restarted", { sourceRoute: "/mix" });
  }

  const nudge = selected.length >= 6 ? "ส่วนผสมเยอะขึ้นแล้ว พร้อมดูผลเมื่อไรก็กดได้เลย" : selected.length >= 3 ? "สูตรเริ่มเป็นรูปเป็นร่างแล้ว!" : "";

  return (
    <>
      <Header />
      <main id="main" className="page-shell">
        <header className="page-head">
          <p className="eyebrow">THE MIX LAB</p>
          <h1>ผสมสูตรในแบบของคุณ</h1>
          <p className="helper">เลือกอย่างน้อย 1 ส่วนผสม จะเลือกมากหรือน้อยก็ได้ แล้วกดดูผลลัพธ์เมื่อพร้อม</p>
        </header>
        <MixProgress categories={categories} filled={filled} />
        <div className="selection-bar">
          <b>{selected.length ? `เลือกแล้ว ${selected.length} รายการ` : "ยังไม่ได้เลือกส่วนผสม"}</b>
          <Button disabled={!selected.length || mixing} onClick={submit}>ดูผลลัพธ์ →</Button>
        </div>
        {nudge && <p className="helper nudge">{nudge}</p>}
        <p className="sr-only" role="status" aria-live="polite">{announce}</p>
        {categories.map((category) => (
          <IngredientGroup
            key={category.id}
            category={category}
            items={ingredients.filter((i) => i.category === category.id)}
            selectedIds={state.selectedIds}
            onToggle={handleToggle}
          />
        ))}
        <MixingVessel color={liquid} level={level} label="สูตรของคุณ" />
        <div className="mix-actions">
          <Button variant="secondary" disabled={!selected.length || mixing} onClick={() => setConfirmClear(true)}>ล้างสูตร</Button>
          <Button disabled={!selected.length || mixing} onClick={submit}>ดูผลลัพธ์ →</Button>
        </div>
        {!selected.length && <p className="helper">เลือกอย่างน้อย 1 ส่วนผสมก่อนดูผลลัพธ์</p>}
        {confirmClear && (
          <div className="dialog-overlay" onKeyDown={(e) => e.key === "Escape" && setConfirmClear(false)}>
            <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="clear-title" aria-describedby="clear-body">
              <h2 id="clear-title">ต้องการล้างสูตรนี้ไหม?</h2>
              <p id="clear-body">ส่วนผสมที่เลือกทั้งหมดจะถูกล้าง แต่คุณสามารถเริ่มเลือกใหม่ได้ทันที</p>
              <div className="dialog-actions">
                <Button variant="ghost" ref={cancelRef} onClick={() => setConfirmClear(false)}>กลับไปผสมต่อ</Button>
                <Button onClick={doClear}>ล้างสูตร</Button>
              </div>
            </div>
          </div>
        )}
        {mixing && <MixingTransition color={liquid} />}
      </main>
    </>
  );
}
