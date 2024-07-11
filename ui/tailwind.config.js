// tailwind.config.js
module.exports = {
    darkMode: 'class', // Enable dark mode
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      './app.vue'
    ],
    theme: {
      extend: {
        colors: {
          sepia: {
            DEFAULT: '#f1e7d0',
            dark: '#433422'
          }
        }
      }
    },
    plugins: []
  }