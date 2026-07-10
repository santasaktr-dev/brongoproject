// FAQ content — source: docs/website-copy.md §FAQ (approved)
export type FaqItem = { id: string; question: string; answer: string };

export const faqs: FaqItem[] = [
  { id: "faq-100", question: "คะแนน 100% หมายความว่าเลือกสูตรครบเหมือน BRONGO หรือไม่?", answer: "ไม่จำเป็น คะแนน 100% หมายถึงส่วนผสมทุกอย่างที่คุณเลือกมีอยู่ใน BRONGO แม้คุณจะเลือกเพียงรายการเดียว คะแนนนี้ไม่ได้วัดความครบถ้วนของสูตร" },
  { id: "faq-choose", question: "คะแนนนี้ใช้เลือกยาน้ำแก้ไอได้หรือไม่?", answer: "ไม่ได้ เกมนี้เปรียบเทียบส่วนผสมที่เลือกกับ BRONGO เพื่อให้ความรู้เท่านั้น การเลือกใช้ยาควรปรึกษาแพทย์หรือเภสัชกร" },
  { id: "faq-sugar", question: "BRONGO มีน้ำตาลทรายหรือไม่?", answer: "จากรายการส่วนประกอบในเอกสารกำกับยา BRONGO ไม่มี sucrose และมีสารให้ความหวานชนิดอื่น ได้แก่ sucralose, maltitol solution, sorbitol solution และ ammonium glycyrrhizate" },
  { id: "faq-flavor", question: "BRONGO มีกลิ่นอะไร?", answer: "BRONGO เป็นยาน้ำใส สีน้ำตาลออกเหลือง และมีกลิ่นเชอร์รี่" },
  { id: "faq-noimprove", question: "ถ้าใช้ยาแล้วอาการไม่ดีขึ้นควรทำอย่างไร?", answer: "หากใช้ยาประมาณ 1 สัปดาห์แล้วอาการไม่ดีขึ้นหรือแย่ลง ควรแจ้งแพทย์หรือเภสัชกร" },
];
