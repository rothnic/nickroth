# Project Documentation Index

Agents and contributors can find all supplementary guides in this folder.

## 🚀 Quick Start for AI Agents

**New here?** Start with [`.github/START-HERE.md`](../.github/START-HERE.md) - 1-page orientation guide

## Guide categories

### DaisyUI theme implementation

**Start Here**:
- **[Site-First Roadmap](./site-first-roadmap.md)** – Visual development strategy with milestones (homepage → site → theme)
- **[Component Backlog](./component-backlog.md)** – Task list (28 tasks: 18 site, 10 theme expansion)

**Progress**:
- **[P0-001 Complete](./progress/p0-001.md)** ✅ – Global CSS Setup (detailed documentation)
  - [Quick Reference](./project/completed-work/p0-001-quick-reference.md) – One-page summary
  - [Completion Summary](./project/completed-work/p0-001-complete.md) – Executive overview

**Reference Docs**:
- [Design System Guide](./design-system/guide.md) – Design philosophy, component architecture, visual principles
- [Theme Implementation](./design-system/implementation.md) – Complete DaisyUI 5 neobrutalism theme reference
- [Grid Background System](./design-system/grid-background-system.md) – Scrolling grid architecture, layers, torn edges, z-index hierarchy
- [Prototype Analysis](./design-system/prototype-analysis.md) – Pattern extraction from React prototype (animations, stickers, showcases)
- [Color System](./design-system/colors.md) – Color palette, light/dark mode, OKLCH values, usage guidelines

**Workflows & Templates**:
- [buildComponent2.prompt.md](../.github/prompts/buildComponent2.prompt.md) – **PRIMARY WORKFLOW** (updated with P0-001 learnings)
- [buildComponent.prompt.md](../.github/prompts/buildComponent.prompt.md) – Original detailed workflow
- [buildComponent-reference.md](../.github/prompts/buildComponent-reference.md) – Detailed reference material
- [Task Templates](../.github/templates/) – CSS setup, component showcase, page integration
- [Validation Checklists](../.github/VALIDATION.md) – Phase-by-phase yes/no checks

**Archive**:
- Archive – Historical troubleshooting docs (folder to be reintroduced once legacy notes are migrated)

### Astro patterns

- [View transitions](./astro/view-transitions.md) – Opt into the client router, control transition directives, and implement shared-image animations.

### Astro operations & QA

- [Auditing Astro sites](./astro/auditing.md) – Run the automated Lighthouse script and follow manual QA best practices.
- [Performance Monitoring](./project/performance-monitoring.md) – Guide for maintaining high Lighthouse scores, running audits, and CI/CD integration.

### Tooling & automation

- [Tooling roadmap](./project/tooling-roadmap.md) – Align Node/pnpm versions, Biome, testing, and CI/CD plans for Cloudflare Pages deployments.

### Project research & planning

- [Project documentation index](./project/README.md) – All project planning and completed work
- [Content specification](./project/content-specification.md) – Central schemas, data structures, and content architecture for the living resume portfolio.
- [Product requirements](./project/prd.md) – Mission, success indicators, and experience goals guiding the portfolio build.
- [Prototype summary](./project/prototype-details.md) – Reference architecture and design insights captured from the initial React prototype.
- [Completed work](./project/completed-work/) – Quick references and summaries for finished tasks (P0-001 ✅)

### Progress tracking

- [P0-001 Global CSS Setup](./progress/p0-001.md) – Running notes on the global styling foundation work.

### Issue tracking

- [Documentation Issues](./issues/documentation-issues.md) – Active issues discovered during documentation reviews
- [Issue Tracking System](./issues/README.md) – How we track and resolve documentation problems
- [Resolved Issues](./issues/resolved-issues.md) – Archive of fixed issues

### Documentation maintenance

- [Documentation Instructions](../.github/instructions/documentation.instructions.md) – Complete authoring guidelines, organization rules, and conventions
- [Documentation Mode](../.github/chatmodes/Documentation.chatmode.md) – Chat mode for doc-only operations
- [Doc Cleanup Workflow](../.github/prompts/docCleanup.prompt.md) – 6-phase cleanup procedure
- [Doc Validation Tooling](./project/tooling-doc-validation.md) – Validation script usage and Biome limitations

## Conventions

- Create new guides as Markdown files in this directory.
- Use lowercase, hyphenated filenames (e.g., `topic-name.md`).
- Update this index and the root `README.md` when adding or renaming docs so agents always have an up-to-date map.
- Add new categories when you introduce guides that do not fit existing ones; keep related topics grouped together.
