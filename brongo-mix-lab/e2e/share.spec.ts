import { test, expect, type Page } from "@playwright/test";

async function mixAndSubmit(page: Page, names: string[]) {
  await page.goto("/mix");
  for (const name of names) await page.locator("button.ingredient-card", { hasText: new RegExp(name) }).click();
  await page.getByRole("button", { name: /ดูผลลัพธ์/ }).first().click();
  await page.waitForURL(/\/result$/);
}

test("result page offers LINE share + copy link with the shown score encoded", async ({ page }) => {
  await mixAndSubmit(page, ["Sucralose"]);
  const pct = ((await page.locator(".score").textContent()) ?? "").replace("%", "").trim();
  const line = page.getByRole("link", { name: "แชร์ไป LINE" });
  await expect(line).toBeVisible();
  const href = await line.getAttribute("href");
  expect(href).toContain("line.me/R/share");
  expect(decodeURIComponent(href!)).toContain(`BRONGO ${pct}%`);
  await expect(page.getByRole("button", { name: "คัดลอกลิงก์" })).toBeVisible();
});

test("result and product pages link to the pharmacist LINE OA", async ({ page }) => {
  await mixAndSubmit(page, ["Sucralose"]);
  await expect(page.getByRole("link", { name: /ถามเภสัชกร/ })).toBeVisible();
  await page.goto("/brongo");
  const link = page.getByRole("link", { name: /ถามเภสัชกร/ });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("target", "_blank");
});

test("the OG image endpoint returns a PNG for a score", async ({ request }) => {
  const res = await request.get("/api/og?score=80");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("home with ?s exposes a score-specific OG image", async ({ page }) => {
  await page.goto("/?s=80");
  const content = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(content).toContain("/api/og?score=80");
});
