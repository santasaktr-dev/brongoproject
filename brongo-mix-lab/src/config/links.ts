// External links + site config.
// ค่าเหล่านี้เป็น URL สาธารณะ (ไม่ใช่ความลับ) ตั้งผ่าน env ได้ ไม่ต้องแก้โค้ด

// URL ของเว็บ (ใช้ประกอบลิงก์แชร์ให้เป็น absolute)
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brongoproject.vercel.app";

// LINE Official Account ของ BRONGO — ใส่ค่าจริงผ่าน NEXT_PUBLIC_LINE_OA_URL
// placeholder ชี้ไปหน้า LINE กลางไว้ก่อน จนกว่าจะได้ลิงก์ OA จริง
export const LINE_OA_URL = process.env.NEXT_PUBLIC_LINE_OA_URL ?? "https://line.me/";
