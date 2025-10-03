# Neobrutalism DaisyUI Theme Implementation

**Status**: ✅ Implemented in P0-001  
**Last Updated**: October 2, 2025  
**Related Docs**: [`colors.md`](./colors.md), [`guide.md`](./guide.md), [`prototype-analysis.md`](./prototype-analysis.md)

## Overview

This theme implements neobrutalism design principles using **DaisyUI 5's CSS-based theme system**. All customization is done through CSS using `@plugin "daisyui/theme"` directives, **not** through `tailwind.config.mjs`.

## Core Architecture

### Three-Layer Customization Strategy

1. **Theme Variables** (`@plugin "daisyui/theme"`): Define CSS variables for colors, spacing, borders
2. **Component Overrides** (`@layer utilities`): Customize DaisyUI components with explicit CSS
3. **Utility Classes** (`@layer utilities`): Add neobrutalism-specific utilities (shadows, rotations, animations)

### Key Files

- **`src/styles/global.css`**: Complete theme implementation (589 lines)
- **`.github/instructions/daisyui.instructions.md`**: Comprehensive DaisyUI 5 rules and guidelines

## Design Principles

### Override, Don't Extend

**Always customize DaisyUI's built-in classes** (`.btn`, `.badge`, `.card`) directly rather than creating custom variants (`.btn-brutal`, `.badge-custom`):

- ✅ Override `.btn`, `.badge`, `.card` in `global.css`
- ❌ Don't create `.btn-brutal`, `.badge-custom`, `.card-special`
- **Why**: Makes theme portable, keeps standard DaisyUI class names, no custom naming to remember

### Zero JavaScript for Styling

**Never use JavaScript libraries for style composition**:

- ✅ Pure CSS in `@layer utilities`
- ✅ Simple string concatenation in Astro components: `class="btn btn-primary btn-lg"`
- ❌ No `tailwind-variants`, `clsx`, `classnames`, or similar libraries
- **Why**: Maintains performance, portability, and framework-agnostic approach

### Framework Agnostic

**Write components that work anywhere**:

- ✅ Standard HTML with class attributes
- ✅ Works in Astro, React, Vue, Svelte, vanilla HTML
- ❌ No framework-specific styling patterns
- **Why**: Theme can be sold/reused across different tech stacks

## Visual System

### Neobrutalist Elements

- **Borders**: 2px (var(--border)) black in light mode, white in dark mode
- **Shadows**: Hard-edged (no blur) - `Xpx Ypx 0px 0px rgba(0,0,0,1)`
- **Border Radius**: 0 (completely sharp corners via --radius-*)
- **Colors**: High contrast with vibrant accents
- **Rotations**: -8deg to 12deg for sticker aesthetic (`.rotate-sticker-1` through `.rotate-sticker-4`)
- **Typography**: Black weight (900) for emphasis
- **Spacing**: 4px base unit (4, 8, 12, 16, 20, 24, 32, 48, 64px)

### Color System

**Light Mode** (default):
- **Base**: Near-white (`oklch(0.99 0 0)`) background, near-black (`oklch(0.15 0 0)`) text
- **Primary**: Purple-blue (`oklch(53.66% 0.2575 262.5)`) - Electric cyan aesthetic
- **Secondary**: Lime green (`oklch(92.68% 0.2313 124.4)`) - #50fa7b aesthetic
- **Accent**: Pink (`oklch(66.54% 0.2478 358.1)`) - Hot pink aesthetic
- **Warning**: Orange (`oklch(0.75 0.2 65)`) - #f97316 aesthetic
- **Error**: Red (`oklch(0.63 0.26 25)`) - #ef4444 aesthetic
- **Borders**: Pure black (`#000000`)
- **Shadows**: Near-black (`oklch(0.15 0 0 / 1)`)

**Dark Mode** (automatic via `prefersdark: true`):
- **Base**: Dark purple-blue (`oklch(0.2 0.01 280)`) background, near-white (`oklch(0.95 0.01 280)`) text
- **Accent Colors**: Brighter versions of light mode colors (5-8% increased lightness)
- **Borders**: Pure white (`#ffffff`)
- **Shadows**: Light gray (`oklch(0.8 0.01 280 / 1)`) for visibility on dark background

See [`colors.md`](./colors.md) for complete color documentation.

## Implementation Patterns

### 1. Theme Configuration

Both light and dark themes are defined in `global.css`:

```css
@plugin "daisyui" {
    themes: neobrutalism-light --default, neobrutalism-dark --prefersdark;
}

@plugin "daisyui/theme" {
    name: "neobrutalism-light";
    default: true;
    color-scheme: light;
    
    /* Color variables */
    --color-base-100: oklch(0.99 0 0);
    --color-primary: oklch(53.66% 0.2575 262.5);
    /* ... etc */
    
    /* Shape variables */
    --radius-selector: 0rem;
    --radius-field: 0rem;
    --radius-box: 0rem;
    --border: 2px;
    
    /* Custom neobrutalism variables */
    --nr-border-color: #000000;
    --nr-shadow-color: oklch(0.15 0 0 / 1);
    --nr-shadow-sm: 4px 4px 0px 0px var(--nr-shadow-color);
    /* ... etc */
}

@plugin "daisyui/theme" {
    name: "neobrutalism-dark";
    prefersdark: true;  /* Auto-switch on system dark mode */
    color-scheme: dark;
    /* ... dark theme variables */
}
```

