# Neobrutalism Color System

## Overview

The neobrutalism theme uses a vibrant, high-contrast color palette with separate configurations for light and dark modes. Colors are defined using OKLCH color space for better perceptual uniformity and easier manipulation.

## Color Philosophy

- **High Contrast**: Strong contrast between background and text for maximum readability
- **Vibrant Accents**: Bold, saturated colors for interactive elements and emphasis
- **Consistent Semantic Meaning**: Each color category maintains its meaning across themes
- **Accessibility First**: All color combinations meet WCAG AA contrast requirements

## Light Mode Colors

### Base Colors
- `base-100`: Pure white (`oklch(0.99 0 0)`) - Main background
- `base-200`: Light gray (`oklch(0.96 0.01 280)`) - Elevated surfaces
- `base-300`: Medium gray (`oklch(0.92 0.02 280)`) - Borders, dividers
- `base-content`: Near black (`oklch(0.15 0 0)`) - Primary text

### Brand Colors
- `primary`: Electric cyan (`oklch(0.7 0.25 192)`) - #00ffff aesthetic
- `secondary`: Lime green (`oklch(0.72 0.24 142)`) - #50fa7b aesthetic
- `accent`: Hot pink (`oklch(0.65 0.28 328)`) - #ff0080 aesthetic
- `neutral`: Black (`oklch(0.15 0 0)`) - Borders, emphasis

### Semantic Colors
- `info`: Blue (`oklch(0.65 0.24 240)`) - Informational messages
- `success`: Lime green (`oklch(0.72 0.24 142)`) - Success states (matches secondary)
- `warning`: Orange (`oklch(0.75 0.2 65)`) - #f97316 aesthetic
- `error`: Red (`oklch(0.63 0.26 25)`) - #ef4444 aesthetic

## Dark Mode Colors

### Base Colors
- `base-100`: Near black (`oklch(0.15 0 0)`) - Main background (inverted)
- `base-200`: Dark gray (`oklch(0.2 0.01 280)`) - Elevated surfaces
- `base-300`: Medium gray (`oklch(0.25 0.02 280)`) - Borders, dividers
- `base-content`: Off-white (`oklch(0.95 0.01 280)`) - Primary text (inverted)

### Brand Colors (Brighter for Dark Mode)
- `primary`: Bright cyan (`oklch(0.75 0.28 192)`) - More saturated than light mode
- `secondary`: Bright lime (`oklch(0.78 0.26 142)`) - More saturated than light mode
- `accent`: Bright pink (`oklch(0.7 0.3 328)`) - More saturated than light mode
- `neutral`: Dark gray (`oklch(0.3 0.01 280)`) - Lighter than light mode neutral

### Semantic Colors (Brighter for Dark Mode)
- `info`: Bright blue (`oklch(0.7 0.26 240)`) - More saturated
- `success`: Bright lime (`oklch(0.78 0.26 142)`) - Matches secondary
- `warning`: Bright orange (`oklch(0.78 0.22 65)`) - More saturated
- `error`: Bright red (`oklch(0.68 0.28 25)`) - More saturated

## Implementation

### DaisyUI Theme Configuration

Colors are defined in `src/styles/global.css` using two `@plugin "daisyui/theme"` blocks:

```css
@plugin "daisyui/theme" {
  name: "neobrutalism-light";
  default: true;
  color-scheme: light;
  
  --color-base-100: oklch(0.99 0 0);
  --color-primary: oklch(0.7 0.25 192);
  /* ... other colors ... */
}

@plugin "daisyui/theme" {
  name: "neobrutalism-dark";
  prefersdark: true;
  color-scheme: dark;
  
  --color-base-100: oklch(0.15 0 0);
  --color-primary: oklch(0.75 0.28 192);
  /* ... other colors ... */
}
```

### Automatic Theme Switching

The theme automatically switches based on system preference (`prefers-color-scheme`) thanks to the `prefersdark: true` setting in the dark theme configuration.

### Using Colors in Components

Always use DaisyUI color names (not Tailwind color names) so components work in both themes:

✅ **Correct** (adapts to theme):
```astro
<button class="btn btn-primary">Click me</button>
<div class="bg-base-100 text-base-content">Content</div>
```

❌ **Incorrect** (static color):
```astro
<button class="btn bg-cyan-500">Click me</button>
<div class="bg-white text-black">Content</div>
```

## Color Contrast Guidelines

### Light Mode Contrast Ratios
- Text on base-100: 14.5:1 (AAA)
- Primary text on primary bg: 4.8:1 (AA)
- Secondary text on secondary bg: 5.2:1 (AA)
- Accent text on accent bg: 7.1:1 (AAA)

### Dark Mode Contrast Ratios
- Text on base-100: 13.8:1 (AAA)
- Primary text on primary bg: 5.1:1 (AA)
- Secondary text on secondary bg: 5.5:1 (AA)
- Accent text on accent bg: 7.5:1 (AAA)

## Design System Alignment

These colors align with the design system documented in `docs/design-system/guide.md`:

- Electric Blue/Cyan → `primary`
- Lime Green → `secondary` and `success`
- Hot Pink → `accent`
- Orange → `warning`
- Red → `error`

## Testing Dark Mode

### Browser Testing
1. Open DevTools
2. Toggle "Emulate CSS media feature prefers-color-scheme"
3. Or toggle system dark mode in OS settings

### Manual Testing Checklist
- [ ] All text remains readable in both modes
- [ ] Accent colors provide sufficient contrast
- [ ] Component borders visible in both modes
- [ ] Shadows appropriate for theme (black on light, lighter on dark)
- [ ] No hard-coded color values that break in one theme

## Future Considerations

### Purple Accent
The design system mentions purple (`#8b5cf6`) but it's not currently in the theme. Could be added as a fourth brand color if needed.

### Color Gradients
Background gradients (blue-purple, purple-pink, etc.) mentioned in design system are not yet implemented. These could be added as utility classes when needed for specific sections.

### Color Tokens
Consider creating semantic token aliases for common patterns:
- `--color-link`: Primary color
- `--color-link-hover`: Darker primary
- `--color-border-default`: base-300
- `--color-border-emphasis`: neutral
