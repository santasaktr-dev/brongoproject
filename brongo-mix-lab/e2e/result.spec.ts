import { test, expect, type Page } from "@playwright/test";

async function mixAndSubmit(page: Page, names: string[]) {
  await page.goto("/mix");
  for (const name of names) await page.getByRole("button", { name: new RegExp(name) }).click();
  await page.getByRole("button", { name: /ดูผลลัพธ์/ }).first().click();
  await page.waitForURL(/\/result$/);
}

test("scores 100% when every selection matches BRONGO", async ({ page }) => {
  await mixAndSubmit(page, ["Sucralose"]);
  await expect(page.locator(".score")).toHaveText("100%");
});

test("scores 0% when nothing matches", async ({ page }) => {
  await mixAndSubmit(page, ["Banana Flavor"]);
  await expect(page.locator(".score")).toHaveText("0%");
});

test("scores 60% for three matches out of five selections", async ({ page }) => {
  await mixAndSubmit(page, ["Sucralose", "Cherry Flavor", "Caramel", "Banana Flavor", "Strawberry Flavor"]);
  await expect(page.locator(".score")).toHaveText("60%");
});

test("redirects to /mix when opened with no selection", async ({ page }) => {
  await page.goto("/result");
  await expect(page.getByRole("heading", { name: "ยังไม่มีสูตรให้แสดงผล" })).toBeVisible();
});
