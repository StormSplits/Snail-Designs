/**
 * Test Report Generator
 * Generates HTML reports from Playwright test results
 */

import fs from "fs";
import path from "path";

class TestReportGenerator {
  constructor() {
    this.resultsDir = "./test-results";
    this.reportPath = "./test-results/test-report.html";
  }

  async generateReport() {
    const results = await this.loadResults();
    const html = this.generateHTML(results);

    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }

    fs.writeFileSync(this.reportPath, html);
    console.log(`Test report generated: ${this.reportPath}`);
  }

  async loadResults() {
    const resultsPath = path.join(this.resultsDir, "results.json");

    if (!fs.existsSync(resultsPath)) {
      return {
        suites: [],
        stats: { passed: 0, failed: 0, skipped: 0, total: 0 },
      };
    }

    const data = JSON.parse(fs.readFileSync(resultsPath, "utf-8"));
    return this.parseResults(data);
  }

  parseResults(data) {
    const stats = { passed: 0, failed: 0, skipped: 0, total: 0 };
    const suites = [];

    if (data.suites) {
      for (const suite of data.suites) {
        const suiteData = {
          name: suite.title,
          tests: [],
          stats: { passed: 0, failed: 0, skipped: 0, total: 0 },
        };

        if (suite.specs) {
          for (const spec of suite.specs) {
            const test = {
              name: spec.title,
              status: "pending",
              duration: 0,
              browser: "unknown",
            };

            if (spec.tests && spec.tests.length > 0) {
              const testRun = spec.tests[0];
              test.status = testRun.results[0].status;
              test.duration = testRun.results[0].duration;
              test.browser = testRun.projectName || "unknown";

              stats[test.status === "expected" ? "passed" : test.status]++;
              suiteData.stats[
                test.status === "expected" ? "passed" : test.status
              ]++;
            }

            suiteData.stats.total++;
            stats.total++;
            suiteData.tests.push(test);
          }
        }

        suites.push(suiteData);
      }
    }

    return { suites, stats };
  }

  generateHTML(results) {
    const passRate =
      results.stats.total > 0
        ? ((results.stats.passed / results.stats.total) * 100).toFixed(1)
        : 0;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cross-Browser Test Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        h1 {
            color: #1a1a1a;
            margin-bottom: 10px;
        }
        
        .timestamp {
            color: #666;
            font-size: 14px;
        }
        
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .stat-card h3 {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .stat-value {
            font-size: 36px;
            font-weight: bold;
        }
        
        .stat-value.passed { color: #28a745; }
        .stat-value.failed { color: #dc3545; }
        .stat-value.skipped { color: #ffc107; }
        .stat-value.total { color: #007bff; }
        .stat-value.rate { color: #6c757d; }
        
        .suite {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            overflow: hidden;
        }
        
        .suite-header {
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .suite-header h2 {
            font-size: 18px;
            color: #1a1a1a;
        }
        
        .suite-stats {
            display: flex;
            gap: 15px;
            font-size: 14px;
        }
        
        .suite-stats span {
            padding: 4px 8px;
            border-radius: 4px;
            background: #e9ecef;
        }
        
        .suite-stats .passed { background: #d4edda; color: #155724; }
        .suite-stats .failed { background: #f8d7da; color: #721c24; }
        
        .test-list {
            padding: 0;
        }
        
        .test-item {
            padding: 15px 20px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .test-item:last-child {
            border-bottom: none;
        }
        
        .test-name {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .status-icon {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
        }
        
        .status-icon.passed { background: #28a745; }
        .status-icon.failed { background: #dc3545; }
        .status-icon.skipped { background: #ffc107; }
        .status-icon.pending { background: #6c757d; }
        
        .test-meta {
            display: flex;
            gap: 15px;
            font-size: 12px;
            color: #666;
        }
        
        .browser-tag {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 3px;
        }
        
        .duration {
            color: #666;
        }
        
        .no-results {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
        
        .legend {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Cross-Browser Test Report</h1>
            <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
        </header>
        
        <div class="summary">
            <div class="stat-card">
                <h3>Total Tests</h3>
                <div class="stat-value total">${results.stats.total}</div>
            </div>
            <div class="stat-card">
                <h3>Passed</h3>
                <div class="stat-value passed">${results.stats.passed}</div>
            </div>
            <div class="stat-card">
                <h3>Failed</h3>
                <div class="stat-value failed">${results.stats.failed}</div>
            </div>
            <div class="stat-card">
                <h3>Skipped</h3>
                <div class="stat-value skipped">${results.stats.skipped}</div>
            </div>
            <div class="stat-card">
                <h3>Pass Rate</h3>
                <div class="stat-value rate">${passRate}%</div>
            </div>
        </div>
        
        ${
          results.suites.length === 0
            ? `
            <div class="no-results">
                <h2>No test results found</h2>
                <p>Run tests first to generate a report</p>
            </div>
        `
            : results.suites
                .map(
                  (suite) => `
            <div class="suite">
                <div class="suite-header">
                    <h2>${suite.name}</h2>
                    <div class="suite-stats">
                        <span class="passed">${suite.stats.passed} passed</span>
                        ${suite.stats.failed > 0 ? `<span class="failed">${suite.stats.failed} failed</span>` : ""}
                        ${suite.stats.skipped > 0 ? `<span>${suite.stats.skipped} skipped</span>` : ""}
                    </div>
                </div>
                <div class="test-list">
                    ${suite.tests
                      .map(
                        (test) => `
                        <div class="test-item">
                            <div class="test-name">
                                <span class="status-icon ${test.status}"></span>
                                <span>${test.name}</span>
                            </div>
                            <div class="test-meta">
                                <span class="browser-tag">${test.browser}</span>
                                ${test.duration > 0 ? `<span class="duration">${(test.duration / 1000).toFixed(2)}s</span>` : ""}
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `,
                )
                .join("")
        }
        
        <div class="legend">
            <div class="legend-item">
                <span class="status-icon passed"></span>
                <span>Passed</span>
            </div>
            <div class="legend-item">
                <span class="status-icon failed"></span>
                <span>Failed</span>
            </div>
            <div class="legend-item">
                <span class="status-icon skipped"></span>
                <span>Skipped</span>
            </div>
            <div class="legend-item">
                <span class="status-icon pending"></span>
                <span>Pending</span>
            </div>
        </div>
    </div>
</body>
</html>`;
  }
}

const generator = new TestReportGenerator();
generator.generateReport().catch(console.error);
