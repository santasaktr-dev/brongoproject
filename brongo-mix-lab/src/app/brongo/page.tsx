"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ProductSummary } from "@/components/product/ProductSummary";
import { ProductAccordion } from "@/components/product/ProductAccordion";
import { AskPharmacistButton } from "@/components/product/AskPharmacistButton";
import { Accordion } from "@/components/ui/Accordion";
import { manufacturer, productNotice } from "@/content/product";
import { faqs } from "@/content/faq";
import { useGame } from "@/features/game/GameProvider";
import { track } from "@/lib/analytics";

export default function Brongo() {
  const { reset } = useGame();

  useEffect(() => {
    const from = typeof document !== "undefined" && document.referrer ? new URL(document.referrer).pathname : "direct";
    track("product_detail_opened", { sourceRoute: from });
  }, []);

  const openSection = (sectionId: string) => track("product_section_opened", { sectionId });

  return (
    <>
      <Header />
      <main id="main" className="page-shell">
        <header className="page-head">
          <p className="eyebrow">PRODUCT INFORMATION</p>
          <h1>ข้อมูลยา BRONGO</h1>
        </header>
        <ProductSummary />
        <p className="notice">{productNotice}</p>
        <AskPharmacistButton sourceRoute="/brongo" />
        <ProductAccordion onOpen={openSection} />
        <h2>คำถามที่พบบ่อย</h2>
        <Accordion onOpen={openSection} items={faqs.map((f) => ({ id: f.id, title: f.question, body: <p>{f.answer}</p> }))} />
        <p>
          <b>ผู้ผลิต:</b> {manufacturer.maker}<br />
          <b>ผู้จัดจำหน่าย:</b> {manufacturer.distributor}<br />
          <b>เอกสารข้อมูลยาปรับปรุงล่าสุด:</b> {manufacturer.updated}
        </p>
        <div className="result-actions">
          <Link className="button primary" href="/mix" onClick={reset}>ผสมสูตรใหม่</Link>
          <Link className="button secondary" href="/result">กลับไปดูผลลัพธ์</Link>
        </div>
      </main>
    </>
  );
}
