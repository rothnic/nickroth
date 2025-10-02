---
mode: agent
---

# Build DaisyUI Component - Neobrutalism Theme

## Auto-Task Selection

**This prompt automatically selects the next task from the backlog.**

### Task Selection Process
1. Read `./docs/component-backlog.md`
2. Find the first task with status `[ ]` (not started) in priority order (P0 → P1 → P2 → P3)
3. Check if all dependencies are complete (marked `[x]`)
4. If dependencies incomplete, task is blocked `[?]` - skip to next task
5. Update selected task status to `[~]` (in progress)
6. Execute the task following the 4-phase process below
7. When complete, update task status to `[x]` and check off all success criteria

### Current Task Status
**Auto-selected from backlog**: _(Will be determined from component-backlog.md)_

**Instructions for agent executing this prompt**:
- Read the backlog file to identify next task
- Mark task as in-progress `[~]` in the backlog
- Follow task's specific requirements (files to modify, interface, success criteria)
- Check off success criteria in backlog as you complete them
- Run acceptance test before marking complete
- Update task to `[x]` when all criteria met

## Mission
Build a reusable, framework-agnostic component for the neobrutalism DaisyUI theme that can be used on Nick's personal site and eventually sold as a theme package.

## Context & References

### Design System Documentation
- **`./docs/design-system/guide.md`**: Complete design philosophy, component architecture, and visual principles
- **`./docs/neobrutalism-daisyui-implementation.md`**: DaisyUI-specific implementation strategy
- **`./docs/design-system/example-global-styles.md`**: Reference styles from Figma Make prototype (visual reference ONLY - do not copy directly)

### Key Design Philosophy Principles
From the design system guide:
- **Component-First Development**: Build reusable, configurable components, never one-off page elements
- **Neobrutalist Aesthetic**: Bold borders (2-6px black), dramatic hard shadows, high contrast, raw geometry
- **Content-First Architecture**: Components → Blocks → Pages hierarchy
- **Framework Agnostic**: Works in Astro, React, Vue, Svelte, vanilla HTML
- **Content-Component Separation**: Content lives separately from components (CMS-ready)

### Content Management Architecture (CRITICAL)

**Never hard-code content in components**. Maintain strict separation for future CMS migration:

#### Content Storage Locations
1. **Astro Content Collections** (`src/content/`)
   - Structured content with frontmatter validation
   - Blog posts, projects, case studies, capabilities
   - Example: `src/content/work/project-name.mdx`

2. **Data Files** (`src/data/`)
   - JavaScript/TypeScript data objects
   - Navigation menus, site config, metadata
   - Lists, arrays, configuration
   - Example: `src/data/navigation.ts`

3. **Component Props/Slots**
   - Dynamic data passed from pages
   - Never define content arrays in components
   - Components are pure presentation

#### Content Patterns
```astro
<!-- ❌ WRONG: Content hard-coded in component -->
<StickerBadge variant="success">⚡ FULL-STACK PM</StickerBadge>
<StickerBadge variant="info">🤖 AI ENGINEER</StickerBadge>

<!-- ✅ RIGHT: Content from props -->
---
const badges = [
  { icon: '⚡', label: 'FULL-STACK PM', variant: 'success' },
  { icon: '🤖', label: 'AI ENGINEER', variant: 'info' }
];
---
{badges.map(badge => (
  <StickerBadge variant={badge.variant}>
    {badge.icon} {badge.label}
  </StickerBadge>
))}

<!-- ✅ BETTER: Content from data file -->
---
import { heroBadges } from '@/data/hero';
---
{heroBadges.map(badge => (
  <StickerBadge variant={badge.variant}>
    {badge.icon} {badge.label}
  </StickerBadge>
))}

<!-- ✅ BEST: Content from collection -->
---
import { getEntry } from 'astro:content';
const hero = await getEntry('pages', 'home');
const { badges } = hero.data;
---
{badges.map(badge => (
  <StickerBadge variant={badge.variant}>
    {badge.icon} {badge.label}
  </StickerBadge>
))}
```

#### CMS Migration Readiness
Structure content to support future headless CMS:
- **Consistent schemas**: Use TypeScript interfaces for content shapes
- **Flat data structures**: Avoid deep nesting that CMS can't replicate
- **Asset references**: Use paths/URLs, not inline data
- **Metadata separation**: Keep SEO/meta separate from content
- **Reusable blocks**: Content blocks that map to components

