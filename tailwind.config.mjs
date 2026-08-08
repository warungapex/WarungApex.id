/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#08080c",
        "brand-surface": "#12131a",
        "brand-red": "#FF2A44",
        "brand-cyan": "#00F0FF",
      },
    },
  },
  plugins: [],
};