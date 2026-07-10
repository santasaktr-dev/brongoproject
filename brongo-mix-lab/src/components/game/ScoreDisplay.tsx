import type { ReactionBand } from "@/content/reactions";
import { Mascot } from "@/components/brand/Mascot";

export function ScoreDisplay({ score, reaction }: { score: number; reaction: ReactionBand }) {
  return (
    <section className="score-hero">
      <Mascot state={reaction.state} size="lg" />
      <p className="eyebrow">ส่วนผสมที่เลือกตรงกับ BRONGO</p>
      <div className="score">{score}%</div>
      <h1>{reaction.headline}</h1>
      <p>{reaction.copy}</p>
      <p className="helper">คะแนนคำนวณจากจำนวนส่วนผสมที่เลือกแล้วมีใน BRONGO หารด้วยจำนวนส่วนผสมทั้งหมดที่เลือก คะแนนไม่ได้วัดว่าคุณเลือกส่วนผสมครบทั้งสูตรหรือไม่</p>
    </section>
  );
}
