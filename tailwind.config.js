/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode using a class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        text: "var(--text-color)",
        border: "var(--border-color)",
        placeholder: "var(--placeholder-color)",
        ring: "var(--ring-color)",
      },
    },
  },
  plugins: [],
};
