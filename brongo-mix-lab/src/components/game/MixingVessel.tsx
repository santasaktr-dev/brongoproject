"use client";
import { useId } from "react";

// หลอดทดลองใบใหญ่ (มีจุก) ให้เข้าชุดกับการ์ด choice — ระดับ/สีของเหลวปรับตามสูตร
export function MixingVessel({ color, level, label, className }: { color: string; level: number; label?: string; className?: string }) {
  const clipId = "mixtube" + useId().replace(/:/g, "");
  const clamped = Math.max(0, Math.min(100, level));
  const top = 34;
  const bottom = 174;
  const yTop = bottom - (clamped / 100) * (bottom - top);
  return (
    <div className={`vessel ${className ?? ""}`}>
      <svg viewBox="0 0 120 192" width="124" height="168" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId}><rect x="38" y="34" width="44" height="140" rx="22" /></clipPath>
        </defs>
        <rect x="38" y="34" width="44" height="140" rx="22" fill="#ffffff" stroke="#c9d6d8" strokeWidth="3" />
        {clamped > 0 && (
          <g clipPath={`url(#${clipId})`}>
            <rect x="34" y={yTop} width="52" height={bottom - yTop} fill={color} />
          </g>
        )}
        <rect x="38" y="34" width="44" height="140" rx="22" fill="none" stroke="#c9d6d8" strokeWidth="3" />
        <rect x="32" y="13" width="56" height="27" rx="9" fill="#d7dee0" stroke="#c2ccce" strokeWidth="3" />
      </svg>
      {label && <span className="vessel-label">{label}</span>}
    </div>
  );
}
