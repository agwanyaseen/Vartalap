module.exports = {
  plugins: {
    "postcss-import": {},  // Ensures Tailwind processes imported files correctly
    "@tailwindcss/postcss": {}, // ✅ Correct Tailwind PostCSS Plugin
    autoprefixer: {},
  },
};
