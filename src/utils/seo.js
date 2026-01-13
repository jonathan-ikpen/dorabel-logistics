import { useEffect } from "react";

export function useSeo(seoData = {}) {
  useEffect(() => {
    // Handle both direct props (legacy) and the new 'seo' object structure
    const title = seoData?.seo?.title || seoData?.title;
    const description = seoData?.seo?.description || seoData?.description;
    const image = seoData?.seo?.image;
    const canonical = seoData?.seo?.canonical;

    // Debugging
    if (seoData && Object.keys(seoData).length > 0) {
      console.log("SEO Update Triggered:", { title, description, image });
    }

    // Title
    if (title) {
      document.title = `${title} • Dorabel International`;
    }

    // Helper to update or create meta tags
    const updateMeta = (name, content, attribute = "name") => {
      if (!content) return;
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper for link tags (canonical)
    const updateLink = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard Meta
    updateMeta("description", description);

    // Open Graph / Facebook
    updateMeta("og:type", "website", "property");
    updateMeta("og:title", title, "property");
    updateMeta("og:description", description, "property");

    // Handle Image (Ensure absolute URL for OG tags)
    if (image) {
      let absoluteImage = image;
      if (image.startsWith("/")) {
        absoluteImage = `${window.location.origin}${image}`;
      }
      updateMeta("og:image", absoluteImage, "property");
    }

    if (canonical) {
      updateMeta("og:url", canonical, "property");
    }

    // Twitter
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    if (image) {
      let absoluteImage = image;
      if (image.startsWith("/")) {
        absoluteImage = `${window.location.origin}${image}`;
      }
      updateMeta("twitter:image", absoluteImage);
    }

    // Canonical
    updateLink("canonical", canonical);
  }, [seoData]);
}
