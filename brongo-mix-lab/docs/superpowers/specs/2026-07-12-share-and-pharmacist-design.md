# Design: Share Result + Ask Pharmacist

Date: 2026-07-12
Status: Approved (design), implementing per user "ทำเลย"

## Goal
Two engagement features on the BRONGO Mix Lab MVP, without touching the game engine:
1. **Share result** — share your score (%) to LINE or copy a link, with a dynamic OG card that shows the %.
2. **Ask pharmacist** — a button linking to a BRONGO LINE Official Account, on the result and product pages.

## Scope decisions (from brainstorming)
- Share channels: **LINE + Copy link** only (no native share, no Facebook).
- Shared link opens the **fresh start page** (home `/`), i.e. the link only carries the score for the OG card; it does not reproduce the exact mix.
- OG card **shows the % (dynamic)**.
- Ask-pharmacist button placement: **result page + `/brongo`**. LINE OA URL is a config placeholder until the real one is provided.

## Feature 1: Share result

### URL + OG card
- Share URL: `${SITE_URL}/?s=<score>` (score = integer 0–100).
- Home `generateMetadata({ searchParams })` reads `s`; when present sets `openGraph`/`twitter` image to `/api/og?score=<s>`. When absent, default metadata.
- `app/api/og/route.tsx` — Route Handler (node runtime) using `ImageResponse` from `next/og` (1200×630). **Latin/numeric only** (Satori default font lacks Thai glyphs): big `NN%`, `MATCH WITH BRONGO`, `BRONGO MIX LAB`, brand colours (orange `#f56f43`, cream `#fff8ef`, ink `#263943`). Score clamped to 0–100; invalid → default 0. Flexbox only (no grid).
- `metadataBase` set in root layout so relative OG image URL resolves absolute.

### UI
- `components/game/ShareButtons.tsx` (client), rendered on `/result` under the existing `.result-actions`:
  - **แชร์ไป LINE** — anchor to `https://line.me/R/share?text=<encoded shareText>`, `target=_blank rel=noopener`. On click: `track("result_shared", {channel:"line", scoreBand})`.
  - **คัดลอกลิงก์** — `navigator.clipboard.writeText(shareText)`, show "คัดลอกแล้ว" feedback (aria-live). On success: `track("result_shared", {channel:"copy", scoreBand})`.
- `features/share/shareLinks.ts` — pure functions (unit-tested):
  - `buildShareUrl(score)` → `${SITE_URL}/?s=${clamp(score)}`
  - `buildShareText(score)` → `ฉันผสมยาแก้ไอตรงกับสูตร BRONGO ${clamp(score)}%! มาลองผสมของคุณบ้าง 👉 ${url}`
  - `buildLineShareHref(score)` → LINE share URL
  - `clampScore(n)` → integer 0–100

### Copy compliance
Share text is marketing copy, not a medical claim. Flag for regulatory/brand sign-off before real launch.

## Feature 2: Ask pharmacist
- `components/product/AskPharmacistButton.tsx` — anchor to LINE OA (`target=_blank rel=noopener`), reused on `/result` and `/brongo`. Optional `sourceRoute` prop for analytics. On click: `track("pharmacist_contact_clicked", {sourceRoute})`.
- `config/links.ts` — `LINE_OA_URL = process.env.NEXT_PUBLIC_LINE_OA_URL ?? "<placeholder>"` and `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brongoproject.vercel.app"`.
- Label: "ถามเภสัชกร (LINE)" + short helper reinforcing the existing disclaimer.

## Analytics
Add to `lib/analytics.ts` type + allowlist:
- `result_shared: { channel: "line" | "copy"; scoreBand: string }`
- `pharmacist_contact_clicked: { sourceRoute: string }`

## Files
New: `components/game/ShareButtons.tsx`, `components/product/AskPharmacistButton.tsx`, `features/share/shareLinks.ts`, `app/api/og/route.tsx`, `config/links.ts`
Edit: `app/result/page.tsx`, `app/brongo/page.tsx`, `app/page.tsx` (+generateMetadata), `app/layout.tsx` (metadataBase), `lib/analytics.ts`, `globals.css`, `.env.example`

## Testing
- unit: `shareLinks` (url/text/clamp), config resolution.
- component (RTL): ShareButtons (LINE href, copy → clipboard + feedback + analytics), AskPharmacistButton (href/target/analytics).
- e2e: result page shows share + pharmacist controls with correct hrefs; copy shows feedback; `/api/og?score=80` returns 200 image; home with `?s=80` includes og:image meta.

## Next 16 notes (AGENTS.md)
- `generateMetadata` `searchParams` is a `Promise` — await it.
- `ImageResponse` from `next/og`, node runtime route handler, flexbox-only, ≤500KB bundle.
