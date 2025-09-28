import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    react(),
    tailwind()
  ],
  output: 'static',
  site: 'https://www.nickroth.com', // Update with your Cloudflare Pages URL
  build: {
    format: 'directory'
  }
});