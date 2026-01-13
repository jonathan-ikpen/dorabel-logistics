/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    fontFamily: {
      sans: ["var(--font-body)", "sans-serif"],
      heading: ["var(--font-heading)", "serif"],
    },
    extend: {
      colors: {
        dorabel: {
          purple: {
            DEFAULT: "#2A0E61", // Primary Text/Headings - Rich Royal Purple
            light: "#6D28D9", // Lighter purple
            dark: "#1a0540", // Darker purple
          },
          gold: {
            DEFAULT: "var(--color-dorabel-gold)", // Primary Accent
            light: "#F59E0B", // Lighter gold
            dark: "#B45309", // Darker gold
          },
          gray: {
            DEFAULT: "#F3F4F6", // Light Background
            light: "#F9FAFB", // White-ish Background
            dim: "#475569", // Body Text
            dark: "#1E293B",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: 1,
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
          },
          "50%": {
            opacity: 0.5,
            boxShadow: "0 0 40px rgba(16, 185, 129, 0.6)",
          },
        },
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
      },
    },
  },
  plugins: [],
};
