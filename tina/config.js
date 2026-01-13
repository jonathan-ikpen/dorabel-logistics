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
