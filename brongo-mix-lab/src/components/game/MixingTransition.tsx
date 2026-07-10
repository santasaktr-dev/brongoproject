import { Mascot } from "@/components/brand/Mascot";
import { MixingVessel } from "./MixingVessel";

export function MixingTransition({ color }: { color: string }) {
  return (
    <div className="mixing-overlay" role="status">
      <div>
        <Mascot state="mixing" size="lg" />
        <h2>กำลังผสมสูตรของคุณ…</h2>
        <p>มาดูกันว่าส่วนผสมที่เลือกตรงกับ BRONGO เท่าไร</p>
        <span className="sr-only">กำลังคำนวณผลลัพธ์</span>
        <MixingVessel color={color} level={75} />
      </div>
    </div>
  );
}
