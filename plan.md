# BRONGO Mix Lab — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` (recommended) or `executing-plans` to implement this plan task-by-task. Track progress using the checkboxes in this document.

**Goal:** สร้าง MVP web application แบบ gamification สำหรับผู้ปกครองที่มีบุตรเล็ก ให้ผู้ใช้ทดลองเลือกส่วนผสมของยาน้ำแก้ไอ รับคะแนนความตรงกับ BRONGO อ่าน fun fact และเข้าถึงข้อมูลผลิตภัณฑ์ที่อ้างอิงจากเอกสารที่ได้รับ

**Architecture:** ใช้ Next.js App Router และ TypeScript โดยแยก game engine, content data และ presentation ออกจากกันอย่างชัดเจน ข้อมูลส่วนผสม สูตร BRONGO, fun fact และ FAQ ต้องแก้ไขได้จากไฟล์ข้อมูลโดยไม่แก้ component หรือ scoring logic สถานะเกมอยู่ฝั่ง client และไม่ต้องมีฐานข้อมูลหรือระบบสมาชิกใน MVP

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Zod, Vitest, React Testing Library, Playwright, ESLint, Prettier และ Vercel Analytics หรือ analytics adapter ที่ปิดได้

---

## 1. Product Definition

### 1.1 กลุ่มเป้าหมาย

- ผู้ใช้หลัก: ผู้ปกครองที่มีบุตรเล็ก
- ผู้ใช้ร่วม: เด็กที่เล่นร่วมกับผู้ปกครอง
- ภาษาหลักของ MVP: ภาษาไทย
- อุปกรณ์หลัก: โทรศัพท์มือถือแนวตั้ง
- อุปกรณ์รอง: tablet และ desktop

### 1.2 Product Positioning

- น้ำหนักประสบการณ์: สมดุลระหว่างเกมและข้อมูลสุขภาพ
- ช่วง Mix Lab และ reaction มีสีสันและ animation มากกว่า
- ช่วง Result และ BRONGO Detail ใช้โครงสร้างสงบ อ่านง่าย และน่าเชื่อถือกว่า
- เกมไม่วินิจฉัยโรค ไม่แนะนำให้ผู้ใช้เลือกยา และไม่ทดแทนคำแนะนำจากแพทย์หรือเภสัชกร

### 1.3 MVP Success Criteria

- ผู้ใช้ใหม่เข้าใจวิธีเล่นโดยไม่ต้องอ่านคู่มือยาว
- ผู้ใช้เลือกส่วนผสมอย่างน้อยหนึ่งรายการและดูผลลัพธ์ได้
- คะแนนตรงตามสูตรที่อนุมัติทุกกรณี
- ผู้ใช้เห็นชัดว่าส่วนผสมใดมีหรือไม่มีใน BRONGO
- ผู้ใช้เข้าถึง fun fact และข้อมูล BRONGO ได้
- ผู้ใช้สามารถกลับมาแก้สูตรเดิมหรือเริ่มใหม่ได้
- เล่น flow หลักจนจบได้บน mobile โดยไม่มีข้อความล้น ปุ่มเล็กเกินไป หรือ animation ขัดขวางการใช้งาน
- analytics สามารถวัดการเริ่มเกม การเลือกส่วนผสม การดูผล และการเปิดข้อมูลผลิตภัณฑ์ได้โดยไม่เก็บข้อมูลสุขภาพส่วนบุคคล

### 1.4 Out of Scope for MVP

- ระบบสมาชิกและการเข้าสู่ระบบ
- การบันทึกประวัติข้ามอุปกรณ์
- leaderboard, badge, social sharing และรางวัลจริง
- CMS หรือระบบหลังบ้าน
- การแนะนำผลิตภัณฑ์ตามอาการ
- chatbot หรือระบบตอบคำถามทางการแพทย์
- การซื้อสินค้าและการเชื่อมต่อร้านค้า
- ภาษาอังกฤษ

---

## 2. Confirmed Product Rules

### 2.1 Regulatory Text

- แสดงข้อความ `ฆท. xx/xxxx` บน landing page ในตำแหน่งที่เห็นได้แต่ไม่แย่ง visual hierarchy จาก CTA
- แสดง disclaimer ว่าเนื้อหาเป็นกิจกรรมให้ความรู้และไม่ทดแทนคำแนะนำจากบุคลากรทางการแพทย์

### 2.2 Ingredient Selection

- ผู้ใช้เลือกหรือยกเลิกส่วนผสมแต่ละรายการได้
- ต้องเลือกอย่างน้อยหนึ่งรายการก่อนกดดูผลลัพธ์
- หมวด Functional additive มีตัวเลือกแบบ mutually exclusive:
  - Pyridoxine Hydrochloride (Vitamin B6)
  - ไม่ใส่
