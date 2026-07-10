export const calculateScore = (matches: boolean[]) => matches.length ? Math.round(matches.filter(Boolean).length / matches.length * 100) : null;

export const reactions = [
  { min: 0, state: "retry", headline: "สูตรนี้ต่างจาก BRONGO เยอะเลย", copy: "ส่วนผสมที่เลือกส่วนใหญ่ไม่มีใน BRONGO ลองปรับสูตรแล้วผสมใหม่ได้เลย" },
  { min: 25, state: "curious", headline: "เริ่มเจอส่วนผสมที่ตรงแล้ว", copy: "มีบางรายการที่ตรงกับ BRONGO เปิดดูแต่ละส่วนผสมเพื่อเรียนรู้เพิ่มเติมกัน" },
  { min: 50, state: "happy", headline: "ใกล้เคียงขึ้นมาก", copy: "มากกว่าครึ่งของส่วนผสมที่เลือกตรงกับ BRONGO" },
  { min: 75, state: "almost-perfect", headline: "ใกล้มากแล้ว!", copy: "ส่วนผสมเกือบทั้งหมดที่เลือกมีอยู่ใน BRONGO" },
  { min: 100, state: "perfect", headline: "สิ่งที่เลือกตรงกับ BRONGO 100%", copy: "ส่วนผสมทุกอย่างที่คุณเลือกมีอยู่ใน BRONGO คะแนนนี้ไม่วัดว่าคุณเลือกสูตรได้ครบหรือไม่" },
] as const;
export const getReaction = (score: number) => [...reactions].reverse().find((reaction) => score >= reaction.min)!;
