import { useEffect } from "react";

const SITE_URL = "https://dorabel.co.uk";

/**
 * useSeo Hook - Manages all SEO meta tags for pages
 * Supports: meta description, OG tags, Twitter cards, canonical URLs, and robots directives
 */
export function useSeo(seoData = {}) {
  useEffect(() => {
    // Handle both direct props (legacy) and the new 'seo' object structure
    const title = seoData?.seo?.title || seoData?.title;
    const description = seoData?.seo?.description || seoData?.description;
    const image = seoData?.seo?.image;
    const canonical = seoData?.seo?.canonical || getCurrentPageCanonical();
    const noindex = seoData?.seo?.noindex || false;
    const follow = seoData?.seo?.follow !== false; // Default: follow
    const robots = seoData?.seo?.robots;

    // Debugging
    if (seoData && Object.keys(seoData).length > 0) {
      console.log("SEO Update Triggered:", {
        title,
        description,
        image,
        canonical,
      });
    }

    // Title
    if (title) {
      document.title = `${title} • Dorabel International`;
    }

    // Helper to update or create meta tags
    const updateMeta = (name, content, attribute = "name") => {
      if (!content && content !== "") return;
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper for link tags (canonical, alternate)
    const updateLink = (rel, href, hreflang = null) => {
      if (!href) return;
      let selector = `link[rel="${rel}"]`;
      if (hreflang) {
        selector = `link[rel="${rel}"][hreflang="${hreflang}"]`;
      }
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        if (hreflang) {
          element.setAttribute("hreflang", hreflang);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard Meta
    updateMeta("description", description);

    // Robots meta directives
    const robotsContent = buildRobotsDirective(noindex, follow, robots);
    if (robotsContent) {
      updateMeta("robots", robotsContent);
    }

    // Open Graph / Facebook
    updateMeta("og:type", "website", "property");
    updateMeta("og:title", title, "property");
    updateMeta("og:description", description, "property");

    // Handle OG Image - with validation and fallback
    const validImage = getValidOGImage(image);
    if (validImage) {
      updateMeta("og:image", validImage, "property");
      updateMeta("og:image:width", "1200", "property");
      updateMeta("og:image:height", "630", "property");
      updateMeta("og:image:alt", title || "Dorabel International", "property");
    }

    if (canonical) {
      updateMeta("og:url", canonical, "property");
    }

    // Twitter / X
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    if (validImage) {
      updateMeta("twitter:image", validImage);
      updateMeta("twitter:image:alt", title || "Dorabel International");
    }
    updateMeta("twitter:site", "@DorabelLogistics");
    updateMeta("twitter:creator", "@DorabelLogistics");

    // LinkedIn / Professional Networks
    updateMeta("linkedin:title", title);
    updateMeta("linkedin:description", description);

    // Canonical
    updateLink("canonical", canonical);

    // Alternate / hreflang for multi-regional (future expansion)
    if (seoData?.seo?.hreflangs && Array.isArray(seoData.seo.hreflangs)) {
      seoData.seo.hreflangs.forEach((hrefObj) => {
        updateLink("alternate", hrefObj.url, hrefObj.lang);
      });
    }

    // Default hreflang: self-reference
    updateLink("alternate", canonical, "en-GB");
  }, [seoData]);
}

/**
 * Helper: Build robots meta directive
 * Examples: "noindex, follow" | "index, follow" | custom override
 */
function buildRobotsDirective(noindex, follow, robotsOverride) {
  if (robotsOverride) return robotsOverride; // Allow custom override
  const indexValue = noindex ? "noindex" : "index";
  const followValue = follow ? "follow" : "nofollow";
  return `${indexValue}, ${followValue}`;
}

/**
 * Helper: Get current page canonical URL
 */
function getCurrentPageCanonical() {
  if (typeof window === "undefined") return null;
  return window.location.href.split("?")[0]; // Remove query params
}

/**
 * Helper: Validate and resolve OG image to absolute URL
 * Checks if image exists and returns absolute URL
 */
function getValidOGImage(image) {
  if (!image) return null;

  let absoluteImage = image;

  // Convert relative URLs to absolute
  if (image.startsWith("/")) {
    absoluteImage = `${SITE_URL}${image}`;
  } else if (!image.startsWith("http")) {
    absoluteImage = `${SITE_URL}/${image}`;
  }

  // Fallback to og_image.png if no image provided
  if (!absoluteImage.includes("uploads")) {
    return `${SITE_URL}/uploads/og_image.png`;
  }

  return absoluteImage;
}

/**
 * Breadcrumb Schema Generator - For structured breadcrumbs
 * Usage: useBreadcrumbs([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])
 */
export function useBreadcrumbs(breadcrumbs = []) {
  useEffect(() => {
    if (!breadcrumbs || breadcrumbs.length === 0) return;

    // Prevent duplicate injection
    if (document.getElementById("breadcrumb-schema")) {
      document.getElementById("breadcrumb-schema").remove();
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.url}`,
      })),
    };

    const script = document.createElement("script");
    script.id = "breadcrumb-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("breadcrumb-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [breadcrumbs]);
}
