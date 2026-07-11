import { SITE_URL } from "@/config/links";

// จำกัดคะแนนให้เป็นจำนวนเต็ม 0–100 (กันค่าเพี้ยนจาก query string)
export const clampScore = (score: number): number => {
  if (!Number.isFinite(score)) return 0;
  return Math.min(100, Math.max(0, Math.round(score)));
};

// ลิงก์ที่แชร์ออกไป → เปิดหน้าเริ่มเล่นใหม่ พร้อมพารามิเตอร์คะแนนสำหรับการ์ด OG
export const buildShareUrl = (score: number): string => `${SITE_URL}/?s=${clampScore(score)}`;

// ข้อความชวนเล่น (การตลาด ไม่ใช่การอ้างสรรพคุณยา)
export const buildShareText = (score: number): string =>
  `ฉันผสมยาแก้ไอตรงกับสูตร BRONGO ${clampScore(score)}%! มาลองผสมของคุณบ้าง 👉 ${buildShareUrl(score)}`;

// ลิงก์เปิดหน้าต่างแชร์ของ LINE พร้อมข้อความ (รวมลิงก์)
export const buildLineShareHref = (score: number): string =>
  `https://line.me/R/share?text=${encodeURIComponent(buildShareText(score))}`;
