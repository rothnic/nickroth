# Visual Review Log

This file tracks visual reviews performed before pushing code. Each review session should document findings and any fixes applied.

## Review Process

1. Run `pnpm run visual-review` to capture screenshots
2. Review screenshots in `.visual-review/screenshots/`
3. **Check against Review Criteria below**
4. Document findings in this log
5. Fix issues and re-run if needed
6. Commit this log with your changes

## Review Criteria Checklist

Each visual review should verify:

### Contrast & Readability
- [ ] Dark mode text has sufficient contrast against background
- [ ] Inline code is readable in both light and dark mode
- [ ] Links are distinguishable from surrounding text
- [ ] Table text and borders are visible in dark mode

### Spacing & Layout
- [ ] Elements have proper padding from viewport edges
- [ ] Card shadows don't clip against container edges
- [ ] No unexpected layout shifts during navigation

### Components
- [ ] Filter bar position stays stable during navigation
- [ ] Buttons are appropriately sized on mobile
- [ ] Tables scroll horizontally on mobile with visible affordance

---

## Reviews

### 2026-01-08 - Initial Prose Styling Review

**Reviewed by:** Agent (Antigravity)  
**Screenshots captured:** Manual review

**Findings:**
- [x] Dark mode inline code had poor contrast - FIXED (added light magenta color)
- [x] Dark mode bold text in lists not visible - FIXED (added explicit color)
- [x] Tables clip on mobile without scroll affordance - FIXED (gradient fade added)
- [x] List items had too much spacing - FIXED (reduced to 0.25rem)
- [x] Code blocks after headings had too much spacing - FIXED (reduced to 0.75rem)
- [x] Inline code too tall - FIXED (reduced padding)
- [x] Expressive Code theme selector wrong - FIXED (neobrutalism-light/dark)
- [x] Footer buttons too close on mobile - FIXED (btn-sm on mobile, flex-wrap)
- [ ] **Dark mode overall contrast** - PENDING (review needed)
- [ ] **Dark mode work cards**: Right side spacing lost, shadow color wrong - PENDING
- [ ] **Filter bar shift**: Bar shifts up when navigating /work → /work/category/* - PENDING

**Status:** ⏳ Three issues remaining

---

## Outstanding Issues for Playwright Tests

### Filter Bar Position Stability
- **Pages**: `/work` → `/work/category/ai-application`
- **Expected**: Filter bar Y position should remain stable during view transition
- **Actual**: Filter bar shifts up slightly
- **Test idea**: Capture filter bar bounding rect before/after navigation, assert Y position unchanged

### Dark Mode Contrast Review
- **Areas to audit**: 
  - Table text color
  - Link text color
  - Body text color against background
  - Card shadow color (should be lighter for visibility)
- **Fix approach**: Increase lightness values for dark mode text colors

### Dark Mode Card Shadow
- **Page**: `/work` in dark mode
- **Expected**: Card shadows use appropriate dark mode color
- **Actual**: Black shadow on dark background loses right-side visual spacing
- **Fix needed**: Update shadow color for dark theme

---

### Template for New Reviews

```markdown
### YYYY-MM-DD - Description

**Reviewed by:** [Name/Agent]  
**Screenshots captured:** [Number]

**Findings:**
- [ ] Issue description - Status

**Status:** ⏳ Pending / ✅ Complete
```
