import { defineConfig } from "tinacms";
import React from "react";
import { Logo } from "./components/Logo";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  // Custom CMS Callback to inject branding
  cmsCallback: (cms) => {
    cms.events.subscribe("cms:enable", () => {
      // We can try to manipulate the DOM directly if plugins aren't exposing a clean API for Logo replacement yet
      // or register a view. However, standard specific Logo replacement often requires mounting a custom admin.
      // For a quick "hack" that works in many generated setups without full custom admin:
      // Inject custom branding styles from public folder
      if (typeof document !== "undefined") {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/tina-styles.css";
        document.head.appendChild(link);

        // SAFEST SIDEBAR INJECTION: Uses requestIdleCallback to wait until browser is completely idle
        // This ensures we don't interfere with any React rendering or Tina operations
        const injectSidebarLinks = () => {
          const sidebarList = document.querySelector("ul.flex.flex-col.gap-4");
          if (
            !sidebarList ||
            document.getElementById("tina-custom-analytics-link")
          )
            return;

          const customLinks = [
            {
              id: "tina-custom-analytics-link",
              label: "Google Analytics",
              url: "https://analytics.google.com/analytics/web/",
              icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mr-2 h-6 opacity-80 w-auto" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></svg>`,
            },
            {
              id: "tina-custom-reviews-link",
              label: "Google Reviews",
              url: "https://business.google.com/",
              icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mr-2 h-6 opacity-80 w-auto" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`,
            },
            {
              id: "tina-custom-tawkto-link",
              label: "Live Chat",
              url: "https://dashboard.tawk.to/",
              icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mr-2 h-6 opacity-80 w-auto" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7v-2h10v2zm0-3H7V9h10v2zm0-3H7V6h10v2z"></path></svg>`,
            },
          ];

          customLinks.forEach((linkConfig) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.id = linkConfig.id;
            a.href = linkConfig.url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.className =
              "text-base tracking-wide text-gray-500 hover:text-blue-600 flex items-center opacity-90 hover:opacity-100 cursor-pointer";
            a.innerHTML = `${linkConfig.icon} ${linkConfig.label}`;
            li.appendChild(a);
            sidebarList.appendChild(li);
          });
        };

        // Wait for browser to be completely idle, then try to inject after sidebar might be open
        // Using a click listener on the menu button instead of observers
        const menuBtn = () =>
          document.querySelector('button[aria-label="Open navigation menu"]');
        const tryInject = () => {
          if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(() => setTimeout(injectSidebarLinks, 100), {
              timeout: 2000,
            });
          } else {
            setTimeout(injectSidebarLinks, 500);
          }
        };

        // Listen for menu button clicks to inject when sidebar opens
        document.addEventListener(
          "click",
          (e) => {
            if (e.target.closest('button[aria-label="Open navigation menu"]')) {
              tryInject();
            }
          },
          { passive: true, capture: false }
        );
      }
    });

    // Register a valid plugin if supported.
    // Actually, Tina v1 doesn't have a simple "LogoPlugin".
    // The most reliable non-custom-admin-mount way is to use the `ui` prop in config?
    // No.
    return cms;
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") return "/";
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              { type: "string", name: "title", label: "Meta Title" },
              {
                type: "string",
                name: "description",
                label: "Meta Description",
                ui: { component: "textarea" },
              },
              { type: "string", name: "canonical", label: "Canonical URL" },
              { type: "image", name: "image", label: "Social Share Image" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "badgeText", label: "Badge Text" },
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  {
                    type: "image",
                    name: "backgroundImage",
                    label: "Background Image",
                  },
                  { type: "string", name: "ctaText", label: "CTA Button Text" },
                  { type: "string", name: "ctaLink", label: "CTA Link" },
                  {
                    type: "string",
                    name: "secondaryCtaText",
                    label: "Secondary CTA Text",
                  },
                  {
                    type: "string",
                    name: "secondaryCtaLink",
                    label: "Secondary CTA Link",
                  },
                  {
                    type: "string",
                    name: "trustedText",
                    label: "Trusted By Text",
                  },
                  {
                    type: "string",
                    name: "cardTitle",
                    label: "Floating Card Title",
                  },
                  {
                    type: "string",
                    name: "cardSubtitle",
                    label: "Floating Card Subtitle",
                  },
                  {
                    type: "string",
                    name: "cardDescription",
                    label: "Floating Card Description",
                    ui: { component: "textarea" },
                  },
                ],
              },
              {
                name: "about",
                label: "About",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "string",
                    name: "content",
                    label: "Content",
                    ui: { component: "textarea" },
                  },
                  { type: "image", name: "image", label: "Image" },
                  {
                    type: "string",
                    name: "stat1Number",
                    label: "Stat 1 Number",
                  },
                  { type: "string", name: "stat1Label", label: "Stat 1 Label" },
                  {
                    type: "string",
                    name: "stat2Number",
                    label: "Stat 2 Number",
                  },
                  { type: "string", name: "stat2Label", label: "Stat 2 Label" },
                ],
              },
              {
                name: "services",
                label: "Services",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Service Items",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                      { type: "image", name: "image", label: "Image" },
                      {
                        type: "string",
                        name: "icon",
                        label: "Icon Number (01, 02..)",
                      },
                      {
                        type: "string",
                        list: true,
                        name: "features",
                        label: "Features List",
                      },
                    ],
                  },
                ],
              },
              {
                name: "whyChoose",
                label: "Why Choose Us",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  {
                    type: "object",
                    list: true,
                    name: "benefits",
                    label: "Benefits",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                      // Note: Icons are complex to edit visually without a picker.
                      // For simplicity in this demo, we'll keep icons hardcoded based on index or add a simple selector later if needed.
                    ],
                  },
                ],
              },
              {
                name: "process",
                label: "Process",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "ctaText", label: "CTA Text" },
                  {
                    type: "object",
                    list: true,
                    name: "steps",
                    label: "Steps",
                    fields: [
                      { type: "string", name: "number", label: "Step Number" },
                      { type: "string", name: "title", label: "Title" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
              {
                name: "testimonials",
                label: "Testimonials",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Reviews",
                    fields: [
                      { type: "string", name: "name", label: "Name" },
                      { type: "string", name: "role", label: "Role" },
                      {
                        type: "string",
                        name: "text",
                        label: "Review Text",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
              {
                name: "faq",
                label: "FAQ",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  {
                    type: "object",
                    list: true,
                    name: "questions",
                    label: "Questions",
                    fields: [
                      { type: "string", name: "question", label: "Question" },
                      {
                        type: "string",
                        name: "answer",
                        label: "Answer",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
              {
                name: "cta",
                label: "Call to Action",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  { type: "string", name: "buttonText", label: "Button Text" },
                  {
                    type: "string",
                    name: "secondaryButtonText",
                    label: "Secondary Button Text",
                  },
                ],
              },
              {
                name: "contact",
                label: "Contact",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  { type: "string", name: "intro", label: "Intro Text" },
                  {
                    type: "string",
                    name: "address",
                    label: "Address",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "email", label: "Email" },
                  {
                    type: "string",
                    name: "secondaryEmail",
                    label: "Secondary Email",
                  },
                  { type: "string", name: "phone", label: "Phone" },
                ],
              },
              {
                name: "booking",
                label: "Booking Form Section",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                ],
              },
              {
                name: "leaveReview",
                label: "Leave Review Form",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                ],
              },
              {
                name: "pageHeader",
                label: "Page Header",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading" },
                  { type: "image", name: "image", label: "Background Image" },
                ],
              },
              {
                name: "contentGrid",
                label: "Content Grid (Mission/Vision)",
                fields: [
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Items",
                    fields: [
                      { type: "string", name: "heading", label: "Heading" },
                      {
                        type: "string",
                        name: "content",
                        label: "Content",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Global",
        name: "global",
        path: "content/global",
        format: "json",
        format: "json",
        // ui: {
        //   global: true,
        // },
        fields: [
          {
            type: "string",
            name: "googleAnalyticsId",
            label: "Google Analytics Measurement ID (G-XXXXXXXXXX)",
          },
          {
            type: "string",
            name: "googleReviewLink",
            label: "Google Reviews Link (e.g. https://g.page/r/...)",
          },
          {
            type: "string",
            name: "tawkToId",
            label: "Tawk.to Property ID (e.g. 1234567890abcdef/1a2b3c4d)",
            description:
              "Find this in Tawk.to Dashboard > Administration > Channels > Chat Widget",
          },

          {
            type: "object",
            label: "Header",
            name: "header",
            fields: [
              {
                type: "image",
                label: "Logo",
                name: "logo",
              },
              {
                type: "string",
                label: "Company Name",
                name: "companyName",
              },
              {
                type: "string",
                label: "Tagline",
                name: "tagline",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            label: "Footer",
            name: "footer",
            fields: [
              {
                type: "image",
                label: "Footer Logo",
                name: "logo",
              },
              {
                type: "object",
                label: "Service Links",
                name: "serviceLinks",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item.label }),
                },
                fields: [
                  { type: "string", label: "Label", name: "label" },
                  { type: "string", label: "URL", name: "url" },
                ],
              },
              {
                type: "object",
                label: "Contact Info",
                name: "contact",
                fields: [
                  {
                    type: "string",
                    label: "Address",
                    name: "address",
                    ui: { component: "textarea" },
                  },
                  { type: "string", label: "Phone", name: "phone" },
                  { type: "string", label: "Email", name: "email" },
                ],
              },
              {
                type: "object",
                label: "Newsletter",
                name: "newsletter",
                fields: [
                  { type: "string", label: "Heading", name: "heading" },
                  { type: "string", label: "Text", name: "text" },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Theme",
            name: "theme",
            fields: [
              {
                type: "string",
                label: "Primary Color (Purple)",
                name: "primaryColor",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Accent Color (Gold)",
                name: "accentColor",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                label: "Heading Font",
                name: "headingFont",
                options: [
                  "Mona Sans",
                  "Syne",
                  "Manrope",
                  "Inter",
                  "Roboto",
                  "Open Sans",
                  "Lato",
                  "Poppins",
                  "Montserrat",
                  "Playfair Display",
                  "Reddit Sans",
                  "DM Sans",
                  "Work Sans",
                  "Plus Jakarta Sans",
                  "Outfit",
                  "Space Grotesque",
                  "Crimson Text",
                  "Oswald",
                  "Raleway",
                ],
              },
              {
                type: "string",
                label: "Body Font",
                name: "bodyFont",
                options: [
                  "Satoshi",
                  "Manrope",
                  "Syne",
                  "Inter",
                  "Roboto",
                  "Open Sans",
                  "Lato",
                  "Poppins",
                  "Montserrat",
                  "Playfair Display",
                  "Reddit Sans",
                  "DM Sans",
                  "Work Sans",
                  "Plus Jakarta Sans",
                  "Outfit",
                  "Space Grotesque",
                  "Crimson Text",
                  "Oswald",
                  "Raleway",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
