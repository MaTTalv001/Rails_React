/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
     './node_modules/preline/preline.js',
    'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require('preline/plugin'),
  ],
  darkMode: "class"
}

