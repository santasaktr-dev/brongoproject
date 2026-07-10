# BRONGO Mix Lab — Asset Usage Guide

เอกสารนี้เป็น source of truth สำหรับการใช้ asset ภาพใน BRONGO Mix Lab MVP ครอบคลุม mascot และภาพผลิตภัณฑ์ที่ได้รับอนุญาตจากเจ้าของโปรเจกต์

## 1. Approved Asset Inventory

| Source file | Asset type | Dimensions | Alpha | Approved purpose |
|---|---|---:|---:|---|
| `Logo.png` | Mascot สีเหลือง ตาเปิด | 612×408 px | Yes | Primary mascot, idle และ curious states |
| `Logo2.png` | Mascot สีส้ม ตายิ้ม | 612×408 px | Yes | Happy, mixing และ high-score states |
| `drug1.png` | ขวดยา BRONGO | 408×611 px | Yes | Hero, product summary และ product detail |
| `drug2.png` | กล่อง BRONGO | 433×577 px | Yes | Hero, result CTA และ product detail |

ไฟล์ทั้งสี่อยู่ที่ project root และสามารถนำไปใช้ใน MVP ได้ทันที

## 2. Naming Convention in Application

คัดลอกไฟล์เข้า `public/brand/` โดยใช้ชื่อที่อธิบายหน้าที่จริง:

```text
Logo.png  → public/brand/mascot-yellow.png
Logo2.png → public/brand/mascot-orange.png
drug1.png → public/brand/brongo-bottle.png
drug2.png → public/brand/brongo-box.png
```

### Naming Rules

- ใช้ lowercase kebab-case
- ห้ามใช้ `logo` เรียก mascot ใน component, variable, alt text หรือ analytics
- Component ใช้ชื่อ `Mascot` สำหรับ `Logo.png` และ `Logo2.png`
- Component ใช้ชื่อ `ProductVisual` หรือชื่อเฉพาะ `BrongoBottle`/`BrongoBox` สำหรับไฟล์ drug
- ห้ามเปลี่ยนชื่อ source files ที่ project root; ให้คัดลอกไปยังชื่อปลายทางตอน bootstrap project

## 3. Semantic Mapping

### Mascot Base Variants

| Variant | File | Meaning |
|---|---|---|
| `yellow` | `mascot-yellow.png` | เป็นมิตร สนใจ ชวนสำรวจ |
| `orange` | `mascot-orange.png` | ดีใจ ตื่นเต้น ฉลองผลลัพธ์ |

### Runtime Reaction Mapping

| State | Base variant | Runtime treatment |
|---|---|---|
| `idle` | yellow | float เบา ๆ และหยุดพักระหว่าง loop |
| `pointing` | yellow | วางข้าง CTA พร้อมเส้นนำสายตาหรือลูกศรแยก |
| `mixing` | orange | rotate สลับเล็กน้อย พร้อม vessel effect |
| `retry` | yellow | ลด bounce เพิ่มฟองหนึ่งจุด ไม่ใช้ท่าผิดหวังรุนแรง |
| `curious` | yellow | tilt เล็กน้อย เพิ่มแว่นขยายเป็น prop แยก |
| `happy` | orange | bounce หนึ่งครั้ง |
| `almost-perfect` | orange | เพิ่มดาวสองดวง |
| `perfect` | orange | เพิ่ม confetti ไม่เกิน 1.2 วินาที |
| `empty` | yellow | วางคู่กับหลอดทดลองเปล่า |

การเพิ่ม prop หรือ particle ต้องเป็น layer แยก ห้ามวาดทับหรือแก้ไฟล์ mascot ต้นฉบับ

## 4. Page Placement

### Landing Page

- ใช้ mascot สีเหลืองเป็นตัวละครหลักใกล้ headline หรือ CTA
- ใช้ขวดยาและกล่องเป็น product cluster ฝั่งตรงข้ามข้อความบน desktop
- Mobile เรียง headline → mascot/product cluster → CTA
- หากพื้นที่แคบ ให้แสดงขวดก่อนกล่อง เพราะรูปขวดระบุผลิตภัณฑ์ได้ชัดในพื้นที่แนวตั้ง
- ห้ามให้ mascot หรือ product visual บดบัง headline, CTA, `ฆท. xx/xxxx` หรือ disclaimer

