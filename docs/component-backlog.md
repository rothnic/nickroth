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

## Phase 1: Foundation & Homepage Hero

### P0-001: Global CSS Setup
**Priority**: P0 (Site Blocker) | **Status**: `[ ]` | **Dependencies**: None

**Objective**: Establish CSS foundation - the base for all components

**Tasks**:
1. Update `src/styles/global.css` with DaisyUI overrides
2. Add brutalist shadows utilities (sm, md, lg, xl)
3. Add rotation utilities (sticker-1 through sticker-4)
4. Add sticker positioning utilities (sticker-container, sticker positions)
5. Add hover effect utilities (hover-lift, hover-scale, hover-rotate)
6. Add scroll animation utilities (fade-in-up, slide-in-left)
7. Override DaisyUI btn, card, badge classes with neobrutalism
8. Add vanilla JS helper for scroll animations (Intersection Observer)

**Files to Create/Modify**:
- `src/styles/global.css`
- `src/scripts/animations.js`

**Acceptance Test**: Apply `btn btn-primary` - has 4px black border, 6px hard shadow, lifts on hover. Apply `fade-in-up` - animates in on scroll.

---

### P0-002: Theme Configuration
**Priority**: P0 (Site Blocker) | **Status**: `[ ]` | **Dependencies**: None

**Objective**: Configure DaisyUI colors for neobrutalism

**Tasks**:
1. Define color palette (cyan, lime, yellow, fuchsia, black, white)
2. Set semantic colors (primary=cyan, secondary=lime, accent=yellow, neutral=black)
3. Configure base colors (base-100=white, base-200=light gray)

**Files to Create/Modify**:
- `tailwind.config.mjs`

**Acceptance Test**: `bg-primary` renders cyan, `bg-secondary` renders lime, all colors vibrant.

---

### P0-003: StickerBadge Component + Showcase
**Priority**: P0 (Site Blocker) | **Status**: `[?]` | **Dependencies**: P0-001, P0-002

**Objective**: Build badge component for Hero section stickers

**Why Now**: Hero section needs floating badge stickers

**Tasks**:
1. Create `src/components/StickerBadge.astro` (uses DaisyUI badge)
2. Add rotation, size, variant props
3. Create `src/pages/showcase/badges.astro` (all variants demo)
4. Document sticker-container positioning pattern
5. Create data file for Hero badges

**Files to Create/Modify**:
- `src/components/StickerBadge.astro`
- `src/pages/showcase/badges.astro`
- `src/data/hero.ts` (badge data)

**Acceptance Test**: Badge renders with rotation, works standalone and with sticker-container positioning. Showcase page displays all variants.

---

### P0-004: NeoButton Component + Showcase
**Priority**: P0 (Site Blocker) | **Status**: `[?]` | **Dependencies**: P0-001, P0-002

**Objective**: Build button component for Hero CTAs

**Why Now**: Hero needs CTA buttons

**Tasks**:
1. Create `src/components/NeoButton.astro` (uses DaisyUI btn)
2. Support variants, sizes, shadow sizes, icons
3. Create `src/pages/showcase/buttons.astro` (all variants demo)
4. Document button usage patterns

**Files to Create/Modify**:
- `src/components/NeoButton.astro`
- `src/pages/showcase/buttons.astro`

**Acceptance Test**: Button lifts on hover, supports all variants/sizes. Showcase displays all options.

---

### P0-005: Hero Section + Layout
**Priority**: P0 (Site Blocker) | **Status**: `[?]` | **Dependencies**: P0-003, P0-004

**Objective**: Rebuild homepage Hero section with neobrutalism styling

**Why Now**: Hero is the first thing visitors see

**Tasks**:
1. Update `src/components/Hero.astro` with DaisyUI hero classes
2. Add StickerBadge components (floating badges)
3. Add NeoButton components (CTAs)
4. Create `src/data/hero.ts` (all content externalized)
5. Add gradient background, floating shapes (CSS-only)
6. Make responsive

