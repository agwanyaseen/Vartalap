/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ChatWidgetElement.js", // your entry file
    "./**/*.html",            // any HTML files
    "./**/*.{js,jsx}",        // your JS/JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
