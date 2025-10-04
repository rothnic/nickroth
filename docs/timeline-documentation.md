# Timeline Feature Documentation

## Overview

The timeline feature provides a comprehensive, CMS-ready solution for displaying career phases and related projects on the `/background` page. Built with daisyUI 5 and following the neobrutalism design system.

## Quick Start

### Basic Usage

```astro
---
import TimelineRenderer from '../components/TimelineRenderer.astro';
---

<TimelineRenderer />
```

### With Options

```astro
<TimelineRenderer 
  view="timeline"    <!-- timeline|cards|list -->
  density="normal"   <!-- compact|normal|spacious -->
/>
```

## Content Collections

### Phases

Create phase files in `src/content/phases/`:

```yaml
---
era: "2019–Present"
title: "Director of Product Management"
oneliner: "Brief description (max 160 characters)"
focus:
  - "Focus area 1"
  - "Focus area 2"
  - "Focus area 3"
skills:
  - "Skill 1"
  - "Skill 2"
  - "..."
metrics:
  - { label: "Metric name", value: "+400%" }
  - { label: "Another metric", value: "10×" }
artifacts:
  - { label: "Document", href: "/path/to/file.pdf", type: "link" }
  - { label: "Screenshot", href: "/images/demo.png", type: "image" }
bridge: "Connection to next phase"
current: true
featured: true
---

Optional body content in markdown.
```

### Projects

Create project files in `src/content/projects/`:

```yaml
---
title: "Project Name"
summary: "Brief project description"
phase: "primary-phase-slug"
phases: ["additional-phase-slug"]
tags: ["Tag1", "Tag2"]
tech: ["Tech1", "Tech2"]
impact:
  - { label: "Impact metric", value: "+20%" }
links:
  - { label: "Demo", href: "https://example.com" }
weight: 10
featured: true
---

Project details in markdown.
```

## Features

### Progressive Disclosure
- Phases collapsed by default
- Click to expand details
- Native HTML `<details>`/`<summary>`

### Smart Content Display
- **Skills**: Shows 8, +N for overflow
- **Metrics**: Displays up to 4 per phase
- **Projects**: Shows 3 per phase, +N for more
- **Artifacts**: Links for documents, modal for media

### Deep Linking
Share links to specific phases:
```
/background#director-platform-growth
```

Automatically opens and scrolls to the phase.

### View Modes
Control via `?view=` query parameter:
- `timeline` (default) - Vertical timeline with dots
- `cards` - Grid layout
- `list` - Simple stacked view

### Density Control
Control via `?density=` query parameter:
- `compact` - Minimal spacing
- `normal` (default) - Standard spacing
- `spacious` - Generous spacing

## Components

### TimelineRenderer
Main orchestrator component that queries content collections and renders phases.

**Props:**
- `view?: 'timeline' | 'cards' | 'list'` (default: 'timeline')
- `density?: 'compact' | 'normal' | 'spacious'` (default: 'normal')

### PhaseCard
Individual phase display with collapse/expand functionality.

**Features:**
- Era and title display
- Current phase indicator
- Project preview badges
- Expandable details (focus, metrics, skills, artifacts)

### MetricsRow
Stats display component using daisyUI stats.

**Limits:**
- Maximum 4 metrics shown
- Graceful truncation

### BadgeList
Skills/tags display with overflow handling.

**Features:**
- Shows first 8 items
- "+N more" toggle for overflow
- Expandable detail view

### ProjectPreviewList
Inline project badge display.

**Features:**
- Shows first 3 projects
- "+N more" link to phase page

### ArtifactModal
Media viewer dialog for images/videos.

**Features:**
- Native HTML dialog
- Focus trap
- Esc to close

## Styling

### Neobrutalism Design
- 4px borders (black in light, white in dark)
- Hard shadows (8px 8px 0px 0px)
- 0 border-radius (square corners)
- Bold typography (font-weight: 900)

### DaisyUI Components
- `timeline` - Vertical layout structure
- `collapse` - Expand/collapse mechanism
- `stats` - Metrics display
- `badge` - Tags and labels
- `modal` - Media viewer
- `status` - Phase indicators

## Accessibility

- ✅ Semantic HTML (details, summary, dialog)
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader support
- ✅ Focus management
- ✅ WCAG AA contrast

## Performance

- ✅ Zero JavaScript for styling
- ✅ Native browser features
- ✅ SSG-friendly (pre-rendered)
- ✅ Progressive enhancement

## Browser Support

- Chrome/Edge (native support)
- Firefox (native support)
- Safari (native support)
- Mobile browsers (responsive)

Requires support for:
- `<details>` / `<summary>`
- `<dialog>` element
- CSS Grid and Flexbox

## Customization

### Adding New Phases

1. Create `src/content/phases/your-phase.mdx`
2. Follow schema structure
3. Rebuild site

### Adding Projects

1. Create `src/content/projects/your-project.mdx`
2. Link to phase(s) via slug
3. Set weight for ordering
4. Rebuild site

### Styling Adjustments

Override in global CSS:
```css
.timeline {
  /* Timeline customization */
}

.collapse {
  /* Phase card customization */
}
```

## Troubleshooting

### Phase not showing
- Check MDX frontmatter is valid YAML
- Verify schema compliance
- Check for build errors

### Deep link not working
- Ensure phase slug matches file name
- Check JavaScript loaded
- Verify URL hash format

### Dark mode issues
- Check theme is set in HTML
- Verify CSS variables defined
- Test with theme switcher

## Examples

See `/background` page for live implementation.

## Support

For issues or questions:
- Check build logs for validation errors
- Verify content schema compliance
- Review browser console for JavaScript errors
