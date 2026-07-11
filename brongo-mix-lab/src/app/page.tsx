import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Mascot } from "@/components/brand/Mascot";
import { ProductVisual } from "@/components/brand/ProductVisual";
import { StartButton } from "@/components/game/StartButton";
import { clampScore } from "@/features/share/shareLinks";

// เมื่อเปิดจากลิงก์ที่แชร์ (`/?s=<score>`) ให้การ์ดพรีวิว (OG/Twitter) โชว์คะแนนนั้น
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ s?: string }> }): Promise<Metadata> {
  const { s } = await searchParams;
  if (s === undefined) return {};
  const image = `/api/og?score=${clampScore(Number(s))}`;
  return {
    openGraph: { images: [image] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">BRONGO MIX LAB</p>
            <h1>ยาน้ำแก้ไอ<br /><em>แบบไหนที่ใช่สำหรับคุณ?</em></h1>
            <p className="lead">ลองเลือกส่วนผสมในแบบของคุณ แล้วมาดูกันว่าสูตรที่ผสมตรงกับส่วนผสมของ BRONGO กี่เปอร์เซ็นต์ พร้อมค้นพบเรื่องน่ารู้ระหว่างทาง</p>
            <StartButton />
            <p className="regulatory">ฆท. xx/xxxx</p>
          </div>
          <div className="hero-art">
            <div className="bubble">พร้อมเข้าห้องทดลองหรือยัง?</div>
            <Mascot state="idle" size="hero" />
            <ProductVisual variant="packshot" size="hero" priority />
          </div>
        </section>
        <section className="how">
          <p className="eyebrow">เล่นง่ายใน 3 ขั้นตอน</p>
          <div className="steps">
            {["เลือกส่วนผสมที่สนใจ", "กดผสมแล้วดูคะแนน", "เรียนรู้ว่าส่วนผสมไหนมีใน BRONGO"].map((text, i) => (
              <article key={text}><span>{i + 1}</span><h2>{text}</h2></article>
            ))}
          </div>
        </section>
      </main>
      <footer>กิจกรรมนี้จัดทำขึ้นเพื่อให้ความรู้เกี่ยวกับส่วนประกอบของผลิตภัณฑ์ ไม่ใช้สำหรับวินิจฉัยโรค เลือกยา หรือทดแทนคำแนะนำจากแพทย์และเภสัชกร</footer>
    </>
  );
}
