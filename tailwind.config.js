/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'iran-sans': ['IRAN Sans', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  