Example content collection schema:
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const heroCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    badges: z.array(z.object({
      icon: z.string(),
      label: z.string(),
      variant: z.enum(['primary', 'secondary', 'success', 'info'])
    })),
    cta: z.object({
      primary: z.object({ text: z.string(), href: z.string() }),
      secondary: z.object({ text: z.string(), href: z.string() })
    })
  })
});
```

### Visual Elements (From Design Guide)
- **Borders**: Minimum 2px, typically black (#000000), often 4-6px for emphasis
- **Shadows**: Hard drop shadows: `box-shadow: Xpx Ypx 0px 0px rgba(0,0,0,1)` (no blur!)
- **Rotations**: Subtle (-3deg to 2deg) for sticker aesthetics, up to 12deg for dramatic effect
- **Colors**: Black (#000000), White (#ffffff), vibrant accents (cyan, pink, lime, purple, orange)
- **Typography**: Space Grotesk for display, system stack for body, JetBrains Mono for code
- **Spacing**: 4px base unit (4, 8, 12, 16, 20, 24, 32, 48, 64px scale)

## Development Process

### Phase 1: Analysis (Do This First)
When provided with a screenshot, code example, or design reference:

1. **Extract Visual Patterns**
   - Identify shapes, colors, borders, shadows, rotations
   - Note spacing (4px base unit), typography (Space Grotesk display, system body), layout structure
   - List interactive states (hover, focus, active)
   - Check against design guide principles (component-first, neobrutalist aesthetic)

2. **Map to DaisyUI Components**
   - Which base components? (hero, card, badge, btn, avatar, etc.)
   - What modifiers? (sizes, colors, styles)
   - What custom utilities? (rotations, shadows)
   - Review existing component inventory in design guide

3. **Check Design System Guide**
   - Does this pattern exist in `./docs/design-system/guide.md`?
   - Can we reuse existing component architecture?
   - What layer? (Base Component, Content Component, Block, or Page)

4. **Avoid These Traps**
   - ❌ Don't copy React/Vue/framework-specific code
   - ❌ Don't use JavaScript styling libraries (tailwind-variants, clsx)
   - ❌ Don't create custom class names (use DaisyUI standards)
   - ❌ Don't use JS for animations
   - ❌ Don't copy example-global-styles.md directly (it's a reference, not a template)
   - ❌ **Don't hard-code content in components** (no text, labels, or data arrays in markup)

### Phase 2: CSS Foundation
Before writing component markup:

1. **Add Global Overrides** (`src/styles/global.css`)
   Override DaisyUI defaults for neobrutalism aesthetic:
   ```css
   @layer components {
     /* Override DaisyUI defaults for neobrutalism */
     .btn {
       @apply border-[4px] border-black font-black;
       box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
       transition: all 0.2s ease-in-out; /* 200ms standard from design guide */
     }
     
     .btn:hover {
       @apply translate-x-1 translate-y-1;
       box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1); /* Hover lift effect */
     }
   }
   ```

2. **Create Utility Classes** (if needed)
   Follow design system spacing (4px base) and shadow patterns:
   ```css
   @layer utilities {
     /* Brutalist shadows - no blur, hard edges */
     .shadow-brutal-sm { box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1); }
     .shadow-brutal { box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); }
     .shadow-brutal-lg { box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1); }
     .shadow-brutal-xl { box-shadow: 20px 20px 0px 0px rgba(0, 0, 0, 1); }
     
     /* Sticker rotations - subtle for playful feel */
     .rotate-sticker-1 { transform: rotate(-8deg); }
     .rotate-sticker-2 { transform: rotate(5deg); }
     .rotate-sticker-3 { transform: rotate(-3deg); }
     .rotate-sticker-4 { transform: rotate(12deg); }
   }
   ```

3. **Define CSS Animations** (if needed)
   Use design guide timing (200ms standard, 300ms complex):
   ```css
   @keyframes spin-slow {
     from { transform: rotate(0deg); }
     to { transform: rotate(360deg); }
   }
   
   @keyframes bounce-slow {
     0%, 100% { transform: translateY(0); }
     50% { transform: translateY(-10px); }
   }
   
   .animate-spin-slow {
     animation: spin-slow 8s linear infinite;
   }
   
   .animate-bounce-slow {
     animation: bounce-slow 3s ease-in-out infinite;
   }
   ```

4. **Check Example Styles for Patterns**
   Review `./docs/design-system/example-global-styles.md` for:
   - Glitch effects (`.glitch-effect` pattern)
   - Texture overlays (`.texture-grain` pattern)
   - Organic shapes (`.organic-top/bottom/both` clip-path)
   - Sticker styles (`.sticker` positioning)
   
   **Important**: These are references only - rebuild using DaisyUI + CSS utilities, don't copy directly!

### Phase 3: Component Implementation (Astro)

1. **Use Standard DaisyUI Classes**
   ```astro
   ---
   interface Props {
     variant?: 'primary' | 'secondary' | 'accent';
     size?: 'sm' | 'md' | 'lg';
     rotation?: 1 | 2 | 3 | 4;
     class?: string;
   }
   
   const { variant = 'primary', size = 'md', rotation, class: className = '' } = Astro.props;
   
   // Simple string composition (no libraries!)
   const classes = [
     'badge',                              // Standard DaisyUI component
     `badge-${variant}`,                   // Standard DaisyUI color variant
     `badge-${size}`,                      // Standard DaisyUI size
     rotation && `rotate-sticker-${rotation}`, // Custom utility
     className
   ].filter(Boolean).join(' ');
   ---
   
   <span class={classes}>
     <slot />
   </span>
   ```

2. **Separate Content from Presentation**
   ```astro
   <!-- Component file: src/components/Hero.astro -->
   ---
   interface Badge {
     icon: string;
     label: string;
     variant: 'primary' | 'secondary' | 'success' | 'info';
     rotation?: 1 | 2 | 3 | 4;
   }
   
   interface Props {
     name: string;
     tagline: string;
     badges: Badge[];
     image: string;
     imageAlt: string;
   }
   
   const { name, tagline, badges, image, imageAlt } = Astro.props;
   ---
   
   <section class="hero min-h-screen">
     <div class="hero-content">
       {badges.map(badge => (
         <StickerBadge variant={badge.variant} rotation={badge.rotation}>
           {badge.icon} {badge.label}
         </StickerBadge>
       ))}
       <h1>{name}</h1>
       <p>{tagline}</p>
       <img src={image} alt={imageAlt} />
     </div>
   </section>
   ```
   
   ```astro
   <!-- Page file: src/pages/index.astro -->
   ---
   import { getEntry } from 'astro:content';
   import Hero from '@/components/Hero.astro';
   
   const heroData = await getEntry('pages', 'home');
   ---
   
   <Hero {...heroData.data.hero} />
   ```

3. **Neobrutalism Styling Comes From CSS**
   - Component markup uses standard DaisyUI classes
   - Visual brutalism (borders, shadows) applied via global overrides
   - No custom class variants in markup

4. **Keep It Portable**
   - Component should work as plain HTML: `<span class="badge badge-primary badge-lg rotate-sticker-1">Text</span>`
   - No framework-specific features in the class logic
   - Simple props-to-classes mapping
   - **Data-driven, not content-driven**: Components render any content passed to them

### Phase 4: Validation

**Before committing, verify:**
- [ ] Uses only standard DaisyUI component classes
- [ ] No JavaScript styling libraries imported
- [ ] CSS overrides in `@layer components` or `@layer utilities`
- [ ] Animations are CSS-only (no JS)
- [ ] Component works as plain HTML (copy markup, paste in CodePen)
- [ ] Follows neobrutalism principles (thick borders, hard shadows, bold fonts)
- [ ] Responsive with Tailwind utilities (`sm:`, `md:`, `lg:`)
- [ ] Accessible (ARIA labels, focus states, semantic HTML)
- [ ] **Content-component separation maintained**:
  - [ ] No hard-coded text/labels in component (except UI labels like "Close", "Menu")
  - [ ] All content comes from props or slots
  - [ ] Component accepts data objects/arrays, not defined locally
  - [ ] TypeScript interfaces defined for content shape
  - [ ] Can work with any content data source (collection, API, CMS)

## Neobrutalism Design Rules

### Visual Characteristics (From Design Guide)
- **Borders**: 2-6px thick, always black (`border-[4px] border-black`)
  - Minimum 2px for subtle elements
  - 4px standard for buttons, cards
  - 6px for hero elements and emphasis
- **Shadows**: Hard-edged, no blur (`box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1)`)
  - Small: 4px offset for badges/tags
  - Standard: 6-8px offset for buttons/cards
  - Large: 12px offset for featured content
  - XL: 20px offset for hero sections
- **Colors**: High contrast, vibrant accents
  - Primary: Black (#000000), White (#ffffff)
  - Accents: Electric Blue (#00ffff), Hot Pink (#ff0080), Lime Green (#50fa7b), Purple (#8b5cf6)
  - Backgrounds: Gradient combinations (blue-purple, purple-pink, green-blue)
- **Typography**: 
  - Display: Space Grotesk (font-display) - Headers, titles, emphasis
  - Body: System font stack - Readable content
  - Mono: JetBrains Mono (font-mono) - Code, technical
  - Weight: Font-black (900) for emphasis, medium (500) for headers
- **Rotation**: Slight (-8deg to 12deg) for playful, sticker-like feel
  - Subtle: -3deg to 2deg for cards
  - Moderate: -8deg to 5deg for badges
  - Dramatic: 12deg for special emphasis
- **Spacing**: 4px base unit
  - Common scales: 4, 8, 12, 16, 20, 24, 32, 48, 64px
  - Use clamp() for fluid responsive spacing
- **Depth**: Simulated via offset shadows + rotation, not gradients
- **Interactions**: 
  - Duration: 200ms standard, 300ms for complex
  - Easing: ease-in-out for natural motion
  - Hover: Lift effect (translate + shadow reduction)

### CSS Patterns
```css
/* Brutalist Button */
.btn {
  @apply border-[4px] border-black font-black;
  box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
}

