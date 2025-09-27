/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brutal: '0 18px 0 0 rgba(17, 24, 39, 0.12), 0 0 0 1px rgba(17, 24, 39, 0.12)',
        'brutal-dark': '0 18px 0 0 rgba(148, 163, 184, 0.22), 0 0 0 1px rgba(148, 163, 184, 0.35)',
        'brutal-pop': '0 16px 32px rgba(17, 24, 39, 0.22)',
      },
      colors: {
        'grid-line': 'rgba(17, 24, 39, 0.08)',
        soda: '#35f5ff',
        punch: '#ff6b8b',
      },
      backgroundImage: {
        'noisy-grid':
          'linear-gradient(90deg, rgba(15, 23, 42, 0.05) 1px, transparent 1px), linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'nick-light': {
          primary: '#ff5c8a',
          'primary-content': '#210814',
          secondary: '#151633',
          'secondary-content': '#f9f8ff',
          accent: '#35f5ff',
          'accent-content': '#041b1c',
          neutral: '#171321',
          'neutral-content': '#f7f7ff',
          'base-100': '#f6f4ff',
          'base-200': '#ebe9ff',
          'base-300': '#d9d5ff',
          info: '#38bdf8',
          success: '#0dd3a2',
          warning: '#facc15',
          error: '#ff6b6b',
        },
      },
      {
        'nick-dark': {
          primary: '#ff91c1',
          'primary-content': '#210814',
          secondary: '#282d52',
          'secondary-content': '#f6f4ff',
          accent: '#4ff0ff',
          'accent-content': '#031216',
          neutral: '#f7f7ff',
          'neutral-content': '#0b0c17',
          'base-100': '#0c0d1a',
          'base-200': '#14152b',
          'base-300': '#202241',
          info: '#38bdf8',
          success: '#0dd3a2',
          warning: '#fbbf24',
          error: '#ff7a7a',
        },
      },
    ],
  },
};