**Files to Create/Modify**:
- `src/components/Hero.astro`
- `src/data/hero.ts`

**Acceptance Test**: Hero renders with badges, buttons, headshot, gradient. No hard-coded content. Responsive layout works.

---

## Phase 2: Homepage Content Sections

### P0-006: BrutalistCard Component + Showcase
**Priority**: P0 (Site Blocker) | **Status**: `[?]` | **Dependencies**: P0-001, P0-002

**Objective**: Build base card for Capabilities and Work sections

**Why Now**: Both Capabilities and Work sections use cards

**Tasks**:
1. Create `src/components/BrutalistCard.astro` (uses DaisyUI card)
2. Support rotation, shadow sizes
3. Create `src/pages/showcase/cards.astro` (all variants demo)

**Files to Create/Modify**:
- `src/components/BrutalistCard.astro`
- `src/pages/showcase/cards.astro`

**Acceptance Test**: Card has thick border, hard shadow, optional rotation. Hover lifts. Showcase displays variants.

---

### P0-007: CapabilityCard Component + Integration
**Priority**: P0 (Site Blocker) | **Status**: `[?]` | **Dependencies**: P0-006

**Objective**: Rebuild CapabilityCard using BrutalistCard

**Why Now**: Capabilities section is on homepage

**Tasks**:
1. Update `src/components/CapabilityCard.astro` to use BrutalistCard
2. Remove hard-coded styling
3. Verify content comes from `src/content/capabilities/`
4. Add to cards showcase page (specialized variant)

**Files to Create/Modify**:
- `src/components/CapabilityCard.astro`
- `src/pages/showcase/cards.astro` (add example)

**Acceptance Test**: Capabilities section renders with cards, lifts on hover, uses collection data.

---

### P0-008: WorkCard Component + Integration
**Priority**: P0 (Site Blocker) | **Status**: `[?]` | **Dependencies**: P0-006, P0-003

**Objective**: Rebuild WorkCard using BrutalistCard + StickerBadge

**Why Now**: Featured Work section is on homepage

**Tasks**:
1. Update `src/components/WorkCard.astro` to use BrutalistCard
2. Add StickerBadge for tags
3. Verify content comes from `src/content/work/`
4. Add to cards showcase page

**Files to Create/Modify**:
- `src/components/WorkCard.astro`
- `src/pages/showcase/cards.astro` (add example)

**Acceptance Test**: Work section renders with cards + tags, uses collection data.

---

### P0-009: Recent Updates Section Styling
**Priority**: P0 (Site Blocker) | **Status**: `[?]` | **Dependencies**: P0-006

**Objective**: Apply neobrutalism to Recent Notes section

**Why Now**: Last section on homepage

**Tasks**:
1. Update `src/pages/index.astro` Recent Updates section
2. Use BrutalistCard or inline neobrutalism styling
3. Verify uses `src/content/notes/` data

**Files to Create/Modify**:
- `src/pages/index.astro`

**Acceptance Test**: Recent notes display with neobrutalism styling, no hard-coded content.

---

## Phase 3: Navigation & Layout

### P1-010: Navbar Component
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P0-004

**Objective**: Rebuild navigation with neobrutalism

**Why Now**: Navigation needed for all pages

**Tasks**:
1. Update `src/components/Navbar.astro`
2. Use NeoButton for mobile menu
3. Add neobrutalism border-bottom
4. Create `src/data/navigation.ts` for menu items
5. Make responsive

**Files to Create/Modify**:
- `src/components/Navbar.astro`
- `src/data/navigation.ts`

**Acceptance Test**: Nav renders with menu items from data, mobile menu works, neobrutalism styling.

---

### P1-011: Footer Component
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P0-001, P0-002

**Objective**: Create site footer with neobrutalism

**Why Now**: Footer needed for all pages

**Tasks**:
1. Create `src/components/Footer.astro`
2. Add DaisyUI footer classes with overrides
3. Create `src/data/footer.ts` for content
4. Border-top-4 black

