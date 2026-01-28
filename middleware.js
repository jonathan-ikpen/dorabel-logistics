// Vercel Edge Middleware for Vite SPA
// Uses native Web APIs (not NextResponse which is Next.js-specific)

// Bot User-Agent patterns for social media crawlers
const BOT_PATTERNS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
  "Pinterest",
  "Googlebot",
  "bingbot",
];

// SEO metadata for each route
const SEO_METADATA = {
  "/": {
    title: "Dorabel Logistics - Service & Transport Support",
    description:
      "Dorabel Logistics provides trusted UK logistics and transport support services. We bridge the gap between businesses and reliable carriers.",
    image: "/uploads/og_image.png",
    canonical: "https://dorabel.co.uk/",
  },
  "/about": {
    title: "About Us - Trusted Logistics Support Experts",
    description:
      "Learn about Dorabel Logistics, your partner in efficient logistics and transport support. We ensure compliance, reliability, and cost-effectiveness for UK commercial clients.",
    image: "/uploads/og_image.png",
    canonical: "https://dorabel.co.uk/about",
  },
  "/services": {
    title: "Our Services - Transport, Logistics & Procurement",
    description:
      "Comprehensive logistics services including transport coordination, supply chain management, global freight, and business support. 24/7 availability.",
    image: "/uploads/og_image.png",
    canonical: "https://dorabel.co.uk/services",
  },
  "/contact": {
    title: "Contact Us - Get a Free Quote Today",
    description:
      "Get in touch with Dorabel Logistics for a free quote. Trusted UK logistics partners. Call us or email for immediate assistance.",
    image: "/uploads/og_image.png",
    canonical: "https://dorabel.co.uk/contact",
  },
  "/booking": {
    title: "Book an Appointment - Dorabel Logistics",
    description:
      "Request a quote or book logistics services with Dorabel Logistics. We offer efficient and reliable transport solutions.",
    image: "/uploads/og_image.png",
    canonical: "https://dorabel.co.uk/booking",
  },
};

const SITE_URL = "https://dorabel.co.uk";
const SITE_NAME = "Dorabel Logistics";

function isBot(userAgent) {
  if (!userAgent) return false;
  return BOT_PATTERNS.some((pattern) =>
    userAgent.toLowerCase().includes(pattern.toLowerCase()),
  );
}

function getAbsoluteImageUrl(imagePath) {
  if (!imagePath) return `${SITE_URL}/images/og_image.png`;
  if (imagePath.startsWith("http")) return imagePath;
  return `${SITE_URL}${imagePath}`;
}

function generateOGTags(seo, pathname) {
  const title = seo?.title || SITE_NAME;
  const description =
    seo?.description ||
    "Professional logistics and transport support services.";
  const image = getAbsoluteImageUrl(seo?.image);
  const url = seo?.canonical || `${SITE_URL}${pathname}`;

  return `
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="${SITE_NAME}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />

    <!-- Standard Meta -->
    <meta name="description" content="${description}" />
    <title>${title} • ${SITE_NAME}</title>
  `;
}

// Vercel Edge Middleware config
export const config = {
  matcher: [
    "/",
    "/about",
    "/services",
    "/contact",
    "/booking",
    "/leave-review",
  ],
};

// Vercel Edge Function handler
export default async function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "";
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Only process for bots - let regular users pass through
  if (!isBot(userAgent)) {
    return; // undefined = continue to next handler (serve SPA normally)
  }

  // Get SEO data for this route
  const seo = SEO_METADATA[pathname] || SEO_METADATA["/"];

  // Fetch the original HTML from the origin
  const originUrl = new URL("/index.html", request.url);
  const response = await fetch(originUrl.toString(), {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  let html = await response.text();

  // Generate OG tags
  const ogTags = generateOGTags(seo, pathname);

  // Inject OG tags into <head>
  html = html.replace("<head>", `<head>${ogTags}`);

  // Return modified HTML using native Response
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
