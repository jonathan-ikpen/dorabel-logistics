import { useEffect } from "react";

/**
 * Tawk.to Live Chat Widget Component
 *
 * @param {string} tawkToId - The Tawk.to Property ID (format: "property_id/widget_id")
 *                            Example: "1234567890abcdef/1a2b3c4d"
 *                            Find this in your Tawk.to dashboard under Administration > Channels > Chat Widget
 */

const FALLBACK_ID = "696813e81d59b6198d668274/1jev8rhn3";

const LiveChat = ({ tawkToId }) => {
  useEffect(() => {
    // Use fallback if no ID provided
    let effectiveId = tawkToId || FALLBACK_ID;

    // Validate format: must contain "/" to separate property_id/widget_id
    if (!effectiveId.includes("/")) {
      console.warn(
        "Tawk.to ID format is invalid. Expected format: 'property_id/widget_id'. " +
          "Find this in Tawk.to Dashboard > Administration > Channels > Chat Widget"
      );
      return;
    }

    // Check if script already exists
    if (document.getElementById("tawkto-script")) return;

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and inject the script
    const script = document.createElement("script");
    script.id = "tawkto-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${effectiveId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById("tawkto-script");
      if (existingScript) {
        existingScript.remove();
      }
      // Clean up Tawk widget
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, [tawkToId]);

  return null; // This component doesn't render anything visible
};

export default LiveChat;