### 2. Component Overrides

All DaisyUI components are customized in `@layer utilities`:

```css
@layer utilities {
    /* Button styling */
    :is([data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]) .btn {
        display: inline-flex;
        align-items: center;
        border-width: var(--btn-border-width);
        border-color: var(--btn-border);
        box-shadow: var(--btn-shadow);
        font-weight: var(--font-weight-black);
        /* ... */
    }
    
    :is([data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]) .btn:hover {
        box-shadow: 6px 6px 0px 0px var(--nr-shadow-color);
        transform: translate(-2px, -2px);
    }
    
    /* Card styling */
    :is([data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]) .card {
        border-width: var(--border);
        border-color: var(--nr-border-color);
        box-shadow: var(--nr-shadow-lg);
        /* ... */
    }
    
    /* Badge styling */
    :is([data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]) .badge {
        font-weight: var(--font-weight-black);
        text-transform: uppercase;
        border-width: calc(var(--border) * 0.5);
        box-shadow: var(--nr-shadow-sm);
        /* ... */
    }
}
```

### 3. Utility Classes

Neobrutalism-specific utilities:

```css
@layer utilities {
    /* Shadow utilities */
    .shadow-brutal-sm { box-shadow: var(--nr-shadow-sm); }
    .shadow-brutal { box-shadow: var(--nr-shadow-base); }
    .shadow-brutal-lg { box-shadow: var(--nr-shadow-lg); }
    .shadow-brutal-xl { box-shadow: var(--nr-shadow-xl); }
    
    /* Rotation utilities for stickers */
    .rotate-sticker-1 { transform: rotate(-8deg); }
    .rotate-sticker-2 { transform: rotate(5deg); }
    .rotate-sticker-3 { transform: rotate(-3deg); }
    .rotate-sticker-4 { transform: rotate(12deg); }
    
    /* Sticker positioning */
    .sticker-container { position: relative; }
    .sticker-top-left { position: absolute; top: 1rem; left: 1rem; }
    .sticker-top-right { position: absolute; top: 1rem; right: 1rem; }
    /* ... etc */
    
    /* Hover effects */
    .hover-lift {
        transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .hover-lift:hover {
        transform: translate(-6px, -6px);
        box-shadow: var(--nr-shadow-xl);
    }
    
    /* CSS-only animations */
    @keyframes spin-slow {
        to { transform: rotate(360deg); }
    }
    
    .animate-spin-slow {
        animation: spin-slow 4s linear infinite;
    }
    
    /* Scroll animations - require !important to override DaisyUI */
    .fade-in-up {
        opacity: 0 !important;
        transform: translateY(40px) !important;
        transition: opacity 0.8s ease-out, transform 0.8s ease-out !important;
    }
    
    .fade-in-up.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
}
```

### 4. Automatic Styling System

Background colors automatically apply correct text and border colors:

```css
@layer utilities {
    /* Automatic text colors */
    .bg-primary { color: var(--color-primary-content); }
    .bg-secondary { color: var(--color-secondary-content); }
    /* ... etc */
    
    /* Automatic border colors (can be overridden) */
    [data-theme="neobrutalism-light"] .bg-primary:not([class*="border-"]) {
        border-color: #000000;
    }
    [data-theme="neobrutalism-dark"] .bg-primary:not([class*="border-"]) {
        border-color: #ffffff;
    }
}
```

This means:
```html
<!-- Automatically gets correct text color and border -->
<div class="bg-primary border-2 p-4">
  Text is automatically primary-content color
</div>

<!-- Override with explicit border class -->
<div class="bg-primary border-2 border-accent p-4">
  Border is now accent color instead of theme default
</div>
```

## Usage Examples

### Basic Components

```html
<!-- Button with neobrutalism styling automatically applied -->
<button class="btn btn-primary btn-lg">
  Click Me
</button>

<!-- Card with thick border and hard shadow -->
<div class="card bg-base-100 shadow-brutal-lg">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content</p>
  </div>
</div>

<!-- Badge (sticker) with rotation -->
<span class="badge badge-success badge-lg rotate-sticker-1">
  NEW
</span>
```

### Sticker Positioning

```html
<div class="sticker-container">
  <button class="btn btn-primary btn-lg">View Projects</button>
  
  <!-- Positioned stickers -->
  <span class="badge badge-success sticker-top-right rotate-sticker-4">
    MORE
  </span>
  <span class="badge badge-secondary sticker-bottom-left rotate-sticker-1">
    SOON
  </span>
</div>
```

### Hover Effects

