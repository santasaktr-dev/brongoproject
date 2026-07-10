"use client";
import Link from "next/link";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function StartButton() {
  useEffect(() => {
    const w = window.innerWidth;
    const viewport = w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
    track("landing_viewed", { viewport });
  }, []);
  return (
    <Link className="button primary" href="/mix" onClick={() => track("game_started", {})}>
      เริ่มผสมยา <span>→</span>
    </Link>
  );
}
