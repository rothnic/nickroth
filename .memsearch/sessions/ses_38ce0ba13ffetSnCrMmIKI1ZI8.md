# Session ses_38ce0ba13ffetSnCrMmIKI1ZI8

## user (2026-02-18T23:39:15.522Z)



---

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - PROMETHEUS READ-ONLY]

You are being invoked by Prometheus (Plan Builder), a READ-ONLY planning agent.

**CRITICAL CONSTRAINTS:**
- DO NOT modify any files (no Write, Edit, or any file mutations)
- DO NOT execute commands that change system state
- DO NOT create, delete, or rename files
- ONLY provide analysis, recommendations, and information

**YOUR ROLE**: Provide consultation, research, and analysis to assist with planning.
Return your findings and recommendations. The actual implementation will be handled separately after planning is complete.

---

Review this planning session before I generate the work plan:

**User's Goal**: Create a rich, technical article series (3 articles total) for the resume chatbot project on nickroth.com. Replace the current thin 78-line overview with:
1. An expanded parent article (focused overview with video demo, high-level architecture diagram, key component definitions, links to sub-articles)
2. Sub-article: Streaming JSON Patching Architecture deep-dive
3. Sub-article: Deterministic Testing for AI Streaming deep-dive

**What We Discussed**:
- Tone: matter-of-fact, documenting how things work without being self-congratulatory
- Parent article focused on the challenge and demo, not giant, with high-level diagram and links
- 2 sub-articles: Architecture + Testing (not 3 — text ops folded into architecture article)
- SVG diagrams (agent-produced, lazy-loaded, dark/light mode compatible)
- Google Drive video lazy-loaded via new LazyVideo.astro component (screenshot thumbnail + iframe swap on click)
- Sub-articles use parentProject: "resume-chatbot" linking pattern
- No techBrand for sub-articles — use generic image-based hero
- Code samples from the actual resume-chatbot repo source
- Rich external links to documentation (Vercel AI SDK, fast-json-patch, RFC 6902, JSON Resume, Playwright)
- Work on branch `content/resume-chatbot-articles`, will create PR for preview
- Video thumbnail: Extract frame from the Google Drive video

**My Understanding**:
- This is primarily a CONTENT task — writing 3 MDX files with code samples, diagrams, and a new component
- The LazyVideo.astro component is the only new code (similar to existing LazyGif.astro but for iframe embeds)
- Diagrams will be SVG files produced inline or via tooling, lazy-loaded as images
- The existing resume-chatbot.mdx frontmatter needs updating but the slug stays the same
- No changes to site layout, CSS, theme, or the resume-chatbot repo itself

**Research Findings**:
- Site already has parentProject pattern (View Transitions: 3 sub-articles, DatoCMS: 4 sub-articles)
- LazyGif.astro exists with IntersectionObserver for lazy video/gif loading
- Content schema supports parentProject, techBrand, heroFeature
- 5 rich source documents in resume-chatbot/docs/ (project-specification.md, technical-overview.md, playwright-stability.md, text-editing-operations.md, ai-sdk-mock-models.md)
- Existing article has image: "../../assets/images/projects/resume-chatbot.png"

Please identify:
1. Questions I should have asked but didn't
2. Guardrails that need to be explicitly set
3. Potential scope creep areas to lock down
4. Assumptions I'm making that need validation
5. Missing acceptance criteria
6. Edge cases not addressed
---

## assistant (2026-02-18T23:39:15.532Z)



## Intent Classification
**Type**: Mid-sized Task (Content creation with bounded deliverables)
**Confidence**: High
**Rationale**: Scoped deliverables (3 MDX files, 1 component, SVG diagrams), clear boundaries, content-focused with minimal code changes.

---

Let me gather some concrete context before giving my analysis.

**call_omo_agent:**

```
Background agent task launched successfully.

Task ID: bg_44d78360
Session ID: ses_38ce07d98ffeMP4fhq6TfJuucz
Description: Explore existing article patterns, LazyGif component, content schema, and parentProject linking
Agent: explore (subagent)
Status: running

The system will notify you when the task completes.
Use `background_output` tool with task_id="bg_44d78360" to check progress:
- block=false (default): Check status immediately - returns full status info
- block=true: Wait for completion ...
```