- การเลือก “ไม่ใส่” ถือเป็นหนึ่งตัวเลือกในผลลัพธ์ แต่ต้องกำหนด `isBrongoMatch: false`
- เมื่อกลับจาก Result ไป Mix Lab ให้คงสูตรเดิมไว้
- ปุ่ม “ผสมใหม่” ต้องล้างตัวเลือกทั้งหมดและกลับสู่ค่าเริ่มต้น

### 2.3 Scoring

<!-- แก้ 2026-07-12: เปลี่ยนเป็นโมเดล "ตรงกับสูตรจริง" (Jaccard) — รอ re-sign-off. เดิม: matched/selected ทำให้เลือกถูก 1 ตัว = 100% -->
```text
score = correct / (correct + missing + extra) × 100
  correct = เลือกและอยู่ในสูตร BRONGO
  missing = อยู่ในสูตร BRONGO แต่ไม่ได้เลือก
  extra   = เลือกแต่ไม่มีในสูตร
```

- วัดความตรงกับสูตรจริง: ลงโทษทั้งการขาด (missing) และการเลือกเกิน (extra)
- 100% ก็ต่อเมื่อเลือกครบสูตรพอดีและไม่มีตัวเกิน
- `functional-none` ("ไม่ใส่") ไม่นับเป็นตัวเลือกจริง (ไม่นับเป็น extra) แต่ B6 จะถูกนับเป็น missing
- เลือกถูก 1 จากสูตร 8 ตัว ได้ 13%; เลือกครบ 8 ตัว ได้ 100%; ไม่มีรายการใดตรง ได้ 0%
- UI ต้องป้องกันการคำนวณเมื่อจำนวนที่เลือกเป็นศูนย์
- แสดงคะแนนเป็นจำนวนเต็ม โดยใช้ `Math.round`

### 2.4 Fun Fact Rules

- ยึดข้อความจาก `Ingredients and fun fact mini game.docx` เป็น content source ที่ได้รับอนุมัติ
- ถ้ารายการมี fun fact ให้แสดงข้อความนั้น
- ถ้ารายการไม่มี fun fact ให้แสดงเพียงว่าส่วนผสมนั้นมีหรือไม่มีใน BRONGO
- ไม่จัดเนื้อหาเป็น “ข้อดี–ข้อเสีย”
- ข้อความเกี่ยวกับ carbocisteine lysine ที่อนุมัติแล้ว:
  - เป็นตัวยาเดียวกับ carbocisteine แต่อยู่ในรูปเกลือ
  - ออกฤทธิ์เร็วกว่า carbocisteine ปกติเกือบ 2 เท่า
  - ละลายน้ำได้ดี จึงไม่จำเป็นต้องใส่แอลกอฮอล์ในสูตรตำรับ

### 2.5 BRONGO Detail

- ใช้ข้อมูลจาก `PIL brongo.pdf`
- หัวข้อหลัก:
  - BRONGO คืออะไร
  - ใช้เพื่ออะไร
  - วิธีใช้
  - การเก็บรักษา
  - ข้อควรระวัง
  - อาการที่ต้องหยุดยาและพบแพทย์ทันที
- แสดงใน accordion ที่ใช้งานด้วย keyboard และ screen reader ได้
- มี FAQ เพิ่มเติมในรูปแบบเดียวกัน
- มี CTA กลับไปผสมสูตรใหม่

---

## 3. Information Architecture and Game Flow

```text
Landing
  → Mix Lab
    → Mixing Reaction
      → Result
        ├→ Edit Mix → Mix Lab with previous selections
        ├→ Mix Again → reset → Mix Lab
        └→ Learn About BRONGO → BRONGO Detail
              └→ Mix Again → reset → Mix Lab
```

### 3.1 Landing

- BRONGO logo
- headline: “ยาน้ำแก้ไอแบบไหนที่ใช่สำหรับคุณ?”
- คำอธิบายสั้นว่าผู้ใช้จะได้ผสมสูตรและเรียนรู้เรื่องส่วนผสม
- mascot และขวด BRONGO โดยไม่บดบัง headline
- CTA “เริ่มผสมยา”
- `ฆท. xx/xxxx`
- disclaimer และลิงก์ข้อมูลผลิตภัณฑ์

### 3.2 Mix Lab

