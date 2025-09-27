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
        brutal: '0 18px 0 0 rgba(24, 24, 37, 0.1), 0 0 0 1px rgba(24, 24, 37, 0.08)',
        'brutal-dark': '0 18px 0 0 rgba(119, 127, 168, 0.25), 0 0 0 1px rgba(119, 127, 168, 0.35)',
        'brutal-pop': '0 20px 36px rgba(24, 24, 37, 0.22)',
      },
      colors: {
        'grid-line': 'rgba(24, 24, 37, 0.08)',
        soda: '#48f2ff',
        punch: '#ff4d9a',
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
          primary: '#ff4d9a',
          'primary-content': '#210019',
          secondary: '#352f8a',
          'secondary-content': '#f7f5ff',
          accent: '#48f2ff',
          'accent-content': '#02171a',
          neutral: '#1f1a2c',
          'neutral-content': '#f7f5ff',
          'base-100': '#fdfbff',
          'base-200': '#f3efff',
          'base-300': '#ded4ff',
          info: '#3abff8',
          success: '#0ed3a2',
          warning: '#facc15',
          error: '#ff6b6b',
        },
      },
      {
        'nick-dark': {
          primary: '#ff7bbf',
          'primary-content': '#210019',
          secondary: '#4035a6',
          'secondary-content': '#f5f4ff',
          accent: '#65f7ff',
          'accent-content': '#02161a',
          neutral: '#f5f4ff',
          'neutral-content': '#0b0c16',
          'base-100': '#0b0c18',
          'base-200': '#161730',
          'base-300': '#23254b',
          info: '#38bdf8',
          success: '#10d3a2',
          warning: '#fbbf24',
          error: '#ff7a7a',
        },
      },
    ],
  },
};
