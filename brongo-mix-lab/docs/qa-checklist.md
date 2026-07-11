# BRONGO Mix Lab — QA Checklist

ใช้ก่อนแต่ละรอบ user testing / release (plan.md Task 12 + Definition of Done)

## Automated gates (`npm run verify`)

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm test` (unit + component, vitest)
- [x] `npm run build` (production build + Zod content validation)
- [x] `npm run test:e2e` (Playwright)

## Functional flow

- [x] Landing → Mix → (transition) → Result → BRONGO Detail ครบ
- [x] `/result` โดยไม่มี state → แสดง empty state / กลับไป `/mix` ได้
- [x] เลือก/ยกเลิก ingredient ได้ทั้ง pointer และ keyboard
- [x] Functional additive (Vitamin B6 / ไม่ใส่) exclusive + กดซ้ำเพื่อยกเลิก
- [x] CTA ดูผลลัพธ์ disabled เมื่อยังไม่เลือก
- [x] ล้างสูตรผ่าน dialog (ยืนยัน/ยกเลิก/Escape)
- [x] ปรับสูตรเดิม คงสูตรเดิม, เริ่มใหม่ทั้งหมด ล้าง state
- [x] Scoring: 100% / 60% / 0% ตรงตามสูตร (E2E)
- [x] refresh `/mix` และ `/result` คง state (sessionStorage)

## Content

- [x] ทุกข้อความ trace ได้ตาม `content-source-map.md`
- [x] fun fact / product / faq / reactions มาจาก data files (ไม่ hard-code ใน component)
- [ ] เลข `ฆท. xx/xxxx` เปลี่ยนเป็นเลขจริง (รอ Regulatory)
- [ ] Medical/Regulatory reviewer sign-off (ดู `release-checklist.md`)

## Accessibility

- [x] skip link + h1 เดียวต่อหน้า
- [x] ingredient card มี aria-pressed / functional เป็น radiogroup
- [x] live region ประกาศการเลือก/ยกเลิก + สถานะกำลังคำนวณ
- [x] accordion ใช้ `<details>` (keyboard + screen reader ได้)
- [x] reduced-motion ปิด animation (globals.css `@media prefers-reduced-motion`)
- [ ] ตรวจ contrast ทุกคู่สี ≥ WCAG AA 4.5:1 (manual)
- [ ] ทดสอบ VoiceOver ทั้ง flow (manual)

## Responsive (manual)

- [ ] 360×800 · [ ] 390×844 · [ ] 768×1024 · [ ] 1024×768 · [ ] 1440×900
- [ ] ไม่มีข้อความล้น / ปุ่มเล็กกว่า 44×44px / horizontal scroll
- [ ] Thai line-breaking อ่านได้

## Cross-browser (manual)

- [ ] Chrome · [ ] Safari · [ ] Firefox (เวอร์ชันปัจจุบัน)

## Performance (manual, mobile profile)

- [ ] LCP < 2.5s · [ ] CLS < 0.1 · [ ] INP < 200ms