- แสดง progress 5 หมวด
- แสดงหมวดและตัวเลือกทั้งหมดบนหน้าเดียวแบบเลื่อนลง เพื่อให้ผู้ใช้ย้อนแก้ได้ง่าย
- แต่ละ ingredient card มีชื่อ คำอธิบายสั้น ภาพหลอดทดลอง และ selected state
- แสดง animation ระดับของเหลวสูงขึ้นเมื่อจำนวนที่เลือกเพิ่ม
- แสดงจำนวนรายการที่เลือกแบบ real time
- CTA “ดูผลลัพธ์” disabled เมื่อยังไม่เลือกอะไร
- มีปุ่มล้างสูตรพร้อม confirmation เฉพาะเมื่อมีตัวเลือกแล้ว

### 3.3 Mixing Reaction

- เป็น transition ระยะสั้น 800–1,500 ms
- ขวดหรือหลอดทดลองเขย่าและของเหลวเปลี่ยนสี
- mascot แสดง reaction ตาม score band แต่ยังไม่เปิดคะแนนทันที
- ผู้ใช้ที่เปิด `prefers-reduced-motion` ต้องข้าม animation เหลือ transition แบบ fade สั้น ๆ

### 3.4 Result

- แสดง score เป็นองค์ประกอบหลัก
- แสดงข้อความ reaction ตาม score band
- แสดง summary ของสูตรที่เลือก
- แสดงแต่ละรายการพร้อมสถานะ “มีใน BRONGO” หรือ “ไม่มีใน BRONGO” โดยใช้ทั้ง icon และข้อความ ไม่ใช้สีอย่างเดียว
- แสดง fun fact ตามกติกา
- CTA หลัก “ดูข้อมูล BRONGO”
- CTA รอง “แก้สูตร” และ “ผสมใหม่”

### 3.5 BRONGO Detail

- header ขนาดเล็กพร้อม logo
- product summary
- accordion จาก PIL
- disclaimer และข้อมูลผู้ผลิต/ผู้จัดจำหน่ายตามเอกสาร
- CTA “ผสมใหม่”

---

## 4. Brand and UI Direction

### 4.1 Brand Character

- Friendly
- Playful
- Optimistic
- Trustworthy

### 4.2 Provisional Color Tokens

ค่าสีต่อไปนี้เป็นค่าประมาณจากภาพถ่ายและต้องแทนที่ด้วย brand master เมื่อได้รับไฟล์ CI ต้นฉบับ

| Token | Provisional value | Usage |
|---|---:|---|
| `brand.orange` | `#FF8A52` | Primary CTA, progress, focus moments |
| `brand.coral` | `#FF6B61` | Mascot reaction, secondary accent |
| `brand.sky` | `#BDEEFF` | Light background, info surfaces |
| `brand.yellow` | `#FFD84F` | Rewards, highlights |
| `brand.mint` | `#62D7C7` | Freshness, supporting accent |
| `brand.green` | `#4FBE58` | Correct/match state with icon and text |
| `neutral.cream` | `#FFF8EF` | Primary page background |
| `neutral.ink` | `#263943` | Body and heading text |

### 4.3 Typography

- ใช้ฟอนต์ไทย web font ที่อ่านง่ายและมีน้ำหนัก 400–800 เช่น `LINE Seed Sans TH` หากได้รับสิทธิ์ใช้งาน หรือ `Noto Sans Thai` เป็น fallback
- Headline: 700–800, line-height 1.15–1.25
- Body: 400–500, ขั้นต่ำ 16px, line-height 1.55–1.7
- Button: 700, ขั้นต่ำ 16px
- จำกัดบรรทัดเนื้อหาไม่เกินประมาณ 65–75 ตัวอักษรบน desktop

### 4.4 Shape and Illustration

- มุมการ์ด 20–28px
- ปุ่มหลักทรง pill หรือ rounded rectangle
- เส้นหนาและเงานุ่มแบบของเล่น แต่ไม่ใช้เงาหนักในหน้าข้อมูลยา
- ใช้เส้นโค้งสีส้ม–เหลืองเป็น motif ของ progress และ liquid transition
- mascot เป็นผู้ช่วยแสดง reaction ไม่ใช่ภาพประดับคงที่

### 4.5 Accessibility

- Contrast ของข้อความปกติขั้นต่ำ WCAG AA 4.5:1
- Touch target ขั้นต่ำ 44×44px
- focus ring ชัดเจนทุก interactive element
- ทุก animation ต้องรองรับ reduced motion
- ใช้ icon + label สำหรับสถานะ ไม่ใช้สีอย่างเดียว
- screen reader ต้องประกาศเมื่อเลือก/ยกเลิก ingredient และเมื่อคะแนนพร้อม

---

## 5. Technical Architecture

### 5.1 Proposed File Structure

