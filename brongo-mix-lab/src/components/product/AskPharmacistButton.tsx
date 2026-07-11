"use client";
import { LINE_OA_URL } from "@/config/links";
import { track } from "@/lib/analytics";

// ปุ่มปรึกษาเภสัชกรผ่าน LINE OA — ใช้ซ้ำได้ทั้งหน้า result และ /brongo
export function AskPharmacistButton({ sourceRoute }: { sourceRoute: string }) {
  return (
    <div className="ask-pharmacist">
      <a
        className="button secondary"
        href={LINE_OA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("pharmacist_contact_clicked", { sourceRoute })}
      >
        ถามเภสัชกร (LINE)
      </a>
      <p className="helper">มีคำถามเรื่องยา? ปรึกษาเภสัชกรได้ ข้อมูลในเว็บไม่ใช้แทนคำแนะนำจากแพทย์และเภสัชกร</p>
    </div>
  );
}
