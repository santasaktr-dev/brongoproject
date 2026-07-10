export function MixingVessel({ color, level, label, className }: { color: string; level: number; label?: string; className?: string }) {
  return (
    <div className={`vessel ${className ?? ""}`} style={{ "--liquid": color, "--level": `${level}%` } as React.CSSProperties}>
      {label}
    </div>
  );
}
