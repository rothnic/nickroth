# Visual Review Log

This file tracks visual reviews performed before pushing code. Each review session should document findings and any fixes applied.

## Review Process

1. Run `pnpm run visual-review` to capture screenshots
2. Review screenshots in `.visual-review/screenshots/`
3. Document findings below
4. Fix issues and re-run if needed
5. Commit this log with your changes

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
- [ ] **Dark mode work cards**: Right side spacing lost, shadow color wrong - PENDING
- [ ] **Filter bar shift**: Bar shifts up when navigating /work → /work/category/* - PENDING (needs Playwright regression test)

**Status:** ⏳ Two issues remaining

---

## Outstanding Issues for Playwright Tests

### Filter Bar Position Stability
- **Pages**: `/work` → `/work/category/ai-application`
- **Expected**: Filter bar Y position should remain stable during view transition
- **Actual**: Filter bar shifts up slightly
- **Test idea**: Capture filter bar bounding rect before/after navigation, assert Y position unchanged

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
