# Tooling roadmap

This guide captures the current plan for aligning local development tooling with Cloudflare Pages deployments. It keeps runtime versions, package management, testing, linting, and CI/CD expectations easy to find for coding agents.

## Runtime and package manager alignment

- **Pin Node and pnpm with Volta.** The repository is pinned to `node@22.16.0` and `pnpm@10.11.1` in the `volta` block of `package.json`. Update both values together whenever the toolchain changes.[^volta-pin]
- **Surface the build runtime to Cloudflare.** `.node-version` mirrors the Volta Node release so the Pages build image runs the same runtime. Adjust the file whenever the Volta pin changes.[^cf-build-image]
- **Keep pnpm versions consistent.** Cloudflare’s v3 build image defaults to pnpm `10.11.1`, matching the Volta pin. Set a `PNPM_VERSION` environment variable only if you intentionally deviate; Pages will cache `~/.pnpm-store` between builds when the version matches.[^cf-build-image]

## Dependency workflow

Use pnpm for all local commands (the repo’s `packageManager` field advertises `pnpm@10.11.1` to Corepack):

```bash
pnpm install
pnpm run dev
pnpm run build
```

When pnpm is unavailable, run the `pnpm run setup` script (or `volta install pnpm@10.11.1`) to reinstall the pinned toolchain.[^volta-pin]

## Testing stubs

### Component and integration tests (Vitest)

1. Add Vitest with `pnpm add -D vitest @astrojs/check` (Astro already depends on the latter).
2. Create `vitest.config.ts` using Astro's `getViteConfig` helper to inherit project defaults:[^astro-testing]

   ```ts
   /// <reference types="vitest" />
   import { getViteConfig } from 'astro/config';

   export default getViteConfig({
     test: {
       environment: 'jsdom',
       setupFiles: ['./tests/setup.ts'],
     },
   });
   ```

3. Author component tests with the experimental `AstroContainer` API so assertions run against rendered HTML:[^astro-testing]

   ```ts
   import { experimental_AstroContainer as AstroContainer } from 'astro/container';
   import { expect, test } from 'vitest';
   import Navbar from '../src/components/Navbar.astro';

   test('navbar renders links', async () => {
     const container = await AstroContainer.create();
     const result = await container.renderToString(Navbar);

     expect(result).toContain('Work');
     expect(result).toContain('Contact');
   });
   ```

Store specs under `tests/components/` to keep parity with Astro conventions.

### End-to-end coverage (Playwright)

Adopt Playwright once key flows exist:

```bash
pnpm dlx playwright install
pnpm dlx playwright test
```

The official Playwright init (`pnpm create playwright`) scaffolds config and first specs that target `http://localhost:4321/` when Astro's dev server is running.[^astro-playwright]

## Biome formatter and linter

1. Install Biome with `pnpm add -D --save-exact @biomejs/biome`.
2. Add `biome.json` at the repo root:

   ```json
   {
     "$schema": "https://biomejs.dev/schemas/1.6.0/schema.json",
     "formatter": { "indentStyle": "space" },
     "linter": { "rules": { "all": true } }
   }
   ```

3. Wire scripts as you onboard Biome:

   ```bash
   pnpm biome check --write
   pnpm biome ci
   ```

Biome's `ci` command runs non-destructive checks suited for continuous integration.[^biome-cli]

## CI/CD pipeline sketch

Recommended GitHub Actions workflow outline:

1. Trigger on `pull_request` and `main` pushes.
2. Use `actions/setup-node` with the Volta-pinned Node version and enable pnpm caching.
3. Steps: `pnpm install --frozen-lockfile`, `pnpm biome ci`, `pnpm test`, `pnpm run build`.
4. Deploy preview builds through Cloudflare Pages Direct Uploads by running `pnpm dlx wrangler pages deploy dist --project-name=${{ secrets.CF_PAGES_PROJECT }}` with scoped API credentials stored as secrets.[^cf-ci]

Cloudflare's build service reuses cached package manager data, so make sure the workflow exports `PNPM_VERSION` to stay aligned with dashboard builds.[^cf-build-image]

## Next steps for agents

- When upgrading Node or pnpm, update `package.json#volta`, `package.json#packageManager`, and `.node-version` together.
- Add the `biome.json`, `vitest.config.ts`, and sample specs using the snippets above.
- Draft a GitHub Actions workflow mirroring the outlined steps so preview uploads ship automatically.
- Configure Cloudflare Pages environment variables (`NODE_VERSION`, `PNPM_VERSION`, API tokens) in the dashboard before enabling deployments.

[^volta-pin]: Volta stores pinned tool versions inside the `package.json` `volta` block, keeping collaborators on the same Node and package manager releases. See [Volta – Managing your project](https://docs.volta.sh/guide/understanding/#managing-your-project).
[^cf-build-image]: Cloudflare Pages lets you set `NODE_VERSION` and `PNPM_VERSION`, or read `.node-version`, and caches `~/.pnpm-store` for faster builds. See [Cloudflare Pages build image configuration](https://developers.cloudflare.com/pages/configuration/build-image).
[^astro-testing]: Astro recommends configuring Vitest via `getViteConfig` and rendering components with `AstroContainer`. See [Astro testing guide](https://docs.astro.build/en/guides/testing/).
[^astro-playwright]: Playwright's official CLI (`create playwright`) scaffolds Astro-friendly tests that target the local dev server. See [Astro testing guide – Playwright](https://docs.astro.build/en/guides/testing/#playwright).
[^biome-cli]: Biome's CLI exposes `format`, `lint`, `check`, and `ci` commands for local and CI use. See [Biome README](https://github.com/biomejs/biome#readme).
[^cf-ci]: Cloudflare documents Direct Upload workflows for CI systems using `wrangler pages deploy`. See [Deploy with CI using Direct Upload](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration).
