# Prototype Summary - Living Resume Portfolio

This doc contains details about a prototype that was built using react. This does not
serve as a specification for exactly what to do. Anything used from this doc should be
confirmed before utlizing. This is for reference only.

## Technical Architecture

### Framework & Build System
- **Primary Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React hooks with persistent KV storage for navigation state
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui v4 component library
- **Animation**: Framer Motion for page transitions and micro-interactions

### Project Structure
```
src/
├── components/
│   ├── ui/                    # shadcn components (pre-installed)
│   ├── Navigation.tsx         # Main navigation component
│   ├── pages/                 # Page components
│   │   ├── HomePage.tsx
│   │   ├── WorkPage.tsx
│   │   ├── WorkDetailPage.tsx
│   │   ├── ApproachPage.tsx
│   │   ├── BackgroundPage.tsx
│   │   └── ContactPage.tsx
│   └── [feature-components]   # Feature-specific components
├── data/                      # Static data and content
├── lib/                       # Utilities and helpers
├── hooks/                     # Custom React hooks
└── styles/                    # Additional styling
```

## Design System

### Color Palette (Softened Brutalist)
```css
:root {
  /* Base colors - warm, approachable neutrals */
  --background: oklch(0.98 0.01 280);      /* Very light warm white */
  --foreground: oklch(0.15 0.05 280);      /* Deep charcoal with purple tint */
  --card: oklch(0.96 0.02 280);            /* Light card background */
  --card-foreground: oklch(0.15 0.05 280); /* Card text */
  
  /* Action colors - vibrant but not harsh */
  --primary: oklch(0.65 0.2 140);          /* Vibrant teal-green */
  --primary-foreground: oklch(0.98 0.01 280); /* Light text on primary */
  --secondary: oklch(0.7 0.15 60);         /* Warm yellow-orange */
  --secondary-foreground: oklch(0.15 0.05 280); /* Dark text on secondary */
  --accent: oklch(0.7 0.2 320);            /* Bright magenta-pink */
  --accent-foreground: oklch(0.98 0.01 280); /* Light text on accent */
  
  /* Supporting colors */
  --muted: oklch(0.92 0.02 280);           /* Muted background */
  --muted-foreground: oklch(0.5 0.05 280); /* Muted text */
  --destructive: oklch(0.6 0.2 15);        /* Warm red for destructive actions */
  --destructive-foreground: oklch(0.98 0.01 280);
  
  /* Interface colors */
  --border: oklch(0.15 0.05 280);          /* Strong borders for brutalist feel */
  --input: oklch(0.92 0.02 280);           /* Input backgrounds */
  --ring: oklch(0.65 0.2 140);             /* Focus ring color */
  
  /* Border radius for softened brutalism */
  --radius: 8px;
}
```

### Typography System
```css
/* Primary font: Space Grotesk - Modern, geometric, friendly */
/* Monospace: JetBrains Mono - Technical content and code */

/* Font loading in index.html */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* Typography hierarchy */
.text-hero     { font-size: 3.5rem; font-weight: 700; line-height: 1.1; }
.text-h1       { font-size: 2.5rem; font-weight: 600; line-height: 1.2; }
.text-h2       { font-size: 2rem; font-weight: 600; line-height: 1.3; }
.text-h3       { font-size: 1.5rem; font-weight: 500; line-height: 1.4; }
.text-body     { font-size: 1rem; font-weight: 400; line-height: 1.6; }
.text-caption  { font-size: 0.875rem; font-weight: 400; line-height: 1.4; }
.text-mono     { font-family: 'JetBrains Mono', monospace; }
```

### Softened Brutalist Visual Effects
```css
/* Custom shadow and border utilities */
.brutal-shadow {
  box-shadow: 6px 6px 0px oklch(0.15 0.05 280 / 0.4);
}

.brutal-shadow-sm {
  box-shadow: 3px 3px 0px oklch(0.15 0.05 280 / 0.3);
}

.brutal-shadow-lg {
  box-shadow: 8px 8px 0px oklch(0.15 0.05 280 / 0.5);
}

.brutal-border {
  border: 2px solid oklch(0.15 0.05 280 / 0.6);
}

.brutal-hover {
  transition: all 0.2s ease;
}

.brutal-hover:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px oklch(0.15 0.05 280 / 0.3);
}
```

## Component Specifications

### Navigation Component
```tsx
interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

// Features:
// - Sticky navigation with backdrop blur
// - Active state indicators
// - Mobile-responsive hamburger menu
// - Smooth transitions between states
// - Logo/headshot integration
```

