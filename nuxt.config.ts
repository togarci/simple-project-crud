import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils', '@pinia/nuxt'],

  app: {
    head: {
      title: 'Simple Project Crud',
      htmlAttrs: {
        lang: 'pt-br',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A simple Project Crud',
        },
        { name: 'format-detection', content: 'telephone=yes' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Encode+Sans+Semi+Expanded:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  css: ['./app/assets/style/tailwind.config.css'],
  vite: {
    plugins: [tailwindcss()],
  },
});