**call_omo_agent:**

```
Background agent task launched successfully.

Task ID: bg_96a15e8a
Session ID: ses_38ce05a1fffevytENkY1G1g59k
Description: Research resume-chatbot source docs for article content material
Agent: explore (subagent)
Status: running

The system will notify you when the task completes.
Use `background_output` tool with task_id="bg_96a15e8a" to check progress:
- block=false (default): Check status immediately - returns full status info
- block=true: Wait for completion (rarely needed since system not...
```
---

## assistant (2026-02-18T23:39:40.224Z)

Let me also directly check some critical files while the agents work:

**glob:**

```
Found 1 file(s)

/Users/nroth/workspace/nickroth/src/components/LazyGif.astro
```

**glob:**

```
Found 13 file(s)

/Users/nroth/workspace/nickroth/src/content/work/view-transitions-consistent-layouts.mdx
/Users/nroth/workspace/nickroth/src/content/work/view-transitions-navbar.mdx
/Users/nroth/workspace/nickroth/src/content/work/view-transitions-filter-bar.mdx
/Users/nroth/workspace/nickroth/src/content/work/datocms-structured-text-preview.mdx
/Users/nroth/workspace/nickroth/src/content/work/datocms-react-performance.mdx
/Users/nroth/workspace/nickroth/src/content/work/datocms-multi-hook-plu...
```

**glob:**

```
Found 1 file(s)

/Users/nroth/workspace/nickroth/src/content/config.ts
```

**grep:**

```
Found 9 match(es) in 9 file(s)

/Users/nroth/workspace/nickroth/src/content/config.ts
  40: parentProject: z.string().optional(),

/Users/nroth/workspace/nickroth/src/content/work/datocms-form-outlet-optimization.mdx
  13: parentProject: "content-platform-modernization"

/Users/nroth/workspace/nickroth/src/content/work/view-transitions-filter-bar.mdx
  15: parentProject: "astro-portfolio-ai-development"

/Users/nroth/workspace/nickroth/src/content/work/datocms-multi-hook-plugin.mdx
  15: parentP...
```
---

