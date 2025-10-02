# DaisyUI Component Development - Reference Material

This document contains detailed reference material extracted from the buildComponent workflow. **Read the workflow first**, then consult these sections as needed.

## Table of Contents
1. [Content-Component Separation Patterns](#content-component-separation-patterns)
2. [Visual Design Specifications](#visual-design-specifications)
3. [CSS Override Examples](#css-override-examples)
4. [Animation Patterns](#animation-patterns)
5. [Component Interface Patterns](#component-interface-patterns)

---

## Content-Component Separation Patterns

### Why Content Separation?
Preparing for future CMS migration. Content must be editable without touching component code.

### Content Storage Locations

#### 1. Astro Content Collections (`src/content/`)
Best for: Blog posts, projects, case studies, structured content with frontmatter

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const heroCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    badges: z.array(z.object({
      icon: z.string(),
      label: z.string(),
      variant: z.enum(['primary', 'secondary', 'success', 'info'])
    })),
    cta: z.object({
      primary: z.object({ text: z.string(), href: z.string() }),
      secondary: z.object({ text: z.string(), href: z.string() })
    })
  })
});

export const collections = { hero: heroCollection };
```

```astro
<!-- Usage in page -->
---
import { getEntry } from 'astro:content';
const hero = await getEntry('hero', 'home');
const { badges } = hero.data;
---
{badges.map(badge => (
  <StickerBadge variant={badge.variant}>
    {badge.icon} {badge.label}
  </StickerBadge>
))}
```

#### 2. Data Files (`src/data/`)
Best for: Configuration, navigation menus, lists, arrays

```typescript
// src/data/navigation.ts
export const mainNav = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

// src/data/hero.ts
export const heroBadges = [
  { icon: '⚡', label: 'FULL-STACK PM', variant: 'success' },
  { icon: '🤖', label: 'AI ENGINEER', variant: 'info' }
];
```

```astro
<!-- Usage in component -->
---
import { heroBadges } from '@/data/hero';
---
{heroBadges.map(badge => (
  <StickerBadge variant={badge.variant}>
    {badge.icon} {badge.label}
  </StickerBadge>
))}
```

#### 3. Component Props/Slots
Best for: Dynamic data passed from pages

```astro
---
// Component definition
interface Props {
  badges: Array<{
    icon: string;
    label: string;
    variant: 'primary' | 'secondary' | 'success' | 'info';
  }>;
}

const { badges } = Astro.props;
---
{badges.map(badge => (
  <StickerBadge variant={badge.variant}>
    {badge.icon} {badge.label}
  </StickerBadge>
))}
```

### Anti-Patterns (Never Do This)

```astro
<!-- ❌ WRONG: Content hard-coded in component -->
<StickerBadge variant="success">⚡ FULL-STACK PM</StickerBadge>
<StickerBadge variant="info">🤖 AI ENGINEER</StickerBadge>

<!-- ❌ WRONG: Content array in component file -->
---
const badges = [
  { icon: '⚡', label: 'FULL-STACK PM' },
  { icon: '🤖', label: 'AI ENGINEER' }
];
---
```

### CMS Migration Checklist
- [ ] TypeScript interfaces for all content shapes
- [ ] Flat data structures (avoid deep nesting)
- [ ] Asset references use paths/URLs, not inline data
- [ ] SEO/meta separate from content
- [ ] Content blocks map 1:1 to components

---

## Visual Design Specifications

### Neobrutalism Aesthetic

#### Borders
- **Minimum**: 2px
- **Typical**: 4px (most components)
- **Emphasis**: 6px (CTAs, hero elements)
- **Color**: Always black (#000000)

#### Shadows (Hard Drop Shadows)
```css
/* No blur! Always 0px for blur radius */
box-shadow: Xpx Ypx 0px 0px rgba(0, 0, 0, 1);

/* Size scale */
.shadow-brutal-sm  { box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1); }
.shadow-brutal     { box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); }
.shadow-brutal-lg  { box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1); }
.shadow-brutal-xl  { box-shadow: 20px 20px 0px 0px rgba(0, 0, 0, 1); }
```

#### Rotations
```css
/* Sticker aesthetic - playful angles */
.rotate-sticker-1 { transform: rotate(-8deg); }
.rotate-sticker-2 { transform: rotate(5deg); }
.rotate-sticker-3 { transform: rotate(-3deg); }
.rotate-sticker-4 { transform: rotate(12deg); }

