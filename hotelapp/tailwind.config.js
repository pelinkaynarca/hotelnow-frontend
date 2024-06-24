/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#4BA7B7',
        'primary-blue-hover': '#3299ab',
        'primary-white': '#FBFFF4',
        'accent-dark': '#292F36',
      },
      linearGradientDirections: {
        't': 'to top',
        'tr': 'to top right',
        'r': 'to right',
        'br': 'to bottom right',
        'b': 'to bottom',
        'bl': 'to bottom left',
        'l': 'to left',
        'tl': 'to top left',
      },
      linearGradientColors: { // defaults to {}
        'sb-link-active': ['#4BA7B7 25%', '#292F36 90%'],
        'sb-link-hover': ['rgb(76, 95, 99, 0.7) 25%', '#292F36 90%'],
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
    require('autoprefixer'),
  ],
}

