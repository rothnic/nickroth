# P0-001 Quick Reference - Global CSS Setup

**Status**: ✅ Complete (Oct 2, 2025)  
**Full Details**: See `progress/p0-001.md`

---

## Critical Fixes Summary

### 1. Automatic Border & Text Colors ✅
**No manual classes needed** - system automatically applies:
```astro
<!-- Automatic: themed border + correct text color -->
<div class="bg-primary border-4 p-4">Content</div>

<!-- Override: matching border -->
<div class="bg-secondary border-4 border-secondary p-4">Content</div>
```

**Implementation**: CSS rules in `@layer utilities` with `:not([class*="border-"])` guards

---

### 2. CSS Layer Strategy ✅
**Correct pattern** for DaisyUI v5:
```css
@layer utilities {
  /* Component overrides (wins over DaisyUI @layer components) */
  [data-theme="neobrutalism-light"] .btn { /* overrides */ }
  
  /* Generic utilities (outside theme selector) */
  .shadow-brutal { /* ... */ }
}
```

**Key**: Theme-scoped overrides in utilities layer = no !important needed

---

### 3. Scroll Animations with Astro ✅
**Must use !important** on animation CSS (DaisyUI components have transitions):
```css
.fade-in-up {
  opacity: 0 !important;
  transform: translateY(40px) !important;
  transition: opacity 0.8s ease-out, transform 0.8s ease-out !important;
}
```

**Setup in BaseLayout**:
```astro
<script>
  import { initScrollAnimations } from "../scripts/animations.js";
  initScrollAnimations();
  document.addEventListener("astro:page-load", () => {
    initScrollAnimations();
  });
</script>
```

**Timing for visibility**: 0.8s duration, 0.15 threshold, -150px rootMargin, larger distances

---

### 4. Dark Mode ✅
**No `dark:` prefix needed** - DaisyUI handles theme switching automatically:
- Background: `oklch(0.2 0.01 280)` (softened)
- Shadows: `oklch(0.8 0.01 280 / 1)` (gray instead of white)
- Borders: White via `--nr-border-color: #ffffff`
- Theme switching: `prefersdark: true` in dark theme config

---

### 5. Button Shadow Depths ✅
**Reduced for subtle effect**:
- Default: 4px (was 6px)
- Hover: 6px (was 10px) with 2px translation

---

## Design Values

### Borders
- 2px (badges), 4px (standard), 6px (emphasis)
- Color: Black in light, white in dark (automatic)

### Shadows
- `shadow-brutal-sm`: 4px
- `shadow-brutal`: 8px
- `shadow-brutal-lg`: 12px
- `shadow-brutal-xl`: 20px
- Hard edges, no blur, theme-colored

### Rotations
- `rotate-sticker-1`: -8deg
- `rotate-sticker-2`: 5deg
- `rotate-sticker-3`: -3deg
- `rotate-sticker-4`: 12deg

### Colors (OKLCH)
- Primary (Cyan): `85% 0.138 181.071`
- Secondary (Lime): `92.68% 0.2313 124.4`
- Accent (Hot Pink): `66.54% 0.2478 358.1`
- Warning (Orange): `0.75 0.2 65`
- Error (Red): `0.63 0.26 25`

### Spacing
4px base unit: `gap-1` (4px), `gap-2` (8px), `gap-4` (16px), `gap-8` (32px)

---

## What's Available Now

### Components (All working)
✅ Buttons, Cards, Badges, Forms (input, textarea, select, checkbox, radio, toggle, range)

### Utilities (All working)
✅ Shadows (4 sizes), Rotations (4 angles), Positioning (8 positions), Hover effects (lift, scale, rotate), Rounded edges (5 sizes)

### Animations (All working)
✅ CSS loops (spin-slow, bounce-slow, pulse-shadow)  
✅ Scroll triggers (fade-in-up, slide-in-left, slide-in-right, scale-in)  
✅ Astro lifecycle (works on navigation)

### Theming (All working)
✅ Light mode, Dark mode, Automatic switching, Automatic styling

---

## Test Page
**Location**: `src/pages/test-global-css.astro`  
**Status**: All 12 acceptance criteria passing

---

## Common Issues - Quick Fixes

| Problem | Solution |
|---------|----------|
| Manual border-black needed everywhere | Use automatic system: just `bg-primary border-4` |
| Animations break on navigation | Verify `astro:page-load` handler in BaseLayout |
| Can't see animations | Increase to 0.8s, larger distances, -150px rootMargin |
| Dark mode not working | Check `prefersdark: true` in theme config |
| Styling overridden | Use theme-scoped utilities layer, not !important |

---

**Next Task**: P0-002 Typography System Setup  
**Full Documentation**: `progress/p0-001.md`
