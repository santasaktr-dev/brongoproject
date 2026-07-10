import { test, expect } from "@playwright/test";

test("product page reveals safety info via the accordion", async ({ page }) => {
  await page.goto("/brongo");
  await expect(page.getByRole("heading", { name: "ข้อมูลยา BRONGO" })).toBeVisible();
  await page.getByText("อาการที่ต้องหยุดยาและพบแพทย์ทันที").click();
  await expect(page.getByText(/ลมพิษ/)).toBeVisible();
});

test("FAQ answers expand", async ({ page }) => {
  await page.goto("/brongo");
  await page.getByText("BRONGO มีน้ำตาลทรายหรือไม่?").click();
  await expect(page.getByText(/ไม่มี sucrose/)).toBeVisible();
});

test("mix again resets and returns to the mix lab", async ({ page }) => {
  await page.goto("/brongo");
  await page.getByRole("link", { name: "ผสมสูตรใหม่" }).click();
  await expect(page).toHaveURL(/\/mix$/);
});
