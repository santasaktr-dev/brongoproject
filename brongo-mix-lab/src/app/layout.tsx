import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/features/game/GameProvider";
export const metadata:Metadata={title:"BRONGO Mix Lab",description:"ทดลองเลือกส่วนผสมและเรียนรู้เรื่อง BRONGO"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a><GameProvider>{children}</GameProvider></body></html>}
