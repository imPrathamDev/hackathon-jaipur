/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
      },
      colors: {
        primary: "#8758FF",
        "primary-black": "#181818",
        "primary-white": "#F2F2F2",
        "primary-secondary": "#5CB8E4",
      },
    },
  },
  plugins: [],
};
