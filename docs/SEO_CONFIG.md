# SEO Configuration & Best Practices - Dorabel Logistics

## Site-Wide Configuration

### Domain & URLs
- **Primary Domain**: `https://dorabel.co.uk`
- **Vercel Preview**: `dorabel-logistics.vercel.app` (noindex via robots.txt)
- **Preferred URL Format**: lowercase, hyphens for spaces
- **Trailing Slash**: No trailing slash (e.g., `/services` not `/services/`)

### Meta Tags Configuration

#### Global Meta Tags (in `index.html`)
```html
<!-- Always present -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#2A0E61" />
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- Company branding -->
<meta name="application-name" content="Dorabel International" />
<meta name="apple-mobile-web-app-title" content="Dorabel" />

<!-- Trust & Security -->
<meta name="format-detection" content="telephone=no" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

#### Page-Specific Meta Tags
Handler: `src/utils/seo.js` (useSeo hook)

**Example - Home Page**:
```javascript
useSeo({
  seo: {
    title: "Dorabel International - UK-Based Logistics & Transport Services",
    description: "Dorabel International provides dependable transport support and coordination for commercial clients. Efficient, compliant, and cost-effective logistics.",
    image: "/uploads/og_image.png",
    canonical: "https://dorabel.co.uk/",
  }
});
```

## Structured Data (Schema.org)

### Enabled Schemas
Handler: `src/components/StructuredData.jsx`

1. **Organization Schema** - Core business identity
   - Used by: Search engines, AI models, social platforms
   - Example: Company name, logo, contact info, location

2. **LocalBusiness Schema** - Local search optimization
   - Address, phone, business hours
   - Geo coordinates: 54.0905, -1.3959 (Boroughbridge, UK)

3. **Service Schema** - For each service offering
   - Service name, description, provider reference
   - Area served, service type

4. **FAQ Schema** - Q&A format
   - Helps AI engines understand FAQ section
   - Improves "People also ask" in SERPs

5. **WebSite Schema** - Site identity
   - URL, name, description, publisher reference

6. **BreadcrumbList Schema** - Navigation structure
   - Handler: `useBreadcrumbs()` hook in seo.js
   - Injected via `<Breadcrumb>` component

### How to Add Page-Specific Schema

Use `useBreadcrumbs()` for breadcrumb navigation:

```jsx
import { useBreadcrumbs } from "../utils/seo";
import { Breadcrumb } from "../components/Breadcrumb";

export default function ServicesPage() {
  useBreadcrumbs([
    { name: "Services", url: "/services" },
    { name: "Transport Support", url: "/services#transport" }
  ]);

  return (
    <>
      <Breadcrumb items={[...]} />
      {/* Page content */}
    </>
  );
}
```

## Robots Meta Directives

### Configuration
Handler: `src/utils/seo.js` (buildRobotsDirective)

**Default**: `index, follow` (all indexable pages)

**Per-page override**:
```javascript
useSeo({
  seo: {
    title: "...",
    noindex: true,  // For duplicate/staging pages
    follow: true,   // Default: follow links
    robots: "noindex, nofollow" // Custom override
  }
});
```

### Page-Specific Guidelines
| Page | robots | Reason |
|------|--------|--------|
| All main pages | index, follow | Primary content |
| /admin | noindex, nofollow | Staging/internal |
| Thank you pages | noindex, follow | Transient content |
| Search results | noindex, follow | Duplicate filtered content |

## Open Graph (OG) & Social Sharing

### Configuration
All pages automatically updated via `useSeo()` hook

**Required for all pages**:
- `og:title` - Page title
- `og:description` - Meta description
- `og:image` - 1200x630px minimum
- `og:url` - Canonical URL
- `og:type` - "website" (default)

**Testing tools**:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Image Best Practices
- Format: JPG (preferred), PNG, WebP
- Size: 1200x630px (16:9 ratio)
- Max file size: 500KB
- Alt text: Same as page title

## Canonical URLs

### Policy
- **Always set**: Even for paginated content
- **Format**: Full URL with protocol
- **Example**: `https://dorabel.co.uk/services`

### Self-referential
Default behavior: Each page has canonical to itself

```html
<link rel="canonical" href="https://dorabel.co.uk/services" />
```

