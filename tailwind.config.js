/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-green': '#2D5016',
        'gold': '#D4AF37',
        'neutral-light': '#F5F5F3',
        'neutral-dark': '#333333',
      },
      fontFamily: {
        'serif-display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}