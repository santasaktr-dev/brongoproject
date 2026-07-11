"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Mascot } from "@/components/brand/Mascot";
import { ScoreDisplay } from "@/components/game/ScoreDisplay";
import { ShareButtons } from "@/components/game/ShareButtons";
import { ResultIngredient } from "@/components/game/ResultIngredient";
import { AskPharmacistButton } from "@/components/product/AskPharmacistButton";
import { ingredients } from "@/content/ingredients";
import { useGame } from "@/features/game/GameProvider";
import { selectIngredients } from "@/features/game/selectors";
import { recipeScore, getReaction } from "@/features/game/score";
import { track } from "@/lib/analytics";

export default function Result() {
  const { state, ready, reset } = useGame();
  const selected = selectIngredients(ingredients, state.selectedIds);
  const result = selected.length ? recipeScore(selected, ingredients) : null;
  const score = result?.score ?? null;
  const reaction = score != null ? getReaction(score) : null;
  const band = reaction?.state;

  useEffect(() => {
    if (ready && band) track("result_viewed", { scoreBand: band, selectedCount: selected.length });
  }, [ready, band, selected.length]);

  if (!ready) return null;
  if (!selected.length || score == null || !reaction)
    return (
      <>
        <Header />
        <main id="main" className="page-shell page-head">
          <Mascot state="empty" decorative={false} />
          <h1>ยังไม่มีสูตรให้แสดงผล</h1>
          <p>กลับไปเลือกอย่างน้อย 1 ส่วนผสม แล้วมาดูผลลัพธ์กัน</p>
          <Link className="button primary" href="/mix">ไปที่ห้องผสมยา</Link>
        </main>
      </>
    );

  return (
    <>
      <Header />
      <main id="main" className="page-shell">
        <ScoreDisplay score={score} reaction={reaction} />
        <h2>มาดูส่วนผสมที่คุณเลือกกัน</h2>
        <div className="result-list">
          {selected.map((item) => <ResultIngredient key={item.id} item={item} />)}
        </div>
        {result && (result.missing > 0 || result.extra > 0) && (
          <p className="nudge">
            {result.missing > 0 && `ยังขาดส่วนผสมที่มีในสูตร BRONGO อีก ${result.missing} รายการ`}
            {result.missing > 0 && result.extra > 0 && " · "}
            {result.extra > 0 && `มีตัวที่ไม่อยู่ในสูตร ${result.extra} รายการ`}
          </p>
        )}
        <ShareButtons score={score} scoreBand={reaction.state} />
        <div className="next-steps">
          <Link className="button primary" href="/brongo">ดูข้อมูล BRONGO →</Link>
          <div className="minor-actions">
            <Link className="button ghost" href="/mix" onClick={() => track("mix_edited", { previousScoreBand: reaction.state })}>ปรับสูตรเดิม</Link>
            <span className="minor-sep" aria-hidden="true">·</span>
            <Link className="button ghost" href="/mix" onClick={() => { track("mix_restarted", { sourceRoute: "/result" }); reset(); }}>เริ่มใหม่ทั้งหมด</Link>
          </div>
        </div>
        <AskPharmacistButton sourceRoute="/result" />
      </main>
    </>
  );
}
