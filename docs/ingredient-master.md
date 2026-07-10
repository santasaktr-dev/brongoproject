# BRONGO Mix Lab — Ingredient Master

เอกสารนี้เป็น source of truth สำหรับตัวเลือกในเกม สถานะความตรงกับ BRONGO และข้อความผลลัพธ์ ห้าม hard-code ข้อมูลเหล่านี้ซ้ำใน component

## กติกากลาง

- Ingredient หนึ่งรายการเลือกได้ครั้งเดียว
- `BRONGO match = Yes` หมายถึงมีส่วนผสมนั้นอยู่ในสูตร BRONGO ตาม SPC/PIL ที่แนบ
- ถ้ามี Fun fact ให้แสดงทั้งสถานะ BRONGO และ Fun fact
- ถ้าไม่มี Fun fact ให้แสดงเฉพาะสถานะ BRONGO
- สีของเหลวใช้เพื่อ feedback ในเกม ไม่ใช่สีจริงของสารหรือผลิตภัณฑ์
- Functional additive เลือกได้เพียง `Pyridoxine Hydrochloride` หรือ `ไม่ใส่`

## Ingredient Dataset

| ID | หมวด | ชื่อที่แสดง | BRONGO match | คำอธิบายสั้น | Fun fact | Liquid color | Source |
|---|---|---|---:|---|---|---|---|
| `api-carbocisteine` | API | Carbocisteine | No | ตัวยาสำคัญในกลุ่มยาละลายเสมหะ | Carbocisteine มีราคาถูก แต่ละลายน้ำได้น้อย ส่งผลให้ต้องใส่แอลกอฮอล์เพื่อเพิ่มการละลาย | `#DDEFE7` | Ingredients DOCX |
| `api-carbocisteine-lysine` | API | Carbocisteine lysine | Yes | Carbocisteine ในรูปเกลือที่ละลายน้ำได้ดี | เป็นตัวยาเดียวกับ carbocisteine แต่อยู่ในรูปเกลือ ออกฤทธิ์เร็วกว่า carbocisteine ปกติเกือบ 2 เท่า และละลายน้ำได้ดี จึงไม่จำเป็นต้องใส่แอลกอฮอล์ในสูตรตำรับ | `#BFE8D2` | SPC, PIL, Ingredients DOCX |
| `sweetener-sucralose` | Sweetener | Sucralose | Yes | สารให้ความหวานแทนน้ำตาล | — | `#D9F2FF` | SPC, PIL, Ingredients DOCX |
| `sweetener-maltitol` | Sweetener | Maltitol Solution | Yes | สารให้ความหวานประเภทน้ำตาลแอลกอฮอล์ | — | `#E8E0FF` | SPC, PIL, Ingredients DOCX |
| `sweetener-sorbitol` | Sweetener | Sorbitol Solution | Yes | สารให้ความหวานประเภทน้ำตาลแอลกอฮอล์ | — | `#DDF5F0` | SPC, PIL, Ingredients DOCX |
| `sweetener-ammonium-glycyrrhizate` | Sweetener | Ammonium Glycyrrhizate | Yes | สารจากรากชะเอมเทศ ให้รสหวานตามธรรมชาติ | — | `#F3E2C4` | SPC, PIL, Ingredients DOCX |
| `sweetener-sucrose` | Sweetener | Sucrose | No | น้ำตาลทราย | การศึกษาปี 1979 พบว่าเด็กที่ได้รับยาน้ำซึ่งมี sucrose ต่อเนื่องมีฟันผุและเหงือกอักเสบมากกว่ากลุ่มควบคุมอย่างมีนัยสำคัญ | `#FFF2CE` | Ingredients DOCX, BMJ 1979 |
| `flavor-cherry` | Flavor | Cherry Flavor | Yes | กลิ่นเชอร์รี่ | — | `#FFB5BC` | SPC, PIL, Ingredients DOCX |
| `flavor-banana` | Flavor | Banana Flavor | No | กลิ่นกล้วย | — | `#FFE98A` | Ingredients DOCX |
| `flavor-strawberry` | Flavor | Strawberry Flavor | No | กลิ่นสตรอว์เบอร์รี | — | `#FF9EB5` | Ingredients DOCX |
| `color-caramel` | Color | Caramel | Yes | สีผสมอาหารจากธรรมชาติ ให้สีน้ำตาล | — | `#C9854F` | SPC, PIL, Ingredients DOCX |
| `color-quinoline-yellow` | Color | Quinoline Yellow | No | สีในกลุ่ม Azo dye ให้สีเหลือง | — | `#F7DF43` | Ingredients DOCX |
| `color-allura-red` | Color | Allura Red | No | สีในกลุ่ม Azo dye ให้สีแดง | Allura Red เป็นสีสังเคราะห์ที่ถูกศึกษามากที่สุดสีหนึ่งเกี่ยวกับผลต่อ neurobehavior ในเด็ก แม้หลักฐานยังไม่สามารถสรุปความสัมพันธ์เชิงสาเหตุได้ และผลกระทบดูเหมือนเกิดเฉพาะในเด็กบางกลุ่มที่ไวต่อสารเหล่านี้ | `#ED5A5A` | Ingredients DOCX |
| `color-brilliant-blue` | Color | Brilliant Blue | No | สีในกลุ่ม Triarylmethane dye ให้สีน้ำเงิน | — | `#5E9FEA` | Ingredients DOCX |
| `functional-vitamin-b6` | Functional | Pyridoxine Hydrochloride (Vitamin B6) | Yes | วิตามินบี 6 | วิตามินบี 6 มีส่วนช่วยในเรื่องระบบประสาทและสมอง | `#D3B3F5` | SPC, PIL, Ingredients DOCX |
| `functional-none` | Functional | ไม่ใส่ | No | ไม่เติม functional additive | — | transparent | Game rule |

## Display Order

1. Active Pharmaceutical Ingredient
2. Sweetening Agent
3. Flavoring Agent
4. Coloring Agent
5. Functional Additive

## Result Copy Rules

### Match

```text
มีใน BRONGO
[ชื่อส่วนผสม] เป็นส่วนหนึ่งของสูตร BRONGO
```

### Not a Match

```text
ไม่มีใน BRONGO
[ชื่อส่วนผสม] ไม่ได้อยู่ในสูตร BRONGO
```

### Fun Fact

แสดงใต้สถานะโดยใช้หัวข้อ `รู้หรือไม่?` และใช้ข้อความในตารางโดยไม่เติมคำกล่าวอ้างใหม่

## Source Map

- `SPC Brongo.pdf`: สูตรส่วนประกอบ ข้อบ่งใช้ ขนาดยา คำเตือน และข้อมูลผลิตภัณฑ์
- `PIL brongo.pdf`: ข้อมูลสำหรับผู้ใช้ยาและรายการส่วนประกอบ
- `Ingredients and fun fact mini game.docx`: รายการตัวเลือกและข้อความ fun fact ที่อนุมัติ
- `น้ำตาลในยาน้ำ ฟันผุ.pdf`: Roberts & Roberts, BMJ 1979 สำหรับ fun fact เรื่อง sucrose

