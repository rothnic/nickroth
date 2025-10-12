# Keystatic + Cloudflare Workers Integration Plan

## Goals
- Host the Keystatic admin UI on Cloudflare Pages/Workers so content can be edited remotely without running the site locally.
- Use Git-backed storage so authored changes persist in GitHub with minimal ongoing hosting cost.
- Preserve the static Astro front-end output for the public site while enabling authenticated editorial workflows.
- Maintain the ability to embed custom MDX components and reusable layout blocks managed by the CMS.

## Key Constraints & Considerations
- Cloudflare Pages Functions execute on the Workers runtime (service-worker style, no Node `fs`/`process`).
- Keystatic's GitHub storage talks directly to the GitHub REST API; in the Workers runtime we must polyfill any Node-specific globals (`Buffer`, `process.env`) that Keystatic expects.
- Authentication needs a GitHub OAuth App (preferred) or GitHub App installation so the hosted admin can request short-lived tokens without baking long-lived PATs into the Worker.
- The hosted admin must be gated behind auth (GitHub OAuth + optional Cloudflare Access) to avoid exposing edit capabilities publicly.
- Asset uploads should target GitHub LFS or an R2 bucket; Keystatic's GitHub storage stores binaries as base64-encoded blobs which is acceptable for small personal-site assets.

## Phase 1 – Environment Prep
1. **Dependencies & Build Guards**
   - Add Keystatic packages (`@keystatic/astro`, `@keystatic/core`, `@keystatic/github`) via `pnpm`.
   - Add polyfills (`buffer`, `process`, `undici`) configured in Vite to make the admin bundle Worker-compatible.
   - Update `astro.config.mjs` to lazily register the Keystatic integration and admin route only when `SKIP_KEYSTATIC !== 'true'`.
2. **Cloudflare Pages Functions Scaffolding**
   - Create `/functions/api/keystatic/[[path]].ts` Worker entry to proxy API calls (`/api/keystatic/*`).
   - Add `/functions/keystatic/[[path]].ts` to render the admin shell at `/keystatic` without requiring Astro to output a server-rendered page.
3. **Secrets & OAuth Setup**
   - Register a GitHub OAuth App with callback on the Cloudflare domain, storing `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in Pages secrets.
   - Configure `KEYSTATIC_SECRET` for signing preview sessions.

## Cloudflare Pages Configuration Checklist

Use this checklist to move from "code merged" to a working, hosted Keystatic admin that is reachable on Cloudflare Pages branch previews.

### 1. GitHub OAuth App
- [ ] Create a GitHub **OAuth App** (not a GitHub App) under the `rothnic` account.
  - Homepage URL: `https://<your-cloudflare-pages-domain>` (e.g., `https://nickroth.pages.dev`).
  - Authorization callback URL: `https://<your-cloudflare-pages-domain>/api/keystatic/github/oauth/callback`.
- [ ] Copy the **Client ID** and **Client Secret** for later use.

### 2. Cloudflare Pages Secrets
- [ ] In the Cloudflare Pages project (`nickroth`), add the following environment variables for both **Production** and **Preview** environments:
  - `KEYSTATIC_GITHUB_CLIENT_ID` – value from the GitHub OAuth App.
  - `KEYSTATIC_GITHUB_CLIENT_SECRET` – OAuth client secret (click “Generate new secret” if needed).
  - `KEYSTATIC_SECRET` – random 32+ character string (used to sign session cookies).
  - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` – short slug used in Keystatic’s auth screen (e.g., `nickroth`).
  - `PUBLIC_KEYSTATIC_BASE_URL` – canonical origin (e.g., `https://nickroth.pages.dev`) used when constructing the GitHub OAuth callback URL so branch previews can reuse the same OAuth App registration.
- [ ] Redeploy the site after setting secrets so they propagate to the Workers runtime.

