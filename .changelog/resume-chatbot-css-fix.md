## Summary

- Fixed nonstandard `background-opacity` usage in `.prose-content blockquote` by replacing with `color-mix`-based `background-color` for cross-browser support.
- Consolidated duplicate `.card` definitions: canonicalized shared properties into the primary `.card` block (lines ~454-464) and removed duplicate thematic/commented duplication at ~2560.

## Commits

- fix(css): replace nonstandard background-opacity with color-mix for blockquote
- fix(css): consolidate duplicate .card definitions into canonical block

## Files changed

- src/styles/global.css

## Visual verification

- Dev server was started and the resume-chatbot page HTML saved to `/tmp/resume_chatbot.html` for manual inspection.
- Automated screenshots could not be taken in this environment (selenium not installed initially). Recommend running Puppeteer locally to capture full-page and focused screenshots.

## Notes

- Biome LSP reported Tailwind-specific syntax disabled warnings; these are expected because the file uses Tailwind/daisyUI plugin directives and `@apply` which some linters flag. No functional CSS errors remain.
