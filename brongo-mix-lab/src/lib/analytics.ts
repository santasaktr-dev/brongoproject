// Privacy-safe analytics adapter (plan.md §7)
// - ปิดได้ผ่าน NEXT_PUBLIC_ANALYTICS_ENABLED
// - ส่งเฉพาะ property ใน allowlist; ห้าม ingredient name / free text / PII
// - event ที่ไม่อยู่ใน allowlist ถูก reject

export type AnalyticsEvents = {
  landing_viewed: { viewport: "mobile" | "tablet" | "desktop" };
  game_started: { entrySource?: string };
  ingredient_toggled: { ingredientId: string; category: string; selected: boolean };
  mix_submitted: { selectedCount: number; matchedCount: number };
  result_viewed: { scoreBand: string; selectedCount: number };
  ingredient_fact_opened: { ingredientId: string };
  product_detail_opened: { sourceRoute: string };
  product_section_opened: { sectionId: string };
  mix_edited: { previousScoreBand: string };
  mix_restarted: { sourceRoute: string };
  result_shared: { channel: "line" | "copy"; scoreBand: string };
  pharmacist_contact_clicked: { sourceRoute: string };
};

type EventName = keyof AnalyticsEvents;

const ALLOWLIST: Record<EventName, readonly string[]> = {
  landing_viewed: ["viewport"],
  game_started: ["entrySource"],
  ingredient_toggled: ["ingredientId", "category", "selected"],
  mix_submitted: ["selectedCount", "matchedCount"],
  result_viewed: ["scoreBand", "selectedCount"],
  ingredient_fact_opened: ["ingredientId"],
  product_detail_opened: ["sourceRoute"],
  product_section_opened: ["sectionId"],
  mix_edited: ["previousScoreBand"],
  mix_restarted: ["sourceRoute"],
  result_shared: ["channel", "scoreBand"],
  pharmacist_contact_clicked: ["sourceRoute"],
};

export const isAnalyticsEnabled = () => process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

// รับเฉพาะ key ใน allowlist; throw เมื่อ event ไม่รู้จัก (ช่วยจับ bug ตอน development)
export function sanitize(event: string, props: Record<string, unknown> = {}): Record<string, unknown> {
  const allowed = ALLOWLIST[event as EventName];
  if (!allowed) throw new Error(`Unknown analytics event: ${event}`);
  const clean: Record<string, unknown> = {};
  for (const key of allowed) if (props[key] !== undefined) clean[key] = props[key];
  return clean;
}

type Sink = (event: string, props: Record<string, unknown>) => void;

// provider จริงเชื่อมผ่าน setAnalyticsSink โดย component ไม่รู้ implementation
let sink: Sink = (event, props) => {
  if (typeof window !== "undefined") {
    const w = window as unknown as { brongoAnalytics?: unknown[] };
    if (Array.isArray(w.brongoAnalytics)) w.brongoAnalytics.push({ event, props });
  }
};

export function setAnalyticsSink(next: Sink) {
  sink = next;
}

export function track<E extends EventName>(event: E, props: AnalyticsEvents[E]): void {
  const clean = sanitize(event, props as Record<string, unknown>);
  if (!isAnalyticsEnabled()) return;
  try {
    sink(event, clean);
  } catch {
    // analytics error ต้องไม่ block game flow (mixing-behavior.md §Error)
  }
}
