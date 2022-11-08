/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PF Square Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#3069FE',

        dark: '#282828',
        light: '#F2F2F2',

        'gray-base': '#938E8E',
        'gray-dark': '#5C5B5B',
        'gray-light': '#C4C4C4',
      },
      transitionProperty: {
        backdrop: 'visibility, opacity, transform',
      },
      screens: {
        'md-h': { raw: '(max-height: 970px)' },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      border: ['last', 'first'],
      transform: ['hover', 'focus'],
      rotate: ['active', 'group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