**Files to Create/Modify**:
- `src/components/Footer.astro`
- `src/data/footer.ts`

**Acceptance Test**: Footer renders with links from data, responsive, neobrutalism styling.

---

### P1-012: Section Components (Container + Header)
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P0-001, P0-002

**Objective**: Create reusable section wrappers

**Why Now**: Standardize section styling across pages

**Tasks**:
1. Create `src/components/Section.astro` (container with bg/padding variants)
2. Create `src/components/SectionHeader.astro` (titles with optional highlights)
3. Add to `src/pages/showcase/layouts.astro`

**Files to Create/Modify**:
- `src/components/Section.astro`
- `src/components/SectionHeader.astro`
- `src/pages/showcase/layouts.astro`

**Acceptance Test**: Sections have consistent styling, headers support color highlights, showcase demonstrates.

---

## Phase 4: Work & About Pages

### P1-013: Work List Page
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P0-008

**Objective**: Build /work page with all projects

**Why Now**: Expand beyond homepage featured work

**Tasks**:
1. Update `src/pages/work/index.astro`
2. Use WorkCard components in grid
3. Add filtering by category (optional)
4. Use Section components

**Files to Create/Modify**:
- `src/pages/work/index.astro`

**Acceptance Test**: All work items display with WorkCard, filterable, responsive.

---

### P1-014: Work Detail Pages
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P0-006, P1-012

**Objective**: Build individual project case study pages

**Why Now**: Link from work cards

**Tasks**:
1. Create `src/pages/work/[...slug].astro`
2. Use BrutalistCard for sections
3. Use SectionHeader for titles
4. Render markdown content from collections

**Files to Create/Modify**:
- `src/pages/work/[...slug].astro`

**Acceptance Test**: Project details render with sections, markdown renders, navigation works.

---

### P1-015: About Page
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P1-012, P0-006

**Objective**: Build about/background page

**Why Now**: Essential personal info page

**Tasks**:
1. Update `src/pages/about.astro`
2. Use Section and BrutalistCard components
3. Create `src/data/about.ts` for content
4. Add optional Timeline component (if needed)

**Files to Create/Modify**:
- `src/pages/about.astro`
- `src/data/about.ts`

**Acceptance Test**: About page renders with sections, cards, no hard-coded content.

---

### P1-016: Contact Page
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P0-004, P0-001

**Objective**: Build contact page with form

**Why Now**: Essential conversion page

**Tasks**:
1. Update `src/pages/contact.astro`
2. Use DaisyUI form classes with neobrutalism overrides
3. Use NeoButton for submit
4. Add form validation states

**Files to Create/Modify**:
- `src/pages/contact.astro`

**Acceptance Test**: Form renders with neobrutalism styling, validation works, submit button correct.

---

## Phase 5: Polish & Missing Features

### P1-017: Approach/Process Page
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P1-012, P0-006

**Objective**: Build approach/process page

**Why Now**: Showcase methodology

**Tasks**:
1. Update `src/pages/approach.astro`
2. Use Section and BrutalistCard
3. Create `src/data/approach.ts`
4. Add step-by-step or timeline layout

**Files to Create/Modify**:
- `src/pages/approach.astro`
- `src/data/approach.ts`

**Acceptance Test**: Approach page renders with sections, clear process steps.

---

### P1-018: Background/Resume Page
**Priority**: P1 (Site Feature) | **Status**: `[?]` | **Dependencies**: P1-012, P0-006

**Objective**: Build background/experience page

**Why Now**: Professional history display

**Tasks**:
1. Update `src/pages/background.astro`
2. Consider Timeline component (or use cards)
3. Create `src/data/experience.ts`
4. Display education, work history

**Files to Create/Modify**:
- `src/pages/background.astro`
- `src/data/experience.ts`
- `src/components/Timeline.astro` (optional)

**Acceptance Test**: Background page displays experience, education, timeline or cards work.

---

