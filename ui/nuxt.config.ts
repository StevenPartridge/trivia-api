// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Disable server-side rendering (enable CSR)
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", '@nuxtjs/color-mode'],
  css: ['@/assets/styles/tailwind.css'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  hooks: {
      'prerender:routes' ({ routes }) {
        routes.clear() // Do not generate any routes (except the defaults)
    }
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }
})