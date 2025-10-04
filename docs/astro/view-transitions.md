# Astro View Transitions

This guide explains how to enable and control Astro's view transitions to create smooth page-to-page animations, including a shared-image effect for blog posts.

## Why view transitions?

Astro uses the browser's View Transitions API (currently supported in Chromium-based browsers) to animate between pages. When you opt into Astro's `<ClientRouter />`, you also get:

- Automatic element matching across pages for default crossfade animations.
- Control directives to name elements, override animations, or persist state.
- Lifecycle events to tap into navigation for loaders, theming, or analytics hooks.

Browsers without native support fall back to non-animated swaps or full reloads based on your configuration.

## Prerequisites

- Astro 3.6+ (transition lifecycle events) and ideally Astro 4.5+ for the latest directives (`transition:persist-props`).
- Pages rendered through a shared layout where you can mount `<ClientRouter />`.
- Content that renders the same DOM element (or a matching component) on both the source and destination pages when you want a shared-element effect.

## Enable the Client Router

Place `<ClientRouter />` in a shared head component or top-level layout to turn on SPA-style routing and default view transitions.

```astro
---
import { ClientRouter } from "astro:transitions";
---
<html lang="en">
  <head>
    <ClientRouter fallback="animate" />
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- `fallback="animate"` (default) simulates transitions in unsupported browsers. Use `swap` for instant replacement or `none` for full reloads.
- Astro's router automatically honors `prefers-reduced-motion` and announces new route titles for screen readers.

## Transition directives

Apply these directives on matching elements to control behavior:

| Directive | Purpose |
| --- | --- |
| `transition:name` | Explicitly matches two elements across pages. Use the same string once per page. |
| `transition:animate` | Replaces the default crossfade with built-in (`fade`, `slide`, `none`, `initial`) or custom animations. |
| `transition:persist` | Keeps an element or island alive during navigation instead of re-rendering it. |
| `transition:persist-props` | Prevents re-rendering persisted islands with new props (Astro 4.5+). |

### Customizing animations

Import helpers like `fade` or `slide` from `astro:transitions` to tweak duration or easing, or define full custom animations with keyframes.

```astro
---
import { fade } from "astro:transitions";
const heroAnim = fade({ duration: "450ms", easing: "ease-out" });
---
<img transition:animate={heroAnim} ... />
```

For bespoke motion, create keyframes in a global stylesheet and supply forward/backward pairs using the `TransitionDirectionalAnimations` shape described in the Astro docs.

## Shared image expansion pattern

To animate a blog card thumbnail expanding into the hero image on the article page:

1. Render the site list and article pages within the layout that includes `<ClientRouter />`.
2. Give the card image and hero image the same `transition:name`, ideally derived from the post slug.
3. Optionally add a tailored `transition:animate` to control easing/duration.

```astro
---
// src/pages/blog/index.astro
const posts = await getCollection("work");
---
<ul class="post-grid">
  {posts.map((post) => (
    <li>
      <a href={`/work/${post.slug}`}>
        <img
          src={post.data.hero}
          alt={post.data.title}
          transition:name={`hero-${post.slug}`}
          transition:animate="fade"
        />
        <h2>{post.data.title}</h2>
      </a>
    </li>
  ))}
</ul>
```

```astro
---
// src/pages/work/[slug].astro
import { fade } from "astro:transitions";
const { slug } = Astro.params;
const entry = await getEntry("work", slug);
const heroAnim = fade({ duration: "450ms", easing: "ease-out" });
---
<article>
  <img
    src={entry.data.hero}
    alt={entry.data.title}
    transition:name={`hero-${slug}`}
    transition:animate={heroAnim}
  />
  <h1>{entry.data.title}</h1>
  <Content />
</article>
```

Astro will match the elements by name and animate geometry, opacity, and clip paths seamlessly, provided the element exists on both pages.

## Lifecycle hooks

Use document-level events emitted by `<ClientRouter />` to wire up loaders or maintain global state:

- `astro:before-preparation`: navigation just started—start loading indicators.
- `astro:after-preparation`: DOM for the next page is ready—stop skeletons.
- `astro:before-swap`: adjust the incoming document before it replaces the current DOM (e.g., sync theme).
- `astro:after-swap`: DOM swapped, scroll restored—great for custom scroll behavior.
- `astro:page-load`: page visible and scripts loaded—reinitialize inline scripts or analytics.

```js
// src/scripts/theme.js
document.addEventListener("astro:before-swap", (event) => {
  event.newDocument.documentElement.dataset.theme =
    localStorage.getItem("color-scheme") || "light";
});
```

## Troubleshooting checklist

- Verify both pages render the element you expect to animate; Astro can't transition elements that disappear.
- If animations don’t fire, ensure links aren't marked with `data-astro-reload`, which forces full page navigations.
- Disable transitions temporarily (e.g., `transition:animate="none"`) to debug layout shifts.
- Use Chromium DevTools (Rendering panel → View Transition) to inspect captured layers.


### Fixing smooth scroll conflicts

When navigating from a list page (scrolled down) to a detail page and back, CSS `scroll-behavior: smooth` can conflict with view transitions. The slow scroll animation prevents users from seeing the transition effect.

**Solution**: Remove CSS smooth scroll entirely and enable it only for anchor links (within-page navigation):

```css
/* In global.css - remove or comment out smooth scroll */
html {
  /* scroll-behavior: smooth; */  /* Removed to avoid conflicts */
}
```

```js
// In your base layout script - enable smooth scroll only for anchor links
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const link = target.closest("a");
  
  if (!link) return;
  
  const href = link.getAttribute("href");
  
  // Only apply smooth scroll for anchor links (within-page navigation)
  if (href && href.startsWith("#")) {
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      targetElement.scrollIntoView({ 
        behavior: prefersReducedMotion ? "auto" : "smooth" 
      });
      
      history.pushState(null, "", href);
    }
  }
});
```

This approach ensures smooth scrolling is only active for within-page navigation (anchor links), not for page-to-page navigation where it conflicts with view transitions.

## References

- [Astro docs: View transitions](https://docs.astro.build/en/guides/view-transitions/)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Astro blog: Future of zero-JS view transitions](https://astro.build/blog/future-of-astro-zero-js-view-transitions/)
