# Template: Component + Showcase

Use this template for any task that builds a new component with showcase page.

## Checklist

### 1. Component Planning
- [ ] Identify base DaisyUI component (btn, card, badge, etc.)
- [ ] List all variants needed (colors, sizes, styles)
- [ ] List all props needed (variant, size, rotation, custom classes, etc.)
- [ ] Check for dependencies (other components, utilities)
- [ ] Review design guide for similar patterns

### 2. Create Component Interface
- [ ] Define TypeScript `Props` interface
- [ ] Add variant options (primary, secondary, accent, etc.)
- [ ] Add size options (xs, sm, md, lg, xl)
- [ ] Add component-specific props
- [ ] Set sensible defaults

### 3. Implement Component
- [ ] Create component file in `src/components/`
- [ ] Extract props with destructuring
- [ ] Compose classes using string concatenation (no libraries!)
- [ ] Use standard DaisyUI classes
- [ ] Support `<slot />` for content
- [ ] NO hard-coded content (except UI labels like "Loading...")

### 4. Create Data File (If Needed)
- [ ] Create file in `src/data/` (e.g., `hero.ts`, `navigation.ts`)
- [ ] Define TypeScript interfaces for data shape
- [ ] Export data objects/arrays
- [ ] Keep flat structure (CMS-friendly)

### 5. Create Showcase Page
- [ ] Create file in `src/pages/showcase/`
- [ ] Import component
- [ ] Create section for each variant
- [ ] Create section for each size
- [ ] Create section for combinations
- [ ] Add visual examples of all props
- [ ] Test responsive layout

### 6. Validate Component
- [ ] Component renders in isolation (showcase)
- [ ] All variants display correctly
- [ ] All sizes work properly
- [ ] Hover/focus states function
- [ ] Responsive design works
- [ ] No console errors
- [ ] TypeScript types correct

## Component Code Template

```astro
---
// src/components/ComponentName.astro

/**
 * ComponentName - Brief description
 * 
 * @example
 * <ComponentName variant="primary" size="md">
 *   Content here
 * </ComponentName>
 */

interface Props {
  /** Visual variant - affects color scheme */
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  
  /** Size of the component */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Optional rotation for sticker aesthetic */
  rotation?: 1 | 2 | 3 | 4;
  
  /** Additional CSS classes */
  class?: string;
  
  // Add component-specific props here
}

const {
  variant = 'primary',
  size = 'md',
  rotation,
  class: className = ''
} = Astro.props;

// Simple string composition (no libraries!)
const classes = [
  'daisy-component',                          // Base DaisyUI class
  `daisy-component-${variant}`,               // DaisyUI variant
  `daisy-component-${size}`,                  // DaisyUI size
  rotation && `rotate-sticker-${rotation}`,   // Custom utility (if applicable)
  className                                   // User classes
].filter(Boolean).join(' ');
---

<!-- Use standard DaisyUI markup structure -->
<div class={classes}>
  <slot />
</div>
```

## Showcase Page Template

```astro
---
// src/pages/showcase/component-name.astro
import ComponentName from '@/components/ComponentName.astro';
import BaseLayout from '@/layouts/BaseLayout.astro';

const title = 'ComponentName Showcase';
const description = 'All variants and configurations of ComponentName';
---

<BaseLayout title={title} description={description}>
  <main class="container mx-auto p-8 space-y-16">
    <!-- Page Header -->
    <header>
      <h1 class="text-4xl font-black mb-4">{title}</h1>
      <p class="text-lg">{description}</p>
    </header>
    
    <!-- Variants Section -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Variants</h2>
      <div class="flex flex-wrap gap-4">
        <ComponentName variant="primary">Primary</ComponentName>
        <ComponentName variant="secondary">Secondary</ComponentName>
        <ComponentName variant="accent">Accent</ComponentName>
        <ComponentName variant="neutral">Neutral</ComponentName>
      </div>
    </section>
    
    <!-- Sizes Section -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Sizes</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <ComponentName size="xs">Extra Small</ComponentName>
        <ComponentName size="sm">Small</ComponentName>
        <ComponentName size="md">Medium</ComponentName>
        <ComponentName size="lg">Large</ComponentName>
        <ComponentName size="xl">Extra Large</ComponentName>
      </div>
    </section>
    
    <!-- Rotations Section (if applicable) -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Rotations</h2>
      <div class="flex flex-wrap gap-8">
        <ComponentName rotation={1}>Rotation 1</ComponentName>
        <ComponentName rotation={2}>Rotation 2</ComponentName>
        <ComponentName rotation={3}>Rotation 3</ComponentName>
        <ComponentName rotation={4}>Rotation 4</ComponentName>
      </div>
    </section>
    
    <!-- Combinations Section -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Combinations</h2>
      <div class="flex flex-wrap gap-4">
        <ComponentName variant="primary" size="lg" rotation={2}>
          Large Primary with Rotation
        </ComponentName>
        <ComponentName variant="accent" size="sm">
          Small Accent
        </ComponentName>
      </div>
    </section>
    
    <!-- Usage Example Section -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Usage Example</h2>
      <div class="bg-base-200 p-6 rounded-lg">
        <pre class="text-sm"><code>{`<ComponentName variant="primary" size="md">
  Your content here
</ComponentName>`}</code></pre>
      </div>
    </section>
  </main>
</BaseLayout>
```

## Data File Template

```typescript
// src/data/component-name.ts

export interface ComponentNameData {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'accent' | 'neutral';
  icon?: string;
  // Add more fields as needed
}

// Example data
export const componentItems: ComponentNameData[] = [
  {
    id: 'item-1',
    label: 'First Item',
    variant: 'primary',
    icon: '⚡'
  },
  {
    id: 'item-2',
    label: 'Second Item',
    variant: 'secondary',
    icon: '🚀'
  }
];
```

## Integration Example

```astro
---
// Using component on a page with data
import ComponentName from '@/components/ComponentName.astro';
import { componentItems } from '@/data/component-name';
---

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {componentItems.map(item => (
    <ComponentName variant={item.variant}>
      {item.icon} {item.label}
    </ComponentName>
  ))}
</div>
```

## Validation Checklist

### Visual Validation
- [ ] Open showcase page in browser
- [ ] All variants render with correct colors
- [ ] All sizes display proportionally
- [ ] Rotations (if applicable) show correct angles
- [ ] Component has proper borders (2-6px black)
- [ ] Component has proper shadows (hard, no blur)
- [ ] Hover/focus states work
- [ ] Layout is responsive (mobile, tablet, desktop)

### Technical Validation
- [ ] TypeScript shows no errors
- [ ] No hard-coded content in component
- [ ] Props interface complete and accurate
- [ ] Component uses standard DaisyUI classes
- [ ] Classes composed with string concatenation (no libraries)
- [ ] Data (if any) in separate file
- [ ] Component works with slot content
- [ ] Console shows no errors

### Content Separation Validation
- [ ] No text strings in component markup (except UI labels)
- [ ] All content passed via props or slots
- [ ] Data structures are flat (CMS-friendly)
- [ ] TypeScript interfaces exported for reuse
- [ ] Component accepts any valid content shape

### Documentation Validation
- [ ] Component file has JSDoc comment
- [ ] Props interface has descriptions
- [ ] Showcase page demonstrates all options
- [ ] Usage example provided in showcase
- [ ] Ready for theme sales (buyers can see capabilities)

## Complete Task
- [ ] Mark task `[x]` in `docs/component-backlog.md`
- [ ] Check off all success criteria in backlog
- [ ] Verify acceptance test passes
- [ ] Commit changes with descriptive message
- [ ] Move to next task
