# BRONGO Mix Lab — Content Source Map

แผนที่ข้อความ user-facing ทุกชิ้น → ไฟล์ต้นทางที่อนุมัติ ใช้ตรวจ traceability (plan.md Task 3/13) เอกสารต้นทางอยู่ที่ root ของโปรเจกต์และสรุปใน `../../docs/content-approval-workflow.md`

## Source IDs

| ID | ไฟล์ | เวอร์ชัน | ใช้กับ |
|---|---|---|---|
| `SPC-2024-09` | `SPC Brongo.pdf` | ก.ย. 2024 | สูตรส่วนประกอบ, ข้อบ่งใช้, ขนาดยา |
| `PIL-2024-10` | `PIL brongo.pdf` | ต.ค. 2024 | ข้อมูลผู้ใช้ยา, ส่วนประกอบ |
| `INGREDIENTS-01` | `Ingredients and fun fact mini game.docx` | working doc | ตัวเลือก + fun fact |
| `BMJ-1979-07-07` | `น้ำตาลในยาน้ำ ฟันผุ.pdf` | 7 ก.ค. 1979 | fun fact sucrose |
| `WEBSITE-COPY` | `docs/website-copy.md` | MVP | ข้อความ UI ทุกหน้า |
| `MASCOT-COPY` | `docs/mascot-reactions.md` | MVP | reaction bands |

## Ingredient dataset → `src/content/ingredients.ts`

ทุก record มีฟิลด์ `sources` ที่ map ตรงกับคอลัมน์ Source ใน `../../docs/ingredient-master.md` โดย code ย่อ: `SPC`=SPC-2024-09, `PIL`=PIL-2024-10, `INGREDIENTS_DOC`=INGREDIENTS-01, `BMJ_1979`=BMJ-1979-07-07, `GAME_RULE`=กติกาเกม (`functional-none`). Zod schema (`src/lib/contentSchema.ts`) บังคับว่าทุก record ต้องมีอย่างน้อยหนึ่ง source.

## Product content → `src/content/product.ts`

| Section id | หัวข้อ | Source |
|---|---|---|
| `what`,`use`,`dosage`,`storage`,`caution`,`stop` | 6 หัวข้อ PIL | PIL-2024-10 (ข้อความจาก WEBSITE-COPY §BRONGO Detail) |
| summary / notice / manufacturer | สรุป + ผู้ผลิต | PIL-2024-10 |

## FAQ → `src/content/faq.ts`

5 คำถาม ตรงกับ `WEBSITE-COPY` §FAQ แบบตัวต่อตัว (`faq-100`, `faq-choose`, `faq-sugar`, `faq-flavor`, `faq-noimprove`)

## Reactions → `src/content/reactions.ts`

5 bands (`retry`/`curious`/`happy`/`almost-perfect`/`perfect`) headline+copy ตรงกับ `MASCOT-COPY` §Reaction Bands

## Global copy

| ข้อความ | ตำแหน่ง | Source |
|---|---|---|
| `ฆท. xx/xxxx` | landing + `src/app/page.tsx` | WEBSITE-COPY §Global (placeholder รอเลขจริงจาก Regulatory) |
| Disclaimer footer | landing footer | WEBSITE-COPY §Global |
| Score explanation | `src/components/game/ScoreDisplay.tsx` | WEBSITE-COPY §Result |

## รายการที่ยังเป็น placeholder (ต้องรออนุมัติก่อน production)

- `ฆท. xx/xxxx` — รอเลขจริงจาก Regulatory Reviewer
- BRONGO wordmark เป็น text placeholder (`BrongoLogo`) รอ official SVG
