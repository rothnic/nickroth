# Session ses_38ce07d98ffeMP4fhq6TfJuucz (Part 2/2)

## assistant (2026-02-18T23:40:15.944Z)

<analysis>
**Literal Request**: "Find and report on ALL of the following: 1) LazyGif.astro at src/components/LazyGif.astro (full source + IntersectionObserver pattern & props), 2) all articles using parentProject frontmatter and their frontmatter, 3) content collection schema showing project fields, 4) full resume-chatbot.mdx (78 lines), 5) hero component patterns — how articles WITHOUT techBrand render their hero, 6) one complete sub-article example (frontmatter + first 30 lines of body), 7) SVG usage in articles (how referenced/loaded), 8) MDX component imports/examples (how MDX files import/use Astro components). Report with file paths and line numbers."

**Actual Need**: You want a complete inventory and explanation of the existing content & component patterns so you can validate a plan to create 3 MDX articles for the resume-chatbot project. Specifically: how lazy media is implemented, how sub-articles link to parent projects, what fields are available in project frontmatter, how heroes are rendered (image vs techBrand), examples of sub-article structure and component usage, and whether/how SVGs are used.

**Success Looks Like**: I provide:
- The full LazyGif.astro source and a concise breakdown of the IntersectionObserver logic and props (so you can re-use it).
- A complete list of all content files that set parentProject, with their full frontmatter (so you can use parentProject correctly).
- The content schema lines that define the project fields (so you know which frontmatter keys are valid).
- The full resume-chatbot.mdx content (frontmatter + body).
- The component(s) that control project hero rendering and a clear explanation of the conditional logic for techBrand vs image-based heroes.
- One sub-article (frontmatter + first 30 lines of body) as a copy-pasteable template.
- Where SVGs live and how they are used/loaded.
- Examples of MDX files importing and using Astro components (with precise line numbers).
- Absolute file paths and line numbers for every reference so you can open & edit them immediately.

I launched parallel searches and reads across the repo to gather all items; below are the validated results.
</analysis>

<results>
<files>
- /Users/nroth/workspace/nickroth/src/components/LazyGif.astro — Full LazyGif component (lazy load pattern, IntersectionObserver logic, props interface). (Lines: full file 1–300)
- /Users/nroth/workspace/nickroth/src/content/config.ts — Content collection definitions including the "work" collection schema (shows available frontmatter fields like parentProject, techBrand, heroFeature, image). (Lines: full file 1–64; work schema lines 23–46)
- /Users/nroth/workspace/nickroth/src/content/work/resume-chatbot.mdx — Full MDX article for the resume-chatbot project (frontmatter + body; 78 lines). (Lines: full file 1–78)
- /Users/nroth/workspace/nickroth/src/components/WorkCard.astro — Component that renders project cards and the expanded project page hero; contains the logic that selects TechHero vs image-based hero. (Lines: relevant conditional at 113–129 and expanded hero at 176–186 and 179–183)
- /Users/nroth/workspace/nickroth/src/components/TechHero.astro — Tech-branded hero component (SVG logos, feature text, variants 'compact'/'full'). (Lines: full file 1–105; logo SVGs at 55–66, 68–75, 77–84, feature text 88–90)
- /Users/nroth/workspace/nickroth/src/components/Hero.astro — Site top-level Hero component (site home hero, shows animation + Motion usage). (Lines: 1–264; motion script lines 172–262)
- /Users/nroth/workspace/nickroth/src/content/work/view-transitions-consistent-layouts.mdx — Example article that imports LazyGif and uses it; also is a sub-article (has parentProject). (Import lines 18 & LazyGif usage lines 38–49; frontmatter lines 1–15)
- /Users/nroth/workspace/nickroth/src/content/work/view-transitions-filter-bar.mdx — Uses techBrand and parentProject (example of persistent UI patterns). (Frontmatter lines 1–15; imports Image + images lines 18–21; many patterns in body)
- /Users/nroth/workspace/nickroth/src/content/work/view-transitions-navbar.mdx — Sub-article with parentProject and techBrand; example sub-article used here. (Frontmatter lines 1–16; body begins line 18)
- /Users/nroth/workspace/nickroth/src/content/work/datocms-structured-text-preview.mdx — Sub-article using parentProject. (Frontmatter lines 1–16)
- /Users/nroth/workspace/nickroth/src/content/work/datocms-multi-hook-plugin.mdx — Sub-article using parentProject. (Frontmatter lines 1–16)
- /Users/nroth/workspace/nickroth/src/content/work/datocms-react-performance.mdx — Sub-article using parentProject. (Frontmatter lines 1–16)
- /Users/nroth/workspace/nickroth/src/content/work/datocms-form-outlet-optimization.mdx — Sub-article using parentProject. (Frontmatter lines 1–16)
- /Users/nroth/workspace/nickroth/src/content/work/ai-assisted-design.mdx — Sub-article using parentProject. (Frontmatter lines 1–15)
- /Users/nroth/workspace/nickroth/src/components/icons/ — Directory of small Astro icon components (Brain.astro, Code.astro, Zap.astro, ArrowDown.astro, etc.) — used by Hero and other UI components; these contain inline SVG markup. (Examples: /src/components/icons/Brain.astro etc.)
- /Users/nroth/workspace/nickroth/src/components/CapabilitiesMarquee.astro — Contains embedded SVG strings used directly in component HTML (shows another SVG usage pattern).
</files>

