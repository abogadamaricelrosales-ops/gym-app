/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",      // fondo
        card: "#18181A",     // tarjetas
        card2: "#232326",    // tarjetas internas / inputs
        line: "#2C2C30",     // bordes
        lime: { DEFAULT: "#C8F135", dim: "#C8F13526" },
        mute: "#8A8A93",     // texto secundario
      },
      borderRadius: { "4xl": "28px" },
    },
  },
  plugins: [],
};
