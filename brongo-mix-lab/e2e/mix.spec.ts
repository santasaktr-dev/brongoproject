import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/mix"); });

test("result CTA is disabled until an ingredient is selected", async ({ page }) => {
  const cta = page.getByRole("button", { name: /ดูผลลัพธ์/ }).first();
  await expect(cta).toBeDisabled();
  await page.getByRole("button", { name: /Sucralose/ }).click();
  await expect(cta).toBeEnabled();
});

test("functional additive is mutually exclusive and can be cleared", async ({ page }) => {
  const b6 = page.getByRole("radio", { name: /Vitamin B6/ });
  const none = page.getByRole("radio", { name: /ไม่ใส่/ });
  await b6.click();
  await expect(b6).toHaveAttribute("aria-checked", "true");
  await none.click();
  await expect(none).toHaveAttribute("aria-checked", "true");
  await expect(b6).toHaveAttribute("aria-checked", "false");
  await none.click();
  await expect(none).toHaveAttribute("aria-checked", "false");
});

test("clear dialog resets the whole mix", async ({ page }) => {
  await page.getByRole("button", { name: /Sucralose/ }).click();
  await page.getByRole("button", { name: "ล้างสูตร" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "ล้างสูตร" }).last().click();
  await expect(page.getByText("ยังไม่ได้เลือกส่วนผสม")).toBeVisible();
});
