# Hero Component Corrections - Following buildComponent2 Guidelines

## Date: October 3, 2025

## Issues Identified

### 1. ROTH Title Breaking
**Problem**: Using `.badge` class on the title caused it to shrink and not display properly
**Root Cause**: Badge component added DaisyUI badge padding/sizing meant for small labels, not large title elements

### 2. Wrapper Component Anti-Pattern
**Problem**: Created `Badge.astro` wrapper component
**Violation**: buildComponent2.prompt.md explicitly states:
- ❌ "Never create custom class names (override DaisyUI)"
- ✅ "Use standard DaisyUI classes directly"
- ✅ "Add utility classes in global.css"

## Corrections Made

### 1. Added Hero Title Badge Utility Class
**Location**: `src/styles/global.css` (line ~488)

```css
/* Hero title badge - special styling for large title badges */
.hero-title-badge {
    background-color: var(--color-accent);
    color: var(--color-accent-content);
    border-width: 4px;
    border-color: var(--nr-border-color);
    box-shadow: var(--nr-shadow-base);
    padding: 0.5rem 1rem;
    font-weight: 900;
    text-transform: uppercase;
    display: inline-block;
}
```

**Why**: Utility class for special-case title styling, doesn't interfere with DaisyUI's `.badge`

### 2. Updated Hero to Use DaisyUI Classes Directly

**Before** (Wrong - Wrapper Component):
```astro
<Badge variant="secondary" icon={Zap} rotation="-8deg">
  FULL-STACK PM
</Badge>
```

**After** (Correct - DaisyUI Classes):
```astro
<span class="badge badge-secondary sticker rotate-sticker-1">
  <Zap />
  FULL-STACK PM
</span>
```

**Before** (Wrong - Badge on Title):
```astro
<span class="badge badge-accent text-white px-4 py-2 ...">
  <span class="glitch-effect" data-text="ROTH">ROTH</span>
</span>
```

**After** (Correct - Utility Class):
```astro
<span class="hero-title-badge transform -rotate-2 text-4xl md:text-6xl">
  <span class="glitch-effect" data-text="ROTH">ROTH</span>
</span>
```

### 3. Removed Badge.astro Component
**Action**: Deleted `src/components/Badge.astro`
**Reason**: Wrapper components violate the "Override, Don't Extend" principle

## Correct Pattern Per buildComponent2

### When to Create Components
✅ **Create Components**: Complex compositions with slots, logic, or data fetching
- `Hero.astro` - Complex layout with multiple sections
- `WorkCard.astro` - Card with specific data structure
- `Navbar.astro` - Navigation with state/logic

❌ **Don't Create Components**: Simple styling wrappers
- ~~`Badge.astro`~~ - Just use `.badge` classes
- ~~`Button.astro`~~ - Just use `.btn` classes
- ~~`Card.astro`~~ - Just use `.card` classes

### When to Create Utility Classes
✅ **Add to global.css**: Reusable styling patterns
- `.hero-title-badge` - Special title styling
- `.rotate-sticker-1` through `.rotate-sticker-4` - Rotation angles
- `.shadow-brutal`, `.shadow-brutal-lg`, etc. - Shadow utilities
- `.sticker-top-right`, `.sticker-bottom-left`, etc. - Positioning

### Proper Usage Pattern

```astro
<!-- ✅ CORRECT: DaisyUI classes + utility classes -->
<span class="badge badge-primary sticker rotate-sticker-2">
  <Icon />
  TEXT
</span>

<!-- ❌ WRONG: Wrapper component -->
<Badge variant="primary" rotation="5deg">
  TEXT
</Badge>
```

## Benefits of Correct Approach

1. **Theme Portable**: All styling in CSS, works across frameworks
2. **DaisyUI Compliant**: Uses standard class names, theme switching works
3. **No JavaScript**: Pure CSS, no runtime overhead
4. **Maintainable**: Changes in one place (global.css) affect all uses
5. **Predictable**: Standard DaisyUI behavior, no custom abstractions

## Key Takeaways

1. **Read buildComponent2.prompt.md** before creating components
2. **Use DaisyUI classes directly** in markup
3. **Add utility classes** for patterns (rotations, shadows, positioning)
4. **Create components** only for complex compositions, not styling wrappers
5. **Test visual appearance** - ensure elements render as designed

## Files Changed

- ✅ `src/styles/global.css` - Added `.hero-title-badge` utility
- ✅ `src/components/Hero.astro` - Use DaisyUI classes directly
- ✅ Deleted `src/components/Badge.astro` - Removed wrapper component

## Result

- ✅ ROTH title displays correctly in accent color box
- ✅ Badges use standard DaisyUI classes
- ✅ Rotations applied via utility classes
- ✅ Theme-aware colors work automatically
- ✅ Follows buildComponent2 guidelines