### Work Card Component
```tsx
interface WorkCardProps {
  id: string;
  title: string;
  impact: string;
  stack: string[];
  thumbnail: string;
  onNavigate: (page: string, workId: string) => void;
}

// Features:
// - Brutalist styling with soft shadows
// - Hover animations with transform
// - View Transition API integration
// - Stack tag display
// - Impact statement prominence
```

### Work Detail Page
```tsx
interface WorkDetailProps {
  workId: string;
  onNavigate: (page: string) => void;
}

// Features:
// - Hero image with View Transition from card
// - Structured content sections
// - Stack and metrics display
// - Related work suggestions
// - Back navigation with animation
```

### Metric Badge Component
```tsx
interface MetricBadgeProps {
  value: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

// Features:
// - Large, bold value display
// - Descriptive label
// - Color variants for different contexts
// - Brutalist styling with strong borders
```

### Capability Card Component
```tsx
interface CapabilityCardProps {
  title: string;
  summary: string;
  tags: string[];
  order: number;
}

// Features:
// - Icon integration
// - Tag display with color coding
// - Brutalist hover effects
// - Clear hierarchy with title/summary
```

## Animation & Interaction Patterns

### View Transitions (Work Cards → Details)
```tsx
// Transition configuration for smooth card-to-page animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

// Element mapping for View Transition API
<div data-view-transition-name={`work-${workId}`}>
  <img src={thumbnail} alt={title} />
  <h3>{title}</h3>
</div>
```

### Micro-Interactions
- **Hover States**: Subtle transform with shadow adjustment
- **Button Presses**: Quick scale animation with shadow reduction
- **Card Interactions**: Lift effect with enhanced shadow
- **Focus States**: Strong outline with theme ring color
- **Loading States**: Skeleton animations with brutalist aesthetics

### Page Transitions
- **Enter**: Fade in from bottom with slight bounce
- **Exit**: Fade out to top with scale reduction
- **Duration**: 300-400ms for professional feel
- **Easing**: "ease-out" for natural movement

## Layout Patterns

### Grid System
```css
/* Base grid for different content types */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.grid-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.grid-capabilities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
```

### Responsive Breakpoints
```css
/* Mobile-first approach */
.container {
  max-width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding: 3rem;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
    padding: 4rem;
  }
}
```

## State Management

### Navigation State
```tsx
// Persistent navigation state using useKV hook
const [currentPage, setCurrentPage] = useKV('current-page', 'home');
const [selectedWorkId, setSelectedWorkId] = useKV('selected-work-id', '');

// Navigation handler
const handleNavigate = (page: string, workId?: string) => {
  setCurrentPage(page);
  if (workId) {
    setSelectedWorkId(workId);
  }
};
```

### Content State
```tsx
// Non-persistent UI state for form inputs, filters, etc.
const [searchQuery, setSearchQuery] = useState('');
const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [isLoading, setIsLoading] = useState(false);
```

## Performance Optimizations

### Asset Management
```tsx
// Explicit asset imports for optimized bundling
import heroImage from '@/assets/images/hero-headshot.jpg';
import workThumbnail from '@/assets/images/work/project-thumb.jpg';

// Usage in components
<img src={heroImage} alt="Nick Roth" className="rounded-lg" />
```

### Code Splitting
```tsx
// Lazy loading for page components
const WorkDetailPage = lazy(() => import('@/components/pages/WorkDetailPage'));

// Usage with Suspense
<Suspense fallback={<PageSkeleton />}>
  <WorkDetailPage workId={selectedWorkId} onNavigate={handleNavigate} />
</Suspense>
```

### Image Optimization
- Use WebP format with JPEG fallbacks
- Implement responsive images with srcset
- Lazy load images below the fold
- Compress images to appropriate quality levels

## Accessibility Requirements

### Keyboard Navigation
- Tab order follows visual hierarchy
- All interactive elements focusable
- Skip links for main content areas
- Escape key closes modals/menus

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for complex interactions
- Alt text for all meaningful images
- Proper heading hierarchy (h1 → h2 → h3)

### Color & Contrast
- WCAG AA compliance (4.5:1 minimum)
- Color not sole indicator of meaning
- Focus indicators clearly visible
- High contrast mode support

## Build & Deployment

### Development Setup
```bash
npm install
npm run dev  # Start development server
```

### Production Build
```bash
npm run build     # Generate production build
npm run preview   # Preview production build locally
```

### Environment Configuration
```env
# Required environment variables
VITE_CONTACT_FORM_ENDPOINT=
VITE_ANALYTICS_ID=
```

### Deployment Targets
- **Primary**: Static hosting (Vercel, Netlify, Cloudflare Pages)
- **Requirements**: Node.js 18+, npm 9+
- **Build Output**: Static files in `dist/` directory
- **SPA Mode**: Client-side routing with fallback to index.html