```text
brongo-mix-lab/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── mix/page.tsx
│   ├── result/page.tsx
│   └── brongo/page.tsx
├── components/
│   ├── brand/
│   │   ├── BrongoLogo.tsx
│   │   └── Mascot.tsx
│   ├── game/
│   │   ├── IngredientCard.tsx
│   │   ├── IngredientGroup.tsx
│   │   ├── MixProgress.tsx
│   │   ├── MixingVessel.tsx
│   │   ├── MixingTransition.tsx
│   │   ├── ScoreDisplay.tsx
│   │   └── ResultIngredient.tsx
│   ├── product/
│   │   ├── ProductAccordion.tsx
│   │   └── ProductSummary.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       └── Accordion.tsx
├── features/game/
│   ├── GameProvider.tsx
│   ├── gameReducer.ts
│   ├── selectors.ts
│   ├── score.ts
│   └── types.ts
├── content/
│   ├── ingredients.ts
│   ├── product.ts
│   ├── faq.ts
│   └── reactions.ts
├── lib/
│   ├── analytics.ts
│   ├── contentSchema.ts
│   └── cn.ts
├── public/
│   ├── brand/
│   ├── mascot/
│   └── ingredients/
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
└── docs/
    ├── content-source-map.md
    └── qa-checklist.md
```

### 5.2 Route Responsibilities

- `/`: landing และ entry point
- `/mix`: ingredient selection และ mix state
- `/result`: score, reaction, selected ingredients และ fun facts
- `/brongo`: product information และ FAQ
- หากเข้าหน้า `/result` โดยไม่มี state ให้ redirect ไป `/mix`

### 5.3 State Management

- ใช้ React Context + reducer เพราะ state มีขนาดเล็กและไม่ต้องเพิ่ม state library
- เก็บ `selectedIngredientIds`, `currentStep`, `hasMixed` และ `resultViewed`
- เก็บ state ใน `sessionStorage` เพื่อรองรับ refresh และป้องกันการหายระหว่าง flow
- ไม่เก็บข้อมูลส่วนบุคคล
- validate state ที่อ่านจาก storage ก่อนใช้

### 5.4 Content Validation

- ใช้ Zod validate ingredient data, product sections, FAQ และ reactions ตอน build/development
- build ต้องล้มเหลวเมื่อ id ซ้ำ, category ไม่ถูกต้อง, ไม่มี label หรือ `isBrongoMatch` ไม่ใช่ boolean
- ทุก content record ต้องมี `source` เพื่อ trace กลับไปยังเอกสารต้นทาง

---

## 6. Data Model

### 6.1 Types

```ts
export type IngredientCategory =
  | "api"
  | "sweetener"
  | "flavor"
  | "color"
  | "functional";

export type Ingredient = {
  id: string;
  category: IngredientCategory;
  name: string;
  shortDescription: string;
  isBrongoMatch: boolean;
  funFact?: string;
  imageSrc: string;
  liquidColor: string;
  source: "SPC" | "PIL" | "INGREDIENTS_DOC" | "BMJ_1979";
};

export type ProductSection = {
  id: string;
  title: string;
  body: string[];
  source: "PIL";
};

export type ReactionBand = {
  min: number;
  max: number;
  title: string;
  description: string;
  mascotState: "retry" | "curious" | "happy" | "perfect";
};
```

### 6.2 Reaction Bands

| Score | State | Communication intent |
|---:|---|---|
| 0–24 | retry | ชวนลองใหม่โดยไม่ตำหนิ |
| 25–49 | curious | สูตรน่าสนใจและมีบางอย่างให้ค้นพบ |
| 50–74 | happy | ใกล้เคียง BRONGO หลายรายการ |
| 75–99 | happy | ใกล้มาก พร้อมชวนดูรายละเอียด |
| 100 | perfect | สิ่งที่เลือกทั้งหมดตรงกับ BRONGO |

ข้อความจริงอยู่ใน `content/reactions.ts` และต้องหลีกเลี่ยงคำที่สื่อว่าผู้ใช้เลือกยาได้ “ถูกต้องทางการแพทย์”

---

## 7. Analytics Plan

### 7.1 Events

| Event | Trigger | Properties |
|---|---|---|
| `landing_viewed` | เปิด landing | viewport category |
| `game_started` | กดเริ่มผสม | entry source ถ้ามี |
| `ingredient_toggled` | เลือก/ยกเลิก | ingredient id, category, selected |
| `mix_submitted` | กดดูผล | selected count, matched count |
| `result_viewed` | คะแนน render สำเร็จ | score band, selected count |
| `ingredient_fact_opened` | เปิดรายละเอียด | ingredient id |
| `product_detail_opened` | ไปหน้า BRONGO | source route |
| `product_section_opened` | เปิด accordion | section id |
| `mix_edited` | กลับไปแก้สูตร | previous score band |
| `mix_restarted` | ล้างและเริ่มใหม่ | source route |

