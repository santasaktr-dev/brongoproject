# BRONGO Mix Lab — Content Approval Workflow

## วัตถุประสงค์

กำหนดเจ้าของเนื้อหา แหล่งอ้างอิง และขั้นตอนอนุมัติ เพื่อไม่ให้ข้อความเกี่ยวกับยา ส่วนผสม หรือ claim ถูกแก้โดยไม่มีการตรวจสอบ

## Roles

ชื่อบุคคลจริงให้บันทึกใน release record ของแต่ละรอบ โดย workflow ใช้บทบาทคงที่ดังนี้

| Role | Responsibility | Approval authority |
|---|---|---|
| Product Owner | เป้าหมายเกม ขอบเขต และ final product decision | UX copy และ scope |
| Medical Reviewer | ความถูกต้องด้านยา ขนาดยา คำเตือน และส่วนผสม | Medical content |
| Regulatory Reviewer | Claim, disclaimer, `ฆท. xx/xxxx` และการนำเสนอผลิตภัณฑ์ | Regulatory release gate |
| Brand Reviewer | Logo, CI, mascot, tone และ visual assets | Brand assets/copy tone |
| UX Writer | ร่างและแก้ข้อความให้เข้าใจง่าย | Draft only |
| Developer | นำ approved content เข้า data files | ไม่มีอำนาจเปลี่ยนความหมาย |
| QA Owner | ตรวจว่า production build ตรงกับ approved version | Release verification |

## Source Hierarchy

หากข้อมูลขัดกัน ให้หยุดเผยแพร่ข้อความนั้นและส่ง Medical/Regulatory Reviewer ตัดสินตามลำดับนี้

1. เอกสารกำกับยาที่อนุมัติและฉบับล่าสุด
2. SPC ฉบับอนุมัติและฉบับล่าสุด
3. เอกสารภายในที่มี reviewer/date/version ชัดเจน
4. งานวิจัยต้นฉบับที่ระบุ citation
5. Marketing/UX draft

Marketing หรือ UX copy ห้าม override ข้อมูลจากระดับที่สูงกว่า

## Content Classes

### Class A — Medical/Regulatory

- ชื่อยา ตัวยาสำคัญ ความแรง รูปแบบยา
- ข้อบ่งใช้ ขนาดยา ข้อห้าม คำเตือน อาการไม่พึงประสงค์
- ingredient match
- claim เรื่องความเร็วในการออกฤทธิ์ การละลาย และแอลกอฮอล์
- claim เรื่อง sucrose กับฟันผุ
- disclaimer และเลข `ฆท. xx/xxxx`

ต้องผ่าน Medical + Regulatory Reviewer

### Class B — Product Education

- คำอธิบายส่วนผสม
- FAQ
- score explanation
- fun fact ที่ไม่ใช่ claim ใหม่

ต้องผ่าน Medical Reviewer และ Product Owner

### Class C — Experience Copy

- CTA
- mascot reactions
- instructions
- empty/error states

ต้องผ่าน Product Owner + Brand Reviewer และส่ง Medical Reviewer ตรวจเฉพาะข้อความที่อาจตีความเป็นคำแนะนำสุขภาพ

## Approval States

```text
DRAFT → MEDICAL REVIEW → REGULATORY REVIEW (Class A) → BRAND/UX REVIEW → APPROVED → IMPLEMENTED → QA VERIFIED → RELEASED
```

- ห้ามข้าม state
- rejected content กลับ `DRAFT` พร้อม comment
- การแก้ approved content ทุกครั้งสร้าง version ใหม่

## Change Record Required Fields

- Content ID
- Page/component
- Old text
- New text
- Reason for change
- Content class
- Source file and page/section
- Draft author and date
- Medical reviewer and date
- Regulatory reviewer and date หากเป็น Class A
- Brand/Product approval and date
- Release version

## Source Records for Initial MVP

| Source ID | File | Version/date shown in document | Use |
|---|---|---|---|
| `SPC-2024-09` | `SPC Brongo.pdf` | September 2024 | Product characteristics and formula |
| `PIL-2024-10` | `PIL brongo.pdf` | October 2024 | Patient-facing product information |
| `INGREDIENTS-01` | `Ingredients and fun fact mini game.docx` | Working document supplied for project | Choices and approved fun facts |
| `BMJ-1979-07-07` | `น้ำตาลในยาน้ำ ฟันผุ.pdf` | 7 July 1979 | Sucrose/dental disease fun fact |
| `UX-NOTES-01` | `Untitled Notebook.pdf` | Working notes supplied for project | Flow and UI intent only; not medical source |

## Review Checklist

### Medical

- ชื่อสารและการสะกดถูกต้อง
- หน่วย ความแรง ขนาดยา และช่วงอายุถูกต้อง
- matched/unmatched ตรงกับสูตร BRONGO
- fun fact ไม่ขยายผลเกิน source
- แยก association ออกจาก causation
- ไม่มีคำแนะนำเฉพาะบุคคล

### Regulatory

- มี `ฆท. xx/xxxx` ตามคำสั่งโครงการ
- disclaimer อยู่ในตำแหน่งที่เข้าถึงได้
- claim และภาพไม่ทำให้เข้าใจผิด
- game score ไม่ถูกสื่อเป็นประสิทธิภาพหรือความปลอดภัย
- product CTA ไม่ปลอมเป็นคำแนะนำทางการแพทย์

### Brand

- ใช้ logo/mascot ที่อนุมัติ
- น้ำเสียงสมดุล สนุกแต่ไม่ล้อเลียนเรื่องสุขภาพ
- reaction ไม่ตำหนิผู้ใช้
- ข้อความอ่านง่ายสำหรับผู้ปกครอง

### QA

- build content ตรงกับ approved text แบบตัวอักษรต่ออักษรใน Class A
- source/version แสดงใน release record
- ไม่มี fallback หรือ placeholder หลุดสู่ user-facing UI
- accordion, disclaimer และ safety information ใช้งานบน mobile และ screen reader ได้

## Emergency Correction

หากพบข้อมูลทางการแพทย์ผิดหลังเผยแพร่:

1. Product Owner ปิดหรือซ่อนข้อความ/หน้าที่มีปัญหาโดยเร็วที่สุด
2. Medical และ Regulatory Reviewer ระบุข้อความแก้ไข
3. Developer ออก hotfix โดยไม่รวมการเปลี่ยนแปลงอื่น
4. QA ตรวจข้อความและ flow ที่เกี่ยวข้อง
5. บันทึก incident, ผลกระทบ, เวลาแก้ และมาตรการป้องกันซ้ำ

## Release Record Template

- Release version:
- Release date:
- Source versions:
- Product Owner:
- Medical Reviewer:
- Regulatory Reviewer:
- Brand Reviewer:
- QA Owner:
- Approved content commit/version:
- Known limitations:
- Final decision: Approved / Rejected

