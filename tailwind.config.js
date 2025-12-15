// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   plugins: [require("daisyui")],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "var(--color-dark)",
        vanilla: "var(--color-vanilla)",
        rosa: "var(--color-hell-rosa)",
        mint: "var(--color-mint)",
      },
      backgroundImage: {
        "soft-gradient":
          "linear-gradient(135deg, var(--color-vanilla), var(--color-hell-rosa), var(--color-mint))",
      },
    },
  },
  plugins: [require("daisyui")],
};
