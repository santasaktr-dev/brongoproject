import { test, expect } from "@playwright/test";

test("landing shows the headline, regulatory line and starts the game", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("แบบไหนที่ใช่สำหรับคุณ");
  await expect(page.getByText("ฆท. xx/xxxx")).toBeVisible();
  await expect(page.getByText(/ไม่ใช้สำหรับวินิจฉัยโรค/)).toBeVisible();
  await page.getByRole("link", { name: /เริ่มผสมยา/ }).click();
  await expect(page).toHaveURL(/\/mix$/);
});
