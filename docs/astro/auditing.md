# Auditing Astro Sites

This note covers how to run the bundled Lighthouse script and general practices for assessing an Astro site before release.

## Run the automated Lighthouse audit

We ship `scripts/run-lighthouse.mjs`, which builds the site, spins up a local preview, and runs Lighthouse headlessly.

### Prerequisites

- Dependencies installed (`npm install`, `pnpm install`, or `npm ci`).
- Node.js 18+.
- Lighthouse installed (already listed in `devDependencies`).

### Usage

```bash
npm run audit
# or
pnpm run audit
```

What happens:

1. `astro build` generates the production output.
2. `astro preview --host 127.0.0.1 --port 4325` serves the build (port configurable via `LIGHTHOUSE_PORT`).
3. Lighthouse hits the preview URL and writes JSON results to `lighthouse-report.json` at the project root.
4. Final scores for each Lighthouse category print to the console.

Environment knobs:

- `LIGHTHOUSE_PORT`: override the preview port if `4325` is unavailable.
- `--chrome-flags`: tweak the `chrome-flags` array in the script if you need different headless behavior (e.g., disable throttling locally).

## Manual audit checklist

To complement Lighthouse:

- **Validate build output**: run `npm run build` (or `pnpm run build`) to catch type errors via `astro check`.
- **Test multiple screen sizes**: use responsive DevTools presets to ensure layouts remain stable when transitions occur.
- **Verify view transitions**: confirm shared-element animations work in Chromium and gracefully degrade elsewhere. Use DevTools → Rendering → View Transition to inspect captured layers.
- **Check reduced motion**: toggle `prefers-reduced-motion` in DevTools and confirm transitions fall back to instant swaps.
- **Measure asset budgets**: inspect the `dist/` directory for oversized images or scripts. Astro should keep JS lean; flag anything above ~200 KB per route.
- **Ensure SEO metadata**: confirm `<title>`, canonical URLs, and Open Graph tags render correctly per page.
- **Accessibility sweep**: run Lighthouse's accessibility pass, then spot-check headings, color contrast, and focus states. Astro's router auto-announces titles; make sure each page sets one.

## Sharing results

Commit the latest `lighthouse-report.json` when scores regress or improve, and note changes in PR descriptions. The JSON report includes filmstrips and detailed opportunities for deeper investigation.

## Further reading

- [Lighthouse CLI docs](https://github.com/GoogleChrome/lighthouse#using-the-node-cli)
- [Astro performance guide](https://docs.astro.build/en/guides/performance/)
