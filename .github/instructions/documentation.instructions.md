---
applyTo: '**/*.md'
---
# Documentation authoring guidelines

Use these conventions when creating or editing Markdown files in this repository.

## Folder structure

- Keep authored documentation under `docs/`, grouping related guides into subfolders when helpful (e.g., `docs/astro/`).
- Maintain the table of contents in `docs/README.md`; every new or relocated guide must be reflected there with the correct relative path.
- Use lowercase, hyphenated filenames (e.g., `topic-name.md`).
- When documentation targets agents or automated contributors, reference it from `AGENTS.md` so it is easy to discover.
- If you relocate a guide, update all references (README, `AGENTS.md`, and any stubs) so contributors land in the new location.

## README expectations

- The root `README.md` should stay concise: overview, quick-start commands, high-level scripts, and pointers to documentation/instructions.
- Avoid adding deep tutorials, architecture overviews, or content trees to the root README—place those details in dedicated docs.

## Updating documentation

- When introducing or upgrading dependencies, frameworks, or tooling, update any affected guides in `docs/` and add release notes or migration tips when relevant.
- Link related resources together (e.g., auditing guides linking to view-transition docs) to keep topic clusters discoverable.
- Prefer step-by-step lists and checklists for operational topics (audits, deployment), and include references to official docs where useful.

## Instructions for agents

- `AGENTS.md` acts as the directory for custom instructions, pointing to `.github/instructions/` files and important docs.
- When creating new instruction files under `.github/instructions/`, add an entry in `AGENTS.md` describing their purpose.

## Review checklist

- Confirm all relative links resolve and that any mentioned files exist.
- Ensure tone is concise and task-oriented; avoid filler or marketing language.
- Use fenced code blocks with language hints for commands or code snippets.