# Tina CMS SEO Field Templates Configuration

## TinaCMS Schema Extensions for SEO

Add these field templates to your Tina page schemas to enable rich SEO editing in the admin interface.

### Add to `tina/config.js` Page Schema

```javascript
// SEO Field Template (add to page fields array)
{
  type: "object",
  name: "seo",
  label: "SEO Settings",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Meta Title",
      description: "50-60 characters. Include primary keyword.",
      ui: {
        validate: (value) => {
          if (!value) return "Title is required";
          if (value.length > 70) return "Title too long (max 70 chars)";
          if (value.length < 30) return "Title too short (min 30 chars)";
        }
      }
    },
    {
      type: "string",
      name: "description",
      label: "Meta Description",
      description: "140-160 characters. Summary of page content.",
      ui: {
        component: "textarea",
        validate: (value) => {
          if (!value) return "Description is required";
          if (value.length > 160) return "Too long (max 160 chars)";
          if (value.length < 120) return "Too short (min 120 chars)";
        }
      }
    },
    {
      type: "string",
      name: "keywords",
      label: "Focus Keywords",
      description: "3-5 main keywords, comma-separated. For internal reference only.",
    },
    {
      type: "string",
      name: "canonical",
      label: "Canonical URL",
      description: "Full URL. Usually auto-generated from page path.",
      ui: {
        validate: (value) => {
          if (value && !value.startsWith("https://")) return "Must start with https://";
        }
      }
    },
    {
      type: "image",
      name: "image",
      label: "Social Share Image (OG Image)",
      description: "1200x630px JPG. Use for all social platforms.",
    },
    {
      type: "boolean",
      name: "noindex",
      label: "Hide from Search Engines (noindex)",
      description: "Check this to prevent Google from indexing this page.",
    },
    {
      type: "boolean",
      name: "follow",
      label: "Allow Following Links",
      description: "Uncheck to add nofollow to all links on page.",
    },
    {
      type: "string",
      name: "robots",
      label: "Custom Robot Meta",
      description: "Advanced: Override with custom robots directive (e.g., 'noindex, nofollow')",
    },
    {
      type: "object",
      name: "hreflangs",
      label: "Language Alternatives (hreflang)",
      description: "For multi-language pages (future feature)",
      list: true,
      ui: {
        itemProps: (item) => ({ label: `${item?.lang || ''} - ${item?.url || ''}` }),
      },
      fields: [
        {
          type: "string",
          name: "lang",
          label: "Language Code",
          description: "e.g., en-US, en-GB, de, fr",
        },
        {
          type: "string",
          name: "url",
          label: "URL",
          description: "Full URL for this language version",
        },
      ],
    },
  ],
},

// Heading & Content Quality
{
  type: "string",
  name: "heading",
  label: "Page Heading (H1)",
  description: "Main heading - appears in title tag too",
  ui: {
    validate: (value) => {
      if (!value) return "H1 is required";
      if (value.length > 100) return "Too long";
    }
  }
},

{
  type: "string",
  name: "subheading",
  label: "Subheading (H2)",
  description: "Secondary message - aim for 100-150 chars",
  ui: {
    component: "textarea"
  }
},
```

### Implementation Example

**In `content/pages/services.md` frontmatter:**

```yaml
---
title: Services
heading: "Our Services"
subheading: "Comprehensive Logistics Solutions for Your Business"

seo:
  title: "Our Services - Transport, Logistics & Procurement"
  description: "Comprehensive logistics services including transport coordination, supply chain management, global freight, and business support. 24/7 availability."
  keywords: "transport services, logistics, UK freight, supply chain, logistics solutions"
  canonical: "https://dorabel.co.uk/services"
  image: /uploads/og_image.png
  noindex: false
  follow: true

blocks:
  # ... page blocks
---
```

### SEO Field Best Practices in Tina

1. **Required Fields**:
   - Title (auto-capitalize)
   - Description
   - Canonical URL
   - OG Image

2. **Validation Rules**:
   - Title: 50-70 chars
   - Description: 140-160 chars
   - Keywords: 3-5 terms
   - No special characters in URLs

3. **Content Warnings**:
   - Show character count in real-time
   - Warn if keyword not in title
   - Suggest reading time
   - Preview SERP snippet

4. **Editing Tips**:
   - Edit content first, then SEO metadata
   - Use natural keywords, not stuffed
   - Make description compelling (it's your ad copy)
   - Keep canonical to page path by default

## Tina Admin UI Customization

Add to `tina/config.js` in admin customization section:

```javascript
// Custom SEO sidebar info
const seoTips = {
  "/": "Homepage: Higher priority (1.0). Update weekly.",
  "/services": "Landing page: High conversion focus. Include CTAs.",
  "/about": "Trust-building: Add team photos, credentials.",
  "/contact": "Conversion page: Optimize for query intent.",
  "/booking": "Transaction page: Clear call-to-action.",
  "/leave-review": "Social proof: Encourage user-generated content.",
};

// Show tips based on current page
const pageHints = seoTips[currentPage] || "Remember: SEO is ongoing. Review monthly.";
```

## SEO Checklist Template for Editors

When publishing a new page, verify:

- [ ] **Title**: 50-70 characters, includes main keyword
- [ ] **Description**: 140-160 characters, compelling copy
- [ ] **Keywords**: 3-5 focus keywords identified
- [ ] **H1 (Heading)**: Single, descriptive, matches intent
- [ ] **Image**: 1200x630px, relevant, alt text set
- [ ] **Links**: 3-5 internal links to related pages
- [ ] **Canonical**: Points to correct URL
- [ ] **Update Frequency**: Accurate for page type
- [ ] **Content Length**: 300+ words (minimum)
- [ ] **Spelling/Grammar**: Proofread for errors

## Future Enhancements

1. **AI-Powered SEO Suggestions**:
   - Suggest title variations
   - Generate meta descriptions
   - Identify keyword opportunities

2. **Real-Time Analytics**:
   - Show current search rankings
   - Display traffic predictions
   - Suggest high-impact edits

3. **Content Recommendations**:
   - Similar pages with better rankings
   - Internal link opportunities
   - Competitor analysis

---

**Last Updated**: 2026-02-09
**Tina Version**: v1.5+
**Maintained by**: SEO & Content Team
