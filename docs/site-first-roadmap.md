# Personal Site First - Development Roadmap

## Strategy Overview

**Goal**: Build your personal site quickly while styling it with the neobrutalism theme.

**Approach**: 
1. **Use DaisyUI classes directly** - `btn btn-primary`, `badge badge-success`, `card` etc.
2. **Style sections as-needed** - Apply neobrutalism styling when building each page
3. **Extract components only when reused** - If a pattern repeats 3+ times, componentize it
4. **Build showcase pages after** - Once site works, create demos for theme sales

## Current Status

### ✅ Complete (P0-001)
- **Global CSS Foundation** - Neobrutalism theme with automatic styling
- **DaisyUI Integration** - All components (btn, badge, card, etc.) styled
- **Scroll Animations** - CSS-only animations with Astro lifecycle
- **Dark Mode** - Automatic system preference detection

### 🏗️ Existing Components (Using DaisyUI directly)
- **Hero.astro** - Uses `btn btn-primary` (no wrapper needed)
- **CapabilityCard.astro** - Uses `card` (no wrapper needed)  
- **WorkCard.astro** - Uses `card`, `badge` (no wrapper needed)
- **Navbar.astro** - Uses `navbar` (no wrapper needed)

**Key Insight**: We already have a working site using DaisyUI classes directly. The neobrutalism styling from P0-001 applies automatically. **No need for wrapper components like NeoButton or StickerBadge.**

---

## Personal Site Build Order

### **Phase 1: Polish Homepage** (2-3 tasks)
Enhance what's already built with neobrutalism flair.

```
✅ P0-001 → Global CSS Setup (COMPLETE)
→ P1-001 → Enhance Hero Section (add floating shapes, stickers, better layout)
→ P1-002 → Style Capabilities Section (add rotations, shadows, animations)
→ P1-003 → Enhance Work Cards (add sticker badges, dramatic shadows)
```

**Result**: Homepage fully neobrutalized with dramatic styling

---

### **Phase 2: Complete Core Pages** (5-6 tasks)
Build out remaining essential pages.

```
→ P1-004 → Work List Page (all projects with filtering)
→ P1-005 → Work Detail Template (case study layout)
→ P1-006 → About Page (background story)
→ P1-007 → Contact Page (form with validation)
→ P1-008 → Footer Component (site footer with links)
→ P1-009 → 404 Page (custom error page)
```

**Result**: Complete functional personal site

---

### **Phase 3: Content Pages** (2-3 tasks)
Add remaining informational pages.

```
→ P1-010 → Approach/Process Page (methodology)
→ P1-011 → Background/Resume Page (interactive timeline)
→ P1-012 → Notes/Blog Index (recent updates)
```

**✅ PERSONAL SITE COMPLETE** (12-13 tasks total)

---

### **Phase 4: Theme Showcase & Sales** (8-10 tasks)
After site works, build showcase site to sell theme.

```
→ P2-001 → Showcase Landing Page (theme demo home)
→ P2-002 → Components Showcase (buttons, badges, cards in isolation)
→ P2-003 → Typography Showcase (all text styles)
→ P2-004 → Forms Showcase (inputs, validation, states)
→ P2-005 → Layouts Showcase (sections, grids, containers)
→ P2-006 → Animations Showcase (hover, scroll, transitions)
→ P2-007 → Colors Showcase (palette with examples)
→ P2-008 → Documentation Page (how to use theme)
→ P2-009 → Extract Reusable Components (if needed for showcase)
→ P2-010 → Theme Package (prepare for sale)
```

**✅ THEME LIBRARY COMPLETE** (20-23 tasks total)

## Development Pattern

### When Building Pages

**Direct Approach** (preferred):
```astro
<!-- Use DaisyUI classes directly -->
<button class="btn btn-primary btn-lg shadow-brutal hover-lift">
  View Work
</button>

<div class="badge badge-success rotate-sticker-1">
  NEW
</div>

<div class="card bg-base-100 shadow-brutal-lg fade-in-up">
  <div class="card-body">
    Content here
  </div>
</div>
```

**Why This Works**:
- ✅ P0-001 already styled all DaisyUI components with neobrutalism
- ✅ Utility classes available (`shadow-brutal`, `rotate-sticker-1`, `hover-lift`, `fade-in-up`)
- ✅ Automatic border & text colors for `bg-*` classes
- ✅ Dark mode handled automatically
- ✅ No component wrappers needed

### When to Extract Components

**Only extract if**:
1. Pattern repeats 3+ times across different pages
2. Complex logic needs to be encapsulated
3. Content needs consistent structure/validation

**Example**:
- ✅ **WorkCard.astro** - Repeated on multiple pages, complex layout
- ✅ **CapabilityCard.astro** - Standardized structure across capability grid
- ❌ **NeoButton** - Just use `<button class="btn btn-primary">` directly
- ❌ **StickerBadge** - Just use `<span class="badge badge-success rotate-sticker-1">` directly

### Showcase Pages Come Later

Build showcase pages **after** the personal site works:
1. Site demonstrates real usage
2. Extract common patterns you actually used
3. Create showcase with all variants
4. Document usage patterns
5. Package as sellable theme

## Example: Enhancing Hero Section (P1-001)

**Current State**:
```astro
<a href="/work" class="btn btn-primary btn-lg">View My Work</a>
```

