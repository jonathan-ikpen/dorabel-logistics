# Dorabel Logistics - Copilot Instructions

## Project Overview
A React 18 + Vite SPA for a UK logistics company (Dorabel International). The site combines marketing/branding with booking and review forms. Uses TinaCMS for content management, Zustand for state, and Framer Motion for animations.

**Key Tech Stack:**
- **Frontend**: React 18, React Router v6, Vite
- **Content Management**: TinaCMS (Markdown + GraphQL)
- **State Management**: Zustand (simple theme + user state)
- **Styling**: TailwindCSS + custom Dorabel color system
- **Animations**: Framer Motion with scroll-triggered reveals
- **SEO**: Manual meta tag management + structured data
- **Hosting**: Vercel (middleware.js for bot detection + SEO metadata injection)

## Architecture Essentials

### Data Flow Architecture
1. **TinaCMS as Source of Truth**: Global config (`content/global/index.json`) stores theme colors, fonts, and header config. Each page has markdown frontmatter (`.md` files in `content/pages/`).
2. **Runtime Theme Injection**: `App.jsx` reads Tina data and dynamically sets CSS variables (`--color-dorabel-purple`, `--color-dorabel-gold`, `--font-body`, `--font-heading`) to document root.
3. **SEO Dual Strategy**:
   - **Server-side** (bots): `middleware.js` intercepts requests, detects bot user agents, and injects metadata
   - **Client-side** (humans): `useSeo()` hook in `src/utils/seo.js` updates meta tags dynamically per page

### Component Organization
- **Pages** (`src/pages/`) - Full page layouts (Home, Services, About, Contact, Booking, LeaveReview)
- **Components** (`src/components/`) - Reusable UI building blocks
  - **Animation-heavy**: `Reveal.jsx`, `MaskReveal`, `ParallaxImage` (scroll-triggered Framer Motion)
  - **Forms**: `ContactForm.jsx`, `BookingForm.jsx`, `LeaveReviewForm.jsx` (all use mock API)
  - **Structure**: `Navbar`, `Header`, `Footer`, `Hero`, `Services`, `About`, `Contact`
- **Store** (`src/store/useStore.js`) - Zustand: theme toggle + basic user state
- **Utils**: `seo.js` (meta/OG tag management), `mockApi.js` (form handling)

