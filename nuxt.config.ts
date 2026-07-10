export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', 'nuxt-auth-utils'],

  i18n: {
    // Required for hreflang/canonical to be absolute URLs; without it the module emits "/tr" and
    // warns that the SEO tag links are invalid.
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://eurofilwater.com',
    locales: [
      { code: 'tr', language: 'tr-TR', name: 'Türkçe', file: 'tr.json', dir: 'ltr' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'ar', language: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json', dir: 'ltr' },
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
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://eurofilwater.com',
    },
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
        { rel: 'icon', type: 'image/x-icon', href: '/light-favicon/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/light-favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/light-favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/light-favicon/apple-touch-icon.png' },
      ],
      script: [
        { type: 'module', src: 'https://unpkg.com/@google/model-viewer@4.3.1/dist/model-viewer.min.js' },
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-MXDNYQZP03', async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-MXDNYQZP03');`,
        },
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'model-viewer',
    },
  },
})
