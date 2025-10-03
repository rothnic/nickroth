# Sticker/Badge Animations

## Overview

CSS-only animations that replicate the Motion/React sticker badge effects without requiring JavaScript. These animations provide scale-in effects on page load and interactive hover effects.

## Key Features

- ✅ **No JavaScript required** - Pure CSS animations
- ✅ **Scale-in animation** - Pops in from 0 to 1 scale with bounce
- ✅ **Staggered delays** - Multiple badges animate in sequence
- ✅ **Hover effects** - Scale up to 1.1x with enhanced shadow
- ✅ **Rotation support** - Maintains rotation throughout animations

## Basic Usage

### Simple Sticker Pop-in

```html
<span 
  class="badge badge-primary animate-sticker-pop sticker-hover" 
  style="--sticker-rotation: 5deg; opacity: 0;"
>
  NEW!
</span>
```

### With Stagger Delay

```html
<!-- First badge - no delay -->
<span 
  class="badge badge-secondary animate-sticker-pop sticker-delay-1 sticker-hover" 
  style="--sticker-rotation: -8deg; opacity: 0;"
>
  Badge 1
</span>

<!-- Second badge - 0.2s delay -->
<span 
  class="badge badge-primary animate-sticker-pop sticker-delay-2 sticker-hover" 
  style="--sticker-rotation: 5deg; opacity: 0;"
>
  Badge 2
</span>

<!-- Third badge - 0.3s delay -->
<span 
  class="badge badge-warning animate-sticker-pop sticker-delay-3 sticker-hover" 
  style="--sticker-rotation: -3deg; opacity: 0;"
>
  Badge 3
</span>
```

## Required Classes

### Animation Classes

- **`animate-sticker-pop`** (required) - Main scale-in animation
- **`sticker-hover`** (optional) - Interactive hover effect
- **`sticker-delay-N`** (optional) - Delay animation start (N = 1-6)

### Inline Styles

Two inline styles are required:

1. **`--sticker-rotation`** - CSS variable for rotation angle (e.g., `-8deg`, `5deg`, `90deg`)
2. **`opacity: 0`** - Initial state before animation starts

## Animation Details

### Pop-in Animation (`animate-sticker-pop`)

Replicates Motion's `initial={{ scale: 0 }} animate={{ scale: 1 }}`:

- **Duration**: 0.5s
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (elastic bounce)
- **Effect**: Scale from 0 → 1.1 → 1 with opacity fade-in

```css
@keyframes sticker-pop-in {
    0% { 
        transform: scale(0) rotate(var(--sticker-rotation, 0deg));
        opacity: 0;
    }
    50% {
        transform: scale(1.1) rotate(var(--sticker-rotation, 0deg));
    }
    100% { 
        transform: scale(1) rotate(var(--sticker-rotation, 0deg));
        opacity: 1;
    }
}
```

### Hover Effect (`sticker-hover`)

Replicates Motion's `whileHover={{ scale: 1.1 }}`:

- **Duration**: 0.2s
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (elastic)
- **Effect**: Scale to 1.1x and increase shadow from 3px to 5px

```css
.sticker-hover {
    &:hover {
        transform: scale(1.1) rotate(var(--sticker-rotation, 0deg)) !important;
        box-shadow: 5px 5px 0px 0px var(--nr-shadow-color) !important;
    }
}
```

### Stagger Delays

Six delay utilities for sequential animations:

- **`sticker-delay-1`** - 0.1s delay
- **`sticker-delay-2`** - 0.2s delay
- **`sticker-delay-3`** - 0.3s delay
- **`sticker-delay-4`** - 0.4s delay
- **`sticker-delay-5`** - 0.5s delay
- **`sticker-delay-6`** - 0.6s delay

## Complete Examples

### Hero Section Badges

```html
<div class="flex justify-center flex-wrap gap-4 mb-20">
  <span 
    class="badge badge-lg badge-height-lg badge-secondary animate-sticker-pop sticker-delay-1 sticker-hover" 
    style="--sticker-rotation: -8deg; opacity: 0;"
  >
    FULL-STACK PM
  </span>
  
  <span 
    class="badge badge-lg badge-height-lg badge-primary animate-sticker-pop sticker-delay-2 sticker-hover" 
    style="--sticker-rotation: 5deg; opacity: 0;"
  >
    AI ENGINEER
  </span>
  
  <span 
    class="badge badge-lg badge-height-lg badge-warning animate-sticker-pop sticker-delay-3 sticker-hover" 
    style="--sticker-rotation: -3deg; opacity: 0;"
  >
    AUTOMATION
  </span>
</div>
```

### Positioned Stickers

```html
<div class="relative">
  <!-- Your content -->
  
  <!-- Top right sticker -->
  <span 
    class="badge badge-accent absolute top-[-2rem] right-[-2rem] animate-sticker-pop sticker-delay-4 sticker-hover" 
    style="--sticker-rotation: 12deg; opacity: 0;"
  >
    NEW
  </span>
  
  <!-- Bottom left sticker -->
  <span 
    class="badge badge-warning absolute bottom-[-2rem] left-[-2rem] animate-sticker-pop sticker-delay-5 sticker-hover" 
    style="--sticker-rotation: -12deg; opacity: 0;"
  >
    SALE
  </span>
</div>
```

## Comparison with Motion/React

### Original React Component

```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  whileHover={{ 
    scale: 1.1,
    transition: { duration: 0.2 }
  }}
  className="sticker"
>
  Badge Text
</motion.div>
```

### CSS-Only Equivalent

```html
<span 
  class="badge animate-sticker-pop sticker-hover" 
  style="--sticker-rotation: 0deg; opacity: 0;"
>
  Badge Text
</span>
```

## Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ CSS custom properties (`--sticker-rotation`)
- ✅ CSS animations with cubic-bezier easing
- ✅ Works without JavaScript

## Best Practices

1. **Always set initial opacity to 0** to prevent flash before animation
2. **Use stagger delays** for groups of 3+ badges for visual interest
3. **Vary rotation angles** (-12deg to 12deg) for authentic sticker aesthetic
4. **Don't overuse** - limit to key elements for maximum impact
5. **Test on slower devices** - animations should feel snappy, not sluggish

## Customization

### Custom Rotation

```html
style="--sticker-rotation: 15deg; opacity: 0;"
```

### Custom Delay

Add more delay utilities in `global.css`:

```css
.sticker-delay-7 { animation-delay: 0.7s; }
.sticker-delay-8 { animation-delay: 0.8s; }
```

### Custom Hover Scale

Override in specific components:

```css
.my-badge.sticker-hover:hover {
    transform: scale(1.15) rotate(var(--sticker-rotation, 0deg)) !important;
}
```

## Accessibility

- Uses `cursor: default` to indicate non-interactive nature
- Respects `prefers-reduced-motion` (add media query if needed)
- Animations are decorative and don't affect content access

## Performance

- GPU-accelerated (`transform` and `opacity` only)
- No layout thrashing
- Efficient CSS custom properties
- No JavaScript overhead
