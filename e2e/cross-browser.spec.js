import { test, expect } from "@playwright/test";
import { BROWSER_FEATURES, checkConsoleErrors } from "./utils/testUtils.js";

const pages = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/services", name: "Services" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/client", name: "Client" },
];

test.describe("Cross-Browser Compatibility Tests", () => {
  test.describe("Page Load Tests", () => {
    for (const page of pages) {
      test(`${page.name} page loads without errors`, async ({
        page: testPage,
        browserName,
      }) => {
        const errors = [];

        testPage.on("console", (msg) => {
          if (msg.type() === "error") {
            errors.push(`Console error: ${msg.text()}`);
          }
        });

        testPage.on("pageerror", (error) => {
          errors.push(`Page error: ${error.message}`);
        });

        await testPage.goto(page.path);
        await testPage.waitForLoadState("networkidle");

        expect(errors).toHaveLength(0);

        const title = await testPage.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
      });
    }
  });

  test.describe("Browser Feature Support", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    for (const [key, feature] of Object.entries(BROWSER_FEATURES)) {
      test(`${feature.name} is supported`, async ({ page }) => {
        const supported = await feature.test(page);
        expect(supported).toBe(true);
      });
    }
  });

  test.describe("Navigation Tests", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Header navigation works across all pages", async ({ page }) => {
      const navLinks = await page.locator("nav a, header a").all();

      for (const link of navLinks.slice(0, 5)) {
        const href = await link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#")) {
          await link.click();
          await page.waitForLoadState("networkidle");

          const currentUrl = page.url();
          expect(currentUrl).toContain(href);

          await page.goto("/");
          await page.waitForLoadState("networkidle");
        }
      }
    });

    test("Browser back/forward navigation works", async ({ page }) => {
      await page.goto("/");
      await page.goto("/work");
      await page.goto("/services");

      await page.goBack();
      expect(page.url()).toContain("/work");

      await page.goBack();
      expect(page.url()).not.toContain("/work");

      await page.goForward();
      expect(page.url()).toContain("/work");
    });

    test("Deep linking works correctly", async ({ page }) => {
      await page.goto("/work");
      await page.waitForLoadState("networkidle");

      const content = await page.locator("body").textContent();
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(100);
    });
  });

  test.describe("Form Interactions", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");
    });

    test("Form inputs accept text", async ({ page }) => {
      const inputs = await page.locator("input, textarea").all();

      for (const input of inputs) {
        const type = await input.getAttribute("type");
        if (type !== "submit" && type !== "button") {
          await input.fill("Test input value");
          const value = await input.inputValue();
          expect(value).toBe("Test input value");
        }
      }
    });

    test("Form validation works", async ({ page }) => {
      const submitButtons = await page
        .locator('button[type="submit"], input[type="submit"]')
        .all();

      if (submitButtons.length > 0) {
        const requiredInputs = await page
          .locator("input[required], textarea[required]")
          .all();

        for (const input of requiredInputs) {
          await input.fill("");
        }

        await submitButtons[0].click();

        await page.waitForTimeout(500);

        for (const input of requiredInputs) {
          const isInvalid = await input.evaluate((el) => !el.checkValidity());
          expect(isInvalid).toBe(true);
        }
      }
    });
  });

  test.describe("Interactive Elements", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Buttons are clickable", async ({ page }) => {
      const buttons = await page.locator("button, a").all();
      let clickableCount = 0;

      for (const button of buttons.slice(0, 10)) {
        const isVisible = await button.isVisible().catch(() => false);
        const isEnabled = await button.isEnabled().catch(() => false);

        if (isVisible && isEnabled) {
          clickableCount++;
        }
      }

      expect(clickableCount).toBeGreaterThan(0);
    });

    test("Hover states work", async ({ page }) => {
      const interactiveElements = await page.locator("a, button").all();

      for (const element of interactiveElements.slice(0, 5)) {
        const isVisible = await element.isVisible().catch(() => false);
        if (isVisible) {
          await element.hover();
          await page.waitForTimeout(100);
        }
      }
    });

    test("Scroll behavior works smoothly", async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      await page.waitForTimeout(500);

      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThan(0);

      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });

      const scrollPositionTop = await page.evaluate(() => window.scrollY);
      expect(scrollPositionTop).toBe(0);
    });
  });

  test.describe("Media and Assets", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Images load successfully", async ({ page }) => {
      const images = await page.locator("img").all();
      let loadedCount = 0;

      for (const img of images) {
        const isVisible = await img.isVisible().catch(() => false);
        const src = await img.getAttribute("src");

        if (isVisible && src) {
          const naturalWidth = await img.evaluate((el) => el.naturalWidth);
          if (naturalWidth > 0) {
            loadedCount++;
          }
        }
      }

      if (images.length > 0) {
        expect(loadedCount).toBeGreaterThan(0);
      }
    });

    test("Videos load and play controls work", async ({ page }) => {
      const videos = await page.locator("video").all();

      for (const video of videos) {
        const isVisible = await video.isVisible().catch(() => false);
        if (isVisible) {
          const canPlay = await video.evaluate((el) => el.readyState >= 2);
          expect(canPlay).toBe(true);
        }
      }
    });
  });

  test.describe("Accessibility", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Page has proper heading structure", async ({ page }) => {
      const h1 = await page.locator("h1").count();
      expect(h1).toBeGreaterThanOrEqual(1);

      const headings = await page.locator("h1, h2, h3, h4, h5, h6").count();
      expect(headings).toBeGreaterThan(0);
    });

    test("Images have alt text", async ({ page }) => {
      const images = await page.locator("img").all();

      for (const img of images) {
        const isVisible = await img.isVisible().catch(() => false);
        if (isVisible) {
          const alt = await img.getAttribute("alt");
          expect(alt).toBeTruthy();
        }
      }
    });

    test("Links have descriptive text", async ({ page }) => {
      const links = await page.locator("a").all();

      for (const link of links) {
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute("aria-label");

        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test("Keyboard navigation works", async ({ page }) => {
      await page.keyboard.press("Tab");

      const focusedElement = await page.locator(":focus");
      const isFocused = (await focusedElement.count()) > 0;
      expect(isFocused).toBe(true);
    });
  });

  test.describe("JavaScript Errors", () => {
    for (const pageConfig of pages) {
      test(`${pageConfig.name} page has no JavaScript errors`, async ({
        page,
      }) => {
        const errors = await checkConsoleErrors(page);

        await page.goto(pageConfig.path);
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(2000);

        expect(errors).toHaveLength(0);
      });
    }
  });
});
