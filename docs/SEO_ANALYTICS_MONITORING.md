# SEO Analytics & Monitoring Setup - Dorabel Logistics

## Overview
Proper SEO monitoring allows data-driven decisions and early detection of issues.

## Tool Stack

### 1. Google Search Console (FREE)
**Function**: Monitor how Google sees your site
**Setup**:
1. Go to https://search.google.com/search-console/
2. Add property: https://dorabel.co.uk
3. Verify with DNS TXT record or HTML file
4. Submit sitemap.xml

**Key Reports**:
- **Performance**: Rankings, impressions, CTR by query/page
- **Coverage**: Indexed pages, errors, warnings
- **Enhancements**: Structured data validation
- **Core Web Vitals**: Page experience metrics
- **Links**: Referring domains, internal link structure

**Monthly Actions**:
- Review top 50 search queries
- Check for indexing errors
- Verify sitemap submission
- Monitor Core Web Vitals
- Check for security issues

### 2. Google Analytics 4 (FREE)
**Function**: Track user behavior, traffic sources, conversions
**Setup**:
1. Create GA4 property: https://analytics.google.com/
2. Add measurement ID to site
3. Install Google Tag Manager (GTM) for advanced tracking

**Key Metrics**:
- Sessions, users, bounce rate
- Traffic by device (mobile/desktop)
- Traffic by source (organic, direct, referral)
- User journey & conversion funnels
- Event tracking (form submissions, clicks)

**Monthly Actions**:
- Review organic traffic trends
- Identify top landing pages
- Track goal completions (bookings, quotes)
- Compare month-over-month growth
- Analyze user paths to conversion

### 3. Google PageSpeed Insights (FREE)
**Function**: Monitor Core Web Vitals and performance
**Setup**:
1. Go to https://pagespeed.web.dev/
2. Test each page: /, /services, /about, /contact, /booking, /leave-review
3. Save baseline scores
4. Retest monthly

**Metrics to Track**:
- LCP (Largest Contentful Paint): Target < 2.5s
- FID/INP (Interaction): Target < 200ms
- CLS (Layout Shift): Target < 0.1
- TTFB (Server Response): Target < 800ms

**What CWV Affects**: Google ranking since June 2021 Core Web Vitals update

### 4. SEMRush (FREEMIUM)
**Function**: Competitive analysis, keyword research, rank tracking
**Setup**:
1. Create free account: https://www.semrush.com/
2. Add domain: dorabel.co.uk
3. Run site audit

**Useful Features** (free version):
- Organic research: See competitor keywords
- Domain analytics: Organic traffic estimate
- Position tracking: Monitor 10 keywords free
- Backlink analysis: See who links to you

### 5. Ahrefs (PAID - Optional)
**Function**: Backlink analysis, keyword research, competitor benchmarking
**Use case**: Check for backlink opportunities, high-authority referring sites

### 6. Moz (PAID - Optional)
**Function**: Domain authority tracking, keyword difficulty analysis
**Use case**: SEO authority benchmarking

## Implementation in Code

### Core Web Vitals Integration
Already implemented in `src/utils/webVitals.js`

**In `App.jsx`**:
```javascript
import { reportWebVitalsToGA } from "./utils/webVitals";

useEffect(() => {
  // Track Web Vitals if GA is loaded
  if (typeof gtag !== 'undefined') {
    reportWebVitalsToGA();
  }
}, []);
```

### Event Tracking Setup
Track important actions for conversion analysis:

```javascript
// Form submission event
const submitForm = async (data) => {
  gtag("event", "form_submit", {
    event_category: "engagement",
    event_label: "contact_form",
    form_type: "contact",
  });
  // Form submission logic...
};

// Booking click
const handleBookingClick = () => {
  gtag("event", "booking_click", {
    event_category: "engagement",
    event_label: "booking_initiated",
  });
};

// Service view
const trackServiceView = (serviceName) => {
  gtag("event", "service_view", {
    event_category: "content_view",
    event_label: serviceName,
  });
};
```

## Monitoring Dashboard Setup

### Google Sheets Dashboard
Create a monthly tracking sheet:

```
Date | Organic Traffic | Mobile | Desktop | Bounce Rate | Avg Session Duration | Top Query | Core Web Vitals
-----|-----------------|--------|---------|-------------|----------------------|-----------|----------------
Feb  |      1,234      |   65%  |   35%   |   45%       |       2:15           | logistics | Good
...
```

### Weekly Checklist

- [ ] Search Console: Any new errors?
- [ ] Analytics: Traffic trend up/down?
- [ ] Core Web Vitals: Status green?
- [ ] Broken links: Any 404s?
- [ ] New backlinks: Who's linking to us?

### Monthly Checklist

