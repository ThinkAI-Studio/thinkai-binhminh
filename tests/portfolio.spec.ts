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

test("language switcher toggles between English and Vietnamese mode", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();

  // Initial state is English
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  if (isMobile) {
    // On mobile, language switcher is hidden from the outer header and inside the navigation menu drawer
    await expect(page.locator('[data-testid="language-toggle-button"]')).not.toBeVisible();
    const menuBtn = page.getByRole("button", { name: "Toggle navigation menu" });
    await menuBtn.click();
    const viBtn = page.locator('[data-lang-mobile="vi"]');
    await expect(viBtn).toBeVisible();
    await viBtn.click();
  } else {
    // Switch to Vietnamese mode on desktop
    const toggleBtn = page.locator('[data-testid="language-toggle-button"]');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
  }

  // Expect html lang to be updated to vi
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");

  // Verify Vietnamese text presence in DOM
  await expect(page.locator("text=Bắt đầu dự án").first()).toBeVisible();

  // Verify persistence in localStorage
  const savedLang = await page.evaluate(() => localStorage.getItem("portfolio-language"));
  expect(savedLang).toBe("vi");

  if (isMobile) {
    // Toggle back to English on mobile
    const enBtn = page.locator('[data-lang-mobile="en"]');
    await expect(enBtn).toBeVisible();
    await enBtn.click();
  } else {
    // Toggle back to English on desktop
    const toggleBtn = page.locator('[data-testid="language-toggle-button"]');
    await toggleBtn.click();
  }
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const enSaved = await page.evaluate(() => localStorage.getItem("portfolio-language"));
  expect(enSaved).toBe("en");
});

test("mobile menu can be opened and closed repeatedly without losing buttons", async ({ page, isMobile }) => {
  if (!isMobile) return;
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();

  const menuToggle = page.getByRole("button", { name: "Toggle navigation menu" });
  const drawer = page.locator('[data-testid="mobile-nav-drawer"]');

  // Rapidly toggle menu open and close multiple times
  for (let i = 0; i < 4; i++) {
    await menuToggle.click();
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("button", { name: /about|giới thiệu/i })).toBeVisible();
    await expect(drawer.locator('[data-lang-mobile="en"]')).toBeVisible();
    await expect(drawer.locator('[data-lang-mobile="vi"]')).toBeVisible();
    await expect(drawer.locator('[data-lang-mobile="en"]')).toHaveText("EN");
    await expect(drawer.locator('[data-lang-mobile="vi"]')).toHaveText("VI");

    await menuToggle.click();
    await expect(drawer).not.toBeVisible();
  }

  // Final open and verify all action buttons are present and intact
  await menuToggle.click();
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("button", { name: /about|giới thiệu/i })).toBeVisible();
  await expect(drawer.getByRole("button", { name: /products|sản phẩm/i })).toBeVisible();
  await expect(drawer.getByRole("button", { name: /experience|kinh nghiệm/i })).toBeVisible();
  await expect(drawer.getByRole("button", { name: /contact|liên hệ/i })).toBeVisible();
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

test("architecture and case study modal is responsive and cleanly closable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();

  // Find the first architecture button in the Products section
  const archButton = page.getByRole("button", { name: /architecture|kiến trúc/i }).first();
  await expect(archButton).toBeVisible();
  await archButton.click();

  // Verify modal is displayed and close button is fully visible and not clipped
  const closeButton = page.locator('[data-testid="arch-close-button"]');
  await expect(closeButton).toBeVisible();

  // Verify tabs inside modal
  const caseStudyTab = page.getByRole("button", { name: /case study|báo cáo/i }).first();
  await expect(caseStudyTab).toBeVisible();

  // Click close button and confirm modal closes
  await closeButton.click();
  await expect(closeButton).not.toBeVisible();
});


