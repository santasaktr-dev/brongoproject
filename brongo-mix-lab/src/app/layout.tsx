import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/features/game/GameProvider";

const kanit = Kanit({ subsets: ["latin", "thai"], weight: ["400", "500", "600", "700", "800"], variable: "--font-kanit", display: "swap" });

export const metadata: Metadata = { title: "BRONGO Mix Lab", description: "ทดลองเลือกส่วนผสมและเรียนรู้เรื่อง BRONGO" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" data-scroll-behavior="smooth" className={kanit.variable}>
      <body>
        <a className="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
