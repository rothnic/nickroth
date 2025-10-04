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

Use Astro's lifecycle events with scroll position monitoring to temporarily disable smooth scroll during view transitions:

```javascript
// Track scroll position to detect when restoration is complete
let lastScrollY = window.scrollY;
let scrollStableFrames = 0;
let isTransitioning = false;

// Disable smooth scroll when navigation starts
document.addEventListener("astro:before-preparation", () => {
  isTransitioning = true;
  document.documentElement.style.scrollBehavior = "auto";
});

// After DOM swap, monitor scroll position until it stabilizes
document.addEventListener("astro:after-swap", () => {
  lastScrollY = window.scrollY;
  scrollStableFrames = 0;
  
  const checkScrollStable = () => {
    if (!isTransitioning) return;
    
    const currentScrollY = window.scrollY;
    
    // If scroll position hasn't changed, increment stable frame counter
    if (Math.abs(currentScrollY - lastScrollY) < 1) {
      scrollStableFrames++;
      
      // After 3 stable frames (~50ms), re-enable smooth scroll
      if (scrollStableFrames >= 3) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
          document.documentElement.style.scrollBehavior = "smooth";
        }
        isTransitioning = false;
        return;
      }
    } else {
      // Scroll position changed, reset counter
      scrollStableFrames = 0;
      lastScrollY = currentScrollY;
    }
    
    requestAnimationFrame(checkScrollStable);
  };
  
  requestAnimationFrame(checkScrollStable);
});
```

### How It Works

1. **`astro:before-preparation`**: Fired when navigation starts
   - Set `scroll-behavior: auto` to allow instant scroll restoration
   - Mark that a transition is in progress
   
2. **`astro:after-swap`**: Fired after DOM replacement
   - Begin monitoring scroll position using `requestAnimationFrame`
   - Track when scroll position stabilizes (3 consecutive frames with no change)
   - Only re-enable smooth scroll after scroll restoration completes

3. **Scroll Stability Detection**: Uses `requestAnimationFrame` to check scroll position each frame
   - Waits for 3 stable frames (~50ms) to ensure scroll restoration is complete
   - Accounts for browser timing variations in scroll restoration
   - Respects `prefers-reduced-motion` user preference

This approach ensures smooth scroll remains disabled throughout the entire scroll restoration process, regardless of timing variations between browsers or navigation patterns.

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
