import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "lato": ["Lato", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.5rem",
      },
      colors: {
        "default-1": "#1520a6",
        "default-2": "#0a1172",
        "sidebar": "#171717",
      },
    },
  },
  plugins: [],
};
export default config;