/* Usage guidelines */
/* Subtle: -3deg to 2deg for slight playfulness */
/* Dramatic: up to 12deg for emphasis */
```

#### Colors
**Base Colors**:
- Black: `#000000` (borders, text)
- White: `#ffffff` (backgrounds)

**Vibrant Accents**:
- Cyan: `#22d3ee` (primary actions)
- Lime: `#bef264` (success, positive)
- Yellow: `#fde047` (warnings, highlights)
- Fuchsia: `#e879f9` (secondary actions)
- Orange: `#fb923c` (energy, call-outs)

#### Typography
```css
/* Display Text (headings, hero) */
font-family: 'Space Grotesk', sans-serif;
font-weight: 700-900;

/* Body Text (paragraphs, UI) */
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 400-600;

/* Code/Monospace */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Spacing Scale (4px base unit)
```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px
```

Use Tailwind utilities:
- `gap-1` (4px), `gap-2` (8px), `gap-3` (12px), `gap-4` (16px)
- `p-1`, `p-2`, `p-3`, `p-4`, `p-6`, `p-8`, `p-12`, `p-16`

---

## CSS Override Examples

### DaisyUI Component Overrides

```css
/* src/styles/global.css */
@layer components {
  /* Button - Primary neobrutalism styling */
  .btn {
    @apply border-[4px] border-black font-black uppercase tracking-wide;
    box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
    transition: all 0.2s ease-in-out;
  }
  
  .btn:hover {
    @apply translate-x-1 translate-y-1;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 1);
  }
  
  .btn:active {
    @apply translate-x-2 translate-y-2;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Card - Border and shadow */
  .card {
    @apply border-[4px] border-black;
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Badge - Compact with border */
  .badge {
    @apply border-[2px] border-black font-bold uppercase text-xs;
    padding: 0.25rem 0.75rem;
  }
  
  /* Input - Match button styling */
  .input {
    @apply border-[3px] border-black;
    transition: all 0.2s ease-in-out;
  }
  
  .input:focus {
    @apply outline-none ring-0;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
  }
}
```

### Utility Class Additions

```css
@layer utilities {
  /* Shadows */
  .shadow-brutal-sm  { box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1); }
  .shadow-brutal     { box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); }
  .shadow-brutal-lg  { box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1); }
  .shadow-brutal-xl  { box-shadow: 20px 20px 0px 0px rgba(0, 0, 0, 1); }
  
  /* Rotations */
  .rotate-sticker-1 { transform: rotate(-8deg); }
  .rotate-sticker-2 { transform: rotate(5deg); }
  .rotate-sticker-3 { transform: rotate(-3deg); }
  .rotate-sticker-4 { transform: rotate(12deg); }
  
  /* Hover Effects */
  .hover-lift {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  
  .hover-lift:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Sticker Positioning */
  .sticker-container {
    position: relative;
    display: inline-block;
  }
  
  .sticker {
    position: absolute;
    z-index: 20;
    pointer-events: none;
  }
  
  .sticker-top-left {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }
  
  .sticker-top-right {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
  
  .sticker-bottom-left {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }
  
  .sticker-bottom-right {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }
}
```

---

## Animation Patterns

### CSS-Only Animations (Preferred)

```css
/* Keyframe definitions */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Utility classes */
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out;
}

