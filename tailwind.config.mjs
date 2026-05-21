/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        alvina: { dark: '#17211b', green: '#2f5f46', soft: '#f4f1e9', gold: '#c8a45d' }
      }
    }
  },
  plugins: []
};
