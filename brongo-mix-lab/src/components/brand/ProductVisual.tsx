import Image from "next/image";
import { cn } from "@/lib/cn";

// Component contract: asset-usage-guide.md §11
type Variant = "bottle" | "box" | "set" | "packshot";
type Size = "sm" | "md" | "lg" | "hero";

export function ProductVisual({ variant = "set", size = "md", priority = false, decorative = false, className }: { variant?: Variant; size?: Size; priority?: boolean; decorative?: boolean; className?: string }) {
  const bottle = <Image key="bottle" src="/brand/brongo-bottle.png" width={408} height={611} alt={decorative ? "" : "ขวดยาน้ำ BRONGO ขนาด 40 มิลลิลิตร"} priority={priority} />;
  // เมื่อแสดงคู่กัน ให้กล่อง (ภาพรอง) ใช้ alt ว่างเพื่อลดการอ่านซ้ำ (asset-usage-guide §6)
  const box = <Image key="box" src="/brand/brongo-box.png" width={433} height={577} alt={decorative || variant === "set" ? "" : "กล่องยาน้ำ BRONGO สำหรับเด็ก"} priority={priority} />;
  // ภาพรวมกล่อง+ขวดในภาพเดียว (พื้นหลังโปร่งใส)
  const packshot = <Image key="packshot" className="product-packshot" src="/brand/brongo-packshot.png" width={1100} height={950} alt={decorative ? "" : "กล่องและขวดยาน้ำ BRONGO สำหรับเด็ก ขนาด 40 มิลลิลิตร"} priority={priority} />;
  const content = variant === "bottle" ? [bottle] : variant === "box" ? [box] : variant === "packshot" ? [packshot] : [bottle, box];
  return <div className={cn("products", `products-${size}`, className)}>{content}</div>;
}
