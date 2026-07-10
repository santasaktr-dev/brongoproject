// Reaction bands — content source: docs/mascot-reactions.md (approved copy)
export type MascotState = "retry" | "curious" | "happy" | "almost-perfect" | "perfect";
export type ReactionBand = { min: number; state: MascotState; headline: string; copy: string };

export const reactions: readonly ReactionBand[] = [
  { min: 0, state: "retry", headline: "สูตรนี้ต่างจาก BRONGO เยอะเลย", copy: "คะแนนนี้บอกว่าส่วนผสมที่เลือกส่วนใหญ่ไม่มีใน BRONGO ลองปรับสูตรแล้วผสมใหม่ได้เลย" },
  { min: 25, state: "curious", headline: "เริ่มเจอส่วนผสมที่ตรงแล้ว", copy: "มีบางรายการที่ตรงกับ BRONGO เปิดดูแต่ละส่วนผสมเพื่อเรียนรู้เพิ่มเติมกัน" },
  { min: 50, state: "happy", headline: "ใกล้เคียงขึ้นมาก", copy: "มากกว่าครึ่งของส่วนผสมที่เลือกตรงกับ BRONGO มาดูกันว่ารายการไหนตรงบ้าง" },
  { min: 75, state: "almost-perfect", headline: "ใกล้มากแล้ว!", copy: "ส่วนผสมเกือบทั้งหมดที่เลือกมีอยู่ใน BRONGO ดูรายละเอียดแล้วลองปรับอีกนิดได้เลย" },
  { min: 100, state: "perfect", headline: "สิ่งที่เลือกตรงกับ BRONGO 100%", copy: "ส่วนผสมทุกอย่างที่คุณเลือกมีอยู่ใน BRONGO คะแนนนี้ไม่วัดว่าคุณเลือกสูตรได้ครบหรือไม่" },
] as const;
