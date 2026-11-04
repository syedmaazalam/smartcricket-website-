/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        secondary: "var(--secondary)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "#1D4ED8",
        },
        ink: "var(--ink)",
        muted: "var(--muted)",
        card: "var(--card)",
        border: "var(--border)",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        display: ["Fraunces", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 31, 59, 0.05)',
        'lift': '0 12px 30px -4px rgba(37, 99, 235, 0.12)',
      }
    },
  },
  plugins: [],
};
