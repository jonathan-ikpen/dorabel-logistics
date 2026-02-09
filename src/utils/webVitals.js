/**
 * Core Web Vitals Monitoring for Dorabel Logistics
 * Captures and reports LCP, FID, CLS, TTFB, INP metrics
 * Integration: Google Analytics + custom logging
 */

/**
 * Initialize Web Vitals monitoring
 * Pass to your analytics service for tracking
 */
export function initWebVitals(analyticsCallback) {
  // Only run in browser
  if (typeof window === "undefined") return;

  // Largest Contentful Paint (LCP)
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.renderTime || lastEntry.loadTime;

        if (analyticsCallback) {
          analyticsCallback({
            metric: "LCP",
            value: lcp,
            rating: getLCPRating(lcp),
            timestamp: Date.now(),
          });
        }

        console.log("LCP:", lcp, "ms", { rating: getLCPRating(lcp) });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.warn("LCP monitoring not supported", e);
    }
  }

  // Interaction to Next Paint (INP) - replaces FID
  if ("PerformanceObserver" in window) {
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const inp = lastEntry.duration;

        if (analyticsCallback) {
          analyticsCallback({
            metric: "INP",
            value: inp,
            rating: getINPRating(inp),
            timestamp: Date.now(),
          });
        }

        console.log("INP:", inp, "ms", { rating: getINPRating(inp) });
      });
      inpObserver.observe({ entryTypes: ["event"] });
    } catch (e) {
      console.warn("INP monitoring not supported", e);
    }
  }

  // Cumulative Layout Shift (CLS)
  if ("PerformanceObserver" in window) {
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        if (analyticsCallback) {
          analyticsCallback({
            metric: "CLS",
            value: clsValue,
            rating: getCLSRating(clsValue),
            timestamp: Date.now(),
          });
        }

        console.log("CLS:", clsValue, { rating: getCLSRating(clsValue) });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("CLS monitoring not supported", e);
    }
  }

  // First Contentful Paint (FCP) & Time to First Byte (TTFB)
  if (performance.getEntriesByType) {
    const paintEntries = performance.getEntriesByType("paint");
    paintEntries.forEach((entry) => {
      if (entry.name === "first-contentful-paint") {
        const fcp = entry.startTime;
        if (analyticsCallback) {
          analyticsCallback({
            metric: "FCP",
            value: fcp,
            rating: getFCPRating(fcp),
            timestamp: Date.now(),
          });
        }
        console.log("FCP:", fcp, "ms", { rating: getFCPRating(fcp) });
      }
    });

    const navTiming = performance.getEntriesByType("navigation")[0];
    if (navTiming) {
      const ttfb = navTiming.responseStart - navTiming.fetchStart;
      if (analyticsCallback) {
        analyticsCallback({
          metric: "TTFB",
          value: ttfb,
          rating: getTTFBRating(ttfb),
          timestamp: Date.now(),
        });
      }
      console.log("TTFB:", ttfb, "ms", { rating: getTTFBRating(ttfb) });
    }
  }
}

/**
 * Rating functions for Core Web Vitals thresholds
 */
function getLCPRating(value) {
  if (value <= 2500) return "good";
  if (value <= 4000) return "needs-improvement";
  return "poor";
}

function getINPRating(value) {
  if (value <= 200) return "good";
  if (value <= 500) return "needs-improvement";
  return "poor";
}

function getCLSRating(value) {
  if (value <= 0.1) return "good";
  if (value <= 0.25) return "needs-improvement";
  return "poor";
}

function getFCPRating(value) {
  if (value <= 1800) return "good";
  if (value <= 3000) return "needs-improvement";
  return "poor";
}

function getTTFBRating(value) {
  if (value <= 800) return "good";
  if (value <= 1800) return "needs-improvement";
  return "poor";
}

/**
 * Send Web Vitals to Google Analytics (if gtag is available)
 */
export function reportWebVitalsToGA() {
  if (typeof gtag === "undefined") {
    console.warn(
      "Google Analytics not loaded. Install Google Analytics script first.",
    );
    return;
  }

  initWebVitals((metric) => {
    gtag("event", metric.metric, {
      event_category: "Web Vitals",
      value: Math.round(metric.value),
      event_label: metric.rating,
    });
  });
}

/**
 * Report Web Vitals to custom endpoint
 * POST to your monitoring service
 */
export function reportWebVitalsToEndpoint(endpoint) {
  initWebVitals(async (metric) => {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...metric,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      console.error("Failed to report Web Vitals:", error);
    }
  });
}
