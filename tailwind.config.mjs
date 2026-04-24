/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#0a2a6e',
          royal: '#1d3c96',
          sky: '#3ea7d8',
          ice: '#9ad5ec',
          mint: '#6fe3c8',
          aqua: '#00d4c0',
          foam: '#eaf7fb',
          ink: '#06152e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 10px 40px -10px rgba(62,167,216,0.55)',
        deep: '0 30px 80px -30px rgba(10,42,110,0.55)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 50% 0%, rgba(62,167,216,0.25) 0%, transparent 60%), linear-gradient(to bottom, #f6fbfd 0%, #ffffff 100%)',
      },
      keyframes: {
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        'ripple': {
          '0%': { transform: 'scale(0.6)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'ripple': 'ripple 2.2s ease-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