### 7.2 Privacy Rules

- ไม่ส่งชื่อ อายุ อาการ โรค ยาที่ใช้อยู่ หรือข้อมูลระบุตัวบุคคล
- ไม่ส่งข้อความอิสระจากผู้ใช้ เพราะ MVP ไม่มี input แบบ free text
- ingredient id เป็นข้อมูลพฤติกรรมในเกม ไม่ใช่คำแนะนำการรักษา
- analytics ต้องปิดได้ผ่าน environment variable

---

## 8. Implementation Tasks

### Task 1: Bootstrap and Quality Gates

**Files:**
- Create: `brongo-mix-lab/` Next.js application
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `docs/qa-checklist.md`

- [ ] สร้าง Next.js project ด้วย TypeScript, App Router, ESLint และ Tailwind
- [ ] เพิ่ม Vitest, React Testing Library, jsdom และ Playwright
- [ ] ตั้ง scripts: `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`
- [ ] ตั้ง CI command ให้รัน lint → typecheck → unit tests → build → E2E
- [ ] เพิ่ม `.env.example` พร้อม `NEXT_PUBLIC_ANALYTICS_ENABLED=false`
- [ ] ยืนยันว่า default Next.js page ถูกแทนที่ด้วย smoke page ของ BRONGO
- [ ] Commit: `chore: bootstrap brongo mix lab`

**Acceptance:** `npm run lint`, `npm run typecheck`, `npm test`, และ `npm run build` ผ่าน

### Task 2: Brand Tokens and Global Layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/brand/BrongoLogo.tsx`
- Create: `tests/component/Button.test.tsx`

- [ ] เขียน test สำหรับ primary, secondary และ disabled button states
- [ ] เพิ่ม CSS variables สำหรับ palette, spacing, radius, shadow และ typography
- [ ] โหลดฟอนต์ไทยพร้อม fallback
- [ ] เพิ่ม skip link, metadata, viewport และ global focus styles
- [ ] สร้าง Button และ Card primitives
- [ ] เพิ่ม logo placeholder ที่เปลี่ยนเป็น official SVG ได้โดยไม่เปลี่ยน layout
- [ ] ตรวจ contrast ทุกคู่สีที่ใช้กับข้อความและปุ่ม
- [ ] Commit: `feat: add brongo design tokens and ui primitives`

**Acceptance:** UI primitives ผ่าน keyboard, focus และ contrast audit

### Task 3: Content Schema and Ingredient Dataset

**Files:**
- Create: `features/game/types.ts`
- Create: `lib/contentSchema.ts`
- Create: `content/ingredients.ts`
- Create: `docs/content-source-map.md`
- Create: `tests/unit/contentSchema.test.ts`

- [ ] เขียน failing tests สำหรับ duplicate id, missing label และ invalid category
- [ ] เพิ่ม TypeScript types และ Zod schemas
- [ ] ถอดข้อมูล ingredient ทั้งหมดจากเอกสารที่แนบลง dataset
- [ ] ระบุ `isBrongoMatch`, `funFact`, `source`, `liquidColor` และ image path ทุก record
- [ ] บันทึก mapping ระหว่างข้อความในเว็บไซต์กับหน้าหรือหัวข้อของเอกสารต้นทาง
- [ ] เพิ่ม validation command ที่รันระหว่าง test/build
- [ ] Commit: `feat: add validated ingredient content model`

**Acceptance:** dataset ผ่าน schema, ไม่มี id ซ้ำ และทุกข้อความ trace กลับไปยัง source ได้

### Task 4: Scoring Engine

**Files:**
- Create: `features/game/score.ts`
- Create: `features/game/selectors.ts`
- Create: `tests/unit/score.test.ts`

- [ ] เขียน test: 1 match จาก 1 selection = 100
- [ ] เขียน test: 3 matches จาก 5 selections = 60
- [ ] เขียน test: 0 matches จาก 3 selections = 0
- [ ] เขียน test: empty selection คืน `null` และไม่หารด้วยศูนย์
- [ ] เขียน test: score ที่มีเศษใช้ `Math.round`
- [ ] implement pure function ที่ไม่มี dependency กับ React
- [ ] เพิ่ม selector สำหรับ selected, matched และ unmatched ingredients
- [ ] Commit: `feat: implement brongo match scoring`

**Acceptance:** score ตรงกับสูตรที่อนุมัติทุก test case

### Task 5: Game State and Persistence

