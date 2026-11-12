/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0F0E17", 900: "#17162A", 800: "#22213A", 700: "#2F2D4D" },
        brand: {
          50: "#fff8eb",
          100: "#feeac7",
          200: "#fdd28a",
          300: "#fcb44d",
          400: "#fb9a24",
          500: "#f57a0b",
          600: "#d95706",
          700: "#b43b09",
          800: "#922e0e",
          900: "#78270f",
        },
      },
    },
  },
  plugins: [],
};
