# Internal Linking Strategy - Dorabel Logistics

## Overview
Internal linking helps search engines understand site structure and distributes page authority. All internal links should be strategic and purposeful.

## Link Distribution & Authority Flow

### Tier 1: Hub Pages (HIGH Authority)
These pages should link OUT the most to distribute authority:
- **Home** (/)
- **Services** (/services)
- **About** (/about)

### Tier 2: Conversion Pages (HIGH Priority)
These pages should receive INBOUND links from other pages:
- **Contact** (/contact)
- **Booking** (/booking)
- **Leave Review** (/leave-review)

## Link Placement Guidelines

### 1. **Navigation Links** (Global)
Currently in: `Navbar.jsx` and `Footer.jsx`

**Essential links on all pages:**
```
Home > Services > About > Contact > Booking > Leave Review
```

**Status**: ✅ Already implemented

### 2. **Contextual Links** (Body Copy)

#### Home Page
Link to:
- Services (service overview section)
- About (value proposition)
- Contact (CTA)
- Booking (main CTA)

**Example placement:**
```jsx
<p>
  We offer comprehensive <Link to="/services">logistics services</Link> including 
  transport, supply chain coordination, and international freight. 
  <Link to="/contact">Get in touch today</Link> to discuss your needs.
</p>
```

#### Services Page
Link to:
- Home (breadcrumb)
- Individual service detail pages (when created)
- Booking (CTA)
- Contact (alternative CTA)

#### About Page
Link to:
- Services (our capabilities)
- Contact (engagement)
- Booking (conversion)

#### Contact Page
Link to:
- Services (if they ask about specific services)
- Booking (alternative contact method)
- Home (sitemap alternative)

#### Booking Page
Link to:
- Services (to review options)
- Contact (if form submission not ideal)
- About (build trust before committing)

#### Leave Review Page
Link to:
- Home (main navigation)
- Services (browsing option)
- Contact (if issue with review)

## Anchor Text Standards

### ✅ Good Anchor Text
- Descriptive: "Our logistics services" (not "click here")
- Keyword-rich: "Same-day delivery options"
- Natural: Reads naturally in context
- Unique: Vary anchor text across links

### ❌ Avoid
- "Click here", "Read more", "Link"
- Over-optimization: "Best UK logistics services"
- Excessive keyword stuffing
- Repeating same anchor on multiple pages

### Anchor Text Examples by Context

| Link Purpose | Anchor Text |
|-------------|------------|
| Service navigation | "Our transport services" |
| CTA | "Book now" or "Get a quote" |
| Trust building | "Learn about our team" |
| Related content | "Supply chain solutions" |

## Internal Link Implementation Checklist

### Phase 1: Navigation (DONE)
- [x] Global navbar links
- [x] Footer links
- [ ] Breadcrumb implementation (see Breadcrumb.jsx)

### Phase 2: Contextual Links (TODO)
- [ ] Home page: Add 3-4 strategic links to Services, About, Contact
- [ ] Services page: Link to Contact & Booking CTAs
- [ ] About page: Link to Services & Booking
- [ ] Contact page: Add alternative pathway link
- [ ] Booking page: Add trust-building link to About

### Phase 3: Monitoring (TODO)
- [ ] Setup Google Search Console internal link reports
- [ ] Track internal link clicks in GA
- [ ] Monitor 404s from broken internal links
- [ ] Quarterly audit of link distribution

## Link Building Example Code

```jsx
// In Services.jsx or component
import { Link } from "react-router-dom";

<div className="mt-6">
  <p className="text-gray-700">
    Ready to optimize your logistics? <Link to="/contact" className="text-dorabel-purple hover:text-dorabel-gold font-semibold">Contact our team</Link> or <Link to="/booking" className="text-dorabel-purple hover:text-dorabel-gold font-semibold">book now</Link>.
  </p>
</div>
```

## Breadcrumb Navigation

Implement on all non-home pages:

```jsx
import { Breadcrumb } from "./components/Breadcrumb";

<Breadcrumb 
  items={[
    { name: "Services", url: "/services" },
    { name: "Transport Support", url: "/services#transport" }
  ]} 
/>
```

## Future: Service-Specific Pages

When adding individual service pages:
```
/services/same-day-delivery
/services/supply-chain-coordination
/services/international-logistics
/services/business-support
```

Each should link:
- TO: Home, Services overview, Related services, Contact, Booking
- FROM: Services overview, Related content

## Link Density Guidelines

- **Ideal internal links per page**: 3-7
- **Links in body**: 2-4
- **Links in navigation**: 1 (global)
- **Links in CTA**: 1-2

Too many links dilute authority; too few miss SEO opportunities.

## Avoid Common Mistakes

❌ **DON'T**: Link same page to itself
❌ **DON'T**: Hide links with white text or display:none
❌ **DON'T**: Use nofollow on internal site navigation
❌ **DON'T**: Create link farms or excessive link pages
❌ **DON'T**: Use "target=_blank" unless absolutely necessary

✅ **DO**: Use semantic link elements `<a>` and `<Link>`
✅ **DO**: Vary anchor text naturally
✅ **DO**: Link contextually in body content
✅ **DO**: Regularly audit link structure

## Monitoring & Reporting

Use Google Search Console to track:
1. Internal links per page
2. Click-through rates on internal links
3. Pages with no inbound internal links (orphan pages)
4. Broken internal links (404s)

---

**Last Updated**: 2026-02-09
**Review Frequency**: Monthly
**Owner**: SEO Team