**Files:**
- Create: `features/game/gameReducer.ts`
- Create: `features/game/GameProvider.tsx`
- Create: `tests/unit/gameReducer.test.ts`
- Create: `tests/component/GameProvider.test.tsx`

- [ ] เขียน tests สำหรับ select, deselect, exclusive functional choice, edit และ reset
- [ ] implement reducer actions: `toggleIngredient`, `selectFunctional`, `markMixed`, `reset`
- [ ] implement safe sessionStorage hydration และ validation
- [ ] ป้องกัน hydration mismatch
- [ ] ยืนยันว่า reload บน `/mix` และ `/result` ยังมี state เดิม
- [ ] Commit: `feat: add persistent game state`

**Acceptance:** state ไม่สูญหายเมื่อเปลี่ยน route หรือ refresh และ reset ได้สมบูรณ์

### Task 6: Landing Page

**Files:**
- Modify: `app/page.tsx`
- Create: `components/brand/Mascot.tsx`
- Create: `tests/e2e/landing.spec.ts`

- [ ] สร้าง responsive hero ตาม CI
- [ ] เพิ่ม headline, supporting copy, CTA, logo, mascot และ bottle visual
- [ ] เพิ่ม `ฆท. xx/xxxx` และ disclaimer
- [ ] เพิ่ม analytics `landing_viewed` และ `game_started`
- [ ] ทดสอบ CTA ไป `/mix`
- [ ] ตรวจ layout ที่ 360, 390, 768, 1024 และ 1440px
- [ ] Commit: `feat: build brongo landing page`

**Acceptance:** ผู้ใช้เห็นจุดประสงค์และ CTA โดยไม่ต้อง scroll บน mobile มาตรฐาน

### Task 7: Mix Lab Selection UI

**Files:**
- Create: `app/mix/page.tsx`
- Create: `components/game/IngredientCard.tsx`
- Create: `components/game/IngredientGroup.tsx`
- Create: `components/game/MixProgress.tsx`
- Create: `components/game/MixingVessel.tsx`
- Create: `tests/component/IngredientCard.test.tsx`
- Create: `tests/e2e/mix.spec.ts`

- [ ] เขียน component tests สำหรับ selected state และ accessible name
- [ ] render ingredient groups จาก dataset โดยไม่มี hard-coded ingredient ใน component
- [ ] implement Vitamin B6/ไม่ใส่แบบ exclusive
- [ ] เพิ่ม liquid level และสีที่ derive จาก selections
- [ ] disabled CTA เมื่อไม่มี selection
- [ ] เพิ่ม live region ประกาศจำนวนที่เลือก
- [ ] เพิ่ม clear confirmation dialog
- [ ] ส่ง analytics เฉพาะ ingredient id และ category
- [ ] Commit: `feat: build ingredient mixing experience`

**Acceptance:** เลือก/ยกเลิกได้ทั้ง pointer และ keyboard และ state ตรงกับ UI เสมอ

### Task 8: Mixing Transition and Motion

**Files:**
- Create: `components/game/MixingTransition.tsx`
- Create: `tests/component/MixingTransition.test.tsx`

- [ ] เพิ่ม transition 800–1,500 ms ระหว่าง submit และ result
- [ ] เพิ่ม vessel shake, liquid blend และ mascot reaction
- [ ] เขียน test ให้ reduced-motion ข้าม motion ที่ไม่จำเป็น
- [ ] ป้องกัน double submit
- [ ] ให้ transition ทำงานได้แม้ asset animation โหลดไม่สำเร็จ
- [ ] Commit: `feat: add accessible mixing transition`

**Acceptance:** animation ไม่ block navigation และ reduced-motion ใช้งานได้

### Task 9: Result Page

**Files:**
- Create: `app/result/page.tsx`
- Create: `components/game/ScoreDisplay.tsx`
- Create: `components/game/ResultIngredient.tsx`
- Create: `content/reactions.ts`
- Create: `tests/component/ScoreDisplay.test.tsx`
- Create: `tests/e2e/result.spec.ts`

- [ ] redirect ไป `/mix` ถ้าไม่มี selection
- [ ] แสดง score และ reaction band
- [ ] แสดง matched/unmatched ด้วย icon + text
- [ ] แสดง fun fact ตาม dataset; ถ้าไม่มีให้แสดงสถานะ BRONGO เท่านั้น
- [ ] เพิ่ม CTA ดูข้อมูล BRONGO, แก้สูตร และผสมใหม่
- [ ] เขียน E2E สำหรับ 100%, 60% และ 0%
- [ ] ส่ง analytics โดยไม่ส่งข้อความทางการแพทย์หรือข้อมูลส่วนบุคคล
- [ ] Commit: `feat: build score and ingredient result experience`

