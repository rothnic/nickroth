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
        brutal: '10px 10px 0 0 rgba(17, 24, 39, 0.12)',
        'brutal-dark': '10px 10px 0 0 rgba(15, 23, 42, 0.3)',
      },
      colors: {
        'grid-line': 'rgba(17, 24, 39, 0.08)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'nick-light': {
          primary: '#ff4f5a',
          'primary-content': '#111827',
          secondary: '#111827',
          'secondary-content': '#fdf9f3',
          accent: '#0ea5e9',
          'accent-content': '#041724',
          neutral: '#111827',
          'neutral-content': '#f3f4f6',
          'base-100': '#fdf9f3',
          'base-200': '#f3ede3',
          'base-300': '#e2d7c5',
          info: '#0ea5e9',
          success: '#10b981',
          warning: '#facc15',
          error: '#ef4444',
        },
      },
      {
        'nick-dark': {
          primary: '#ff7a85',
          'primary-content': '#0b1324',
          secondary: '#0b1324',
          'secondary-content': '#f9fafb',
          accent: '#38bdf8',
          'accent-content': '#041724',
          neutral: '#f4f4f5',
          'neutral-content': '#0b1324',
          'base-100': '#0f172a',
          'base-200': '#111827',
          'base-300': '#1f2937',
          info: '#38bdf8',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
        },
      },
    ],
  },
};