<answer>
Below are the findings and actionable summaries for each numbered request. All file paths are absolute and include line references so you can jump straight to the code.

1) LazyGif.astro — full source + IntersectionObserver pattern + props
- File: /Users/nroth/workspace/nickroth/src/components/LazyGif.astro (full file lines 1–300).
- Props interface (lines 24–37):
  - interface Props { src: string; alt: string; poster?: string; caption?: string; width?: number; height?: number; }
  - Astro.props destructure at line 39.
- Type detection (line 42):
  - const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');
- Markup and data attributes (lines 45–107):
  - wrapper div uses data-src, data-is-video, data-poster to store source for lazy loading (lines 46–51).
  - Renders either poster <img>, a <video> poster, or a placeholder depending on poster/isVideo (lines 53–76).
  - The animation elements are present with data-src and are hidden until loaded (lines 80–98).
- Styles (lines 109–192) define classes for poster, animation, loading, playing states.
- JavaScript: IntersectionObserver logic (lines 194–299):
  - initLazyGifs finds wrappers not initialized (line 197).
  - loadObserver: starts preloading when element is near viewport; rootMargin: '200px' (line 211). When entry.isIntersecting -> loadAndPlayAnimation and unobserve (lines 202–208).
  - visibilityObserver: toggles playing/paused state when wrapper is visible (threshold: 0.1) (lines 216–242). Only acts after wrapper.classList.contains('loaded') (line 221).
  - loadAndPlayAnimation(wrapper): sets loading UI, attaches oncanplay/onerror for video and onload/onerror for image; sets src and triggers load/play (lines 251–293). For video, oncanplay removes loading class and adds 'loaded' and 'playing' (lines 264–269). For GIF image, onload marks loaded/playing (lines 282–285).
  - Initialization runs on page load and after Astro view transitions: initLazyGifs(); document.addEventListener('astro:after-swap', initLazyGifs) (lines 296–299).
- Practical notes:
  - Preload threshold is intentionally generous (200px) so video/webm typically finishes loading before user reaches it.
  - VisibilityObserver ensures playback is paused/reset when the animation leaves viewport (pauses & resets currentTime to 0 for video) — good for CPU/battery.
  - Data attributes are used to keep the server-rendered markup static and defer loading in the client.

2) parentProject pattern — ALL articles that use parentProject + full frontmatter
- I found these files with parentProject present in their frontmatter. For each file I include the frontmatter lines (as-is) and line numbers.