### 3. Cloudflare Pages Functions
- [ ] Ensure **Functions** are enabled in the Pages project (Deployments → Settings → Functions).
- [ ] Confirm the project root is configured (defaults to repository root) so `/functions/api/keystatic/[[path]].ts` is picked up.
- [ ] No additional routes are required—the function automatically handles `*/api/keystatic*` requests and passes everything else to the static Astro bundle.

### 4. Branch Preview Access
- [ ] Verify that Cloudflare Pages generates preview deployments for pull requests or branches (e.g., `https://<branch>.<project>.pages.dev`).
- [ ] Visit `https://<branch>.<project>.pages.dev/keystatic` to load the Keystatic admin UI.
- [ ] Complete the GitHub OAuth prompt; Keystatic should redirect back to the branch preview domain once authentication succeeds.
  - Branch previews reuse the canonical OAuth callback defined by `PUBLIC_KEYSTATIC_BASE_URL`. After the GitHub exchange finishes, the Worker redirects back to the preview origin so editors stay on the branch-specific deployment.

### 5. GitHub Permissions & Storage
- [ ] Ensure the OAuth App has permission to access `repo` scope so Keystatic can read/write content branches.
- [ ] Confirm that the logged-in GitHub user has push access to `rothnic/nickroth`; Keystatic writes to branches using the authenticated user.
- [ ] Optional: pre-create the `draft/keystatic` branch prefix if you want deterministic branch naming (Keystatic will create branches automatically if missing).

### 6. Optional Hardening (Recommended for Production)
- [ ] Configure **Cloudflare Access** in front of `/keystatic` (Access → Applications → Self-hosted) to require a second layer of auth (email, GitHub, etc.).
- [ ] Set rate limiting or analytics alerts for `/api/keystatic/*` routes to monitor unexpected activity.
- [ ] Document the OAuth client secret rotation cadence (suggestion: rotate every 90 days) and note the impact on active editor sessions.

## Local vs. Hosted Admin Usage

- `pnpm keystatic:dev` starts the admin locally at `http://localhost:8787/keystatic` using the same GitHub-backed storage. You must set the same `KEYSTATIC_*` env vars in `.env.local` for local runs.
- The Astro build remains static by default. The `SKIP_KEYSTATIC=true` environment variable keeps the Keystatic integration disabled for purely static builds if needed (e.g., troubleshooting).
- Hosted Cloudflare deploys automatically expose `/keystatic` once the secrets are configured. Editors can use branch preview URLs to test unpublished schema changes before merging to `main`.

## Troubleshooting Cloudflare Deployments

| Symptom | Likely Cause | Resolution |
| --- | --- | --- |
| `Keystatic API environment variables are missing` error page | Secrets not defined in Cloudflare Pages environment | Add `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, and `KEYSTATIC_SECRET`, then redeploy |
| Redirect loop during GitHub OAuth | Callback URL mismatch | Ensure the GitHub OAuth App callback is exactly `https://<domain>/api/keystatic/github/oauth/callback` |
| Admin loads but saves fail with 401 | GitHub token lacks `repo` scope or user lacks repo access | Re-authorize with a GitHub account that has push permissions and accepts the `repo` scope |
| Branch preview shows 404 at `/keystatic` | Preview deployment missing secrets or functions disabled | Copy secrets to **Preview** environment and confirm Functions are enabled |

## Phase 2 – Keystatic Configuration for GitHub Storage
1. **GitHub Storage**
   - Define `storage: { kind: 'github', repo: 'rothnic/nickroth', branch: 'main' }` in `keystatic.config.ts`.
   - Implement Worker handler for Keystatic's `createGitHubStorage` using `@keystatic/github` utilities.
   - Use GitHub OAuth flow to exchange the code for an access token; the Worker stores the encrypted token in a cookie (respecting Cloudflare storage limits).
