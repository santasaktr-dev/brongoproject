import Link from "next/link";
export function Header(){return <header className="site-header"><Link className="wordmark" href="/"><span>BRONGO</span> MIX LAB</Link><nav aria-label="เมนูหลัก"><Link href="/mix">ห้องผสมยา</Link><Link href="/brongo">ข้อมูล BRONGO</Link></nav></header>}