## assistant (2026-02-18T23:39:45.803Z)

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/components/LazyGif.astro</path>
<type>file</type>
<content>1: ---
2: /**
3:  * LazyGif Component
4:  * 
5:  * Shows a still poster image initially. When the element enters the viewport,
6:  * it preloads and auto-plays the animation. By the time the user scrolls to it,
7:  * the content is typically already loaded and playing seamlessly.
8:  * 
9:  * Usage in MDX:
10:  * <LazyGif 
11:  *   src="/demos/filter-transitions.webm" 
12:  *   alt="Filter naviga...
```

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/work/resume-chatbot.mdx</path>
<type>file</type>
<content>1: ---
2: title: "AI-Powered Resume Builder with Real-Time Streaming"
3: description: "Building an intelligent resume editor using Next.js, Vercel AI SDK, and surgical JSON patching for real-time collaborative editing."
4: company: "Personal Project"
5: role: "Full-Stack Developer"
6: startDate: 2024-11-01
7: featured: true
8: tags: ["AI", "Next.js", "Streaming", "Real-time"]
9: image: ".....
```

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/config.ts</path>
<type>file</type>
<content>1: import { defineCollection, z } from 'astro:content';
2: 
3: const pages = defineCollection({
4:   type: 'content',
5:   schema: z.object({
6:     title: z.string(),
7:     description: z.string(),
8:     publishDate: z.date(),
9:     draft: z.boolean().default(false),
10:   }),
11: });
12: 
13: const capabilities = defineCollection({
14:   type: 'content',
15:   schema: z.object({
16:     title: z.st...
```

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/work/view-transitions-navbar.mdx</path>
<type>file</type>
<content>1: ---
2: title: "Navbar Active State Morphing with View Transitions"
3: description: "How to create a sliding active indicator that smoothly morphs between navigation items using Astro's View Transitions API-with precise control over animation direction and timing."
4: company: "Personal Project"
5: role: "Frontend Developer"
6: startDate: 2024-12-10
7: featured: false
8: tags: [...
```
---

## assistant (2026-02-18T23:39:50.521Z)

Now let me check the hero rendering and how articles without techBrand display:

**grep:**

```
Found 5 match(es) in 1 file(s)

/Users/nroth/workspace/nickroth/src/components/WorkCard.astro
  27: techBrand,
  114: {techBrand && heroFeature ? (
  116: <TechHero tech={techBrand} feature={heroFeature} variant="compact" />
  179: {techBrand && heroFeature ? (
  181: <TechHero tech={techBrand} feature={heroFeature} variant="full" />

```

**glob:**

```
Found 16 file(s)

/Users/nroth/workspace/nickroth/src/assets/images/projects/view-transitions-consistent-layouts.png
/Users/nroth/workspace/nickroth/src/assets/images/projects/view-transitions-navbar.png
/Users/nroth/workspace/nickroth/src/assets/images/projects/view-transitions-filter-bar.png
/Users/nroth/workspace/nickroth/src/assets/images/projects/datocms-text-preview.png
/Users/nroth/workspace/nickroth/src/assets/images/projects/datocms-react-perf.png
/Users/nroth/workspace/nickroth/src/ass...
```

**grep:**

```
Found 5 match(es) in 2 file(s)

/Users/nroth/workspace/nickroth/src/content/work/view-transitions-consistent-layouts.mdx
  18: import LazyGif from '../../components/LazyGif.astro';
  39: <LazyGif
  44: <LazyGif

/Users/nroth/workspace/nickroth/src/components/LazyGif.astro
  10: * <LazyGif
  17: * <LazyGif

```
---

## assistant (2026-02-18T23:39:56.555Z)

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/work/view-transitions-consistent-layouts.mdx</path>
<type>file</type>
<content>1: ---
2: title: "Consistent Layouts Make MPAs Feel Like SPAs"
3: description: "How strategic use of transition:name on shared elements creates seamless navigation without JavaScript frameworks-the 'PROJECTS' stays put while categories morph."
4: company: "Personal Project"
5: role: "Frontend Developer"
6: startDate: 2024-12-28
7: featured: false
8: tags: ["View Transi...
```

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/components/WorkCard.astro</path>
<type>file</type>
<content>1: ---
2: import type { CollectionEntry } from "astro:content";
3: import type { ImageMetadata } from "astro";
4: import { Image, getImage } from "astro:assets";
5: import ArticleOutline from "./ArticleOutline.astro";
6: import TechHero from "./TechHero.astro";
7: 
8: export interface Props {
9: 	entry: CollectionEntry<"work">;
10: 	mode?: "card" | "expanded";
11: }
12: 
13: const { entry, mode ...
```
---

## user (2026-02-18T23:40:56.565Z)

<system-reminder>
[BACKGROUND TASK COMPLETED]
**ID:** `bg_96a15e8a`
**Description:** Research resume-chatbot source docs for article content material
**Duration:** 1m 16s

**1 task still in progress.** You WILL be notified when ALL complete.
Do NOT poll - continue productive work.

Use `background_output(task_id="bg_96a15e8a")` to retrieve this result when ready.
</system-reminder>
---

## user (2026-02-18T23:41:08.738Z)

<system-reminder>
[ALL BACKGROUND TASKS COMPLETE]

**Completed:**
- `bg_44d78360`: Explore existing article patterns, LazyGif component, content schema, and parentProject linking
- `bg_96a15e8a`: Research resume-chatbot source docs for article content material

Use `background_output(task_id="<id>")` to retrieve each result.
</system-reminder>
---

## assistant (2026-02-19T00:00:07.753Z)



Let me retrieve both background task results:

**background_output:**

```
Task not found: bg_44d78360
```

**background_output:**

```
Task not found: bg_96a15e8a
```
---

## assistant (2026-02-19T00:00:12.425Z)

The background tasks expired, but I already have all the critical data from my direct reads. Let me check a few remaining things:

**grep:**

```
Found 10 match(es) in 4 file(s)

/Users/nroth/workspace/nickroth/src/pages/background.astro
  466: Discovered that iframe bridging breaks React's reference equality, causing excessive re-renders. Developed deep-comparison wrappers and optimization patterns.

/Users/nroth/workspace/nickroth/src/content/work/datocms-form-outlet-optimization.mdx
  111: | Number of iframes | 10 | 1 |
  120: 4. **Fewer iframes = better performance** - Each iframe has overhead

/Users/nroth/workspace/nickroth/src/cont...
```

**grep:**

```
No matches found
```

**glob:**

```
Found 1 file(s)

/Users/nroth/workspace/nickroth/src/assets/images/projects/resume-chatbot.png
```

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/work/email-platform-migration.mdx</path>
<type>file</type>
<content>1: ---
2: title: "Email Platform Migration: $35K Monthly Savings Case Study"
3: description: "How we migrated from a legacy email platform to AWS SES, achieving 85% cost reduction and 50% better deliverability with automated template generation."
4: company: "DealNews"
5: role: "Technical Product Manager" 
6: startDate: 2023-01-01
7: endDate: 2023-06-30
8: featured: true
9: tags:...
```
---

## assistant (2026-02-19T00:00:19.499Z)

Now let me check one critical thing — how the `[slug].astro` page renders work entries and handles sub-articles:

**glob:**

```
No files found
```

**grep:**

```
No matches found
```
---

## assistant (2026-02-19T00:00:24.562Z)

**glob:**

```
Found 2 file(s)

/Users/nroth/workspace/nickroth/src/pages/work/[slug].astro
/Users/nroth/workspace/nickroth/src/pages/work/index.astro
```
---

## assistant (2026-02-19T00:00:28.066Z)

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/pages/work/[slug].astro</path>
<type>file</type>
<content>1: ---
2: import { type CollectionEntry, getCollection } from "astro:content";
3: import WorkCard from "../../components/WorkCard.astro";
4: import OutlineBottomSheet from "../../components/OutlineBottomSheet.astro";
5: import BaseLayout from "../../layouts/BaseLayout.astro";
6: import SchemaOrg from "../../components/SchemaOrg.astro";
7: 
8: export async function getStaticPaths() {
9: 	const work...
```
---

## assistant (2026-02-19T00:00:31.473Z)

Now let me check if there's any existing rendering of sub-article links on parent pages:

**grep:**

```
No matches found
```

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/work/astro-portfolio-ai-development.mdx</path>
<type>file</type>
<content>1: ---
2: title: "Building an Astro Portfolio with AI-Assisted Development"
3: description: "How I built a modern portfolio website using Astro 5, DaisyUI neobrutalism theme, and AI coding agents-featuring smooth view transitions and Figma-to-code workflow."
4: company: "Personal Project"
5: role: "Designer & Developer"
6: startDate: 2024-12-01
7: featured: true
8: tags: ["...
```
---

## assistant (2026-02-19T00:00:36.317Z)

**grep:**

```
Found 5 match(es) in 1 file(s)

/Users/nroth/workspace/nickroth/src/content/work/astro-portfolio-ai-development.mdx
  82: ## View Transitions Deep Dive
  199: ## Deep Dives
  204: - [Consistent Layouts Make MPAs Feel Like SPAs](/work/view-transitions-consistent-layouts) - Shared element transitions and the "stable anchor" pattern
  205: - [Persistent Filter Bar with View Transitions](/work/view-transitions-filter-bar) - Scroll position restoration, hover state persistence, and the `transition:pe...
```
---

## assistant (2026-02-19T00:00:40.102Z)

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/work/astro-portfolio-ai-development.mdx</path>
<type>file</type>
<content>195: - **View transitions require planning** - Element naming must be consistent across pages
196: - **Neobrutalism is opinionated** - Hard shadows and bold borders need careful balance
197: - **AI agents need structure** - AGENTS.md and clear file organization accelerate development
198: 
199: ## Deep Dives
200: 
201: For more technical detail on specific components:
202: ...
```
---

## assistant (2026-02-19T00:00:43.114Z)

Now I have a complete picture. Let me also verify the `techBrand` enum values to confirm what's available:

**read:**

```
<path>/Users/nroth/workspace/nickroth/src/content/config.ts</path>
<type>file</type>
<content>41:     // Tech brand for modular hero (astro, datocms, react, etc.)
42:     techBrand: z.enum(['astro', 'datocms', 'react', 'generic']).optional(),
43:     // Feature text to display in tech hero
44:     heroFeature: z.string().optional(),
45:   }),

(File has more lines. Use 'offset' parameter to read beyond line 45)
</content>
```
---

## assistant (2026-02-19T00:00:47.926Z)

Now I have everything I need. Here is my complete analysis:

---

## Intent Classification
**Type**: Mid-sized Task  
**Confidence**: High  
**Rationale**: Bounded deliverables (3 MDX files, 1 Astro component, SVG diagrams), clear scope, content-focused with one small code addition. The risk is scope creep into site infrastructure changes.

---

## Pre-Analysis Findings

### Validated Patterns (from direct codebase inspection)

1. **parentProject linking**: Works purely as frontmatter metadata (`parentProject: "resume-chatbot"`). There is **no automatic rendering** of sub-article links — the parent article manually lists links in a "## Deep Dives" section (see `astro-portfolio-ai-development.mdx:199-206`). The `[slug].astro` page doesn't query or display related sub-articles. This is important: the parent article must manually include the links.

2. **Sub-article frontmatter pattern** (from `view-transitions-navbar.mdx`):
   - Has `techBrand` + `heroFeature` for branded hero
   - Has `parentProject: "astro-portfolio-ai-development"`
   - Has its own `image`, `category`, `impact`, `stack`, `roleCategory`
   - Does NOT have `featured: true`

3. **LazyGif.astro** (300 lines): Uses IntersectionObserver with 200px rootMargin for preloading. Handles video (webm/mp4) and GIF. Has poster support, dark mode styles, play/pause on visibility. Re-initializes on `astro:after-swap` for view transitions. **This is the template for LazyVideo.astro** but the interaction model is fundamentally different (click-to-play iframe vs auto-play video).

4. **MDX component imports**: Components are imported directly in MDX body (not frontmatter): `import LazyGif from '../../components/LazyGif.astro';` — then used as JSX in the body.

5. **No existing SVG diagrams in articles**: Zero `.svg` references in content files. No established pattern for inline SVG diagrams in articles.

6. **No existing iframe/video embeds**: No Google Drive embeds, no iframe patterns anywhere in content. This is genuinely new territory.

7. **Image assets**: Only `resume-chatbot.png` exists. Sub-articles will need their own hero images.

8. **techBrand enum**: `['astro', 'datocms', 'react', 'generic']` — no `nextjs` or `ai` option. Sub-articles without `techBrand` fall through to the `image` path in `WorkCard.astro:117-128`.

---

## Questions You Should Have Asked But Didn't

### 1. **Where does the resume-chatbot source code live?**
The plan references "code samples from the actual resume-chatbot repo source" and "5 rich source documents in resume-chatbot/docs/". But I found **no resume-chatbot directory or docs** anywhere in this workspace. The implementing agent needs to know:
- Is it a sibling repo? A git submodule? A separate workspace?
- Should code samples be copied verbatim into MDX, or referenced via links?
- If copied, they'll go stale. If linked, they need a stable URL (GitHub permalink).

**Recommendation for Prometheus**: Specify exact file paths or GitHub URLs for every code sample. Don't leave the agent to "find" them.

### 2. **What are the exact slugs for the two new sub-articles?**
The parent stays at `resume-chatbot`. But what are the sub-article filenames?
- `resume-chatbot-streaming-architecture.mdx`?
- `resume-chatbot-json-patching.mdx`?
- `resume-chatbot-deterministic-testing.mdx`?

This matters because the parent article's "Deep Dives" section needs to link to `/work/{slug}`.

### 3. **What happens to the existing resume-chatbot.png hero image?**
The current article uses `image: "../../assets/images/projects/resume-chatbot.png"`. The plan says the parent article gets a video demo. Does the image stay as the hero (with video embedded in the body), or does the hero change? The `WorkCard.astro` renders the `image` field as the hero in both card and expanded modes.

### 4. **How should SVG diagrams handle dark mode concretely?**
You said "dark/light mode compatible" but there's **no existing pattern** for this in the codebase. Options:
- Two SVG files (light/dark) with CSS `display` toggling via `[data-theme]`
- Single SVG with `currentColor` and CSS variables
- Single SVG with a `<style>` block using `prefers-color-scheme`
- Inline SVG in MDX with theme-aware fills

This needs a decision before implementation, not during.

### 5. **Video thumbnail extraction — how?**
You mentioned "Extract frame from the Google Drive video." This is a manual step that requires:
- Downloading the video
- Extracting a frame (ffmpeg or screenshot)
- Saving as webp/png to `src/assets/images/projects/`

Is this a task for the agent, or will the user provide the thumbnail? Agents can't access Google Drive videos.

---

## Identified Risks

### Risk 1: Google Drive Video Embedding Reliability
**Risk**: Google Drive video embeds are notoriously unreliable — they require specific sharing permissions, the embed URL format changes, and they may show Google's UI chrome or require sign-in.
**Mitigation**: The LazyVideo component should use a standard `<iframe>` with `allow="autoplay"` and the correct Google Drive embed URL format (`https://drive.google.com/file/d/{ID}/preview`). Test that the video is publicly accessible. Consider a fallback state if the iframe fails to load.

### Risk 2: SVG Diagrams as Unbounded Work
**Risk**: "Agent-produced SVG diagrams" is vague. Architecture diagrams can become a rabbit hole — getting the layout, labels, arrows, and styling right in raw SVG is time-consuming. There's no existing pattern to follow.
**Mitigation**: Define exact diagram count (looks like 1 high-level for parent, 1-2 per sub-article = 3-5 total). Specify whether these are hand-coded SVG, generated via Mermaid→SVG, or created with a diagramming tool. Set a complexity ceiling (boxes + arrows, no fancy illustrations).

### Risk 3: Content Quality Without Source Material Access
**Risk**: The plan assumes the agent can pull code samples from the resume-chatbot repo. If that repo isn't accessible in the workspace, the agent will either fabricate code or produce thin articles.
**Mitigation**: Either clone the resume-chatbot repo into the workspace before starting, or pre-extract all code samples into a reference document the agent can read.

### Risk 4: Frontmatter Schema Mismatch for Sub-Articles
**Risk**: The `techBrand` enum doesn't include a value suitable for the resume-chatbot sub-articles. Using `'generic'` may produce an unexpected hero. Not using `techBrand` means falling through to the `image` path, which requires each sub-article to have its own image asset.
**Mitigation**: Decide explicitly: either create hero images for each sub-article, or add a new `techBrand` value (e.g., `'nextjs'` or `'ai'`), which requires a schema change. The plan says "use generic image-based hero" — this means 2 new image assets need to be created or sourced.

### Risk 5: Branch Strategy Collision
**Risk**: Working on `content/resume-chatbot-articles` branch while the site may have other in-flight changes on `main`.
**Mitigation**: Ensure the branch is created from current `main` HEAD. The plan should specify: create branch → do all work → PR for preview. No rebasing mid-work.

---

## Potential Scope Creep Areas to Lock Down

### 🔒 1. LazyVideo.astro Must NOT Become a General Media Component
The temptation will be to build a universal `<LazyMedia>` component that handles videos, iframes, images, etc. **Lock it down**: LazyVideo handles exactly one thing — a click-to-reveal iframe with a poster thumbnail. No autoplay, no video element, no GIF support.

### 🔒 2. No Changes to WorkCard.astro or [slug].astro
The plan says "no changes to site layout." Make this explicit: WorkCard.astro, [slug].astro, BaseLayout, and the content schema (`config.ts`) must NOT be modified. If the sub-articles need a new `techBrand` value, that's a schema change that should be called out as a separate, explicit task.

### 🔒 3. No New CSS in global.css
The LazyVideo component should use scoped `<style>` (like LazyGif does), not add to global.css. Article prose styling should use existing `prose-content` class.

### 🔒 4. Diagram Count and Complexity Ceiling
Specify: "Maximum 4 SVG diagrams total. Each diagram is boxes-and-arrows only, no illustrations, no gradients, no animations. Dark mode via `currentColor` or CSS variables."

### 🔒 5. No Resume-Chatbot Repo Changes
The plan says this explicitly but it should be a hard guardrail in every task.

### 🔒 6. Article Length Boundaries
Without length guidance, AI will produce 3,000-word articles. Set targets:
- Parent article: 400-600 words (focused overview, not a rehash)
- Architecture sub-article: 1,200-1,800 words
- Testing sub-article: 1,000-1,500 words

### 🔒 7. No New Dependencies
LazyVideo.astro must use vanilla JS + IntersectionObserver only. No lite-youtube-embed, no third-party iframe libraries.

---

## Assumptions That Need Validation

| # | Assumption | Risk if Wrong | Validation Needed |
|---|-----------|---------------|-------------------|
| 1 | Resume-chatbot source repo is accessible to the implementing agent | Agent can't write code samples → thin articles | Confirm repo path or pre-extract samples |
| 2 | Google Drive video is publicly shared (anyone with link can view) | Embed will show "sign in required" | Test the embed URL in incognito |
| 3 | Existing `resume-chatbot.png` is adequate for the parent article hero | May need a new screenshot showing the actual app | User to confirm |
| 4 | Sub-articles don't need `techBrand` — plain image hero is acceptable | Cards on /work page will look inconsistent with other sub-articles (VT ones all have techBrand) | User to confirm visual intent |
| 5 | The "Related" / "Deep Dives" links in the parent article are manually authored in MDX (not auto-generated) | Correct — confirmed from codebase. No auto-rendering of parentProject links exists. | ✅ Validated |
| 6 | MDX can import and render Astro components (LazyVideo) | ✅ Validated — LazyGif is imported in `view-transitions-consistent-layouts.mdx` | ✅ Validated |
| 7 | SVG files can be referenced as `<img>` in MDX with standard paths | No existing pattern — needs testing. May need to go through Astro's image pipeline or use raw `/public/` paths | Test during implementation |

---

## Missing Acceptance Criteria

### Build Verification
```bash
pnpm run build
# Assert: Exit code 0, no type errors, no content collection errors
```

### Content Collection Validation
```bash
# After build, verify all 3 articles are generated:
ls dist/work/resume-chatbot/index.html
ls dist/work/resume-chatbot-streaming-architecture/index.html  # or whatever slug
ls dist/work/resume-chatbot-deterministic-testing/index.html   # or whatever slug
# Assert: All 3 files exist
```

### Parent Article Links Work
```bash
# Verify parent article contains links to sub-articles
grep -c "resume-chatbot-streaming" dist/work/resume-chatbot/index.html
grep -c "resume-chatbot-deterministic" dist/work/resume-chatbot/index.html
# Assert: Both return >= 1
```

### Sub-Article parentProject Linking
```bash
# Verify sub-articles have parentProject in frontmatter (build won't catch this)
grep "parentProject" src/content/work/resume-chatbot-streaming-architecture.mdx
grep "parentProject" src/content/work/resume-chatbot-deterministic-testing.mdx
# Assert: Both contain 'parentProject: "resume-chatbot"'
```

### LazyVideo Component Renders
```bash
# Verify LazyVideo is imported and used in the parent article
grep "LazyVideo" src/content/work/resume-chatbot.mdx
# Assert: Returns import line and usage
```

### SVG Diagrams Exist and Are Referenced
```bash
# Verify SVG files exist (adjust paths based on decision)
ls src/assets/diagrams/resume-chatbot-*.svg 2>/dev/null || ls public/diagrams/resume-chatbot-*.svg 2>/dev/null
# Assert: At least 1 SVG file exists
```

### Dark Mode SVG Compatibility
```bash
# Verify SVGs use currentColor or CSS variables (not hardcoded colors)
grep -l "currentColor\|var(--" src/assets/diagrams/*.svg public/diagrams/*.svg 2>/dev/null
# Assert: All SVG files use theme-aware colors
```

### No Unintended File Changes
```bash
git diff --name-only main..HEAD | grep -v "src/content/work/\|src/components/LazyVideo\|src/assets/\|public/"
# Assert: Empty output (no changes outside content, component, and assets)
```

### External Links Are Valid
```bash
# Verify key external links are present in articles
grep "fast-json-patch\|RFC 6902\|vercel.com/docs\|json-resume\|playwright" src/content/work/resume-chatbot*.mdx
# Assert: Returns matches from multiple files
```

---

## Edge Cases Not Addressed

1. **Google Drive video unavailable**: What does LazyVideo show if the iframe fails to load? Need an error/fallback state, not a blank box.

2. **Mobile viewport for LazyVideo**: The click-to-play pattern works well on desktop but on mobile, the iframe may be too small to be useful. Need to define minimum height and whether it should go full-width.

3. **View transitions with LazyVideo**: When navigating away from an article with an active iframe and returning, does the iframe re-initialize correctly? LazyGif handles this with `astro:after-swap` — LazyVideo needs the same.

4. **SVG diagram sizing on mobile**: Architecture diagrams with many boxes may be unreadable on mobile. Need responsive sizing or a "tap to zoom" pattern.

5. **Code sample syntax highlighting**: The existing articles use fenced code blocks with language hints (```astro, ```css). Confirm the site's MDX pipeline handles syntax highlighting for `typescript`, `json`, and `tsx` — the languages the resume-chatbot articles will need.

6. **SEO: og:image for sub-articles**: The `[slug].astro` page generates `ogImageUrl` from `entry.data.image`. If sub-articles don't have images, the OG image will be empty. This affects social sharing previews.

---

## Directives for Prometheus

### Core Directives
- **MUST**: Specify exact file paths or GitHub permalink URLs for every code sample before the writing tasks begin
- **MUST**: Define SVG diagram approach (inline vs file, dark mode strategy) as a prerequisite decision task
- **MUST**: Create LazyVideo.astro as a scoped component with `<style>` block (pattern: `LazyGif.astro`)
- **MUST**: Include `astro:after-swap` event listener in LazyVideo for view transition compatibility
- **MUST**: Manually add "## Deep Dives" section with links in the parent article (no auto-rendering exists)
- **MUST**: Each sub-article needs its own `image` asset since no `techBrand` is being used
- **MUST NOT**: Modify `WorkCard.astro`, `[slug].astro`, `BaseLayout`, or `config.ts`
- **MUST NOT**: Add to `global.css` — all new styles scoped to components
- **MUST NOT**: Install any new npm dependencies
- **MUST NOT**: Exceed article length targets (parent: 400-600 words, subs: 1,200-1,800 words)
- **MUST NOT**: Create more than 4 SVG diagrams total
- **MUST NOT**: Touch the resume-chatbot repo
- **PATTERN**: Follow `src/content/work/view-transitions-navbar.mdx` for sub-article frontmatter structure
- **PATTERN**: Follow `src/content/work/astro-portfolio-ai-development.mdx:199-206` for "Deep Dives" link section
- **PATTERN**: Follow `src/content/work/view-transitions-consistent-layouts.mdx:18` for MDX component imports
- **PATTERN**: Follow `src/components/LazyGif.astro` for LazyVideo component structure (IntersectionObserver, dark mode, view transition re-init)
- **TOOL**: Use `pnpm run build` after each content file is created to catch schema/type errors early

### QA/Acceptance Criteria Directives (MANDATORY)
- **MUST**: `pnpm run build` exits 0 with all 3 articles present
- **MUST**: All sub-articles contain `parentProject: "resume-chatbot"` in frontmatter
- **MUST**: Parent article contains working relative links to both sub-articles
- **MUST**: LazyVideo component includes click-to-play interaction, poster thumbnail, and iframe error fallback
- **MUST**: SVG diagrams render in both light and dark themes (verify with `[data-theme="neobrutalism-dark"]`)
- **MUST**: `git diff --name-only` shows only expected files (content, LazyVideo component, assets)
- **MUST NOT**: Create criteria requiring "user opens browser and checks..."

---

## Recommended Approach

**Task ordering**: (1) Decision task: resolve source material access, SVG strategy, exact slugs, and hero image plan. (2) Build LazyVideo.astro component. (3) Write parent article with video embed, diagram, and Deep Dives links. (4) Write architecture sub-article. (5) Write testing sub-article. (6) Final build verification and PR creation. Each content task should end with `pnpm run build` to catch errors incrementally rather than at the end.