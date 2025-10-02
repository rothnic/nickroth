# Example Styling

This style block was pulled from a vibe coding figma made project. This is for reference only and should not be copied directly. Instead, we should incorporate the design into the daisyui so we start from a solid base and do not have to reimplmenent a design system from scratch.

```
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Rubik+Glitch&display=swap');

@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/**
 * Base typography. This is not applied to elements which have an ancestor with a Tailwind text class.
 */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h4 {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }

    label {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    input {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}

html {
  font-size: var(--font-size);
}

/* Custom font families */
.font-display {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
}

.font-mono {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
}

.font-glitch {
  font-family: 'Rubik Glitch', cursive;
}

/* Glitch effect */
@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  10% { transform: translate(-2px, -2px); }
  20% { transform: translate(2px, 2px); }
  30% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  50% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  70% { transform: translate(-2px, 2px); }
  80% { transform: translate(2px, -2px); }
  90% { transform: translate(-2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  10% { transform: translate(2px, 2px); }
  20% { transform: translate(-2px, -2px); }
  30% { transform: translate(2px, -2px); }
  40% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  70% { transform: translate(2px, -2px); }
  80% { transform: translate(-2px, 2px); }
  90% { transform: translate(2px, 2px); }
}

.glitch-effect {
  position: relative;
  z-index: 1;
}

.glitch-effect:before,
.glitch-effect:after {
  content: var(--glitch-text, attr(data-text));
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
}

.glitch-effect:hover:before {
  animation: glitch-1 0.3s infinite;
  color: #ff0080;
  opacity: 0.7;
  z-index: -1;
}

.glitch-effect:hover:after {
  animation: glitch-2 0.3s infinite;
  color: #00ffff;
  opacity: 0.7;
  z-index: -2;
}

/* Texture overlay */
.texture-grain {
  position: relative;
}

.texture-grain:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
  pointer-events: none;
}

/* Sticker style elements */
.sticker {
  position: relative;
  transform: rotate(-3deg);
}

.sticker:nth-child(even) {
  transform: rotate(2deg);
}

.sticker:before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: inherit;
  z-index: -1;
}

/* Organic shapes using clip-path */
.organic-top {
  clip-path: polygon(0 85%, 25% 95%, 50% 90%, 75% 95%, 100% 85%, 100% 0, 0 0);
}

.organic-bottom {
  clip-path: polygon(0 0, 100% 0, 100% 15%, 75% 5%, 50% 10%, 25% 5%, 0 15%);
}

.organic-both {
  clip-path: polygon(0 15%, 25% 5%, 50% 10%, 75% 5%, 100% 15%, 100% 85%, 75% 95%, 50% 90%, 25% 95%, 0 85%);
}

/* Timeline Fluid Layout System */
:root {
  --timeline-gap: clamp(1rem, 3vw, 2rem);
  --timeline-padding: clamp(1rem, 3vw, 2rem);
  --timeline-rail-width: 2px;
}

.timeline-container {
  padding-inline: var(--timeline-padding);
}

.timeline-item {
  position: relative;
}

.timeline-meta {
  font-size: clamp(0.75rem, 1.2vw, 0.9rem);
}

.timeline-card {
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border-radius: clamp(6px, 1vw, 12px);
}

.timeline-blurb {
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  line-height: 1.5;
}

.timeline-tags {
  gap: clamp(0.25rem, 0.8vw, 0.5rem);
}

/* Mobile-specific improvements */
@media (max-width: 1023px) {
  .timeline-item {
    margin-bottom: 1.5rem;
  }
  
  .timeline-card {
    margin-top: 0;
  }
  
  .timeline-meta {
    margin-bottom: 0.75rem;
  }
}

/* Container Query Support for Timeline */
@container (min-width: 900px) {
  .timeline-item {
    margin-bottom: clamp(2rem, 4vw, 3rem);
  }
  
  .timeline-card {
    max-width: 650px;
  }
  
  .timeline-meta {
    padding-top: 0.5rem;
  }
}

/* Blog Post Enhancements */
.prose {
  --prose-body: theme(colors.gray.800);
  --prose-headings: theme(colors.black);
  --prose-links: theme(colors.blue.600);
  --prose-bold: theme(colors.black);
  --prose-code: theme(colors.gray.900);
  --prose-pre-code: theme(colors.gray.100);
  --prose-pre-bg: theme(colors.gray.900);
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  scroll-margin-top: 6rem;
}

.prose h2:not(:first-child) {
  margin-top: 3rem;
}

.prose h3:not(:first-child) {
  margin-top: 2rem;
}

/* Responsive code block improvements */
.prose pre {
  max-width: 100%;
}

.prose code {
  white-space: pre-wrap;
  word-break: break-word;
}

/* Enhanced mobile scrolling for code blocks */
@media (max-width: 768px) {
  .prose pre {
    font-size: 0.75rem;
    line-height: 1.5;
  }
  
  .prose code {
    font-size: 0.75rem;
  }
}

/* Code block syntax highlighting simulation */
.prose pre code .keyword {
  color: #ff79c6;
}

.prose pre code .string {
  color: #f1fa8c;
}

.prose pre code .comment {
  color: #6272a4;
  font-style: italic;
}

.prose pre code .function {
  color: #50fa7b;
}

.prose pre code .type {
  color: #8be9fd;
}

/* Better handling of long lines in code blocks */
.code-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.code-scroll::-webkit-scrollbar {
  height: 6px;
}

.code-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.code-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.code-scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Marquee animations - seamless infinite scrolling */
@keyframes scroll-left {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

/* Anti-aliasing utilities for smooth rotation */
.rotate-smooth {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform-style: preserve-3d;
  image-rendering: crisp-edges;
}

.rotate-smooth-hover {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform-style: preserve-3d;
  image-rendering: crisp-edges;
  will-change: transform;
  transition: transform 0.2s ease-in-out;
}

/* Cursor pointer for all interactive elements */
button,
a,
[role="button"],
[onclick],
[tabindex="0"],
input[type="button"],
input[type="submit"],
input[type="reset"],
select,
.cursor-pointer {
  cursor: pointer;
}

/* Focus states for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid theme(colors.blue.500);
  outline-offset: 2px;
}

/* Print styles for blog posts */
@media print {
  .no-print {
    display: none !important;
  }
  
  .blog-post {
    box-shadow: none !important;
    border: 1px solid #000 !important;
    transform: none !important;
  }
  
  .sticker,
  .texture-grain:before {
    display: none !important;
  }
}
```