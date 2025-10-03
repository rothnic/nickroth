# Universal Animation & Hover System

## Overview

A flexible, composable animation system that works with **any element** (badges, cards, buttons, etc.) and properly handles combinations of rotation, scaling, and other transforms.

## Key Principles

1. **Separation of Concerns**: Rotation, pop-in animation, and hover effects are independent
2. **Composability**: Mix and match effects freely
3. **Nested Transforms**: Use wrapper elements to layer transforms without conflicts
4. **Universal**: Works on badges, cards, buttons, divs, etc.

## Core Utilities

### Pop-in Animation
- **`.animate-pop-in`** - Scale from 0 to 1 with elastic bounce (0.5s)
- **`.delay-1` through `.delay-6`** - Stagger animations (0.1s to 0.6s)

### Rotation
- **`.rotate-1` through `.rotate-4`** - Preset rotation angles with antialiasing
- **`.rotate-smooth`** - Antialiasing helper for inline transform styles
- **Inline `style="transform: rotate(Xdeg)"`** - Custom rotation angles

### Hover Effects
- **`.hover-scale-up-sm`** - Scale to 1.05x on hover
- **`.hover-scale-up`** - Scale to 1.1x on hover
- **`.hover-scale-up-lg`** - Scale to 1.15x on hover
- **`.hover-shadow-boost`** - Increase shadow to 5px
- **`.hover-shadow-boost-lg`** - Increase shadow to 8px

## Usage Patterns

### Pattern 1: Simple Element (No Rotation)

```html
<span class="badge badge-primary hover-scale-up hover-shadow-boost">
  Simple Badge
</span>
```

**Use when:**
- No rotation needed
- Single transform on element

### Pattern 2: Pop-in Animation (No Rotation)

```html
<span class="badge badge-primary animate-pop-in delay-1" style="opacity: 0">
  Animated Badge
</span>
```

**Use when:**
- Want scale-in animation
- No rotation needed
- Set initial `opacity: 0` so it's hidden before animation

### Pattern 3: Static Rotation (No Hover)

```html
<span class="badge badge-primary rotate-2">
  Tilted Badge
</span>
```

**Use when:**
- Want fixed rotation
- No interactive hover needed
- Using preset rotation angles

### Pattern 4: Rotation + Hover (Nested - RECOMMENDED)

```html
<span style="transform: rotate(-8deg)" class="rotate-smooth">
  <span class="badge badge-primary hover-scale-up hover-shadow-boost">
    Interactive Rotated Badge
  </span>
</span>
```

**Use when:**
- Want rotation AND hover scale
- Need transforms to work independently
- Most flexible approach

**Why nested?**
- Outer element handles rotation
- Inner element handles scale
- No transform conflicts!

### Pattern 5: Full Animation Suite (Pop-in + Rotation + Hover)

```html
<span 
  style="transform: rotate(-8deg); opacity: 0" 
  class="rotate-smooth animate-pop-in delay-1"
>
  <span class="badge badge-primary hover-scale-up hover-shadow-boost">
    Full Effect Badge
  </span>
</span>
```

**Use when:**
- Want everything: pop-in, rotation, hover
- Hero sections, landing pages
- Maximum visual impact

**Explanation:**
- **Outer `<span>`**: Rotation + pop-in animation
- **Inner `<span>`**: The actual badge with hover effects
- **`opacity: 0`**: Hides until animation starts
- **`.rotate-smooth`**: Antialiasing for crisp rotation
- **`.animate-pop-in`**: Scale animation
- **`.delay-1`**: 0.1s delay before animation starts

## Complete Examples

### Hero Section Badges

```html
<div class="flex justify-center flex-wrap gap-4">
  <!-- Badge 1: Rotated left, pops in first -->
  <span style="transform: rotate(-8deg); opacity: 0" class="rotate-smooth animate-pop-in delay-1">
    <span class="badge badge-lg badge-secondary hover-scale-up hover-shadow-boost">
      FULL-STACK PM
    </span>
  </span>

  <!-- Badge 2: Rotated right, pops in second -->
  <span style="transform: rotate(5deg); opacity: 0" class="rotate-smooth animate-pop-in delay-2">
    <span class="badge badge-lg badge-primary hover-scale-up hover-shadow-boost">
      AI ENGINEER
    </span>
  </span>

  <!-- Badge 3: Slight left rotation, pops in third -->
  <span style="transform: rotate(-3deg); opacity: 0" class="rotate-smooth animate-pop-in delay-3">
    <span class="badge badge-lg badge-warning hover-scale-up hover-shadow-boost">
      AUTOMATION
    </span>
  </span>
</div>
```

### Positioned Stickers Around Image

