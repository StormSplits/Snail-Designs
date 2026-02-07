/**
 * Test utilities for cross-browser testing
 */

export const BROWSER_FEATURES = {
  webgl: {
    test: async (page) => {
      return await page.evaluate(() => {
        try {
          const canvas = document.createElement("canvas");
          return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") ||
              canvas.getContext("experimental-webgl"))
          );
        } catch (e) {
          return false;
        }
      });
    },
    name: "WebGL Support",
  },

  webgl2: {
    test: async (page) => {
      return await page.evaluate(() => {
        try {
          const canvas = document.createElement("canvas");
          return !!canvas.getContext("webgl2");
        } catch (e) {
          return false;
        }
      });
    },
    name: "WebGL2 Support",
  },

  smoothScroll: {
    test: async (page) => {
      return await page.evaluate(() => {
        return "scrollBehavior" in document.documentElement.style;
      });
    },
    name: "Smooth Scroll",
  },

  intersectionObserver: {
    test: async (page) => {
      return await page.evaluate(() => {
        return "IntersectionObserver" in window;
      });
    },
    name: "Intersection Observer",
  },

  resizeObserver: {
    test: async (page) => {
      return await page.evaluate(() => {
        return "ResizeObserver" in window;
      });
    },
    name: "Resize Observer",
  },

  mutationObserver: {
    test: async (page) => {
      return await page.evaluate(() => {
        return "MutationObserver" in window;
      });
    },
    name: "Mutation Observer",
  },

  requestAnimationFrame: {
    test: async (page) => {
      return await page.evaluate(() => {
        return "requestAnimationFrame" in window;
      });
    },
    name: "Request Animation Frame",
  },

  cssGrid: {
    test: async (page) => {
      return await page.evaluate(() => {
        return CSS.supports("display", "grid");
      });
    },
    name: "CSS Grid",
  },

  cssFlexbox: {
    test: async (page) => {
      return await page.evaluate(() => {
        return CSS.supports("display", "flex");
      });
    },
    name: "CSS Flexbox",
  },

  cssVariables: {
    test: async (page) => {
      return await page.evaluate(() => {
        return CSS.supports("--test", "0");
      });
    },
    name: "CSS Variables",
  },

  es6: {
    test: async (page) => {
      return await page.evaluate(() => {
        try {
          eval("const f = async () => {}");
          eval("class Test {}");
          eval("const obj = { ...{}, ...{} }");
          return true;
        } catch (e) {
          return false;
        }
      });
    },
    name: "ES6+ Support",
  },
};

export async function measurePerformance(page, callback) {
  const metrics = await page.evaluate(() => {
    return {
      memory: performance.memory
        ? {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          }
        : null,
      navigation: performance.getEntriesByType("navigation")[0],
      paint: performance.getEntriesByType("paint"),
    };
  });

  return metrics;
}

export async function checkConsoleErrors(page) {
  const errors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push({
        type: "console.error",
        text: msg.text(),
        location: msg.location(),
      });
    }
  });

  page.on("pageerror", (error) => {
    errors.push({
      type: "pageerror",
      message: error.message,
      stack: error.stack,
    });
  });

  return errors;
}

export async function testResponsiveBreakpoint(page, width, height) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(500);

  const viewport = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
  }));

  return viewport;
}

export const PERFORMANCE_THRESHOLDS = {
  firstContentfulPaint: 1800,
  largestContentfulPaint: 2500,
  timeToInteractive: 3500,
  totalBlockingTime: 200,
  cumulativeLayoutShift: 0.1,
  firstInputDelay: 100,
};

export function checkPerformanceThresholds(metrics) {
  const results = [];

  if (
    metrics.largestContentfulPaint >
    PERFORMANCE_THRESHOLDS.largestContentfulPaint
  ) {
    results.push({
      metric: "LCP",
      value: metrics.largestContentfulPaint,
      threshold: PERFORMANCE_THRESHOLDS.largestContentfulPaint,
      status: "fail",
    });
  }

  if (metrics.totalBlockingTime > PERFORMANCE_THRESHOLDS.totalBlockingTime) {
    results.push({
      metric: "TBT",
      value: metrics.totalBlockingTime,
      threshold: PERFORMANCE_THRESHOLDS.totalBlockingTime,
      status: "fail",
    });
  }

  return results;
}
