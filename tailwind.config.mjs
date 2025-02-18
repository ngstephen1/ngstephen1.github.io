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
          100: "#1F0A3C",  // deep cosmic purple
          200: "#3A1E70",  // rich mid-tone purple
          300: "#5F3AA1"   // vibrant neon-inflected purple
        },
        "accent-text": "#D8B7FF",  // soft lavender for text accents
        "accent-color": "#FCE205", // search bar color
        "search-blue": "#29B6F6"   // electric blue for interactive elements
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        ropaSans: ["var(--font-ropa-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

