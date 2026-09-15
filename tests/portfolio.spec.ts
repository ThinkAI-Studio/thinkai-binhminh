import { expect, test } from "@playwright/test";

const htmlRoutes = ["/", "/preview-sora"];

for (const route of htmlRoutes) {
  test(`${route} renders without horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("CV route redirects to the published PDF", async ({ page }) => {
  const response = await page.goto("/cv");
  expect(page.url()).toContain("/NguyenBinhMinh-DevOpsEngineer-2026.pdf");
  expect(response?.headers()["content-type"]).toContain("application/pdf");
});

test("deep links navigate to valid sections", async ({ page }) => {
  for (const id of ["work", "products", "stack", "contact"]) {
    await page.goto(`/#${id}`);
    const section = page.locator(`#${id}`);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeInViewport();
  }
});

test("home publishes an absolute social thumbnail", async ({ page, request }) => {
  await page.goto("/");
  const image = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(image).toMatch(/^https:\/\//);
  expect(image).toMatch(/\/(og-image|opengraph-image)/);

  const response = await request.get("/opengraph-image.png");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("image/png");
});

test("language switcher toggles between English and Vietnamese mode", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();

  // Initial state is English
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  // Switch to Vietnamese mode
  const toggleBtn = page.locator('[data-testid="language-toggle-button"]');
  await expect(toggleBtn).toBeVisible();
  await toggleBtn.click();

  // Expect html lang to be updated to vi
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");

  // Verify Vietnamese text presence in DOM
  await expect(page.locator("text=Bắt đầu dự án").first()).toBeVisible();

  // Verify persistence in localStorage
  const savedLang = await page.evaluate(() => localStorage.getItem("portfolio-language"));
  expect(savedLang).toBe("vi");

  // Toggle back to English
  await toggleBtn.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const enSaved = await page.evaluate(() => localStorage.getItem("portfolio-language"));
  expect(enSaved).toBe("en");
});

test("defaults to Vietnamese when browser system language is vi-VN", async ({ browser }) => {
  const context = await browser.newContext({ locale: "vi-VN" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();

  // Should automatically be vi based on system/navigator language
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  await expect(page.locator("text=Bắt đầu dự án").first()).toBeVisible();

  await context.close();
});


