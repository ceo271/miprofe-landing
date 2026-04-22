import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "profe-black": "#0a0a0a",
        "profe-green": "#10b981",
        "profe-blue": "#3b82f6",
        "profe-copper": "#ea580c",
        "profe-gold": "#f59e0b",
        "profe-red": "#dc2626",
      },
    },
  },
  plugins: [],
};
export default config;