/* Hover effect - shadow compresses */
.btn:hover {
  @apply translate-x-1 translate-y-1;
  box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
}

/* Sticker rotation */
.rotate-sticker-1 { transform: rotate(-8deg); }
.rotate-sticker-2 { transform: rotate(5deg); }
```

## Common Component Patterns

### Badge/Sticker
```astro
---
const classes = ['badge', `badge-${variant}`, `badge-${size}`, rotation && `rotate-sticker-${rotation}`].filter(Boolean).join(' ');
---
<span class={classes}><slot /></span>
```

### Card with Rotation
```astro
---
const classes = ['card', `shadow-brutal-${shadow}`, className].filter(Boolean).join(' ');
const style = rotation !== 0 ? `transform: rotate(${rotation}deg);` : undefined;
---
<div class={classes} style={style}><slot /></div>
```

### Button with Icon
```astro
<button class="btn btn-primary btn-lg">
  <svg class="w-6 h-6"><!-- icon --></svg>
  <span>Click Me</span>
</button>
```

## Anti-Patterns to Avoid

### ❌ DON'T: Use JS Libraries
```typescript
import { tv } from 'tailwind-variants'; // NO!
import clsx from 'clsx'; // NO!
```

### ❌ DON'T: Create Custom Variants
```astro
<button class="btn-brutal btn-brutal-primary"> <!-- NO! -->
```

### ❌ DON'T: Use JS for Animations
```typescript
import { motion } from 'framer-motion'; // NO!
useEffect(() => { /* animation */ }); // NO!
```

### ✅ DO: Simple String Composition
```typescript
const classes = ['btn', `btn-${variant}`].filter(Boolean).join(' ');
```

### ✅ DO: CSS Animations
```css
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

