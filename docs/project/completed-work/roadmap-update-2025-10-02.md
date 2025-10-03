# Site-First Roadmap Update

**Date**: October 2, 2025  
**Related**: P0-001 completion, documentation organization

## Summary

Updated `docs/site-first-roadmap.md` to reflect the **actual implementation approach** discovered during P0-001.

## Key Insight

**Original Plan**: Build wrapper components (NeoButton, StickerBadge, BrutalistCard) with showcase pages, then integrate into site.

**What We Learned**: P0-001's global CSS already styled **all DaisyUI components** with neobrutalism. No wrapper components needed - just use DaisyUI classes directly!

## Major Changes

### 1. Strategy Shift

**Before**:
- Build base components first
- Create showcase pages for each
- Then integrate into site
- 28 tasks (18 site + 10 theme)

**After**:
- Use DaisyUI classes directly (`btn btn-primary`, `badge badge-success`)
- Style pages as you build them
- Extract components only when pattern repeats 3+ times
- Showcase pages come last (after site works)
- 20-23 tasks (12-13 site + 8-10 theme)

### 2. Phase Restructure

**New Phase 1: Polish Homepage** (3 tasks)
- P1-001: Enhance Hero (floating shapes, stickers, dramatic layout)
- P1-002: Style Capabilities (rotations, shadows, animations)
- P1-003: Enhance Work Cards (sticker badges, shadows)

**New Phase 2: Core Pages** (5-6 tasks)
- Work list, work details, about, contact, footer, 404

**New Phase 3: Content Pages** (2-3 tasks)
- Approach, background/resume, notes index

**New Phase 4: Showcase & Sales** (8-10 tasks)
- Build showcase site demonstrating all features
- Package as sellable theme

### 3. Development Pattern

**Direct Approach** (now preferred):
```astro
<!-- Just use DaisyUI classes directly -->
<button class="btn btn-primary btn-lg shadow-brutal-xl hover-lift">
  Click Me
</button>

<span class="badge badge-success rotate-sticker-1 shadow-brutal">
  NEW
</span>
```

**Component Extraction** (only when needed):
- Extract if pattern repeats 3+ times
- Examples: WorkCard, CapabilityCard (already exist)
- Don't extract: Button, Badge (just use DaisyUI classes)

## Why This Is Better

### Faster to Ship
- ❌ **Old**: Build NeoButton → showcase → integrate → use (4 steps)
- ✅ **New**: Use `btn btn-primary` directly (1 step)

### Less Overhead
- ❌ **Old**: Maintain wrapper components, showcase pages, integration
- ✅ **New**: DaisyUI classes work everywhere automatically

### Real-World Validation
- ❌ **Old**: Build showcase before knowing what's needed
- ✅ **New**: Build site first, showcase demonstrates what you actually used

### Clearer Goal
- ❌ **Old**: 28 tasks before site complete
- ✅ **New**: 12-13 tasks to complete site, then showcase for sales

## What P0-001 Gave Us

Already available from global CSS:

### Styled Components
```css
.btn { border: 2px solid; box-shadow: 6px 6px 0; font-weight: 900; }
.badge { border: 1px solid; box-shadow: 3px 3px 0; text-transform: uppercase; }
.card { border: 2px solid; box-shadow: 8px 8px 0; }
/* + 20 more DaisyUI components */
```

### Utility Classes
- **Shadows**: `shadow-brutal-sm`, `shadow-brutal`, `shadow-brutal-lg`, `shadow-brutal-xl`
- **Rotations**: `rotate-sticker-1` (-8deg), `rotate-sticker-2` (5deg), etc.
- **Hover Effects**: `hover-lift`, `hover-scale`, `hover-rotate`
- **Animations**: `animate-spin-slow`, `animate-bounce-slow`, `animate-pulse-shadow`
- **Scroll Animations**: `fade-in-up`, `slide-in-left`, `slide-in-right`, `scale-in`
- **Positioning**: `sticker-top-left`, `sticker-top-right`, etc.

### Automatic Systems
- **Border Colors**: `bg-primary border-4` automatically gets themed border (black/white)
- **Text Colors**: `bg-primary` automatically gets correct text color
- **Dark Mode**: Automatic system preference detection
- **Override Support**: Can override with explicit classes (`border-accent`)

## Updated Roadmap Structure

```
✅ Phase 0: Foundation (COMPLETE)
   - P0-001: Global CSS Setup

→ Phase 1: Polish Homepage (3 tasks)
   - P1-001: Enhance Hero
   - P1-002: Style Capabilities
   - P1-003: Enhance Work Cards

→ Phase 2: Core Pages (5-6 tasks)
   - Work list, details, about, contact, footer, 404

→ Phase 3: Content Pages (2-3 tasks)
   - Approach, background, notes

→ Phase 4: Showcase & Sales (8-10 tasks)
   - Build showcase demonstrating features
   - Package theme for sale
```

## Next Immediate Steps

### P1-001: Enhance Hero Section

**What to do**:
1. Open `src/components/Hero.astro`
2. Add floating decorative shapes:
   ```astro
   <div class="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 border-4 border-primary rotate-12 animate-spin-slow" />
   ```
3. Add sticker badges:
   ```astro
   <span class="badge badge-success badge-lg rotate-sticker-1 shadow-brutal">
     ⚡ AVAILABLE NOW
   </span>
   ```
4. Enhance buttons:
   ```astro
   <a href="/work" class="btn btn-primary btn-lg shadow-brutal-xl hover-lift">
     View My Work
   </a>
   ```
5. Add scroll animations:
   ```astro
   <div class="hero-content fade-in-up">
   ```

**Time estimate**: ~30 minutes (vs 2+ hours to build wrapper components)

## Files Updated

- `docs/site-first-roadmap.md` - Complete rewrite reflecting new approach

## Benefits

1. **Faster Development**: Skip wrapper component overhead
2. **Clearer Path**: 12-13 tasks to complete site (vs 18 before)
3. **Real-World Focus**: Build what's needed, showcase what works
4. **Better Architecture**: Use framework classes directly, extract only when needed
5. **Easier Maintenance**: Fewer abstraction layers

## Related Documentation

- **Implementation Guide**: `docs/design-system/implementation.md`
- **P0-001 Complete**: `docs/progress/p0-001.md`
- **Component Backlog**: `docs/component-backlog.md` (needs update)
- **Build Workflow**: `.github/prompts/buildComponent2.prompt.md`

## Validation

✅ Roadmap reflects actual implementation approach  
✅ Clear development pattern documented  
✅ Next steps obvious (P1-001: Enhance Hero)  
✅ Realistic task count (12-13 vs 18)  
✅ Showcase phase clearly separated (after site works)