.animate-slide-in-left {
  animation: slide-in-left 0.5s ease-out;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
```

### Scroll Animations (Intersection Observer + CSS)

```javascript
// src/scripts/animations.js
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);
  
  // Observe all elements with scroll animation classes
  document.querySelectorAll('.fade-in-up, .slide-in-left').forEach(el => {
    observer.observe(el);
  });
});
```

```css
/* Scroll animation setup */
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.slide-in-left.visible {
  opacity: 1;
  transform: translateX(0);
}
```

```astro
<!-- Usage in components -->
<div class="fade-in-up">This fades in on scroll</div>
<div class="slide-in-left">This slides in on scroll</div>

<!-- Add script to layout -->
<script src="/src/scripts/animations.js"></script>
```

### Hover Effects (CSS Transitions)

```css
/* Hover lift effect */
.hover-lift {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translate(-2px, -2px);
}

/* Hover scale effect */
.hover-scale {
  transition: transform 0.2s ease-in-out;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* Hover rotate effect */
.hover-rotate {
  transition: transform 0.3s ease-in-out;
}

.hover-rotate:hover {
  transform: rotate(5deg);
}
```

---

## Component Interface Patterns

### Base Component Interface

```typescript
interface Props {
  // Visual variants
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Styling options
  rotation?: 1 | 2 | 3 | 4;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  
  // HTML attributes
  class?: string;
  id?: string;
  
  // Component-specific props
  // ... add as needed
}
```

### Button Component Example

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  outline = false,
  href,
  type = 'button',
  disabled = false,
  class: className = ''
} = Astro.props;

// Simple string composition (no libraries!)
const classes = [
  'btn',
  `btn-${variant}`,
  `btn-${size}`,
  outline && 'btn-outline',
  className
].filter(Boolean).join(' ');

const Component = href ? 'a' : 'button';
---

<Component
  class={classes}
  href={href}
  type={!href ? type : undefined}
  disabled={disabled}
>
  <slot />
</Component>
```

### Card Component Example

```astro
---
interface Props {
  rotation?: 1 | 2 | 3 | 4;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  imageUrl?: string;
  imageAlt?: string;
  class?: string;
}

const {
  rotation,
  shadow = 'md',
  imageUrl,
  imageAlt = '',
  class: className = ''
} = Astro.props;

const classes = [
  'card',
  rotation && `rotate-sticker-${rotation}`,
  `shadow-brutal-${shadow}`,
  className
].filter(Boolean).join(' ');
---

<div class={classes}>
  {imageUrl && (
    <figure>
      <img src={imageUrl} alt={imageAlt} />
    </figure>
  )}
  <div class="card-body">
    <slot />
  </div>
</div>
```

### Badge Component Example

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rotation?: 1 | 2 | 3 | 4;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  rotation,
  class: className = ''
} = Astro.props;

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

---

## Quick Reference

### Decision Trees

**When to use Content Collections vs Data Files?**
- Collections: Structured content with frontmatter (blog posts, projects)
- Data Files: Configuration, lists, arrays, navigation

**When to use CSS animations vs JavaScript?**
- CSS: Hover, focus, active states, simple transitions
- JS: Scroll detection, complex sequencing, interactive state

**When to create a new component vs extend existing?**
- New: Fundamentally different purpose or structure
- Extend: Same structure, different styling/variants

### Common Mistakes
1. ❌ Hard-coding content in components
2. ❌ Using JavaScript styling libraries (clsx, tailwind-variants)
3. ❌ Creating custom class names instead of overriding DaisyUI
4. ❌ Adding blur to shadows (neobrutalism = hard shadows only)
5. ❌ Building all components before using them

### Quality Checklist
- [ ] Component uses standard DaisyUI classes
- [ ] No hard-coded content (except UI labels)
- [ ] TypeScript interface defined
- [ ] Showcase page created with all variants
- [ ] Integrated into personal site
- [ ] Acceptance test passes
- [ ] Responsive design works