a) /Users/nroth/workspace/nickroth/src/content/work/view-transitions-consistent-layouts.mdx (frontmatter lines 1–15)
1: ---
2: title: "Consistent Layouts Make MPAs Feel Like SPAs"
3: description: "How strategic use of transition:name on shared elements creates seamless navigation without JavaScript frameworks-the 'PROJECTS' stays put while categories morph."
4: company: "Personal Project"
5: role: "Frontend Developer"
6: startDate: 2024-12-28
7: featured: false
8: tags: ["View Transitions", "Astro", "Layout", "UX"]
9: techBrand: "astro"
10: heroFeature: "LAYOUTS"
11: category: "WEB PLATFORMS"
12: impact: "SEAMLESS MPA NAVIGATION THROUGH CONSISTENT LAYOUT STRUCTURE AND STRATEGIC VIEW TRANSITION NAMING."
13: stack: ["ASTRO", "VIEW TRANSITIONS API", "CSS"]
14: roleCategory: "DEVELOPER"
15: parentProject: "astro-portfolio-ai-development"
16: ---

b) /Users/nroth/workspace/nickroth/src/content/work/view-transitions-filter-bar.mdx (frontmatter lines 1–15)
1: ---
2: title: "Persistent Filter Bar with View Transitions"
3: description: "A deep dive into building a horizontally-scrollable filter component that maintains scroll position and active styling across page transitions using Astro's View Transitions API."
4: company: "Personal Project"
5: role: "Frontend Developer"
6: startDate: 2024-12-15
7: featured: false
8: tags: ["View Transitions", "Astro", "UX", "CSS", "JavaScript"]
9: techBrand: "astro"
10: heroFeature: "FILTER BAR"
11: category: "WEB PLATFORMS"
12: impact: "SEAMLESS CATEGORY FILTERING WITH PROFESSIONAL POLISH-NO SCROLL JUMPS, NO LAYOUT SHIFTS."
13: stack: ["ASTRO 5", "VIEW TRANSITIONS", "SESSION STORAGE", "CSS ANIMATIONS"]
14: roleCategory: "FRONTEND DEVELOPER"
15: parentProject: "astro-portfolio-ai-development"
16: ---

c) /Users/nroth/workspace/nickroth/src/content/work/view-transitions-navbar.mdx (frontmatter lines 1–15)
1: ---
2: title: "Navbar Active State Morphing with View Transitions"
3: description: "How to create a sliding active indicator that smoothly morphs between navigation items using Astro's View Transitions API-with precise control over animation direction and timing."
4: company: "Personal Project"
5: role: "Frontend Developer"
6: startDate: 2024-12-10
7: featured: false
8: tags: ["View Transitions", "Astro", "Navigation", "CSS", "Animation"]
9: techBrand: "astro"
10: heroFeature: "NAVBAR"
11: category: "WEB PLATFORMS"
12: impact: "A NAVBAR THAT FEELS ALIVE-THE ACTIVE INDICATOR SLIDES BETWEEN ITEMS DURING PAGE TRANSITIONS."
13: stack: ["ASTRO 5", "VIEW TRANSITIONS", "CSS KEYFRAMES", "SHARED ELEMENTS"]
14: roleCategory: "FRONTEND DEVELOPER"
15: parentProject: "astro-portfolio-ai-development"
16: ---

d) /Users/nroth/workspace/nickroth/src/content/work/datocms-structured-text-preview.mdx (frontmatter lines 1–15)
1: ---
2: title: "Real-Time Structured Text Preview in DatoCMS"
3: description: "Solving the challenge of transforming unsaved form values into valid Structured Text for live preview, enabling content editors to see accurate previews without saving."
4: company: "DealNews"
5: role: "Director of Product Management"
6: startDate: 2024-03-01
7: featured: false
8: tags: ["DatoCMS", "React", "Content Preview", "TypeScript"]
9: techBrand: "datocms"
10: heroFeature: "LIVE PREVIEW"
11: category: "WEB PLATFORMS"
12: impact: "REAL-TIME PREVIEW ENABLING CONTENT EDITORS TO SEE CHANGES INSTANTLY."
13: stack: ["DATOCMS", "REACT", "TYPESCRIPT", "GRAPHQL"]
14: roleCategory: "TECHNICAL LEAD"
15: parentProject: "content-platform-modernization"
16: ---

