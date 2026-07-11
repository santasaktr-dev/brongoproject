"use client";
import { useState } from "react";
import { LineIcon } from "@/components/ui/LineIcon";
import { buildLineShareHref, buildShareText } from "@/features/share/shareLinks";
import { track } from "@/lib/analytics";

export function ShareButtons({ score, scoreBand }: { score: number; scoreBand: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText(score));
      setCopied(true);
      track("result_shared", { channel: "copy", scoreBand });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // คลิปบอร์ดไม่พร้อม (permission/insecure context) — ไม่ต้อง block flow
    }
  };

  return (
    <div className="share">
      <p className="share-label">ชวนเพื่อนมาลองผสมบ้าง</p>
      <div className="share-buttons">
        <a
          className="button line"
          href={buildLineShareHref(score)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("result_shared", { channel: "line", scoreBand })}
        >
          <LineIcon />
          แชร์ไป LINE
        </a>
        <button type="button" className="button secondary" onClick={onCopy}>
          {copied ? "คัดลอกแล้ว ✓" : "คัดลอกลิงก์"}
        </button>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "คัดลอกลิงก์แล้ว" : ""}
      </span>
    </div>
  );
}
