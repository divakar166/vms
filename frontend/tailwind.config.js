/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "200px auto", //for sidebar layout
        "sidebar-collapsed": "70px auto", //for collapsed sidebar layout
      },
    },
  },
  plugins: [],
}