- [ ] Top 50 queries performing?
- [ ] Pages with low CTR - rewrite titles/descriptions
- [ ] Conversion funnel: Form submissions up?
- [ ] Core Web Vitals: Average scores
- [ ] Competitor ranking: How are we doing?
- [ ] Content audit: Old pages need refresh?
- [ ] Backlink analysis: High-authority opportunities?

### Quarterly Review

1. **Search Console Report**:
   - Total impressions, clicks, CTR
   - Search rankings (top 50 keywords)
   - Coverage issues resolved
   - Structured data errors fixed

2. **Analytics Report**:
   - Organic traffic growth vs last quarter
   - Mobile vs desktop performance
   - Top landing pages
   - Conversion rate & goal completions

3. **SEO Health Check**:
   - Core Web Vitals scores
   - Performance vs competitors
   - Backlink profile quality
   - Content gap analysis

## Keyword Tracking

### Target Keywords
Set up tracking for 20-30 target keywords:

**Tier 1 (High Value)**:
- "UK logistics services"
- "transport support"
- "supply chain coordination"
- "same-day delivery UK"
- "logistics support"

**Tier 2 (Medium Volume)**:
- "freight forwarding"
- "courier services"
- "business logistics"
- "transport coordination"
- "UK haulage"

**Tier 3 (Long Tail)**:
- "logistics support for SMEs"
- "same-day delivery London"
- "freight forwarding services UK"
- "supply chain management"
- "international logistics"

### Tracking Tools
- **Free**: Google Search Console (see impressions/clicks)
- **Freemium**: SEMRush (track 10 keywords)
- **Paid**: Rank Ranger, Serpstat

### Goals
- Homepage: Rank in top 10 for "UK logistics"
- Services: Rank in top 5 for "transport support"
- About: Rank for "logistics provider" queries
- Contact: Appear for "get quote" + location searches
- Booking: High visibility for "book logistics"

## Backlink Monitoring

### Building Quality Backlinks
- Get listed in business directories (Google Business Profile)
- Local partner websites
- Industry associations
- Relevant blogs (guest posts)
- Press mentions

### Tools
- Monitor with: Google Search Console, Ahrefs, Moz
- Target: 50+ referring domains, mostly quality > quantity

## Alert Setup

### Google Search Console Alerts
1. Go to Search Console settings
2. Enable email alerts for:
   - Crawl errors
   - Coverage issues
   - Mobile usability problems
   - Security issues

### Analytics Alerts
Setup GA4 alerts for:
- Traffic drop > 20% daily
- Conversion rate drop > 25%
- High bounce rate pages (> 70%)

## Red Flags to Monitor

🚨 **Critical Issues** (requires immediate action):
- Drop in organic traffic > 30%
- Indexing issues (pages not indexed)
- Manual action from Google (penalty)
- Security issue detected
- Core Web Vitals turn RED

⚠️ **Warning Signs** (investigate within week):
- Drop in impressions for target keywords
- Core Web Vitals ORANGE
- Increased 404 errors
- Bounce rate spike
- Form submission drop

## Reporting Template

**Monthly SEO Report**:

```
=== DORABEL LOGISTICS - MONTHLY SEO REPORT ===
Period: February 2026

TRAFFIC SUMMARY
- Organic sessions: 1,234 (↑12% vs prev month)
- Organic users: 1,050
- Bounce rate: 45%
- Avg session duration: 2:15

TOP PERFORMING PAGES
1. / - 450 sessions
2. /services - 280 sessions
3. /contact - 160 sessions

TOP KEYWORDS
1. "logistics services" - 12 impressions, 2 clicks
2. "transport support" - 8 impressions, 1 click
3. "UK logistics" - 5 impressions, 1 click

CORE WEB VITALS
- LCP: 2.1s ✅ (Good)
- CLS: 0.05 ✅ (Good)
- TTFB: 650ms ✅ (Good)

ACTIONS TAKEN This Month
- Updated /services page title
- Added internal links to /booking
- Optimized hero images

Next Month's Focus
- Improve CTR for "logistics" queries
- Add FAQ schema to /contact
- Refresh /about page content
```

## Tools Installation Summary

### Must-Have (Free)
1. ✅ Google Search Console
2. ✅ Google Analytics 4
3. ✅ Google PageSpeed Insights

### Nice-to-Have (Freemium)
4. SEMRush (free tier)
5. Moz (free tier)
6. Ubersuggest (free tier)

### Premium (Optional)
7. Ahrefs
8. Rank Ranger
9. Serpstat

## Timeline

**Week 1**: Setup Search Console + Analytics + GA4 tracking
**Week 2**: Establish baseline metrics + create tracking sheet
**Week 3**: Configure alerts, review historical data
**Week 4**: First monthly report, identify quick wins

---

**Last Updated**: 2026-02-09
**Review Cycle**: Monthly
**Owner**: SEO & Analytics Team
**Next Review**: 2026-03-09