```html
<div class="relative">
  <img src="photo.jpg" alt="Profile" />
  
  <!-- Top right -->
  <span style="transform: rotate(12deg); opacity: 0" class="absolute top-[-2rem] right-[-2rem] rotate-smooth animate-pop-in delay-4">
    <span class="badge badge-accent hover-scale-up hover-shadow-boost">
      NEW
    </span>
  </span>
  
  <!-- Bottom left -->
  <span style="transform: rotate(-12deg); opacity: 0" class="absolute bottom-[-2rem] left-[-2rem] rotate-smooth animate-pop-in delay-5">
    <span class="badge badge-warning hover-scale-up hover-shadow-boost">
      SALE
    </span>
  </span>
</div>
```

### Interactive Card with Lift

```html
<div 
  style="transform: rotate(-2deg); opacity: 0" 
  class="rotate-smooth animate-pop-in delay-1"
>
  <div class="card bg-base-100 p-6 hover-effect hover-lift hover-rotate-2">
    <h3>Card Title</h3>
    <p>Card content here...</p>
  </div>
</div>
```

### Simple Button (No Animation Needed)

```html
<button class="btn btn-primary hover-scale-up-sm">
  Click Me
</button>
```

## Animation Details

### Pop-in Animation

```css
@keyframes pop-in {
    0% { 
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.1);  /* Overshoot */
    }
    100% { 
        transform: scale(1);    /* Settle */
        opacity: 1;
    }
}
```

- **Duration**: 0.5s
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (elastic bounce)
- **Effect**: Bouncy scale-in with fade

### Rotation Angles

- **`.rotate-1`**: -8 degrees (left tilt)
- **`.rotate-2`**: 5 degrees (right tilt)
- **`.rotate-3`**: -3 degrees (slight left)
- **`.rotate-4`**: 12 degrees (strong right)

### Antialiasing

All rotated elements include:
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
backface-visibility: hidden;
transform-style: preserve-3d;
```

This prevents blurry text/edges during rotation.

## Why Nested Wrappers?

### The Problem

CSS `transform` is a **single property**. When you set:

```css
.element {
  transform: rotate(5deg);  /* First transform */
}

.element:hover {
  transform: scale(1.1);     /* REPLACES rotation! */
}
```

The hover transform **replaces** the rotation, losing it entirely.

### The Solution

Use **nested elements** so each has its own transform:

```html
<span style="transform: rotate(5deg)">     <!-- Outer: rotation -->
  <span class="hover-scale-up">            <!-- Inner: scale -->
    Content
  </span>
</span>
```

Now:
- Outer element: Always rotated 5deg
- Inner element: Scales on hover
- Both transforms coexist!

## Customization

### Custom Rotation Angle

```html
<span style="transform: rotate(15deg)" class="rotate-smooth">
  <span class="badge">Custom 15° rotation</span>
</span>
```

### Custom Delay

Add more delay utilities in CSS:
```css
.delay-7 { animation-delay: 0.7s; }
.delay-8 { animation-delay: 0.8s; }
```

### Custom Hover Scale

```css
.hover-scale-up-xl {
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    &:hover {
        transform: scale(1.2);
    }
}
```

## Best Practices

1. **Always nest** when combining rotation + hover effects
2. **Set `opacity: 0`** initially for pop-in animations
3. **Use delays** for groups of 3+ elements
4. **Vary rotation angles** (-12° to 12°) for natural sticker aesthetic
5. **Match animation intensity** to element importance
6. **Test on real devices** - animations feel different on touch
7. **Don't overuse** - save for key interactive elements

## Performance

- ✅ GPU-accelerated (`transform` and `opacity`)
- ✅ No layout thrashing
- ✅ Efficient CSS-only (no JavaScript)
- ✅ Nested elements have minimal overhead

## Browser Support

- ✅ All modern browsers
- ✅ CSS animations with cubic-bezier
- ✅ Transform composition via nesting
- ✅ Degrades gracefully (no animation, still functional)

## Accessibility

- Animations are decorative only
- Content remains accessible during animations
- Consider adding `@media (prefers-reduced-motion)` for users who need it:

```css
@media (prefers-reduced-motion: reduce) {
    .animate-pop-in {
        animation: none;
        opacity: 1;
        transform: scale(1);
    }
}
```

## Migration from Old System

### Old (Sticker-Specific)
```html
<span 
  class="badge animate-sticker-pop sticker-delay-1 sticker-hover" 
  style="--sticker-rotation: -8deg; opacity: 0"
>
  Badge
</span>
```

### New (Universal)
```html
<span style="transform: rotate(-8deg); opacity: 0" class="rotate-smooth animate-pop-in delay-1">
  <span class="badge hover-scale-up hover-shadow-boost">
    Badge
  </span>
</span>
```

**Benefits of new approach:**
- Works on any element type
- No CSS variable dependencies
- Clearer separation of concerns
- Easier to understand and maintain
- More flexible combinations
