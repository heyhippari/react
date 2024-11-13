import type { Config } from "tailwindcss";

// @ts-expect-error - TailwindCSS Gradient Mask Image is not typed
import tailwindGradientMaskImage from "tailwind-gradient-mask-image";
import tailwindCssAnimate from "tailwindcss-animate";
// @ts-expect-error - TailwindCSS Logical is not typed
import tailwindLogical from "tailwindcss-logical";
import { addIconSelectors } from "@iconify/tailwind";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  plugins: [
    tailwindCssAnimate,
    tailwindLogical,
    tailwindGradientMaskImage,
    addIconSelectors(["mdi", "simple-icons", "lucide"]),
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
} satisfies Config;

export default config;
