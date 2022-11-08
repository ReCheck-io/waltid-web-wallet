export default {
  head: {
    title: 'EBSI Wallet',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  },

  css: ['~/assets/scss/fonts.scss', '~/assets/scss/main.scss'],

  components: ['~/components', '~/components/credentials'],

  plugins: ['@/plugins/globals.js'],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  modules: [
    '@nuxtjs/svg-sprite',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
  ],
  buildModules: ['@nuxt/postcss8', '@nuxtjs/eslint-module', '@nuxtjs/pwa'],

  svgSprite: {
    input: '~/assets/svg/',
    output: '~/assets/svg/gen',
  },

  axios: {
    proxy: true,
  },

  proxy: {
    //  "/api/": "https://wallet.walt-test.cloud",
    '/v1/nft': 'https://nftkit.waltid.org',
    '/api/': 'http://localhost:8080',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: false,
        endpoints: {
          login: { url: 'api/auth/login', method: 'post' },
          user: { url: 'api/auth/userInfo', method: 'get' },
          logout: false,
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      register: '/register',
      home: '/',
    },
    cookie: false,
  },

  i18n: {
    /* module options */
    langDir: '~/locales/',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js', flag: 'flag-en.svg' },
      { code: 'de', iso: 'de-DE', file: 'de.js', flag: 'flag-de.svg' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.js', flag: 'flag-fr.svg' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  router: {
    middleware: ['auth', 'wallet'],
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      default: '/favicon.png',
    },
    meta: {
      title: 'EBSI Wallet',
      author: 'ReCheck B.V',
    },
    manifest: {
      lang: 'en',
      name: 'EBSI Wallet',
      short_name: 'ebsi_wallet',
      display: 'standalone',
    },
  },

  publicRuntimeConfig: {
    salt: process.env.SALT,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
  },

  ssr: false,
}
