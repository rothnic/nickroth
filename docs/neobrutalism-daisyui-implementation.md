# Neobrutalism Theme Implementation with DaisyUI

## Overview
This document outlines the implementation strategy for a neobrutalism design theme using DaisyUI as the base component library. Following KISS and DRY principles, we will customize DaisyUI's theme configuration rather than creating custom components from scratch.

## Neobrutalism Design Principles
- **Bold borders**: Thick black borders (4-6px) on all interactive elements
- **Brutalist shadows**: Hard-edged box shadows (no blur) using format: `[Xpx_Ypx_0px_0px_rgba(0,0,0,1)]`
- **Vibrant colors**: Bright, saturated color palette (cyan, lime, yellow, fuchsia, magenta)
- **Flat depth**: Simulated depth through offset shadows and rotation, not gradients
- **Intentional rotation**: Slight transforms (-3deg to 12deg) for playful, hand-placed feel
- **Heavy typography**: Font-black (900 weight) for emphasis
- **No blur or softness**: All effects are hard-edged

## Implementation Strategy

### Design Philosophy: Override, Don't Extend

**Key Principle**: Customize DaisyUI's default classes (`.btn`, `.badge`, `.card`) directly rather than creating new variants (`.btn-brutal`, `.badge-brutal`). This ensures:
- Any DaisyUI component automatically gets neobrutalism styling
- Theme is portable to other projects - just swap the config
- No custom class names to remember or maintain
- Standard DaisyUI documentation remains relevant

### Phase 1: DaisyUI Theme Configuration

#### 1.1 Custom Theme Extension (tailwind.config.mjs)
Leverage DaisyUI's theming system to define neobrutalism aesthetic:

```javascript
daisyui: {
  themes: [
    {
      neobrutalism: {
        // Core brand colors - bright and saturated
        "primary": "#22d3ee",        // cyan-400
        "secondary": "#bef264",      // lime-300  
        "accent": "#fde047",         // yellow-300
        "neutral": "#000000",        // pure black for borders/text
        
        // Base colors
        "base-100": "#ffffff",       // white background
        "base-200": "#f0fdfa",       // cyan-50 for subtle bg
        "base-300": "#ecfccb",       // lime-50 for cards
        
        // Semantic colors - keep vibrant
        "info": "#22d3ee",           // cyan-400
        "success": "#bef264",        // lime-300
        "warning": "#fde047",        // yellow-300
        "error": "#f43f5e",          // rose-500
        
        // Additional neobrutalism colors
        "--brutal-pink": "#ec4899",      // fuchsia-500
        "--brutal-magenta": "#d946ef",   // fuchsia-600
        "--brutal-purple": "#a855f7",    // purple-500
      }
    }
  ],
  // Disable default styling that conflicts with neobrutalism
  styled: true,
  base: true,
  utils: true,
}
```

#### 1.2 Global CSS Overrides (src/styles/global.css)
Apply neobrutalism characteristics by overriding DaisyUI's default component classes.

**Important**: These overrides apply to ALL instances of DaisyUI components automatically. No custom class names needed - just use standard DaisyUI classes like `btn`, `badge`, `card` etc.

