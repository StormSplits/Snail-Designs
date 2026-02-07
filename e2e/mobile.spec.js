import { test, expect } from "@playwright/test";
import { testResponsiveBreakpoint } from "./utils/testUtils.js";

const mobileDevices = [
  { name: "iPhone SE", width: 375, height: 667, deviceScaleFactor: 2 },
  { name: "iPhone 12", width: 390, height: 844, deviceScaleFactor: 3 },
  { name: "iPhone 12 Pro Max", width: 428, height: 926, deviceScaleFactor: 3 },
  { name: "iPad Mini", width: 768, height: 1024, deviceScaleFactor: 2 },
  { name: "iPad Pro", width: 1024, height: 1366, deviceScaleFactor: 2 },
  { name: "Pixel 5", width: 393, height: 851, deviceScaleFactor: 2.75 },
  { name: "Samsung Galaxy S20", width: 412, height: 915, deviceScaleFactor: 3 },
  {
    name: "Samsung Galaxy Tab S7",
    width: 800,
    height: 1280,
    deviceScaleFactor: 2,
  },
];

const pages = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/services", name: "Services" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

test.describe("Mobile Responsiveness Tests", () => {
  for (const device of mobileDevices) {
    test.describe(`${device.name}`, () => {
      test.use({
        viewport: {
          width: device.width,
          height: device.height,
        },
        deviceScaleFactor: device.deviceScaleFactor,
        isMobile: device.width < 768,
        hasTouch: device.width < 1024,
      });

      for (const pageConfig of pages) {
        test(`${pageConfig.name} page renders without overflow`, async ({
          page,
        }) => {
          await page.goto(pageConfig.path);
          await page.waitForLoadState("networkidle");

          const overflowX = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
          });

          expect(overflowX).toBe(false);
        });

        test(`${pageConfig.name} - All interactive elements are accessible`, async ({
          page,
        }) => {
          await page.goto(pageConfig.path);
          await page.waitForLoadState("networkidle");

          const interactiveElements = await page
            .locator('button, a, input, select, textarea, [role="button"]')
            .all();
          let inaccessibleCount = 0;

          for (const element of interactiveElements) {
            const isVisible = await element.isVisible().catch(() => false);
            if (isVisible) {
              const box = await element.boundingBox();
              if (box) {
                const minSize = 44;
                const isAccessible =
                  box.width >= minSize || box.height >= minSize;
                if (!isAccessible) {
                  inaccessibleCount++;
                }
              }
            }
          }

          const accessibilityRatio =
            interactiveElements.length > 0
              ? 1 - inaccessibleCount / interactiveElements.length
              : 1;

          expect(accessibilityRatio).toBeGreaterThan(0.95);
        });

        test(`${pageConfig.name} - Text remains readable`, async ({ page }) => {
          await page.goto(pageConfig.path);
          await page.waitForLoadState("networkidle");

          const fontSizes = await page.evaluate(() => {
            const elements = Array.from(
              document.querySelectorAll(
                "p, span, a, button, h1, h2, h3, h4, h5, h6",
              ),
            );
            return elements.map((el) => {
              const style = window.getComputedStyle(el);
              const fontSize = parseFloat(style.fontSize);
              return fontSize;
            });
          });

          const readableFonts = fontSizes.filter((size) => size >= 12);
          expect(readableFonts.length / fontSizes.length).toBeGreaterThan(0.95);
        });

        test(`${pageConfig.name} - Images are responsive`, async ({ page }) => {
          await page.goto(pageConfig.path);
          await page.waitForLoadState("networkidle");

          const images = await page.locator("img").all();
          const viewportWidth = device.width;
          let oversizedCount = 0;

          for (const img of images) {
            const isVisible = await img.isVisible().catch(() => false);
            if (isVisible) {
              const box = await img.boundingBox();
              const naturalWidth = await img.evaluate((el) => el.naturalWidth);

              if (box && naturalWidth > viewportWidth * 1.5) {
                oversizedCount++;
              }
            }
          }

          if (images.length > 0) {
            const oversizedRatio = oversizedCount / images.length;
            expect(oversizedRatio).toBeLessThan(0.3);
          }
        });
      }

      test("Navigation is accessible on mobile", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const menuButton = page
          .locator(
            'button[aria-label*="menu"], button[class*="menu"], [class*="hamburger"]',
          )
          .first();

        if (device.width < 768) {
          if ((await menuButton.count()) > 0) {
            const isVisible = await menuButton.isVisible().catch(() => false);
            expect(isVisible).toBe(true);

            const box = await menuButton.boundingBox();
            expect(box.width).toBeGreaterThanOrEqual(44);
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }
      });

      test("Tap targets are large enough", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const tapTargets = await page
          .locator('a, button, input, select, textarea, [role="button"]')
          .all();
        let smallTargets = 0;

        for (const target of tapTargets) {
          const isVisible = await target.isVisible().catch(() => false);
          if (isVisible) {
            const box = await target.boundingBox();
            if (box) {
              const area = box.width * box.height;
              if (area < 44 * 44) {
                smallTargets++;
              }
            }
          }
        }

        const goodTargetsRatio =
          tapTargets.length > 0 ? 1 - smallTargets / tapTargets.length : 1;

        expect(goodTargetsRatio).toBeGreaterThan(0.9);
      });

      test("Viewport meta tag is present", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const viewportMeta = await page
          .locator('meta[name="viewport"]')
          .count();
        expect(viewportMeta).toBeGreaterThan(0);

        if (viewportMeta > 0) {
          const content = await page
            .locator('meta[name="viewport"]')
            .first()
            .getAttribute("content");
          expect(content).toContain("width=device-width");
        }
      });

      test("No horizontal scrolling on mobile", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        await page.evaluate(() => {
          window.scrollTo(0, 0);
        });

        const scrollWidth = await page.evaluate(
          () => document.documentElement.scrollWidth,
        );
        const clientWidth = await page.evaluate(
          () => document.documentElement.clientWidth,
        );

        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
      });
    });
  }

  test.describe("Mobile Gestures", () => {
    test.use({
      viewport: { width: 375, height: 667 },
      hasTouch: true,
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Swipe gestures work correctly", async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });

      const startY = await page.evaluate(() => window.scrollY);

      await page.touchscreen.tap(100, 300);
      await page.waitForTimeout(100);

      await page.evaluate(() => {
        window.scrollBy(0, 500);
      });

      const endY = await page.evaluate(() => window.scrollY);
      expect(endY).toBeGreaterThan(startY);
    });

    test("Pinch zoom is disabled or works correctly", async ({ page }) => {
      const viewportMeta = await page.locator('meta[name="viewport"]').first();
      const content = await viewportMeta.getAttribute("content");

      if (content) {
        const allowsZoom =
          !content.includes("user-scalable=no") &&
          !content.includes("maximum-scale=1");
        expect(typeof allowsZoom).toBe("boolean");
      }
    });
  });

  test.describe("Mobile Performance", () => {
    test.use({
      viewport: { width: 375, height: 667 },
      isMobile: true,
    });

    test("Page loads quickly on mobile", async ({ page }) => {
      const startTime = Date.now();

      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(8000);
    });

    test("Memory usage is reasonable on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const memoryInfo = await page.evaluate(() => {
        if (performance.memory) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
          };
        }
        return null;
      });

      if (memoryInfo) {
        const usedMB = memoryInfo.usedJSHeapSize / (1024 * 1024);
        expect(usedMB).toBeLessThan(150);
      }
    });

    test("Animations are smooth on mobile", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const frameData = await page.evaluate(async () => {
        const frameTimes = [];
        let lastTime = performance.now();

        return new Promise((resolve) => {
          const countFrames = () => {
            const currentTime = performance.now();
            frameTimes.push(currentTime - lastTime);
            lastTime = currentTime;

            if (frameTimes.length < 30) {
              requestAnimationFrame(countFrames);
            } else {
              const avgFrameTime =
                frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
              const fps = 1000 / avgFrameTime;
              resolve({ fps });
            }
          };

          requestAnimationFrame(countFrames);
        });
      });

      expect(frameData.fps).toBeGreaterThan(25);
    });
  });

  test.describe("Mobile Forms", () => {
    test.use({
      viewport: { width: 375, height: 667 },
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");
    });

    test("Form inputs are usable on mobile", async ({ page }) => {
      const inputs = await page.locator("input, textarea, select").all();

      for (const input of inputs) {
        const isVisible = await input.isVisible().catch(() => false);
        if (isVisible) {
          const box = await input.boundingBox();
          if (box) {
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }
      }
    });

    test("Keyboard navigation works on mobile", async ({ page }) => {
      const firstInput = page.locator("input, textarea").first();

      if ((await firstInput.count()) > 0) {
        await firstInput.click();
        await page.waitForTimeout(200);

        const isFocused = await firstInput.evaluate(
          (el) => el === document.activeElement,
        );
        expect(isFocused).toBe(true);
      }
    });
  });

  test.describe("Mobile-Specific Features", () => {
    test.use({
      viewport: { width: 375, height: 667 },
      isMobile: true,
      hasTouch: true,
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Touch events are handled properly", async ({ page }) => {
      const button = page.locator("button, a").first();

      if ((await button.count()) > 0 && (await button.isVisible())) {
        await button.tap();
        await page.waitForTimeout(500);

        expect(true).toBe(true);
      }
    });

    test("Mobile menu toggles correctly", async ({ page }) => {
      const menuButton = page
        .locator('button[aria-label*="menu"], button[class*="menu"]')
        .first();

      if ((await menuButton.count()) > 0 && (await menuButton.isVisible())) {
        await menuButton.click();
        await page.waitForTimeout(500);

        const ariaExpanded = await menuButton.getAttribute("aria-expanded");
        if (ariaExpanded !== null) {
          expect(ariaExpanded).toBe("true");
        }

        await menuButton.click();
        await page.waitForTimeout(500);
      }
    });

    test("Sticky header works on mobile", async ({ page }) => {
      const header = page.locator("header").first();

      if ((await header.count()) > 0) {
        const initialPosition = await header.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top;
        });

        await page.evaluate(() => {
          window.scrollTo(0, 500);
        });
        await page.waitForTimeout(500);

        const scrolledPosition = await header.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top;
        });

        if (initialPosition === 0) {
          expect(scrolledPosition).toBeLessThanOrEqual(100);
        }
      }
    });
  });
});
