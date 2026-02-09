# SEO Image Optimization Guide - Dorabel Logistics

## Image Best Practices

### 1. **File Size & Format**
- **Recommended formats**: WebP (modern browsers), JPEG (fallback), PNG (with transparency)
- **Optimal sizes**:
  - Hero images: 1200x630px (16:9 ratio)
  - OG images: 1200x630px (minimum)
  - Thumbnail images: 400x300px
  - Max file size: 500KB per image
- **Tools for optimization**:
  - ImageOptim (free, macOS)
  - TinyPNG / Tinyjpg (online)
  - ImageMagick (CLI)

### 2. **Lazy Loading**
All images should use React lazy loading:

```jsx
import { LazyImage } from "./components/LazyImage";

<LazyImage 
  src="/uploads/my-image.jpg" 
  alt="Descriptive alt text"
  width={800}
  height={600}
/>
```

### 3. **Alt Text Strategy**

#### Required for ALL images:
- **Descriptive**: Explain what's in the image
- **Keyword-rich**: Include relevant logistics/transport terms
- **Concise**: 50-125 characters ideal
- **Unique**: Each image should have distinct alt text

#### Examples:

❌ **Bad**: "image", "photo", "picture"
✅ **Good**: "Dorabel Logistics fleet truck lined up at distribution centre"

❌ **Bad**: "DL-truck-2024-model-v3-final"
✅ **Good**: "Modern refrigerated lorry for temperature-controlled cargo transport"

❌ **Bad**: "Services - Transport Support"
✅ **Good**: "Same-day express courier delivery service across UK regions"

### 4. **OG Tags Image Requirements**

All shareable pages must have:
- **og:image**: 1200x630px minimum
- **og:image:alt**: Same as page title or description
- **twitter:image**: Same dimensions for consistency

Current OG image: `/uploads/og_image.png`

If creating page-specific OG images:
```jsx
useSeo({
  seo: {
    title: "Services - Dorabel Logistics",
    description: "...",
    image: "/uploads/services-og.jpg", // Page-specific
  }
});
```

### 5. **Image Accessibility**
- Never use images as text
- Decorative images should use `alt=""` (empty)
- SVG logos should have `<title>` and `role="img"`
- Ensure sufficient color contrast on images with text

### 6. **Responsive Images**

Use srcset for multiple screen sizes:

```jsx
<img
  src="/uploads/fleet-mobile.jpg"
  srcSet="/uploads/fleet-mobile.jpg 480w,
          /uploads/fleet-tablet.jpg 768w,
          /uploads/fleet-desktop.jpg 1200w"
  sizes="(max-width: 480px) 100vw,
         (max-width: 768px) 90vw,
         1200px"
  alt="Dorabel logistics fleet"
  loading="lazy"
/>
```

### 7. **Image Census**

Track all hero/OG images for SEO:

| Page | Image Path | Size | Alt Text | Last Updated |
|------|-----------|------|----------|--------------|
| Home | `/uploads/hero-logistics-branded.png` | 1920x1080 | "Always Delivering Excellence - Dorabel International logistics services" | 2026-02-09 |
| Services | `/uploads/service-hero.jpg` | 1200x630 | "Comprehensive logistics solutions for UK businesses" | TBA |
| About | `/uploads/about-team.jpg` | 1200x630 | "Dorabel logistics team meeting at head office" | TBA |
| Contact | `/uploads/contact-hero.jpg` | 1200x630 | "Contact Dorabel International for logistics support" | TBA |
| Booking | `/uploads/booking-hero.jpg` | 1200x630 | "Book logistics services with Dorabel" | TBA |
| LeaveReview | `/uploads/review-hero.jpg` | 1200x630 | "Share your experience with Dorabel Logistics" | TBA |

### 8. **Performance Monitoring**

Monitor image performance in:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

Check for:
- Unused images
- Oversized images
- Unoptimized formats
- Missing lazy loading

### 9. **Image Naming Convention**

For SEO-friendly file names:
```
✅ dorabel-refrigerated-lorry-transport.jpg
✅ same-day-courier-service-uk.jpg
✅ supply-chain-coordination-team.jpg

❌ image1.jpg
❌ photo-123.jpg
❌ IMG_5432.jpg
```

### 10. **Integration with TinaCMS**

When uploading images to Tina CMS:
1. Use meaningful filenames
2. Include alt text in the upload description
3. Verify image dimensions before upload
4. Test OG image on social platforms (Facebook Debugger, Twitter Card Validator)

---

**Last Updated**: 2026-02-09
**Maintained by**: SEO Team
