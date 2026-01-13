import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top of page on route change.
 * Place this inside <BrowserRouter> in App.jsx or main.jsx
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Don't scroll to top if there's a hash in the URL (anchor links)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
