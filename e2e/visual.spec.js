import { test, expect } from "@playwright/test";
import { testResponsiveBreakpoint } from "./utils/testUtils.js";

const pages = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/services", name: "Services" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
  { path: "/client", name: "Client" },
];

const breakpoints = [
  { name: "Mobile Small", width: 375, height: 667 },
  { name: "Mobile Large", width: 414, height: 896 },
  { name: "Tablet Portrait", width: 768, height: 1024 },
  { name: "Tablet Landscape", width: 1024, height: 768 },
  { name: "Small Desktop", width: 1280, height: 720 },
  { name: "Desktop", width: 1366, height: 768 },
  { name: "Large Desktop", width: 1920, height: 1080 },
  { name: "4K", width: 2560, height: 1440 },
];

test.describe("Visual Regression Tests", () => {
  test.describe("Full Page Screenshots", () => {
    for (const pageConfig of pages) {
      test(`${pageConfig.name} matches snapshot`, async ({
        page,
      }, testInfo) => {
        await page.goto(pageConfig.path);
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        await expect(page).toHaveScreenshot(
          `${pageConfig.name.toLowerCase()}-full.png`,
          {
            fullPage: true,
            maxDiffPixels: 100,
          },
        );
      });
    }
  });

  test.describe("Component Screenshots", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Header matches snapshot", async ({ page }) => {
      const header = page.locator("header").first();
      await expect(header).toHaveScreenshot("header.png", {
        maxDiffPixels: 50,
      });
    });

    test("Hero section matches snapshot", async ({ page }) => {
      const hero = page.locator('[class*="hero"], [class*="Hero"]').first();
      const heroCount = await hero.count();

      if (heroCount > 0) {
        await expect(hero).toHaveScreenshot("hero.png", {
          maxDiffPixels: 100,
        });
      }
    });

    test("Footer matches snapshot", async ({ page }) => {
      const footer = page.locator("footer").first();
      await expect(footer).toHaveScreenshot("footer.png", {
        maxDiffPixels: 50,
      });
    });
  });

  test.describe("Dark Mode Screenshots", () => {
    test("Dark mode renders correctly", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await page.emulateMedia({ colorScheme: "dark" });
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("home-dark-mode.png", {
        fullPage: true,
        maxDiffPixels: 200,
      });
    });

    test("Light mode renders correctly", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await page.emulateMedia({ colorScheme: "light" });
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot("home-light-mode.png", {
        fullPage: true,
        maxDiffPixels: 200,
      });
    });
  });

  test.describe("Interactive State Screenshots", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Hover states match snapshots", async ({ page }) => {
      const button = page.locator("button, a").first();
      await button.hover();
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot("hover-state.png", {
        maxDiffPixels: 50,
      });
    });

    test("Focused state matches snapshot", async ({ page }) => {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot("focused-state.png", {
        maxDiffPixels: 50,
      });
    });

    test("Mobile menu open state", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const menuButton = page
        .locator('button[aria-label*="menu"], button[class*="menu"]')
        .first();
      if ((await menuButton.count()) > 0 && (await menuButton.isVisible())) {
        await menuButton.click();
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot("mobile-menu-open.png", {
          maxDiffPixels: 100,
        });
      }
    });
  });

  test.describe("Animation State Screenshots", () => {
    test("Page after scroll matches snapshot", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        window.scrollTo(0, window.innerHeight);
      });

      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot("scrolled-state.png", {
        maxDiffPixels: 200,
      });
    });

    test("Page at bottom matches snapshot", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      await page.waitForTimeout(1000);

      await expect(page).toHaveScreenshot("page-bottom.png", {
        fullPage: false,
        maxDiffPixels: 200,
      });
    });
  });
});

test.describe("Responsive Design Tests", () => {
  for (const breakpoint of breakpoints) {
    test.describe(`${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({
          width: breakpoint.width,
          height: breakpoint.height,
        });
      });

      for (const pageConfig of pages) {
        test(`${pageConfig.name} page renders correctly`, async ({ page }) => {
          await page.goto(pageConfig.path);
          await page.waitForLoadState("networkidle");
          await page.waitForTimeout(500);

          await expect(page).toHaveScreenshot(
            `${pageConfig.name.toLowerCase()}-${breakpoint.name.toLowerCase().replace(" ", "-")}.png`,
            {
              fullPage: true,
              maxDiffPixels: 150,
            },
          );
        });
      }

      test("Layout does not break at this breakpoint", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);

        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
      });

      test("Text remains readable", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const fontSizes = await page.evaluate(() => {
          const elements = Array.from(
            document.querySelectorAll(
              "p, span, h1, h2, h3, h4, h5, h6, a, button",
            ),
          );
          return elements.map((el) => {
            const style = window.getComputedStyle(el);
            return parseFloat(style.fontSize);
          });
        });

        const readableFonts = fontSizes.filter((size) => size >= 12);
        const readabilityRatio = readableFonts.length / fontSizes.length;

        expect(readabilityRatio).toBeGreaterThan(0.9);
      });

      test("Images do not overflow", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const images = await page.locator("img").all();
        const viewportWidth = await page.evaluate(() => window.innerWidth);

        for (const img of images) {
          const box = await img.boundingBox();
          if (box) {
            expect(box.width).toBeLessThanOrEqual(viewportWidth + 1);
          }
        }
      });

      test("Touch targets are appropriately sized", async ({ page }) => {
        if (breakpoint.width < 1024) {
          await page.goto("/");
          await page.waitForLoadState("networkidle");

          const interactiveElements = await page
            .locator("button, a, input, select, textarea")
            .all();

          for (const element of interactiveElements) {
            const isVisible = await element.isVisible().catch(() => false);
            if (isVisible) {
              const box = await element.boundingBox();
              if (box) {
                const minTouchSize = 44;
                const isLargeEnough =
                  box.width >= minTouchSize || box.height >= minTouchSize;
                expect(isLargeEnough).toBe(true);
              }
            }
          }
        }
      });
    });
  }

  test.describe("Orientation Change", () => {
    test("Layout adapts to orientation change", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(500);
      const portraitHeight = await page.evaluate(
        () => document.body.scrollHeight,
      );

      await page.setViewportSize({ width: 1024, height: 768 });
      await page.waitForTimeout(500);
      const landscapeHeight = await page.evaluate(
        () => document.body.scrollHeight,
      );

      expect(landscapeHeight).not.toEqual(portraitHeight);
    });
  });

  test.describe("Zoom Levels", () => {
    test("Page is usable at 200% zoom", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        document.body.style.zoom = "200%";
      });

      await page.waitForTimeout(500);

      const horizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(horizontalScroll).toBe(false);
    });
  });
});
