# DaisyUI Neobrutalism Component Implementation Backlog

## Overview
This backlog prioritizes **building Nick's personal site first**. Components are created as-needed for each page section, demonstrated in isolation on a showcase page, then integrated. After the personal site is functional, we expand to complete the full theme component library.

## Development Strategy
1. **Build Personal Site Pages** - Focus on visible, high-impact sections
2. **Extract Components As-Needed** - When a section needs a component, build it properly
3. **Demonstrate in Isolation** - Create showcase page for each component with all variants
4. **Integrate & Verify** - Use component on personal site, verify implementation
5. **Expand Theme Library** - After site is functional, complete remaining components

## Priority Levels
- **P0 (Site Blocker)**: Required for personal site to function
- **P1 (Site Feature)**: Needed for complete personal site experience
- **P2 (Theme Expansion)**: Completes theme library for sale
- **P3 (Nice to Have)**: Optional enhancements

## Task Status
- `[ ]` Not Started
- `[~]` In Progress
- `[x]` Complete
- `[?]` Blocked (waiting on dependency)

---

## Phase 1: Foundation & Homepage (Personal Site Focus)

### P0-001: Global CSS Setup
**Priority**: P0 (Critical) | **Status**: `[ ]` | **Dependencies**: None

**Objective**: Establish the CSS foundation for neobrutalism theme

**Tasks**:
1. Update `src/styles/global.css` with DaisyUI overrides
2. Add brutalist shadows utilities (sm, md, lg, xl)
3. Add rotation utilities (sticker-1 through sticker-4)
4. Add sticker positioning utilities (sticker-container, sticker, sticker-top-left, etc.)
5. Add CSS-only animations (spin-slow, bounce-slow, sway, glitch)
6. Add scroll animation utilities (fade-in-up, slide-in-left, etc.)
7. Add hover effect utilities (hover-lift, hover-scale, hover-rotate, hover-glow)
8. Override DaisyUI btn, card, badge, input, textarea, select, checkbox classes
9. Add vanilla JS helper for scroll animations (Intersection Observer)

**Files to Create/Modify**:
- `src/styles/global.css`
- `src/scripts/animations.js` (new - scroll animation helper)

**Success Criteria**:
- [ ] All DaisyUI components have thick black borders (4px standard)
- [ ] Hard-edged shadows render correctly (no blur)
- [ ] Rotation utilities work (-8deg to 12deg range)
- [ ] Sticker positioning utilities enable relative positioning
- [ ] Animations are smooth and CSS-only
- [ ] Hover states show lift effect (translate + shadow reduction)
- [ ] Focus states have visible 2px black outline
- [ ] Scroll animations work with Intersection Observer
- [ ] Glitch effect works on hover
- [ ] All utilities are in `@layer utilities`
- [ ] All component overrides are in `@layer components`
- [ ] JavaScript is minimal and only for scroll detection

**Acceptance Test**: Apply `btn btn-primary` class to button - should have 4px black border, 6px hard shadow, and lift on hover. Apply `fade-in-up` to element - should animate in on scroll.

---

### P0-002: Theme Configuration
**Priority**: P0 (Critical) | **Status**: `[ ]` | **Dependencies**: None

**Objective**: Configure DaisyUI theme colors for neobrutalism

**Tasks**:
1. Create `neobrutalism` theme in Tailwind config
2. Define color palette (cyan, lime, yellow, fuchsia, black, white)
3. Set up semantic colors (primary, secondary, accent, neutral)
4. Configure base colors (base-100, base-200, base-300)
5. Optional: Add dark mode variant

**Files to Create/Modify**:
- `tailwind.config.mjs`

