# Template: Page Integration

Use this template for tasks that integrate components into pages using collection/data content.

## Checklist

### 1. Plan Page Structure
- [ ] Identify sections needed (hero, content grid, sidebar, etc.)
- [ ] List components needed for each section
- [ ] Determine data sources (collections, data files, static)
- [ ] Sketch responsive layout (mobile, tablet, desktop)
- [ ] Check for reusable section patterns

### 2. Set Up Data Sources
- [ ] Identify collection schema (if using collections)
- [ ] Create/update data files (if using data files)
- [ ] Define TypeScript interfaces
- [ ] Add sample data for testing
- [ ] Verify data structure is flat (CMS-friendly)

### 3. Query Data
- [ ] Import `getCollection` or `getEntry` (if using collections)
- [ ] Import data files (if using data files)
- [ ] Filter data as needed (featured, sorted, limited)
- [ ] Sort data (by date, order, name, etc.)
- [ ] Handle empty states

### 4. Implement Layout
- [ ] Create page file in `src/pages/`
- [ ] Import layout component
- [ ] Import section components
- [ ] Set up responsive grid/flex layout
- [ ] Add proper spacing (4px base unit)

### 5. Map Data to Components
- [ ] Loop through collection/data items
- [ ] Pass props to components
- [ ] Handle optional fields gracefully
- [ ] Verify no hard-coded content
- [ ] Test with real data

### 6. Validate Page
- [ ] Page renders all sections
- [ ] Data displays correctly
- [ ] Components receive proper props
- [ ] Responsive layout works
- [ ] Links/navigation function
- [ ] No console errors
- [ ] SEO metadata complete

## Page Code Template

```astro
---
// src/pages/page-name.astro
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import ComponentName from '@/components/ComponentName.astro';
import SectionContainer from '@/components/SectionContainer.astro';
import { navigationData } from '@/data/navigation';

// Page metadata
const title = 'Page Title';
const description = 'Page description for SEO';

// Query collections
const allItems = await getCollection('collection-name');

// Filter and sort
const featuredItems = allItems
  .filter(item => item.data.featured === true)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 6);

// Or use data files
// import { items } from '@/data/items';
---

<BaseLayout title={title} description={description}>
  <main>
    <!-- Hero Section -->
    <SectionContainer>
      <h1 class="text-4xl font-black mb-4">{title}</h1>
      <p class="text-lg">{description}</p>
    </SectionContainer>
    
    <!-- Content Grid -->
    <SectionContainer>
      <h2 class="text-2xl font-bold mb-8">Featured Items</h2>
      
      {featuredItems.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map(item => (
            <ComponentName
              title={item.data.title}
              description={item.data.description}
              variant={item.data.variant}
              href={`/path/${item.slug}`}
            />
          ))}
        </div>
      ) : (
        <p>No items found.</p>
      )}
    </SectionContainer>
  </main>
</BaseLayout>
```

## Collection Query Patterns

### Get All Items
```astro
---
const allItems = await getCollection('collection-name');
---
```

### Get Single Entry
```astro
---
const entry = await getEntry('collection-name', 'entry-slug');
const { title, description } = entry.data;
---
```

### Filter Items
```astro
---
const items = await getCollection('collection-name', ({ data }) => {
  return data.featured === true && data.published !== false;
});
---
```

### Sort Items
```astro
---
// By date (newest first)
const items = allItems.sort((a, b) => 
  b.data.date.valueOf() - a.data.date.valueOf()
);

// By order field
const items = allItems.sort((a, b) => 
  a.data.order - b.data.order
);

// Alphabetically
const items = allItems.sort((a, b) => 
  a.data.title.localeCompare(b.data.title)
);
---
```

### Limit Results
```astro
---
const recentItems = allItems
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 5); // Only first 5
---
```

## Layout Patterns

