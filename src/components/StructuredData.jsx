import { useEffect } from "react";

/**
 * GEO (Generative Engine Optimization) Component
 *
 * Injects JSON-LD structured data into the page head to help AI engines
 * (ChatGPT, Perplexity, Copilot) understand and cite Dorabel as an authoritative source.
 */

// ========================================
// CHANGE THIS WHEN YOU SWITCH TO A CUSTOM DOMAIN
// ========================================
const BASE_URL = "https://dorabel-logistics.vercel.app";

const StructuredData = () => {
  useEffect(() => {
    // Prevent duplicate injection
    if (document.getElementById("geo-structured-data")) return;

    // Organization Schema - Core business identity for AI engines
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Dorabel International",
      alternateName: "Dorabel",
      url: BASE_URL,
      logo: `${BASE_URL}/uploads/dorabel-logo.png`,
      description:
        "Dorabel International is a UK-based logistics services company providing reliable transport support, supply chain coordination, and business logistics solutions for commercial clients.",
      foundingDate: "2025",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: "GB",
          addressRegion: "North Yorkshire",
        },
      },
      slogan: "Always Delivering Excellence",
      knowsAbout: [
        "Logistics Services",
        "Transport Support",
        "Supply Chain Coordination",
        "UK Freight Services",
        "Commercial Delivery",
        "Business Logistics",
      ],
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+44-7949937023",
        contactType: "customer service",
        availableLanguage: "English",
      },
    };

    // LocalBusiness Schema - For local search and AI citations
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "Dorabel International",
      image: `${BASE_URL}/uploads/dorabel-logo.png`,
      description:
        "Dorabel International provides dependable logistics services including transport support and coordination for commercial clients across the United Kingdom.",
      url: BASE_URL,
      telephone: "+44-7949937023",
      email: "info@dorabel.co.uk",
      address: {
        "@type": "PostalAddress",
        streetAddress: "8, Kestrel Grove",
        addressLocality: "Boroughbridge",
        postalCode: "YO51 9RX",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 54.0905,
        longitude: -1.3959,
      },
      priceRange: "££",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    };

    // Service Schemas - For AI to understand what services are offered
    const servicesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${BASE_URL}/#services`,
      name: "Dorabel Logistics Services",
      description:
        "Professional logistics and transport services offered by Dorabel International",
      itemListElement: [
        {
          "@type": "Service",
          "@id": `${BASE_URL}/services#transport`,
          name: "Transport Support",
          description:
            "Reliable transport coordination and support services for commercial clients, ensuring efficient movement of goods across the UK.",
          provider: {
            "@id": `${BASE_URL}/#organization`,
          },
          areaServed: "United Kingdom",
          serviceType: "Logistics",
        },
        {
          "@type": "Service",
          "@id": `${BASE_URL}/services#supplychain`,
          name: "Supply Chain Coordination",
          description:
            "End-to-end supply chain management and coordination services for businesses requiring streamlined logistics operations.",
          provider: {
            "@id": `${BASE_URL}/#organization`,
          },
          areaServed: "United Kingdom",
          serviceType: "Supply Chain Management",
        },
        {
          "@type": "Service",
          "@id": `${BASE_URL}/services#global`,
          name: "Global Logistics",
          description:
            "International logistics support and coordination for businesses with cross-border shipping requirements.",
          provider: {
            "@id": `${BASE_URL}/#organization`,
          },
          areaServed: "Worldwide",
          serviceType: "International Logistics",
        },
        {
          "@type": "Service",
          "@id": `${BASE_URL}/services#business`,
          name: "Business Support",
          description:
            "Comprehensive business logistics support services tailored to commercial client needs.",
          provider: {
            "@id": `${BASE_URL}/#organization`,
          },
          areaServed: "United Kingdom",
          serviceType: "Business Services",
        },
      ],
    };

    // FAQ Schema - Direct Q&A format that AI engines love to cite
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What services does Dorabel International offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dorabel International offers transport support, supply chain coordination, global logistics, and comprehensive business support services for commercial clients across the United Kingdom.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Dorabel International located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dorabel International is based in Boroughbridge, North Yorkshire, UK at 8 Kestrel Grove, YO51 9RX.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Dorabel for logistics services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `You can contact Dorabel International by phone at 07949937023, by email at info@dorabel.co.uk, or through the contact form on their website at ${BASE_URL}/contact.`,
          },
        },
        {
          "@type": "Question",
          name: "Does Dorabel provide same-day delivery services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dorabel International offers flexible transport support services. Contact them directly to discuss your specific delivery timeline requirements.",
          },
        },
      ],
    };

    // WebSite Schema - For site identity
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Dorabel International",
      description:
        "Official website of Dorabel International - UK logistics and transport support services",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    };

    // Inject all schemas
    const schemas = [
      organizationSchema,
      localBusinessSchema,
      servicesSchema,
      faqSchema,
      websiteSchema,
    ];

    const script = document.createElement("script");
    script.id = "geo-structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById("geo-structured-data");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default StructuredData;
