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
    title: "Professional Facility Management Services in Manchester",
    description:
      "H2O Facilities provides trusted property management, cleaning, and maintenance services in Manchester. We bridge the gap between landlords and quality contractors.",
    image: "/images/og_image_new.png",
    canonical: "https://h2ofacilities.co.uk/",
  },
  "/about": {
    title: "About Us - Trusted Property Management Experts",
    description:
      "Learn about H2O Facilities, your partner in efficient property management. We ensure compliance, safety, and quality for property owners and agents in Manchester.",
    image: "/images/og_image_new.png",
    canonical: "https://h2ofacilities.co.uk/about",
  },
  "/services": {
    title: "Our Services - Cleaning, Maintenance & Repairs",
    description:
      "Comprehensive facility services including daily cleaning, waste management, compliance inspections, and emergency maintenance. 24/7 support available.",
    image: "/images/og_image_new.png",
    canonical: "https://h2ofacilities.co.uk/services",
  },
  "/contact": {
    title: "Contact Us - Get a Free Quote Today",
    description:
      "Get in touch with H2O Facilities for a free consultation. Trusted by over 50 leading agencies in Manchester. Call us or email for immediate assistance.",
    image: "/images/og_image_new.png",
    canonical: "https://h2ofacilities.co.uk/contact",
  },
};

const SITE_URL = "https://h2ofacilities.co.uk";
const SITE_NAME = "H2O Facilities";

function isBot(userAgent) {
  if (!userAgent) return false;
  return BOT_PATTERNS.some((pattern) =>
    userAgent.toLowerCase().includes(pattern.toLowerCase())
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
    seo?.description || "Professional facility management services.";
  const image = getAbsoluteImageUrl(seo?.image);
  const url = seo?.canonical || `${SITE_URL}${pathname}`;

  return `
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image-backup" content="${image}" />
    <meta property="og:image" content="https://assets.tina.io/01391f29-0fb6-459f-b103-01b078d450ea/og_image_new.png" />
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
  matcher: ["/", "/about", "/services", "/contact"],
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
