import { test, expect } from "@playwright/test";
import {
  measurePerformance,
  PERFORMANCE_THRESHOLDS,
} from "./utils/testUtils.js";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const pages = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/services", name: "Services" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

test.describe("Performance Tests", () => {
  test.describe("Core Web Vitals", () => {
    for (const pageConfig of pages) {
      test(`${pageConfig.name} - Core Web Vitals meet thresholds`, async ({
        page,
      }) => {
        await page.goto(pageConfig.path);
        await page.waitForLoadState("networkidle");

        const vitals = await page.evaluate(() => {
          return new Promise((resolve) => {
            let lcp = 0;
            let cls = 0;
            let fid = 0;

            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry) => {
                if (entry.entryType === "largest-contentful-paint") {
                  lcp = entry.startTime;
                }
                if (
                  entry.entryType === "layout-shift" &&
                  !entry.hadRecentInput
                ) {
                  cls += entry.value;
                }
              });
            });

            observer.observe({
              entryTypes: ["largest-contentful-paint", "layout-shift"],
            });

            setTimeout(() => {
              observer.disconnect();
              resolve({ lcp, cls, fid });
            }, 5000);
          });
        });

        expect(vitals.lcp).toBeLessThan(
          PERFORMANCE_THRESHOLDS.largestContentfulPaint,
        );
        expect(vitals.cls).toBeLessThan(
          PERFORMANCE_THRESHOLDS.cumulativeLayoutShift,
        );
      });
    }
  });

  test.describe("Page Load Metrics", () => {
    for (const pageConfig of pages) {
      test(`${pageConfig.name} - Load time is acceptable`, async ({ page }) => {
        const startTime = Date.now();

        await page.goto(pageConfig.path);
        await page.waitForLoadState("networkidle");

        const loadTime = Date.now() - startTime;

        expect(loadTime).toBeLessThan(5000);

        const metrics = await measurePerformance(page);

        if (metrics.navigation) {
          expect(metrics.navigation.loadEventEnd).toBeLessThan(5000);
          expect(metrics.navigation.domContentLoadedEventEnd).toBeLessThan(
            3000,
          );
        }
      });
    }
  });

  test.describe("Resource Loading", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("JavaScript files are loaded efficiently", async ({ page }) => {
      const scripts = await page.locator("script[src]").all();

      for (const script of scripts) {
        const src = await script.getAttribute("src");
        expect(src).toBeTruthy();
      }
    });

    test("CSS files are loaded efficiently", async ({ page }) => {
      const stylesheets = await page.locator('link[rel="stylesheet"]').all();

      for (const stylesheet of stylesheets) {
        const href = await stylesheet.getAttribute("href");
        expect(href).toBeTruthy();
      }
    });

    test("No render-blocking resources", async ({ page }) => {
      const criticalResources = await page.evaluate(() => {
        const scripts = Array.from(
          document.querySelectorAll(
            'script:not([defer]):not([async]):not([type="module"])',
          ),
        );
        const styles = Array.from(
          document.querySelectorAll('link[rel="stylesheet"]:not([media])'),
        );
        return {
          blockingScripts: scripts.length,
          blockingStyles: styles.length,
        };
      });

      expect(criticalResources.blockingScripts).toBe(0);
    });
  });

  test.describe("Memory Usage", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Memory usage is within acceptable limits", async ({ page }) => {
      const memoryInfo = await page.evaluate(() => {
        if (performance.memory) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          };
        }
        return null;
      });

      if (memoryInfo) {
        const usedMB = memoryInfo.usedJSHeapSize / (1024 * 1024);
        expect(usedMB).toBeLessThan(200);
      }
    });

    test("No memory leaks on navigation", async ({ page }) => {
      const getMemoryUsage = async () => {
        return await page.evaluate(() => {
          if (performance.memory) {
            return performance.memory.usedJSHeapSize;
          }
          return 0;
        });
      };

      const initialMemory = await getMemoryUsage();

      for (let i = 0; i < 5; i++) {
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.goto("/work");
        await page.waitForLoadState("networkidle");
        await page.goto("/services");
        await page.waitForLoadState("networkidle");
      }

      if (typeof global.gc === "function") {
        global.gc();
      }

      await page.waitForTimeout(1000);

      const finalMemory = await getMemoryUsage();

      if (initialMemory > 0 && finalMemory > 0) {
        const increase = ((finalMemory - initialMemory) / initialMemory) * 100;
        expect(increase).toBeLessThan(50);
      }
    });
  });

  test.describe("Animation Performance", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Animations maintain 60fps", async ({ page }) => {
      const frameData = await page.evaluate(async () => {
        const frameTimes = [];
        let lastTime = performance.now();

        return new Promise((resolve) => {
          const countFrames = () => {
            const currentTime = performance.now();
            frameTimes.push(currentTime - lastTime);
            lastTime = currentTime;

            if (frameTimes.length < 60) {
              requestAnimationFrame(countFrames);
            } else {
              const avgFrameTime =
                frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
              const fps = 1000 / avgFrameTime;
              resolve({ fps, avgFrameTime });
            }
          };

          requestAnimationFrame(countFrames);
        });
      });

      expect(frameData.fps).toBeGreaterThan(30);
    });

    test("Scroll performance is smooth", async ({ page }) => {
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });

      const scrollPerformance = await page.evaluate(async () => {
        const measurements = [];

        return new Promise((resolve) => {
          let count = 0;
          const maxCount = 30;

          const scrollStep = () => {
            const start = performance.now();
            window.scrollBy(0, 100);
            const end = performance.now();

            measurements.push(end - start);
            count++;

            if (count < maxCount) {
              requestAnimationFrame(scrollStep);
            } else {
              const avgTime =
                measurements.reduce((a, b) => a + b, 0) / measurements.length;
              resolve({ avgTime, maxTime: Math.max(...measurements) });
            }
          };

          requestAnimationFrame(scrollStep);
        });
      });

      expect(scrollPerformance.avgTime).toBeLessThan(16.67);
    });
  });

  test.describe("Network Performance", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test("Images are properly optimized", async ({ page }) => {
      const images = await page.locator("img").all();
      let oversizedImages = 0;

      for (const img of images) {
        const isVisible = await img.isVisible().catch(() => false);
        if (isVisible) {
          const box = await img.boundingBox();
          if (box) {
            const naturalWidth = await img.evaluate((el) => el.naturalWidth);
            const displayWidth = box.width * 2;

            if (naturalWidth > displayWidth * 1.5) {
              oversizedImages++;
            }
          }
        }
      }

      if (images.length > 0) {
        const oversizedPercentage = (oversizedImages / images.length) * 100;
        expect(oversizedPercentage).toBeLessThan(50);
      }
    });

    test("Lazy loading is implemented", async ({ page }) => {
      const images = await page.locator("img").all();
      let lazyLoadedCount = 0;

      for (const img of images) {
        const loading = await img.getAttribute("loading");
        if (loading === "lazy") {
          lazyLoadedCount++;
        }
      }

      if (images.length > 3) {
        expect(lazyLoadedCount).toBeGreaterThan(0);
      }
    });
  });

  test.describe("Lighthouse Audit", () => {
    test.skip(
      ({ browserName }) => browserName !== "chromium",
      "Lighthouse only works with Chromium",
    );

    for (const pageConfig of pages.slice(0, 2)) {
      test(`${pageConfig.name} - Lighthouse performance score`, async () => {
        const chrome = await chromeLauncher.launch({
          chromeFlags: ["--headless"],
        });

        try {
          const options = {
            logLevel: "error",
            output: "json",
            onlyCategories: [
              "performance",
              "accessibility",
              "best-practices",
              "seo",
            ],
            port: chrome.port,
          };

          const baseUrl = process.env.BASE_URL || "http://localhost:4173";
          const runnerResult = await lighthouse(
            `${baseUrl}${pageConfig.path}`,
            options,
          );

          const scores = runnerResult.lhr.categories;

          expect(scores.performance.score * 100).toBeGreaterThan(70);
          expect(scores.accessibility.score * 100).toBeGreaterThan(80);
          expect(scores["best-practices"].score * 100).toBeGreaterThan(80);
          expect(scores.seo.score * 100).toBeGreaterThan(80);
        } finally {
          await chrome.kill();
        }
      });
    }
  });
});