```html
<!-- Lift on hover -->
<div class="card hover-lift bg-base-100">
  <div class="card-body">
    Hover over me!
  </div>
</div>

<!-- Scale on hover -->
<button class="btn btn-primary hover-scale">
  Scale Button
</button>
```

### Scroll Animations

```html
<!-- Fade in from bottom when scrolling -->
<div class="card fade-in-up bg-base-100">
  <div class="card-body">
    This animates when visible
  </div>
</div>

<!-- Slide in from left -->
<div class="hero slide-in-left">
  <div class="hero-content">
    Slides in from left
  </div>
</div>
```

**Note**: Scroll animations require JavaScript initialization:

```javascript
// src/scripts/animations.js
import { initScrollAnimations } from './animations';

document.addEventListener('astro:page-load', () => {
  initScrollAnimations();
});
```

See [`docs/progress/p0-001.md`](../progress/p0-001.md) for complete scroll animation implementation details.

## Component Development Pattern

When building components, use this pattern:

```astro
---
// src/components/MyComponent.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const { 
  variant = 'primary',
  size = 'md',
  class: className = ''
} = Astro.props;

// Simple string concatenation - no JS libraries needed
const classes = ['btn', `btn-${variant}`, `btn-${size}`, className]
  .filter(Boolean)
  .join(' ');
---

<button class={classes}>
  <slot />
</button>
```

**Benefits**:
- ✅ No JavaScript runtime overhead
- ✅ Works in any framework
- ✅ Standard DaisyUI class names
- ✅ Neobrutalism styling applied automatically

## Dark Mode

Dark mode is **automatic** based on system preferences:

```css
@plugin "daisyui/theme" {
    name: "neobrutalism-dark";
    prefersdark: true;  /* This enables automatic switching */
    /* ... dark theme config */
}
```

**Do NOT use Tailwind's `dark:` prefix** - DaisyUI handles all theme switching via CSS variables.

To manually toggle theme (optional):

```html
<button onclick="document.documentElement.setAttribute('data-theme', 
  document.documentElement.getAttribute('data-theme') === 'neobrutalism-light' 
    ? 'neobrutalism-dark' 
    : 'neobrutalism-light')">
  Toggle Theme
</button>
```

## Critical Implementation Rules

1. **Use theme variables, not hardcoded values**: `var(--nr-border-color)` not `#000000`
2. **Override in @layer utilities**: Ensures proper specificity over DaisyUI components
3. **Scroll animations need !important**: DaisyUI component transitions override otherwise
4. **Test both themes**: Every component must work in light AND dark mode
5. **No @apply in utilities layer**: Use explicit CSS properties for better performance
6. **Keep DaisyUI class names**: Never create `.btn-brutal` - just customize `.btn`

## Performance Considerations

### CSS-Only Philosophy

All styling and animations use pure CSS:

- **Animations**: `@keyframes` with CSS classes, no JS libraries
- **Hover effects**: CSS transitions
- **Scroll animations**: Intersection Observer + CSS classes (minimal vanilla JS)
- **No Motion/Framer dependencies**: Everything compiles to static CSS

### Bundle Size Impact

- **Theme**: ~2KB additional CSS (compressed)
- **No JS overhead**: Zero runtime JavaScript for styling
- **Portable**: Copy `global.css` to any project

## Migration from Prototype

The React prototype (`figma-export/`) used:
- ❌ Framer Motion for animations
- ❌ tailwind-variants for component variants
- ❌ React-specific patterns

Our implementation uses:
- ✅ Pure CSS animations
- ✅ Simple string concatenation
- ✅ Framework-agnostic patterns

See [`prototype-analysis.md`](./prototype-analysis.md) for detailed migration patterns.

## Troubleshooting

### Issue: Dark mode not working
**Solution**: Ensure both themes registered in `@plugin "daisyui"` block and dark theme has `prefersdark: true`

### Issue: Component styles not applying
**Solution**: Check that overrides are in `@layer utilities` with `:is([data-theme="..."])` selectors

### Issue: Scroll animations not triggering
**Solution**: Verify animations.js is imported and `initScrollAnimations()` called on `astro:page-load` event

### Issue: Borders wrong color in dark mode
**Solution**: Use `var(--nr-border-color)` not hardcoded `#000000`

## Next Steps

This implementation is **complete for P0-001** (Global CSS Setup). Future enhancements:

1. **P0-002**: Typography system setup
2. **P1 Tasks**: Individual component development
3. **P2 Tasks**: Showcase pages demonstrating all variants
4. **P3 Tasks**: Advanced animations and interactions

## References

- **DaisyUI 5 Documentation**: https://daisyui.com/docs/
- **Theme Customization**: https://daisyui.com/docs/themes/
- **OKLCH Color Picker**: https://oklch.com/
- **Project Guidelines**: `.github/instructions/daisyui.instructions.md`
- **Complete Progress Log**: `docs/progress/p0-001.md`
- **Color System**: `docs/design-system/colors.md`
- **Design Philosophy**: `docs/design-system/guide.md`
