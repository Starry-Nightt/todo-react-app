/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        "100%": "100%",
        "200%": "200%",
        "300%": "300%",
      },
      width: {
        "300%": "300%",
      },
      minHeight: {
        50: "200px",
        100: "400px",
      },
    },
  },
  plugins: [require("daisyui")],
};
