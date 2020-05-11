require('dotenv').config()
export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '',
    titleTemplate: (titleChunk) => {
      return titleChunk
        ? `${titleChunk} - Bihar State Online Wushu Taolu Championship`
        : 'Bihar State Online Wushu Taolu Championship'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Bihar State Online Wushu Taolu Championship 2020'
      },
      {
        name: 'keywords',
        content: 'Wushu, Taolu, Championship'
      },
      { name: 'robots', content: 'INDEX, FOLLOW' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:400,300,500,700'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    bodyAttrs: { 'data-toggle': 'affix', id: 'app-body', 'data-ready': true }
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00d280' },

  /*
   ** Global CSS
   */
  css: ['@/assets/style/style.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/global-components.js',
    '~plugins/vue-material.js',
    '~/plugins/axios.js',
    { src: '~/plugins/vuebar.js', ssr: false },
    { src: '~/plugins/vue-awesome-swiper.js', ssr: false },
    { src: '~/plugins/sw.js', ssr: false }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxyHeaders: false,
    proxy: false,
    debug: true,
    baseURL: process.env.API_URL,
    https: false,
    credentials: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  /*
   ** env
   */
  env: {
    baseUrl: process.env.BASE_URL,
    assetsUrl: process.env.ASSETS_URL,
    apiUrl: process.env.API_URL,
    authUrl: process.env.AUTH_URL,
    domain: process.env.DOMAIN,
    isLive: process.env.IS_LIVE,
    codepieCdnUrl: process.env.CODPIE_CDN_URL
  },

  /*
   ** env
   */
  workbox: {
    importScripts: ['custom-sw.js'],
    cachingExtensions: '@/plugins/workbox-range-request.js'
  },

  /*
   ** meta
   */
  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: true,
    name: 'Wushu Championship',
    author: 'Codepie',
    description: 'Bihar State Online Wushu Taolu Championship',
    theme_color: '#00d280',
    lang: 'en',
    ogTitle: 'Bihar State Online Wushu Taolu Championship',
    ogUrl: 'https://wushu.codepie.io',
    nativeUI: true
  },

  /*
   ** manifest
   */
  manifest: {
    name: 'Wushu Championship',
    description: 'Bihar State Online Wushu Taolu Championship',
    lang: 'en',
    crossorigin: 'use-credentials',
    theme_color: '#00d280'
  },

  /*
   ** Define the dist directory for your Nuxt.js application
   */
  buildDir: 'dist'
}
