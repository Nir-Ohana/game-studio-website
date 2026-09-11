import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          abyss: '#060F17',
          deep: '#0A1624',
          surface: '#0E2135',
          card: '#122B45',
          border: 'rgba(94, 234, 212, 0.15)',
        },
        studio: {
          dark: '#060F17',
          charcoal: '#0A1624',
          border: '#162C45',
        },
        seafoam: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Outfit', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
