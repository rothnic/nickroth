# Nick Roth – Personal Site

A content-focused site built with Astro, Tailwind CSS, and DaisyUI.

## Quick start

```bash
pnpm install
pnpm dev
```

Volta pins the toolchain to **Node 22.16.0** and **pnpm 10.11.1** (see the `volta` block in `package.json`). Run `volta install node@22.16.0` and `volta install pnpm@10.11.1` once on your machine, then Volta will auto-select the correct versions whenever you enter the repo. A matching `.node-version` file keeps Cloudflare Pages builds in sync; developers relying on nvm can simply run `nvm use`.

Useful scripts:

| Command | Description |
| --- | --- |
| `pnpm run setup` | Install pinned Node/pnpm via Volta and project dependencies |
| `pnpm dev` | Local development server |
| `pnpm run build` | Type-check and build for production |
| `pnpm run preview` | Preview the production build |
| `pnpm run audit` | Run the bundled Lighthouse audit |

## Documentation & instructions

- [`docs/README.md`](docs/README.md) — entry point for project documentation.
- [`AGENTS.md`](AGENTS.md) — directory of agent-focused instructions and references.
- [`docs/project/`](docs/project/) — directory for project requirements and planning
- [`.github/instructions/`](.github/instructions/) — repository-wide automation and style guidance.

## Deployment

The project outputs static files via `npm run build` and can be deployed to any static host (e.g., Cloudflare Pages, Netlify, Vercel).

## License

MIT