e) /Users/nroth/workspace/nickroth/src/content/work/datocms-multi-hook-plugin.mdx (frontmatter lines 1–15)
1: ---
2: title: "Building a High-Performance Multi-Hook DatoCMS Plugin Architecture"
3: description: "How I developed a sophisticated single-plugin architecture that shares core functionality across Form Outlets, Field Extensions, and Sidebar Panels-minimizing performance overhead while maximizing flexibility."
4: company: "DealNews"
5: role: "Director of Product Management"
6: startDate: 2024-05-01
7: featured: false
8: tags: ["DatoCMS", "Plugin Development", "React", "TypeScript", "Architecture"]
9: techBrand: "datocms"
10: heroFeature: "MULTI-HOOK PLUGIN"
11: category: "WEB PLATFORMS"
12: impact: "ADVANCED PLUGIN ARCHITECTURE RECOGNIZED BY DATOCMS STAFF FOR ROBUSTNESS."
13: stack: ["DATOCMS", "REACT", "TYPESCRIPT", "ZUSTAND"]
14: roleCategory: "TECHNICAL LEAD"
15: parentProject: "content-platform-modernization"
16: ---

f) /Users/nroth/workspace/nickroth/src/content/work/datocms-react-performance.mdx (frontmatter lines 1–15)
1: ---
2: title: "Solving React Performance Issues in DatoCMS Plugin iFrames"
3: description: "Deep analysis of how iframe bridging breaks React reference equality in DatoCMS plugins, causing excessive re-renders and performance bottlenecks-with solutions."
4: company: "DealNews"
5: role: "Director of Product Management"
6: startDate: 2024-02-01
7: featured: false
8: tags: ["DatoCMS", "React", "Performance", "TypeScript", "Optimization"]
9: techBrand: "datocms"
10: heroFeature: "REACT PERFORMANCE"
11: category: "WEB PLATFORMS"
12: impact: "IDENTIFIED CRITICAL PERFORMANCE BOTTLENECK IN DATOCMS PLUGIN SDK."
13: stack: ["DATOCMS", "REACT", "TYPESCRIPT"]
14: roleCategory: "TECHNICAL LEAD"
15: parentProject: "content-platform-modernization"
16: ---

g) /Users/nroth/workspace/nickroth/src/content/work/datocms-form-outlet-optimization.mdx (frontmatter lines 1–16)
1: ---
2: title: "Optimizing DatoCMS UI Space with Form Outlets"
3: description: "An innovative workaround using Form Outlets to bypass field extension space constraints, enabling dynamic height management for complex plugin UIs."
4: company: "DealNews"
5: role: "Director of Product Management"
6: startDate: 2024-04-01
7: featured: false
8: tags: ["DatoCMS", "Plugin Development", "UI/UX", "TypeScript"]
9: category: "WEB PLATFORMS"
10: impact: "ELIMINATED UNNECESSARY UI SPACE PENALTIES FOR MULTI-FIELD PLUGINS."
11: stack: ["DATOCMS", "REACT", "TYPESCRIPT"]
12: roleCategory: "TECHNICAL LEAD"
13: parentProject: "content-platform-modernization"
14: techBrand: "datocms"
15: heroFeature: "FORM OUTLETS"
16: ---

