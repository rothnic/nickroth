# Sharp Dependency Explanation

## Why Sharp is Required

Sharp is a **required build-time dependency** for Astro's image optimization, even for static Cloudflare Pages builds.

### Common Misconception

**"We're using Cloudflare Pages (not Workers), so why do we need Sharp?"**

Sharp is NOT used at runtime. It's used during the **build process** to:
1. Convert images to WebP format
2. Generate multiple responsive sizes
3. Optimize image quality and compression
4. Create proper `srcset` attributes

### How It Works

```
Build Time (locally or in CI):
├── Astro reads src/assets/images/nick-headshot.png
├── Sharp processes the PNG:
│   ├── Generates 5 WebP versions (9KB, 16KB, 33KB, 53KB, 64KB)
│   ├── Applies quality settings (85%)
│   └── Optimizes for web delivery
└── Output: Multiple optimized images in dist/_astro/

Runtime (Cloudflare Pages):
└── Serves pre-generated WebP files (no Sharp needed)
```

### Cloudflare Pages vs Cloudflare Workers

| Feature | Cloudflare Pages | Cloudflare Workers |
|---------|------------------|-------------------|
| **Type** | Static hosting | Edge computing |
| **Image Optimization** | Build-time (Sharp) | Runtime (Workers API) |
| **Our Setup** | ✅ Using this | ❌ Not using |
| **Sharp Required?** | Yes (at build time) | No (uses Workers API) |

### Configuration

```js
// astro.config.mjs
export default defineConfig({
  image: {
    // Sharp is used at BUILD TIME for image optimization
    // This works for Cloudflare Pages (static builds) - not Workers
    // Sharp automatically generates multiple responsive WebP sizes
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
```

### Why Not Remove Sharp?

If we remove Sharp:
- ❌ Astro's `<Image />` component won't work
- ❌ No automatic WebP conversion
- ❌ No responsive image generation
- ❌ Build will fail with "Sharp not found" error

### Alternative: Passthrough Service

You can use a passthrough service (no optimization):

```js
import { passthroughImageService } from "astro/assets/services/passthrough";

export default defineConfig({
  image: {
    service: passthroughImageService()
  }
});
```

**But this means:**
- No image optimization
- No format conversion
- Larger file sizes
- Worse performance scores

### Conclusion

**Sharp is required** for Astro's image optimization on Cloudflare Pages. It runs during build time (not runtime), so it doesn't affect your hosting choice. The dependency is in `devDependencies` because it's only needed during the build process.

## Build Output Example

```
generating optimized images 
  ▶ /_astro/nick-headshot.Pw0K4oT0_1IwMS9.webp (before: 1435kB, after: 63kB) (+126ms) (1/5)
  ▶ /_astro/nick-headshot.Pw0K4oT0_1ULIkI.webp (before: 1435kB, after: 8kB) (+38ms) (2/5)
  ▶ /_astro/nick-headshot.Pw0K4oT0_ZD80B8.webp (before: 1435kB, after: 15kB) (+45ms) (3/5)
  ▶ /_astro/nick-headshot.Pw0K4oT0_1NRfcO.webp (before: 1435kB, after: 32kB) (+66ms) (4/5)
  ▶ /_astro/nick-headshot.Pw0K4oT0_1IPt6A.webp (before: 1435kB, after: 52kB) (+97ms) (5/5)
✓ Completed in 373ms.
```

This is Sharp in action during the build!
