/**
 * Post-build prerender script
 * 
 * Generates static HTML for all known routes by:
 * 1. Starting a static server from the dist/ directory
 * 2. Launching Puppeteer and visiting each route
 * 3. Waiting for the 'app-rendered' custom event
 * 4. Saving the full rendered HTML as index.html in each route's directory
 * 
 * Usage: node scripts/prerender.js
 * Runs automatically via: npm run build (postbuild script)
 */

import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, '..', 'dist');
const PORT = 4456; // Use uncommon port to avoid conflicts
const TIMEOUT_MS = 15000;

// All static routes to pre-render
const ROUTES = [
    '/',
    '/about',
    '/client',
    '/contact',
    '/services',
    '/works',
    '/cancellation',
    '/privacy',
    '/terms',
];

/**
 * Simple static file server for the dist directory
 */
function startStaticServer() {
    return new Promise((resolve) => {
        const server = createServer((req, res) => {
            let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

            // SPA fallback: if path doesn't have extension or file doesn't exist, serve index.html
            if (!filePath.includes('.') || !existsSync(filePath)) {
                filePath = join(DIST_DIR, 'index.html');
            }

            try {
                const content = readFileSync(filePath);
                const ext = filePath.split('.').pop();
                const mimeTypes = {
                    html: 'text/html',
                    js: 'application/javascript',
                    css: 'text/css',
                    json: 'application/json',
                    png: 'image/png',
                    jpg: 'image/jpeg',
                    svg: 'image/svg+xml',
                    woff: 'font/woff',
                    woff2: 'font/woff2',
                    otf: 'font/otf',
                    ttf: 'font/ttf',
                    mp4: 'video/mp4',
                };
                res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
                res.end(content);
            } catch {
                res.writeHead(404);
                res.end('Not found');
            }
        });

        server.listen(PORT, () => {
            console.log(`  Static server running on http://localhost:${PORT}`);
            resolve(server);
        });
    });
}

/**
 * Pre-render a single route and save the HTML
 */
async function prerenderRoute(browser, route) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;

    try {
        // Block heavy assets that slow down pre-rendering (video, large images, websockets)
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const resourceType = req.resourceType();
            const blockedTypes = ['media', 'font', 'websocket'];
            if (blockedTypes.includes(resourceType)) {
                req.abort();
            } else {
                req.continue();
            }
        });

        // Navigate — use 'domcontentloaded' not 'networkidle0' because heavy assets (video)
        // can prevent networkidle from ever firing
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS });

        // Wait for React to finish rendering via the custom event
        await page.evaluate(() => {
            return new Promise((resolve) => {
                if (document.__APP_RENDERED__) {
                    resolve();
                    return;
                }
                document.addEventListener('app-rendered', resolve, { once: true });
                setTimeout(resolve, 5000);
            });
        });

        // Extra wait for any async components/animations to settle
        await new Promise((r) => setTimeout(r, 2000));

        // Get the fully rendered HTML
        const html = await page.content();

        // Determine output path
        const outputDir = route === '/'
            ? DIST_DIR
            : join(DIST_DIR, route.slice(1));

        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = join(outputDir, 'index.html');
        writeFileSync(outputPath, html, 'utf-8');

        // Verify the output has actual content
        const hasContent = html.includes('</h1>') || html.includes('</h2>') || html.includes('</p>');
        const status = hasContent ? '✅' : '⚠️  (content may be minimal)';
        console.log(`  ${status} ${route} → ${outputPath.replace(DIST_DIR, 'dist')}`);

        return { route, success: true, hasContent };
    } catch (error) {
        console.error(`  ❌ ${route} → ERROR: ${error.message}`);
        return { route, success: false, error: error.message };
    } finally {
        await page.close();
    }
}

/**
 * Main prerender function
 */
async function prerender() {
    console.log('\n🔄 Pre-rendering static HTML for SEO...\n');

    // Verify dist directory exists
    if (!existsSync(DIST_DIR)) {
        console.error('❌ dist/ directory not found. Run "npm run build:client" first.');
        process.exit(1);
    }

    // Start static server
    const server = await startStaticServer();

    // Launch Puppeteer
    const browser = await launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
        ],
    });

    console.log(`  Pre-rendering ${ROUTES.length} routes...\n`);

    // Pre-render all routes (sequentially to avoid resource issues)
    const results = [];
    for (const route of ROUTES) {
        const result = await prerenderRoute(browser, route);
        results.push(result);
    }

    // Cleanup
    await browser.close();
    server.close();

    // Summary
    const successful = results.filter(r => r.success).length;
    const withContent = results.filter(r => r.hasContent).length;

    console.log(`\n📊 Pre-render Summary:`);
    console.log(`   Total: ${ROUTES.length} | Success: ${successful} | With content: ${withContent}`);

    if (successful < ROUTES.length) {
        console.log('\n⚠️  Some routes failed to pre-render. Check errors above.');
        process.exit(1);
    }

    console.log('\n✅ Pre-rendering complete! Your site is now SEO-ready.\n');
}

prerender().catch((error) => {
    console.error('Pre-rendering failed:', error);
    process.exit(1);
});