h) /Users/nroth/workspace/nickroth/src/content/work/ai-assisted-design.mdx (frontmatter lines 1–15)
1: ---
2: title: "AI-Assisted Design: From Prompt to Production"
3: description: "A practical comparison of AI design tools like Google Stitch, Vercel v0, and Figma Make-and how to choose the right tool for your framework and workflow."
4: company: "Personal Project"
5: role: "Designer & Developer"
6: startDate: 2024-12-20
7: featured: false
8: tags: ["AI Design", "Stitch", "v0", "Figma", "Prototyping"]
9: image: "../../assets/images/projects/ai-assisted-design.png"
10: category: "WEB PLATFORMS"
11: impact: "RAPID DESIGN ITERATION USING AI TOOLS THAT GENERATE USABLE CODE-NOT JUST MOCKUPS."
12: stack: ["GOOGLE STITCH", "VERCEL V0", "FIGMA", "TAILWIND CSS"]
13: roleCategory: "DESIGNER & DEVELOPER"
14: parentProject: "astro-portfolio-ai-development"
15: ---

- Pattern & intent:
  - parentProject is used as a slug referring to a higher-level "project" article (e.g., "astro-portfolio-ai-development" or "content-platform-modernization"). That ties focused how-to sub-articles (filters, navbar, consistent layouts) back to a big parent project page.
  - Use-case: the parent project acts as an index/overview; the sub-articles dive into patterns. This provides navigation like "Related → Parent project" links and helps grouping across /work/*.

3) Content schema — where project frontmatter fields are defined
- File: /Users/nroth/workspace/nickroth/src/content/config.ts (full file lines 1–64).
- The important "work" collection schema (lines 23–46) — copied here (line numbers included):
23: const work = defineCollection({
24:   type: 'content',
25:   schema: ({ image }) => z.object({
26:     title: z.string(),
27:     description: z.string(),
28:     company: z.string(),
29:     role: z.string(),
30:     startDate: z.date(),
31:     endDate: z.date().optional(),
32:     featured: z.boolean().default(false),
33:     tags: z.array(z.string()).default([]),
34:     image: image().optional(),
35:     category: z.string().optional(),
36:     impact: z.string().optional(),
37:     stack: z.array(z.string()).default([]),
38:     roleCategory: z.string().optional(),
39:     // Optional parent project slug for focused sub-articles
40:     parentProject: z.string().optional(),
41:     // Tech brand for modular hero (astro, datocms, react, etc.)
42:     techBrand: z.enum(['astro', 'datocms', 'react', 'generic']).optional(),
43:     // Feature text to display in tech hero
44:     heroFeature: z.string().optional(),
45:   }),
46: });

- Actionable: frontmatter keys defined for projects include parentProject, techBrand (allowed enum), heroFeature, image (asset type), category, impact, stack, tags, etc. Use these exact keys/values when authoring the three new MDX articles to be consistent with validation.

4) Existing resume-chatbot.mdx — full file (78 lines)
- File: /Users/nroth/workspace/nickroth/src/content/work/resume-chatbot.mdx (lines 1–78). The file is included verbatim in the repo. Key frontmatter (lines 1–14) + body (lines 16–78).
- Highlights:
  - Frontmatter includes: title, description, company: "Personal Project", role, startDate, featured: true, tags, image (relative path), category: "AI APPLICATION", impact, stack array, roleCategory (lines 1–13).
  - The article body (lines 16–78) describes the project architecture: streaming partialObjectStream, surgical JSON patching, testing strategy, prompt engineering, lessons learned.

5) Hero component patterns — how articles WITHOUT techBrand render their hero
- Primary component that determines hero rendering for project entries: /Users/nroth/workspace/nickroth/src/components/WorkCard.astro.
  - Card-mode hero selection (lines 113–129):
    - If entry.data.techBrand && entry.data.heroFeature are present → render <TechHero tech={techBrand} feature={heroFeature} variant="compact" /> (lines 114–116).
    - Else if image exists → render <Image src={image} ...> (lines 118–128).
    - Else render fallback placeholder block (lines 130–133).
  - Expanded (detail) mode hero (lines 176–186, 179–183):
    - Same conditional: TechHero variant="full" if techBrand+heroFeature; else large Image (lines 179–193).
  - Transition names: expanded hero uses transition:name attributes (lines 174–179 indicate header/figure transition:name usage) — helpful for View Transition morphs on navigation.
- TechHero (path: /Users/nroth/workspace/nickroth/src/components/TechHero.astro) shows how techBrand heroes are rendered:
  - Exposes props: tech (enum), feature (string), variant optional (lines 12–16; 18–19).
  - Renders inline SVG logos and feature text; background colors & textColor via a techConfig mapping (lines 21–49). SVG logos are embedded inline for crispness (lines 55–84).
- So: For articles WITHOUT techBrand, the system uses their image frontmatter (image) and renders it with astro:assets Image in the hero area. If no image provided, a neutral placeholder is used. If techBrand is present (allowed values from schema: 'astro', 'datocms', 'react', 'generic'), TechHero is used instead. WorkCard is the component that centralizes this logic and is used in list & detail contexts.

6) Existing sub-article example — full frontmatter + first 30 lines of body
- I selected: /Users/nroth/workspace/nickroth/src/content/work/view-transitions-navbar.mdx
- Frontmatter (lines 1–16) — same as in section 2(c).
- First 30 lines of body (I present line numbers as in file; body starts at line 18):
18: 
19: # Navbar Active State Morphing with View Transitions
20: 
21: ## The Active State Problem
22: 
23: Standard navigation updates instantly-click a link, and the active indicator jumps to its new position. This works, but misses an opportunity: the View Transitions API can make the indicator **slide** between positions during page navigation, reinforcing spatial relationships in the interface.
24: 
25: This guide covers the implementation patterns for shared-element navbar transitions.
26: 
27: ## Pattern 1: Shared Element Identity
28: 
29: The View Transitions API morphs elements that share the same `transition:name` across pages. For a sliding active indicator, we need:
30: 
- This shows the standard pattern: short descriptive frontmatter, immediate descriptive heading, then pattern(s) with code examples. Use this as a template for the three new MDX articles.

7) SVG usage in existing articles — where & how
- Summary:
  - Inline SVGs are mostly embedded in Astro components (not directly in MDX files). The components rendering SVGs include TechHero.astro (inline logos; lines 55–84), Navbar.astro (icon SVGs lines 93–102), WorkCard.astro (small inline icons lines 217–235), and multiple icon components under /src/components/icons/ (Brain.astro, Code.astro, Zap.astro, ArrowDown.astro) — these are included as Astro components and used inside hero and badges.
  - CapabilitiesMarquee.astro stores SVGs as strings and injects them into markup (see file lines referenced earlier). That pattern shows SVG-as-string inclusion for lists/marquee components.
  - Articles (MDX) rarely include raw inline SVG diagrams directly; they import images via astro:assets (Image) or component wrappers. For diagrams, MDX tends to import image assets (png/webp) — e.g., view-transitions-filter-bar.mdx imports images at lines 18–21 using import statements and renders them via the Image component (lines 190 etc.).
- How they are referenced/loaded:
  - Icons & logos: authored as Astro components (e.g., /src/components/icons/Brain.astro) and imported where needed. This keeps SVGs as components (scalable, accessible).
  - Tech logos inside TechHero are inline SVG markup within the component; TechHero is imported/used in WorkCard.
  - MDX files import images (PNG/WebP) using "import animationTimeline from '../../assets/images/...png';" and render via Image from 'astro:assets' (example: view-transitions-filter-bar.mdx lines 18–21 and 190).
- File examples:
  - /Users/nroth/workspace/nickroth/src/components/TechHero.astro — inline logos (lines 55–66 etc.)
  - /Users/nroth/workspace/nickroth/src/components/icons/*.astro — icon components (inline SVGs).
  - /Users/nroth/workspace/nickroth/src/components/CapabilitiesMarquee.astro — SVGs embedded in strings (see file lines where the SVG strings are declared).

8) MDX component imports — examples
- Pattern: MDX files import Astro components and then use them as JSX/HTML-like tags inside MDX bodies. Two examples:

a) Using LazyGif in MDX:
- File: /Users/nroth/workspace/nickroth/src/content/work/view-transitions-consistent-layouts.mdx
  - Import (line 18): import LazyGif from '../../components/LazyGif.astro';
  - Usage (lines 38–49):
38: <div class="grid sm:grid-cols-2 gap-4">
39:   <LazyGif 
40:     src="/demos/with-view-transitions.webm"
41:     alt="Navigation WITH view transitions"
42:     caption="\u2713 WITH View Transitions - smooth morphing between pages"
43:   />
44:   <LazyGif 
45:     src="/demos/without-view-transitions.webm"
46:     alt="Navigation WITHOUT view transitions"  
47:     caption="\u2717 WITHOUT View Transitions - jarring full-page reloads"
48:   />
49: </div>

b) Importing images using astro:assets and variables
- File: /Users/nroth/workspace/nickroth/src/content/work/view-transitions-filter-bar.mdx
  - Imports (lines 18–21):
18: import { Image } from 'astro:assets';
19: import jitNamingPattern from '../../assets/images/projects/jit-naming-pattern.png';
20: import animationTimeline from '../../assets/images/projects/animation-timeline.png';
21: import onlyChildSelector from '../../assets/images/projects/only-child-selector.png';
  - Use later in body with <Image src={animationTimeline} alt="..." /> (line ~190).

c) Many MDX project files are plain Markdown-heavy but may still import components (e.g., LazyGif, Image). The pattern is consistent:
  - import <Component> from '../../components/<Component>.astro';
  - Use <Component .../> inline inside MDX content.

Practical takeaways for authoring new MDX articles (resume-chatbot articles)
- Use the same frontmatter keys as the content schema (see config.ts) — valid keys (for "work" collection): title, description, company, role, startDate, endDate, featured, tags, image, category, impact, stack, roleCategory, parentProject (optional), techBrand (enum: 'astro' | 'datocms' | 'react' | 'generic'), heroFeature (optional).
- If you want the project to show a tech-branded hero rather than an image, set techBrand to one of the allowed enum options and set heroFeature. Otherwise include an image asset in frontmatter and it will render automatically.
- To embed demos/animations use the LazyGif component via import and then <LazyGif src="..." alt="..." caption="..."/> as in view-transitions-consistent-layouts.mdx (lines 18 and 38–49).
- To connect an MDX sub-article to a parent project, set parentProject: "<parent-slug>" in frontmatter; the site uses that to create relations and related links.
- For SVG/graphics: prefer components for icons (src/components/icons/) or import raster images via astro:assets (Image). Inline SVGs inside components (TechHero) are acceptable for logos/brand visuals.

</answer>

<next_steps>
1) When you author the 3 MDX resume-chatbot articles:
   - Copy the frontmatter shape from resume-chatbot.mdx (path above) and ensure keys match config.ts (parentProject, techBrand, heroFeature if applicable).
   - If you want image hero: put a project image in assets and set image: "../../assets/images/..." (like resume-chatbot.mdx line 9).
   - If you want tech-branded hero: set techBrand to one of the enum values and add heroFeature — WorkCard + TechHero will render the branded hero automatically.
   - Reuse LazyGif for any demo animations: import LazyGif from '../../components/LazyGif.astro' and use <LazyGif .../> in MDX body (example lines shown above).
2) If you want, I can:
   - Generate 3 MDX article starter files (frontmatter pre-filled to schema + skeleton content matching site patterns).
   - Or create a verification checklist to ensure each new MDX will pass the collection schema and render correctly in the site.
Ready to proceed — tell me whether you want article skeletons created or a quick PR-ready checklist.
</next_steps>
</results>