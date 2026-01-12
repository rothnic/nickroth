# View Transitions Patterns

This document captures patterns for working with Astro View Transitions, especially for elements that need immediate visibility during page navigation.

## The Problem: Fade-In During Navigation

By default, Astro View Transitions animate new elements with a fade-in effect. This causes problems for:
- Overlay elements (like scroll fade indicators)
- Fixed UI elements that should persist
- Any element that needs to be visible immediately after navigation

## Solution: Disable View Transition Animation

Use these Astro directives together:

```astro
<div 
  transition:name="unique-element-name"
  transition:animate="none"
>
  Content that should appear instantly
</div>
```

### Why Both Are Needed

1. **`transition:name`** - Gives the element a stable identity across pages. Elements with matching names on the old and new page "morph" instead of fading.

2. **`transition:animate="none"`** - Explicitly disables any animation for this element during the transition.

Without both, the element may still get a default fade-in animation.

## Lifecycle Events

Astro provides several events during view transitions:

| Event | When It Fires | Use Case |
|-------|--------------|----------|
| `astro:before-preparation` | Before new page is fetched | Cancel navigation, show loading |
| `astro:after-preparation` | New page loaded, before swap | Preprocess new DOM |
| `astro:before-swap` | Just before DOM replacement | Last chance to modify old DOM |
| `astro:after-swap` | DOM replaced, **before visible** | **Set initial state for new elements** |
| `astro:page-load` | Page fully loaded and visible | General initialization |

### Key Insight: `astro:after-swap` vs `astro:page-load`

For elements that need immediate visibility:

```javascript
// ❌ WRONG: Element "pops in" after page visible
document.addEventListener('astro:page-load', initializeElement);

// ✅ CORRECT: Element state set before page visible
document.addEventListener('astro:after-swap', initializeElement);
document.addEventListener('astro:page-load', initializeElement); // Fallback
```

## Layout Stability Patterns

### Hover Effects Without Layout Shift

The neobrutalist button hover effect uses `transform: translate()` which CAN cause layout shifts if:
- The element is the first/last in a flex row
- The transform affects the element's visual bounds that siblings depend on

Solution: Create a custom class that only uses CSS properties that don't affect layout:

```css
.hover-lift-stable {
  &:hover {
    transform: translate(-2px, -2px) !important;
    box-shadow: 10px 10px 0px 0px var(--nr-shadow-color) !important;
  }
}
```

`transform` and `box-shadow` don't affect document flow, so siblings won't shift.

### Full Viewport Width Breakout

To make an element span the full viewport width while inside a padded container:

```css
.full-width-breakout {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
```

Or with Tailwind:
```html
<div class="w-screen left-1/2 -translate-x-1/2">
```

## Examples in This Project

- **WorkCategoryFilter.astro** - Demonstrates all patterns above
- **PageHeader.astro** - Uses fixed heights to prevent layout shifts

## References

- [Astro View Transitions Documentation](https://docs.astro.build/en/guides/view-transitions/)
- [Astro Lifecycle Events](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events)

## View Transition Stacking Context

### The Problem: Regular DOM Elements Over View Transitions

View transitions create `::view-transition-group` pseudo-elements that should appear above regular content during animations. However, regular DOM elements with z-index can still appear on top of these pseudo-elements if not properly managed.

### Solution: Lower Z-Index During Active Transitions

Use the `html:has(::view-transition)` selector to target elements only during active view transitions:

```css
/* Lower z-index during view transitions */
html:has(::view-transition) #element-id {
    z-index: 0 !important;
}
```

### Example: Filter Bar Fix

The filter bar fade overlays (z-10) were appearing over work card transitions (z-index: 100 in ::view-transition-group). The fix:

```css
html:has(::view-transition) #work-category-filter-container,
html:has(::view-transition) #filter-fade-left,
html:has(::view-transition) #filter-fade-right {
    z-index: 0 !important;
}
```

This ensures the work card view transition remains the top-most layer during scaling animations.

### When to Use

Apply this pattern when:
- Regular DOM elements appear over view transition animations
- Fixed or absolute positioned elements interfere with transitions
- You need to temporarily lower z-index only during transitions