### P2-019: Showcase Landing Page
**Priority**: P2 (Theme Expansion) | **Status**: `[?]` | **Dependencies**: P0-003, P0-004, P0-006

**Objective**: Create demo landing page for theme showcase

**Why Now**: After personal site done, showcase theme

**Tasks**:
1. Create `src/pages/showcase/index.astro`
2. List all component categories with cards
3. Link to individual showcase pages
4. Use neobrutalism styling

**Files to Create/Modify**:
- `src/pages/showcase/index.astro`
- `src/data/showcase-categories.ts`

**Acceptance Test**: Landing displays all categories, links work, cards styled correctly.

---

## Phase 6: Theme Completion (Post Personal Site)

### P2-020: Typography Showcase
**Priority**: P2 (Theme Expansion) | **Status**: `[?]` | **Dependencies**: P0-001

**Objective**: Document typography system

**Tasks**:
1. Create `src/pages/showcase/typography.astro`
2. Show all heading levels, fonts, sizes
3. Document guidelines

**Files to Create/Modify**:
- `src/pages/showcase/typography.astro`

**Acceptance Test**: All typography options visible, guidelines clear.

---

### P2-021: Form Elements Showcase
**Priority**: P2 (Theme Expansion) | **Status**: `[?]` | **Dependencies**: P0-001

**Objective**: Document form components

**Tasks**:
1. Create `src/pages/showcase/forms.astro`
2. Show all input types, states
3. Document validation patterns

**Files to Create/Modify**:
- `src/pages/showcase/forms.astro`

**Acceptance Test**: All form elements render with neobrutalism, states visible.

---

### P2-022: Layout Components Showcase
**Priority**: P2 (Theme Expansion) | **Status**: `[?]` | **Dependencies**: P1-012

**Objective**: Document layout components

**Tasks**:
1. Update `src/pages/showcase/layouts.astro`
2. Show Section variants, backgrounds, padding
3. Show SectionHeader examples

**Files to Create/Modify**:
- `src/pages/showcase/layouts.astro`

**Acceptance Test**: All layout options demonstrated, responsive.

---

### P2-023: Animation Showcase
**Priority**: P2 (Theme Expansion) | **Status**: `[?]` | **Dependencies**: P0-001

**Objective**: Document animation utilities

**Tasks**:
1. Create `src/pages/showcase/animations.astro`
2. Show hover effects, scroll animations
3. Document CSS-only approach

**Files to Create/Modify**:
- `src/pages/showcase/animations.astro`

**Acceptance Test**: All animations smooth, CSS-only, documented.

---

### P3-024: BoxedHeading Component
**Priority**: P3 (Nice to Have) | **Status**: `[ ]` | **Dependencies**: P0-001

**Objective**: Text inside colored boxes (used in prototype)

**Why Later**: Not critical for personal site

**Tasks**:
1. Create `src/components/BoxedHeading.astro`
2. Support backgrounds, rotation, borders

**Files to Create/Modify**:
- `src/components/BoxedHeading.astro`

**Acceptance Test**: Renders text in colored boxes with rotation.

---

### P3-025: Icon System
**Priority**: P3 (Nice to Have) | **Status**: `[ ]` | **Dependencies**: None

**Objective**: Extract commonly used icons

**Why Later**: Can use inline SVGs initially

**Tasks**:
1. Extract 15-20 icons from Lucide
2. Create Astro icon components
3. Optional showcase page

**Files to Create/Modify**:
- `src/components/icons/*.astro`

**Acceptance Test**: Icons render, sizes work, colors inherit.

---

### P3-026: Modal Component
**Priority**: P3 (Nice to Have) | **Status**: `[ ]` | **Dependencies**: P0-001

**Objective**: Modal dialog with neobrutalism

**Why Later**: Not currently used on site

**Tasks**:
1. Create `src/components/Modal.astro`
2. Use DaisyUI modal classes

**Files to Create/Modify**:
- `src/components/Modal.astro`

**Acceptance Test**: Modal opens/closes, neobrutalism styling.

---

