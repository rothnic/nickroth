# View Transition Smooth Scroll Conflict - Solution

## Problem

When using Astro's view transitions with CSS `scroll-behavior: smooth`, a conflict occurs:

1. User scrolls down a list page (e.g., `/showcase/`)
2. User clicks on an item to view details (e.g., `/showcase/components/badges`)
3. View transition animates the navigation (works fine going forward)
4. User clicks back button to return to list
5. **Issue**: Astro tries to restore scroll position, but CSS smooth scroll causes a slow animation
6. The view transition completes **before** the smooth scroll finishes
7. User misses the visual transition effect entirely

## Root Cause

The CSS rule `html { scroll-behavior: smooth; }` applies to **all** scroll operations, including:
- User-initiated scrolls (clicking anchor links)
- JavaScript `scrollTo()` calls
- **Browser scroll restoration during page navigation**

During view transitions, Astro's router needs to instantly restore the scroll position so the morphing animation can be seen. The smooth scroll interferes with this timing.

## Solution

Use Astro's lifecycle events to temporarily disable smooth scroll during view transitions:

```javascript
// Disable smooth scroll when navigation starts
document.addEventListener("astro:before-preparation", () => {
  document.documentElement.style.scrollBehavior = "auto";
});

// Re-enable smooth scroll after transition completes
document.addEventListener("astro:after-swap", () => {
  setTimeout(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, 0);
});
```

### How It Works

1. **`astro:before-preparation`**: Fired when navigation starts, before Astro fetches/prepares the new page
   - Set `scroll-behavior: auto` to allow instant scroll restoration
   
2. **`astro:after-swap`**: Fired after the new page's DOM is swapped in and scroll is restored
   - Use `setTimeout(..., 0)` to ensure scroll restoration completes first
   - Check `prefers-reduced-motion` to respect user preferences
   - Re-enable `scroll-behavior: smooth` for normal page interactions

### Benefits

✅ View transitions are now visible when navigating back
✅ Smooth scroll still works for anchor links and user interactions
✅ Respects `prefers-reduced-motion` user preference
✅ No JavaScript required for styling (pure CSS smooth scroll)
✅ Zero performance impact

## Implementation

This fix is implemented in `src/layouts/BaseLayout.astro` and applies to all pages using view transitions.

## Testing

To test the fix:

1. Navigate to `/showcase/`
2. Scroll down the page
3. Click on any showcase card (e.g., "Badges")
4. Click browser back button
5. **Expected**: View transition morphs the card back into place instantly
6. **Verify**: The scroll position is restored without delay
7. **Verify**: Clicking anchor links still smooth scrolls

## Alternative Approaches Considered

### Option 1: Remove smooth scroll entirely
❌ Would lose smooth scrolling for anchor links and page interactions

### Option 2: Only enable smooth scroll on specific links
❌ Would require manual class additions and is error-prone

### Option 3: Use JavaScript for all smooth scrolling
❌ Adds complexity and requires JS for basic UX feature

### Option 4 (Chosen): Temporarily disable during transitions
✅ Best of both worlds - smooth scroll for users, instant for transitions
✅ Leverages Astro's lifecycle events properly
✅ Minimal code change
✅ Works with all existing view transitions

## References

- [Astro View Transitions Guide](https://docs.astro.build/en/guides/view-transitions/)
- [Astro View Transition Lifecycle Events](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events)
- [MDN: CSS scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