### Duplicate Content
If same content on multiple URLs, point to primary:
```javascript
useSeo({
  seo: {
    canonical: "https://dorabel.co.uk/services" // Primary URL
  }
});
```

## Sitemaps & Robots.txt

### Sitemap
- **Path**: `/public/sitemap.xml`
- **Format**: XML 0.9
- **Routes**: 6 main pages
- **Update frequency**: 
  - Homepage: Weekly
  - Other pages: Monthly
  - Review page: Monthly (conversional)

**Generation**: Run `npm run generate:sitemap` to update

### Robots.txt
- **Path**: `/public/robots.txt`
- **Config**:
  ```
  User-agent: *
  Allow: /
  Disallow: /admin/
  Disallow: /_next/
  Disallow: /api/
  Sitemap: https://dorabel.co.uk/sitemap.xml
  ```

## Heading Hierarchy

### Organization Standard

Every page should follow:
```
H1 (1 per page) - Main topic
  H2 (multiple) - Section headers
    H3 (optional) - Subsections
```

**NEVER**: Skip heading levels (H1 > H3) or use H1 for styling

### By Page

**Home Page**:
```
H1: Always Delivering Excellence
  H2: Efficient Transport Support
  H2: Comprehensive Logistics Solutions
  ├ H3: Same-Day & Express Delivery
  ├ H3: Supply Chain Coordination
  └ H3: Global Logistics Solutions
  H2: Why Choose Dorabel?
  H2: Our Process
  H2: Testimonials
```

**Services Page**:
```
H1: Our Services
  H2: Service Category 1
  H2: Service Category 2
  H2: Why Our Services?
```

## Core Web Vitals Optimization

### Targets (Google 90th percentile)
- **LCP** (Largest Contentful Paint): ≤ 2.5s
- **FID** (First Input Delay): ≤ 100ms
- **CLS** (Cumulative Layout Shift): ≤ 0.1
- **INP** (Interaction to Next Paint): ≤ 200ms
- **TTFB** (Time to First Byte): ≤ 800ms

### Monitoring
Handler: `src/utils/webVitals.js`

Integration in `App.jsx`:
```javascript
import { initWebVitals } from "./utils/webVitals";

// In useEffect or component init
initWebVitals((metric) => {
  console.log(metric);
  // Send to GA or custom endpoint
});
```

## Cache Headers (Vercel)

### Configuration File
`vercel.json`:

Recommended headers for SEO:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/uploads/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## SEO Checklist Before Deploy

### Content
- [ ] Title: 50-60 characters
- [ ] Meta description: 150-160 characters
- [ ] H1: Single, descriptive
- [ ] Headings: Proper hierarchy
- [ ] No keyword stuffing
- [ ] Internal links: 3-7 per page

### Technical
- [ ] Canonical URL set
- [ ] OG tags valid
- [ ] Mobile friendly
- [ ] Core Web Vitals good
- [ ] No 404s in navigation
- [ ] Structured data valid (schema.org)

### Performance
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTFB < 800ms
- [ ] Images optimized
- [ ] Cache headers set

### Accessibility
- [ ] Alt text on all images
- [ ] Color contrast WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] No auto-playing media

## Monitoring Tools

### Free Tools
- **Google Search Console**: https://search.google.com/search-console/
- **Google Analytics 4**: https://analytics.google.com/
- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **SEO Meta tags inspector**: Browser extension

### Premium Tools
- Ahrefs
- SEMRush
- Moz
- Screaming Frog

## Monthly SEO Audit

### Check
1. Search Console: New errors, index coverage
2. Analytics: Organic traffic trends
3. Rankings: Track 10-20 key terms
4. Core Web Vitals: Performance metrics
5. Backlinks: New referring domains
6. Competitors: What are they ranking for?

### Update
1. Update content for top-performing pages
2. Add internal links to underperforming pages
3. Refresh old blog posts (if applicable)
4. Improve CTR with better titles/descriptions

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Not indexing | robots.txt issue | Check Search Console, remove noindex tag |
| Low CTR | Poor title/description | Update OG tags, test in search preview |
| Slow LCP | Large hero image | Optimize image, use lazy loading |
| Broken links | Moved content | Update internal links, set redirects |
| Duplicate content | Multiple URLs | Set canonical to primary version |

---

**Last Updated**: 2026-02-09
**Next Review**: 2026-03-09
**Owner**: SEO Team
