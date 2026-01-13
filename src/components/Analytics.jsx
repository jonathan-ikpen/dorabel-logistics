import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

// Hardcoded fallback ID to ensure tracking works even if CMS data fetch fails
const FALLBACK_ID = "G-B4Z8T7BVVD";

const Analytics = ({ googleAnalyticsId }) => {
  const location = useLocation();
  // Use the prop if available, otherwise use the fallback
  const effectiveId = googleAnalyticsId || FALLBACK_ID;

  useEffect(() => {
    if (effectiveId) {
      // Initialize GA4
      ReactGA.initialize(effectiveId);
      console.log("GA4 Initialized (react-ga4) with ID:", effectiveId);
    }
  }, [effectiveId]);

  useEffect(() => {
    if (effectiveId) {
      // Send pageview with a custom path
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [location, effectiveId]);

  return null;
};

export default Analytics;
