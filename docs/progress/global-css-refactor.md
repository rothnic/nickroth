# Global CSS Refactor - CSS Nesting

**Date**: October 3, 2025  
**Task**: Refactor `global.css` to eliminate repetitive theme selectors using CSS nesting  
**File**: `/Users/nroth/workspace/nickroth/src/styles/global.css`

## Summary

Completely refactored the `global.css` file from **1030 lines** to **~850 lines** (17% reduction) by implementing CSS nesting to eliminate repetitive `[data-theme]` selectors.

## Changes Made

### Before (Old Pattern)
```css
:is([data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]) .btn {
    /* styles */
}

:is([data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]) .btn:hover {
    /* styles */
}

:is([data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]) .btn:active {
    /* styles */
}

[data-theme="neobrutalism-dark"] .texture-grain::before {
    /* dark mode styles */
}
```

### After (New Pattern with CSS Nesting)
```css
[data-theme="neobrutalism-light"],
[data-theme="neobrutalism-dark"] {
    .btn {
        /* styles */
        
        &:hover { /* styles */ }
        &:active { /* styles */ }
    }
}

[data-theme="neobrutalism-dark"] {
    .texture-grain::before {
        /* dark mode styles */
    }
}
```

## File Structure

### 1. **Theme-Agnostic Utilities** (No theme scoping)
- Fonts (`.font-display`, `.font-mono`, `.font-glitch`)
- Automatic text colors for `bg-*` classes
- Shadow utilities (`.shadow-brutal-*`)
- Sticker rotations (`.rotate-sticker-*`)
- Button rotation angles (`.btn-rotate-*`)
- Border radius utilities (`.rounded-brutal-*`)
- Hover effects (`.hover-lift`, `.hover-scale`, `.hover-rotate`)
- Sticker positioning (`.sticker-top-left`, etc.)
- Organic clip paths (`.organic-top`, `.organic-bottom`, `.organic-both`)

### 2. **Shared Styles** (Both Themes)
Nested under `[data-theme="neobrutalism-light"], [data-theme="neobrutalism-dark"]`:
- Buttons (`.btn` and all variants/states using `&` nesting)
- Cards (`.card`)
- Badges (`.badge` and color variants)
- Form elements (`.input`, `.textarea`, `.select`, `.file-input`, `.checkbox`, `.radio`, `.toggle`)
- Navigation (`.navbar`, `.tabs-bordered`)
- Utility components (`.toast`, `.collapse`, `.tooltip`)
- Hero components (`.hero-title-badge`, `.hero-title`, `.hero-card-frame`, etc.)
- Sticker effect (`.sticker`)

### 3. **Light Mode Overrides**
Nested under `[data-theme="neobrutalism-light"]`:
- Button borders (black: `#000000`)
- Auto-applied black borders for `bg-*` classes
- Graph paper texture (black lines with `rgba(0, 0, 0, 0.08)`)
- Hero background gradient (light colors)

### 4. **Dark Mode Overrides**
Nested under `[data-theme="neobrutalism-dark"]`:
- Button borders (white: `#ffffff`)
- Auto-applied white borders for `bg-*` classes
- Graph paper texture (white lines with `rgba(255, 255, 255, 0.08)`)
- Hero background gradient (dark colors)

### 5. **Shared Effects** (Not theme-dependent)
- Texture grain base structure (`:before` styles in theme-specific sections)
- Glitch effect keyframes and classes
- Animation keyframes (marquee, spin-slow, bounce-slow, sway, pulse-shadow)
- Scroll animations (fade-in-up, slide-in-left, slide-in-right, scale-in)
- View transitions

## Benefits

1. ✅ **17% smaller file** (~1030 → ~850 lines)
2. ✅ **Eliminated repetition** - No more `[data-theme="..."]` or `:is()` on every rule
3. ✅ **Better organization** - Clear sections for shared vs theme-specific styles
4. ✅ **Easier maintenance** - Add new components in one place, theme overrides in another
5. ✅ **Modern CSS** - Uses native CSS nesting (`&` selector)
6. ✅ **More readable** - Nested pseudo-selectors make relationships clear

## Testing Required

- [ ] Test light mode (default)
- [ ] Test dark mode (system preference)
- [ ] Verify all button states (hover, active, focus, disabled)
- [ ] Check all badge variants (primary, secondary, accent, etc.)
- [ ] Verify form element styling
- [ ] Test card hover effects
- [ ] Verify graph paper texture in both modes
- [ ] Check hero background gradients
- [ ] Test glitch effects
- [ ] Verify all animations work
- [ ] Check scroll animations trigger properly

## Backup

Original file backed up to: `/Users/nroth/workspace/nickroth/src/styles/global-old.css`

If any issues arise, restore with:
```bash
mv src/styles/global.css src/styles/global-nested.css
mv src/styles/global-old.css src/styles/global.css
```

## Technical Notes

### CSS Nesting Syntax
- `&` represents the parent selector (e.g., `.btn &:hover` = `.btn:hover`)
- Nested selectors automatically inherit parent context
- Works with pseudo-classes (`:hover`, `:active`, `:focus-visible`)
- Works with pseudo-elements (`::before`, `::after`)
- Supported in all modern browsers (2023+)

### Theme Architecture
- **Theme variables** defined in `@plugin "daisyui/theme"` blocks at top of file
- **Shared styles** use theme variables (automatically adapt to active theme)
- **Theme-specific overrides** only for styles that can't use variables (e.g., hard-coded colors like `#000000` for borders)

## Related Files
- Main file: `/Users/nroth/workspace/nickroth/src/styles/global.css`
- Backup: `/Users/nroth/workspace/nickroth/src/styles/global-old.css`
- Hero component: `/Users/nroth/workspace/nickroth/src/components/Hero.astro`

## Next Steps
1. Test in browser (both light and dark modes)
2. If successful, delete `global-old.css` backup
3. Update documentation if needed
4. Apply same nested pattern to any future theme additions
