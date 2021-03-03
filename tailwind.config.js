module.exports = {
  purge: ["./src/**/*.{svelte,ts}", "./public/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        17: "repeat(17, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        9: "repeat(9, minmax(0, 1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