### Mix Lab

- ใช้ mascot สีเหลืองในสถานะ idle/curious
- ขวดยาและกล่องไม่จำเป็นต้องแสดงระหว่างเลือกส่วนผสม เพื่อให้ความสนใจอยู่ที่ vessel และ ingredient cards
- mascot ต้องใช้พื้นที่รองจาก vessel ไม่ใช่องค์ประกอบหลักของ interaction

### Mixing Transition

- ใช้ mascot สีส้ม
- ใช้ CSS transform กับ container ไม่แก้ image pixels
- ไม่ใช้ขวด BRONGO เป็นภาชนะที่ผู้เล่นกำลังผสม เพื่อไม่สื่อว่าสูตรที่เลือกคือสูตรจริงของผลิตภัณฑ์

### Result Page

- 0–49% ใช้ mascot สีเหลือง
- 50–100% ใช้ mascot สีส้ม
- ใช้กล่อง BRONGO ขนาดเล็กใกล้ CTA `ดูข้อมูล BRONGO`
- ไม่วาง product pack ข้างคะแนนในลักษณะที่สื่อว่าคะแนนคือประสิทธิภาพยา

### BRONGO Detail

- ใช้ขวดและกล่องร่วมกันใน product summary
- mascot ใช้ได้เฉพาะ header หรือ CTA ท้ายหน้า
- safety information ต้องมี visual priority สูงกว่า mascot

## 5. Responsive Sizing

ขนาดต่อไปนี้เป็น rendered size ไม่ใช่ขนาดไฟล์ต้นฉบับ

| Asset | Mobile | Tablet | Desktop |
|---|---:|---:|---:|
| Mascot hero | 150–210 px wide | 220–280 px | 280–360 px |
| Mascot inline/reaction | 88–140 px | 120–170 px | 140–200 px |
| Bottle hero | 110–150 px wide | 150–190 px | 180–230 px |
| Box hero | 105–145 px wide | 145–190 px | 175–225 px |
| Product detail bottle | 120–160 px | 160–210 px | 190–250 px |
| Product detail box | 110–150 px | 150–200 px | 180–240 px |

### Rendering Rules

- ใช้ `height: auto` และรักษา aspect ratio เสมอ
- ใช้ `object-fit: contain`
- ห้าม upscale เกินประมาณ 1.25 เท่าของ pixel width ต้นฉบับบนจอความหนาแน่นปกติ
- ใช้ responsive image sizing และกำหนด width/height เพื่อป้องกัน layout shift
- Asset ที่อยู่เหนือ fold ให้ preload เฉพาะภาพสำคัญที่สุด ไม่ preload ทั้งสี่ภาพ

## 6. Accessibility and Alt Text

### Decorative Mascot

หาก mascot ไม่เพิ่มข้อมูล ให้ใช้ alt ว่าง:

```html
alt=""
```

### Informative Mascot Reaction

หากข้อความ reaction แสดงอยู่ข้างภาพแล้ว ให้ alt ว่างเพื่อไม่อ่านซ้ำ หากไม่มีข้อความที่เทียบเท่า ให้ใช้:

- `มาสคอต BRONGO กำลังชวนเริ่มเกม`
- `มาสคอต BRONGO กำลังดูส่วนผสมด้วยความสนใจ`
- `มาสคอต BRONGO กำลังฉลองผลลัพธ์`

### Product Images

- Bottle: `ขวดยาน้ำ BRONGO ขนาด 40 มิลลิลิตร`
- Box: `กล่องยาน้ำ BRONGO สำหรับเด็ก`
- หากขวดและกล่องอยู่คู่กันและมี product name เป็นข้อความอยู่แล้ว ให้ภาพรองใช้ alt ว่างเพื่อลดการอ่านซ้ำ

ห้ามใส่ claim เช่น `ยาที่ดีที่สุด` หรือ `ปลอดภัยสำหรับเด็ก` ใน alt text

## 7. Motion Rules

- Animation ใช้กับ wrapper ไม่แก้ asset
- Idle loop 3–5 วินาทีและต้องมีช่วงหยุด
- Selection feedback 200–350 ms
- Result entrance 400–600 ms
- Confetti ไม่เกิน 1.2 วินาทีและไม่เล่นซ้ำอัตโนมัติ
- ห้ามเล่นเสียงอัตโนมัติ
- เมื่อ `prefers-reduced-motion: reduce` ให้ปิด shake, bounce, falling particles และ confetti
- Reduced motion ใช้ opacity transition 120–180 ms ได้