## Reference Files

### Primary References
- **Design System Guide**: `./docs/design-system/guide.md` - Complete design philosophy, component architecture, visual principles
- **Implementation Guide**: `./docs/neobrutalism-daisyui-implementation.md` - DaisyUI-specific strategy
- **DaisyUI Rules**: `./.github/instructions/daisyui.instructions.md` - Critical constraints

### Configuration
- **Theme Config**: `./tailwind.config.mjs` - Color system and DaisyUI theme
- **Global CSS**: `./src/styles/global.css` - Component overrides and utilities

### Visual References (Do Not Copy Directly!)
- **Example Styles**: `./docs/design-system/example-global-styles.md` - Figma Make prototype reference
  - ⚠️ **Warning**: This is from a React/Vibe-coded implementation
  - ✅ **Use for**: Visual patterns, animation concepts, design ideas
  - ❌ **Don't use for**: Direct copying, framework-specific code, custom CSS variables

## Success Criteria

A component is complete when:
1. ✅ Uses standard DaisyUI classes only
2. ✅ Zero JavaScript for styling or animation
3. ✅ Works as plain HTML (framework-agnostic)
4. ✅ Follows neobrutalism design principles
5. ✅ Responsive and accessible
6. ✅ Can be copy-pasted to any project with DaisyUI
7. ✅ **Content-component separation enforced**:
   - Component is purely presentational
   - Accepts all content via props/slots
   - No hard-coded text (except UI labels)
   - Works with any data source
   - TypeScript interfaces document expected data shape
   - CMS-migration ready

