import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind()
  ],
  output: 'static',
  site: 'https://nickroth.pages.dev', // Update with your Cloudflare Pages URL
  build: {
    format: 'directory'
  }
});