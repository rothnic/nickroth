# Scroll Performance Diagnosis

## Test in Chrome DevTools

### Step 1: Check for Layout Thrashing

1. Open Chrome DevTools → Performance tab
2. Click Record, scroll for 3-5 seconds, stop
3. Look for:
   - **Purple bars** = Layout (Recalculate Style)
   - **Green bars** = Paint
   - **Long tasks** (>50ms) blocking main thread

### Step 2: Check for Forced Synchronous Layout

1. In Performance tab, look for red triangles with "Forced reflow"
2. This means JavaScript is reading layout properties that trigger recalculation

### Step 3: Enable Paint Flashing

1. DevTools → More tools → Rendering
2. Check "Paint flashing"
3. Scroll the page
4. Green flashes = areas being repainted
5. **If WorkCards flash on scroll, that's the problem**

### Step 4: Check Layers

1. DevTools → More tools → Layers
2. Look for excessive compositor layers
3. Each gradient pseudo-element creates a layer

## Hypothesis: `transition-all` is the Culprit

### The Problem

```html
<a class="card ... transition-all duration-300">
```

**`transition-all`** means the browser watches **every CSS property** for changes:
- `transform`
- `opacity`  
- `box-shadow`
- `border-color`
- `background-color`
- `width`, `height`
- **Even properties that don't change!**

During scroll, if **anything** causes a style recalculation (like Intersection Observer adding `.visible` class to nearby elements), the browser has to check if WorkCards need transitions.

### The Fix

Replace `transition-all` with specific properties:

```html
<a class="card ... transition-[transform,box-shadow] duration-300">
```

Or even better for scroll performance:

```css
/* Only transition on hover, not during scroll */
.card {
  transition: none;
}

.card:hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

## Other Potential Issues

### 1. Intersection Observer + Transitions

If the IntersectionObserver is adding `.visible` class to elements near the viewport during scroll, it triggers:
1. Style recalculation (adding class)
2. Transition check on ALL `transition-all` elements
3. Paint if transitions actually run

**Solution**: Disable `transition-all`, use specific transitions only on `:hover`

### 2. Grid Background Pseudo-elements

Three layers (main + ::before + ::after) all with `transform: translate3d()` = 3 compositor layers

**Test**: Temporarily comment out `::before` and `::after`, see if scroll improves

### 3. Box Shadows on Cards

Hard-edged shadows like `4px 4px 0px 0px` still require paint operations.

**Test**: Temporarily set `box-shadow: none` on cards, see if scroll improves

## Quick Test: Disable Transitions During Scroll

Add this to `global.css`:

```css
/* Disable transitions during active scroll */
.is-scrolling * {
  transition: none !important;
}
```

Add this to BaseLayout script:

```js
let scrollTimer;
document.addEventListener('scroll', () => {
  document.documentElement.classList.add('is-scrolling');
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    document.documentElement.classList.remove('is-scrolling');
  }, 150);
}, { passive: true });
```

If this fixes it, we know transitions are the problem.
