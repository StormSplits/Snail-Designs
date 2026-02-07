# Cross-Browser Testing Guide

This project includes a comprehensive cross-browser testing suite that tests performance, stability, and visual regression across all major browsers and devices.

## 🎯 What's Tested

### Browsers

- **Chrome/Chromium** (Desktop & Mobile)
- **Firefox** (Desktop)
- **WebKit/Safari** (Desktop)
- **Edge** (via Chromium)
- **Opera** (via Chromium)

### Operating Systems

- **Windows**
- **macOS**
- **Linux**

### Mobile Devices

- iPhone SE, 12, 12 Pro Max
- iPad Mini, iPad Pro
- Google Pixel 5
- Samsung Galaxy S20, Tab S7

### Test Categories

#### 1. Cross-Browser Compatibility (`cross-browser.spec.js`)

- Page load tests across all browsers
- Browser feature support detection (WebGL, CSS Grid, ES6+, etc.)
- Navigation functionality
- Form interactions
- Interactive elements (buttons, links, hover states)
- Media and asset loading
- Accessibility checks
- JavaScript error detection

#### 2. Performance Tests (`performance.spec.js`)

- Core Web Vitals (LCP, CLS, FID)
- Page load metrics
- Resource loading efficiency
- Memory usage monitoring
- Animation performance (60fps check)
- Network performance
- Lighthouse audits

#### 3. Visual Regression Tests (`visual.spec.js`)

- Full page screenshots
- Component-level snapshots
- Dark/light mode rendering
- Interactive state snapshots
- Animation state capture
- Responsive design at multiple breakpoints

#### 4. Mobile Responsiveness (`mobile.spec.js`)

- Device-specific rendering
- Touch target sizes
- Viewport configuration
- Gesture handling
- Mobile form usability
- Mobile-specific features (sticky headers, menus)

#### 5. Stability & Stress Tests (`stability.spec.js`)

- Rapid navigation stress
- Memory leak detection
- Event handling stress
- Form stability
- Animation stability
- Network resilience
- Error recovery

## 🚀 Quick Start

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run All Tests

```bash
# Build and run all tests
npm test
```

### Run Specific Test Suites

```bash
# Cross-browser compatibility tests
npm run test:cross-browser

# Performance tests only
npm run test:performance

# Visual regression tests (update snapshots)
npm run test:visual

# Visual regression tests (check against snapshots)
npm run test:visual:check

# Mobile responsiveness tests
npm run test:mobile

# Stability/stress tests
npm run test:stability

# Tests for specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### View Test Reports

```bash
# Open HTML test report
npm run test:report

# Generate custom report
npm run test:generate-report
```

## 📊 Test Reports

After running tests, reports are generated in:

- `test-results/html-report/` - Interactive HTML report
- `test-results/results.json` - JSON test results
- `test-results/test-report.html` - Custom summary report

## 🔧 Configuration

### Playwright Configuration (`playwright.config.js`)

The configuration includes:

- Desktop browsers (Chrome, Firefox, Safari)
- Mobile devices (iPhone, iPad, Android)
- Different viewport sizes
- Parallel test execution
- Automatic retries on failure

### Lighthouse Configuration (`lighthouserc.json`)

Performance thresholds:

- Performance: ≥70%
- Accessibility: ≥80%
- Best Practices: ≥80%
- SEO: ≥80%
- LCP: ≤2.5s
- CLS: ≤0.1
- TBT: ≤200ms

## 🔄 CI/CD Integration

### GitHub Actions

Tests run automatically on:

- Push to main/master/develop branches
- Pull requests
- Daily scheduled runs (2 AM UTC)

Workflow files:

- `.github/workflows/cross-browser-tests.yml` - Main test suite
- `.github/workflows/performance-audit.yml` - Performance audits

### Test Matrix

Tests run across:

- **OS**: Ubuntu, Windows, macOS
- **Node**: 18.x, 20.x

## 📱 Browser Support

### Minimum Supported Versions

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Browser Features Tested

- WebGL 1.0 & 2.0
- Intersection Observer
- Resize Observer
- CSS Grid & Flexbox
- CSS Variables
- ES6+ Features
- Smooth Scroll
- Request Animation Frame

## 🐛 Debugging Failed Tests

### View Traces

Traces are automatically captured on first retry:

```bash
npx playwright show-trace test-results/trace.zip
```

### Run Tests in UI Mode

```bash
npm run test:e2e:ui
```

### Run Tests Headed (visible browser)

```bash
npm run test:e2e:headed
```

### Update Visual Snapshots

```bash
npm run test:visual
```

## 📝 Adding New Tests

1. Create a new `.spec.js` file in the `e2e/` directory
2. Import test utilities from `e2e/utils/testUtils.js`
3. Follow the existing test patterns
4. Run tests locally before committing

Example:

```javascript
import { test, expect } from "@playwright/test";

test.describe("My New Feature", () => {
  test("should work correctly", async ({ page }) => {
    await page.goto("/my-feature");
    await expect(page).toHaveTitle(/My Feature/);
  });
});
```

## 🎨 Visual Regression Testing

### How It Works

1. First run creates baseline screenshots
2. Subsequent runs compare against baselines
3. Differences are highlighted in test reports

### Updating Snapshots

```bash
# Update all snapshots
npm run test:visual

# Update specific test snapshots
npx playwright test visual.spec.js --update-snapshots
```

### Snapshot Storage

- Screenshots stored in `e2e/**/*.spec.js-snapshots/`
- Excluded from git (see `.gitignore`)

## 🔍 Performance Monitoring

### Metrics Tracked

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Total Blocking Time (TBT)
- Time to Interactive (TTI)
- First Input Delay (FID)

### Thresholds

See `PERFORMANCE_THRESHOLDS` in `e2e/utils/testUtils.js`

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)

## 🤝 Contributing

When adding new features:

1. Add corresponding tests
2. Ensure tests pass on all browsers
3. Update visual snapshots if needed
4. Verify mobile responsiveness

## 📞 Support

For issues with the test suite:

1. Check browser console for errors
2. Review test traces in `test-results/`
3. Verify browser versions match minimum requirements
4. Check system resources during test execution
