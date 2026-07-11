import { ImageResponse } from "next/og";

// การ์ด Open Graph แบบไดนามิกโชว์คะแนน % (Latin/ตัวเลขเท่านั้น — Satori font default ไม่รองรับไทย)
// เรียกผ่าน /api/og?score=80

const clamp = (n: number) => (Number.isFinite(n) ? Math.min(100, Math.max(0, Math.round(n))) : 0);

const ORANGE = "#f56f43";
const INK = "#263943";
const CREAM = "#fff8ef";

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("score");
  const score = clamp(Number(raw));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: CREAM,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: 8, color: INK }}>
          BRONGO&nbsp;<span style={{ color: ORANGE }}>MIX LAB</span>
        </div>
        <div style={{ display: "flex", fontSize: 300, fontWeight: 800, color: ORANGE, lineHeight: 1 }}>
          {score}%
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: INK }}>MATCH WITH BRONGO</div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 30,
            color: "#fff",
            backgroundColor: ORANGE,
            padding: "14px 34px",
            borderRadius: 999,
          }}
        >
          Mix your own cough syrup recipe
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
