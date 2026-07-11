# BRONGO Mix Lab — Mixing Behavior Specification

## Interaction Model

- แสดงทั้ง 5 หมวดในหน้าเดียวแบบ vertical sections
- ingredient card ทุกใบเป็น toggle ยกเว้น Functional ซึ่งเป็น radio group
- ไม่จำกัดจำนวนรวมที่เลือก
- ผู้ใช้เลือก ingredient เดิมซ้ำไม่ได้
- ต้องมีอย่างน้อย 1 selection จึงกด `ดูผลลัพธ์` ได้
- การเลือกทุกครั้งต้องเปลี่ยนทั้ง card state, จำนวน selection และ vessel feedback พร้อมกัน

## Functional Additive Rule

- `Vitamin B6` และ `ไม่ใส่` เลือกได้เพียงหนึ่งรายการ
- เริ่มต้นโดยยังไม่เลือกทั้งสองตัว
- เลือกตัวหนึ่งแล้วอีกตัวต้องถูกยกเลิกอัตโนมัติ
- การกดตัวที่เลือกอยู่ซ้ำให้ยกเลิกได้ เพื่อให้กลับสู่สถานะยังไม่เลือก

## Mixing Vessel

### Liquid Level

ระดับน้ำขึ้นตามจำนวนรายการที่เลือก โดยไม่อ้างอิงปริมาตรจริง

```text
0 selections = 12% (ฐานหลอดทดลอง)
1 selection  = 24%
2 selections = 36%
3 selections = 48%
4 selections = 60%
5 selections = 70%
6 selections = 78%
7+ selections = min(92%, 78% + 2% ต่อรายการเพิ่มเติม)
```

`ไม่ใส่` นับเป็น selection สำหรับคะแนน แต่ไม่เพิ่มระดับน้ำ เพราะไม่มีการเติมสาร

### Liquid Color

ใช้สีของ ingredient ที่เลือกตาม `ingredient-master.md`

- ไม่มี selection ที่มีสี: ใช้ `#EAF7FA`
- มีหนึ่งสี: ใช้สีนั้นโดยตรง
- มีหลายสี: ผสมค่า RGB แบบ weighted average โดยให้น้ำหนัก Coloring Agent = 3, Flavor = 2 และหมวดอื่น = 1
- หลังผสม ลด saturation ลง 10% เพื่อป้องกันสีฉูดฉาดเกินไป
- สีของ liquid ไม่มีผลต่อคะแนน

### Visual Feedback per Selection

1. Card เปลี่ยน selected state ภายใน 120 ms
2. หยดสีจาก card ไป vessel 250–400 ms
3. ระดับน้ำและสี transition 300–450 ms
4. mascot reaction 200–350 ms
5. screen reader live region ประกาศ `[ชื่อ] ถูกเลือก รวม [จำนวน] รายการ`

การยกเลิกใช้ลำดับเดียวกันแต่ไม่ต้องเล่นหยดย้อนกลับ

## Submit Behavior

- ปุ่ม `ดูผลลัพธ์` ติดอยู่ด้านล่างแบบ sticky บน mobile
- disabled เมื่อ `selectedCount === 0`
- เมื่อกด:
  1. lock interaction ป้องกัน double submit
  2. บันทึก selections ลง sessionStorage
  3. คำนวณคะแนนด้วย pure scoring function
  4. เล่น mixing transition 800–1,500 ms
  5. navigate ไป `/result`
- หาก animation asset โหลดไม่สำเร็จ ให้ใช้ CSS fade และ navigate ตามปกติ

## Scoring

```text
score = round((matched selected ingredients / all selected ingredients) × 100)
```

- `ไม่ใส่` เป็น unmatched selection
- ไม่มี completeness bonus
- ไม่มี penalty นอกเหนือจากการเพิ่ม denominator ด้วยรายการที่ไม่ตรง
- ถ้า selection ว่าง ห้ามสร้างผลลัพธ์และ redirect กลับ `/mix`

## Edit, Reset and Persistence

- `ปรับสูตรเดิม` (เดิม `แก้สูตร`): กลับ `/mix` พร้อม selection เดิม
- `เริ่มใหม่ทั้งหมด` (เดิม `ผสมใหม่`): ล้าง selection, score และ result state แล้วกลับ `/mix`
- refresh `/mix` หรือ `/result`: คืน state จาก sessionStorage
- ปิด tab หรือหมด session: ไม่จำเป็นต้องเก็บข้อมูลต่อ
- state ที่อ่านไม่ผ่าน schema: ล้าง state และกลับ `/mix` พร้อมข้อความ `เริ่มสูตรใหม่อีกครั้งนะ`

## Reduced Motion

- ปิด vessel shake, falling drops, bounce และ confetti
- เปลี่ยนสี/ระดับน้ำด้วย fade 120–180 ms
- ข้าม mixing transition หลังแสดงสถานะกำลังประมวลผลอย่างน้อย 150 ms
- ทุกฟังก์ชันต้องใช้งานได้ครบโดยไม่มี animation

## Error and Edge Cases

- Asset หาย: แสดง CSS placeholder และ alt text ที่เหมาะสม
- sessionStorage ใช้งานไม่ได้: เล่นต่อใน memory ได้
- JavaScript error ระหว่าง analytics: ห้าม block game flow
- direct navigation ไป `/result`: redirect `/mix`
- ingredient id ที่ไม่มีใน dataset: ตัดออกก่อนคำนวณ
- viewport ต่ำกว่า 360px: card ยังต้องไม่ล้นแนวนอน

