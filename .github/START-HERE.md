# START HERE - Quick Guide for LLMs

## Where You Are
Building Nick Roth's personal website using **site-first approach** - build pages, extract components as-needed.

## Current Status
- **Phase**: Phase 1 (Foundation & Homepage Hero)
- **Next Task**: P0-001 (Global CSS Setup)
- **Progress**: 0/28 tasks (0/18 for personal site)

## What To Do Next

### 1. Find Next Task
```bash
# Read backlog, find first [ ] task in priority order
cat docs/component-backlog.md
```

### 2. Execute Task
```bash
# Use the buildComponent prompt (auto-selects next task)
#file:.github/prompts/buildComponent.prompt.md
```

### 3. Verify Completion
- [ ] All files created/modified per task spec
- [ ] Acceptance test passes
- [ ] Content separated from components
- [ ] Update task to `[x]` in backlog

### 4. Move to Next Task
Repeat from step 1

## Quick Reference Files

### Must Read Before Starting
| File | Purpose | When to Read |
|------|---------|--------------|
| `.github/instructions/daisyui.instructions.md` | Core rules (ALWAYS apply) | Before any code |
| `docs/component-backlog.md` | Task list with dependencies | Every task |
| `docs/site-first-roadmap.md` | Visual strategy overview | First time / when confused |

### Reference During Work
| File | Purpose | When to Read |
|------|---------|--------------|
| `docs/design-system/guide.md` | Design principles & patterns | When building components |
| `docs/figma-export-review.md` | Pattern extraction from prototype | When unsure about approach |
| `docs/neobrutalism-daisyui-implementation.md` | DaisyUI override strategies | When customizing DaisyUI |

### For Context Only
| File | Purpose | When to Read |
|------|---------|--------------|
| `AGENTS.md` | Project overview | When lost / need big picture |
| `docs/README.md` | Documentation index | Looking for specific docs |

## Core Principles (Never Forget)

### 1. Override, Don't Extend
✅ Override `.btn`, `.card`, `.badge` in global.css  
❌ Don't create `.btn-brutal`, `.card-custom`

### 2. Zero JavaScript for Styling
✅ Pure CSS in `@layer components` and `@layer utilities`  
❌ No `tailwind-variants`, `clsx`, `classnames`

### 3. Content Separation
✅ Content in `src/content/` or `src/data/`  
❌ No hard-coded text in components

### 4. Site-First Development
✅ Build pages → extract components → showcase → integrate  
❌ Don't build all components before using them

### 5. Component + Showcase Pattern
✅ Every component gets showcase page with all variants  
❌ Don't skip showcases (needed for theme sales)

## Common Patterns

### Building a Component
```astro
---
// 1. Define interface (typed props)
interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// 2. Extract props
const { variant = 'primary', size = 'md' } = Astro.props;

// 3. Compose classes (string concat, no libraries!)
const classes = ['btn', `btn-${variant}`, `btn-${size}`].join(' ');
---

<!-- 4. Use standard DaisyUI classes -->
<button class={classes}>
  <slot />
</button>
```

### Building a Showcase Page
```astro
---
// Import component
import NeoButton from '@/components/NeoButton.astro';
---

<section>
  <h2>Button Variants</h2>
  <div class="flex gap-4">
    <NeoButton variant="primary">Primary</NeoButton>
    <NeoButton variant="secondary">Secondary</NeoButton>
  </div>
</section>

<section>
  <h2>Button Sizes</h2>
  <div class="flex gap-4">
    <NeoButton size="sm">Small</NeoButton>
    <NeoButton size="md">Medium</NeoButton>
    <NeoButton size="lg">Large</NeoButton>
  </div>
</section>
```

### CSS Override Pattern
```css
/* src/styles/global.css */
@layer components {
  /* Override DaisyUI component */
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

@layer utilities {
  /* Add new utility */
  .shadow-brutal { 
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); 
  }
}
```

## Milestones

- **Milestone 1** (9 tasks): Homepage visible with hero + content
- **Milestone 2** (12 tasks): Navigation + layout complete
- **Milestone 3** (18 tasks): ✅ Personal site complete
- **Milestone 4** (28 tasks): ✅ Theme library complete

## Help! I'm Stuck

### "What task should I do?"
→ Read `docs/component-backlog.md`, find first `[ ]` task with no blocked dependencies

### "How do I customize DaisyUI?"
→ Read `.github/instructions/daisyui.instructions.md` section on overrides

### "What's the overall strategy?"
→ Read `docs/site-first-roadmap.md` visual guide

### "How do animations work?"
→ Read `docs/figma-export-review.md` section 6 (Animation Migration Strategy)

### "Where does content go?"
→ Never in components. Always in `src/content/` or `src/data/`

### "Do I need to read the whole buildComponent prompt?"
→ No! Just sections relevant to your current phase (see prompt's table of contents)

## When You're Done
1. Mark task `[x]` in `docs/component-backlog.md`
2. Verify acceptance test passes
3. Start next task

---

**Remember**: Build fast, build visible, maintain quality. Site-first approach = motivation through results.