**Success Criteria**:
- [ ] Primary color is cyan-400 (#22d3ee)
- [ ] Secondary color is lime-300 (#bef264)
- [ ] Accent color is yellow-300 (#fde047)
- [ ] Neutral color is black (#000000)
- [ ] Base-100 is white (#ffffff)
- [ ] Colors are vibrant and high-contrast
- [ ] Theme works with all DaisyUI components
- [ ] Color names are semantic (primary, not cyan)

**Acceptance Test**: `bg-primary` class renders cyan-400 background, `text-neutral` renders black text

---

### P1-003: StickerBadge Component
**Priority**: P1 (High) | **Status**: `[ ]` | **Dependencies**: P0-001, P0-002

**Objective**: Create reusable badge/sticker component with rotation

**Tasks**:
1. Create `src/components/StickerBadge.astro`
2. Accept props: variant, size, rotation, class
3. Use standard DaisyUI badge classes
4. Apply rotation utility based on prop
5. Add TypeScript interface for props
6. Support slot for content

**Files to Create/Modify**:
- `src/components/StickerBadge.astro`

**Component Interface**:
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rotation?: 1 | 2 | 3 | 4;
  class?: string;
}
```

**Success Criteria**:
- [ ] Uses only DaisyUI badge classes (`badge`, `badge-{variant}`, `badge-{size}`)
- [ ] Rotation applied via utility class (`rotate-sticker-{rotation}`)
- [ ] No hard-coded content (accepts slot)
- [ ] Works as plain HTML when copied
- [ ] TypeScript interface defined
- [ ] Border-2 black, shadow-brutal-sm by default
- [ ] Supports all DaisyUI badge variants
- [ ] Can be used with or without rotation
- [ ] Works with sticker positioning pattern (sticker-container + sticker utilities)
- [ ] Can be absolutely positioned when needed

**Acceptance Test**: `<StickerBadge variant="success" rotation={1}>⚡ TEST</StickerBadge>` renders lime badge rotated -8deg with hard shadow

**Sticker Positioning Pattern**:
```html
<!-- Standalone usage -->
<StickerBadge variant="success">FEATURED</StickerBadge>

<!-- Positioned as sticker on button -->
<div class="sticker-container">
  <button class="btn btn-primary">VIEW PROJECTS</button>
  <span class="badge badge-success sticker sticker-top-left rotate-sticker-1">MORE</span>
  <span class="badge badge-secondary sticker sticker-top-right rotate-sticker-4">SOON</span>
</div>

<!-- Or using StickerBadge component -->
<div class="sticker-container">
  <button class="btn btn-primary">VIEW PROJECTS</button>
  <StickerBadge variant="success" rotation={1} class="sticker sticker-top-left">MORE</StickerBadge>
</div>
```

---

### P1-004: BrutalistCard Component
**Priority**: P1 (High) | **Status**: `[ ]` | **Dependencies**: P0-001, P0-002

**Objective**: Create base card component with customizable rotation and shadow

**Tasks**:
1. Create `src/components/BrutalistCard.astro`
2. Accept props: rotation, shadow, class
3. Use standard DaisyUI card class
4. Apply shadow utility based on prop
5. Apply inline rotation style if needed
6. Support slot for content

**Files to Create/Modify**:
- `src/components/BrutalistCard.astro`

**Component Interface**:
```typescript
interface Props {
  rotation?: number;  // Degrees, can be any value
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}
```

**Success Criteria**:
- [ ] Uses standard DaisyUI card class
- [ ] Shadow applied via utility class (`shadow-brutal-{shadow}`)
- [ ] Rotation uses inline style for flexibility
- [ ] Border-4 black by default (from global override)
- [ ] No hard-coded content (uses slot)
- [ ] Works as plain HTML when copied
- [ ] TypeScript interface defined
- [ ] Accepts any rotation value (-12 to 12 common)

**Acceptance Test**: `<BrutalistCard rotation={-2} shadow="xl"><slot /></BrutalistCard>` renders card rotated -2deg with 20px hard shadow

---

### P1-005: NeoButton Component
**Priority**: P1 (High) | **Status**: `[ ]` | **Dependencies**: P0-001, P0-002

**Objective**: Create button component with neobrutalism styling

**Tasks**:
1. Create `src/components/NeoButton.astro`
2. Accept props: variant, size, href, class
3. Use standard DaisyUI btn classes
4. Support both button and anchor rendering
5. Add TypeScript interface for props
6. Support slot for content

**Files to Create/Modify**:
- `src/components/NeoButton.astro`

**Component Interface**:
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  class?: string;
}
```

**Success Criteria**:
- [ ] Uses only DaisyUI btn classes
- [ ] Renders `<a>` if href provided, `<button>` otherwise
- [ ] Border-4 black, shadow-brutal by default (from override)
- [ ] Hover shows lift effect (from global CSS)
- [ ] No hard-coded content (uses slot)
- [ ] Works with all DaisyUI btn variants
- [ ] TypeScript interface defined
- [ ] Supports all sizes

**Acceptance Test**: `<NeoButton variant="primary" size="lg">Click Me</NeoButton>` renders button with cyan bg, 4px black border, 6px shadow, lifts on hover

---

## Phase 2: Content Components (Used on Site)

### P0-006: Hero Component (Rebuild)
**Priority**: P0 (Critical) | **Status**: `[ ]` | **Dependencies**: P1-003 (StickerBadge), P1-004 (BrutalistCard), P1-005 (NeoButton)

**Objective**: Rebuild Hero using DaisyUI components with content separation

**Tasks**:
1. Update `src/components/Hero.astro`
2. Remove hard-coded content
3. Accept props for all content (name, tagline, badges, image, CTAs)
4. Use DaisyUI hero, hero-content classes
5. Compose with StickerBadge, BrutalistCard, NeoButton
6. Add CSS animations for floating shapes
7. Create TypeScript interfaces for all data

**Files to Create/Modify**:
- `src/components/Hero.astro`
- `src/data/hero.ts` (new - content data)

**Component Interface**:
```typescript
interface Badge {
  icon: string;
  label: string;
  variant: 'primary' | 'secondary' | 'success' | 'info' | 'warning';
  rotation?: 1 | 2 | 3 | 4;
}

interface CTA {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

interface Props {
  name: string;
  tagline: string;
  badges: Badge[];
  image: string;
  imageAlt: string;
  primaryCTA: CTA;
  secondaryCTA: CTA;
}
```

**Success Criteria**:
- [ ] No hard-coded content in component
- [ ] All content comes from props
- [ ] Uses DaisyUI hero component classes
- [ ] Top badges use StickerBadge component
- [ ] Avatar frame uses BrutalistCard
- [ ] CTAs use NeoButton component
- [ ] Floating shapes use CSS-only animations
- [ ] Responsive: stacks on mobile, side-by-side on desktop
- [ ] TypeScript interfaces for all data shapes
- [ ] Content stored in `src/data/hero.ts`

**Acceptance Test**: Hero renders with data from `src/data/hero.ts`, changes when data file is edited, no content in component file

---

### P1-007: CapabilityCard Component (Rebuild)
**Priority**: P1 (High) | **Status**: `[ ]` | **Dependencies**: P1-004 (BrutalistCard)

**Objective**: Rebuild CapabilityCard using BrutalistCard with content separation

**Tasks**:
1. Update `src/components/CapabilityCard.astro`
2. Remove hard-coded styling
3. Accept props: title, description, icon
4. Use BrutalistCard as base
5. Add TypeScript interface

**Files to Create/Modify**:
- `src/components/CapabilityCard.astro`

**Component Interface**:
```typescript
interface Props {
  title: string;
  description: string;
  icon: string;
  rotation?: number;
}
```

**Success Criteria**:
- [ ] Uses BrutalistCard as base
- [ ] No hard-coded content
- [ ] Icon renders at top
- [ ] Title uses font-black
- [ ] Description uses readable line-height
- [ ] Hover effect inherited from BrutalistCard
- [ ] Optional rotation prop
- [ ] TypeScript interface defined

**Acceptance Test**: Card displays with icon, title, description from props, lifts on hover, has thick border and hard shadow

---

### P1-008: WorkCard Component (Rebuild)
**Priority**: P1 (High) | **Status**: `[ ]` | **Dependencies**: P1-004 (BrutalistCard), P1-003 (StickerBadge)

**Objective**: Rebuild WorkCard using DaisyUI components with content separation

**Tasks**:
1. Update `src/components/WorkCard.astro`
2. Remove hard-coded styling
3. Accept props: title, description, image, tags, link
4. Use BrutalistCard as base
5. Use StickerBadge for tags
6. Add TypeScript interface

**Files to Create/Modify**:
- `src/components/WorkCard.astro`

**Component Interface**:
```typescript
interface Tag {
  label: string;
  variant: 'primary' | 'secondary' | 'accent' | 'success';
}

interface Props {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: Tag[];
  link: string;
  rotation?: number;
}
```

**Success Criteria**:
- [ ] Uses BrutalistCard as base
- [ ] No hard-coded content
- [ ] Image at top with border-black
- [ ] Tags use StickerBadge component
- [ ] Link wraps entire card
- [ ] Hover effect on entire card
- [ ] TypeScript interface defined
- [ ] Responsive image sizing

**Acceptance Test**: Card displays with image, title, description, tags from props, entire card is clickable, lifts on hover

---

### P1-009: Navbar Component (Rebuild)
**Priority**: P1 (High) | **Status**: `[ ]` | **Dependencies**: P1-005 (NeoButton), P0-001 (Global CSS)

**Objective**: Rebuild Navbar using DaisyUI navbar component with content separation

**Tasks**:
1. Update `src/components/Navbar.astro`
2. Remove hard-coded menu items
3. Accept props: logo, menuItems
4. Use DaisyUI navbar, navbar-start, navbar-end classes
5. Use NeoButton for mobile menu toggle
6. Add border-bottom with neobrutalism styling
7. Create data file for navigation

**Files to Create/Modify**:
- `src/components/Navbar.astro`
- `src/data/navigation.ts` (new - menu items)

**Component Interface**:
```typescript
interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

interface Props {
  logo: string;
  logoAlt: string;
  menuItems: MenuItem[];
}
```

**Success Criteria**:
- [ ] Uses DaisyUI navbar component classes
- [ ] No hard-coded menu items
- [ ] Menu data in `src/data/navigation.ts`
- [ ] Border-bottom-4 black
- [ ] Mobile menu uses DaisyUI drawer or dropdown
- [ ] Desktop shows horizontal menu
- [ ] Logo links to home
- [ ] Active page highlighted
- [ ] TypeScript interface defined

**Acceptance Test**: Navbar renders with items from data file, responsive mobile/desktop views, active link highlighted

---

## Phase 3: Layout & Structure Components

### P2-010: SectionContainer Component
**Priority**: P2 (Medium) | **Status**: `[ ]` | **Dependencies**: P0-001, P0-002

**Objective**: Create flexible section wrapper with variants

**Tasks**:
1. Create `src/components/SectionContainer.astro`
2. Accept props: variant, background, padding
3. Support variants: hero, content, cta, full-width
4. Add TypeScript interface
5. Use slot for content

**Files to Create/Modify**:
- `src/components/SectionContainer.astro`

**Component Interface**:
```typescript
interface Props {
  variant?: 'hero' | 'content' | 'cta' | 'full-width';
  background?: 'base-100' | 'base-200' | 'base-300' | 'gradient-purple' | 'gradient-blue';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}
```

**Success Criteria**:
- [ ] Hero variant has gradient background, larger padding, border-bottom
- [ ] Content variant has standard padding
- [ ] CTA variant centers content
- [ ] Full-width removes max-width constraint
- [ ] Responsive padding using clamp()
- [ ] TypeScript interface defined
- [ ] Uses slot for content

**Acceptance Test**: Each variant renders with appropriate styling, content is properly contained and responsive

---

### P2-011: SectionHeader Component
**Priority**: P2 (Medium) | **Status**: `[ ]` | **Dependencies**: None

**Objective**: Create standardized section headers with optional highlights

**Tasks**:
1. Create `src/components/SectionHeader.astro`
2. Accept props: title, subtitle, highlight, size
3. Support color highlighting of words
4. Add TypeScript interface
5. Use semantic heading tags

**Files to Create/Modify**:
- `src/components/SectionHeader.astro`

**Component Interface**:
```typescript
interface Highlight {
  text: string;
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

interface Props {
  title: string;
  subtitle?: string;
  highlight?: Highlight;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}
```

**Success Criteria**:
- [ ] Title uses font-black
- [ ] Highlighted word uses specified color
- [ ] Subtitle is optional, uses lighter weight
- [ ] Sizes map to appropriate text classes
- [ ] Centered option works
- [ ] TypeScript interface defined
- [ ] Semantic h2/h3 tags

**Acceptance Test**: Header renders with title, optional highlighted word in color, optional subtitle, responsive sizing

---

### P2-012: Footer Component
**Priority**: P2 (Medium) | **Status**: `[ ]` | **Dependencies**: P0-001, P0-002

**Objective**: Create site footer with content separation

**Tasks**:
1. Create `src/components/Footer.astro`
2. Accept props: logo, sections, social links
3. Use DaisyUI footer component classes
4. Support multiple column layout
5. Create data file for footer content

**Files to Create/Modify**:
- `src/components/Footer.astro`
- `src/data/footer.ts` (new - footer content)

**Component Interface**:
```typescript
interface Link {
  label: string;
  href: string;
  external?: boolean;
}

interface Section {
  title: string;
  links: Link[];
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

interface Props {
  logo: string;
  sections: Section[];
  socialLinks: SocialLink[];
  copyright: string;
}
```

**Success Criteria**:
- [ ] Uses DaisyUI footer classes
- [ ] No hard-coded content
- [ ] Content in `src/data/footer.ts`
- [ ] Border-top-4 black
- [ ] Responsive: stacks on mobile, columns on desktop
- [ ] Social links render with icons
- [ ] Copyright year dynamic
- [ ] TypeScript interface defined

**Acceptance Test**: Footer renders with data from file, responsive layout, social links work, copyright shows current year

---

## Phase 4: Interactive Components

### P3-013: ContactForm Component
**Priority**: P3 (Low) | **Status**: `[ ]` | **Dependencies**: P1-005 (NeoButton), P0-001

**Objective**: Create contact form with neobrutalism styling

**Tasks**:
1. Create `src/components/ContactForm.astro`
2. Use DaisyUI form components (input, textarea, label)
3. Apply neobrutalism overrides (thick borders, shadows)
4. Add validation states
5. Use NeoButton for submit

**Files to Create/Modify**:
- `src/components/ContactForm.astro`

**Component Interface**:
```typescript
interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  required?: boolean;
  placeholder?: string;
}

interface Props {
  title: string;
  description?: string;
  fields: Field[];
  submitLabel: string;
  action: string;
}
```

**Success Criteria**:
- [ ] Uses DaisyUI input, textarea, label classes
- [ ] Inputs have border-3 black, shadow on focus
- [ ] Required fields marked visually
- [ ] Submit uses NeoButton component
- [ ] Accessible labels and ARIA
- [ ] TypeScript interface defined
- [ ] No hard-coded field definitions

**Acceptance Test**: Form renders with fields from props, inputs have neobrutalism styling, validation works, submits to action URL

---

### P3-014: Modal Component
**Priority**: P3 (Low) | **Status**: `[?]` | **Dependencies**: P1-005 (NeoButton), P0-001

**Objective**: Create modal dialog with neobrutalism styling

**Notes**: Currently not used on site, low priority

**Tasks**:
1. Create `src/components/Modal.astro`
2. Use DaisyUI modal component classes
3. Apply neobrutalism borders and shadows
4. Support backdrop click to close
5. Add TypeScript interface

**Files to Create/Modify**:
- `src/components/Modal.astro`

**Component Interface**:
```typescript
interface Props {
  id: string;
  title?: string;
  closeLabel?: string;
}
```

**Success Criteria**:
- [ ] Uses DaisyUI modal classes
- [ ] Border-4 black on modal box
- [ ] Shadow-brutal-xl on modal
- [ ] Backdrop overlay darkens page
- [ ] ESC key closes modal
- [ ] Backdrop click closes modal
- [ ] TypeScript interface defined

**Acceptance Test**: Modal opens/closes correctly, has thick border and shadow, accessible keyboard navigation

---

### P3-015: Accordion Component
**Priority**: P3 (Low) | **Status**: `[?]` | **Dependencies**: P0-001

**Objective**: Create accordion/collapse component

**Notes**: Currently not used on site, may be useful for FAQ sections

**Tasks**:
1. Create `src/components/Accordion.astro`
2. Use DaisyUI collapse component classes
3. Apply neobrutalism styling
4. Support arrow or plus icons
5. Add TypeScript interface

**Files to Create/Modify**:
- `src/components/Accordion.astro`

**Component Interface**:
```typescript
interface AccordionItem {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

interface Props {
  items: AccordionItem[];
  icon?: 'arrow' | 'plus';
  allowMultiple?: boolean;
}
```

**Success Criteria**:
- [ ] Uses DaisyUI collapse classes
- [ ] Border-2 black on each item
- [ ] Shadow on expanded item
- [ ] Smooth expand/collapse animation
- [ ] Radio mode (single open) or checkbox mode (multiple)
- [ ] TypeScript interface defined
- [ ] No hard-coded items

**Acceptance Test**: Accordion expands/collapses items, only one open at a time in radio mode, neobrutalism styling applied

---

## Phase 5: Advanced Components

### P2-016: Timeline Component
**Priority**: P2 (Medium) | **Status**: `[?]` | **Dependencies**: P1-004 (BrutalistCard), P1-003 (StickerBadge)

**Objective**: Create timeline/resume component with content separation

**Notes**: Would be useful for background/experience page

**Tasks**:
1. Create `src/components/Timeline.astro`
2. Accept props: items array
3. Use BrutalistCard for timeline items
4. Use StickerBadge for tags/dates
5. Add vertical line connector (CSS)
6. Support left/right alternating layout

**Files to Create/Modify**:
- `src/components/Timeline.astro`

**Component Interface**:
```typescript
interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  description: string;
  tags: string[];
  side?: 'left' | 'right';
}

interface Props {
  items: TimelineItem[];
  alternating?: boolean;
}
```

**Success Criteria**:
- [ ] Uses BrutalistCard for items
- [ ] Vertical line connects items (CSS)
- [ ] Dates use StickerBadge
- [ ] Alternating layout on desktop
- [ ] Stacked on mobile
- [ ] TypeScript interface defined
- [ ] No hard-coded timeline items

**Acceptance Test**: Timeline renders with items from props, alternates left/right on desktop, stacks on mobile, vertical line connects items

---

### P3-017: Carousel Component
**Priority**: P3 (Low) | **Status**: `[?]` | **Dependencies**: P1-004 (BrutalistCard)

**Objective**: Create carousel for images or cards

**Notes**: May be useful for work portfolio showcases

**Tasks**:
1. Create `src/components/Carousel.astro`
2. Use DaisyUI carousel component classes
3. Apply neobrutalism styling
4. Support navigation buttons
5. Add TypeScript interface

**Files to Create/Modify**:
- `src/components/Carousel.astro`

**Component Interface**:
```typescript
interface CarouselItem {
  image: string;
  alt: string;
  caption?: string;
}

interface Props {
  items: CarouselItem[];
  showNavigation?: boolean;
  autoPlay?: boolean;
}
```

**Success Criteria**:
- [ ] Uses DaisyUI carousel classes
- [ ] Navigation buttons use neobrutalism styling
- [ ] Smooth scrolling between items
- [ ] Optional auto-play with CSS animations
- [ ] Responsive image sizing
- [ ] TypeScript interface defined
- [ ] No hard-coded items

**Acceptance Test**: Carousel scrolls through items, navigation works, images are responsive, neobrutalism styling on controls

---

## Phase 6: Theme Showcase & Documentation

### P2-018: Showcase/Demo Landing Page
**Priority**: P2 (Medium) | **Status**: `[ ]` | **Dependencies**: P0-001, P0-002, P1-003, P1-004, P1-005

**Objective**: Create landing page for component showcase with navigation to all demo pages

**Tasks**:
1. Create `src/pages/showcase/index.astro`
2. List all component categories with descriptions
3. Link to individual showcase pages
4. Use neobrutalism styling for cards/navigation
5. Add hero section explaining the theme
6. Create navigation menu for showcase section

**Files to Create/Modify**:
- `src/pages/showcase/index.astro`

**Content Structure**:
```typescript
interface ShowcaseCategory {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string; // bg-lime-400, bg-cyan-400, etc.
}
```

**Success Criteria**:
- [ ] Hero section explains theme purpose
- [ ] All showcase categories listed with cards
- [ ] Cards use neobrutalism styling
- [ ] Links work to all showcase pages
- [ ] Responsive layout
- [ ] Content in data file (not hard-coded)

**Acceptance Test**: Landing page displays all categories, cards are clickable, neobrutalism styling applied

---

### P2-019: Button Showcase Page
**Priority**: P2 (Medium) | **Status**: `[?]` | **Dependencies**: P1-005 (NeoButton), P0-001, P0-002

**Objective**: Showcase all button variants, sizes, states, and icon combinations

**Tasks**:
1. Create `src/pages/showcase/buttons.astro`
2. Display all variants (primary, secondary, outline, ghost, etc.)
3. Display all sizes (xs, sm, md, lg, xl)
4. Display all shadow sizes
5. Show loading states
6. Show with left/right icons
7. Show disabled states
8. Document props and usage

**Files to Create/Modify**:
- `src/pages/showcase/buttons.astro`

**Success Criteria**:
- [ ] All button variants visible
- [ ] All size combinations shown
- [ ] Interactive examples (clickable)
- [ ] Loading state demonstrated
- [ ] Icon examples included
- [ ] Disabled state visible
- [ ] Code examples provided
- [ ] Responsive grid layout

**Acceptance Test**: Page displays all button options, code examples work when copied

---

### P2-020: Card Showcase Page
**Priority**: P2 (Medium) | **Status**: `[?]` | **Dependencies**: P1-004 (BrutalistCard), P1-007, P1-008

**Objective**: Showcase all card variants and specialized card components

**Tasks**:
1. Create `src/pages/showcase/cards.astro`
2. Display BrutalistCard with different rotations/shadows
3. Show CapabilityCard examples
4. Show WorkCard examples
5. Demonstrate card with stickers
6. Show card hover effects
7. Document props and usage

**Files to Create/Modify**:
- `src/pages/showcase/cards.astro`

**Success Criteria**:
- [ ] Base card with variants shown
- [ ] Specialized cards demonstrated
- [ ] Rotation examples visible
- [ ] Shadow size examples shown
- [ ] Hover effects work
- [ ] Sticker positioning examples
- [ ] Code examples provided
- [ ] Responsive layouts

**Acceptance Test**: All card types displayed with variations, hover effects work, code examples copy correctly

---

### P2-021: Badge/Sticker Showcase Page
**Priority**: P2 (Medium) | **Status**: `[?]` | **Dependencies**: P1-003 (StickerBadge), P0-001

**Objective**: Showcase badge/sticker variants and positioning patterns

**Tasks**:
1. Create `src/pages/showcase/badges.astro`
2. Display all badge variants (colors)
3. Display all sizes
4. Show standalone badges
5. Show sticker positioning examples (relative to buttons, cards, headings)
6. Demonstrate rotation variants
7. Document sticker-container pattern

**Files to Create/Modify**:
- `src/pages/showcase/badges.astro`

**Success Criteria**:
- [ ] All badge variants visible
- [ ] All sizes shown
- [ ] Sticker positioning examples (top-left, top-right, bottom-left, bottom-right)
- [ ] Rotation examples (all 4 presets)
- [ ] Sticker-container pattern documented
- [ ] Code examples with positioning CSS
- [ ] Works with buttons, cards, headings

**Acceptance Test**: All badge variants displayed, sticker positioning examples work, code snippets demonstrate pattern

---

### P2-022: Typography Showcase Page
**Priority**: P2 (Medium) | **Status**: `[?]` | **Dependencies**: P0-001, P0-002

**Objective**: Display typography system and text styling options

**Tasks**:
1. Create `src/pages/showcase/typography.astro`
2. Show all heading levels (h1-h6)
3. Display body text variants
4. Show font families (display, body, mono)
5. Demonstrate color options
6. Show text sizes
7. Document typography guidelines

**Files to Create/Modify**:
- `src/pages/showcase/typography.astro`

**Success Criteria**:
- [ ] All heading levels displayed
- [ ] Body text examples shown
- [ ] Font families demonstrated
- [ ] Color variants visible
- [ ] Size scale documented
- [ ] Line-height examples
- [ ] Accessibility guidelines included
- [ ] Semantic HTML emphasized

**Acceptance Test**: All typography options visible, guidelines clear, semantic HTML demonstrated

---

### P2-023: Form Elements Showcase Page
**Priority**: P2 (Medium) | **Status**: `[?]` | **Dependencies**: P0-001, P0-002, P1-005 (NeoButton)

**Objective**: Showcase form components with neobrutalism styling

**Tasks**:
1. Create `src/pages/showcase/forms.astro`
2. Display input fields (text, email, password, number)
3. Show textarea variants
4. Display select dropdowns
5. Show checkbox/radio/toggle
6. Demonstrate validation states
7. Show form layouts

**Files to Create/Modify**:
- `src/pages/showcase/forms.astro`

**Success Criteria**:
- [ ] All input types displayed
- [ ] Textarea shown
- [ ] Select dropdowns work
- [ ] Checkbox/radio/toggle examples
- [ ] Validation states visible (error, success)
- [ ] Focus states demonstrated
- [ ] Disabled states shown
- [ ] Accessible labels

**Acceptance Test**: All form elements render with neobrutalism styling, validation states work, focus states visible

---

### P2-024: Layout Components Showcase Page
**Priority**: P2 (Medium) | **Status**: `[?]` | **Dependencies**: P2-010, P2-011, P2-012

**Objective**: Demonstrate layout components and section styling

**Tasks**:
1. Create `src/pages/showcase/layouts.astro`
2. Show SectionContainer variants (backgrounds, padding)
3. Display SectionHeader examples
4. Demonstrate Footer layouts
5. Show responsive patterns
6. Document layout guidelines

**Files to Create/Modify**:
- `src/pages/showcase/layouts.astro`

**Success Criteria**:
- [ ] SectionContainer variants shown
- [ ] Background options demonstrated
- [ ] Padding variants visible
- [ ] SectionHeader examples included
- [ ] Footer layout shown
- [ ] Responsive breakpoints documented
- [ ] Grid/flex patterns demonstrated

**Acceptance Test**: All layout components displayed, responsive behavior works, guidelines clear

---

### P3-025: Animation Showcase Page
**Priority**: P3 (Low) | **Status**: `[?]` | **Dependencies**: P0-001

**Objective**: Demonstrate available CSS animations and transitions

**Tasks**:
1. Create `src/pages/showcase/animations.astro`
2. Show hover effects (lift, scale, rotate)
3. Demonstrate scroll animations
4. Display loading spinners
5. Show transition examples
6. Document animation utilities

**Files to Create/Modify**:
- `src/pages/showcase/animations.astro`

**Success Criteria**:
- [ ] All hover effects demonstrated
- [ ] Scroll animations visible
- [ ] Loading states shown
- [ ] Transitions smooth
- [ ] CSS-only (no JS for styling)
- [ ] Performance optimized
- [ ] Utility classes documented

**Acceptance Test**: All animations work smoothly, no jank, CSS-only approach demonstrated

---

### P3-026: Icon System Documentation
**Priority**: P3 (Low) | **Status**: `[ ]` | **Dependencies**: None

**Objective**: Extract commonly used icons and create Astro components

**Tasks**:
1. Review figma-export for frequently used icons
2. Extract SVG code for top 15-20 icons
3. Create Astro icon components in `src/components/icons/`
4. Add size variants (sm, md, lg)
5. Document icon usage patterns
6. Create icon showcase page (optional)

**Files to Create/Modify**:
- `src/components/icons/*.astro` (multiple files)
- `src/pages/showcase/icons.astro` (optional)

**Icon List** (from figma-export analysis):
- ArrowRight
- ArrowLeft
- ExternalLink
- Download
- Heart
- Plus
- Search
- Settings
- Trash
- Github
- Play
- Zap
- Check
- X (close)
- Menu

**Success Criteria**:
- [ ] 15-20 icon components created
- [ ] All icons use currentColor for fill/stroke
- [ ] Size variants work (w-4 h-4, w-5 h-5, w-6 h-6)
- [ ] Icons are framework-agnostic (pure SVG)
- [ ] Usage documented
- [ ] Optional showcase page created

**Acceptance Test**: Icons render correctly, sizes work, colors inherit from parent

---

### P2-027: BoxedHeading Component
**Priority**: P2 (Medium) | **Status**: `[ ]` | **Dependencies**: P0-001, P0-002

**Objective**: Create component for text inside colored/bordered boxes (heavily used in prototype)

**Tasks**:
1. Create `src/components/BoxedHeading.astro`
2. Accept props: background, textColor, rotation, size
3. Support border/shadow variants
4. Add TypeScript interface
5. Use slot for content

**Files to Create/Modify**:
- `src/components/BoxedHeading.astro`

**Component Interface**:
```typescript
interface Props {
  background?: string; // Tailwind class like 'bg-black'
  textColor?: string;  // Tailwind class like 'text-white'
  rotation?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
  shadow?: 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Success Criteria**:
- [ ] Uses inline-block display
- [ ] Supports all background colors
- [ ] Rotation applied via inline style
- [ ] Border-4 black by default
- [ ] Shadow utilities work
- [ ] Size affects padding
- [ ] TypeScript interface defined
- [ ] Works in headings and body text

**Acceptance Test**: `<BoxedHeading background="bg-black" textColor="text-white" rotation={-2}>TEXT</BoxedHeading>` renders correctly

---

## Implementation Notes

### Component Building Process
1. Review this backlog and find next task by status (`[ ]` = not started)
2. Use `#file:buildComponent.prompt.md` command (now auto-selects next task)
3. Follow the 4-phase process (Analysis, CSS Foundation, Implementation, Validation)
4. Mark task as `[~]` (in progress) when starting
5. Check off all success criteria as completed
6. Run acceptance test
7. Mark task as `[x]` (complete) when done
8. Update dependent tasks to unblock them

### Dependency Management
- Tasks marked `[?]` are blocked by dependencies
- Check "Dependencies" field for required components
- Build dependencies first before dependent components
- Update dependent task status when dependencies complete

### Content Separation Checklist
For every component, verify:
- [ ] No hard-coded text/labels (except UI labels like "Close", "Menu")
- [ ] All content comes from props or data files
- [ ] TypeScript interface defined for all data shapes
- [ ] Data stored in `src/data/` or `src/content/`
- [ ] Component works with any data source (could be swapped to CMS)

### Testing Strategy
Each task has an "Acceptance Test" - a specific scenario that proves the component works correctly. Run this test before marking task complete.

---

## Progress Tracking

### Phase 1 Progress: 0/5 (0%)
- [ ] P0-001: Global CSS Setup
- [ ] P0-002: Theme Configuration
- [ ] P1-003: StickerBadge Component
- [ ] P1-004: BrutalistCard Component
- [ ] P1-005: NeoButton Component

### Phase 2 Progress: 0/4 (0%)
- [ ] P0-006: Hero Component (Rebuild)
- [ ] P1-007: CapabilityCard Component (Rebuild)
- [ ] P1-008: WorkCard Component (Rebuild)
- [ ] P1-009: Navbar Component (Rebuild)

### Phase 3 Progress: 0/3 (0%)
- [ ] P2-010: SectionContainer Component
- [ ] P2-011: SectionHeader Component
- [ ] P2-012: Footer Component

### Phase 4 Progress: 0/3 (0%)
- [ ] P3-013: ContactForm Component
- [ ] P3-014: Modal Component
- [ ] P3-015: Accordion Component

### Phase 5 Progress: 0/2 (0%)
- [ ] P2-016: Timeline Component
- [ ] P3-017: Carousel Component

### Phase 6 Progress: 0/10 (0%)
- [ ] P2-018: Showcase/Demo Landing Page
- [ ] P2-019: Button Showcase Page
- [ ] P2-020: Card Showcase Page
- [ ] P2-021: Badge/Sticker Showcase Page
- [ ] P2-022: Typography Showcase Page
- [ ] P2-023: Form Elements Showcase Page
- [ ] P2-024: Layout Components Showcase Page
- [ ] P3-025: Animation Showcase Page
- [ ] P3-026: Icon System Documentation
- [ ] P2-027: BoxedHeading Component

### Overall Progress: 0/27 (0%)

**Breakdown by Priority**:
- P0 (Critical): 0/2 complete
- P1 (High): 0/7 complete
- P2 (Medium): 0/11 complete
- P3 (Low): 0/7 complete

---

## Next Up

**Current Focus**: Phase 1 - Foundation Components

**Next Task**: P0-001: Global CSS Setup (Enhanced with animations and sticker positioning)

**Command to Start**: Use `#file:buildComponent.prompt.md` (auto-selects next task)
