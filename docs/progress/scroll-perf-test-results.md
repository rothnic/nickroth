# Scroll Performance Test Results

## Current Status: TESTING

### Changes Applied

1. **Disabled gradient overlays** on `#grid-bg::before` and `#grid-bg::after`
2. **Disabled GPU hints** (`transform: translate3d()`, `isolation: isolate`)
3. **Changed WorkCard** from `transition-all` to `transition-[transform,box-shadow]`
4. **Kept simple grid pattern** (16px x 16px lines)

### Test This Now

**Scroll the homepage and contact page.** Report back:
- ✅ Smooth scroll → Problem was gradients/GPU layers
- ❌ Still stuttering → Problem is elsewhere

---

## If Scroll Is Now Smooth ✅

**The problem was the gradient overlays.** Options to fix:

### Option 1: Use Static Gradient Image
```css
#grid-bg {
    background-image: 
        url('/gradients/purple-gradient.png'),  /* Pre-rendered */
        linear-gradient(...),  /* Grid lines */
        linear-gradient(90deg, ...);
}
```
**Pros**: No runtime calculation, cached by browser  
**Cons**: Need to create PNG, won't scale perfectly

### Option 2: Simplify Gradients
```css
/* Single radial gradient, no pseudo-elements */
#grid-bg {
    background-image: 
        radial-gradient(circle 600px at 20% 20%, oklch(0.58 0.30 314 / 0.03), transparent),
        linear-gradient(...),
        linear-gradient(90deg, ...);
}
```
**Pros**: Still CSS, simpler compositing  
**Cons**: Less visual richness

### Option 3: CSS Paint API (Modern Browsers)
```css
#grid-bg {
    background-image: paint(gradient-grid);
}
```
**Pros**: Offloads to worker thread  
**Cons**: Requires JavaScript, limited support

### Option 4: No Gradients (Neobrutalism)
Keep only the grid lines - pure neobrutalism doesn't need subtle gradients anyway!

---

## If Scroll Still Stutters ❌

Next steps to investigate:

### 1. Check Font Rendering
Fonts can cause constant recalculation during scroll:
```css
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;  /* Or optimizeSpeed */
}
```

### 2. Check for Layout Thrashing

Run this in console during scroll:
```js
let scrollCount = 0;
let layoutCount = 0;

window.addEventListener('scroll', () => {
  scrollCount++;
  const test = document.body.offsetHeight;  // Forces layout
  layoutCount++;
});

setTimeout(() => {
  console.log(`Scrolls: ${scrollCount}, Layouts: ${layoutCount}`);
}, 5000);
```

If layoutCount >> scrollCount, something is forcing layout reads.

### 3. Disable All CSS Animations Temporarily

Add to global.css:
```css
*, *::before, *::after {
    animation: none !important;
    transition: none !important;
}
```

If smooth now → CSS animations are the problem

### 4. Check Browser Extensions

Disable ALL extensions, test in incognito mode.

### 5. Check Hardware Acceleration

In Chrome:
- chrome://gpu
- Look for "Graphics Feature Status"
- All should be "Hardware accelerated"

### 6. Profile with Chrome DevTools

Performance tab during scroll:
- Long tasks (>50ms)?
- Purple bars (Recalculate Style)?
- Green bars (Paint)?
- Yellow bars (Scripting)?

---

## Common Culprits by Likelihood

1. **Gradient rendering** (testing now) - 80% likely
2. **Font rendering with variable fonts** - 10% likely
3. **CSS transitions watching too many properties** - 5% likely
4. **Browser extension interference** - 3% likely
5. **Hardware acceleration disabled** - 2% likely

---

## Quick Reference: Test Commands

```bash
# Dev server should be running
cd /Users/nroth/workspace/nickroth
pnpm dev
```

Then test:
1. Homepage scroll performance
2. Contact page scroll performance
3. Compare to before (should be noticeably better if gradients were the issue)
