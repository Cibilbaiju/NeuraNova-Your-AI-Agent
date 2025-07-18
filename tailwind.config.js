// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0e0e0e",
        accent: "#0ff",
        secondary: "#1a1a1a",
        chatAgent: "#161616"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      boxShadow: {
        neumorph: "inset 4px 4px 10px #0a0a0a, inset -4px -4px 10px #1c1c1c",
        glow: "0 0 20px rgba(0, 255, 255, 0.6)"
      },
      backdropBlur: {
        md: "12px"
      }
    }
  },
  plugins: []
}