**Acceptance:** ผลลัพธ์ทุกกรณีตรงกับ dataset และสูตรคะแนน

### Task 10: Product Content and FAQ

**Files:**
- Create: `content/product.ts`
- Create: `content/faq.ts`
- Create: `components/ui/Accordion.tsx`
- Create: `components/product/ProductAccordion.tsx`
- Create: `components/product/ProductSummary.tsx`
- Create: `app/brongo/page.tsx`
- Create: `tests/component/Accordion.test.tsx`
- Create: `tests/e2e/product.spec.ts`

- [ ] ถอดข้อความที่อนุมัติจาก PIL ลง content files
- [ ] สร้าง accordion ตาม WAI-ARIA pattern
- [ ] เพิ่ม product summary, manufacturer/distributor และ disclaimer
- [ ] เพิ่ม CTA ผสมใหม่ที่ reset state
- [ ] ทดสอบ keyboard: Tab, Enter, Space และ focus order
- [ ] เพิ่ม analytics เมื่อเปิด section
- [ ] Commit: `feat: add brongo product information and faq`

**Acceptance:** เนื้อหาครบตาม 6 หัวข้อและ accordion ใช้กับ keyboard/screen reader ได้

### Task 11: Analytics Adapter

**Files:**
- Create: `lib/analytics.ts`
- Create: `tests/unit/analytics.test.ts`

- [ ] กำหนด typed event map ตามตาราง analytics
- [ ] implement no-op เมื่อ analytics disabled
- [ ] sanitize properties ให้รับเฉพาะ allowlist
- [ ] ห้ามส่ง ingredient name, free text หรือข้อมูลระบุตัวบุคคล
- [ ] เชื่อม provider ที่เลือกโดยไม่ให้ component รู้ implementation
- [ ] Commit: `feat: add privacy-safe analytics events`

**Acceptance:** analytics ปิดได้และ events ที่ไม่อยู่ใน allowlist ถูก reject ใน development

### Task 12: Responsive, Accessibility and Cross-browser QA

**Files:**
- Modify: `docs/qa-checklist.md`
- Create: `tests/e2e/accessibility.spec.ts`

- [ ] ตรวจ viewport 360×800, 390×844, 768×1024, 1024×768 และ 1440×900
- [ ] ทดสอบ Chrome, Safari และ Firefox เวอร์ชันปัจจุบัน
- [ ] ทดสอบ keyboard-only ทั้ง flow
- [ ] ทดสอบ VoiceOver หรือ screen reader เทียบเท่า
- [ ] ตรวจ contrast, headings, landmarks, labels และ live regions
- [ ] ตรวจ reduced motion
- [ ] ตรวจ Thai line breaking และไม่มีข้อความล้น
- [ ] ตั้ง performance budgets: LCP < 2.5s, CLS < 0.1, INP < 200ms บน mobile profile
- [ ] Commit: `test: complete responsive and accessibility qa`

**Acceptance:** ไม่มี blocker ระดับ critical/high จาก accessibility และ flow หลักผ่านทุก browser เป้าหมาย

### Task 13: Content and Medical Review Gate

**Files:**
- Modify: `docs/content-source-map.md`
- Modify: `docs/qa-checklist.md`

- [ ] ตรวจทุก product claim กับ content source map
- [ ] ยืนยันข้อความ `ฆท. xx/xxxx` ตามที่กำหนด
- [ ] ตรวจคำสะกดชื่อสาร ภาษาไทย ภาษาอังกฤษ หน่วย และขนาดยา
- [ ] ตรวจว่าไม่มีข้อความสื่อว่าเกมวินิจฉัยหรือแนะนำยาเฉพาะบุคคล
- [ ] บันทึก reviewer, วันที่ และ version ของเอกสารต้นทาง
- [ ] lock content version สำหรับ user testing
- [ ] Commit: `docs: approve mvp content for user testing`

**Acceptance:** ไม่มีข้อความที่ไม่ระบุแหล่งที่มาและ reviewer sign-off ครบ

### Task 14: User Testing Build and Deployment

**Files:**
- Create: `docs/user-test-script.md`
- Create: `docs/release-checklist.md`

- [ ] สร้าง preview deployment ที่ไม่ index โดย search engines
- [ ] เพิ่ม basic access protection หากการทดสอบเป็นวงปิด
- [ ] เขียน test script สำหรับผู้ปกครอง 5–8 คน
- [ ] เก็บตัวชี้วัด: completion rate, time to result, misclicks, comprehension และ intent to replay
- [ ] ไม่เก็บข้อมูลสุขภาพของเด็ก
- [ ] แก้เฉพาะ usability blockers ก่อน MVP sign-off
- [ ] รัน full verification suite และบันทึกผล
- [ ] Commit: `release: prepare brongo mix lab mvp user test`

