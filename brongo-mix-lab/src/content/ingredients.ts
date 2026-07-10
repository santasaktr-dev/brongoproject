import { validateIngredients } from "@/lib/contentSchema";

export type Category = "api" | "sweetener" | "flavor" | "color" | "functional";
export type SourceCode = "SPC" | "PIL" | "INGREDIENTS_DOC" | "BMJ_1979" | "GAME_RULE";
export type Ingredient = { id: string; category: Category; name: string; description: string; isBrongoMatch: boolean; funFact?: string; liquidColor: string; sources: SourceCode[] };

export const categories: { id: Category; title: string; helper: string }[] = [
  { id: "api", title: "เลือกตัวยาสำคัญ", helper: "ตัวยาสำคัญเป็นส่วนที่ทำหน้าที่หลักในผลิตภัณฑ์ยา" },
  { id: "sweetener", title: "เติมความหวานแบบไหนดี?", helper: "สารให้ความหวานช่วยปรับรสชาติของยาน้ำ" },
  { id: "flavor", title: "เลือกกลิ่นที่ชอบ", helper: "กลิ่นช่วยให้ยาน้ำรับประทานง่ายขึ้น" },
  { id: "color", title: "แต่งสีให้สูตรของคุณ", helper: "สีในเกมเป็นเพียงภาพจำลอง ไม่ใช่สีจริงของสูตรตำรับ" },
  { id: "functional", title: "เติม Vitamin B6 หรือไม่ใส่?", helper: "หมวดนี้เลือกได้เพียงหนึ่งตัวเลือก" },
];

// sources อ้างอิงคอลัมน์ Source ใน docs/ingredient-master.md — ใช้ trace กลับไปยังเอกสารต้นทาง
const rawIngredients: Ingredient[] = [
  { id:"api-carbocisteine",category:"api",name:"Carbocisteine",description:"ตัวยาสำคัญในกลุ่มยาละลายเสมหะ",isBrongoMatch:false,funFact:"Carbocisteine มีราคาถูก แต่ละลายน้ำได้น้อย ส่งผลให้ต้องใส่แอลกอฮอล์เพื่อเพิ่มการละลาย",liquidColor:"#DDEFE7",sources:["INGREDIENTS_DOC"] },
  { id:"api-carbocisteine-lysine",category:"api",name:"Carbocisteine lysine",description:"Carbocisteine ในรูปเกลือที่ละลายน้ำได้ดี",isBrongoMatch:true,funFact:"เป็นตัวยาเดียวกับ carbocisteine แต่อยู่ในรูปเกลือ ออกฤทธิ์เร็วกว่า carbocisteine ปกติเกือบ 2 เท่า และละลายน้ำได้ดี จึงไม่จำเป็นต้องใส่แอลกอฮอล์ในสูตรตำรับ",liquidColor:"#BFE8D2",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"sweetener-sucralose",category:"sweetener",name:"Sucralose",description:"สารให้ความหวานแทนน้ำตาล",isBrongoMatch:true,liquidColor:"#D9F2FF",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"sweetener-maltitol",category:"sweetener",name:"Maltitol Solution",description:"สารให้ความหวานประเภทน้ำตาลแอลกอฮอล์",isBrongoMatch:true,liquidColor:"#E8E0FF",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"sweetener-sorbitol",category:"sweetener",name:"Sorbitol Solution",description:"สารให้ความหวานประเภทน้ำตาลแอลกอฮอล์",isBrongoMatch:true,liquidColor:"#DDF5F0",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"sweetener-ammonium-glycyrrhizate",category:"sweetener",name:"Ammonium Glycyrrhizate",description:"สารจากรากชะเอมเทศ ให้รสหวานตามธรรมชาติ",isBrongoMatch:true,liquidColor:"#F3E2C4",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"sweetener-sucrose",category:"sweetener",name:"Sucrose",description:"น้ำตาลทราย",isBrongoMatch:false,funFact:"การศึกษาปี 1979 พบว่าเด็กที่ได้รับยาน้ำซึ่งมี sucrose ต่อเนื่องมีฟันผุและเหงือกอักเสบมากกว่ากลุ่มควบคุมอย่างมีนัยสำคัญ",liquidColor:"#FFF2CE",sources:["INGREDIENTS_DOC","BMJ_1979"] },
  { id:"flavor-cherry",category:"flavor",name:"Cherry Flavor",description:"กลิ่นเชอร์รี่",isBrongoMatch:true,liquidColor:"#FFB5BC",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"flavor-banana",category:"flavor",name:"Banana Flavor",description:"กลิ่นกล้วย",isBrongoMatch:false,liquidColor:"#FFE98A",sources:["INGREDIENTS_DOC"] },
  { id:"flavor-strawberry",category:"flavor",name:"Strawberry Flavor",description:"กลิ่นสตรอว์เบอร์รี",isBrongoMatch:false,liquidColor:"#FF9EB5",sources:["INGREDIENTS_DOC"] },
  { id:"color-caramel",category:"color",name:"Caramel",description:"สีผสมอาหารจากธรรมชาติ ให้สีน้ำตาล",isBrongoMatch:true,liquidColor:"#C9854F",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"color-quinoline-yellow",category:"color",name:"Quinoline Yellow",description:"สีในกลุ่ม Azo dye ให้สีเหลือง",isBrongoMatch:false,liquidColor:"#F7DF43",sources:["INGREDIENTS_DOC"] },
  { id:"color-allura-red",category:"color",name:"Allura Red",description:"สีในกลุ่ม Azo dye ให้สีแดง",isBrongoMatch:false,funFact:"Allura Red เป็นสีสังเคราะห์ที่ถูกศึกษามากที่สุดสีหนึ่งเกี่ยวกับผลต่อ neurobehavior ในเด็ก แม้หลักฐานยังไม่สามารถสรุปความสัมพันธ์เชิงสาเหตุได้ และผลกระทบดูเหมือนเกิดเฉพาะในเด็กบางกลุ่มที่ไวต่อสารเหล่านี้",liquidColor:"#ED5A5A",sources:["INGREDIENTS_DOC"] },
  { id:"color-brilliant-blue",category:"color",name:"Brilliant Blue",description:"สีในกลุ่ม Triarylmethane dye ให้สีน้ำเงิน",isBrongoMatch:false,liquidColor:"#5E9FEA",sources:["INGREDIENTS_DOC"] },
  { id:"functional-vitamin-b6",category:"functional",name:"Pyridoxine Hydrochloride (Vitamin B6)",description:"วิตามินบี 6",isBrongoMatch:true,funFact:"วิตามินบี 6 มีส่วนช่วยในเรื่องระบบประสาทและสมอง",liquidColor:"#D3B3F5",sources:["SPC","PIL","INGREDIENTS_DOC"] },
  { id:"functional-none",category:"functional",name:"ไม่ใส่",description:"ไม่เติม functional additive",isBrongoMatch:false,liquidColor:"transparent",sources:["GAME_RULE"] },
];

export const ingredients: Ingredient[] = validateIngredients(rawIngredients);
