import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Analytics = ({ googleAnalyticsId }) => {
  const location = useLocation();

  useEffect(() => {
    if (!googleAnalyticsId) return;

    // Check if script already exists to avoid duplicates
    const existingScript = document.querySelector(
      `script[src*="googletagmanager"]`
    );
    if (!existingScript) {
      // 1. Inject the Google Tag Manager script
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      // 2. Initialize window.dataLayer
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag; // Make globally available
      gtag("js", new Date());
      gtag("config", googleAnalyticsId);
      console.log(`GA4 initialized with ID: ${googleAnalyticsId}`);
    }
  }, [googleAnalyticsId]);

  useEffect(() => {
    // Track page views on route change
    if (window.gtag && googleAnalyticsId) {
      window.gtag("config", googleAnalyticsId, {
        page_path: location.pathname + location.search,
      });
      console.log("GA4 Pageview sent:", location.pathname);
    }
  }, [location, googleAnalyticsId]);

  return null;
};

export default Analytics;
