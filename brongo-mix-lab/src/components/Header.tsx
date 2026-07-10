import Link from "next/link";
import { BrongoLogo } from "@/components/brand/BrongoLogo";

export function Header() {
  return (
    <header className="site-header">
      <BrongoLogo />
      <nav aria-label="เมนูหลัก">
        <Link href="/mix">ห้องผสมยา</Link>
        <Link href="/brongo">ข้อมูล BRONGO</Link>
      </nav>
    </header>
  );
}
