import Link from "next/link";

// Wordmark placeholder — เปลี่ยนเป็น official SVG ได้โดยไม่กระทบ layout
export function BrongoLogo({ href = "/" }: { href?: string }) {
  return (
    <Link className="wordmark" href={href} aria-label="BRONGO Mix Lab หน้าแรก">
      <span>BRONGO</span> MIX LAB
    </Link>
  );
}
