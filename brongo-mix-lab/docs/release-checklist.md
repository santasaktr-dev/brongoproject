# BRONGO Mix Lab — Release Checklist

ใช้ก่อนปล่อย preview build สำหรับ user testing (plan.md Task 13/14)

## 1. Content & medical/regulatory gate

- [ ] ทุก product claim ตรงกับ `content-source-map.md`
- [ ] Class A content (ชื่อยา, ขนาดยา, คำเตือน, disclaimer, `ฆท.`) ตรงตัวต่อตัวกับ source
- [ ] เลข `ฆท. xx/xxxx` เปลี่ยนเป็นเลขจริง
- [ ] ตรวจสะกดชื่อสาร ไทย/อังกฤษ หน่วย และขนาดยา
- [ ] ไม่มีข้อความสื่อว่าเกมวินิจฉัย/แนะนำยาเฉพาะบุคคล
- [ ] Medical Reviewer sign-off
- [ ] Regulatory Reviewer sign-off
- [ ] Brand Reviewer ตรวจ Landing / Result / BRONGO Detail

## 2. Engineering gate

- [ ] `npm run verify` ผ่านทั้งหมด (lint, typecheck, unit+component, build, e2e)
- [ ] ตรวจ `qa-checklist.md` ครบ (รวม manual a11y / responsive / cross-browser / performance)
- [ ] ไม่มี placeholder/fallback หลุดสู่ UI (ยกเว้น wordmark ที่ยอมรับใน MVP)
- [ ] `NEXT_PUBLIC_ANALYTICS_ENABLED` ตั้งค่าตามต้องการของรอบทดสอบ

## 3. Deployment

- [ ] Preview deployment ที่ **ไม่ index** โดย search engine (`X-Robots-Tag: noindex` / `robots` meta)
- [ ] Basic access protection หากเป็นการทดสอบวงปิด
- [ ] ตรวจว่า asset ทั้งสี่โหลดถูกต้องบน preview URL
- [ ] เล่น flow หลักครบบน preview URL จริง

## 4. Release record (บันทึกทุกรอบ)

- Release version:
- Release date:
- Source versions: SPC-2024-09 / PIL-2024-10 / INGREDIENTS-01 / BMJ-1979-07-07
- Product Owner:
- Medical Reviewer / date:
- Regulatory Reviewer / date:
- Brand Reviewer:
- QA Owner:
- Approved content commit:
- Known limitations: (เช่น `ฆท.` placeholder, wordmark placeholder)
- Final decision: Approved / Rejected
