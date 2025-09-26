# Agent guide

This file helps automated contributors and collaborators discover the project’s custom instructions and documentation.

## Custom instruction files

| File | Purpose |
| --- | --- |
| [`.github/instructions/documentation.instructions.md`](.github/instructions/documentation.instructions.md) | Standards for organizing and maintaining Markdown documentation (applies to all `*.md` files). |

_Add additional entries here whenever new instruction files are added under `.github/instructions/`._

## Documentation entry points

- [`docs/README.md`](docs/README.md) – Index of all project guides, grouped by topic.
- [`docs/astro/view-transitions.md`](docs/astro/view-transitions.md) – Enabling and customizing view transitions.
- [`docs/astro/auditing.md`](docs/astro/auditing.md) – Running Lighthouse audits and manual QA checklists.
- [`docs/project/tooling-roadmap.md`](docs/project/tooling-roadmap.md) – Tooling alignment plan covering Volta, pnpm, Biome, tests, and CI/CD.

## Working tips for agents

1. Review the relevant instruction file(s) before editing documentation or code.
2. Update the docs index and `AGENTS.md` whenever new guides or instruction files are introduced.
3. Prefer concise updates in `README.md`; place detailed processes and operational runbooks in `docs/`.

## Toolchain expectations

- Volta pins the local toolchain to Node 22.16.0 and pnpm 10.11.1 (`package.json#volta`). Run `volta install node@22.16.0` and `volta install pnpm@10.11.1` before contributing.
- `.node-version` mirrors the Volta Node release. Keep it in sync whenever the pin changes so Cloudflare Pages builds match local runs.
- `package.json#packageManager` advertises `pnpm@10.11.1`; update it alongside the Volta pin to guide Corepack users.
