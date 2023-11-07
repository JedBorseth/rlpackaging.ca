/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "370px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"],
  },
};
