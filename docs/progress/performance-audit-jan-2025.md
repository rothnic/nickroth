# Performance Audit - January 2025

## Summary

This document records the results of a comprehensive Lighthouse performance audit and the optimizations implemented to improve the site's performance score.

**Final Result: Performance score improved from 72 → 96-99**

## Initial State (January 7, 2025)

- **Lighthouse Performance Score**: 72
- **First Contentful Paint (FCP)**: 2.5s
- **Largest Contentful Paint (LCP)**: 9.6s (95% was "Render Delay")
- **LCP Element**: Hero headshot image
- **Main Bottleneck**: Large, unoptimized project images loaded via `<img>` tags

## Optimizations Implemented

### 1. Image Optimization (Score: 72 → 90)

**Problem**: Project images (500-750KB each) were in `public/images/projects/` and loaded with standard `<img>` tags, bypassing Astro's image optimization.

**Solution**:
- Moved images from `public/images/projects/` to `src/assets/images/projects/`
- Updated `src/content/config.ts` to use Astro's `image()` schema helper
- Replaced `<img>` tags with Astro's `<Image>` component in `WorkCard.astro`
- Used responsive `widths`, `sizes`, `loading="eager"`, and `fetchpriority="high"` for LCP images

**Result**: LCP improved from 9.6s → 2.8s

### 2. DaisyUI Component Tree-Shaking (Score: 90 → 93)

**Problem**: Full DaisyUI library CSS was being included (~40+ components), even though only ~25 were used.

**Solution**: Added `include:` option to `@plugin "daisyui"` in `global.css`:
```css
@plugin "daisyui" {
    themes: neobrutalism-light --default, neobrutalism-dark --prefersdark;
    include: badge, card, button, link, alert, stat, hero, swap, navbar, join, 
             checkbox, select, radio, dropdown, textarea, range, menu, footer, 
             toggle, mockup, avatar, input, tooltip, tabs, collapse;
    logs: false;
}
```

**Result**: CSS reduced from 384KB → 280KB raw (27% reduction)

### 3. Self-Hosted Fonts with Astro Experimental Fonts API (Score: 93 → 96-99)

**Problem**: Google Fonts were loaded externally, adding ~55KB of font data and requiring extra DNS lookups and network round-trips.

**Solution**: Used Astro's experimental fonts API (`astro@5.16.7`) with Fontsource provider:

```javascript
// astro.config.mjs
experimental: {
    fonts: [
        {
            name: "Space Grotesk",
            cssVariable: "--font-display",
            provider: fontProviders.fontsource(),
            weights: [500, 600, 700, 900], // Only weights actually used
            styles: ["normal"],
            subsets: ["latin"],
            formats: ["woff2"], // Most efficient format only
            fallbacks: ["system-ui", "sans-serif"],
        },
        // ... JetBrains Mono and Rubik Glitch similarly configured
    ],
},
```

Added `<Font />` components to `BaseLayout.astro`:
```astro
<Font cssVariable="--font-display" preload />
<Font cssVariable="--font-mono" />
<Font cssVariable="--font-glitch" />
```

**Result**: 
- Eliminated Google Fonts third-party dependency
- Total font files reduced to 216KB (woff2 only)
- FCP improved from 2.5s → 1.4-1.7s
- Score jumped from 93 → 96-99

## Optimizations Attempted But Reverted

### Critical CSS Inlining (`@playform/inline`)
- **Why Reverted**: Inlined ~45KB of CSS, making HTML too large (~130KB) and hurting LCP more than it helped FCP.

### PurgeCSS (`vite-plugin-purgecss`)
- **Why Reverted**: Too aggressive with Tailwind CSS 4 - removed needed utility classes and broke layout. PurgeCSS doesn't understand Tailwind's JIT compilation.

## Final Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Performance Score | 72 | 96-99 | **+24-27 points** |
| FCP | 2.5s | 1.4s | **-44%** |
| LCP | 9.6s | 2.1s | **-78%** |
| CSS (gzipped) | 57KB | 40KB | **-30%** |
| Third-party requests | Google Fonts | 0 | **Eliminated** |
| Font files | ~1MB | 216KB | **-78%** |

## Key Takeaways

1. **Use Astro's Image component** - Automatic WebP conversion, responsive sizing, and quality optimization
2. **Only include DaisyUI components you use** - The `include:` option dramatically reduces CSS size
3. **Self-host fonts with Astro's fonts API** - Better performance, privacy, and subsetting
4. **woff2 only** - Modern browsers support it; no need for woff/ttf fallbacks
5. **Avoid aggressive CSS purging** - Tailwind CSS 4 handles tree-shaking; external tools can break things

## Commands

```bash
# Run Lighthouse audit
pnpm run audit

# Check against thresholds
pnpm run audit:check
```
