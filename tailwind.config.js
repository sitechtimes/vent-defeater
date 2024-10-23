/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**/*.{vue,js,ts,jsx,tsx}", "./components/**/*.{vue,js,ts,jsx,tsx}", "./layouts/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [],
  darkMode: "selector",
  future: {
    hoverOnlyWhenSupported: true
  }
};