### Styling System
- **Custom Dorabel Colors** (tailwind.config.js):
  - `dorabel-purple`: Primary (#2A0E61, dark royal), light (#6D28D9), dark (#1a0540)
  - `dorabel-gold`: Accent (dynamic from Tina), light (#F59E0B), dark (#B45309)
  - `dorabel-gray`: Neutrals (light, dim, dark variants)
- **Dynamic Fonts**: CSS variables loaded from Google Fonts API based on Tina config
- **Animation Tokens**: `spin-slow`, `float`, `pulse-glow` keyframes in tailwind

## Critical Workflows

### Local Development
```bash
npm install                # Install deps (Node 22+ required)
npm run dev               # Runs TinaCMS dev + Vite (hot reload)
# Open http://localhost:5173 + http://localhost:3000/admin for content editing
```

### Build & Deployment
```bash
npm run build            # TinaCMS build → vite build (outputs dist/)
npm run preview          # Preview production build locally (port 5173)
```
Vercel auto-deploys from `main`. Environment vars required: `TINA_CLIENT_ID`, `TINA_TOKEN`.

### Content Editing
1. Run `npm run dev`
2. Edit in `http://localhost:3000/admin` (TinaCMS UI) or directly edit markdown files in `content/`
3. Changes are live on next page reload

### Common Tasks
- **Add a new service**: Add entry to `localServices` array in `src/components/Services.jsx`, import image from `src/assets/`
- **Update colors**: Edit `content/global/index.json` theme > primaryColor/accentColor in Tina admin
- **Add SEO per page**: Update `useSeo()` hook call in page component OR add metadata to markdown frontmatter (Tina reads it)
- **Create form**: Follow `BookingForm.jsx` pattern (validate → call `mockApi.submitXXX()` → handle response)

## Code Patterns & Conventions

### Animation Pattern: Scroll-Triggered Reveals
Use `Reveal`, `MaskReveal`, `FadeIn` components (from `src/components/Reveal.jsx`). These wrap children and animate on scroll into viewport:
```jsx
<Reveal delay={0.2}>
  <h2>Content that slides up when visible</h2>
</Reveal>
```
Settings: `delay` (seconds), `width` (default "fit-content"), `once: true` (animate once per page load).

### Tina Field Editable Markers
Use `tinaField(data, "fieldName")` directive on elements to make content editable in Tina admin:
```jsx
<h1 data-tina-field={tinaField(data, "heading")}>{data.heading}</h1>
```
This enables inline editing without page reload.

### Form Submission Pattern
All forms (contact, booking, review) use `mockApi.js` functions that simulate async operations:
```jsx
// In component
const handleSubmit = async (formData) => {
  try {
    const response = await submitContact(formData);
    // Handle success (response.success, response.data)
  } catch (err) {
    // Handle error
  }
};
```
Replace `mockApi` functions with real API calls when backend is ready.

### SEO Implementation
- **Per-page setup**: Call `useSeo()` hook with page-specific data
- **Bot detection**: `middleware.js` intercepts requests, injects meta tags server-side for social crawlers
- **Canonical URLs**: Hardcoded in middleware for each route; update when domain changes
- **Structured Data**: `StructuredData.jsx` component generates JSON-LD (organization, breadcrumbs, schema)

### State Management (Zustand)
Keep store minimal. Current pattern: `const toggleTheme = useStore((s) => s.toggleTheme)`. For form data, use component state; only persist critical UI state in store.

## File Reference Guide

| File | Purpose |
|------|---------|
| `tina/config.js` | TinaCMS schema + admin sidebar customization |
| `content/global/index.json` | Global theme, fonts, header config (Tina source) |
| `content/pages/*.md` | Page content (frontmatter + markdown body) |
| `src/App.jsx` | Root app, Tina integration, CSS variable injection |
| `src/store/useStore.js` | Zustand store (theme + user) |
| `src/utils/seo.js` | Meta tag dynamic injection for client-side |
| `middleware.js` | Vercel edge middleware (bot detection + SEO) |
| `tailwind.config.js` | Tailwind theme with Dorabel color system |
| `vite.config.js` | Vite + React plugin config |

## Integration Points & Dependencies

- **TinaCMS**: Manages all content. Breaking changes = test `tina/config.js` schema
- **Framer Motion**: All animations. Version mismatch can cause scroll performance issues
- **React Router**: Single route definition in `App.jsx` `<Routes>`. Adding pages = add route + page component
- **Zustand**: Store initialization in `src/store/useStore.js`. Simple; prefer component state for forms
- **Google Fonts API**: Loaded dynamically in `App.jsx`. Ensure Tina fontName is URL-safe (spaces → "+")
- **External Services** (embedded in config/components): Google Analytics, Tawk.to (live chat), Google Maps (ComplianceMap)

## Important Gotchas

1. **TinaCMS Build Step**: `npm run build` runs `tinacms build` first, which may fail if schema is invalid. Always test schema changes locally.
2. **CSS Variables**: Dynamic colors loaded via `setProperty()` in `App.jsx`. If colors don't update, check Tina global config and browser DevTools `--color-dorabel-*`.
3. **Image Imports**: All images must be imported (static) in components or placed in `public/`. Relative paths in `content/` don't resolve at runtime.
4. **Markdown Frontmatter**: TinaCMS auto-generates frontmatter. Don't manually edit `.md` files in `content/` without understanding Tina's schema.
5. **SEO Middleware**: Middleware only serves static meta tags. For dynamic OG images (e.g., per service), backend image generation needed.
6. **Form Submissions**: Currently mock. Update `mockApi.js` to call real backend. Test form validation before deploy.

## Testing & Debugging

- **Local Tina Admin**: `http://localhost:3000/admin` — verify schema changes, test content editing
- **SEO Check**: Use `curl -H "User-Agent: facebookexternalhit" http://localhost:5173/` to test bot metadata injection
- **Console**: Watch for TinaCMS client errors (`TINA_CLIENT_ID` issues) and font loading warnings
- **Browser DevTools**: Inspect `<head>` meta tags (client-side injection) and CSS custom properties

## Notes for AI Agents

When implementing features:
- **Always test animations**: Scroll performance sensitive to component re-renders. Use `React.memo` for heavy reveal components.
- **Tina schema first**: If modifying content structure, update `tina/config.js` schema BEFORE changing components.
- **Mock → Real API**: `mockApi.js` functions have test delays. Replace with real endpoints when backend ready.
- **Responsive design**: Mobile-first approach; most components have `sm:`, `md:`, `lg:` variants. Test across breakpoints.
- **Accessibility**: Use semantic HTML, ARIA labels on interactive elements (buttons, links). Framer Motion respects `prefers-reduced-motion`.