```css
@import "tailwindcss";
@plugin "daisyui";

@layer base {
  /* Neobrutalism Typography */
  body {
    @apply font-sans antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-black tracking-tight;
  }
  
  strong, b {
    @apply font-black;
  }
}

@layer components {
  /* 
   * Override DaisyUI's default component styles for neobrutalism
   * These apply globally - no need for custom class names like .btn-brutal
   */
  
  /* Buttons - thick borders, hard shadows, bold type */
  .btn {
    @apply border-[4px] border-black font-black uppercase tracking-wide;
    box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
    transition: all 0.2s ease;
  }
  
  .btn:hover {
    @apply translate-x-1 translate-y-1;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
  }
  
  .btn:active {
    @apply translate-x-2 translate-y-2;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Cards - brutalist borders and shadows */
  .card {
    @apply border-[4px] border-black;
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Badges - sticker style with heavy weight */
  .badge {
    @apply border-2 border-black font-black px-3 py-2;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Inputs - brutalist form fields */
  .input,
  .textarea,
  .select {
    @apply border-[3px] border-black font-bold;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
  }
  
  .input:focus,
  .textarea:focus,
  .select:focus {
    @apply outline-none border-black;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Avatar - bold ring treatment */
  .avatar img,
  .avatar .placeholder {
    @apply border-[4px] border-black;
  }
  
  /* Menu items - clean brutal look */
  .menu li > * {
    @apply font-bold;
  }
  
  .menu li > *:hover {
    @apply bg-base-200 border-2 border-black;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Navbar - subtle brutalism */
  .navbar {
    @apply border-b-4 border-black;
  }
  
  /* Tabs - hard edges */
  .tabs-bordered .tab {
    @apply border-b-[3px] border-black font-black;
  }
  
  .tabs-bordered .tab-active {
    @apply border-b-[5px];
  }
}

/* Custom Neobrutalism Utilities */
@layer utilities {
  /* Reusable brutalist shadow utilities */
  .shadow-brutal-sm {
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
  }
  
  .shadow-brutal {
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  }
  
  .shadow-brutal-lg {
    box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1);
  }
  
  .shadow-brutal-xl {
    box-shadow: 20px 20px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Sticker/badge rotations */
  .rotate-sticker-1 { transform: rotate(-8deg); }
  .rotate-sticker-2 { transform: rotate(5deg); }
  .rotate-sticker-3 { transform: rotate(-3deg); }
  .rotate-sticker-4 { transform: rotate(12deg); }
  
  /* CSS-only animations */
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes sway {
    0%, 100% { transform: rotate(45deg) translateX(0); }
    50% { transform: rotate(45deg) translateX(10px); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }
  
  .animate-sway {
    animation: sway 4s ease-in-out infinite;
  }
}
```

### Phase 2: Hero Component Implementation

#### 2.1 Component Structure (src/components/Hero.astro)
Rebuild hero using DaisyUI classes with neobrutalism customization:

