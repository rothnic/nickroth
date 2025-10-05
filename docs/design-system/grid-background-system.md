# Grid Background System

## Overview

The grid background system creates a scrolling "graph paper" effect that serves as the foundation layer for the entire site. This document explains how the background, sections, and overlay sections work together.

## Architecture

### Three-Layer System

The design uses a three-layer stacking approach:

1. **Background Layer** (`#grid-bg`) - The scrolling grid pattern
2. **Content Layer** (sections, components) - Transparent by default to show the grid
3. **Overlay Layer** (cards, torn sections) - Solid backgrounds that sit on top

## Layer 1: Scrolling Grid Background

### Implementation

The grid background is a single DOM element (`#grid-bg`) inserted at the top of the `<body>` in `BaseLayout.astro`:

```html
<body>
  <div id="grid-bg" aria-hidden="true"></div>
  <!-- rest of content -->
</body>
```

### CSS Properties

```css
#grid-bg {
    position: absolute;        /* Scrolls with content */
    inset: 0;
    min-height: 100vh;
    z-index: -1;              /* Behind all content */
    pointer-events: none;     /* Click-through */
    background-color: var(--color-base-100);
    background-image: 
        /* Gradient overlay for visual interest */
        radial-gradient(ellipse at top left, 
            var(--color-base-100) 0%, 
            transparent 40%
        ),
        linear-gradient(135deg, 
            transparent 0%, 
            oklch(0.58 0.30 314 / 0.08) 10%, 
            transparent 50%, 
            oklch(0.93 0.23 124.4 / 0.08) 90%, 
            transparent 100%
        ),
        /* Grid lines */
        linear-gradient(var(--color-base-300) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-base-300) 1px, transparent 1px);
    background-size: 100% 100%, 100% 100%, 16px 16px, 16px 16px;
    background-position: 0 0, 0 0, 0 0, 0 0;
}
```

### Key Design Decisions

- **`position: absolute` (not `fixed`)**: Grid scrolls with content for a natural paper-like feel
- **`z-index: -1`**: Always behind content, never interferes with interactions
- **`pointer-events: none`**: Ensures clicks pass through to content below
- **`min-height: 100vh`**: Extends to cover full page height even with short content

### Dark Mode Variant

Dark mode uses the same structure with adjusted colors:

```css
html[data-theme="neobrutalism-dark"] #grid-bg {
    background-color: var(--color-base-100);
    background-image: 
        radial-gradient(ellipse at top left, 
            var(--color-base-100) 0%, 
            transparent 50%
        ),
        linear-gradient(135deg, 
            transparent 0%, 
            oklch(0.68 0.33 314 / 0.03) 10%, 
            transparent 50%, 
            oklch(0.93 0.23 124.4 / 0.03) 90%, 
            transparent 100%
        ),
        linear-gradient(var(--color-base-300) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-base-300) 1px, transparent 1px);
    background-size: 100% 100%, 100% 100%, 16px 16px, 16px 16px;
    background-position: 0 0, 0 0, 0 0, 0 0;
}
```

## Layer 2: Transparent Content Sections

### Default Behavior

All layout wrappers are transparent by default to show the grid through:

```css
:where(header, nav, main, section, footer, .container, .prose, .hero, .menu, .tabs) {
    background-color: transparent !important;
}

:where(.bg-base-100) {
    background-color: transparent !important;
}
```

### Section Styling

```css
section {
    background: transparent !important;
    position: relative;
    padding: 4rem 0;
    z-index: 1; /* Above the grid background */
    overflow-x: hidden;
    max-width: 100%;
}
```

### Exception: Navbar

The navbar is the only persistent UI element that needs a solid background:

```css
.navbar {
    background-color: var(--color-base-100) !important;
    border-bottom: 4px solid var(--nr-border-color);
    position: relative;
    z-index: 100; /* Above all scrolling content */
}
```

**Why navbar needs a background:**
- Provides contrast for navigation links
- Prevents grid pattern from making text hard to read
- Creates visual hierarchy separating chrome from content

## Layer 3: Overlay Sections

Overlay sections sit **on top** of the grid with solid backgrounds.

### Paper Sections

Standard white/light cards that sit on the grid:

```css
.section-paper,
.paper {
    position: relative;
    z-index: 1;
    background-color: var(--color-base-100) !important;
    background-image: none;
    border: 4px solid var(--nr-border-color);
    box-shadow: var(--nr-shadow-base);
    padding: 3rem 2rem;
}
```

### Rotated Card Sections

Large content cards with rotation and shadow:

```css
.rotated-section {
    position: relative;
    background-color: var(--color-base-100);
    background-image: none !important;
    border: 4px solid var(--nr-border-color);
    box-shadow: var(--nr-shadow-xl);
    padding: 3rem;
    margin: 4rem auto;
    max-width: 1200px;
    transform-style: preserve-3d;
}

.rotated-section-sm {
    transform: rotate(-1deg);
}
```

### Torn Gap Sections

Dark sections with jagged "torn paper" edges:

