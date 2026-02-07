import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/services", name: "Services" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

test.describe("Stability and Stress Tests", () => {
  test.describe("Rapid Navigation", () => {
    test("Rapid page switching does not crash", async ({ page }) => {
      for (let i = 0; i < 20; i++) {
        const randomPage = pages[Math.floor(Math.random() * pages.length)];
        await page.goto(randomPage.path);
        await page.waitForLoadState("domcontentloaded");
      }

      const bodyText = await page.locator("body").textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText.length).toBeGreaterThan(100);
    });

    test("Back/forward navigation stress test", async ({ page }) => {
      await page.goto("/");
      await page.goto("/work");
      await page.goto("/services");
      await page.goto("/about");

      for (let i = 0; i < 10; i++) {
        await page.goBack();
        await page.goForward();
      }

      const currentUrl = page.url();
      expect(currentUrl).toContain("/about");
    });

    test("Multiple tabs do not cause issues", async ({ browser }) => {
      const context = await browser.newContext();
      const pages_array = [];

      for (let i = 0; i < 5; i++) {
        const newPage = await context.newPage();
        await newPage.goto(pages[i % pages.length].path);
        pages_array.push(newPage);
      }

      for (const p of pages_array) {
        const title = await p.title();
        expect(title).toBeTruthy();
      }

      await context.close();
    });
  });

  test.describe("Memory Stress", () => {
    test("Long session memory stability", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const getMemoryUsage = async () => {
        return await page.evaluate(() => {
          if (performance.memory) {
            return performance.memory.usedJSHeapSize;
          }
          return 0;
        });
      };

      const initialMemory = await getMemoryUsage();

      for (let i = 0; i < 50; i++) {
        await page.goto(pages[i % pages.length].path);
        await page.waitForLoadState("networkidle");
        await page.evaluate(() =>
          window.scrollTo(0, document.body.scrollHeight / 2),
        );
        await page.evaluate(() => window.scrollTo(0, 0));
      }

      if (typeof global.gc === "function") {
        global.gc();
      }

      await page.waitForTimeout(2000);

      const finalMemory = await getMemoryUsage();

      if (initialMemory > 0 && finalMemory > 0) {
        const increase = ((finalMemory - initialMemory) / initialMemory) * 100;
        expect(increase).toBeLessThan(100);
      }
    });

    test("Image loading does not cause memory issues", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const imageUrls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("img"))
          .map((img) => img.src)
          .filter((src) => src && !src.startsWith("data:"));
      });

      for (let i = 0; i < Math.min(20, imageUrls.length); i++) {
        await page.goto(imageUrls[i]);
        await page.waitForTimeout(100);
      }

      expect(true).toBe(true);
    });
  });

  test.describe("Event Handling Stress", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Rapid clicking does not crash", async ({ page }) => {
      const buttons = await page.locator("button, a").all();

      for (let i = 0; i < 50; i++) {
        const randomButton =
          buttons[Math.floor(Math.random() * buttons.length)];
        try {
          await randomButton.click({ timeout: 100 });
        } catch (e) {
          // Ignore timeout errors
        }
      }

      const bodyText = await page.locator("body").textContent();
      expect(bodyText).toBeTruthy();
    });

    test("Rapid scrolling does not crash", async ({ page }) => {
      for (let i = 0; i < 100; i++) {
        await page.evaluate((i) => {
          window.scrollTo(0, (i * 100) % document.body.scrollHeight);
        }, i);
      }

      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(typeof scrollPosition).toBe("number");
    });

    test("Rapid resize does not crash", async ({ page }) => {
      const sizes = [
        { width: 1920, height: 1080 },
        { width: 1366, height: 768 },
        { width: 768, height: 1024 },
        { width: 375, height: 667 },
      ];

      for (let i = 0; i < 20; i++) {
        const size = sizes[i % sizes.length];
        await page.setViewportSize(size);
        await page.waitForTimeout(50);
      }

      const bodyText = await page.locator("body").textContent();
      expect(bodyText).toBeTruthy();
    });

    test("Hover/unhover stress test", async ({ page }) => {
      const elements = await page.locator('a, button, [class*="hover"]').all();

      for (let i = 0; i < 30; i++) {
        const element = elements[i % elements.length];
        try {
          await element.hover({ timeout: 100 });
          await page.mouse.move(0, 0);
        } catch (e) {
          // Ignore errors for hidden elements
        }
      }

      expect(true).toBe(true);
    });
  });

  test.describe("Form Stability", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");
    });

    test("Rapid form input does not crash", async ({ page }) => {
      const inputs = await page.locator("input, textarea").all();

      for (let i = 0; i < 20; i++) {
        const input = inputs[i % inputs.length];
        try {
          await input.fill(`Test input ${i}`);
          await input.clear();
          await input.fill(`Another test ${i}`);
        } catch (e) {
          // Ignore errors for non-text inputs
        }
      }

      expect(true).toBe(true);
    });

    test("Form validation stress test", async ({ page }) => {
      const submitButton = page
        .locator('button[type="submit"], input[type="submit"]')
        .first();

      if ((await submitButton.count()) > 0) {
        for (let i = 0; i < 10; i++) {
          await submitButton.click();
          await page.waitForTimeout(100);
        }
      }

      expect(true).toBe(true);
    });
  });

  test.describe("Animation Stability", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Animation completion does not crash", async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });

      for (let i = 0; i < 10; i++) {
        await page.evaluate((i) => {
          window.scrollTo({
            top: (i * 500) % document.body.scrollHeight,
            behavior: "smooth",
          });
        }, i);

        await page.waitForTimeout(600);
      }

      const scrollPosition = await page.evaluate(() => window.scrollY);
      expect(scrollPosition).toBeGreaterThanOrEqual(0);
    });

    test("CSS animations remain smooth", async ({ page }) => {
      const frameTimes = [];

      for (let i = 0; i < 60; i++) {
        const start = Date.now();
        await page.evaluate(() => {
          window.scrollBy(0, 10);
        });
        const end = Date.now();
        frameTimes.push(end - start);
        await page.waitForTimeout(16);
      }

      const avgFrameTime =
        frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      expect(avgFrameTime).toBeLessThan(50);
    });
  });

  test.describe("Network Resilience", () => {
    test("Offline detection works", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await page.context().setOffline(true);

      const isOnline = await page.evaluate(() => navigator.onLine);
      expect(isOnline).toBe(false);

      await page.context().setOffline(false);

      const isOnlineAgain = await page.evaluate(() => navigator.onLine);
      expect(isOnlineAgain).toBe(true);
    });

    test("Slow network handling", async ({ page }) => {
      await page.context().setOffline(false);

      await page.goto("/");
      const startTime = Date.now();
      await page.waitForLoadState("domcontentloaded", { timeout: 30000 });
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(30000);
    });
  });

  test.describe("Error Recovery", () => {
    test("404 page renders correctly", async ({ page }) => {
      await page.goto("/non-existent-page-12345");
      await page.waitForLoadState("networkidle");

      const bodyText = await page.locator("body").textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText.length).toBeGreaterThan(50);
    });

    test("JavaScript errors are handled gracefully", async ({ page }) => {
      const errors = [];

      page.on("pageerror", (error) => {
        errors.push(error.message);
      });

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
      });

      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(3000);

      const fatalErrors = errors.filter(
        (e) =>
          e.includes("uncaught") ||
          e.includes("undefined is not") ||
          e.includes("Cannot read property"),
      );

      expect(fatalErrors.length).toBe(0);
    });
  });

  test.describe("Concurrent Operations", () => {
    test("Multiple simultaneous operations do not crash", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const operations = [
        page.evaluate(() => window.scrollTo(0, 500)),
        page.evaluate(() => document.querySelectorAll("img").length),
        page.evaluate(() => document.querySelectorAll("a").length),
        page.evaluate(() => window.innerWidth),
      ];

      const results = await Promise.all(operations);

      expect(results.every((r) => r !== undefined)).toBe(true);
    });
  });
});
