# Neobrutalist Personal Site - Design System Guide

## Table of Contents
- [Design Philosophy](#design-philosophy)
- [Visual Design Principles](#visual-design-principles)
- [Color System](#color-system)
- [Typography System](#typography-system)
- [Component Architecture](#component-architecture)
- [Layout System](#layout-system)
- [Interactive Effects](#interactive-effects)
- [Component Inventory](#component-inventory)
- [Implementation Guidelines](#implementation-guidelines)
- [Responsive Design Strategy](#responsive-design-strategy)

---

## Design Philosophy

### Core Principles
**Component-First Development**: Every UI element should be a reusable, configurable component. Never build pages from scratch - always compose from existing components.

**Neobrutalist Aesthetic**: Bold, uncompromising design with chunky borders, dramatic shadows, high contrast, and raw geometric shapes. Embraces imperfection and authenticity.

**Content-First Architecture**: Components → Blocks → Pages hierarchy where:
- **Components**: Single-purpose, reusable UI elements
- **Blocks**: Complex compositions of multiple components for specific use cases
- **Pages**: Compositions of blocks with minimal custom markup

---

## Visual Design Principles

### Neobrutalist Elements
- **Chunky Borders**: Minimum 2px, typically black (#000000)
- **Dramatic Shadows**: Hard drop shadows using `[Xpx_Ypx_0px_0px_rgba(0,0,0,1)]` format
- **High Contrast**: Pure whites (#ffffff) against deep blacks (#000000)
- **Raw Geometry**: Minimal border radius, sharp corners, geometric shapes
- **Sticker Aesthetics**: Slight rotations (-3deg to 2deg) and overlapping elements
- **Organic Dividers**: CSS clip-path shapes for section transitions
- **Intentional Imperfection**: Subtle irregularities and playful positioning

### Interactive Design Language
- **Hover Lift**: Elements move up and expand shadows on hover
- **Rotation Effects**: Subtle rotation changes on interaction
- **Glitch Effects**: Optional text distortion on hover using dual-layer animation
- **Color Pop**: Bright accent colors on hover states
- **Smooth Transitions**: 200ms ease-in-out for all state changes

---

## Color System

### Primary Colors
- **Black**: `#000000` - Borders, text, emphasis elements
- **White**: `#ffffff` - Backgrounds, inverted text
- **Gray Scale**: Various opacity levels of black for subtle elements

### Accent Colors
- **Electric Blue**: `#00ffff` - High-energy interactions
- **Hot Pink**: `#ff0080` - Attention-grabbing elements
- **Lime Green**: `#50fa7b` - Success states and highlights
- **Purple**: `#8b5cf6` - Brand accent and special elements
- **Orange**: `#f97316` - Warning states and energy
- **Red**: `#ef4444` - Error states and urgent actions

### Background Gradients
- **Blue-Purple**: `from-blue-50 to-purple-50`
- **Purple-Pink**: `from-purple-50 to-pink-50`
- **Green-Blue**: `from-green-50 to-blue-50`
- **Orange-Red**: `from-orange-50 to-red-50`
- **Custom combinations** for specific sections

### Usage Guidelines
- **High Contrast**: Always ensure sufficient contrast for accessibility
- **Accent Sparingly**: Use bright colors as accents, not dominant elements
- **Context Appropriate**: Match color intensity to content importance
- **Consistent Pairing**: Establish color relationships and maintain them

---

## Typography System

### Font Families
- **Display Font** (`font-display`): Space Grotesk - Headers, titles, emphasis
- **Body Font** (default): System font stack - Body text, descriptions
- **Mono Font** (`font-mono`): JetBrains Mono - Code, technical content
- **Glitch Font** (`font-glitch`): Rubik Glitch - Special effects only

### Hierarchy & Sizing
Typography relies on semantic HTML defaults with custom CSS variables:
- **H1**: Large display text for page titles
- **H2**: Section headers and major divisions
- **H3**: Subsection headers
- **H4**: Content group headers
- **P**: Body text with consistent line-height
- **Code**: Monospace for technical content

### Typography Rules
- **No Tailwind Font Classes**: Rely on globals.css defaults unless specifically overriding
- **Semantic HTML First**: Use proper heading hierarchy
- **Display Font for Impact**: Space Grotesk for headlines and emphasis
- **Consistent Line Heights**: 1.5 ratio across all text elements

---

## Component Architecture

### Architectural Layers

#### Layer 1: Base Components
Single-purpose, highly reusable elements:
- **Typography**: DisplayHeading, Text, SplitHeading, BoxedHeading, ColoredHeading
- **Buttons**: NeoButton, IconButton with variants (black, white, colored, outline)
- **Cards**: BaseCard foundation with specialized variants
- **Layout**: SectionContainer, SectionHeader, PageLayout
- **Effects**: HoverCard, RotationWrapper, Marquee

#### Layer 2: Content Components
Specific-purpose components with business logic:
- **Navigation**: Main site navigation with dropdown functionality
- **Timeline**: Interactive resume timeline with animations
- **CapabilitiesGrid**: Skills and expertise display
- **ContactForm**: User interaction forms
- **BlogPost**: Content rendering with table of contents

#### Layer 3: Block Components
Complex compositions for specific use cases:
- **HeroBlock**: Complete hero section with stickers and animations
- **ContactCTABlock**: "Ready to work together?" call-to-action
- **BackgroundCTABlock**: "Learn about my background" transition
- **CapabilitiesMarqueeBlock**: Dynamic scrolling skills display
- **ResumeLinksBlock**: Resume and writing access section

#### Layer 4: Page Compositions
Minimal compositions of blocks and components:
- Pages should primarily arrange blocks with minimal custom markup
- Standard page structure using PageLayout wrapper
- Consistent section organization using SectionContainer

### Component Design Principles
- **Single Responsibility**: Each component has one clear purpose
- **Configuration Over Customization**: Props-driven variants vs custom styling
- **Composition Friendly**: Components work well together
- **Accessibility First**: Proper semantic HTML and ARIA support
- **Performance Conscious**: Lazy loading and optimized rendering

---

## Layout System

### Container Strategy
- **PageLayout**: Standard page wrapper (nav + main + footer)
- **SectionContainer**: Flexible section wrapper with variants:
  - `hero`: Gradient background, larger padding, border-bottom
  - `content`: Standard padding, optional backgrounds
  - `cta`: Centered content, call-to-action styling
  - `full-width`: Edge-to-edge content when needed

### Spacing System
- **Base Unit**: 4px for all spacing calculations
- **Common Scales**: 4, 8, 12, 16, 20, 24, 32, 48, 64px
- **Responsive Scaling**: Use `clamp()` for fluid spacing
- **Consistent Gaps**: Standardized gaps between elements

### Grid & Flexbox Patterns
- **CSS Grid**: For complex 2D layouts (capabilities, timeline)
- **Flexbox**: For 1D layouts and component arrangements
- **Auto-fit Grids**: Responsive card layouts without media queries
- **Gap Properties**: Prefer gap over margin for layout spacing

### Responsive Breakpoints
- **Mobile First**: Start with mobile design, scale up
- **Container Queries**: Use for component-level responsiveness
- **Fluid Typography**: Scale text with viewport using clamp()
- **Touch Targets**: Minimum 44px for interactive elements

---

## Interactive Effects

### Hover Effects
- **Lift and Shadow**: Elements rise with expanded shadow
- **Color Transitions**: Background/border color changes
- **Scale Effects**: Subtle size increases (1.02-1.05x)
- **Rotation Shifts**: Small rotation adjustments on hover

### Animation Principles
- **Duration**: 200ms for most interactions, 300ms for complex effects
- **Easing**: `ease-in-out` for natural feeling motion
- **Transform Origin**: Consider rotation and scale centers
- **Performance**: Use transform and opacity for smooth animations

### Glitch Effects
- **Text Glitch**: Dual-layer color-shifted animation on hover
- **Subtle Application**: Use sparingly for emphasis
- **Performance Optimization**: CSS-only implementation
- **Accessibility**: Respect `prefers-reduced-motion`

### Marquee Animations
- **Infinite Scroll**: Seamless looping content
- **Direction Control**: Left and right scrolling variants
- **Speed Variation**: Different speeds for visual hierarchy
- **Smooth Performance**: Hardware-accelerated transforms

---

## Component Inventory

### Layout Components
```
PageLayout              - Standard page wrapper with nav/main/footer
SectionContainer        - Flexible section wrapper with variants
SectionHeader          - Standardized section headers with highlights
OrganicDivider         - Section transitions with clip-path shapes
```

### Typography Components
```
DisplayHeading         - Configurable headings (xs-5xl sizes)
SplitHeading          - Multi-word headings with different styling
BoxedHeading          - Headings with colored background boxes
ColoredHeading        - Gradient and solid color text effects
Text                  - Styled paragraph text with variants
GlitchText           - Text with optional glitch hover effects
```

### Interactive Elements
```
NeoButton            - Primary buttons (black/white/colored/outline)
IconButton           - Buttons with icons (sm/md/lg sizes)
StickerBadge         - Rotated badge-style elements
BackButton           - Reusable navigation back button
```

### Card Components
```
BaseCard             - Foundation card with consistent styling
ContentCard          - General content with header/body/footer
ProjectCard          - Specialized project displays
MetricCard           - Statistics and metrics display
ProfileCard          - Team member or profile information
FeatureCard          - Feature highlights and descriptions
TestimonialCard      - Customer/user testimonials
GraphPaperCard       - Cards with graph paper texture
```

### Effect Components
```
HoverCard            - Consistent hover effects wrapper
RotationWrapper      - Rotation effects with hover states
Marquee              - Scrolling content with direction control
```

### List Components
```
ListContainer        - Wrapper for list groups with spacing
ListItemComponent    - Individual items with icons and states
```

### Complex Components
```
Navigation           - Main site navigation with dropdown
Timeline             - Interactive resume timeline
CapabilitiesGrid     - Skills and expertise display
ContactForm          - User interaction forms
Footer               - Consistent site footer
```

### Block Components
```
HeroBlock            - Complete hero with stickers and animations
ContactCTABlock      - "Ready to work together?" sections
BackgroundCTABlock   - "Learn about my background" transitions
CapabilitiesMarqueeBlock - Dynamic scrolling skills display
ResumeLinksBlock     - Resume and writing access section
```

### Blog Components
```
EnhancedBlogPost     - Complete blog post rendering
BlogMeta             - Post metadata (date, author, read time)
TableOfContents      - Auto-generated TOC from headings
CodeBlock            - Syntax-highlighted code blocks
Quote                - Styled blockquotes
Callout              - Highlighted information boxes
ImageWithCaption     - Images with captions
```

---

## Implementation Guidelines

### Development Workflow
1. **Identify Patterns**: Look for repeated UI patterns before coding
2. **Extract Components**: Create reusable components for common patterns
3. **Build Blocks**: Compose complex functionality from multiple components
4. **Compose Pages**: Arrange blocks with minimal custom markup
5. **Refactor Continuously**: Improve component reusability over time

### Code Organization
```
/components/
├── [BaseComponents]     # Core reusable components
├── /demo/              # Display and showcase components
├── /effects/           # Interaction and animation wrappers
├── /lists/             # List and list item components
├── /blog/              # Blog-specific components
└── /ui/                # UI library components

/blocks/                # Complex reusable compositions
/pages/                 # Page-level compositions
/styles/                # Global styles and design tokens
/data/                  # Content and configuration data
```

### Styling Guidelines
- **Tailwind Classes**: Use for layout, spacing, colors
- **Custom CSS**: For complex animations and effects
- **CSS Variables**: For consistent design tokens
- **No Font Size Classes**: Rely on semantic HTML defaults
- **Component Scoped**: Keep styles close to components

### Accessibility Standards
- **Semantic HTML**: Use proper HTML elements
- **ARIA Labels**: For interactive elements
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliance minimum
- **Screen Reader**: Compatible component structures
- **Reduced Motion**: Respect user preferences

### Performance Optimization
- **Component Lazy Loading**: Load components when needed
- **Image Optimization**: Proper formats and sizes
- **CSS Optimization**: Minimize unused styles
- **Bundle Splitting**: Separate demo/showcase code
- **Animation Performance**: Use transform and opacity

---

## Responsive Design Strategy

### Mobile-First Approach
- **Start Small**: Design for mobile screens first
- **Progressive Enhancement**: Add features for larger screens
- **Touch Friendly**: 44px minimum tap targets
- **Readable Text**: Appropriate sizes for mobile reading

### Breakpoint Strategy
- **Small**: 0-640px (mobile phones)
- **Medium**: 641-1024px (tablets)
- **Large**: 1025-1440px (laptops/desktops)
- **Extra Large**: 1441px+ (large displays)

### Fluid Design Principles
- **Flexible Grids**: Use CSS Grid auto-fit for responsive cards
- **Fluid Typography**: clamp() for scalable text
- **Container Queries**: Component-level responsiveness
- **Flexible Spacing**: Responsive padding and margins

### Content Priority
- **Essential First**: Show most important content on mobile
- **Progressive Disclosure**: Reveal more detail on larger screens
- **Navigation Simplification**: Collapsible/drawer patterns for mobile
- **Performance Considerations**: Lighter experiences on mobile

---

## Usage Examples

### Building a New Section
```typescript
// ✅ Preferred: Component Composition
<SectionContainer variant="content" background="white">
  <SectionHeader 
    title="New Section"
    highlight={{ text: "Amazing", color: "purple" }}
    subtitle="Description of this section"
    size="lg"
  />
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <ContentCard>
      <Text size="lg">Card content using reusable components</Text>
      <NeoButton variant="black">Take Action</NeoButton>
    </ContentCard>
  </div>
</SectionContainer>

// ❌ Avoid: Custom Markup
<section className="py-16 lg:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="font-display text-4xl font-black mb-4">
        New <span className="text-purple-600">Amazing</span> Section
      </h2>
      // ... custom markup
    </div>
  </div>
</section>
```

### Creating Interactive Elements
```typescript
// Hover effects using wrapper components
<HoverCard effect="lift">
  <RotationWrapper rotation={-2} hoverRotation={0}>
    <ContentCard>
      <DisplayHeading size="lg">Interactive Card</DisplayHeading>
      <Text>Content with consistent hover effects</Text>
    </ContentCard>
  </RotationWrapper>
</HoverCard>
```

### Building Complex Blocks
```typescript
// Block composition from multiple components
<ContactCTABlock 
  title="Ready to work together?"
  subtitle="Let's discuss your project needs"
  buttonLabel="Get in touch"
  onButtonClick={() => navigate('/contact')}
  background="gradient-purple"
/>
```

---

## Future Considerations

### Scalability
- **Design System Evolution**: Document and version component changes
- **Performance Monitoring**: Track component render performance
- **Accessibility Auditing**: Regular accessibility testing
- **User Testing**: Validate design decisions with real users

### Technology Evolution
- **Framework Agnostic**: Design system principles apply across technologies
- **Progressive Enhancement**: Support for emerging web features
- **Performance Budget**: Maintain fast loading experiences
- **Accessibility Standards**: Stay current with WCAG guidelines

### Maintenance Strategy
- **Component Documentation**: Keep component APIs documented
- **Testing Strategy**: Unit and integration testing for components
- **Version Control**: Track design system changes
- **Feedback Loops**: Regular review and improvement cycles

---

*This design system guide serves as the foundation for consistent, scalable, and maintainable implementation of the neobrutalist personal site across any technology stack.*