### Responsive Grid
```astro
<!-- 1 column mobile, 2 tablet, 3 desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <ComponentName {...item.data} />
  ))}
</div>

<!-- 1 column mobile, 3 desktop (skip tablet breakpoint) -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <ComponentName {...item.data} />
  ))}
</div>

<!-- 2 column mobile, 4 desktop -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map(item => (
    <ComponentName {...item.data} />
  ))}
</div>
```

### Sidebar Layout
```astro
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <!-- Main content (2/3 width on desktop) -->
  <div class="lg:col-span-2">
    {mainContent}
  </div>
  
  <!-- Sidebar (1/3 width on desktop) -->
  <aside>
    {sidebarContent}
  </aside>
</div>
```

### Hero + Grid Layout
```astro
<main>
  <!-- Full-width hero -->
  <section class="py-16 bg-primary text-primary-content">
    <div class="container mx-auto px-4">
      <h1 class="text-5xl font-black">{title}</h1>
      <p class="text-xl mt-4">{description}</p>
    </div>
  </section>
  
  <!-- Content grid with container -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ComponentName {...item.data} />
        ))}
      </div>
    </div>
  </section>
</main>
```

## Data Integration Examples

### From Content Collection
```astro
---
import { getCollection } from 'astro:content';
import WorkCard from '@/components/WorkCard.astro';

const allWork = await getCollection('work');
const featuredWork = allWork.filter(work => work.data.featured);
---

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  {featuredWork.map(work => (
    <WorkCard
      title={work.data.title}
      description={work.data.description}
      image={work.data.image}
      tags={work.data.tags}
      href={`/work/${work.slug}`}
    />
  ))}
</div>
```

### From Data File
```astro
---
import CapabilityCard from '@/components/CapabilityCard.astro';
import { capabilities } from '@/data/capabilities';
---

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {capabilities.map(capability => (
    <CapabilityCard
      title={capability.title}
      icon={capability.icon}
      description={capability.description}
    />
  ))}
</div>
```

### Conditional Rendering
```astro
---
const items = await getCollection('items');
const featured = items.filter(i => i.data.featured);
const recent = items.slice(0, 3);
---

<!-- Show featured if available, otherwise recent -->
{featured.length > 0 ? (
  <div class="grid grid-cols-3 gap-6">
    {featured.map(item => <ComponentName {...item.data} />)}
  </div>
) : recent.length > 0 ? (
  <div class="grid grid-cols-3 gap-6">
    {recent.map(item => <ComponentName {...item.data} />)}
  </div>
) : (
  <p>No items available.</p>
)}
```

## Validation Checklist

### Data Validation
- [ ] All collections query correctly
- [ ] Data files import without errors
- [ ] Filtering logic works as expected
- [ ] Sorting produces correct order
- [ ] Empty states handled gracefully
- [ ] Optional fields handled safely

### Layout Validation
- [ ] Page renders all sections
- [ ] Responsive breakpoints work (test at 375px, 768px, 1024px, 1440px)
- [ ] Spacing consistent (4px base unit)
- [ ] Components receive correct props
- [ ] Links navigate correctly
- [ ] No layout shifts on load

### Content Validation
- [ ] No hard-coded text (except UI labels)
- [ ] All content from collections/data/props
- [ ] Content displays correctly
- [ ] Images load and have alt text
- [ ] Dates format correctly
- [ ] Tags/categories display

### SEO Validation
- [ ] Title tag set (<60 characters)
- [ ] Meta description set (<160 characters)
- [ ] OpenGraph metadata (if applicable)
- [ ] Semantic HTML (h1, h2, nav, main, article, etc.)
- [ ] Links have descriptive text

### Performance Validation
- [ ] Images optimized (use Astro's Image component)
- [ ] No large bundle sizes
- [ ] No unnecessary JavaScript
- [ ] Fast page load (<3s on 3G)

## Complete Task
- [ ] Mark task `[x]` in `docs/component-backlog.md`
- [ ] Check off all success criteria in backlog
- [ ] Verify acceptance test passes
- [ ] Test on multiple screen sizes
- [ ] Commit changes with descriptive message
- [ ] Move to next task
