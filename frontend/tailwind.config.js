/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#0f0f11',
          secondary: '#1a1a1f',
          tertiary: '#222228',
        },
        border: '#2e2e38',
        accent: '#7c6aff',
      }
    }
  },
  plugins: []
}