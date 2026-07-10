import { test, expect } from "@playwright/test";

test("landing has a skip link and exactly one h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "ข้ามไปเนื้อหาหลัก" })).toBeAttached();
  await expect(page.locator("h1")).toHaveCount(1);
});

test("an ingredient can be selected with the keyboard", async ({ page }) => {
  await page.goto("/mix");
  const card = page.getByRole("button", { name: /Sucralose/ });
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(card).toHaveAttribute("aria-pressed", "true");
});

test("clear dialog closes on Escape", async ({ page }) => {
  await page.goto("/mix");
  await page.getByRole("button", { name: /Sucralose/ }).click();
  await page.getByRole("button", { name: "ล้างสูตร" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
