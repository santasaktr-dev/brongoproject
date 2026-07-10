import type { Ingredient } from "@/content/ingredients";

// ระดับของเหลวอ้างอิงจาก mixing-behavior.md (ไม่อ้างปริมาตรจริง)
const LEVELS = [12, 24, 36, 48, 60, 70, 78];

export function liquidLevel(count: number): number {
  if (count <= 0) return LEVELS[0];
  if (count <= 6) return LEVELS[count];
  return Math.min(92, 78 + 2 * (count - 6));
}

type ColorItem = Pick<Ingredient, "category" | "liquidColor">;
const weightOf = (category: Ingredient["category"]) => (category === "color" ? 3 : category === "flavor" ? 2 : 1);

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  let h = 0, s = 0;
  if (d) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h, s, l };
}
function hslToRgb(h: number, s: number, l: number) {
  if (!s) return { r: l * 255, g: l * 255, b: l * 255 };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return { r: hue(h + 1 / 3) * 255, g: hue(h) * 255, b: hue(h - 1 / 3) * 255 };
}

// mixing-behavior.md §Liquid Color: weighted RGB average แล้วลด saturation 10%
export function mixLiquidColor(items: ColorItem[]): string {
  const colored = items.filter((i) => i.liquidColor && i.liquidColor !== "transparent");
  if (!colored.length) return "#EAF7FA";
  if (colored.length === 1) return colored[0].liquidColor;
  let totalWeight = 0, r = 0, g = 0, b = 0;
  for (const item of colored) {
    const w = weightOf(item.category);
    const c = hexToRgb(item.liquidColor);
    r += c.r * w; g += c.g * w; b += c.b * w; totalWeight += w;
  }
  const hsl = rgbToHsl(r / totalWeight, g / totalWeight, b / totalWeight);
  const out = hslToRgb(hsl.h, hsl.s * 0.9, hsl.l);
  return rgbToHex(out.r, out.g, out.b);
}
