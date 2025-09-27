/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Custom color scheme based on prototype design
        'brutal-primary': 'oklch(0.65 0.2 140)',      // Vibrant teal-green
        'brutal-secondary': 'oklch(0.7 0.15 60)',     // Warm yellow-orange  
        'brutal-accent': 'oklch(0.7 0.2 320)',        // Bright magenta-pink
        'brutal-foreground': 'oklch(0.15 0.05 280)',  // Deep charcoal
        'brutal-background': 'oklch(0.98 0.01 280)',  // Very light warm white
        'brutal-muted': 'oklch(0.92 0.02 280)',       // Muted background
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "oklch(0.65 0.2 140)",          // Vibrant teal-green
          "secondary": "oklch(0.7 0.15 60)",         // Warm yellow-orange
          "accent": "oklch(0.7 0.2 320)",            // Bright magenta-pink
          "neutral": "oklch(0.15 0.05 280)",         // Deep charcoal
          "base-100": "oklch(0.98 0.01 280)",        // Very light warm white
          "base-200": "oklch(0.96 0.02 280)",        // Light card background
          "base-300": "oklch(0.92 0.02 280)",        // Muted background
          "info": "oklch(0.65 0.2 200)",
          "success": "oklch(0.65 0.2 140)",
          "warning": "oklch(0.7 0.15 60)",
          "error": "oklch(0.6 0.2 15)",
        },
        dark: {
          "primary": "oklch(0.65 0.2 140)",          // Keep same vibrant colors
          "secondary": "oklch(0.7 0.15 60)",
          "accent": "oklch(0.7 0.2 320)",
          "neutral": "oklch(0.85 0.01 280)",         // Light text for dark mode
          "base-100": "oklch(0.12 0.05 280)",        // Dark background
          "base-200": "oklch(0.15 0.05 280)",        // Darker cards
          "base-300": "oklch(0.18 0.05 280)",        // Darker muted
          "info": "oklch(0.65 0.2 200)",
          "success": "oklch(0.65 0.2 140)",
          "warning": "oklch(0.7 0.15 60)",
          "error": "oklch(0.6 0.2 15)",
        }
      }
    ],
  },
}