const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        'light-blue': colors.lightBlue,
        teal: colors.teal,
        rose: colors.rose
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
