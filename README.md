# Nick Roth - Personal Site

A modern static site built with Astro, Tailwind CSS, and DaisyUI, featuring MDX content collections and Native View Transitions.

## Features

- 🚀 **Astro** - Modern static site generator
- 🎨 **Tailwind CSS + DaisyUI** - Beautiful, responsive design system
- 📝 **MDX Content Collections** - Structured content for capabilities, work, and notes
- ✨ **Native View Transitions** - Smooth navigation between pages
- 🌗 **Dark Mode** - Built-in theme switcher
- 📱 **Responsive Design** - Mobile-first approach
- ☁️ **Cloudflare Pages Ready** - Optimized for deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Site Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.astro
│   ├── Hero.astro
│   ├── CapabilityCard.astro
│   └── WorkCard.astro
├── content/             # MDX content collections
│   ├── capabilities/    # Core capabilities
│   ├── work/           # Work projects and roles
│   ├── pages/          # Static pages
│   └── notes/          # Blog posts and notes
├── layouts/            # Page layouts
│   └── BaseLayout.astro
└── pages/              # File-based routing
    ├── index.astro     # Home page
    ├── work/
    │   ├── index.astro # Work listing
    │   └── [slug].astro # Individual work pages
    ├── about.astro
    └── contact.astro
```

## Content Management

### Adding Work Projects

Create a new `.mdx` file in `src/content/work/`:

```yaml
---
title: "Project Title"
description: "Brief description"
company: "Company Name"
role: "Your Role"
startDate: 2023-01-01
endDate: 2023-12-31
featured: true
tags: ["Product Management", "AI/ML"]
image: "/project-image.jpg"
---

# Project Details

Your project content in MDX format...
```

### Adding Capabilities

Create a new `.md` file in `src/content/capabilities/`:

```yaml
---
title: "Capability Name"
description: "Description of the capability"
icon: "🚀"
order: 1
---
```

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on git push

### Other Platforms

The site builds to static files in the `dist/` directory and can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## Tech Stack

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS 3.x + DaisyUI 4.x
- **Content**: MDX with content collections
- **TypeScript**: Strict mode enabled
- **View Transitions**: Native Astro implementation

## License

MIT
