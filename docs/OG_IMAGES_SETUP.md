# OG Images Setup Guide

## Overview

Open Graph (OG) images are essential for social media sharing. They appear when a link is shared on platforms like Facebook, LinkedIn, Twitter, etc.

## Current Status

✅ Middleware configured for OG image serving  
✅ Base OG image exists at `/public/uploads/og_image.png`  
⏳ Page-specific OG images needed  

## OG Image Specifications

- **Dimensions**: 1200 x 630 pixels (recommended by Facebook)
- **Format**: JPG or PNG (JPG recommended for file size)
- **File Size**: Under 2MB (ideally under 500KB)
- **Location**: `/public/uploads/` folder

## Page-Specific OG Images to Create

| Page | Image Name | Location | Description |
|------|-----------|----------|-------------|
| Home | `home-og.jpg` | `/public/uploads/home-og.jpg` | Brand hero image with Dorabel logo |
| Services | `services-og.jpg` | `/public/uploads/services-og.jpg` | Fleet/logistics imagery |
| About | `about-og.jpg` | `/public/uploads/about-og.jpg` | Company/team imagery |
| Contact | `contact-og.jpg` | `/public/uploads/contact-og.jpg` | Contact/location themed |
| Booking | `booking-og.jpg` | `/public/uploads/booking-og.jpg` | Action-oriented/CTA imagery |
| Leave Review | `review-og.jpg` | `/public/uploads/review-og.jpg` | Testimonial/feedback imagery |

## Current Middleware Configuration

In `middleware.js`, the OG images are served based on the route:

```javascript
const ogImageMap = {
  '/': '/uploads/og_image.png',
  '/services': '/uploads/og_image.png',
  '/about': '/uploads/og_image.png',
  '/contact': '/uploads/og_image.png',
  '/booking': '/uploads/og_image.png',
  '/leave-review': '/uploads/og_image.png',
};
```

## Steps to Setup Page-Specific OG Images

### Step 1: Create OG Images

Use a design tool (Figma, Canva, Photoshop, or free tools):

- **Recommended**: Vercel's OG Image Generator (<https://vercel.com/docs/og-image-generation>)
- **Free Alternative**: Canva, Figma templates
- **Design Requirements**:
  - Include Dorabel logo or branding
  - Add relevant page-specific imagery
  - Include page title text (optional but recommended)
  - Use brand colors: Purple (#2A0E61), Gold accent

### Step 2: Export Images

- Export as JPG format
- Optimize to ~200-300KB per image
- Name according to table above

### Step 3: Upload to Vercel

```bash
# Copy images to public/uploads/
cp ~/path/to/home-og.jpg public/uploads/home-og.jpg
cp ~/path/to/services-og.jpg public/uploads/services-og.jpg
cp ~/path/to/about-og.jpg public/uploads/about-og.jpg
cp ~/path/to/contact-og.jpg public/uploads/contact-og.jpg
cp ~/path/to/booking-og.jpg public/uploads/booking-og.jpg
cp ~/path/to/review-og.jpg public/uploads/review-og.jpg
```

### Step 4: Update Middleware (Optional)

Edit `middleware.js` to use page-specific images:

```javascript
const ogImageMap = {
  '/': '/uploads/home-og.jpg',
  '/services': '/uploads/services-og.jpg',
  '/about': '/uploads/about-og.jpg',
  '/contact': '/uploads/contact-og.jpg',
  '/booking': '/uploads/booking-og.jpg',
  '/leave-review': '/uploads/review-og.jpg',
};
```

## Testing OG Images

### Test Locally

```bash
# Start dev server
npm run dev

# Test with curl to simulate bot detection
curl -H "User-Agent: facebookexternalhit" \
  http://localhost:5173/services | grep -i "og:image"
```

Expected output:

```html
<meta property="og:image" content="https://dorabel.co.uk/uploads/services-og.jpg" />
```

### Test on Social Media

1. **Facebook**: Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
2. **LinkedIn**: Test each page URL in LinkedIn post composer
3. **Twitter**: Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

Steps:

1. Go to the service
2. Paste your page URL (e.g., `https://dorabel.co.uk/services`)
3. Check the preview image
4. If cached incorrectly, use "Rescrape" option

### Validate with SEO Tools

- [Metatags.io](https://metatags.io/) - Visual preview of all meta tags
- [Schema.org Validator](https://schema.org/validator) - Validate structured data

## Alternative: Dynamic OG Image Generation

For advanced setup, consider using Vercel's OG image generation API:

```javascript
// In middleware.js or API route
import { ImageResponse } from '@vercel/og';

export async function generateOGImage(pageTitle, description) {
  return new ImageResponse(
    (
      <div style={{
        background: '#2A0E61', // Dorabel purple
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
      }}>
        <h1>{pageTitle}</h1>
        <p>{description}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

Benefits:

- Dynamic text rendering per page
- No static files needed
- Always fresh imagery
- Can include data-driven content

## SEO Impact

OG images improve:

- **Click-through rate** from social media (estimated 30% increase)
- **Brand recognition** with consistent imagery
- **Social sharing** with professional appearance
- **Time to interact** - preview encourages clicks

## Checklist

- [ ] 6 OG images created (1200x630px, JPG)
- [ ] Images uploaded to `/public/uploads/`
- [ ] Middleware updated with page-specific image paths (if custom images used)
- [ ] Tested with at least one social platform (Facebook/LinkedIn)
- [ ] Validated with metatags.io or similar tool
- [ ] Optimized file sizes (under 300KB each)
- [ ] Deployed to production
- [ ] Monitor social engagement metrics

## Image Storage Location

```
public/
  uploads/
    og_image.png              (current: fallback)
    home-og.jpg               (new)
    services-og.jpg           (new)
    about-og.jpg              (new)
    contact-og.jpg            (new)
    booking-og.jpg            (new)
    review-og.jpg             (new)
```

## Troubleshooting

### Images not showing on social platforms

- **Solution**: Use [Facebook Debugger](https://developers.facebook.com/tools/debug/sharing/) to rescrape
- Cache busted? Add timestamp: `/uploads/home-og.jpg?v=2026`

### Image appears blurry or pixelated

- **Solution**: Verify image is exactly 1200x630px
- Scaling issues? Use ImageOptim to re-export

### 404 errors in social previews

- **Solution**: Verify file path in middleware matches actual file location
- Check image is in `/public/uploads/`, not `/src/` or `/public/`

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Facebook OG Debugger](https://developers.facebook.com/tools/debug/sharing/)
- [Vercel OG Image Generation](https://vercel.com/docs/og-image-generation)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards)

---

**Status**: Documentation complete, awaiting OG image creation  
**Priority**: High - Required before launch  
**Estimated Time**: 30-60 minutes to create 6 images
