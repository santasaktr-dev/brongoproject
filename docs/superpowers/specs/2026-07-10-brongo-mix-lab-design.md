# BRONGO Mix Lab — Vertical Slice Design

## Goal

สร้าง MVP ที่เล่นครบเส้นทาง Landing → Mix Lab → Result → ข้อมูล BRONGO โดยยึดข้อความ กติกาคะแนน และ asset ใน `docs/` เป็น source of truth

## Scope

- Next.js App Router, TypeScript และ Tailwind CSS
- Mobile-first และ responsive ถึง desktop
- เลือกส่วนผสมจาก 5 หมวด คง state ใน sessionStorage และแก้/ล้างสูตรได้
- คะแนนเท่ากับจำนวนรายการที่เลือกและตรงกับ BRONGO หารด้วยรายการที่เลือกทั้งหมด แล้วปัดด้วย `Math.round`
- หน้า Result แสดง score band, match status และ fun fact
- หน้าข้อมูลยาแสดง product summary, safety content และ FAQ แบบ accessible accordion
- ใช้ mascot และ product images ตาม `asset-usage-guide.md`

## Architecture

ข้อมูลส่วนผสมและข้อความผลิตภัณฑ์แยกจาก presentation components ส่วน game logic เป็น pure functions ที่ทดสอบได้โดยไม่พึ่ง React สถานะเกมใช้ React Context + reducer และบันทึกเฉพาะ ingredient IDs ใน sessionStorage

## Visual Direction

ใช้แนว Playful Lab: พื้นครีม/ฟ้า สีส้มเป็น primary action การ์ดทรงมนและ motion เบา ๆ ในเกม หน้า Result และข้อมูลยาลดความขี้เล่นเพื่อเพิ่มความชัดเจนและความน่าเชื่อถือ รองรับ `prefers-reduced-motion`

## Error and Empty States

หน้า Result ที่ไม่มีสูตรแสดง empty state พร้อม CTA กลับ Mix Lab ข้อมูล session ที่ไม่ถูกต้องถูกล้างอย่างปลอดภัย CTA ดูผลถูก disable เมื่อยังไม่เลือกส่วนผสม

## Verification

ใช้ Vitest ทดสอบ scoring, reducer และ content rules ใช้ React Testing Library ตรวจ interaction สำคัญ และตรวจ production build รวมถึง flow ใน browser ที่ viewport mobile และ desktop

