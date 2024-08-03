const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        pri: "#2F3136",
        sec: "#36393F",
        inp: "#3F3F46",
        // pri: "blue",
        // sec: "gray",
        // inp: "red",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}



// [#303339]  message box