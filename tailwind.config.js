/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F3EC",
        gold: "#C8A96A",
        oud: "#4B2E24",
        sand: "#E8D8C3",
        "deep-black": "#1A1A1A",
        "gold-light": "rgba(200,169,106,0.3)",
        "gold-dark": "rgba(200,169,106,0.5)",
        "gold-bright": "#D4B87A",
        success: "#4CAF50",
        error: "#F44336",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "sans-serif"],
        arabic: ['"IBM Plex Sans Arabic"', "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "bounce-slow": "bounce-slow 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
      zIndex: {
        canvas: "9999",
        header: "1000",
        cart: "900",
        flip: "800",
        modal: "700",
        search: "600",
        backdrop: "500",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
