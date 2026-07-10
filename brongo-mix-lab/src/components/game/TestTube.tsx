// หลอดทดลองมีจุก เติมของเหลวตามสี ingredient (transparent = หลอดเปล่า)
export function TestTube({ color, id }: { color: string; id: string }) {
  const clipId = `tube-${id}`;
  const filled = Boolean(color) && color !== "transparent";
  return (
    <svg viewBox="0 0 60 94" width="54" height="82" role="img" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <rect x="19" y="16" width="22" height="66" rx="11" />
        </clipPath>
      </defs>
      <rect x="19" y="16" width="22" height="66" rx="11" fill="#ffffff" stroke="#c9d6d8" strokeWidth="2.5" />
      {filled && (
        <g clipPath={`url(#${clipId})`}>
          <rect x="16" y="44" width="28" height="42" fill={color} />
        </g>
      )}
      <rect x="19" y="16" width="22" height="66" rx="11" fill="none" stroke="#c9d6d8" strokeWidth="2.5" />
      <rect x="15" y="6" width="30" height="14" rx="5" fill="#d7dee0" stroke="#c2ccce" strokeWidth="2" />
    </svg>
  );
}
