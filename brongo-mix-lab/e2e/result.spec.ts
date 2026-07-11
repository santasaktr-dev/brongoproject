import { test, expect, type Page } from "@playwright/test";

async function mixAndSubmit(page: Page, names: string[]) {
  await page.goto("/mix");
  // เลือกการ์ดแบบไม่ยึด role — การ์ด functional (B6/ไม่ใส่) เป็น role="radio" ไม่ใช่ button
  for (const name of names) await page.locator("button.ingredient-card", { hasText: new RegExp(name) }).click();
  await page.getByRole("button", { name: /ดูผลลัพธ์/ }).first().click();
  await page.waitForURL(/\/result$/);
}

// สูตรจริงของ BRONGO = ส่วนผสม isBrongoMatch:true ทั้ง 8 ตัว
const FULL_RECIPE = [
  "Carbocisteine lysine",
  "Sucralose",
  "Maltitol Solution",
  "Sorbitol Solution",
  "Ammonium Glycyrrhizate",
  "Cherry Flavor",
  "Caramel",
  "Vitamin B6",
];

test("scores 100% only when the exact recipe is selected", async ({ page }) => {
  await mixAndSubmit(page, FULL_RECIPE);
  await expect(page.locator(".score")).toHaveText("100%");
});

test("scores 13% for a single correct ingredient (1 of 8)", async ({ page }) => {
  await mixAndSubmit(page, ["Sucralose"]);
  await expect(page.locator(".score")).toHaveText("13%");
});

test("scores 38% for three correct ingredients out of the eight-item recipe", async ({ page }) => {
  await mixAndSubmit(page, ["Sucralose", "Cherry Flavor", "Caramel"]);
  await expect(page.locator(".score")).toHaveText("38%");
});

test("scores 0% when nothing matches", async ({ page }) => {
  await mixAndSubmit(page, ["Banana Flavor"]);
  await expect(page.locator(".score")).toHaveText("0%");
});

test("shows how many recipe ingredients are still missing", async ({ page }) => {
  await mixAndSubmit(page, ["Sucralose"]);
  await expect(page.locator(".nudge")).toContainText("ยังขาด");
  await expect(page.locator(".nudge")).toContainText("7");
});

test("redirects to /mix when opened with no selection", async ({ page }) => {
  await page.goto("/result");
  await expect(page.getByRole("heading", { name: "ยังไม่มีสูตรให้แสดงผล" })).toBeVisible();
});
