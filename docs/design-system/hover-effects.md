# Composable Hover Effects

## Overview

The neobrutalism theme now supports **composable hover effects** using CSS custom properties. This allows you to combine multiple effects (lift, scale, rotate) on a single element.

## Basic Usage

All composable hover effects require the base class `.hover-effect`:

```html
<button class="btn hover-effect hover-lift">
  Lifts on hover
</button>
```

## Combining Effects

The power of this system is that you can **combine multiple effects**:

```html
<!-- Scale AND rotate -->
<button class="btn hover-effect hover-scale hover-rotate-3">
  Scales and rotates
</button>

<!-- Lift AND rotate (counter-clockwise) -->
<div class="card hover-effect hover-lift-sm hover-rotate-neg-2">
  Card content
</div>

<!-- Scale, lift, AND rotate -->
<div class="badge hover-effect hover-scale-sm hover-lift hover-rotate-1">
  All effects!
</div>
```

## Available Modifiers

### Lift Effects
Moves element up and to the left with enhanced shadow:

- `.hover-lift-sm` - Small lift (-3px, -3px) with large shadow
- `.hover-lift` - Standard lift (-6px, -6px) with XL shadow
- `.hover-lift-lg` - Large lift (-8px, -8px) with XXL shadow

### Scale Effects
Enlarges the element:

- `.hover-scale-sm` - Small scale (1.02x)
- `.hover-scale` - Standard scale (1.05x)
- `.hover-scale-lg` - Large scale (1.1x)

### Rotation Effects
Rotates the element clockwise (positive) or counter-clockwise (negative):

**Clockwise:**
- `.hover-rotate-1` - 1 degree
- `.hover-rotate-2` - 2 degrees
- `.hover-rotate-3` - 3 degrees
- `.hover-rotate-5` - 5 degrees

**Counter-clockwise:**
- `.hover-rotate-neg-1` - -1 degree
- `.hover-rotate-neg-2` - -2 degrees
- `.hover-rotate-neg-3` - -3 degrees
- `.hover-rotate-neg-5` - -5 degrees

## Examples

### Buttons

```html
<!-- Primary CTA with lift and subtle rotation -->
<button class="btn btn-primary hover-effect hover-lift hover-rotate-2">
  Click Me
</button>

<!-- Ghost button with scale and rotate -->
<button class="btn btn-ghost hover-effect hover-scale hover-rotate-neg-1">
  Learn More
</button>
```

### Cards

```html
<!-- Product card with lift and scale -->
<div class="card hover-effect hover-lift-sm hover-scale-sm">
  <figure>
    <img src="product.jpg" alt="Product" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Product Name</h2>
  </div>
</div>

<!-- Blog card with rotation effect -->
<div class="card hover-effect hover-rotate-3">
  <div class="card-body">
    <h3>Blog Post Title</h3>
  </div>
</div>
```

### Badges/Stickers

```html
<!-- Sticker badge with rotation and scale -->
<span class="badge badge-primary hover-effect hover-scale-lg hover-rotate-5">
  NEW!
</span>
```

## Legacy Support

Old hover classes still work for backward compatibility:

- `.hover-lift` (without `.hover-effect`) - Original lift behavior
- `.hover-scale` (without `.hover-effect`) - Original scale behavior
- `.hover-rotate` (without `.hover-effect`) - Original -3deg rotation

## Implementation Details

The system uses CSS custom properties that combine in the `:hover` state:

```css
.hover-effect {
  --hover-translate-x: 0px;
  --hover-translate-y: 0px;
  --hover-scale: 1;
  --hover-rotate: 0deg;
  
  &:hover {
    transform: 
      translate(var(--hover-translate-x), var(--hover-translate-y)) 
      scale(var(--hover-scale)) 
      rotate(var(--hover-rotate));
  }
}
```

Modifier classes simply set these custom properties:

```css
.hover-lift { 
  --hover-translate-x: -6px;
  --hover-translate-y: -6px;
}

.hover-scale { 
  --hover-scale: 1.05;
}

.hover-rotate-3 { 
  --hover-rotate: 3deg;
}
```

## Best Practices

1. **Always include `.hover-effect` base class** when using modifiers
2. **Combine effects sparingly** - too many can be overwhelming
3. **Match effect intensity to element importance** - subtle for secondary elements, bold for primary CTAs
4. **Test on actual devices** - animations can feel different on touch devices
5. **Maintain consistency** - use similar effect combinations for similar element types

## Showcase Page

See all hover effects in action at `/showcase/hover-effects` (coming soon).
