import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const Analytics = ({ googleAnalyticsId }) => {
  const location = useLocation();

  useEffect(() => {
    if (googleAnalyticsId) {
      // Initialize GA4
      ReactGA.initialize(googleAnalyticsId);
      console.log("GA4 Initialized with ID:", googleAnalyticsId);
    }
  }, [googleAnalyticsId]);

  useEffect(() => {
    if (googleAnalyticsId) {
      // Send pageview with a custom path
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [location, googleAnalyticsId]);

  return null;
};

export default Analytics;
