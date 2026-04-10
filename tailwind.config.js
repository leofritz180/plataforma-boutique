/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#e8b4b8',
          'pink-light': '#f5d5d8',
          'pink-dark': '#c9969a',
          nude: '#f0e6e0',
          'nude-light': '#f7f0ec',
          cream: '#faf8f5',
          charcoal: '#2d2d2d',
          dark: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
    },
  },
  plugins: [],
}
