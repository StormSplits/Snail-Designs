/**
 * Browser polyfills and compatibility utilities
 * This module provides fallbacks for features that may not be available in all browsers
 */

// Smooth scroll polyfill for Safari < 15.4
export function smoothScrollTo(element, options = {}) {
    const { top = 0, left = 0, behavior = 'smooth' } = options;

    // Check if native smooth scroll is supported
    if ('scrollBehavior' in document.documentElement.style) {
        element.scrollTo({ top, left, behavior });
        return;
    }

    // Manual smooth scroll fallback
    const startY = element.scrollTop;
    const startX = element.scrollLeft;
    const distanceY = top - startY;
    const distanceX = left - startX;
    const duration = 500;
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeProgress = easeInOutQuad(progress);

        element.scrollTop = startY + distanceY * easeProgress;
        element.scrollLeft = startX + distanceX * easeProgress;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// Check WebGL support
export function isWebGLSupported() {
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
}

// Check WebGL2 support
export function isWebGL2Supported() {
    try {
        const canvas = document.createElement('canvas');
        return !!canvas.getContext('webgl2');
    } catch (e) {
        return false;
    }
}

// Detect browser
export function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'unknown';
    let version = '';

    if (ua.includes('Firefox/')) {
        browser = 'firefox';
        version = ua.split('Firefox/')[1];
    } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
        browser = 'safari';
        version = ua.split('Version/')[1]?.split(' ')[0] || '';
    } else if (ua.includes('Chrome/')) {
        browser = 'chrome';
        version = ua.split('Chrome/')[1]?.split(' ')[0] || '';
    } else if (ua.includes('Edge/') || ua.includes('Edg/')) {
        browser = 'edge';
        version = ua.split(/Edge?\/|Edg\//)[1]?.split(' ')[0] || '';
    }

    return { browser, version };
}

// Check if running on iOS
export function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Check if running on Safari
export function isSafari() {
    return getBrowserInfo().browser === 'safari';
}

// Check if running on Firefox
export function isFirefox() {
    return getBrowserInfo().browser === 'firefox';
}

// Apply iOS-specific fixes
export function applyIOSFixes() {
    if (!isIOS()) return;

    // Fix 100vh on iOS (accounts for Safari toolbar)
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

// Request animation frame with fallback
export const raf =
    typeof window !== 'undefined'
        ? (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            ((callback) => window.setTimeout(callback, 1000 / 60)))
        : ((callback) => setTimeout(callback, 1000 / 60));

export const cancelRaf =
    typeof window !== 'undefined'
        ? (window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            ((id) => window.clearTimeout(id)))
        : ((id) => clearTimeout(id));

// Initialize all polyfills
export function initPolyfills() {
    applyIOSFixes();

    // Log browser info in development
    if (import.meta.env.DEV) {
        const { browser, version } = getBrowserInfo();
        console.log(`Browser: ${browser} ${version}`);
        console.log(`WebGL: ${isWebGLSupported()}, WebGL2: ${isWebGL2Supported()}`);
    }
}
