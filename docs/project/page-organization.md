# Page Organization Strategy

**Date**: October 2, 2025  
**Purpose**: Define clear page structure for personal site, showcase/demo pages, and project documentation

## Problem

Currently all pages live directly under `/src/pages/`, which will get cluttered as we add:
- Showcase pages (demonstrating theme components)
- Project documentation (how we built this site)
- Test pages (like `test-global-css.astro`)
- Future content pages

## Proposed Structure

```
src/pages/
├── index.astro                      # Homepage
├── about.astro                      # About Nick
├── approach.astro                   # Work methodology
├── background.astro                 # Experience/resume
├── contact.astro                    # Contact form
├── work/
│   ├── index.astro                  # Work list page
│   └── [slug].astro                 # Individual project pages
│
├── notes/                           # Blog/updates (future)
│   ├── index.astro
│   └── [slug].astro
│
├── showcase/                        # 🎨 Theme component demos
│   ├── index.astro                  # Showcase landing page
│   ├── buttons.astro                # Button variants
│   ├── badges.astro                 # Badge/sticker variants
│   ├── cards.astro                  # Card variants
│   ├── forms.astro                  # Form elements
│   ├── typography.astro             # Text styles
│   ├── colors.astro                 # Color palette
│   ├── animations.astro             # Hover/scroll effects
│   ├── layouts.astro                # Section layouts
│   └── utilities.astro              # Utility classes
│
├── project/                         # 📖 Case study: building this site
│   ├── index.astro                  # Project overview
│   ├── design.astro                 # Design process (Figma)
│   ├── architecture.astro           # Tech stack & decisions
│   ├── implementation.astro         # Build process
│   ├── deployment.astro             # Cloudflare Pages setup
│   ├── tools.astro                  # Tools used (Cursor, Copilot)
│   └── learnings.astro              # Key takeaways
│
└── dev/                             # 🧪 Development/test pages
    ├── test-global-css.astro        # CSS validation (move here)
    ├── test-animations.astro        # Animation testing
    ├── test-responsive.astro        # Responsive testing
    └── test-dark-mode.astro         # Dark mode testing
```

## Page Categories

### 1. **Main Site Pages** (Root Level)
**Purpose**: Public-facing personal site pages  
**Audience**: Potential clients, employers, collaborators  
**URLs**: `/`, `/about`, `/work`, `/contact`, etc.

**Characteristics**:
- SEO-optimized
- Professional content
- Production-ready
- Indexed by search engines

### 2. **Showcase Pages** (`/showcase/*`)
**Purpose**: Demonstrate DaisyUI neobrutalism theme components  
**Audience**: Theme buyers, developers  
**URLs**: `/showcase`, `/showcase/buttons`, `/showcase/cards`, etc.

**Characteristics**:
- Isolated component demos
- All variants displayed
- Code examples
- Usage documentation
- Can be `noindex` or public depending on goal

**Future**: Can become the marketing site for selling the theme

### 3. **Project Documentation** (`/project/*`)
**Purpose**: Case study of how this site was built  
**Audience**: Developers, potential clients wanting to understand process  
**URLs**: `/project`, `/project/design`, `/project/architecture`, etc.

**Characteristics**:
- Technical depth
- Process documentation
- Tool recommendations
- Demonstrates expertise
- Portfolio meta-content (showing how you work)

**Benefits**:
- Shows technical depth
- SEO for development-related keywords
- Content marketing (attracts similar clients)
- Reference for future projects

### 4. **Dev/Test Pages** (`/dev/*`)
**Purpose**: Internal testing and validation  
**Audience**: You and contributors  
**URLs**: `/dev/test-global-css`, `/dev/test-animations`, etc.

**Characteristics**:
- Not production content
- `noindex, nofollow` in robots meta
- May only exist in dev environment
- Can be gitignored or excluded from production builds

## Implementation Plan

### Phase 1: Immediate Restructure

**Move existing test page**:
```bash
mv src/pages/test-global-css.astro src/pages/dev/test-global-css.astro
```

**Create directory structure**:
```bash
mkdir -p src/pages/showcase
mkdir -p src/pages/project
mkdir -p src/pages/dev
mkdir -p src/pages/notes
```

**Update references**:
- Update any links to `/test-global-css` → `/dev/test-global-css`
- Add note in docs about new structure

### Phase 2: Create Landing Pages