```css
.torn-gap {
    position: relative;
    background: oklch(0.15 0 0); /* Dark background */
    padding: 6rem 0;
    margin: 0;
    z-index: 5; /* Above regular sections */
    overflow: visible;
    touch-action: pan-y;
    
    /* Torn edges created via clip-path */
    clip-path: polygon(
        /* Top torn edge */
        0% 0%, 3% 1.5%, 7% 0.8%, 12% 2%, 18% 0.5%, 25% 1.8%, 32% 1%, 
        38% 2.3%, 45% 0.6%, 52% 1.9%, 58% 0.9%, 65% 2.1%, 72% 0.4%, 78% 1.6%, 
        85% 1.1%, 91% 2.4%, 96% 1.3%, 100% 2.5%,
        /* Right edge */
        100% 2.5%, 100% 100%,
        /* Bottom torn edge */
        100% 98.5%, 96% 99.1%, 94% 98.4%, 88% 99.4%, 82% 98.8%, 76% 99.7%, 
        69% 98.9%, 63% 99.5%, 56% 98.5%, 49% 99.3%, 42% 98.7%, 35% 99.6%, 
        28% 98.9%, 21% 99.6%, 15% 98.6%, 9% 99.4%, 4% 99.1%, 0% 98.5%,
        /* Left edge */
        0% 98.5%, 0% 0%
    );
}
```

**How torn edges work:**
- `clip-path` cuts jagged edges directly into the dark section
- The light grid background naturally shows through at the jagged edges
- No pseudo-elements or overlays needed
- Creates authentic "torn paper" effect where dark section appears torn into light background

## Z-Index Hierarchy

```
z-index: 100  → Navbar (always on top)
z-index: 10   → (reserved for modals, dropdowns)
z-index: 5    → Torn gap sections
z-index: 1    → Regular sections and paper cards
z-index: -1   → Grid background (always at bottom)
```

## Usage Guidelines

### ✅ DO

- Keep sections transparent by default to show the grid
- Use `.paper` or `.rotated-section` for content that needs a solid background
- Use `.torn-gap` for dramatic dark sections with torn edges
- Let the grid scroll naturally with content

### ❌ DON'T

- Don't add `background-color` to regular sections
- Don't use `position: fixed` on background elements
- Don't use `background-attachment: fixed` (causes rendering issues)
- Don't try to paint grid patterns on pseudo-elements (alignment problems)

## Performance Considerations

### Why position: absolute instead of fixed

- **Fixed**: Grid stays in viewport, content scrolls over it (parallax effect but can cause paint issues)
- **Absolute**: Grid scrolls with content (more natural, better performance on mobile)

### Optimization Techniques

1. **Single background element**: One `#grid-bg` element instead of multiple gradients on sections
2. **Pointer events disabled**: `pointer-events: none` on grid ensures clicks pass through
3. **Minimal repaints**: Transparent sections don't trigger background repaints
4. **CSS-only torn edges**: `clip-path` is GPU-accelerated, no JavaScript needed

## Browser Compatibility

- **clip-path**: Supported in all modern browsers (IE11 requires SVG fallback)
- **oklch colors**: Fallback to rgb in browsers without OKLCH support
- **CSS nesting**: Requires PostCSS plugin or modern browser

## Testing Checklist

When modifying the grid system, verify:

- [ ] Grid scrolls smoothly with content (no fixed positioning)
- [ ] Grid appears behind all content (z-index hierarchy correct)
- [ ] Sections are transparent by default
- [ ] Navbar has solid background
- [ ] Paper sections have solid backgrounds with borders/shadows
- [ ] Torn edges reveal grid naturally without gaps or duplicates
- [ ] Dark mode colors adjust properly
- [ ] Mobile performance is smooth (no jank during scroll)
- [ ] Click events pass through grid to content below

## Common Issues & Solutions

### Issue: Grid doesn't scroll with content

**Cause**: `position: fixed` on `#grid-bg`  
**Solution**: Use `position: absolute` instead

### Issue: Torn edges show duplicate lines or white gaps

**Cause**: Pseudo-elements with their own grid backgrounds  
**Solution**: Use `clip-path` on section itself, let grid show through naturally

### Issue: Navbar is transparent

**Cause**: Global transparent rule applying to navbar  
**Solution**: Add `!important` to navbar background-color override

### Issue: Performance issues on mobile

**Cause**: Multiple elements painting grid backgrounds  
**Solution**: Single `#grid-bg` element with `pointer-events: none`

## Future Enhancements

Potential improvements to consider:

- [ ] Add `prefers-reduced-motion` support to disable animations
- [ ] Consider CSS containment for performance optimization
- [ ] Explore backdrop-filter effects for frosted glass overlays
- [ ] Add more torn edge variations (different polygon patterns)
- [ ] Create utility classes for partial transparency (show grid through content at 50% opacity)

## Related Documentation

- [Color System](./colors.md) - OKLCH color definitions
- [Design System Guide](./guide.md) - Overall design philosophy
- [Hover Effects](./hover-effects.md) - Interactive element styling
- [Sticker Animations](./sticker-animations.md) - Card rotation effects
