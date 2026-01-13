import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import LeaveReview from "./pages/LeaveReview";
import Booking from "./pages/Booking";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import { client } from "../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import Analytics from "./components/Analytics";

const AppContent = ({ globalData }) => {
  // Use Tina hook to make it editable
  const { data: tinaGlobal } = useTina({
    query: globalData.query,
    variables: globalData.variables,
    data: globalData.data,
  });

  const headerData = tinaGlobal?.global?.header;
  const themeData = tinaGlobal?.global?.theme;

  useEffect(() => {
    // Colors
    if (themeData?.primaryColor) {
      document.documentElement.style.setProperty(
        "--color-dorabel-purple",
        themeData.primaryColor
      );
    }
    if (themeData?.accentColor) {
      document.documentElement.style.setProperty(
        "--color-dorabel-gold",
        themeData.accentColor
      );
    }

    // Fonts
    const loadFont = (fontName) => {
      if (!fontName) return;
      console.log(`Loading font: ${fontName}`);
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
        /\s+/g,
        "+"
      )}:wght@300;400;500;600;700;800&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    };

    if (themeData?.headingFont) {
      loadFont(themeData.headingFont);
      document.documentElement.style.setProperty(
        "--font-heading",
        `"${themeData.headingFont}"`
      );
    }
    if (themeData?.bodyFont) {
      loadFont(themeData.bodyFont);
      document.documentElement.style.setProperty(
        "--font-body",
        `"${themeData.bodyFont}"`
      );
    }
  }, [themeData]);

  return (
    <div className="bg-white min-h-screen text-dorabel-purple selection:bg-dorabel-gold selection:text-white font-sans flex flex-col">
      <ScrollToTop />
      <Navbar headerData={headerData} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route
            path="/leave-review"
            element={
              <LeaveReview
                googleReviewLink={tinaGlobal?.global?.googleReviewLink}
              />
            }
          />
        </Routes>
      </main>
      <Footer headerData={headerData} footerData={tinaGlobal?.global?.footer} />
    </div>
  );
};

function App() {
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const fetchGlobal = async () => {
      try {
        const res = await client.queries.global({ relativePath: "index.json" });
        setGlobalData(res);
      } catch (e) {
        console.error("Failed to fetch global data:", e);
      }
    };
    fetchGlobal();
  }, []);

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      window.location.href = "/admin/index.html";
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Show preloader while waiting for global data logic could be here,
  // but Preloader handles its own logic.
  // However, we need Global Data to render the AppContent with Tina.

  if (!globalData) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <Preloader />
      </div>
    );
  }
  return (
    <>
      <Preloader />
      <Analytics googleAnalyticsId={globalData?.global?.googleAnalyticsId} />
      <AppContent globalData={globalData} />
    </>
  );
}

export default App;