```astro
---
import headshot from '../assets/images/nick-headshot.png';
---

<section class="hero min-h-screen bg-gradient-to-br from-white via-cyan-50 to-lime-50">
  <div class="hero-content max-w-7xl py-20">
    <div class="text-center space-y-12 w-full">
      
      <!-- Top Badges/Stickers - using DaisyUI badge component -->
      <div class="flex justify-center flex-wrap gap-4">
        <div class="badge badge-lg badge-success rotate-sticker-1">
          ⚡ FULL-STACK PM
        </div>
        <div class="badge badge-lg badge-info rotate-sticker-2">
          🤖 AI ENGINEER
        </div>
        <div class="badge badge-lg badge-warning rotate-sticker-3">
          ⚙️ AUTOMATION
        </div>
      </div>
      
      <!-- Main Content Flex Container -->
      <div class="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        <!-- Name/Title (left on desktop, top on mobile) -->
        <div class="order-2 lg:order-1">
          <h1 class="text-7xl md:text-9xl font-black leading-none">
            NICK
            <br>
            <span class="inline-block bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-2 border-[4px] border-black shadow-brutal -rotate-2">
              ROTH
            </span>
          </h1>
        </div>
        
        <!-- Avatar with Stickers (right on desktop, top on mobile) -->
        <div class="order-1 lg:order-2 relative">
          
          <!-- Floating decoration shapes (CSS animated) -->
          <div class="absolute -inset-8 pointer-events-none" aria-hidden="true">
            <div class="absolute top-0 left-0 w-20 h-20 bg-fuchsia-500 border-[4px] border-black shadow-brutal-sm opacity-70 animate-spin-slow"></div>
            <div class="absolute bottom-4 right-4 w-16 h-16 bg-cyan-400 rounded-full border-[4px] border-black shadow-brutal opacity-70 animate-bounce-slow"></div>
            <div class="absolute top-1/2 right-0 w-12 h-24 bg-yellow-300 border-[4px] border-black shadow-brutal-sm opacity-70 rotate-45 animate-sway"></div>
          </div>
          
          <!-- Main Avatar Card -->
          <div class="card bg-gradient-to-br from-cyan-400 via-lime-400 to-yellow-300 p-3 rotate-2 shadow-brutal-xl">
            <div class="avatar">
              <div class="w-72 md:w-96 bg-white border-[4px] border-black -rotate-1">
                <img src={headshot.src} alt="Nick Roth" class="border-[3px] border-black" />
              </div>
            </div>
          </div>
          
          <!-- Positioned sticker badges -->
          <span class="badge badge-lg bg-fuchsia-500 text-white absolute -top-8 -right-8 rotate-sticker-4">
            PRODUCT
          </span>
          <span class="badge badge-lg badge-warning absolute -bottom-8 -left-8 -rotate-12">
            ENGINEER
          </span>
          <span class="badge badge-success absolute top-1/2 -right-12 rotate-90">
            AI
          </span>
          <span class="badge bg-black text-white absolute -top-6 left-12 -rotate-6 font-mono">
            GT MS
          </span>
        </div>
      </div>
      
      <!-- Value Proposition Box -->
      <div class="max-w-4xl mx-auto relative">
        <div class="card bg-base-100 p-8 -rotate-1 shadow-brutal relative z-10">
          <p class="text-2xl md:text-3xl font-black leading-relaxed">
            I turn business objectives into 
            <span class="font-mono bg-lime-200 px-2 border border-black">shippable systems</span>
            — model the business, specify precisely, and build only what moves the needle.
          </p>
        </div>
        
        <!-- Decorative shapes around value prop -->
        <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 border-[4px] border-black shadow-brutal rotate-12" aria-hidden="true"></div>
        <div class="absolute -bottom-6 -left-6 w-16 h-24 bg-gradient-to-t from-fuchsia-400 to-pink-500 border-[4px] border-black shadow-brutal-sm -rotate-6" aria-hidden="true"></div>
      </div>
      
      <!-- CTA Buttons - using DaisyUI btn classes -->
      <div class="flex flex-col items-center gap-6">
        <div class="flex flex-col sm:flex-row gap-6">
          <a href="/work" class="btn btn-primary btn-lg">
            VIEW MY WORK
          </a>
          <a href="/contact" class="btn btn-outline btn-lg">
            LET'S TALK
          </a>
        </div>
        
        <!-- Scroll indicator -->
        <div class="animate-bounce mt-4">
          <a href="#about" class="btn btn-square btn-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
      
    </div>
  </div>
</section>
```

#### 2.2 Key DaisyUI Components Used
- **hero**: Base layout structure
- **hero-content**: Content container with responsive padding
- **badge**: Sticker-style labels (customized with rotations)
- **card**: Avatar container and value proposition box
- **avatar**: Profile image wrapper
- **btn**: Call-to-action buttons with brutalist treatment

### Phase 3: Reusable Component Patterns

These components use **standard DaisyUI class names** - no custom variants needed. The neobrutalism styling comes from the global CSS overrides.

#### 3.1 Sticker/Badge Component Pattern
Uses standard DaisyUI badge classes with optional rotation utility:

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'neutral';
  rotation?: 1 | 2 | 3 | 4;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

const { 
  variant = 'primary', 
  rotation, 
  size = 'md',
  class: className = '' 
} = Astro.props;

// Build class list using standard DaisyUI classes
const classes = [
  'badge',
  `badge-${variant}`,
  `badge-${size}`,
  rotation && `rotate-sticker-${rotation}`,
  className
].filter(Boolean).join(' ');
---

<span class={classes}>
  <slot />
</span>
```

**Usage:**
```astro
<!-- Automatic neobrutalism styling via global overrides -->
<StickerBadge variant="success" rotation={1} size="lg">
  ⚡ FULL-STACK PM
