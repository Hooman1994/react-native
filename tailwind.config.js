/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F0F5FA",
        backgroundTheme: "#F0F5FA",
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        iranSansBold: ["IranSans-Bold", "sans-serif"],
        iranSansLight: ["IranSans-Light", "sans-serif"],
        iranSansRegular: ["IranSans-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
