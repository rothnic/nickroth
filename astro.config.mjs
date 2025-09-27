import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind(),
    react()
  ],
  output: 'static',
  site: 'https://www.nickroth.com', // Update with your Cloudflare Pages URL
  build: {
    format: 'directory'
  }
});