**Enhanced with Neobrutalism**:
```astro
<!-- Add dramatic shadow and lift effect -->
<a href="/work" class="btn btn-primary btn-lg shadow-brutal-xl hover-lift">
  View My Work
</a>

<!-- Add floating sticker badges -->
<div class="absolute top-4 right-4">
  <span class="badge badge-success badge-lg rotate-sticker-1 shadow-brutal">
    ⚡ AVAILABLE NOW
  </span>
</div>

<!-- Add animated background shapes -->
<div class="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 border-4 border-primary rotate-12 animate-spin-slow" 
     aria-hidden="true">
</div>

<!-- Add scroll animation -->
<div class="hero-content fade-in-up">
  <!-- Content animates in on page load -->
</div>
```

**What You Get**:
- ✅ Dramatic neobrutalism styling
- ✅ Floating decorative badges
- ✅ Animated background elements
- ✅ Scroll-triggered animations
- ✅ No new components needed
- ✅ All classes from P0-001

**Time**: ~30 minutes to enhance vs. 2+ hours to build wrapper components

## Key Differences from Original Plan

### **Original Approach** ❌
- Build wrapper components first (NeoButton, StickerBadge, BrutalistCard)
- Create showcase pages for each component
- Then integrate into site
- More upfront work, slower progress
- Risk of over-engineering unused features

### **New Approach** ✅
- **Use DaisyUI classes directly** - Already styled by P0-001
- **Style pages as you build them** - Immediate visible progress
- **Extract components only when needed** - If pattern repeats 3+ times
- **Showcase pages come last** - After site works, demonstrate what you built
- **Faster to market** - Site live sooner

### Why This Is Better

**P0-001 Already Did The Hard Work**:
```css
/* All DaisyUI components already have neobrutalism styling */
.btn { border: 2px solid; box-shadow: 6px 6px 0; font-weight: 900; }
.badge { border: 1px solid; box-shadow: 3px 3px 0; text-transform: uppercase; }
.card { border: 2px solid; box-shadow: 8px 8px 0; }
```

**You Already Have**:
- ✅ 50+ utility classes (`shadow-brutal-*`, `rotate-sticker-*`, `hover-*`, `fade-in-*`)
- ✅ Automatic styling (`bg-primary` gets correct border + text color)
- ✅ Dark mode (automatic system detection)
- ✅ Scroll animations (Intersection Observer + CSS)
- ✅ Responsive design (DaisyUI breakpoints)

**Just Use It**:
```html
<!-- Instead of building NeoButton component -->
<button class="btn btn-primary btn-lg shadow-brutal-xl hover-lift">
  Click Me
</button>

<!-- Instead of building StickerBadge component -->
<span class="badge badge-success badge-lg rotate-sticker-2 shadow-brutal">
  NEW
</span>
```

## Progress Milestones

### **Milestone 1: Foundation Complete** ✅
- [x] P0-001: Global CSS with neobrutalism theme
- [x] All DaisyUI components styled automatically
- [x] Utility classes for shadows, rotations, animations
- [x] Dark mode with automatic detection
- [x] Scroll animations working

### **Milestone 2: Homepage Enhanced** (Next - 3 tasks)
- [ ] P1-001: Hero section with floating shapes, stickers, dramatic layout
- [ ] P1-002: Capabilities section with rotations, shadows, scroll animations
- [ ] P1-003: Work cards with sticker badges, enhanced shadows

**Target**: Stunning neobrutalism homepage

### **Milestone 3: Core Pages Complete** (5-6 tasks)
- [ ] Work list page with filtering
- [ ] Work detail template
- [ ] About page
- [ ] Contact page with form
- [ ] Footer component
- [ ] Custom 404 page

**Target**: Fully functional personal site

### **Milestone 4: Content Pages** (2-3 tasks)
- [ ] Approach/process page
- [ ] Background/resume page
- [ ] Notes/blog index

**Target**: Complete site with all pages

### **Milestone 5: Showcase & Theme** (8-10 tasks)
- [ ] Showcase landing page
- [ ] Component demos (buttons, badges, cards, forms, etc.)
- [ ] Documentation
- [ ] Theme package for sale

**Target**: Sellable DaisyUI neobrutalism theme

## What This Means

### **Right Now** (Next 3 tasks - P1-001 to P1-003)
Polish the homepage you already have:
- Add floating decorative shapes to hero
- Add sticker badges throughout
- Apply dramatic shadows and rotations
- Add scroll-triggered animations
- Make it **visually stunning**

**Outcome**: Jaw-dropping neobrutalism homepage

### **Short Term** (Next 12-13 tasks)
Complete the personal site:
- Build remaining pages (work, about, contact, etc.)
- Use DaisyUI classes directly with neobrutalism utilities
- Extract components only when patterns repeat
- Focus on **shipping functional site**

**Outcome**: Full personal site live and working

### **Long Term** (After site complete)
Create theme for sale:
- Build showcase pages demonstrating all features
- Document usage patterns you actually used
- Package as sellable theme
- Focus on **monetizing your work**

**Outcome**: Sellable DaisyUI neobrutalism theme

---

## Next Steps

### **Immediate Action** (P1-001: Enhance Hero Section)

1. **Open**: `src/components/Hero.astro`
2. **Add**:
   - Floating decorative shapes with `animate-spin-slow`, `animate-bounce-slow`
   - Sticker badges using `badge rotate-sticker-* shadow-brutal`
   - Dramatic shadows using `shadow-brutal-xl`
   - Scroll animations using `fade-in-up`, `slide-in-left`
3. **Test**: Visual impact, responsive behavior, animations
4. **Move On**: P1-002 capabilities section

### **Reference**

- **Global CSS**: `src/styles/global.css` (all utilities available)
- **Current Implementation**: `docs/design-system/implementation.md`
- **P0-001 Details**: `docs/progress/p0-001.md`
- **Component Backlog**: `docs/component-backlog.md` (needs update to match this roadmap)

**Focus**: Ship beautiful site fast, then build showcase for sales.