## Content Organization Examples

### Recommended File Structure
```
src/
├── components/          # Pure presentation components
│   ├── Hero.astro      # Accepts props, no content
│   ├── Card.astro      # Generic, reusable
│   └── Badge.astro     # Styling only
├── content/            # Content collections
│   ├── config.ts       # Schema definitions
│   ├── pages/          # Page-specific content
│   │   └── home.json   # Home page data
│   ├── work/           # Projects/case studies
│   └── capabilities/   # Skills/services
├── data/               # Structured data files
│   ├── navigation.ts   # Nav menu items
│   ├── site-config.ts  # Global config
│   └── hero-badges.ts  # Reusable data sets
└── pages/              # Route files
    └── index.astro     # Composes components + data
```

### Data File Example
```typescript
// src/data/hero-badges.ts
export interface Badge {
  icon: string;
  label: string;
  variant: 'primary' | 'secondary' | 'success' | 'info';
  rotation?: 1 | 2 | 3 | 4;
}

export const heroBadges: Badge[] = [
  { icon: '⚡', label: 'FULL-STACK PM', variant: 'success', rotation: 1 },
  { icon: '🤖', label: 'AI ENGINEER', variant: 'info', rotation: 2 },
  { icon: '⚙️', label: 'AUTOMATION', variant: 'warning', rotation: 3 }
];
```

### Content Collection Example
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      name: z.string(),
      tagline: z.string(),
      image: z.string(),
      imageAlt: z.string(),
      badges: z.array(z.object({
        icon: z.string(),
        label: z.string(),
        variant: z.enum(['primary', 'secondary', 'success', 'info', 'warning']),
        rotation: z.number().optional()
      })),
      cta: z.object({
        primary: z.object({ text: z.string(), href: z.string() }),
        secondary: z.object({ text: z.string(), href: z.string() })
      })
    })
  })
});

export const collections = { pages: pagesCollection };
```

```json
// src/content/pages/home.json
{
  "hero": {
    "name": "Nick Roth",
    "tagline": "I turn business objectives into shippable systems",
    "image": "/images/nick-headshot.png",
    "imageAlt": "Nick Roth headshot",
    "badges": [
      { "icon": "⚡", "label": "FULL-STACK PM", "variant": "success", "rotation": 1 },
      { "icon": "🤖", "label": "AI ENGINEER", "variant": "info", "rotation": 2 }
    ],
    "cta": {
      "primary": { "text": "VIEW MY WORK", "href": "/work" },
      "secondary": { "text": "LET'S TALK", "href": "/contact" }
    }
  }
}
```

## Component Architecture Layers (From Design Guide)

Follow the 4-layer architecture:

### Layer 1: Base Components
Single-purpose, highly reusable:
- Typography: DisplayHeading, Text, SplitHeading, BoxedHeading
- Buttons: NeoButton, IconButton (variants: black, white, colored, outline)
- Cards: BaseCard with specialized variants
- Layout: SectionContainer, SectionHeader, PageLayout
- Effects: HoverCard, RotationWrapper, Marquee

### Layer 2: Content Components
Specific-purpose with business logic:
- Navigation, Timeline, CapabilitiesGrid, ContactForm, BlogPost

### Layer 3: Block Components
Complex compositions:
- HeroBlock, ContactCTABlock, BackgroundCTABlock, CapabilitiesMarqueeBlock

### Layer 4: Page Compositions
Minimal arrangements of blocks

**Important**: Build at the appropriate layer. Start with base components, compose into blocks, arrange on pages.

## Usage

When building a component:
1. **Provide Context**: Share design (screenshot, description, or code reference)
2. **I'll Analyze**: 
   - Check design system guide for existing patterns
   - Map to DaisyUI components
   - Identify appropriate architecture layer
   - Extract visual patterns (borders, shadows, rotations, spacing)
3. **I'll Implement**:
   - Follow the 4-phase process
   - Use standard DaisyUI classes
   - Add CSS overrides in proper layers
   - Ensure framework-agnostic approach
4. **We'll Validate**: 
   - Check against success criteria
   - Verify zero-JS for styling
   - Test portability
   - Confirm design guide alignment
5. **Integration**: Component becomes part of the reusable theme

Remember: **This is a sellable theme in development**. Every component should be:
- ✅ Production-quality and polished
- ✅ Portable across frameworks
- ✅ Maintainable and well-documented
- ✅ Aligned with neobrutalism aesthetic
- ✅ Following component-first architecture