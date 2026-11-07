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
        surface: {
          DEFAULT: "var(--surface)",
          subtle: "var(--surface-subtle)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "#3B82F6",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          glow: "var(--accent-glow)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--muted)",
        },
        muted: "var(--muted)",
        card: {
          DEFAULT: "var(--card)",
          glass: "var(--card-glass)",
        },
        border: {
          DEFAULT: "var(--border)",
          glass: "var(--border-glass)",
          accent: "var(--border-accent)",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        display: ["Fraunces", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 31, 59, 0.05)',
        'lift': '0 12px 30px -4px rgba(37, 99, 235, 0.12)',
        'glass': '0 8px 32px 0 rgba(11, 31, 59, 0.07)',
        'glass-hover': '0 16px 40px -6px rgba(37, 99, 235, 0.16)',
        'glow': '0 0 25px -4px rgba(37, 99, 235, 0.35)',
        'glow-lg': '0 0 45px -8px rgba(37, 99, 235, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
