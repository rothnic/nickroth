# DaisyUI v5 and Tailwind v4 @layer Directive: Complete Customization Guide

## Table of Contents
1. [Understanding the @layer Directive](#understanding-the-layer-directive)
2. [When to Use @layer](#when-to-use-layer)
3. [DaisyUI v5 Architecture Overview](#daisyui-v5-architecture-overview)
4. [Layer Strategy for DaisyUI v5 Customization](#layer-strategy-for-daisyui-v5-customization)
5. [Practical Implementation Examples](#practical-implementation-examples)
6. [Advanced Customization Techniques](#advanced-customization-techniques)
7. [Best Practices and Performance Considerations](#best-practices-and-performance-considerations)

## Understanding the @layer Directive

The `@layer` directive is a CSS cascade layer mechanism that provides precise control over style precedence, independent of selector specificity or source order. In Tailwind CSS and DaisyUI contexts, it serves multiple critical functions.

### Core Layer Concepts

Tailwind CSS organizes styles into three fundamental layers:

- **Base Layer**: Global styles, resets, and HTML element defaults
- **Components Layer**: Reusable component styles that can be overridden by utilities
- **Utilities Layer**: Single-purpose utility classes with highest precedence

### How @layer Works

```css
/* Define layer order early */
@layer base, components, utilities;

/* Add styles to layers anywhere in your CSS */
@layer components {
  .btn-custom {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
}

@layer utilities {
  .text-brand {
    color: #ff6b6b;
  }
}
```

The layer order determines precedence: utilities will always override components, regardless of specificity or source order.

## When to Use @layer

### Use @layer When:

1. **Managing Style Precedence**: You need predictable override behavior
2. **Creating Component Libraries**: Building reusable components that others can customize
3. **Third-Party Integration**: Integrating with frameworks like PrimeReact or other UI libraries
4. **Large-Scale Applications**: Managing complex style hierarchies across teams
5. **Framework Development**: Building design systems or component libraries

### Use @layer vs Other Approaches:

| Scenario | Use @layer | Use @apply | Use @theme | Use @utility |
|----------|------------|------------|------------|--------------|
| Component abstraction | ✅ | ✅ | ❌ | ✅ |
| Style precedence control | ✅ | ❌ | ❌ | ❌ |
| Theme value access | ❌ | ❌ | ✅ | ✅ |
| Tree-shaking compatible | ✅ | ❌ | ✅ | ✅ |
| Bundle size impact | Low | High | Very Low | Low |

### When NOT to Use @layer:

- Simple utility combinations (use direct classes)
- One-off customizations (use inline styles or direct CSS)
- Performance-critical contexts where every byte matters

## DaisyUI v5 Architecture Overview

### New CSS-First Architecture

DaisyUI v5 fundamentally restructured around Tailwind CSS v4's CSS-first approach:

```css
/* DaisyUI v5 Setup */
@import "tailwindcss";
@plugin "daisyui";

/* Optional theme customization */
@plugin "daisyui/theme" {
  name: "custom";
  --color-primary: oklch(55% 0.3 240);
  --radius-box: 0.5rem;
}
```

### Internal Layer Structure

DaisyUI v5 internally organizes its styles using layers:

1. **Base Layer**: Reset styles, CSS variable definitions
2. **Components Layer**: All DaisyUI component styles
3. **Utilities Layer**: Helper utilities and modifiers

### Micro CSS Architecture

DaisyUI v5 introduces micro CSS files for granular control:

```css
/* Include only specific components */
@plugin "daisyui" {
  include: button, card, modal;
}

/* Or exclude specific parts */
@plugin "daisyui" {
  exclude: carousel, timeline;
}
```

### Zero Dependencies Structure

The v5 architecture eliminates external dependencies:

- **Zero runtime dependencies**
- **Native CSS nesting support**
- **ESM compatibility**
- **75% smaller CSS output**

## Layer Strategy for DaisyUI v5 Customization

### Basic Layer Setup

```css
/* Define your layer order */
@layer base, daisyui-base, components, daisyui-components, utilities, custom-utilities;

@import "tailwindcss";
@plugin "daisyui";

/* Your custom base styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-feature-settings: "kern";
  }
}

/* Custom component styles */
@layer components {
  .app-container {
    @apply max-w-7xl mx-auto px-4;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Advanced Layer Organization

For complex applications, use nested layer organization:

```css
@layer 
  framework-base,
  app-base, 
  framework-components, 
  app-components,
  framework-utilities,
  app-utilities,
  overrides;

/* Framework level (DaisyUI) */
@import "tailwindcss" layer(framework-base);
@plugin "daisyui";

/* Application level */
@layer app-base {
  /* Your base styles */
}

@layer app-components {
  /* Your custom components */
  .hero-section {
    @apply bg-gradient-to-br from-primary to-secondary;
  }
}

@layer overrides {
  /* Emergency overrides */
  .force-square {
    border-radius: 0 !important;
  }
}
```

## Practical Implementation Examples

### Example 1: Custom Button System with Layer Control

```css
@import "tailwindcss";
@plugin "daisyui";

@plugin "daisyui/theme" {
  name: "brand-light";
  default: true;
  --border: 4px;
  --nr-shadow-color: oklch(0.15 0 0 / 1);
}

@plugin "daisyui/theme" {
  name: "brand-dark";
  prefersdark: true;
  --border: 4px;
  --nr-shadow-color: oklch(0.95 0 0 / 1);
}

@layer utilities {
  /* DaisyUI button overrides */
  html[data-theme="brand-light"] .btn,
  html[data-theme="brand-dark"] .btn {
    border-width: var(--border);
    border-color: var(--color-neutral);
    border-radius: 0;
    box-shadow: 6px 6px 0 0 var(--nr-shadow-color);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  html[data-theme="brand-light"] .btn:hover,
  html[data-theme="brand-dark"] .btn:hover {
    transform: translate(-4px, -4px);
    box-shadow: var(--nr-shadow-hover);
  }

  /* Project utilities remain reusable */
  .btn-rounded {
    border-radius: 9999px;
  }

  .btn-square {
    border-radius: 0;
  }
}
```

Usage:
```html
<!-- Base DaisyUI button inherits theme overrides -->
<button class="btn btn-primary">Primary Button</button>

<!-- Compose with project utility -->
<button class="btn btn-secondary btn-rounded">Rounded Secondary</button>
```

### Example 2: Theme-Aware Layer System

```css
@import "tailwindcss";
@plugin "daisyui";

/* Define themes with layer support */
@plugin "daisyui/theme" {
  name: "corporate-light";
  --color-primary: oklch(55% 0.15 240);
  --radius-box: 4px;
}

@plugin "daisyui/theme" {
  name: "corporate-dark";
  --color-primary: oklch(65% 0.15 240);
  --radius-box: 4px;
}

@layer components {
  /* Theme-aware components */
  .app-card {
    @apply card bg-base-100 shadow-md;
    border: 1px solid oklch(var(--color-base-300) / 0.2);
  }
  
  .app-sidebar {
    @apply bg-base-200;
    border-right: 1px solid oklch(var(--color-base-300) / 0.3);
  }
}

/* Theme-specific overrides */
@layer utilities {
  [data-theme="corporate-dark"] .app-card {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }
  
  [data-theme="corporate-light"] .app-card {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
}
```

### Example 3: Responsive Layer Strategy

```css
@import "tailwindcss";
@plugin "daisyui";

@layer components {
  .responsive-nav {
    @apply navbar bg-base-100;
  }
  
  .mobile-menu {
    @apply drawer-side lg:drawer-open;
  }
}

@layer utilities {
  /* Responsive utilities that work with DaisyUI */
  @media (max-width: 768px) {
    .responsive-nav {
      padding: 0.5rem;
    }
    
    .mobile-menu {
      transform: translateX(-100%);
    }
  }
  
  @media (min-width: 1024px) {
    .responsive-nav {
      padding: 1rem 2rem;
    }
  }
}
```

### Example 4: Animation Layer System

```css
@import "tailwindcss";
@plugin "daisyui";

@layer base {
  /* Global animation setup */
  * {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@layer components {
  .animated-button {
    @apply btn;
    transition: all 0.3s ease;
    transform-origin: center;
  }
  
  .modal-animated {
    @apply modal;
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
}

@layer utilities {
  /* Animation utilities */
  .animate-press {
    transform: scale(0.95);
  }
  
  .animate-bounce-in {
    animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

## Advanced Customization Techniques

### Technique 1: Layer Composition with DaisyUI Themes

```css
/* Create a design system that extends DaisyUI */
@layer design-tokens, component-primitives, component-compositions, app-specific;

@import "tailwindcss";
@plugin "daisyui";

@layer design-tokens {
  :root {
    --app-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --app-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --app-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --app-transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@layer component-primitives {
  .surface {
    background: oklch(var(--color-base-100));
    border-radius: oklch(var(--radius-box));
    box-shadow: var(--app-shadow-md);
  }
  
  .interactive {
    transition: var(--app-transition);
    cursor: pointer;
  }
  
  .interactive:hover {
    transform: translateY(-1px);
    box-shadow: var(--app-shadow-lg);
  }
}

@layer component-compositions {
  .feature-card {
    @apply surface interactive card p-6;
  }
  
  .dashboard-widget {
    @apply surface card p-4;
    min-height: 200px;
  }
}
```

### Technique 2: Conditional Layer Loading

```css
/* Conditionally load layers based on features */
@import "tailwindcss";
@plugin "daisyui";

/* Always load core layers */
@layer core-components {
  .app-button {
    @apply btn;
  }
}

/* Conditionally load based on CSS custom properties */
@layer optional-features {
  /* Only load if animations are enabled */
  html[data-animations="true"] .app-button {
    transition: all 0.3s ease;
  }
  
  html[data-animations="true"] .app-button:hover {
    transform: translateY(-2px);
  }
  
  /* Only load if reduced motion is not preferred */
  @media (prefers-reduced-motion: no-preference) {
    .motion-safe-animate {
      animation: fadeIn 0.5s ease-in-out;
    }
  }
}
```

### Technique 3: Multi-Brand Layer Strategy

```css
@import "tailwindcss";
@plugin "daisyui";

/* Brand-specific layers */
@layer brand-a, brand-b, brand-shared;

@layer brand-shared {
  .branded-button {
    @apply btn font-semibold tracking-wide;
    border-width: 2px;
    text-transform: uppercase;
  }
}

@layer brand-a {
  [data-brand="brand-a"] .branded-button {
    @apply btn-primary;
    border-radius: 0;
    letter-spacing: 0.1em;
  }
  
  [data-brand="brand-a"] .brand-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}

@layer brand-b {
  [data-brand="brand-b"] .branded-button {
    @apply btn-secondary;
    border-radius: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  [data-brand="brand-b"] .brand-header {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
}
```

## Best Practices and Performance Considerations

### Performance Best Practices

1. **Layer Order Optimization**:
```css
/* Put frequently changing layers last */
@layer base, components, utilities, dynamic-overrides;
```

2. **Minimize Layer Count**:
```css
/* Good: Organized but not excessive */
@layer framework, components, utilities, overrides;

/* Avoid: Too many layers */
@layer base, theme, reset, components, widgets, layout, utilities, responsive, overrides, debug;
```

3. **Use Micro CSS Files for Production**:
```html
<!-- Load only what you need -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@5/components/button.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@5/components/card.css">
```

### Development Best Practices

1. **Layer Documentation**:
```css
/**
 * Layer Strategy:
 * - base: Global resets and defaults
 * - components: Reusable UI components
 * - utilities: Single-purpose helper classes
 * - overrides: Emergency specificity overrides
 */
@layer base, components, utilities, overrides;
```

2. **Consistent Naming Conventions**:
```css
@layer components {
  /* Component naming: .component-variant-modifier */
  .button-primary-large { /* ✅ Good */ }
  .btnPrimaryLg { /* ❌ Inconsistent */ }
}
```

3. **Theme Overrides vs. Reusable Utilities**: Keep DaisyUI overrides inside `@layer utilities` with `[data-theme="…"]` selectors, but define hover helpers and animation classes outside those selectors so any component can opt-in.

4. **Testing Layer Precedence**:
```css
@layer utilities {
  /* Create debug utilities to test layer order */
  .debug-red { background: red !important; }
  .debug-blue { background: blue !important; }
}
```

### Bundle Size Considerations

**Layer Impact on Bundle Size:**

- `@layer`: Minimal impact, organizes existing CSS
- `@apply`: Can increase bundle size through duplication
- `@theme`: Minimal impact, references theme values
- `@utility`: Moderate impact, adds new CSS rules

**Optimization Strategies:**

1. **Use `@layer` over `@apply` for frequently used patterns**
2. **Leverage DaisyUI's micro CSS files in production**
3. **Use conditional layer loading for optional features**
4. **Monitor CSS output size during build process**

### Production Deployment

**Recommended CSS Structure:**

```css
/* production.css */
@import "tailwindcss";
@plugin "daisyui" {
  include: button, card, modal, dropdown;
}

@layer components {
  /* Only your essential components */
}

@layer utilities {
  /* Only your essential utilities */
}
```

**CDN Strategy for Static Sites:**

```html
<!-- Use DaisyUI's micro CSS files -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@5/components/button.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@5/themes/light.css">
```

This comprehensive guide provides the foundation for effectively using the `@layer` directive with DaisyUI v5 and Tailwind CSS v4, enabling precise control over style precedence while maintaining optimal performance and maintainability.