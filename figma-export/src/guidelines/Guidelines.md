# Neobrutalist Personal Site - Development Guidelines

## Table of Contents
- [Philosophy: Component-First Development](#philosophy-component-first-development)
- [Design System & Visual Identity](#design-system--visual-identity)
- [Component Architecture](#component-architecture)
- [Reusable Components Inventory](#reusable-components-inventory)
- [Page Layout Patterns](#page-layout-patterns)
- [Components Needing Refactoring](#components-needing-refactoring)
- [Typography & Styling Guidelines](#typography--styling-guidelines)
- [Development Best Practices](#development-best-practices)

---

## Philosophy: Component-First Development

### **🎯 Core Principle**
**Always build with reusable components first, never build pages from scratch.**

### **✅ Component-First Approach**
1. **Identify patterns** before building new pages
2. **Extract repeated elements** into reusable components
3. **Build flexible, configurable components** that can adapt to multiple use cases
4. **Compose pages from components** rather than writing custom markup
5. **Maintain consistent experience** across all pages and sections

### **❌ Anti-Patterns to Avoid**
- Writing section markup directly in page files
- Duplicating layout patterns across pages
- Hard-coding content that could be made configurable
- Creating one-off components that can't be reused

---

## Design System & Visual Identity

### **🎨 Neobrutalist Design Principles**
- **Bold, chunky borders** (2px minimum, typically black)
- **Dramatic shadows** using `shadow-[Xpx_Ypx_0px_0px_rgba(0,0,0,1)]` format
- **High contrast** with clean whites and pure blacks
- **Raw geometric shapes** with minimal border radius
- **Sticker-style elements** with slight rotations and overlapping
- **Mixed typography** with Space Grotesk, JetBrains Mono, and Fredoka One
- **Organic shape dividers** using CSS clip-path
- **Subtle glitch effects** for interactive elements

### **🌈 Color System**
- **Primary**: Black (`#000000`) for borders, text, and emphasis
- **Accent Colors**: Bright, saturated colors (cyan, lime, purple, orange, red)
- **Gradient Backgrounds**: Subtle color gradients (`from-blue-50 to-purple-50`)
- **Interactive States**: Clean hover effects with border and background changes

---

## Component Architecture

### **📁 Component Organization**
```
/components/
├── [MainComponents]      # Core site components (Hero, Navigation, etc.)
├── /blocks/             # Reusable applications of multiple components
├── /effects/            # Reusable effect components (hover, rotation, etc.)
├── /lists/              # List and list item components
├── /demo/               # Reusable demo/display components  
├── /blog/               # Blog-specific components
├── /ui/                 # ShadCN UI components
└── /figma/              # Figma integration components
```

### **🏗️ Component Types**

#### **Layout Components**
- `PageLayout` - Standard page wrapper with nav + main + footer
- `SectionContainer` - Consistent section wrapper with variants, backgrounds, borders, and responsive height control
- `SectionHeader` - Standardized section heading with flexible styling and highlight options

#### **Block Components** (`/components/blocks/`)
- `HeroBlock` - Complete hero section with all elements and interactions
- `ContactCTABlock` - Reusable "Ready to work together?" CTA section
- `BackgroundCTABlock` - Reusable "Learn about my background" CTA section
- `ResumeLinksBlock` - Resume download and writing links section
- Blocks are reusable applications of multiple components for specific use cases

#### **Effect Components** (`/components/effects/`)
- `HoverCard` - Consistent hover effects (lift, scale, rotate, glow)
- `RotationWrapper` - Reusable rotation and hover rotation effects
- These components wrap content to add consistent interactive effects

#### **List Components** (`/components/lists/`)
- `ListContainer` - Wrapper for list groups with spacing variants
- `ListItemComponent` - Individual list items with icons, hover states, and interactions

#### **Content Components**
- Main components for specific content types (Timeline, CapabilitiesGrid, etc.)
- Should be focused on a single responsibility
- Should accept props for customization

#### **Display Components** (`/components/demo/`)
- `DisplayHeading` - Configurable headings with size, weight, color options
- `SplitHeading` - Multi-word headings with different styling per word
- `BoxedHeading` - Headings with background boxes and rotation
- `Text` - Styled paragraph text with consistent spacing
- `NeoButton` / `IconButton` - Button components with neobrutalist styling

#### **UI Components** (`/components/ui/`)
- ShadCN-based components for forms, dialogs, etc.
- Customized to match neobrutalist design system

---

## Reusable Components Inventory

### **✅ Well-Componentized Areas**
- **Navigation & Footer**: Consistently used across all pages
- **Blog System**: Complete component system for blog posts and content
- **Demo Components**: Comprehensive set of reusable display components
- **Content Blocks**: Hero, Timeline, CapabilitiesGrid, etc. are well-abstracted

### **✅ Available Reusable Components**

#### **Layout & Structure**
- `PageLayout` - Standard page wrapper with nav + main + footer
- `SectionContainer` - Consistent section wrapper with variants and backgrounds
- `SectionHeader` - Standardized section headers with highlights and sizing
- `CTASection` - Reusable CTA sections with title, subtitle, and button
- `BackButton` - Reusable back button for demo and sub pages
- `DemoPageHeader` - Complete header pattern for demo showcase pages
- `Navigation` - Main site navigation with dropdown demo menu
- `Footer` - Consistent footer across all pages
- `OrganicDivider` - Section dividers with organic shapes

#### **Blocks & Complex Components**
- `HeroBlock` - Complete hero section with stickers, animations, and CTAs
- `ContactCTABlock` - Reusable "Ready to work together?" section
- `BackgroundCTABlock` - Reusable "Learn about my background" section  
- `ResumeLinksBlock` - Resume download and writing links section
- `CapabilitiesMarqueeBlock` - Dynamic capabilities section with dual-direction marquees, SVG icons, and animated tech stack (matches original HTML exactly)

#### **Effects & Interactions**
- `HoverCard` - Consistent hover effects (lift, scale, rotate, glow)
- `RotationWrapper` - Reusable rotation effects with hover states
- `Marquee` - Scrolling text/content marquee with configurable direction and speed

#### **Lists & Navigation**
- `ListContainer` - Wrapper for list groups with spacing variants
- `ListItemComponent` - Individual list items with icons and hover states

#### **Typography & Text**
- `DisplayHeading` - Configurable headings (size: xs|sm|md|lg|xl|2xl|3xl|4xl|5xl)
- `SplitHeading` - Multi-word headings with different variants per word
- `BoxedHeading` - Headings with colored background boxes
- `ColoredHeading` - Headings with gradient or solid color effects
- `Text` - Styled paragraph text with size and color variants
- `GlitchText` - Text with optional glitch hover effects

#### **Interactive Elements**
- `NeoButton` - Primary button component (variants: black, white, colored, outline)
- `IconButton` - Buttons with icons (sizes: sm, md, lg)
- `StickerBadge` - Rotated badge-style elements

#### **Cards & Content Blocks**
- `BaseCard` - Foundation card component with consistent styling
- `ContentCard` - General content card with header/body/footer
- `ProjectCard` - Specialized for project displays
- `MetricCard` - For displaying statistics and metrics
- `ProfileCard` - For team member or profile information
- `FeatureCard` - For feature highlights
- `TestimonialCard` - For customer/user testimonials
- `GraphPaperCard` - Card with graph paper background texture

#### **Blog Components**
- `EnhancedBlogPost` - Complete blog post rendering
- `BlogMeta` - Post metadata (date, author, read time)
- `TableOfContents` - Auto-generated TOC from headings
- `CodeBlock` - Syntax-highlighted code blocks
- `Quote` - Styled blockquotes
- `Callout` - Highlighted information boxes
- `ImageWithCaption` - Images with captions

#### **List Components**
- `ListContainer` - Wrapper for list groups
- `ListItem` - Individual list items with icons, subtitles, hover states
- `ListSeparator` - Visual separators between list items
- `ListHeading` - Section headers within lists

---

## Page Layout Patterns

### **📋 Standard Page Structure**
Every page should follow this consistent structure:

```tsx
export function [PageName]() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <SectionContainer variant="hero">
        <SectionHeader 
          title="Page Title"
          subtitle="Page description"
          highlight="colored"
        />
        {/* Page-specific hero content */}
      </SectionContainer>

      {/* Content Sections */}
      <SectionContainer>
        <SectionHeader 
          title="Section Title"
          subtitle="Section description"
        />
        {/* Section content using reusable components */}
      </SectionContainer>

      {/* Additional sections as needed */}
    </PageLayout>
  );
}
```

### **🎨 Section Variants**
- **Hero sections**: Gradient backgrounds, larger padding, border-bottom
- **Content sections**: Standard padding, optional background colors
- **CTA sections**: Centered content, call-to-action styling

---

## Components Needing Refactoring

### **✅ High Priority Refactoring COMPLETED**

#### **1. PageLayout Component** ✅
**IMPLEMENTED**: `/components/PageLayout.tsx`
- Standard page wrapper with Navigation, main content area, and Footer
- Accepts className prop for customization
- Used in: HomePage, CardsPage, FocusPage (examples implemented)

**Usage**:
```tsx
<PageLayout>
  {/* page content */}
</PageLayout>
```

#### **2. SectionContainer Component** ✅  
**IMPLEMENTED**: `/components/SectionContainer.tsx`
- Consistent section wrapper with max-width and padding
- Configurable variants: 'hero', 'content', 'cta'
- Background options: multiple gradient variants, white, none
- Supports data-cmp attributes for tracking

**Usage**:
```tsx
<SectionContainer variant="hero" background="gradient-blue-purple">
  {/* content */}
</SectionContainer>
```

#### **3. SectionHeader Component** ✅
**IMPLEMENTED**: `/components/SectionHeader.tsx`
- Standardized section headers with title + description
- Configurable highlight colors and text
- Size variants: 'sm', 'md', 'lg', 'xl'
- Alignment options: 'center', 'left'

**Usage**:
```tsx
<SectionHeader 
  title="Title"
  highlight={{ text: "Colored Part", color: "purple" }}
  subtitle="Description text"
  size="lg"
/>
```

#### **4. BackButton Component** ✅
**IMPLEMENTED**: `/components/BackButton.tsx`
- Reusable back button using IconButton component
- Configurable label, variant, and size
- Consistent styling across demo pages

**Usage**:
```tsx
<BackButton
  onClick={() => navigate('/demo')}
  label="Back to Demo"
/>
```

#### **5. DemoPageHeader Component** ✅
**IMPLEMENTED**: `/components/DemoPageHeader.tsx`
- Complete header pattern for demo pages
- Includes back button, split heading, and description
- Motion animations and texture background
- Used in: CardsPage (example implemented)

#### **6. CTASection Component** ✅
**IMPLEMENTED**: `/components/CTASection.tsx`
- Reusable CTA sections with configurable styling
- Supports multiple background variants (white, gray, gradient, custom)
- Configurable text colors and button variants
- Integrated with NeoButton component for consistent styling
- Used in: FocusPage (examples implemented)

**Usage**:
```tsx
<CTASection
  title="Ready to work together?"
  subtitle="Let's discuss how I can help accelerate your product development."
  button={{
    label: "Contact me",
    onClick: () => navigate('/contact'),
    variant: "white"
  }}
  background="gradient"
  textColor="white"
/>
```

### **📋 Current Refactoring Status**

#### **✅ Pages Successfully Refactored**
- `HomePage` - Fully componentized using new layout system
- `FocusPage` - Fully componentized with CTASection components
- `BackgroundPage` - Fully componentized using SectionContainer and SectionHeader  
- `CardsPage` - Fully componentized with DemoPageHeader

#### **🔄 Pages Still Needing Refactoring**
- `WritingPage` - Should use PageLayout, SectionContainer, SectionHeader
- `ContactPage` - Should use PageLayout and new layout components
- `DemoPage` - Should use PageLayout and potentially DemoPageHeader pattern
- Other demo pages (`TypographyPage`, `ButtonsPage`, etc.) - Should use DemoPageHeader pattern

#### **✅ Updated Layout System Features**
- **Border Control**: SectionContainer now supports `borderTop` and `borderBottom` props with 'black' or 'white' options
- **Height Control**: Added `minHeight` prop ('none', 'auto', 'screen', 'section') to prevent hero stretching
- **Full-Width Sections**: Added 'full-width' variant for sections that need edge-to-edge content
- **Background Options**: Extended to include 'black' background for dark sections
- **Flexible Styling**: SectionHeader now supports custom titleClassName and subtitleClassName for special cases

---

## Typography & Styling Guidelines

### **🎯 Font Usage Rules**
- **Display Text** (headings, titles): `font-display` (Space Grotesk)
- **Body Text** (paragraphs, descriptions): Default system font
- **Code/Technical** (code blocks, tech terms): `font-mono` (JetBrains Mono)  
- **Special Effects** (glitch text): `font-glitch` (Rubik Glitch)

### **🎨 Styling Consistency**
- **No font size classes** unless specifically requested (relies on globals.css defaults)
- **Consistent spacing**: Use system spacing scale (4, 8, 12, 16, 20, 24px, etc.)
- **Border weights**: 2px minimum for neobrutalist effect
- **Shadow patterns**: Use `shadow-[Xpx_Ypx_0px_0px_rgba(0,0,0,1)]` format
- **Hover states**: Consistent with navigation dropdown pattern (`border-transparent hover:border-black`)

### **📱 Responsive Design**
- **Mobile-first approach** with `sm:`, `md:`, `lg:` breakpoints
- **Fluid typography** using `clamp()` in globals.css where appropriate
- **Container queries** for complex responsive components
- **Touch-friendly** interactive elements (minimum 44px tap targets)

---

## Development Best Practices

### **🏗️ Component Development**
1. **Start with props interface** - define the API first
2. **Use TypeScript** for all component props and interfaces
3. **Default props** for common configurations
4. **Compound components** for complex UI patterns (like ListContainer + ListItem)
5. **Forwarded refs** when components need to expose DOM elements

### **📁 File Organization**
- **Component per file** with descriptive names
- **Co-locate related components** in appropriate directories
- **Export from index files** for cleaner imports
- **Group by feature** rather than by file type

### **🎯 Performance Considerations**
- **Lazy load** components that aren't immediately visible
- **Optimize images** using appropriate formats and sizes
- **Minimize re-renders** with proper dependency arrays
- **Code splitting** for demo/showcase pages

### **♿ Accessibility**
- **Semantic HTML** as the foundation
- **ARIA labels** for interactive elements
- **Focus management** for navigation and modals
- **Color contrast** meets WCAG standards
- **Screen reader** friendly component structures

### **🧪 Testing Strategy**
- **Component isolation** - test components independently
- **Props validation** - test different prop combinations
- **User interactions** - test hover, click, keyboard navigation
- **Responsive behavior** - test across different screen sizes

---

## Usage Examples

### **✅ Preferred Approach - Using Components**
```tsx
export function NewPage() {
  return (
    <PageLayout>
      <SectionContainer variant="hero">
        <SectionHeader 
          title="My New Page"
          highlight={{ text: "Amazing", color: "purple" }}
          subtitle="This page was built using reusable components"
        />
        <ContentCard>
          <Text size="lg">
            All content is built from existing components
          </Text>
        </ContentCard>
      </SectionContainer>
    </PageLayout>
  );
}
```

### **❌ Anti-Pattern - Building from Scratch**
```tsx
export function NewPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main id="main" className="pt-16">
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl lg:text-6xl font-black mb-4">
                My New <span className="text-purple-600">Amazing</span> Page
              </h1>
              {/* ... custom markup ... */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
```

---

## Next Steps for Implementation

### **🎛️ Immediate Actions Needed**

1. **Create `PageLayout` component** to eliminate repeated page structure
2. **Create `SectionContainer` component** to standardize section layouts  
3. **Create `SectionHeader` component** to standardize section headers
4. **Refactor existing pages** to use new layout components
5. **Create `BackButton` component** for demo pages
6. **Update component exports** for easier importing

### **📈 Future Enhancements**

1. **Theme system** for consistent color management
2. **Animation library** for consistent motion design
3. **Component documentation** with Storybook or similar
4. **Design tokens** for spacing, typography, and colors
5. **Component testing** suite for reliability

---

*This guidelines document should be referenced for all new development and used as the basis for refactoring existing code to improve consistency and maintainability.*