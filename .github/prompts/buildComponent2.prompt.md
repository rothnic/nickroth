---
mode: agent
---

# Build DaisyUI Component - Workflow

> **For detailed reference material**, see `buildComponent-reference.md`

## Quick Start

### 1. Auto-Select Next Task
```bash
# Reads component-backlog.md and finds first [ ] task
# Checks dependencies are complete
# Marks task as [~] (in progress)
```

### 2. Execute Task (4 Phases)
- **Phase 1**: Analysis
- **Phase 2**: CSS Foundation  
- **Phase 3**: Component Implementation
- **Phase 4**: Showcase & Integration

### 3. Complete Task
```bash
# Mark [x] in component-backlog.md
# Check off all success criteria
# Verify acceptance test passes
```

---

## Phase 1: Analysis

### Extract Visual Patterns
- [ ] Identify shapes, borders (2-6px), shadows (hard, no blur), rotations
- [ ] Note colors (black/white base, vibrant accents)
- [ ] List interactive states (hover, focus, active)

### Map to DaisyUI
- [ ] Which base components? (hero, card, badge, btn, etc.)
- [ ] What modifiers? (sizes, colors, styles)
- [ ] What custom utilities needed? (rotations, shadows, positioning)

### Check Dependencies
- [ ] Review task dependencies in backlog
- [ ] Verify all `[x]` complete before proceeding
- [ ] Review related sections in design-system/guide.md

### Critical Rules ⚠️
- ❌ Never copy React/Vue/framework code
- ❌ Never use JS styling libraries (clsx, tailwind-variants)
- ❌ Never create custom class names (override DaisyUI)
- ❌ Never hard-code content in components
- ❌ Never add blur to shadows (hard shadows only!)
- ❌ Never use Tailwind's `dark:` prefix (DaisyUI handles theme switching)
- ✅ Component overrides work in BOTH light and dark modes (DaisyUI handles theme switching)
- ✅ Use automatic border/text color pairing (no manual border-black dark:border-white needed)
- ✅ Override with utility class when needed (border-primary overrides automatic border)

### Automatic Styling System (P0-001 ✅)
**Background colors automatically apply correct text and border colors**:
```astro
<!-- Automatic themed border (black in light, white in dark) + correct text color -->
<div class="bg-primary border-4 p-4">Content</div>

<!-- Override border to match background -->
<div class="bg-secondary border-4 border-secondary p-4">Content</div>

<!-- Override with custom color -->
<div class="bg-accent border-4 border-warning p-4">Content</div>
```

**How it works**: CSS rules in `@layer utilities` automatically apply:
- Text colors: `.bg-primary { color: var(--color-primary-content); }`
- Border colors: `[data-theme="neobrutalism-light"] .bg-primary { border-color: #000000; }`
- Overrides work via `:not([class*="border-"])` guards in CSS

---

## Phase 2: CSS Foundation

### Location
`src/styles/global.css`

### Override DaisyUI Components
```css
@plugin "daisyui/theme" {
  name: "mytheme";
  default: true;
  --border: 4px;
  --color-primary: oklch(70% 0.25 190);
  /* ...tokens */
}

@layer utilities {
  /* Theme-scoped component overrides (wins specificity over DaisyUI @layer components) */
  [data-theme="mytheme"] .btn {
    border-width: var(--border);
    border-color: var(--btn-border); /* Use theme variables */
    box-shadow: 4px 4px 0 0 var(--nr-shadow-color);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  [data-theme="mytheme"] .btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 0 var(--nr-shadow-color);
  }
  
  /* Generic utilities outside theme selector (portable across components) */
  .shadow-brutal { 
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); 
  }
}
```

**Critical Details (P0-001 ✅)**:
- **Layer strategy**: DaisyUI ships `@layer components`, our overrides in `@layer utilities` with `[data-theme]` selector wins specificity
- **No !important needed**: Proper layer ordering + theme selector = correct cascade
- **Theme variables**: Use `var(--nr-border-color)` instead of hard-coded #000000
- **Scoping**: Component overrides inside `[data-theme]`, utilities outside for portability
- **Button shadows**: Use 4px default, 6px hover (reduced from original 6px/10px)

### Add Utilities (If Needed)
Place reusable helpers **after** the theme-scoped overrides but outside the `[data-theme]` selector so they stay portable across components and pages.
```css
@layer utilities {
  .shadow-brutal { 
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); 
  }
  
  .rotate-sticker-1 { 
    transform: rotate(-8deg); 
  }
}
```

### Add Animations (If Needed)
Animations live in the same file—define keyframes globally, then expose utility classes (also outside the theme selector) so components can opt-in.
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Must use !important to override DaisyUI component transitions */
.fade-in-up {
  opacity: 0 !important;
  transform: translateY(40px) !important;
  transition: opacity 0.8s ease-out, transform 0.8s ease-out !important;
}