### P3-027: Accordion Component
**Priority**: P3 (Nice to Have) | **Status**: `[ ]` | **Dependencies**: P0-001

**Objective**: Accordion/collapse with neobrutalism

**Why Later**: May be useful for FAQ

**Tasks**:
1. Create `src/components/Accordion.astro`
2. Use DaisyUI collapse classes

**Files to Create/Modify**:
- `src/components/Accordion.astro`

**Acceptance Test**: Accordion expands/collapses, styled correctly.

---

### P3-028: Carousel Component
**Priority**: P3 (Nice to Have) | **Status**: `[ ]` | **Dependencies**: P0-006

**Objective**: Carousel for images/content

**Why Later**: May be useful for work showcase

**Tasks**:
1. Create `src/components/Carousel.astro`
2. Use DaisyUI carousel classes

**Files to Create/Modify**:
- `src/components/Carousel.astro`

**Acceptance Test**: Carousel scrolls, navigation works.

---

## Implementation Notes

### Component Building Process
1. Check backlog for next `[ ]` task in order
2. Use `#file:buildComponent.prompt.md` (auto-selects task)
3. Build component + showcase page together
4. Integrate into personal site page
5. Verify both showcase and site usage work
6. Mark `[x]` complete and move to next

### Personal Site First Approach
- **Focus**: Get personal site functional quickly
- **Quality**: Each component properly built with showcase
- **Verification**: Test in isolation (showcase) + integration (site)
- **Expansion**: Complete theme library after site works

### Content Separation Checklist
- [ ] No hard-coded text in components (except UI labels)
- [ ] All content from props, data files, or collections
- [ ] TypeScript interfaces for all data shapes
- [ ] Data in `src/data/` or `src/content/`
- [ ] Components work with any data source

---

## Progress Tracking

### Phase 1: Foundation & Homepage Hero (0/5)
- [ ] P0-001: Global CSS Setup
- [ ] P0-002: Theme Configuration
- [ ] P0-003: StickerBadge Component + Showcase
- [ ] P0-004: NeoButton Component + Showcase
- [ ] P0-005: Hero Section + Layout

### Phase 2: Homepage Content Sections (0/4)
- [ ] P0-006: BrutalistCard Component + Showcase
- [ ] P0-007: CapabilityCard Component + Integration
- [ ] P0-008: WorkCard Component + Integration
- [ ] P0-009: Recent Updates Section Styling

### Phase 3: Navigation & Layout (0/3)
- [ ] P1-010: Navbar Component
- [ ] P1-011: Footer Component
- [ ] P1-012: Section Components (Container + Header)

### Phase 4: Work & About Pages (0/4)
- [ ] P1-013: Work List Page
- [ ] P1-014: Work Detail Pages
- [ ] P1-015: About Page
- [ ] P1-016: Contact Page

### Phase 5: Polish & Missing Features (0/2)
- [ ] P1-017: Approach/Process Page
- [ ] P1-018: Background/Resume Page

### Phase 6: Theme Completion (0/10)
- [ ] P2-019: Showcase Landing Page
- [ ] P2-020: Typography Showcase
- [ ] P2-021: Form Elements Showcase
- [ ] P2-022: Layout Components Showcase
- [ ] P2-023: Animation Showcase
- [ ] P3-024: BoxedHeading Component
- [ ] P3-025: Icon System
- [ ] P3-026: Modal Component
- [ ] P3-027: Accordion Component
- [ ] P3-028: Carousel Component

### Overall Progress: 0/28 (0%)

**Personal Site Milestone**: Complete after Phase 5 (18 tasks)  
**Theme Library Milestone**: Complete after Phase 6 (28 tasks)

---

## Next Up

**Current Focus**: Phase 1 - Foundation & Homepage Hero

**Next Task**: P0-001: Global CSS Setup

**Why**: Establishes CSS foundation for all components

**Command**: `#file:buildComponent.prompt.md` (auto-selects next task)

**Personal Site ETA**: After completing P0-001 through P1-018 (18 tasks)
