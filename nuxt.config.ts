export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', 'nuxt-auth-utils'],

  i18n: {
    locales: [
      { code: 'tr', language: 'tr-TR', name: 'Türkçe', file: 'tr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'tr',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  nitro: {
    alias: { '#db': new URL('./server/db/index.ts', import.meta.url).pathname },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      titleTemplate: '%s | Euro Fil',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#2254f4' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/dark-favicon/favicon.ico', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/dark-favicon/favicon-32x32.png', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/dark-favicon/favicon-16x16.png', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/x-icon', href: '/light-favicon/favicon.ico', media: '(prefers-color-scheme: dark)' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/light-favicon/favicon-32x32.png', media: '(prefers-color-scheme: dark)' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/light-favicon/favicon-16x16.png', media: '(prefers-color-scheme: dark)' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/dark-favicon/apple-touch-icon.png' },
      ],
    },
  },
})
