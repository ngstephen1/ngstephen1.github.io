/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": {
          100: "#1F0A3C",
          200: "#3A1E70",
          300: "#5F3AA1",
        },
        "accent-text": "#D8B7FF",
        "accent-color": "#779ECB",
        "search-blue": "#29B6F6",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        ropaSans: ["var(--font-ropa-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