.fade-in-up.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
```

**Critical Details (P0-001 ✅)**:
- **!important required**: DaisyUI components have their own transitions that override animation properties
- **Timing**: Use 0.8s duration, 0.15 threshold, -150px rootMargin for visibility
- **Distances**: 40px fade-in-up, 80px slide-in, 0.7 scale-in (more dramatic = more visible)
- **Astro lifecycle**: Import function in BaseLayout `<script>`, handle `astro:page-load` event
- **Cleanup**: Call `cleanup()` before re-initializing to prevent duplicate observers

**Scroll Animation Setup**:
```astro
<!-- In BaseLayout.astro -->
<script>
  import { initScrollAnimations } from "../scripts/animations.js";
  
  // Initialize on page load
  initScrollAnimations();
  
  // Reinitialize on Astro page transitions
  document.addEventListener("astro:page-load", () => {
    initScrollAnimations();
  });
</script>
```

---

## Phase 3: Component Implementation

### File Structure
```
src/
  components/
    ComponentName.astro       # Main component
  pages/
    showcase/
      component-name.astro     # Showcase page
  data/
    component-data.ts          # Content data (if needed)
```

### Component Template
```astro
---
// 1. TypeScript Interface
interface Props {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

// 2. Extract Props with Defaults
const {
  variant = 'primary',
  size = 'md',
  class: className = ''
} = Astro.props;

// 3. Compose Classes (string concat only!)
const classes = [
  'btn',                    // DaisyUI component
  `btn-${variant}`,         // DaisyUI variant
  `btn-${size}`,            // DaisyUI size
  className                 // User classes
].filter(Boolean).join(' ');
---

<!-- 4. Use Standard DaisyUI Markup -->
<button class={classes}>
  <slot />
</button>
```

### Content Separation
```astro
<!-- ❌ WRONG: Hard-coded content -->
<Hero>
  <h1>Nick Roth</h1>
  <p>I turn business objectives into shippable systems</p>
</Hero>

<!-- ✅ RIGHT: Content from data -->
---
import { heroData } from '@/data/hero';
---
<Hero {...heroData} />
```

**Where content lives**:
- **Collections**: `src/content/` (blog posts, projects, structured content)
- **Data files**: `src/data/` (config, navigation, lists, arrays)
- **Props**: Passed from pages (dynamic data)

**For detailed patterns**: See buildComponent-reference.md section on Content Separation

---

## Phase 4: Showcase & Integration

**IMPORTANT**: We use `/showcase/` pages for testing and documentation, NOT `/dev/` pages.

### Step 1: Update Showcase Page ⚠️ REQUIRED
**Location**: `src/pages/showcase/foundation/*` or `src/pages/showcase/components/*`

**CRITICAL**: Every task MUST add working examples to the appropriate showcase page.
- Buttons → `/showcase/components/buttons.astro`
- Badges → `/showcase/components/badges.astro`
- Cards → `/showcase/components/cards.astro`
- Forms → `/showcase/components/forms.astro`
- Colors → `/showcase/foundation/colors.astro`
- Shadows → `/showcase/foundation/shadows.astro`
- Animations → `/showcase/patterns/animations.astro`
- etc.

**Replace TODO comments** with actual working examples:

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="Buttons - Components" 
  description="Button variants, sizes, states, and combinations."
>
  <div class="container mx-auto px-4 py-20 max-w-6xl">
    <h1 class="text-5xl font-black mb-4">Buttons</h1>
    <p class="text-xl text-base-content/70 mb-12">
      All button styles with colors, sizes, states, and modifiers.
    </p>

    <!-- REMOVE: TODO comment -->
    <!-- ADD: Real examples -->
    
    <section class="mb-12">
      <h2 class="text-3xl font-black mb-6">Color Variants</h2>
      <p class="text-sm text-base-content/60 mb-4">Expected: 4px border, 6px hard shadow, lifts on hover</p>
      <div class="flex flex-wrap gap-4">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
        <button class="btn btn-neutral">Neutral</button>
        <button class="btn btn-info">Info</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-warning">Warning</button>
        <button class="btn btn-error">Error</button>
      </div>
    </section>
    
    <section class="mb-12">
      <h2 class="text-3xl font-black mb-6">Size Variants</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <button class="btn btn-xs">Extra Small</button>
        <button class="btn btn-sm">Small</button>
        <button class="btn btn-md">Medium</button>
        <button class="btn btn-lg">Large</button>
        <button class="btn btn-xl">Extra Large</button>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-black mb-6">Style Variants</h2>
      <div class="flex flex-wrap gap-4">
        <button class="btn btn-primary">Solid</button>
        <button class="btn btn-outline btn-primary">Outline</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-link">Link</button>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-3xl font-black mb-6">States</h2>
      <div class="flex flex-wrap gap-4">
        <button class="btn btn-primary">Default</button>
        <button class="btn btn-primary btn-active">Active</button>
        <button class="btn btn-primary" disabled>Disabled</button>
      </div>
    </section>

    <!-- Add more sections as needed -->
  </div>
</BaseLayout>
```

**Showcase Page Requirements**:
1. ✅ Remove ALL TODO comments
2. ✅ Add working examples for every variant/size/state
3. ✅ Include descriptive headings (Color Variants, Sizes, States, etc.)
4. ✅ Add helper text explaining what to look for
5. ✅ Group related examples in sections
6. ✅ Include code snippets (optional but recommended)
7. ✅ Test that all examples render correctly

### Step 2: Integrate into Personal Site
**Example**: Using component on homepage

```astro
---
// src/pages/index.astro
import Hero from '@/components/Hero.astro';
import NeoButton from '@/components/NeoButton.astro';
import StickerBadge from '@/components/StickerBadge.astro';
import { heroData, heroBadges } from '@/data/hero';
---

<Hero {...heroData}>
  {heroBadges.map(badge => (
    <StickerBadge variant={badge.variant} rotation={badge.rotation}>
      {badge.icon} {badge.label}
    </StickerBadge>
  ))}
  
  <div slot="actions">
    <NeoButton variant="primary" href="/work">View Work</NeoButton>
    <NeoButton variant="secondary" href="/contact">Get in Touch</NeoButton>
  </div>
</Hero>
```

### Step 3: Validate

#### Visual Validation
- [ ] Showcase page displays all variants correctly (removed ALL TODOs)
- [ ] Examples organized in clear sections with headings
- [ ] Component works in isolation
- [ ] Component integrates into personal site pages
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All interactive states work (hover, focus, active)
- [ ] Dark mode toggle works (test both themes)

#### Technical Validation
- [ ] No hard-coded content in components
- [ ] Uses standard DaisyUI classes
- [ ] TypeScript interface defined (if creating component)
- [ ] Content in data files or collections
- [ ] Showcase page has working examples (not TODO comments)
- [ ] Acceptance test from backlog passes

#### Quality Checklist
- [ ] Borders: 4px themed (automatic black/white based on theme)
- [ ] Shadows: Hard edges, no blur
- [ ] Colors: Brand-consistent (primary=cyan, etc.)
- [ ] Spacing: 4px base unit (gap-1, gap-2, gap-4, etc.)
- [ ] Typography: Space Grotesk (display) or system (body)
- [ ] Animations: CSS-only (or vanilla JS + CSS classes)
- [ ] Showcase page: All examples work, TODOs removed

### Step 4: Complete Task

```bash
# Update backlog
# Change [ ] to [x] in docs/component-backlog.md
# Check off all success criteria for the task
```

---

## Task-Specific Workflows

### P0-001: Global CSS Setup
**Focus**: Establish CSS foundation + populate showcase pages

1. **Analysis**: Review design system colors, shadows, rotations
2. **CSS**: Override all base DaisyUI components (.btn, .card, .badge, .input)
3. **Utilities**: Add shadows, rotations, sticker positioning, hover effects
4. **Animations**: Add scroll animation utilities + vanilla JS helper
5. **Showcase**: Add examples to ALL relevant showcase pages:
   - Buttons → `/showcase/components/buttons.astro`
   - Cards → `/showcase/components/cards.astro`
   - Badges → `/showcase/components/badges.astro`
   - Shadows → `/showcase/foundation/shadows.astro`
   - Animations → `/showcase/patterns/animations.astro`
6. **Test**: Verify all showcase pages render correctly

### P0-003, P0-004: Component + Showcase
**Focus**: Build component AND update showcase page

1. **Analysis**: Map to DaisyUI component, list variants needed
2. **CSS**: Add any component-specific overrides (if not in global)
3. **Component**: Create TypeScript interface, implement with DaisyUI classes
4. **Showcase**: Update existing showcase page (remove TODOs, add examples)
5. **Test**: Verify showcase renders all options correctly

### P0-005: Hero Section + Layout
**Focus**: Compose components with content + update relevant showcases

1. **Analysis**: Identify sub-components needed (badges, buttons)
2. **Data**: Create content file in `src/data/hero.ts`
3. **Component**: Update Hero.astro to use sub-components
4. **Layout**: Implement responsive grid/flex layout
5. **Showcase**: Ensure hero patterns shown in `/showcase/patterns/layouts.astro`
6. **Integration**: Connect to homepage, verify no hard-coded content
7. **Test**: Verify responsive, all elements render from data

### P1-013: Work List Page
**Focus**: Use existing components with collection data

1. **Analysis**: Review work collection schema, identify components
2. **Page**: Create page file, query collection
3. **Layout**: Use WorkCard component in grid
4. **Filter**: Implement any filtering/sorting logic
5. **Test**: Verify all work items render, links work

---

## Quick Reference

### File Locations
- **Components**: `src/components/`
- **Showcases**: `src/pages/showcase/` ⭐ **Use for testing & docs**
- **Pages**: `src/pages/`
- **Data**: `src/data/`
- **Collections**: `src/content/`
- **Styles**: `src/styles/global.css`
- **Scripts**: `src/scripts/`
- **Dev**: `src/pages/dev/` ⚠️ **Deprecated - use showcase instead**

### DaisyUI Components Reference
Common components: `hero`, `card`, `badge`, `btn`, `navbar`, `footer`, `input`, `select`, `textarea`, `checkbox`, `toggle`, `modal`, `drawer`, `tabs`

**Full reference**: `.github/instructions/daisyui.instructions.md`

### Design Values
- **Borders**: 2px, 4px, 6px (black)
- **Shadows**: 4px, 8px, 12px, 20px (hard, no blur)
- **Rotations**: -8deg, -3deg, 5deg, 12deg
- **Colors**: See tailwind.config.mjs
- **Spacing**: 4px base (1, 2, 3, 4, 6, 8, 12, 16 units)
- **Timing**: 200ms (standard), 300ms (complex)

### Help Resources
- **Lost?** → Read `.github/START-HERE.md`
- **Details?** → Read `buildComponent-reference.md`
- **Visual patterns?** → Read `docs/design-system/guide.md`
- **DaisyUI syntax?** → Read `.github/instructions/daisyui.instructions.md`
- **Content structure?** → Read buildComponent-reference.md "Content Separation"
- **Showcase pages?** → Visit `http://localhost:4323/showcase` in browser
- **Which showcase page?** → See `docs/page-index.md` for complete list

---

## Common Patterns

### String Composition (No Libraries!)
```astro
const classes = ['base', variant && `variant-${variant}`, className]
  .filter(Boolean)
  .join(' ');
```

### Conditional Rendering
```astro
{imageUrl && (
  <figure><img src={imageUrl} alt={imageAlt} /></figure>
)}

{items.length > 0 && (
  <ul>{items.map(item => <li>{item}</li>)}</ul>
)}
```

### Data Mapping
```astro
{badges.map(badge => (
  <StickerBadge variant={badge.variant}>
    {badge.icon} {badge.label}
  </StickerBadge>
))}
```

### Polymorphic Components
```astro
const Component = href ? 'a' : 'button';
<Component class={classes} href={href}>
  <slot />
</Component>
```

---

## Troubleshooting

### "Classes not applying"
→ Check CSS specificity, may need `!` utility: `bg-red-500!`

### "Component not rendering"
→ Verify props interface matches usage, check console for errors

### "Content showing as undefined"
→ Check data file path, verify import statement

### "Styling looks different from design"
→ Review global.css overrides, may need to adjust border/shadow values

### "Animation not working"
→ Ensure animation script loaded in BaseLayout  
→ Check element has animation class  
→ Verify CSS has !important on animation properties (required to override DaisyUI transitions)  
→ Check console for observer initialization logs

### "Animation works but can't see it"
→ Increase duration to 0.8s (from default 0.6s)  
→ Increase distances (40px fade, 80px slide, 0.7 scale)  
→ Adjust rootMargin to -150px (triggers closer to center)  
→ Increase threshold to 0.15 (more visible before triggering)

### "Animations break after navigation"
→ Verify `astro:page-load` event handler in BaseLayout  
→ Check cleanup() function called before re-initializing  
→ Ensure observer stored in module-level variable for cleanup

### "Need to manually add border-black/text colors everywhere"
→ System is automatic! Just use `bg-primary border-4`  
→ Automatic rules apply: themed border (black/white) + correct text color  
→ Override with `border-primary` or `border-warning` when needed  
→ Check `:not([class*="border-"])` guards exist in global.css

### "Dark mode not working"
→ Check that both light and dark themes defined in global.css  
→ Verify `prefersdark: true` set in dark theme configuration  
→ Test by toggling system dark mode preference  
→ Component overrides should NOT use `dark:` prefix (DaisyUI handles this)

### "Colors look wrong in dark mode"
→ Check --color-* variables defined for BOTH themes  
→ Dark mode colors should be more saturated for better contrast  
→ Verify color-scheme set correctly (light vs dark)

---

**Next**: After marking task `[x]`, read backlog for next `[ ]` task and repeat process.
