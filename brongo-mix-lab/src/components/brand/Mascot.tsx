import Image from "next/image";
import { cn } from "@/lib/cn";

// Component contract: asset-usage-guide.md §11 — component เลือก base asset จาก state เอง
export type MascotState = "idle" | "pointing" | "mixing" | "retry" | "curious" | "happy" | "almost-perfect" | "perfect" | "empty";
type MascotSize = "sm" | "md" | "lg" | "hero";

const ORANGE_STATES = new Set<MascotState>(["mixing", "happy", "almost-perfect", "perfect"]);

const ALT: Partial<Record<MascotState, string>> = {
  mixing: "มาสคอต BRONGO กำลังฉลองผลลัพธ์",
  happy: "มาสคอต BRONGO กำลังฉลองผลลัพธ์",
  "almost-perfect": "มาสคอต BRONGO กำลังฉลองผลลัพธ์",
  perfect: "มาสคอต BRONGO กำลังฉลองผลลัพธ์",
  curious: "มาสคอต BRONGO กำลังดูส่วนผสมด้วยความสนใจ",
};

export function Mascot({ state = "idle", size = "md", decorative = true, className }: { state?: MascotState; size?: MascotSize; decorative?: boolean; className?: string }) {
  const orange = ORANGE_STATES.has(state);
  const alt = decorative ? "" : ALT[state] ?? "มาสคอต BRONGO กำลังชวนเริ่มเกม";
  return (
    <Image
      className={cn("mascot", `mascot-${size}`, `mascot-${state}`, className)}
      src={orange ? "/brand/mascot-orange.png" : "/brand/mascot-yellow.png"}
      width={612}
      height={408}
      alt={alt}
      priority={size === "hero"}
    />
  );
}
