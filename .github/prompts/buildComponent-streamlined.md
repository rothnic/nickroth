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

---

## Phase 2: CSS Foundation

### Location
`src/styles/global.css`

### Override DaisyUI Components
```css
@layer components {
  .btn {
    @apply border-[4px] border-black font-black;
    box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
    transition: all 0.2s ease-in-out;
  }
  
  .btn:hover {
    @apply translate-x-1 translate-y-1;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
  }
}
```

### Add Utilities (If Needed)
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
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s, transform 0.5s;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**For more examples**: See buildComponent-reference.md sections on CSS Overrides & Animations

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

### Step 1: Create Showcase Page
**Location**: `src/pages/showcase/component-name.astro`

```astro
---
import ComponentName from '@/components/ComponentName.astro';
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="ComponentName Showcase">
  <main class="container mx-auto p-8">
    <h1>ComponentName Showcase</h1>
    
    <section class="mb-12">
      <h2>Variants</h2>
      <div class="flex gap-4">
        <ComponentName variant="primary">Primary</ComponentName>
        <ComponentName variant="secondary">Secondary</ComponentName>
        <ComponentName variant="accent">Accent</ComponentName>
      </div>
    </section>
    
    <section class="mb-12">
      <h2>Sizes</h2>
      <div class="flex gap-4 items-center">
        <ComponentName size="sm">Small</ComponentName>
        <ComponentName size="md">Medium</ComponentName>
        <ComponentName size="lg">Large</ComponentName>
      </div>
    </section>
  </main>
</BaseLayout>
```

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
- [ ] Showcase page displays all variants correctly
- [ ] Component works in isolation
- [ ] Component integrates into personal site
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All interactive states work (hover, focus, active)

#### Technical Validation
- [ ] No hard-coded content in component
- [ ] Uses standard DaisyUI classes
- [ ] TypeScript interface defined
- [ ] Content in data files or collections
- [ ] Acceptance test from backlog passes

#### Quality Checklist
- [ ] Borders: 2-6px black (#000000)
- [ ] Shadows: Hard edges, no blur
- [ ] Colors: Brand-consistent (primary=cyan, etc.)
- [ ] Spacing: 4px base unit (gap-1, gap-2, gap-4, etc.)
- [ ] Typography: Space Grotesk (display) or system (body)
- [ ] Animations: CSS-only (or vanilla JS + CSS classes)

### Step 4: Complete Task

```bash
# Update backlog
# Change [ ] to [x] in docs/component-backlog.md
# Check off all success criteria for the task
```

---

## Task-Specific Workflows

### P0-001: Global CSS Setup
**Focus**: Establish CSS foundation

1. **Analysis**: Review design system colors, shadows, rotations
2. **CSS**: Override all base DaisyUI components (.btn, .card, .badge, .input)
3. **Utilities**: Add shadows, rotations, sticker positioning, hover effects
4. **Animations**: Add scroll animation utilities + vanilla JS helper
5. **Test**: Apply to existing components, verify styling

### P0-003, P0-004: Component + Showcase
**Focus**: Build component with demo page

1. **Analysis**: Map to DaisyUI component, list variants needed
2. **CSS**: Add any component-specific overrides (if not in global)
3. **Component**: Create TypeScript interface, implement with DaisyUI classes
4. **Showcase**: Create showcase page with all variants
5. **Test**: Verify showcase renders all options correctly

### P0-005: Hero Section + Layout
**Focus**: Compose components with content

1. **Analysis**: Identify sub-components needed (badges, buttons)
2. **Data**: Create content file in `src/data/hero.ts`
3. **Component**: Update Hero.astro to use sub-components
4. **Layout**: Implement responsive grid/flex layout
5. **Integration**: Connect to homepage, verify no hard-coded content
6. **Test**: Verify responsive, all elements render from data

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
- **Showcases**: `src/pages/showcase/`
- **Pages**: `src/pages/`
- **Data**: `src/data/`
- **Collections**: `src/content/`
- **Styles**: `src/styles/global.css`
- **Scripts**: `src/scripts/`

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
→ Ensure animation script loaded, check element has animation class

---

**Next**: After marking task `[x]`, read backlog for next `[ ]` task and repeat process.
