# Performance Monitoring Guide

This guide explains how to monitor and maintain high Lighthouse scores for the Nick Roth portfolio site.

## Current Performance Baseline

After optimization (as of latest commit):
- **Performance**: 96/100 ✅
- **Accessibility**: 92/100 ✅
- **Best Practices**: 100/100 ✅
- **SEO**: 100/100 ✅

## Running Lighthouse Audits Locally

### Basic Audit
```bash
pnpm run audit
```

This will:
1. Build the site
2. Start a preview server
3. Run Lighthouse against the homepage
4. Display scores in the terminal
5. Generate `lighthouse-report.json`

### Audit with Threshold Checking
```bash
pnpm run audit:check
```

This runs the audit AND checks if scores meet minimum thresholds:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

If any score is below threshold, the script will exit with code 1 (useful for CI/CD).

## CI/CD Integration

### GitHub Actions Workflow

The `.github/workflows/lighthouse.yml` workflow:
- Runs on every PR and push to main
- Builds the site and runs Lighthouse
- Posts score summary in PR comments
- **Fails the build** if scores are below thresholds
- Uploads full Lighthouse report as artifact

### Viewing CI Results

1. **PR Comment**: Automatic comment with score table
2. **GitHub Actions Summary**: Detailed scores in job summary
3. **Artifacts**: Download full `lighthouse-report.json`

## Maintaining High Scores

### Performance (Target: 95+)

**Key Optimizations Applied:**
- ✅ Hero image optimized: WebP format (48KB vs 1.5MB PNG)
- ✅ `fetchpriority="high"` on LCP image
- ✅ Explicit width/height to prevent layout shift
- ✅ Inline critical scripts to avoid loading delays

**Watch Out For:**
- Large images (always use WebP, size appropriately)
- Render-blocking resources (inline critical CSS/JS)
- Third-party scripts (defer/async when possible)
- Unoptimized fonts (use system fonts or subset custom fonts)

### Accessibility (Target: 95+)

**Key Optimizations Applied:**
- ✅ `aria-label` on interactive buttons without visible text
- ✅ Color contrast ratios meet WCAG AA standards
- ✅ Form inputs have associated labels

**Watch Out For:**
- Missing `alt` text on images
- Interactive elements without accessible names
- Color-only information (use text/icons too)
- Low color contrast (especially with custom themes)
- Form inputs without labels

### Best Practices (Target: 95+)

**Key Optimizations Applied:**
- ✅ HTTPS (in production)
- ✅ No console errors
- ✅ Proper image aspect ratios
- ✅ No deprecated APIs

**Watch Out For:**
- Console errors/warnings
- HTTP resources on HTTPS page (mixed content)
- Images without explicit dimensions
- Deprecated browser APIs

### SEO (Target: 95+)

**Key Optimizations Applied:**
- ✅ Semantic HTML structure
- ✅ Meta tags (title, description)
- ✅ Crawlable links
- ✅ Mobile-friendly viewport

**Watch Out For:**
- Missing meta descriptions
- Duplicate title tags
- Blocked resources in robots.txt
- Non-descriptive link text

## Troubleshooting

### Scores Dropped After Changes?

1. Run local audit: `pnpm run audit:check`
2. Check the full report: `lighthouse-report.json`
3. Look for new errors in specific audits
4. Common culprits:
   - New images not optimized
   - New scripts added
   - CSS changes affecting color contrast
   - New interactive elements missing labels

### Build Failing in CI?

1. Check GitHub Actions logs for specific failing audit
2. Run `pnpm run audit:check` locally to reproduce
3. Use `lighthouse-report.json` to see detailed recommendations
4. Fix the issue and re-run locally before pushing

### Need More Details?

View the full Lighthouse report:
```bash
# After running pnpm run audit
cat lighthouse-report.json | jq '.audits'
```

Or use Chrome DevTools:
1. Open site in Chrome
2. F12 → Lighthouse tab
3. Generate report
4. Click on failed audits for recommendations

## Performance Budget

Consider these limits for future changes:

| Resource Type | Max Size | Current |
|---------------|----------|---------|
| Images | 100KB each | Hero: 48KB ✅ |
| JavaScript | 150KB total | ~50KB ✅ |
| CSS | 50KB | ~30KB ✅ |
| Fonts | None (system) | 0KB ✅ |

## Resources

- [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [Web.dev Performance](https://web.dev/performance/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