**`src/pages/showcase/index.astro`**:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const showcasePages = [
  { title: 'Buttons', href: '/showcase/buttons', description: 'All button variants and states' },
  { title: 'Badges & Stickers', href: '/showcase/badges', description: 'Badge components with rotations' },
  { title: 'Cards', href: '/showcase/cards', description: 'Card layouts and styles' },
  { title: 'Forms', href: '/showcase/forms', description: 'Input fields, validation, states' },
  { title: 'Typography', href: '/showcase/typography', description: 'Text styles and hierarchy' },
  { title: 'Colors', href: '/showcase/colors', description: 'Color palette and usage' },
  { title: 'Animations', href: '/showcase/animations', description: 'Hover and scroll effects' },
  { title: 'Layouts', href: '/showcase/layouts', description: 'Section layouts and grids' },
  { title: 'Utilities', href: '/showcase/utilities', description: 'Utility classes reference' },
];
---

<BaseLayout title="Neobrutalism Theme Showcase">
  <div class="container mx-auto px-4 py-20">
    <h1 class="text-5xl font-black mb-6">DaisyUI Neobrutalism Theme</h1>
    <p class="text-xl mb-12">
      Explore all components and utilities in this brutalist design system.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {showcasePages.map(page => (
        <a href={page.href} class="card bg-base-100 shadow-brutal-lg hover-lift">
          <div class="card-body">
            <h2 class="card-title">{page.title}</h2>
            <p>{page.description}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</BaseLayout>
```

**`src/pages/project/index.astro`**:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const projectPages = [
  { title: 'Overview', href: '/project', description: 'Project goals and outcomes' },
  { title: 'Design Process', href: '/project/design', description: 'Figma prototyping approach' },
  { title: 'Architecture', href: '/project/architecture', description: 'Tech stack and decisions' },
  { title: 'Implementation', href: '/project/implementation', description: 'Build process and learnings' },
  { title: 'Deployment', href: '/project/deployment', description: 'Cloudflare Pages setup' },
  { title: 'Tools & Workflow', href: '/project/tools', description: 'Cursor, Copilot, development flow' },
  { title: 'Key Learnings', href: '/project/learnings', description: 'Takeaways and best practices' },
];
---

<BaseLayout title="Building This Site - A Case Study">
  <div class="container mx-auto px-4 py-20">
    <h1 class="text-5xl font-black mb-6">Building This Site</h1>
    <p class="text-xl mb-12">
      A technical case study of building a neobrutalist personal site with modern tools.
    </p>

    <!-- Project summary -->
    <div class="card bg-base-200 shadow-brutal-xl mb-12">
      <div class="card-body">
        <h2 class="card-title text-3xl mb-4">The Stack</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="badge badge-primary badge-lg">Astro</div>
          <div class="badge badge-secondary badge-lg">DaisyUI</div>
          <div class="badge badge-accent badge-lg">Figma</div>
          <div class="badge badge-info badge-lg">Cursor AI</div>
          <div class="badge badge-success badge-lg">GitHub Copilot</div>
          <div class="badge badge-warning badge-lg">Cloudflare Pages</div>
          <div class="badge badge-error badge-lg">TypeScript</div>
          <div class="badge badge-neutral badge-lg">Tailwind CSS 4</div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projectPages.map(page => (
        <a href={page.href} class="card bg-base-100 shadow-brutal-lg hover-lift">
          <div class="card-body">
            <h2 class="card-title">{page.title}</h2>
            <p>{page.description}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</BaseLayout>
```

### Phase 3: SEO & Robots Configuration

**`public/robots.txt`**:
```txt
# Allow main site pages
User-agent: *
Allow: /
Allow: /about
Allow: /work
Allow: /contact
Allow: /approach
Allow: /background

# Allow showcase (if promoting theme)
Allow: /showcase

# Allow project case study (for SEO)
Allow: /project

# Disallow dev/test pages
Disallow: /dev/

# Sitemap
Sitemap: https://nickroth.com/sitemap-index.xml
```

**Add meta tags to dev pages**:
```astro
---
// In src/pages/dev/test-*.astro
---
<head>
  <meta name="robots" content="noindex, nofollow">
</head>
```

### Phase 4: Navigation Updates

**Add to Navbar**:
```astro
<!-- Main site nav (always visible) -->
<a href="/">Home</a>
<a href="/work">Work</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>

<!-- Secondary nav (optional, could be in footer) -->
<a href="/showcase">Theme Showcase</a>
<a href="/project">Case Study</a>
```

**Or use dropdown**:
```astro
<details class="dropdown">
  <summary>Explore</summary>
  <ul class="dropdown-content">
    <li><a href="/showcase">Theme Showcase</a></li>
    <li><a href="/project">Case Study</a></li>
  </ul>
</details>
```

## Benefits of This Structure

### 1. **Clear Separation of Concerns**
- **Main site** (`/`): Professional portfolio
- **Showcase** (`/showcase/*`): Theme demonstrations
- **Project** (`/project/*`): Technical case study
- **Dev** (`/dev/*`): Internal testing

### 2. **SEO Control**
- Main site pages: Full SEO optimization
- Project pages: Technical SEO (developer keywords)
- Showcase: Optional (can be public or noindex)
- Dev pages: Always noindex

### 3. **Easy Navigation**
- Clear URL structure
- Logical grouping
- Easy to link between related content

### 4. **Scalability**
- Easy to add new showcase pages
- Project documentation can grow
- Dev/test pages don't clutter main site
- Future: `/notes/*` for blog

### 5. **Marketing Opportunities**

**Showcase as Theme Demo**:
- Shows off your work
- Proves theme quality
- Can link to purchase page
- Living documentation

**Project as Content Marketing**:
- Attracts technical audience
- Shows depth of expertise
- SEO for relevant keywords
- Demonstrates process

## Astro Configuration

**Optional: Build-time exclusions for dev pages**

Add to `astro.config.mjs`:
```javascript
export default defineConfig({
  // ... other config
  vite: {
    build: {
      rollupOptions: {
        // Optionally exclude dev pages from production
        external: process.env.NODE_ENV === 'production' 
          ? ['/src/pages/dev/**'] 
          : []
      }
    }
  }
});
```

Or use environment-based rendering:
```astro
---
// src/pages/dev/index.astro
if (import.meta.env.PROD) {
  return Astro.redirect('/404');
}
---
```

## Example Showcase Page Structure

**`src/pages/showcase/buttons.astro`**:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
const variants = ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'];
const styles = ['default', 'outline', 'ghost'];
---

<BaseLayout title="Buttons - Showcase">
  <div class="container mx-auto px-4 py-20">
    <h1 class="text-5xl font-black mb-6">Buttons</h1>
    <p class="text-xl mb-12">All button variants, sizes, and states.</p>

    <!-- Sizes -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6">Sizes</h2>
      <div class="flex flex-wrap gap-4">
        {sizes.map(size => (
          <button class={`btn btn-primary btn-${size}`}>
            Button {size}
          </button>
        ))}
      </div>
      
      <!-- Code example -->
      <pre class="mockup-code mt-4"><code>{`<button class="btn btn-primary btn-lg">Button</button>`}</code></pre>
    </section>

    <!-- Variants -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6">Variants</h2>
      <div class="flex flex-wrap gap-4">
        {variants.map(variant => (
          <button class={`btn btn-${variant}`}>
            {variant}
          </button>
        ))}
      </div>
    </section>

    <!-- States -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6">States</h2>
      <div class="flex flex-wrap gap-4">
        <button class="btn btn-primary">Normal</button>
        <button class="btn btn-primary hover-lift">Hover Lift</button>
        <button class="btn btn-primary" disabled>Disabled</button>
        <button class="btn btn-primary loading">Loading</button>
      </div>
    </section>

    <!-- With shadows -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6">Shadow Variants</h2>
      <div class="flex flex-wrap gap-4">
        <button class="btn btn-primary shadow-brutal-sm">Small</button>
        <button class="btn btn-primary shadow-brutal">Base</button>
        <button class="btn btn-primary shadow-brutal-lg">Large</button>
        <button class="btn btn-primary shadow-brutal-xl">XL</button>
      </div>
    </section>
  </div>
</BaseLayout>
```

## Timeline

### Week 1 (Immediate)
- [x] Create directory structure
- [ ] Move `test-global-css.astro` to `/dev/`
- [ ] Create showcase landing page (`/showcase/index.astro`)
- [ ] Create project landing page (`/project/index.astro`)

### Week 2 (As-needed during site build)
- [ ] Add showcase pages as components are polished
- [ ] Start project documentation pages

### Week 3 (After main site complete)
- [ ] Complete all showcase pages
- [ ] Finish project documentation
- [ ] Add navigation links
- [ ] Configure robots.txt

## Related Documentation

- **Site Roadmap**: `docs/site-first-roadmap.md`
- **Component Backlog**: `docs/component-backlog.md`
- **Implementation Guide**: `docs/design-system/implementation.md`

## Next Actions

1. **Create directories**: `mkdir -p src/pages/{showcase,project,dev,notes}`
2. **Move test page**: `mv src/pages/test-global-css.astro src/pages/dev/`
3. **Create landing pages**: Build showcase and project index pages
4. **Update navbar**: Add links to new sections
5. **Document in roadmap**: Update site-first-roadmap.md with this structure