</StickerBadge>
```

#### 3.2 Brutalist Card Component Pattern
Uses standard DaisyUI card class with optional custom rotation:

```astro
---
interface Props {
  rotation?: number;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

const { 
  rotation = 0, 
  shadow = 'md', 
  class: className = '' 
} = Astro.props;

// Standard card class gets brutalist styling from global CSS
const classes = ['card', `shadow-brutal-${shadow}`, className].filter(Boolean).join(' ');
const style = rotation !== 0 ? `transform: rotate(${rotation}deg);` : undefined;
---

<div class={classes} style={style}>
  <slot />
</div>
```

**Usage:**
```astro
<!-- Card automatically has thick borders and hard shadows -->
<BrutalistCard rotation={-2} shadow="xl">
  <div class="card-body">
    <h2 class="card-title">Project Name</h2>
    <p>Project description...</p>
  </div>
</BrutalistCard>
```

#### 3.3 Why This Approach Works

**No JS Libraries Needed**: Simple string concatenation in Astro components compiles to static HTML with CSS classes. No runtime overhead from tailwind-variants or similar libraries.

**Framework Agnostic**: These patterns work identically in:
- Plain HTML: `<span class="badge badge-primary badge-lg rotate-sticker-1">Text</span>`
- React: `<span className="badge badge-primary badge-lg rotate-sticker-1">Text</span>`
- Vue: `<span class="badge badge-primary badge-lg rotate-sticker-1">Text</span>`
- Svelte: `<span class="badge badge-primary badge-lg rotate-sticker-1">Text</span>`

**Performance**: All styling is pure CSS, compiled at build time. Zero JavaScript needed for visual presentation.

### Phase 4: Performance Considerations

#### 4.1 CSS-Only Animations
All animations use pure CSS (no JS) for optimal performance:
- `animate-spin-slow`: 8s rotation for floating shapes
- `animate-bounce-slow`: 3s bounce for emphasis
- `animate-sway`: 4s side-to-side for playful movement
- Native `animate-bounce`: For scroll indicator

#### 4.2 Image Optimization
```astro
---
import { Image } from 'astro:assets';
import headshot from '../assets/images/nick-headshot.png';
---

<Image 
  src={headshot} 
  alt="Nick Roth"
  width={384}
  height={384}
  format="webp"
  quality={85}
  loading="eager"
  class="border-[3px] border-black"
/>
```

### Phase 5: Accessibility

#### 5.1 ARIA Labels
- Decorative shapes marked with `aria-hidden="true"`
- Semantic HTML structure maintained
- Screen reader text for icon-only buttons
- Focus states maintained on interactive elements

#### 5.2 Focus Styles
```css
@layer components {
  /* Enhanced focus for neobrutalism theme */
  .btn:focus-visible,
  .card:focus-visible {
    @apply outline outline-4 outline-black outline-offset-2;
  }
}
```

### Phase 6: Dark Mode Considerations

While the neobrutalism aesthetic typically uses bright colors on light backgrounds, we can support dark mode by:

```javascript
// In tailwind.config.mjs
{
  neobrutalism: {
    // ... light theme colors
  },
  "neobrutalism-dark": {
    "primary": "#22d3ee",        // Keep bright colors
    "secondary": "#bef264",      
    "accent": "#fde047",         
    "neutral": "#ffffff",        // White borders on dark
    "base-100": "#0f172a",       // Dark slate background
    "base-200": "#1e293b",       
    "base-300": "#334155",       
    // Maintain high contrast
  }
}
```

## Implementation Checklist

### Phase 1: Configuration
- [ ] Update `tailwind.config.mjs` with neobrutalism theme
- [ ] Add custom CSS utilities to `global.css`
- [ ] Override DaisyUI component styles for brutalist aesthetic

### Phase 2: Hero Component
- [ ] Replace existing Hero.astro with neobrutalism version
- [ ] Use nick-headshot.png from assets
- [ ] Apply DaisyUI hero, badge, card, avatar components
- [ ] Add CSS-only animations

### Phase 3: Reusable Patterns
- [ ] Create StickerBadge component
- [ ] Create BrutalistCard component
- [ ] Document pattern usage

### Phase 4: Testing
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Verify animation performance
- [ ] Check color contrast ratios
- [ ] Test keyboard navigation
- [ ] Validate with screen reader

### Phase 5: Documentation
- [ ] Document custom utility classes
- [ ] Create component usage examples
- [ ] Add design system notes

## Benefits of This Approach

### 1. **KISS (Keep It Simple, Stupid)**
- Leverages DaisyUI's existing component structure and class names
- No custom class variants to remember (use `btn`, not `btn-brutal`)
- CSS-based customization over JavaScript libraries
- Standard DaisyUI documentation remains applicable

### 2. **DRY (Don't Repeat Yourself)**
- Theme configuration in one place (`tailwind.config.mjs` + `global.css`)
- Global CSS overrides apply everywhere automatically
- Reusable utility classes for common patterns (rotations, shadows)
- Component patterns use simple string composition

### 3. **Performance (Zero JS Required)**
- **Pure CSS animations** - GPU accelerated, no JavaScript runtime
- **No class composition libraries** - No tailwind-variants, clsx, or similar packages
- **Static class strings** - Compiled at build time by Astro/Tailwind
- **Optimal bundle size** - Only CSS, no additional JS dependencies
- **Instant page loads** - No hydration needed for styling

### 4. **Framework Agnostic / Portability**
- Works in any HTML-based framework (React, Vue, Svelte, vanilla)
- Easy to copy theme to other projects - just move config files
- No framework-specific styling libraries
- Standard class names mean easier team onboarding

### 5. **Maintainability**
- DaisyUI updates won't break custom theme (we override, don't replace)
- Clear separation: theme colors in config, visual style in CSS
- Well-documented patterns with standard DaisyUI terminology
- Easy to toggle neobrutalism on/off (swap theme config)

### 6. **Accessibility**
- Semantic HTML maintained
- Keyboard navigation preserved (DaisyUI's focus states still work)
- Screen reader compatible (no custom behavior, just visual changes)
- Color contrast maintained with black borders and vibrant colors

### 7. **Developer Experience**
- Use standard DaisyUI class names everyone knows
- TypeScript types from DaisyUI work out of the box
- No need to learn custom variant API
- Simple props-to-classes mapping in components

## Why Not tailwind-variants?

### When tailwind-variants Makes Sense:
- ✅ Complex client-side React/Vue components with many state permutations
- ✅ Need TypeScript autocompletion for variant combinations
- ✅ Building a design system with compound variants (size × color × state)

### Why We Don't Need It Here:
- ❌ **Adds JavaScript dependency** - Goes against zero-JS goal
- ❌ **Runtime overhead** - Class composition happens in browser
- ❌ **Framework coupling** - Ties styling to component library
- ❌ **Unnecessary complexity** - DaisyUI already provides variants (btn-primary, btn-lg)
- ❌ **Breaks portability** - Can't easily copy styles to vanilla HTML projects

### Our Approach is Better Because:
```astro
<!-- With tailwind-variants (requires JS) -->
<script>
import { tv } from 'tailwind-variants';
const button = tv({ base: 'btn', variants: {...} });
</script>
<button class={button({ color: 'primary', size: 'lg' })}>Click</button>

<!-- Our approach (pure CSS, no JS) -->
<button class="btn btn-primary btn-lg">Click</button>
```

The neobrutalism styling applies automatically via global CSS overrides. No JavaScript libraries needed!

## Next Steps

1. **Start with Phase 1** - Update theme configuration and global CSS overrides
2. **Implement Hero component** - Use as proof of concept with real headshot
3. **Test responsive behavior** - Verify mobile, tablet, desktop layouts
4. **Extend to other sections** - Apply same patterns to Work cards, Capability cards, etc.
5. **Document utility classes** - Add usage examples for team reference

## Portability Guide

To use this neobrutalism theme in another project:

1. Copy `tailwind.config.mjs` theme configuration
2. Copy `src/styles/global.css` component overrides
3. That's it! All DaisyUI components now have neobrutalism styling

No component libraries, no JavaScript packages, no framework-specific code to migrate.
