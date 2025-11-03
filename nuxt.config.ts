// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/icon',
  ],
  
  css: [
    '../assets/css/main.css',
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    }
  },

  app: {
    head: {
      title: 'Nuskheh+',
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa',
      },
    },
  },
})