# Agent guide

This file helps automated contributors and collaborators discover the project's custom instructions and documentation.

## 🚀 Quick Start for AI Agents

**New to this project?** Start here: [`.github/START-HERE.md`](.github/START-HERE.md)

1-page guide with: current status, next task, file references, core principles, common patterns, troubleshooting.

## Critical Project Context
- **Goal**: Build personal website (Nick Roth) + neobrutalism DaisyUI theme for future sale
- **Strategy**: Site-first development - build pages, extract components as-needed, expand theme after site complete
- **Status**: 0/28 tasks complete (0/18 for personal site, 10 additional for theme library)
- **Personal data**: [JSON Resume format](https://gist.githubusercontent.com/rothnic/87fb697a53feb14a55afd7c50d51eaa2/raw/5745ab6c4a0b8a0ae0bb20197ded3a70afe62ee7/resume.json)

## Development Workflow

### For Simple LLMs
1. Read [`.github/START-HERE.md`](.github/START-HERE.md) - Orientation guide
2. Read [`docs/component-backlog.md`](docs/component-backlog.md) - Find next `[ ]` task
3. Use task template from `.github/templates/` - Structured checklist approach
4. Use [`.github/VALIDATION.md`](.github/VALIDATION.md) - Quick validation checklist
5. Mark task `[x]` complete and repeat

### For Advanced LLMs
Use [`.github/prompts/buildComponent-streamlined.md`](.github/prompts/buildComponent-streamlined.md) - 4-phase workflow (analysis, CSS, implementation, showcase).

For reference material: [`.github/prompts/buildComponent-reference.md`](.github/prompts/buildComponent-reference.md)

## Custom instruction files

| File | Purpose |
| --- | --- |
| [`.github/instructions/documentation.instructions.md`](.github/instructions/documentation.instructions.md) | Standards for organizing and maintaining Markdown documentation (applies to all `*.md` files). |
| [`.github/instructions/daisyui.instructions.md`](.github/instructions/daisyui.instructions.md) | DaisyUI 5 theming and component development rules for neobrutalism theme (ALWAYS apply). |

_Add additional entries here whenever new instruction files are added under `.github/instructions/`._

## Documentation entry points

### Start Here
- [`.github/START-HERE.md`](.github/START-HERE.md) – **Quick orientation for LLMs** (where you are, what to do next, file references)
- [`docs/site-first-roadmap.md`](docs/site-first-roadmap.md) – Visual development strategy (build order, milestones, progress tracking)
- [`docs/component-backlog.md`](docs/component-backlog.md) – **Task list** (28 tasks: 18 site, 10 theme expansion)

### Technical References
- [`docs/figma-export-review.md`](docs/figma-export-review.md) – Comprehensive analysis of React prototype with migration strategy
- [`docs/neobrutalism-daisyui-implementation.md`](docs/neobrutalism-daisyui-implementation.md) – DaisyUI neobrutalism theme implementation strategy
- [`docs/design-system/guide.md`](docs/design-system/guide.md) – Complete design system philosophy and component architecture
- [`docs/design-system/colors.md`](docs/design-system/colors.md) – Color palette, light/dark mode, OKLCH values, usage guidelines
- [`docs/dark-mode-fix.md`](docs/dark-mode-fix.md) – Dark mode implementation, color changes, and testing guide

### Guides
- [`docs/astro/view-transitions.md`](docs/astro/view-transitions.md) – Enabling and customizing view transitions
- [`docs/astro/auditing.md`](docs/astro/auditing.md) – Running Lighthouse audits and manual QA checklists
- [`docs/project/tooling-roadmap.md`](docs/project/tooling-roadmap.md) – Tooling alignment plan covering Volta, pnpm, Biome, tests, and CI/CD
- [`docs/README.md`](docs/README.md) – Complete documentation index

## Component development

### Workflows
- [`.github/prompts/buildComponent-streamlined.md`](.github/prompts/buildComponent-streamlined.md) – **Primary workflow** (4-phase process, ~400 lines)
- [`.github/prompts/buildComponent-reference.md`](.github/prompts/buildComponent-reference.md) – Reference material (content separation, CSS patterns, examples)
- [`.github/prompts/buildComponent.prompt.md`](.github/prompts/buildComponent.prompt.md) – Original detailed workflow (644 lines, use for deep reference only)

### Task Templates
- [`.github/templates/global-css-setup.md`](.github/templates/global-css-setup.md) – Template for P0-001 (CSS foundation)
- [`.github/templates/component-showcase.md`](.github/templates/component-showcase.md) – Template for building components with showcase pages
- [`.github/templates/page-integration.md`](.github/templates/page-integration.md) – Template for integrating components into pages

### Validation
- [`.github/VALIDATION.md`](.github/VALIDATION.md) – Phase-by-phase validation checklists (quick yes/no checks)

## Quick Reference

### Project Principles
1. **Override, Don't Extend**: Customize `.btn`, `.card`, `.badge` directly (never `.btn-brutal`)
2. **Zero JavaScript for Styling**: Pure CSS only (no `clsx`, `tailwind-variants`)
3. **Content Separation**: Content in `src/content/` or `src/data/`, never hard-coded
4. **Site-First**: Build pages → extract components → showcase → integrate → expand
5. **Component + Showcase**: Every component gets showcase page demonstrating all variants

### Neobrutalism Design
- **Borders**: 4px black (#000000) in light mode
- **Shadows**: Hard-edged (no blur) - `Xpx Ypx 0px 0px rgba(0,0,0,1)`
- **Colors**: Black/white base with vibrant accents
  - Primary: Electric cyan (#00ffff aesthetic)
  - Secondary: Lime green (#50fa7b aesthetic)
  - Accent: Hot pink (#ff0080 aesthetic)
  - Warning: Orange (#f97316 aesthetic)
  - Error: Red (#ef4444 aesthetic)
- **Dark Mode**: Automatic system preference detection with brighter accent colors
- **Rotations**: -8deg to 12deg for sticker aesthetic
- **Spacing**: 4px base unit (4, 8, 12, 16, 20, 24, 32, 48, 64px)

### File Locations
- Components: `src/components/`
- Showcases: `src/pages/showcase/`
- Data: `src/data/`
- Collections: `src/content/`
- Styles: `src/styles/global.css`
- Scripts: `src/scripts/`

### Progress Tracking
- **Current Phase**: Phase 1 (Foundation & Homepage Hero)
- **Next Task**: P0-001 (Global CSS Setup)
- **Site Complete**: After 18 tasks
- **Theme Complete**: After 28 tasks

## Working tips for agents

1. **Review instruction files** before editing documentation or code.
2. **Separate content from components**: Content lives in `src/content/` (frontmatter + markdown), components are pure presentation in `src/components/`.
3. **Content-first architecture**: Build generic, reusable components that accept data via props. Never hard-code content in component files.
4. **CMS-ready approach**: Structure data to support future headless CMS migration (structured frontmatter, consistent schemas).
5. **Update docs index** and `AGENTS.md` whenever new guides or instruction files are introduced.
6. Prefer concise updates in `README.md`; place detailed processes and operational runbooks in `docs/`.

## Toolchain expectations

- Volta pins the local toolchain to Node 22.16.0 and pnpm 10.11.1 (`package.json#volta`). Run `volta install node@22.16.0` and `volta install pnpm@10.11.1` before contributing.
- `.node-version` mirrors the Volta Node release. Keep it in sync whenever the pin changes so Cloudflare Pages builds match local runs.
- `package.json#packageManager` advertises `pnpm@10.11.1`; update it alongside the Volta pin to guide Corepack users.
