/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Libre Franklin", "sans"],
        lora: ["Lora", "serif"],
      },
      colors: {
        primary: "#fefae0",
        secondary: "#283618",
        tertiary: "#606c38",
      },
    },
  },
  plugins: [],
};
