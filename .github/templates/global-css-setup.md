# Template: Global CSS Setup

Use this template for tasks that establish global CSS foundation (P0-001, or adding major new utilities).

## Checklist

### 1. Override DaisyUI Components
- [ ] Override `.btn` with border, shadow, hover effect
- [ ] Override `.card` with border, shadow
- [ ] Override `.badge` with border, compact styling
- [ ] Override `.input` with border, focus shadow
- [ ] Override `.select` with border, focus shadow
- [ ] Override `.textarea` with border, focus shadow
- [ ] Test each override in isolation

### 2. Add Shadow Utilities
- [ ] `.shadow-brutal-sm` (4px 4px)
- [ ] `.shadow-brutal` (8px 8px)
- [ ] `.shadow-brutal-lg` (12px 12px)
- [ ] `.shadow-brutal-xl` (20px 20px)
- [ ] Test shadows on different backgrounds

### 3. Add Rotation Utilities
- [ ] `.rotate-sticker-1` (-8deg)
- [ ] `.rotate-sticker-2` (5deg)
- [ ] `.rotate-sticker-3` (-3deg)
- [ ] `.rotate-sticker-4` (12deg)
- [ ] Test rotations on cards and badges

### 4. Add Sticker Positioning Utilities
- [ ] `.sticker-container` (relative, inline-block)
- [ ] `.sticker` (absolute, z-20, pointer-events-none)
- [ ] `.sticker-top-left` (translate -50%, -50%)
- [ ] `.sticker-top-right` (translate 50%, -50%)
- [ ] `.sticker-bottom-left` (translate -50%, 50%)
- [ ] `.sticker-bottom-right` (translate 50%, 50%)
- [ ] Test positioning with various badges

### 5. Add Hover Effect Utilities
- [ ] `.hover-lift` (translate on hover, shadow change)
- [ ] `.hover-scale` (scale(1.05) on hover)
- [ ] `.hover-rotate` (rotate(5deg) on hover)
- [ ] Test hover effects on buttons and cards

### 6. Add Scroll Animation Utilities
- [ ] `.fade-in-up` (opacity 0 → 1, translateY 20px → 0)
- [ ] `.slide-in-left` (opacity 0 → 1, translateX -20px → 0)
- [ ] `.slide-in-right` (opacity 0 → 1, translateX 20px → 0)
- [ ] Create `src/scripts/animations.js` with Intersection Observer
- [ ] Test scroll animations on various elements

### 7. Test Global Styles
- [ ] Apply to existing buttons - verify border, shadow, hover
- [ ] Apply to existing cards - verify styling
- [ ] Apply animations to test page elements
- [ ] Verify responsive behavior
- [ ] Check browser compatibility (Chrome, Safari, Firefox)

## Code Template

```css
/* src/styles/global.css */
@import "tailwindcss";
@plugin "daisyui";

@layer components {
  /* Button overrides */
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
  
  /* Card overrides */
  .card {
    @apply border-[4px] border-black;
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  }
  
  /* Badge overrides */
  .badge {
    @apply border-[2px] border-black font-bold uppercase text-xs;
    padding: 0.25rem 0.75rem;
  }
  
  /* Input overrides */
  .input,
  .select,
  .textarea {
    @apply border-[3px] border-black;
    transition: all 0.2s ease-in-out;
  }
  
  .input:focus,
  .select:focus,
  .textarea:focus {
    @apply outline-none ring-0;
    box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
  }
}

@layer utilities {
  /* Shadow utilities */
  .shadow-brutal-sm  { box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1); }
  .shadow-brutal     { box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1); }
  .shadow-brutal-lg  { box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1); }
  .shadow-brutal-xl  { box-shadow: 20px 20px 0px 0px rgba(0, 0, 0, 1); }
  
  /* Rotation utilities */
  .rotate-sticker-1 { transform: rotate(-8deg); }
  .rotate-sticker-2 { transform: rotate(5deg); }
  .rotate-sticker-3 { transform: rotate(-3deg); }
  .rotate-sticker-4 { transform: rotate(12deg); }
  
  /* Sticker positioning */
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
  
  /* Hover effects */
  .hover-lift {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  
  .hover-lift:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 1);
  }
  
  .hover-scale {
    transition: transform 0.2s ease-in-out;
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
  }
  
  .hover-rotate {
    transition: transform 0.3s ease-in-out;
  }
  
  .hover-rotate:hover {
    transform: rotate(5deg);
  }
  
  /* Scroll animations */
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
  
  .slide-in-right {
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }
  
  .slide-in-right.visible {
    opacity: 1;
    transform: translateX(0);
  }
}
```

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
  const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
  animatedElements.forEach(el => observer.observe(el));
});
```

## Acceptance Test

```astro
---
// Create test page: src/pages/test-styles.astro
---
<html>
<head>
  <title>Style Test</title>
</head>
<body class="p-8">
  <h1>DaisyUI Override Test</h1>
  
  <section class="mb-8">
    <h2>Buttons</h2>
    <button class="btn btn-primary">Primary Button</button>
    <button class="btn btn-secondary">Secondary Button</button>
  </section>
  
  <section class="mb-8">
    <h2>Cards</h2>
    <div class="card w-96">
      <div class="card-body">
        <h2 class="card-title">Test Card</h2>
        <p>Card with neobrutalism styling</p>
      </div>
    </div>
  </section>
  
  <section class="mb-8">
    <h2>Shadows</h2>
    <div class="shadow-brutal-sm bg-white p-4 inline-block">Small Shadow</div>
    <div class="shadow-brutal bg-white p-4 inline-block">Medium Shadow</div>
    <div class="shadow-brutal-lg bg-white p-4 inline-block">Large Shadow</div>
  </section>
  
  <section class="mb-8">
    <h2>Rotations</h2>
    <div class="badge badge-primary rotate-sticker-1">Rotation 1</div>
    <div class="badge badge-secondary rotate-sticker-2">Rotation 2</div>
  </section>
  
  <section class="mb-8">
    <h2>Sticker Positioning</h2>
    <div class="sticker-container">
      <div class="card w-64 h-64 bg-base-200"></div>
      <div class="sticker sticker-top-left badge badge-success">Top Left</div>
      <div class="sticker sticker-top-right badge badge-info">Top Right</div>
    </div>
  </section>
  
  <section class="mb-8">
    <h2>Scroll Animations</h2>
    <div class="fade-in-up">Fades in on scroll</div>
    <div class="slide-in-left">Slides in from left</div>
  </section>
  
  <script src="/src/scripts/animations.js"></script>
</body>
</html>
```

Visit `/test-styles` to verify all styles work correctly.
