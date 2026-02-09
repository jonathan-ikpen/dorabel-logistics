# Social Share Optimization Guide - Dorabel Logistics

## Overview

Proper Open Graph (OG) and Twitter Card implementation ensures your content looks great when shared on social platforms.

## OG Tags (Facebook, LinkedIn, Pinterest)

### Required Tags

All pages must include these:

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://dorabel.co.uk/page" />
<meta property="og:title" content="Page Title Here" />
<meta property="og:description" content="Page description..." />
<meta property="og:image" content="https://dorabel.co.uk/uploads/og_image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Image alt text" />
<meta property="og:site_name" content="Dorabel International" />
```

### Implementation

Automatically handled by `useSeo()` hook in `src/utils/seo.js`

```javascript
useSeo({
  seo: {
    title: "Page Title",
    description: "Page description",
    image: "/uploads/my-image.jpg",
    canonical: "https://dorabel.co.uk/page"
  }
});
```

## Twitter Card Tags

### Card Types

- **summary_large_image** (default) - Best for most content
- **summary** - Title + small image
- **player** - For video/audio content

### Required Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@DorabelLogistics" />
<meta name="twitter:creator" content="@DorabelLogistics" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://dorabel.co.uk/uploads/og_image.png" />
<meta name="twitter:image:alt" content="Image alt text" />
```

### Implementation

Also handled by `useSeo()` hook

## LinkedIn Professional Network

### Company Page Optimization

For LinkedIn shares (business networking):

```html
<meta property="og:type" content="article" />
<meta name="article:publisher" content="https://www.linkedin.com/company/dorabel-international" />
<meta name="article:author" content="Dorabel International" />
<meta name="article:published_time" content="2026-02-09T00:00:00Z" />
```

## Image Specifications

### Size Requirements

| Platform | Image Size | Ratio | Format |
|----------|-----------|-------|--------|
| Facebook | 1200x630px | 16:9 | JPG, PNG, WebP |
| Twitter | 1200x675px | 16:9 | JPG, PNG, WebP |
| LinkedIn | 1200x627px | 16:9 | JPG, PNG |
| WhatsApp | 1200x630px | 16:9 | JPG, PNG |
| Telegram | 1280x720px | 16:9 | JPG, PNG |

**Best Practice**: Use 1200x630px for all platforms

### Image Quality

- **File size**: 500KB max
- **Format**: JPG (best compression)
- **Compression**: Optimize without visible quality loss
- **Alt text**: Mandatory for accessibility

## Testing Your Sharing

### Tool 1: Facebook Sharing Debugger

- **URL**: <https://developers.facebook.com/tools/debug/>
- **What it shows**: How your page appears in Facebook newsfeeds
- **Action**: Paste your page URL and click "Scrape Again" to refresh cache

### Tool 2: Twitter Card Validator

- **URL**: <https://cards-dev.twitter.com/validator>
- **What it shows**: Preview of Twitter/X share
- **Action**: Enter page URL and view card preview

### Tool 3: LinkedIn Post Inspector

- **URL**: <https://www.linkedin.com/post-inspector/>
- **What it shows**: How it looks in LinkedIn feeds
- **Action**: Paste URL to see preview

### Tool 4: WhatsApp Link Preview

- **No official tool**, but you can:
  - Send link in WhatsApp chat
  - Preview appears automatically
  - Check title, description, image

## Common Issues & Fixes

### Image Not Showing

**Problem**: OG image displays broken/blank

**Causes**:

- Image URL not absolute (must start with https://)
- Image file not found (404)
- Image too large (>500KB)
- Image dimensions wrong

**Fix**:

```javascript
// ❌ Wrong
image: "/uploads/og.jpg"

// ✅ Correct
image: "https://dorabel.co.uk/uploads/og.jpg"
```

### Old Image Still Shows

**Problem**: Updated OG image but old one still cached

**Fix**:

1. Use Facebook Debugger to "Scrape Again"
2. Twitter caches for 7 days (no bypass)
3. LinkedIn: Clear cache or wait 24 hours
4. For critical issues: Change URL slightly (og.jpg → og-v2.jpg)

### Title/Description Cut Off

**Problem**: Text truncated on social preview

**Limits**:

- Title: max 60 characters
- Description: max 160 characters
- Test in actual preview tools

**Fix**: Make text shorter or reword

### Special Characters Breaking Preview

**Problem**: Emojis, quotes, or accents breaking layout

**Solution**:

- Remove emojis from title/description
- Use HTML entities for special chars: `&quot;` for ", `&amp;` for &
- Avoid curly quotes, use straight quotes

## Per-Page Share Optimization

### Home Page

- **Title**: Dorabel International - UK-Based Logistics & Transport Services
- **Description**: Dorabel International provides dependable transport support and coordination for commercial clients...
- **Image**: `/uploads/og_image.png`

### Services Page

- **Title**: Our Services - Transport, Logistics & Procurement
- **Description**: Comprehensive logistics services including transport coordination, supply chain management...
- **Image**: `/uploads/services-og.jpg`

### Booking Page

- **Title**: Book an Appointment - Dorabel Logistics
- **Description**: Request a quote or book logistics services with Dorabel Logistics...
- **Image**: `/uploads/booking-og.jpg`

### Contact Page

- **Title**: Contact Us - Get a Free Quote Today
- **Description**: Get in touch with Dorabel Logistics for a free quote...
- **Image**: `/uploads/contact-og.jpg`

## Social Media Sharing Best Practices

### When Sharing

1. **Always use the OG tags**: Don't re-type the title/description
2. **Add context**: Write a compelling intro post, not just the link
3. **Include call-to-action**: "Learn how..." or "Discover..."
4. **Timing**: Share during peak hours (9-10 AM, 12-1 PM, 6-7 PM)

### Facebook Business Page Strategy

- Post engagement-focused intro: "Check out our latest services..."
- Tag relevant pages/people
- Use industry hashtags: #Logistics #Transport #UK
- Encourage shares: "Share with someone who needs logistics support"

### LinkedIn Company Strategy

- Share thought leadership content
- Tag employees for engagement boost
- Use hashtags: #Logistics #SupplyChain #Business
- Engage in comments within first hour

### Twitter/X Strategy

- Keep text short and punchy
- Use relevant hashtags: #Logistics #Transport
- Retweet positive mentions
- Engage with comments quickly

## Monitoring Social Shares

### Tools

- **Facebook Analytics**: business.facebook.com/analytics
- **Twitter Analytics**: analytics.twitter.com
- **LinkedIn Page Analytics**: LinkedIn admin panel

### Metrics to Track

- Number of shares/links
- Average engagement (likes, comments)
- Click-through rate (CTR)
- Best performing content types
- Peak sharing times

### Goals

- Increase brand awareness
- Drive website traffic
- Improve engagement metrics
- Build social proof (reviews, testimonials)

## Hashtag Strategy

### Best Hashtags for Dorabel

Primary:

- #DorabelLogistics
- #UKLogistics
- #TransportSupport

Reach:

- #LogisticsLife
- #SupplyChain
- #CourierServices

Niche:

- #DorabelInternational
- #Logistics2026
- #FreightForwarding

**Limit**: 3-5 per post (more looks spammy)

---

**Last Updated**: 2026-02-09
**Review**: Monthly
**Owner**: Marketing & Social Media Team
