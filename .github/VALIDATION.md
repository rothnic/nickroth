# Validation Checklists

Quick yes/no checklists to verify task completion. Helps catch issues early before marking tasks complete.

---

## Phase 1: Foundation & Homepage Hero

### P0-001: Global CSS Setup ✓
- [ ] All DaisyUI components (.btn, .card, .badge, .input) have 2-6px black borders
- [ ] All shadows are hard-edged (no blur radius)
- [ ] Shadow utilities (.shadow-brutal-sm/md/lg/xl) render correctly
- [ ] Rotation utilities (.rotate-sticker-1/2/3/4) display correct angles
- [ ] Sticker positioning utilities work with badges
- [ ] Hover effects (.hover-lift, .hover-scale, .hover-rotate) function on hover
- [ ] Scroll animations (.fade-in-up, .slide-in-left) trigger on scroll
- [ ] animations.js script loads and Intersection Observer works
- [ ] No console errors on test page

### P0-002: Theme Configuration ✓
- [ ] Primary color renders as cyan (#22d3ee)
- [ ] Secondary color renders as lime (#bef264)
- [ ] Accent color renders as yellow (#fde047)
- [ ] Neutral color is black (#000000)
- [ ] Base-100 is white (#ffffff)
- [ ] All colors vibrant and high-contrast
- [ ] Colors work with black borders (good contrast)

### P0-003: StickerBadge Component ✓
- [ ] Component renders with all variants (primary, secondary, accent, etc.)
- [ ] Component renders with all sizes (xs, sm, md, lg, xl)
- [ ] Rotations (1-4) display correct angles (-8deg, 5deg, -3deg, 12deg)
- [ ] Badge has 2px black border
- [ ] Badge text is bold and uppercase
- [ ] Showcase page displays all variants + sizes + rotations
- [ ] Sticker-container positioning works (top-left, top-right, bottom-left, bottom-right)
- [ ] Data file created in src/data/hero.ts with badge data
- [ ] No hard-coded badge content in component

### P0-004: NeoButton Component ✓
- [ ] Button renders with all variants (primary, secondary, accent, neutral)
- [ ] Button renders with all sizes (xs, sm, md, lg, xl)
- [ ] Button has 4px black border
- [ ] Button has 6px hard shadow
- [ ] Button lifts on hover (translate + shadow change)
- [ ] Button depresses on active (more translate)
- [ ] Showcase page displays all variants + sizes
- [ ] Button works as <a> when href provided
- [ ] Button works as <button> when no href
- [ ] Icon support works (before/after text)

### P0-005: Hero Section ✓
- [ ] Hero renders with gradient background
- [ ] StickerBadge components display (floating badges)
- [ ] NeoButton components display (CTA buttons)
- [ ] Headshot image displays
- [ ] All content from src/data/hero.ts (no hard-coded text)
- [ ] Hero is responsive (mobile: stack, tablet: side-by-side, desktop: spread)
- [ ] Badge positioning works correctly
- [ ] Buttons link to correct pages
- [ ] Floating shapes/decorations render (if applicable)

---

## Phase 2: Homepage Content

### P0-006: BrutalistCard Component ✓
- [ ] Card renders with 4px black border
- [ ] Card has 8px hard shadow
- [ ] Card supports rotations (1-4)
- [ ] Card supports shadow sizes (sm, md, lg, xl)
- [ ] Card works with optional image
- [ ] Card-body slot accepts content
- [ ] Showcase page displays all variants
- [ ] No hard-coded content in component

### P0-007: CapabilityCard ✓
- [ ] CapabilityCard extends/uses BrutalistCard
- [ ] Icon displays prominently
- [ ] Title renders with correct typography
- [ ] Description text displays
- [ ] Card uses capability data from collection
- [ ] Capabilities grid renders 1 col mobile, 3 cols desktop
- [ ] All capabilities display on homepage
- [ ] No hard-coded capability text

### P0-008: WorkCard ✓
- [ ] WorkCard extends/uses BrutalistCard
- [ ] Featured image displays
- [ ] Title and description render
- [ ] Tags/badges display
- [ ] Link to work detail page works
- [ ] Card uses work data from collection
- [ ] Featured work displays on homepage (filtered)
- [ ] Grid layout responsive (1 col mobile, 2 cols desktop)

### P0-009: Recent Updates Section ✓
- [ ] Section header displays
- [ ] Recent notes/posts display (limited to 3-5)
- [ ] Each note shows title, date, excerpt
- [ ] Dates format correctly
- [ ] Links to individual notes work
- [ ] "View All" link present and functional
- [ ] Styled with cards or list format
- [ ] Content from notes collection

---

## Phase 3: Navigation & Layout

### P1-010: Navbar ✓
- [ ] Logo/site name displays
- [ ] Navigation links render (Work, About, Contact, etc.)
- [ ] Mobile menu toggle button works
- [ ] Mobile menu opens/closes
- [ ] Active page indicator shows
- [ ] Navbar sticky/fixed positioning (if applicable)
- [ ] Navbar data from navigation data file
- [ ] No hard-coded nav links

### P1-011: Footer ✓
- [ ] Copyright text displays
- [ ] Social links render with icons
- [ ] Footer navigation links work
- [ ] Footer layout responsive
- [ ] Background color contrasts with page
- [ ] Footer data from data file
- [ ] No hard-coded text

### P1-012: Section Components ✓
- [ ] SectionContainer provides consistent spacing
- [ ] SectionHeader component standardized
- [ ] Container max-width set appropriately
- [ ] Padding responsive (smaller on mobile)
- [ ] Section background variants work
- [ ] Components reusable across pages

---

## Phase 4: Work & About Pages

### P1-013: Work List Page ✓
- [ ] Page title and description display
- [ ] All work items render in grid
- [ ] WorkCard components display each project
- [ ] Filter/sort options work (if applicable)
- [ ] Responsive grid (1 col mobile, 2-3 cols desktop)
- [ ] Images load correctly
- [ ] Links to detail pages work
- [ ] SEO metadata complete

### P1-014: Work Detail Pages ✓
- [ ] Project hero/header displays
- [ ] All content sections render
- [ ] Images display with captions
- [ ] Markdown content formats correctly
- [ ] Tags/categories display
- [ ] Navigation to next/previous project works
- [ ] Back to work list link present
- [ ] SEO metadata complete

### P1-015: About Page ✓
- [ ] Page hero displays
- [ ] Bio/background content renders
- [ ] Profile image displays
- [ ] Content sections organized logically
- [ ] Links to other pages work
- [ ] Responsive layout
- [ ] SEO metadata complete

### P1-016: Contact Page ✓
- [ ] Contact form displays
- [ ] Form fields styled consistently
- [ ] Form validation works
- [ ] Submit button functional
- [ ] Alternative contact methods listed (email, social)
- [ ] Form accessible (labels, aria attributes)
- [ ] Success/error states handle gracefully
- [ ] SEO metadata complete

---

## Phase 5: Polish

### P1-017: Approach/Process Page ✓
- [ ] Page content displays
- [ ] Process steps/phases outlined
- [ ] Visual elements (icons, diagrams) render
- [ ] Content organized logically
- [ ] Links to related work examples
- [ ] Responsive layout
- [ ] SEO metadata complete

### P1-018: Background/Resume Page ✓
- [ ] Experience timeline/list displays
- [ ] Education section renders
- [ ] Skills/capabilities listed
- [ ] Download resume button works (if applicable)
- [ ] Content from JSON Resume data
- [ ] Organized into clear sections
- [ ] Responsive layout
- [ ] SEO metadata complete

---

## Phase 6: Theme Completion

### P2-019: Showcase Landing Page ✓
- [ ] Landing page displays all component categories
- [ ] Navigation to individual showcases works
- [ ] Visual examples for each category
- [ ] Introduction text explains theme
- [ ] Call-to-action for theme purchase (if applicable)
- [ ] Responsive layout
- [ ] SEO optimized for theme sales

### P2-020: Typography Showcase ✓
- [ ] All heading levels (h1-h6) display
- [ ] Paragraph styles shown
- [ ] List styles (ul, ol) demonstrated
- [ ] Link styles visible
- [ ] Code/monospace examples
- [ ] Text color variations
- [ ] Font sizes and weights labeled

### P2-021: Form Elements Showcase ✓
- [ ] Input fields (text, email, password, etc.)
- [ ] Select dropdowns
- [ ] Textareas
- [ ] Checkboxes
- [ ] Radio buttons
- [ ] Toggles
- [ ] Form validation states (error, success)
- [ ] Labels and helper text examples

### P2-022: Layout Components Showcase ✓
- [ ] Grid layouts (2, 3, 4 columns)
- [ ] Flexbox layouts
- [ ] Container sizes
- [ ] Section spacing examples
- [ ] Responsive breakpoint demonstrations
- [ ] Sidebar layouts

### P2-023: Animation Showcase ✓
- [ ] Hover effects demonstrated
- [ ] Scroll animations trigger
- [ ] Loading animations
- [ ] Transition examples
- [ ] All animations CSS-based
- [ ] Performance acceptable

### P3-024: BoxedHeading Component ✓
- [ ] Text displays in bordered boxes
- [ ] Variants work (colors, sizes)
- [ ] Rotation options function
- [ ] Showcase page complete
- [ ] Integrated into at least one page

### P3-025: Icon System ✓
- [ ] Icon components created (15-20 SVGs)
- [ ] Icons consistent size/style
- [ ] Icons work in buttons, links, headings
- [ ] Icons respond to text color
- [ ] Showcase displays all icons
- [ ] No React icon library dependencies

### P3-026: Modal Component ✓
- [ ] Modal opens on trigger
- [ ] Modal closes on backdrop click
- [ ] Modal closes on ESC key
- [ ] Modal content customizable
- [ ] Modal sizes work (sm, md, lg, full)
- [ ] Modal accessible (focus trap, aria)
- [ ] Showcase demonstrates all variants

### P3-027: Accordion Component ✓
- [ ] Accordion expands/collapses on click
- [ ] Multiple items work independently
- [ ] "Open one at a time" mode works
- [ ] Icons indicate open/closed state
- [ ] Smooth transitions
- [ ] Accessible (keyboard navigation)
- [ ] Showcase demonstrates variants

### P3-028: Carousel Component ✓
- [ ] Carousel displays images
- [ ] Navigation buttons work (prev/next)
- [ ] Indicator dots show current slide
- [ ] Auto-play option works (if applicable)
- [ ] Touch/swipe gestures work on mobile
- [ ] Responsive (images scale appropriately)
- [ ] Showcase demonstrates options

---

## General Validation (Apply to All Tasks)

### Content Separation ✓
- [ ] No hard-coded text in components (except UI labels)
- [ ] All content from collections, data files, or props
- [ ] TypeScript interfaces defined for data shapes
- [ ] Data structures flat (CMS-friendly)

### DaisyUI Standards ✓
- [ ] Uses standard DaisyUI class names
- [ ] Overrides in global.css (not custom classes)
- [ ] No JavaScript styling libraries (clsx, tailwind-variants)
- [ ] Component works with slot content

### Neobrutalism Aesthetic ✓
- [ ] Borders 2-6px black
- [ ] Shadows hard-edged (no blur)
- [ ] Colors vibrant and high-contrast
- [ ] Rotations subtle (-8deg to 12deg)
- [ ] Spacing uses 4px base unit

### Performance ✓
- [ ] No console errors
- [ ] Fast page load (<3s)
- [ ] Images optimized
- [ ] CSS-only animations (or vanilla JS)
- [ ] Minimal JavaScript bundle

### Responsive Design ✓
- [ ] Mobile (375px) layout works
- [ ] Tablet (768px) layout works
- [ ] Desktop (1024px+) layout works
- [ ] No horizontal scrolling
- [ ] Touch targets adequate size (44px+)

### Accessibility ✓
- [ ] Semantic HTML used
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Keyboard navigation works

### SEO ✓
- [ ] Title tag present (<60 chars)
- [ ] Meta description present (<160 chars)
- [ ] OpenGraph tags (if applicable)
- [ ] Canonical URL set
- [ ] Structured data (if applicable)

---

## Quick Completion Check

Before marking task `[x]` complete:

1. **Visual Check**: Does it look right? (borders, shadows, colors, spacing)
2. **Functional Check**: Does it work? (links, buttons, forms, animations)
3. **Content Check**: Is all content external? (no hard-coded text)
4. **Responsive Check**: Does it adapt to screen sizes? (mobile, tablet, desktop)
5. **Error Check**: Any console errors? (JavaScript, CSS, network)
6. **Acceptance Test**: Does the specific test in backlog pass?

If all 6 checks pass → Mark `[x]` and move to next task.

If any fail → Fix issues and re-check before completing.
