/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-card":
          "0 4px 10px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
      },
      outlineWidth: {
        DEFAULT: "1.5px",
        2: "2px",
        4: "4px",
      },
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      Lato: ["Lato", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
    colors: {
      customTeal: "#17696A",
      customBlack: "#1E212C",
      customRed: "#FF4242",
      customGray: "#D7DADD",
      customGray2: "#787A80",
      customGray3: "#FFFFFF99",
      customGreen: "#03CEA4",
      customWhite: "#FFFFFF",
      customWhite2: "#F4F5F6",
      customWhite3: "#f6f6f9",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