2. **Draft Branch Strategy**
   - Default writes to per-user draft branches (e.g., `keystatic/{user}/{timestamp}`) to avoid direct pushes to `main`.
   - Provide UI toggle inside Keystatic to target `main` (for small fixes) guarded behind role check.
3. **Binary Asset Handling**
   - Enable Keystatic media store pointing at GitHub blobs; optionally add R2-backed store if asset count grows.

## Phase 3 – Admin Hosting & Routing
1. **Worker Router**
   - Serve the admin shell at `/keystatic` via `/functions/keystatic/[[path]].ts`, which renders a minimal HTML document that loads Keystatic from the ESM CDN.
   - Keep `/functions/admin.ts` as a convenience redirect from `/admin` to `/keystatic` so existing bookmarks continue to work.
   - `/functions/api/keystatic/[[path]].ts` continues to handle `/api/keystatic/*` requests for GitHub auth and content updates.
2. **Authentication Middleware**
   - Use Cloudflare Access or GitHub OAuth gating before allowing `GET /admin`.
   - Store session in signed cookie; refresh tokens on expiry by re-running OAuth flow.
3. **Local Development Parity**
   - Keep `pnpm keystatic:dev` script for local editing (storage still GitHub so teammates share drafts).
   - Document how to toggle between local and hosted admin via env flags.

## Phase 4 – Content Model & Front-End Refactor
- Reuse the schema + component work from the original plan (collections, singletons, MDX components).
- Update Astro front-end to rely on Keystatic reader with GitHub-backed content, identical to the prior migration steps.
- Ensure build step fetches published content from `main` while drafts remain accessible through preview cookie that selects draft branches.

## Phase 5 – Preview & Quick Capture Automation
1. **Preview Branch Selection**
   - Extend the preview API routes to list available draft branches via GitHub API.
   - Worker sets cookie to read from selected branch using `createReader` branch option.
2. **Quick Capture Worker**
   - Update `/functions/api/draft.ts` to create draft branches/PRs directly from the Worker using OAuth tokens or a GitHub App installation token (preferred for automation).
   - Support asset upload by committing to the draft branch.
3. **CI/CD Alignment**
   - Cloudflare Pages preview builds should check out the selected branch so editors can verify changes without merging.

## Phase 6 – Monitoring, Limits, and Documentation
- Add instrumentation (Workers Analytics Engine or simple logging) for admin usage and GitHub API failures.
- Document operational procedures: OAuth app maintenance, rotating client secrets, troubleshooting Worker errors.
- Outline cost expectations: Cloudflare Pages (free tier), Workers (request-based), GitHub (existing repo), ensuring running cost remains negligible.

## FAQ
### Can Cloudflare Workers save data to GitHub using Keystatic?
Yes. Keystatic's GitHub storage ultimately makes HTTPS calls to the GitHub REST API, which the Workers runtime fully supports. The key requirements are:
- Provide OAuth access tokens via GitHub OAuth/App flow (no long-lived PATs in the Worker).
- Polyfill Node globals required by Keystatic packages (`Buffer`, `process.env`).
- Observe GitHub API rate limits (Workers default concurrency is sufficient for personal-site usage).

If the polyfills prove insufficient, an alternative is to implement a minimal custom GitHub client in the Worker and wire it into Keystatic's `storage` hooks; however, current packages already support Web-standard fetch when properly polyfilled.

### Why host the admin on Cloudflare Pages instead of Vercel or a VPS?
- Keeps the stack single-provider with the existing static site hosting.
- Avoids extra monthly cost; Cloudflare Pages + Workers free tier is ample for low-volume personal editing.
- Simplifies deployment by bundling admin updates alongside site builds.

### What if the Worker environment blocks certain Node APIs Keystatic expects?
- Add Vite resolve aliases to use browser-compatible shims.
- For unsupported modules, lazy-load them only in local dev or replace them with Worker-friendly equivalents.
- Track Keystatic releases; if official Worker support ships, replace custom wiring with upstream helpers.

