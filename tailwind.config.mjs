import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        main: 'var(--main)',
        'main-foreground': 'var(--main-foreground)',
        'secondary-background': 'var(--secondary-background)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        ring: 'var(--ring)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', ...fontFamily.sans],
        base: ['"Inter"', ...fontFamily.sans],
      },
      borderRadius: {
        base: 'var(--radius-base)',
      },
      boxShadow: {
        shadow: 'var(--shadow-shadow)',
        nav: 'var(--shadow-nav)',
        navDark: 'var(--shadow-nav-dark)',
      },
      translate: {
        boxShadowX: 'var(--box-shadow-x)',
        boxShadowY: 'var(--box-shadow-y)',
        reverseBoxShadowX: 'calc(var(--box-shadow-x) * -1)',
        reverseBoxShadowY: 'calc(var(--box-shadow-y) * -1)',
      },
      ringOffsetColor: {
        ring: 'var(--ring-offset)',
      },
      ringColor: {
        ring: 'var(--ring)',
      },
      spacing: {
        container: 'var(--container-width)',
      },
    },
  },
  plugins: [typography],
};