**Acceptance:** preview URL เล่น flow หลักได้ครบและ release checklist ผ่านทุกข้อ

---

## 9. Required Test Matrix

### 9.1 Scoring Cases

| Selected | Matched | Expected |
|---:|---:|---:|
| 0 | 0 | no result / CTA disabled |
| 1 | 1 | 100% |
| 1 | 0 | 0% |
| 2 | 1 | 50% |
| 3 | 2 | 67% |
| 5 | 3 | 60% |
| all BRONGO ingredients | all | 100% |

### 9.2 State Cases

- เลือก ingredient แล้ว reload `/mix`
- เลือก Vitamin B6 แล้วเปลี่ยนเป็น “ไม่ใส่”
- ดู result แล้วย้อนมาแก้สูตร
- กดผสมใหม่จาก Result
- กดผสมใหม่จาก BRONGO Detail
- เปิด `/result` โดยตรงโดยไม่มี state
- sessionStorage มีข้อมูลเสียหรือ schema เก่า

### 9.3 Content Cases

- matched ingredient ที่มี fun fact
- matched ingredient ที่ไม่มี fun fact
- unmatched ingredient ที่มี fun fact
- unmatched ingredient ที่ไม่มี fun fact
- ชื่อสารยาวบน mobile
- FAQ คำตอบหลายย่อหน้า

---

## 10. Definition of Done

MVP ถือว่าสมบูรณ์เมื่อ:

- [ ] ทุก route และ flow ใน Section 3 ทำงานครบ
- [ ] scoring ผ่าน test matrix ทุกกรณี
- [ ] ingredient, fun fact และ product content มาจาก data files ไม่ hard-code ใน component
- [ ] content source map ครบและผ่านการตรวจทาน
- [ ] responsive QA ผ่านทุก viewport เป้าหมาย
- [ ] keyboard และ screen reader ทำ flow หลักได้
- [ ] reduced-motion ทำงาน
- [ ] analytics events ทำงานและไม่เก็บ PII/health data
- [ ] lint, typecheck, unit, component, E2E และ production build ผ่าน
- [ ] preview deployment พร้อมสำหรับทดสอบกับผู้ปกครอง
- [ ] ไม่มี known issue ระดับ critical หรือ high

---

## 11. Approved Asset Mapping

ไฟล์ต่อไปนี้ได้รับอนุมัติให้ใช้ใน MVP และมีพื้นหลังโปร่งใส:

- `Logo.png` — mascot สีเหลือง ตาเปิด ใช้เป็น primary mascot/idle/curious
- `Logo2.png` — mascot สีส้ม ตายิ้ม ใช้เป็น secondary mascot/happy/perfect
- `drug1.png` — ภาพขวดยา BRONGO ใช้ใน hero และ product summary
- `drug2.png` — ภาพกล่อง BRONGO ใช้ใน hero, result CTA และ product detail

ขนาดไฟล์ต้นฉบับ:

- `Logo.png`: 612×408 px
- `Logo2.png`: 612×408 px
- `drug1.png`: 408×611 px
- `drug2.png`: 433×577 px

การจัดวางในโปรเจกต์:

```text
public/brand/mascot-yellow.png  ← Logo.png
public/brand/mascot-orange.png  ← Logo2.png
public/brand/brongo-bottle.png  ← drug1.png
public/brand/brongo-box.png     ← drug2.png
```

ห้ามใช้ชื่อ `Logo` เป็นชื่อ component เพราะไฟล์ดังกล่าวเป็น mascot ไม่ใช่ BRONGO wordmark ให้ใช้ `Mascot` ใน code และ alt text

สิ่งที่ยังต้องได้ก่อน production polish แต่ไม่ขวาง MVP:

- BRONGO wordmark/logo แบบ SVG หรือ PNG ที่ได้รับอนุมัติ หากต้องใช้แยกจากฉลากสินค้า
- brand master colors และสิทธิ์ใช้งานฟอนต์
- ข้อความ FAQ ฉบับอนุมัติ
- รายชื่อ reviewer ฝ่ายการแพทย์/กฎหมายสำหรับ content sign-off

Mascot reaction ที่ไม่มีภาพแยกให้ใช้ `Logo.png` หรือ `Logo2.png` ร่วมกับ CSS transform, vessel effect และ decorative particles โดยห้ามบิดสัดส่วน เปลี่ยนสี หรือแก้ใบหน้าภายในไฟล์ภาพ