## 8. Clear Space and Composition

- เว้นพื้นที่รอบ mascot อย่างน้อย 8% ของความกว้างภาพที่ render
- เว้นพื้นที่รอบ product pack อย่างน้อย 6% ของความกว้างภาพที่ render
- ไม่วางข้อความทับใบหน้า mascot ฉลากขวด หรือข้อความสำคัญบนกล่อง
- ไม่ crop ใบหน้า mascot ฝาขวด ฉลากหลัก หรือชื่อ BRONGO
- บนพื้นหลังที่มีรายละเอียด ให้ใช้ surface สีครีมหรือฟ้าอ่อนรองรับ ไม่เพิ่ม outline ให้ asset

## 9. Permitted Transformations

อนุญาต:

- Resize โดยรักษาสัดส่วน
- Translate และ rotate ไม่เกินประมาณ ±6° สำหรับ reaction
- Scale animation ในช่วงประมาณ 0.96–1.04
- ใส่เงานุ่มที่ container โดยไม่เผาเงาลงไฟล์
- เพิ่ม prop, sparkle, bubble หรือ confetti เป็น layer แยก
- ใช้ crop เฉพาะเมื่อไม่ตัดองค์ประกอบสำคัญตาม Section 8

## 10. Prohibited Transformations

ห้าม:

- บิด ยืด หรือบีบสัดส่วน
- เปลี่ยนสี mascot, ขวด, ฉลาก หรือกล่อง
- วาดทับหรือเปลี่ยนใบหน้า
- ลบหรือแก้ข้อความบนฉลาก/กล่อง
- เติม claim ลงบน product image
- mirror ภาพจนฉลากกลับด้าน
- เพิ่ม outline, bevel, glow หรือ filter ที่ทำให้สีสินค้าเปลี่ยน
- ใช้ภาพขวดหรือกล่องแทน BRONGO wordmark ใน navigation ขนาดเล็กจนอ่านไม่ออก
- เรียก mascot ว่า logo ใน user-facing text หรือ code

## 11. Component Contract

```ts
type MascotState =
  | "idle"
  | "pointing"
  | "mixing"
  | "retry"
  | "curious"
  | "happy"
  | "almost-perfect"
  | "perfect"
  | "empty";

type MascotProps = {
  state: MascotState;
  size?: "sm" | "md" | "lg" | "hero";
  decorative?: boolean;
  className?: string;
};

type ProductVisualProps = {
  variant: "bottle" | "box" | "set";
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
  decorative?: boolean;
  className?: string;
};
```

Component เป็นผู้เลือก base asset จาก state/variant เพื่อไม่ให้ page component อ้างชื่อไฟล์โดยตรง

## 12. Implementation Checklist

- [ ] คัดลอก source assets ไป `public/brand/` ตามชื่อที่กำหนด
- [ ] ตรวจ checksum หรือ visual comparison ว่าไฟล์ไม่ถูกแก้ระหว่างคัดลอก
- [ ] สร้าง `Mascot` และ `ProductVisual` components
- [ ] กำหนด width/height และ responsive `sizes`
- [ ] เพิ่ม alt text ตามบริบท
- [ ] ทดสอบ transparent edge บนพื้นครีม ฟ้า และส้มอ่อน
- [ ] ทดสอบที่ viewport 360, 390, 768, 1024 และ 1440 px
- [ ] ทดสอบ reduced motion
- [ ] ตรวจว่าไม่มี layout shift จากภาพ
- [ ] ตรวจว่า product image ไม่ถูกใช้เป็นคำแนะนำทางการแพทย์
- [ ] ให้ Brand Reviewer ตรวจหน้า Landing, Result และ BRONGO Detail ก่อน release

## 13. Future Asset Upgrade

MVP สามารถเปลี่ยนภาพนิ่งเป็น Lottie, Rive หรือภาพแยกแต่ละ reaction ได้ภายหลัง โดยรักษา `MascotProps` เดิม การเปลี่ยน asset ต้องผ่าน Brand Reviewer และตรวจ reduced motion ใหม่ทุกครั้ง

