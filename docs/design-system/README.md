# Design System Documentation

This folder contains all design system documentation for the neobrutalism DaisyUI theme.

## Core Documentation

### [Implementation Guide](./implementation.md)
**Complete technical reference for the implemented theme**

Current state documentation showing:
- Three-layer customization strategy (Theme Variables → Component Overrides → Utilities)
- Visual system (borders, shadows, colors, spacing)
- Code patterns and usage examples
- Dark mode implementation
- Troubleshooting guide

**Status**: ✅ Up-to-date with P0-001 implementation

### [Design System Guide](./guide.md)
**Design philosophy and component architecture**

Covers:
- Core principles (component-first, neobrutalist aesthetic, content-first)
- Visual design principles
- Color system philosophy
- Typography system
- Component architecture patterns
- Layout system
- Interactive effects

**Status**: Reference material for design decisions

### [Color System](./colors.md)
**Complete color palette documentation**

Includes:
- Light and dark mode color palettes
- OKLCH values and hex equivalents
- Semantic color usage guidelines
- Contrast ratios
- Implementation examples

**Status**: ✅ Current color specification

### [Grid Background System](./grid-background-system.md)
**Complete documentation of the scrolling grid background architecture**

Covers:
- Three-layer system (background, content, overlays)
- Scrolling grid implementation
- Transparent sections and overlay sections
- Torn edge effect using clip-path
- Z-index hierarchy and performance considerations
- Usage guidelines and troubleshooting

**Status**: ✅ Current implementation (October 2025)

### [Prototype Analysis](./prototype-analysis.md)
**Analysis of React prototype for pattern extraction**

Contains:
- Component showcase architecture patterns
- Sticker positioning system analysis
- Animation migration strategies (Framer Motion → CSS)
- Component variants and configuration patterns
- Effects and interaction patterns

**Status**: Reference material (patterns have been adapted for DaisyUI 5)

## Supporting Files

### [customizing-daisyui-tailwindv4-directives.md](./customizing-daisyui-tailwindv4-directives.md)
Technical notes on DaisyUI 5 + Tailwind CSS 4 customization approaches

### [example-global-styles.md](./example-global-styles.md)
Example CSS patterns (reference only, actual implementation in `src/styles/global.css`)

### [screenshots/](./screenshots/)
Visual reference images from prototype and design mockups

## Quick Navigation

### For Implementation
1. Read **[Implementation Guide](./implementation.md)** - Current technical reference
2. Check **[Grid Background System](./grid-background-system.md)** - Background architecture
3. Check **[Color System](./colors.md)** - Color values and usage
4. Reference **[Design System Guide](./guide.md)** - Design principles

### For Design Decisions
1. Review **[Design System Guide](./guide.md)** - Philosophy and patterns
2. Check **[Prototype Analysis](./prototype-analysis.md)** - Original design intent
3. Reference **[Color System](./colors.md)** - Color choices and rationale

### For New Components
1. Follow **[Implementation Guide](./implementation.md)** - Current patterns
2. Use `.github/prompts/buildComponent2.prompt.md` - Development workflow
3. Reference **[Design System Guide](./guide.md)** - Component architecture

## Document Status

| Document | Status | Purpose |
|----------|--------|---------|
| `implementation.md` | ✅ Current | Technical implementation reference |
| `guide.md` | 📖 Reference | Design philosophy and architecture |
| `colors.md` | ✅ Current | Color specification |
| `grid-background-system.md` | ✅ Current | Grid background architecture |
| `prototype-analysis.md` | 📖 Reference | Pattern extraction from prototype |
| `customizing-daisyui-tailwindv4-directives.md` | 📖 Reference | Technical notes |
| `example-global-styles.md` | 📖 Reference | Code examples |

## Related Documentation

- **P0-001 Progress**: `docs/progress/p0-001.md` - Detailed implementation notes
- **DaisyUI Guidelines**: `.github/instructions/daisyui.instructions.md` - Critical rules
- **Build Workflow**: `.github/prompts/buildComponent2.prompt.md` - Component development process
- **Main Index**: `docs/README.md` - Complete documentation overview

## Maintenance Notes

When updating the design system:

1. **Implementation changes** → Update `implementation.md` with current patterns
2. **Color changes** → Update `colors.md` with new values and usage
3. **Design philosophy changes** → Update `guide.md` principles
4. **New patterns from prototypes** → Add to `prototype-analysis.md`
5. **Always cross-reference** → Keep related docs in sync
